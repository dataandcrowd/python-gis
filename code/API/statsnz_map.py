import requests
import geopandas as gpd


# Query Stats NZ Datafinder API for vector data - Auckland
url = "https://datafinder.stats.govt.nz/services/query/v1/vector.json"

params = {
    "key": "563539c2eaf44474b05241a7b76b839e",
    "layer": 120946,
    "x": 174.7633,
    "y": -36.8485,
    "max_results": 3,
    "radius": 10000,
    "geometry": "true",
    "with_field_names": "true"
}

resp = requests.get(url, params=params)
data = resp.json()

layer_id = "120946"

features = data["vectorQuery"]["layers"][layer_id]["features"]

gdf = gpd.GeoDataFrame.from_features(features, crs="EPSG:4326")
print(gdf.head())

ax = gdf.plot(figsize=(8, 8), markersize=50, color='red', alpha=0.5)
ax.set_title("Stats NZ Layer 120946 (sample)")



#####################
cap_url = "https://datafinder.stats.govt.nz/services;key=563539c2eaf44474b05241a7b76b839e/wfs/"
params = {"service": "WFS", "request": "GetCapabilities"}

resp = requests.get(cap_url, params=params, timeout=60)
print("Status:", resp.status_code)
print("Content-Type:", resp.headers.get("Content-Type"))
print(resp.text[:300])

with open("wfs_capabilities.xml", "w", encoding="utf-8") as f:
    f.write(resp.text)

import xml.etree.ElementTree as ET
import pandas as pd
tree = ET.parse("wfs_capabilities.xml")
root = tree.getroot()

def local(tag):
    return tag.split("}", 1)[-1] if "}" in tag else tag

# Find FeatureTypeList regardless of namespace
ft_list = None
for el in root.iter():
    if local(el.tag) == "FeatureTypeList":
        ft_list = el
        break

if ft_list is None:
    raise ValueError("Could not find FeatureTypeList in capabilities XML")

layers = []
for ft in ft_list:
    if local(ft.tag) != "FeatureType":
        continue

    name = title = default_crs = None
    bbox = None

    for child in ft:
        t = local(child.tag)
        if t == "Name":
            name = (child.text or "").strip()
        elif t == "Title":
            title = (child.text or "").strip()
        elif t in ["DefaultCRS", "DefaultSRS", "SRS"]:
            default_crs = (child.text or "").strip()
        elif t in ["WGS84BoundingBox", "LatLongBoundingBox", "BoundingBox"]:
            # Try to capture any bbox metadata
            bbox = ET.tostring(child, encoding="unicode")

    layers.append({
        "name": name,
        "title": title,
        "default_crs": default_crs,
        "bbox_raw": bbox
    })

df = pd.DataFrame(layers).dropna(subset=["name"]).sort_values("name")
print(df[["name", "title", "default_crs"]].head(30))
print("Total layers:", len(df))

df.to_csv("wfs_layers.csv", index=False)

######################

layer_name = df.iloc[0]["name"]  # replace with the one you want

params = {
    "service": "WFS",
    "request": "GetFeature",
    "typeName": layer_name,       # WFS 1.1.0
    "outputFormat": "application/json"
}

r = requests.get(cap_url, params=params, timeout=120)
print("Status:", r.status_code, "Content-Type:", r.headers.get("Content-Type"))
with open("layer.geojson", "w", encoding="utf-8") as f:
    f.write(r.text)

#import geopandas as gpd
gdf2 = gpd.read_file("layer.geojson")
print(gdf2.head())

ax2 = gdf2.plot(figsize=(8, 8), markersize=20, color='green', alpha=0.5)
ax2.set_title(f"Stats NZ Layer {layer_name} (sample)")
