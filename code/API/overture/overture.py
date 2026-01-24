"""
momepy_quick_example.py

A minimal, reproducible momepy example:
- Loads the built-in 'Auckland' dataset (buildings + streets)
- Cleans geometries (just enough to avoid common errors)
- Computes a few classic urban morphology metrics
- Plots results with matplotlib

Install (uv example):
  uv add geopandas pandas numpy momepy matplotlib shapely pyproj fiona overturemaps
  
overturemaps download --bbox=174.6,-37.0,174.9,-36.7 -f geojson --type=building -o auckland_buildings.geojson


"""

import numpy as np
import pandas as pd
import geopandas as gpd
import momepy as mm
import matplotlib.pyplot as plt

akl_bld = gpd.read_file("auckland_central.geojson")
akl_rd = gpd.read_file("auckland_roads.geojson")

ax = akl_bld.plot(figsize=(8, 8))
ax.set_axis_off()


# 1. Ensure both layers use the same Coordinate Reference System (CRS)
akl_rd = akl_rd.to_crs(akl_bld.crs)

# 2. Get the rectangular extent of the buildings
building_extent = akl_bld.total_bounds  # returns (minx, miny, maxx, maxy)

# 3. Clip the roads to this rectangle
akl_rd_clipped = gpd.clip(akl_rd, building_extent)

# 4. Plot the results
ax = akl_rd_clipped.plot(color='gray', linewidth=0.5)
akl_bld.plot(ax=ax, color='blue')
ax.set_axis_off()


#-------
buildings = gpd.read_file(
    mm.datasets.get_path("bubenec"), layer="buildings"
)

ax = buildings.plot(figsize=(8, 8))
ax.set_axis_off()

