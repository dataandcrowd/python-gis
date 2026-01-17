import requests
import geopandas as gpd
import matplotlib.pyplot as plt

BASE = "https://services2.arcgis.com/JkPEgZJGxhSjYOo0/arcgis/rest/services/ParkingService/FeatureServer"
layer_id = 0

url = f"{BASE}/{layer_id}/query"
params = {
    "where": "1=1",
    "outFields": "*",
    "returnGeometry": "true",
    "outSR": 4326,
    "f": "geojson",
    "resultRecordCount": 2000,
}

geojson = requests.get(url, params=params, timeout=60).json()

gdf = gpd.GeoDataFrame.from_features(geojson["features"], crs="EPSG:4326")

ax = gdf.plot(figsize=(8, 8), markersize=4)
ax.set_title("Parking layer 0 (sample)")
plt.show()

