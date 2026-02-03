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

##-------------
#--If you want to add WebGIS components, you can use the following code:

import folium

m = folium.Map(location=[gdf.geometry.y.mean(), gdf.geometry.x.mean()], zoom_start=12)
for _, row in gdf.iterrows():
    folium.CircleMarker(location=[row.geometry.y, row.geometry.x], radius=2, color='blue').add_to(m)


m.save("parking_map.html")


