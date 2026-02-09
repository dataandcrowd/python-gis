from ipyleaflet import Map, basemaps, basemap_to_tiles, Marker

m = Map(
    basemap=basemap_to_tiles(basemaps.NASAGIBS.ModisTerraTrueColorCR, "2017-04-08"),
    center=(-36.85303, 174.7659561),
    zoom=4
)

m.add(Marker(location=(-36.85303, 174.7659561)))

m

#optional
m.save('my_map.html', title='My Map')