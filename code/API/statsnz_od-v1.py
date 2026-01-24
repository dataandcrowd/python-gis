import requests
import pandas as pd
import xml.etree.ElementTree as ET

BASE = "https://datafinder.stats.govt.nz/services;key=563539c2eaf44474b05241a7b76b839e/wfs/table-122496/"

def first_typename():
    xml = requests.get(BASE, params={"service":"WFS","request":"GetCapabilities","version":"2.0.0"}, timeout=60).text
    root = ET.fromstring(xml)
    for ft in root.iter():
        if ft.tag.endswith("FeatureType"):
            for ch in ft:
                if ch.tag.endswith("Name") and ch.text:
                    return ch.text.strip()
    raise RuntimeError("No typeNames found in GetCapabilities.")

tname = first_typename()
r = requests.get(
    BASE,
    params={
        "service":"WFS","request":"GetFeature","version":"2.0.0",
        "typeNames": tname, "count": 1000,
        "outputFormat":"application/json"
    },
    timeout=60
)
r.raise_for_status()

js = r.json()
df = pd.json_normalize([f.get("properties", {}) for f in js.get("features", [])])
print(tname, df.shape)
print(df.head())
