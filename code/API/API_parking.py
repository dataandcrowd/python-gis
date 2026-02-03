import requests

BASE = "https://services2.arcgis.com/JkPEgZJGxhSjYOo0/arcgis/rest/services/ParkingService/FeatureServer"

svc = requests.get(BASE, params={"f": "pjson"}, timeout=60).json()

print("Service description:", svc.get("serviceDescription"))
print("Max record count:", svc.get("maxRecordCount"))
print("Spatial reference WKID:", svc.get("spatialReference", {}).get("wkid"))

print("\nLayers:")
for lyr in svc.get("layers", []):
    print(f"  {lyr['id']}: {lyr['name']} ({lyr.get('geometryType')})")

layer_id = 0  # Parking Meter
url = f"{BASE}/{layer_id}/query"

params = {
    "where": "1=1",
    "outFields": "*",
    "outSR": 4326,   # return lat/lon (WGS84)
    "f": "json",
    "resultRecordCount": 5,
}

data = requests.get(url, params=params, timeout=60).json()
print("Keys:", data.keys())
print("Returned features:", len(data.get("features", [])))

BASE = "https://services2.arcgis.com/JkPEgZJGxhSjYOo0/arcgis/rest/services/ParkingService/FeatureServer"

def query_by_bbox(layer_id: int, xmin: float, ymin: float, xmax: float, ymax: float, where: str = "1=1"):
    url = f"{BASE}/{layer_id}/query"
    params = {
        "where": where,
        "outFields": "*",
        "returnGeometry": "true",
        "geometry": f"{xmin},{ymin},{xmax},{ymax}",
        "geometryType": "esriGeometryEnvelope",
        "inSR": 4326,
        "spatialRel": "esriSpatialRelIntersects",
        "outSR": 4326,
        "f": "json",
        "resultRecordCount": 1000,  # service maxRecordCount is 1000
    }
    return requests.get(url, params=params, timeout=60).json()

# Your extent
xmin, ymin = 174.5805, -37.0731
xmax, ymax = 175.4660, -36.2433

data = query_by_bbox(layer_id=0, xmin=xmin, ymin=ymin, xmax=xmax, ymax=ymax)
print("Returned features:", len(data.get("features", [])))

##---------

def query_all_paged(layer_id: int, params: dict, page_size: int = 1000):
    url = f"{BASE}/{layer_id}/query"
    offset = 0
    all_features = []

    while True:
        page_params = dict(params)
        page_params["resultOffset"] = offset
        page_params["resultRecordCount"] = page_size

        resp = requests.get(url, params=page_params, timeout=60).json()
        feats = resp.get("features", [])
        all_features.extend(feats)

        # ArcGIS commonly signals more pages via exceededTransferLimit in some services
        has_more = resp.get("exceededTransferLimit") is True

        if (not feats) or (not has_more and len(feats) < page_size):
            break

        offset += len(feats)

    return all_features

# Example: get all Parking Meter points in your bbox
base_params = {
    "where": "1=1",
    "outFields": "*",
    "returnGeometry": "true",
    "geometry": f"{xmin},{ymin},{xmax},{ymax}",
    "geometryType": "esriGeometryEnvelope",
    "inSR": 4326,
    "spatialRel": "esriSpatialRelIntersects",
    "outSR": 4326,
    "f": "json",
}

features = query_all_paged(layer_id=0, params=base_params, page_size=1000)
print("Total features fetched:", len(features))
