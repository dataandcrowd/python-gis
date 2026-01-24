"""
Stats NZ Datafinder WFS: Auckland SA3 OD (Auckland residents -> workplace SA3)
- Downloads only records where usual residence SA3 is in Auckland Region
- Optional: keep only trips where workplace SA3 is also in Auckland Region
- Outputs:
  1) auckland_sa3_od.csv (optionally Parquet)
  2) summary_by_destination.csv
  3) summary_by_origin.csv
  4) mode_totals_2018_2023.csv

Requirements: requests, pandas
"""

from __future__ import annotations

import os
import re
import time
import json
import argparse
import xml.etree.ElementTree as ET
from typing import Dict, List, Optional

import requests
import pandas as pd


# -----------------------------
# WFS helpers
# -----------------------------
def first_typename(base_url: str, timeout: int = 60) -> str:
    r = requests.get(
        base_url,
        params={"service": "WFS", "request": "GetCapabilities", "version": "2.0.0"},
        timeout=timeout,
    )
    r.raise_for_status()
    root = ET.fromstring(r.text)
    for ft in root.iter():
        if ft.tag.endswith("FeatureType"):
            for ch in ft:
                if ch.tag.endswith("Name") and ch.text:
                    return ch.text.strip()
    raise RuntimeError("No FeatureType Name found in GetCapabilities.")


def wfs_page(
    base_url: str,
    typename: str,
    start_index: int,
    count: int,
    timeout: int = 60,
    retries: int = 4,
    sleep_s: float = 0.8,
) -> List[Dict]:
    params = {
        "service": "WFS",
        "request": "GetFeature",
        "version": "2.0.0",
        "typeNames": typename,
        "startIndex": start_index,
        "count": count,
        "outputFormat": "application/json",
    }

    last_err = None
    for k in range(retries):
        try:
            r = requests.get(base_url, params=params, timeout=timeout)
            r.raise_for_status()
            js = r.json()
            return js.get("features", [])
        except Exception as e:
            last_err = e
            time.sleep(sleep_s * (k + 1))
    raise RuntimeError(f"WFS page failed after retries: {last_err}")


def wfs_iter_properties(
    base_url: str,
    typename: str,
    count: int = 1000,
    timeout: int = 60,
) -> pd.DataFrame:
    frames = []
    start = 0
    while True:
        feats = wfs_page(base_url, typename, start_index=start, count=count, timeout=timeout)
        if not feats:
            break
        props = [f.get("properties", {}) for f in feats]
        frames.append(pd.json_normalize(props))
        start += len(feats)
    if not frames:
        return pd.DataFrame()
    return pd.concat(frames, ignore_index=True)


# -----------------------------
# Auckland SA3 codes (Higher geographies layer)
# -----------------------------
def infer_cols_higher_geog(hg):
    cols = list(hg.columns)

    # SA3 code column
    sa3_candidates = [c for c in cols if re.search(r"^SA3\d{4}_V1_00($|_)", c)]
    if not sa3_candidates:
        sa3_candidates = [c for c in cols if c.lower().startswith("sa3") and "name" not in c.lower()]
    if not sa3_candidates:
        raise RuntimeError("Could not infer SA3 code column in higher geographies table.")
    sa3_col = sorted(sa3_candidates, key=lambda x: ("2023" not in x, len(x)))[0]

    # A column that can identify Auckland membership (region/rc/ta)
    # Prefer regional council name, then region name, then TA name
    prefer_patterns = [
        r"REGC.*NAME",          # Regional council name
        r"REGION.*NAME",        # Region name
        r"TA.*NAME",            # Territorial authority name
        r"TERRITORIAL.*NAME",   # territorial
    ]

    membership_col = None
    for pat in prefer_patterns:
        hits = [c for c in cols if re.search(pat, c, flags=re.I)]
        if hits:
            membership_col = hits[0]
            break

    if membership_col is None:
        # Fallback: any column containing "Auckland" in its values
        for c in cols:
            s = hg[c].astype(str)
            if s.str.contains("Auckland", case=False, na=False).any():
                membership_col = c
                break

    if membership_col is None:
        raise RuntimeError(
            "Could not find any membership column (region/ta) containing Auckland. "
            "Print hg.columns and pick the correct one."
        )

    return {"membership_col": membership_col, "sa3_col": sa3_col}



def auckland_sa3_codes(hg_base_url, key_label="Auckland", timeout=60):
    hg_tn = first_typename(hg_base_url, timeout=timeout)
    hg = wfs_iter_properties(hg_base_url, hg_tn, count=5000, timeout=timeout)

    if hg.empty:
        raise RuntimeError("Higher geographies WFS returned no rows.")

    inferred = infer_cols_higher_geog(hg)
    mcol, sa3_col = inferred["membership_col"], inferred["sa3_col"]

    codes = (
        hg.loc[hg[mcol].astype(str).str.contains(key_label, case=False, na=False), sa3_col]
        .dropna()
        .astype(str)
        .unique()
        .tolist()
    )
    codes.sort()
    print("Using membership column:", mcol)
    print("Using SA3 code column:", sa3_col)
    return codes



# -----------------------------
# OD build for Auckland residents
# -----------------------------
def infer_od_cols(df: pd.DataFrame) -> Dict[str, str]:
    cols = list(df.columns)
    origin = "SA32023_V1_00_usual_residence_address"
    dest = "SA32023_V1_00_workplace_address"

    if origin not in cols:
        origin_like = [c for c in cols if "usual_residence" in c.lower() and c.lower().startswith("sa3")]
        if origin_like:
            origin = origin_like[0]
        else:
            raise RuntimeError("Could not find usual residence SA3 column.")

    if dest not in cols:
        dest_like = [c for c in cols if "workplace" in c.lower() and c.lower().startswith("sa3")]
        if dest_like:
            dest = dest_like[0]
        else:
            raise RuntimeError("Could not find workplace SA3 column.")

    return {"origin_col": origin, "dest_col": dest}


def mode_columns(df: pd.DataFrame) -> Dict[str, List[str]]:
    c2018 = [c for c in df.columns if c.startswith("2018_")]
    c2023 = [c for c in df.columns if c.startswith("2023_")]
    return {"2018": c2018, "2023": c2023}


def build_aucklanders_od(
    table_base_url: str,
    auck_sa3: List[str],
    internal_only: bool = False,
    timeout: int = 60,
) -> pd.DataFrame:
    tn = first_typename(table_base_url, timeout=timeout)
    df = wfs_iter_properties(table_base_url, tn, count=1000, timeout=timeout)

    if df.empty:
        raise RuntimeError("OD WFS table returned no rows.")

    od_cols = infer_od_cols(df)
    ocol, dcol = od_cols["origin_col"], od_cols["dest_col"]

    df[ocol] = df[ocol].astype(str)
    df[dcol] = df[dcol].astype(str)

    out = df[df[ocol].isin(auck_sa3)].copy()
    if internal_only:
        out = out[out[dcol].isin(auck_sa3)].copy()

    return out


def summarise_and_save(df: pd.DataFrame, origin_col: str, dest_col: str, out_dir: str) -> None:
    os.makedirs(out_dir, exist_ok=True)

    # Save main OD
    od_path = os.path.join(out_dir, "auckland_sa3_od.csv")
    df.to_csv(od_path, index=False)

    # Mode totals
    mc = mode_columns(df)
    totals = []
    for yr, cols in mc.items():
        if cols:
            s = df[cols].sum(numeric_only=True).sort_values(ascending=False)
            t = pd.DataFrame({"year": yr, "mode": s.index, "count": s.values})
            totals.append(t)
    if totals:
        mode_totals = pd.concat(totals, ignore_index=True)
        mode_totals.to_csv(os.path.join(out_dir, "mode_totals_2018_2023.csv"), index=False)

    # Destination summary (2023 total stated if available, else sum all 2023 modes)
    stated_2023 = "2023_Total_stated" if "2023_Total_stated" in df.columns else None
    stated_2018 = "2018_Total_stated" if "2018_Total_stated" in df.columns else None

    mc2023 = mc["2023"]
    mc2018 = mc["2018"]

    if stated_2023:
        df["_t2023"] = pd.to_numeric(df[stated_2023], errors="coerce").fillna(0)
    else:
        df["_t2023"] = df[mc2023].apply(pd.to_numeric, errors="coerce").fillna(0).sum(axis=1) if mc2023 else 0

    if stated_2018:
        df["_t2018"] = pd.to_numeric(df[stated_2018], errors="coerce").fillna(0)
    else:
        df["_t2018"] = df[mc2018].apply(pd.to_numeric, errors="coerce").fillna(0).sum(axis=1) if mc2018 else 0

    by_dest = (
        df.groupby(dest_col, dropna=False)[["_t2018", "_t2023"]]
        .sum()
        .sort_values("_t2023", ascending=False)
        .reset_index()
        .rename(columns={dest_col: "workplace_sa3"})
    )
    by_dest.to_csv(os.path.join(out_dir, "summary_by_destination.csv"), index=False)

    by_origin = (
        df.groupby(origin_col, dropna=False)[["_t2018", "_t2023"]]
        .sum()
        .sort_values("_t2023", ascending=False)
        .reset_index()
        .rename(columns={origin_col: "residence_sa3"})
    )
    by_origin.to_csv(os.path.join(out_dir, "summary_by_origin.csv"), index=False)

    # Clean temp cols
    df.drop(columns=["_t2018", "_t2023"], inplace=True, errors="ignore")


def main():
    parser = argparse.ArgumentParser(description="Auckland SA3 OD from Stats NZ Datafinder WFS table-122496")
    parser.add_argument(
        "--key",
        default="563539c2eaf44474b05241a7b76b839e",
        help="Datafinder services key",
    )
    parser.add_argument(
        "--out",
        default="out_auckland_od",
        help="Output folder",
    )
    parser.add_argument(
        "--internal-only",
        action="store_true",
        help="Keep only Auckland residents whose workplace SA3 is also in Auckland Region",
    )
    args = parser.parse_args()

    # WFS endpoints
    # Higher geographies SA3 layer
    hg_base = f"https://datafinder.stats.govt.nz/services;key={args.key}/wfs/layer-123506/"
    # OD table (your table-122496 endpoint)
    table_base = f"https://datafinder.stats.govt.nz/services;key={args.key}/wfs/table-122496/"

    auck_sa3 = auckland_sa3_codes(hg_base_url=hg_base, key_label="Auckland")
    df_od = build_aucklanders_od(
        table_base_url=table_base,
        auck_sa3=auck_sa3,
        internal_only=args.internal_only,
    )

    od_cols = infer_od_cols(df_od)
    summarise_and_save(df_od, od_cols["origin_col"], od_cols["dest_col"], args.out)

    print("Saved outputs to:", args.out)
    print("Rows:", len(df_od))
    print("Unique Auckland residence SA3:", df_od[od_cols["origin_col"]].nunique())
    print("Unique workplace SA3:", df_od[od_cols["dest_col"]].nunique())


if __name__ == "__main__":
    main()
