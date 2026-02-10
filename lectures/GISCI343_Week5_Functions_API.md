# GISCI 343: GIS Python Programming
## Week 5 - Functions & Web APIs
**University of Auckland | Dr Hyesop Shin**

---

# Part 1: Lecture Notes - Functions & APIs

## 1. Functions in Python

### 1.1 What are Functions?

Functions are reusable blocks of code that perform specific tasks. They help make code more organised, readable, and maintainable. In GIS work, functions allow us to process multiple datasets consistently without repeating code.

### 1.2 Defining Functions

Use the `def` keyword to define a function:

```python
def greet_user(name):
    """Print a greeting message."""
    print(f"Hello, {name}!")

greet_user("Alice")  # Output: Hello, Alice!
```

**Key points:**
- Function names should be descriptive and lowercase with underscores
- The colon (`:`) marks the start of the function body
- Indentation matters—all code inside the function must be indented

### 1.3 Parameters and Arguments

**Parameters** are variables defined in the function definition. **Arguments** are the actual values passed when calling the function.

```python
def calculate_area(width, height):
    """Calculate the area of a rectangle."""
    area = width * height
    return area

# Arguments passed when calling the function
result = calculate_area(10, 5)
print(result)  # Output: 50
```

### 1.4 Return Values

Functions can return values using the `return` statement. A function can return one or multiple values:

```python
def get_coordinates(location_name):
    """Return latitude and longitude for a location."""
    # In practice, this would query an API
    if location_name == "Auckland":
        return -37.7870, 174.7765
    return None

lat, lon = get_coordinates("Auckland")
print(f"Latitude: {lat}, Longitude: {lon}")
```

**Important:** Once a `return` statement is executed, the function stops and returns the value(s). Code after the `return` is not executed.

### 1.5 Default Parameters

You can specify default values for parameters, which are used if no argument is provided:

```python
def buffer_geometry(distance=100, units="metres"):
    """Create a buffer around geometry.

    Parameters:
    distance (float): Buffer distance, defaults to 100
    units (str): Units of measurement, defaults to "metres"
    """
    print(f"Creating buffer of {distance} {units}")

buffer_geometry()                    # Uses defaults
buffer_geometry(500)                 # distance=500, units="metres"
buffer_geometry(0.5, units="km")     # distance=0.5, units="km"
```

**Rule:** Parameters with defaults must come after parameters without defaults.

### 1.6 Docstrings

Docstrings document what your function does. They appear immediately after the `def` line, enclosed in triple quotes:

```python
def calculate_distance(lat1, lon1, lat2, lon2):
    """
    Calculate distance between two points using Haversine formula.

    Parameters:
    -----------
    lat1, lon1 : float
        Latitude and longitude of first point (decimal degrees)
    lat2, lon2 : float
        Latitude and longitude of second point (decimal degrees)

    Returns:
    --------
    float
        Distance in kilometres

    Example:
    --------
    >>> distance = calculate_distance(-37.7870, 174.7765, -37.8829, 174.7654)
    >>> print(f"{distance:.2f} km")
    """
    pass  # Implementation would go here
```

Good docstrings include:
- A brief one-line description
- Parameter descriptions (name, type, meaning)
- Return value description
- Optional: examples or notes

### 1.7 Scope: Local vs Global

**Local scope:** Variables defined inside a function exist only within that function.
**Global scope:** Variables defined outside functions exist throughout the entire script.

```python
global_var = "I'm global"

def my_function():
    local_var = "I'm local"
    print(global_var)   # Can access global variable
    print(local_var)    # Can access local variable

print(global_var)       # Works fine
print(local_var)        # ERROR: local_var doesn't exist here
```

To modify a global variable inside a function, use the `global` keyword (though this is often avoided in practice):

```python
counter = 0

def increment():
    global counter
    counter += 1

increment()
print(counter)  # Output: 1
```

**Best practice:** Rather than relying on global variables, pass variables as parameters and return results from functions. This makes code clearer and easier to debug.

---

## 2. Web APIs and Data Integration

### 2.1 What is an API?

An **API** (Application Programming Interface) is a set of rules that allows different software applications to communicate with each other. A **REST API** (Representational State Transfer) is accessed over the internet using HTTP requests and returns data (commonly in JSON format).

In GIS work, APIs allow you to:
- Geocode addresses (convert addresses to coordinates)
- Reverse geocode (convert coordinates to addresses)
- Fetch spatial data (roads, buildings, amenities)
- Access routing information
- Retrieve real-time transportation data

### 2.2 HTTP Requests and Methods

HTTP (HyperText Transfer Protocol) is the protocol used for web communication. Common HTTP methods:

| Method | Purpose | Example |
|--------|---------|---------|
| **GET** | Request data from a server | Fetch coordinates for an address |
| **POST** | Send data to a server | Submit a form, upload data |
| **PUT** | Update existing data | Modify a database record |
| **DELETE** | Delete data from server | Remove a record |

For GIS work, you'll mostly use **GET** requests to retrieve data.

### 2.3 Installing and Using the `requests` Library

The `requests` library makes HTTP requests easy:

```bash
pip install requests
```

Basic GET request:

```python
import requests

# Make a GET request
response = requests.get("https://api.example.com/data")

# Check if request was successful
if response.status_code == 200:
    data = response.json()  # Parse JSON response
    print(data)
else:
    print(f"Error: {response.status_code}")
```

### 2.4 API Endpoints and Query Parameters

An **endpoint** is a specific URL where you access API functionality. **Query parameters** modify the request and are appended to the URL with a `?` and separated by `&`:

```python
# Endpoint: https://nominatim.openstreetmap.org/search
# Query parameters: q=address, format=json

url = "https://nominatim.openstreetmap.org/search"
params = {
    "q": "Queen Street, Auckland, New Zealand",
    "format": "json"
}

response = requests.get(url, params=params)
print(response.json())
```

This generates the URL:
```
https://nominatim.openstreetmap.org/search?q=Queen+Street%2C+Auckland%2C+New+Zealand&format=json
```

### 2.5 Headers and User-Agent

HTTP headers provide additional information about the request. Many APIs require a **User-Agent** header to identify your application:

```python
headers = {
    "User-Agent": "GISCI343-Python/1.0 (University of Auckland)"
}

response = requests.get(url, params=params, headers=headers)
```

### 2.6 Authentication with API Keys

Some APIs require authentication using an **API key**—a unique identifier that grants you access.

```python
# API key in query parameters
params = {
    "q": "Auckland",
    "key": "YOUR_API_KEY_HERE"
}
response = requests.get(url, params=params)

# Or in headers
headers = {
    "Authorization": f"Bearer YOUR_API_KEY_HERE"
}
response = requests.get(url, headers=headers)
```

**Security tip:** Never hardcode API keys in scripts that might be shared. Use environment variables:

```python
import os
from dotenv import load_dotenv

load_dotenv()  # Load from .env file
api_key = os.getenv("API_KEY")
```

### 2.7 JSON Parsing

Most APIs return data in **JSON** (JavaScript Object Notation), a text format that's easy for both humans and machines to read. The `response.json()` method converts it to Python dictionaries and lists:

```python
response = requests.get(url, params=params)
data = response.json()

# JSON object → Python dictionary
# JSON array → Python list

# Accessing nested data
if data:
    first_result = data[0]
    latitude = first_result["lat"]
    longitude = first_result["lon"]
    address = first_result["display_name"]

    print(f"Coordinates: ({latitude}, {longitude})")
    print(f"Address: {address}")
```

### 2.8 Error Handling

Always handle potential errors when making API requests:

```python
import requests

try:
    url = "https://nominatim.openstreetmap.org/search"
    params = {"q": "Auckland", "format": "json"}

    response = requests.get(url, params=params, timeout=5)
    response.raise_for_status()  # Raise exception for bad status codes

    data = response.json()
    print(f"Found {len(data)} results")

except requests.exceptions.Timeout:
    print("Error: Request timed out")
except requests.exceptions.HTTPError as e:
    print(f"HTTP Error: {e.response.status_code}")
except requests.exceptions.RequestException as e:
    print(f"Request failed: {e}")
except ValueError:
    print("Error: Could not parse JSON response")
```

**Status codes to know:**
- `200`: OK—request successful
- `400`: Bad Request—check your parameters
- `401`: Unauthorised—API key missing or invalid
- `403`: Forbidden—access denied
- `404`: Not Found—endpoint doesn't exist
- `429`: Too Many Requests—rate limit exceeded
- `500`: Server Error—problem on the server side

### 2.9 Rate Limiting

Most free APIs have **rate limits**—maximum requests per minute/hour. Check API documentation and implement delays if needed:

```python
import requests
import time

for address in addresses:
    response = requests.get(url, params={"q": address})
    data = response.json()

    # Add delay to respect rate limits
    time.sleep(1)  # Wait 1 second between requests
```

### 2.10 GIS-Relevant APIs

#### **OpenStreetMap Nominatim** (Free, No Key Required)
Geocoding and reverse geocoding service. Great for converting addresses to coordinates.

```python
import requests

url = "https://nominatim.openstreetmap.org/search"
params = {
    "q": "100 Greys Avenue, Auckland, New Zealand",
    "format": "json",
    "limit": 1
}
headers = {"User-Agent": "GISCI343/1.0"}

response = requests.get(url, params=params, headers=headers)
if response.status_code == 200:
    results = response.json()
    if results:
        lat, lon = float(results[0]["lat"]), float(results[0]["lon"])
        print(f"Auckland Central Library: ({lat}, {lon})")
```

#### **Overpass API** (Free, OSM Data)
Query OpenStreetMap data by feature type, location, and tags. Excellent for fetching amenities, roads, buildings, etc.

```python
import requests

# Fetch all bus stops within a bounding box (Auckland CBD)
bbox = "174.75,-37.80,174.85,-37.76"  # min_lon, min_lat, max_lon, max_lat

overpass_url = "https://overpass-api.de/api/interpreter"
overpass_query = f"""
[bbox:{bbox}];
(
  node["highway"="bus_stop"];
  way["highway"="bus_stop"];
);
out geom;
"""

response = requests.post(overpass_url, data={"data": overpass_query})
if response.status_code == 200:
    data = response.json()
    print(f"Found {len(data['elements'])} bus stops")
```

#### **Auckland Transport API** (Free, GTFS Data)
Real-time public transport data for Auckland (requires registration but generally free tier available).

```python
# Example endpoint for routes
url = "https://api.at.govt.nz/v2/public/routes"
params = {"client_id": "YOUR_CLIENT_ID", "client_secret": "YOUR_CLIENT_SECRET"}

response = requests.get(url, params=params)
routes = response.json()
```

#### **Google Maps API** (Paid, Premium Features)
Powerful but requires payment. Free tier has limitations. Consider Nominatim/Overpass for academic projects as free alternatives.

```python
# Example (requires API key)
url = "https://maps.googleapis.com/maps/api/geocode/json"
params = {
    "address": "Queen Street, Auckland",
    "key": "YOUR_API_KEY"
}
response = requests.get(url, params=params)
```

---

# Part 2: Lab Exercise - Functions and API Integration

**Duration:** Approximately 2 hours
**Learning outcomes:** Students will be able to write reusable functions and integrate them with web APIs to retrieve and process geographic data.

**Setup:** Ensure you have the following libraries installed:

```bash
pip install requests pandas folium
```

---

## Exercise 1: Basic Functions (30 minutes)

### 1.1 Haversine Distance Function

The Haversine formula calculates the great-circle distance between two points on Earth using their latitude and longitude.

**Task:** Write a function to calculate distance between two coordinates.

```python
import math

def haversine_distance(lat1, lon1, lat2, lon2):
    """
    Calculate the great-circle distance between two points on Earth.

    Parameters:
    -----------
    lat1, lon1 : float
        Latitude and longitude of first point (decimal degrees)
    lat2, lon2 : float
        Latitude and longitude of second point (decimal degrees)

    Returns:
    --------
    float
        Distance in kilometres
    """
    # Earth's radius in kilometres
    R = 6371.0

    # Convert degrees to radians
    lat1_rad = math.radians(lat1)
    lon1_rad = math.radians(lon1)
    lat2_rad = math.radians(lat2)
    lon2_rad = math.radians(lon2)

    # Differences
    dlat = lat2_rad - lat1_rad
    dlon = lon2_rad - lon1_rad

    # Haversine formula
    a = math.sin(dlat / 2) ** 2 + math.cos(lat1_rad) * math.cos(lat2_rad) * math.sin(dlon / 2) ** 2
    c = 2 * math.asin(math.sqrt(a))
    distance = R * c

    return distance

# Test your function
auckland_library = (-37.7870, 174.7765)
auckland_museum = (-37.8829, 174.7654)

distance = haversine_distance(
    auckland_library[0], auckland_library[1],
    auckland_museum[0], auckland_museum[1]
)

print(f"Distance: {distance:.2f} km")
# Expected output: Distance: 11.25 km (approximately)
```

### 1.2 Air Quality Index Classifier

**Task:** Write a function that classifies air quality based on an AQI value.

```python
def classify_air_quality(aqi_value):
    """
    Classify air quality based on AQI value (0-500 scale).

    Parameters:
    -----------
    aqi_value : float
        Air Quality Index value

    Returns:
    --------
    str
        Air quality classification
    """
    if aqi_value <= 50:
        return "Good"
    elif aqi_value <= 100:
        return "Moderate"
    elif aqi_value <= 150:
        return "Unhealthy for Sensitive Groups"
    elif aqi_value <= 200:
        return "Unhealthy"
    elif aqi_value <= 300:
        return "Very Unhealthy"
    else:
        return "Hazardous"

# Test your function
test_values = [35, 75, 125, 175, 250, 350]

for aqi in test_values:
    classification = classify_air_quality(aqi)
    print(f"AQI {aqi}: {classification}")

# Expected output:
# AQI 35: Good
# AQI 75: Moderate
# AQI 125: Unhealthy for Sensitive Groups
# AQI 175: Unhealthy
# AQI 250: Very Unhealthy
# AQI 350: Hazardous
```

### 1.3 Calculate Centroid

**Task:** Write a function that calculates the centroid of a list of coordinates.

```python
def calculate_centroid(coordinates):
    """
    Calculate the centroid (centre point) of a list of coordinates.

    Parameters:
    -----------
    coordinates : list of tuples
        List of (latitude, longitude) tuples

    Returns:
    --------
    tuple
        (centre_latitude, centre_longitude)

    Example:
    --------
    >>> coords = [(-37.7870, 174.7765), (-37.8829, 174.7654)]
    >>> centre = calculate_centroid(coords)
    >>> print(centre)
    (-37.83495, 174.77095)
    """
    if not coordinates:
        return None

    latitudes = [lat for lat, lon in coordinates]
    longitudes = [lon for lat, lon in coordinates]

    centre_lat = sum(latitudes) / len(latitudes)
    centre_lon = sum(longitudes) / len(longitudes)

    return (centre_lat, centre_lon)

# Test your function
locations = [
    (-37.7870, 174.7765),  # Auckland Central Library
    (-37.8829, 174.7654),  # Auckland Museum
    (-37.7694, 174.6862),  # Auckland Domain
]

centre = calculate_centroid(locations)
print(f"Centroid: {centre}")
# Expected output: Centroid: (-37.81309999999999, 174.7427)
```

**Extension:** What happens if you pass an empty list? How could you improve the error handling?

---

## Exercise 2: Working with APIs (45 minutes)

### 2.1 Nominatim Geocoding

**Task:** Use the Nominatim API to geocode Auckland addresses and extract coordinates.

```python
import requests
import pandas as pd

def geocode_address(address):
    """
    Geocode an address using OpenStreetMap Nominatim API.

    Parameters:
    -----------
    address : str
        Street address to geocode

    Returns:
    --------
    dict or None
        Dictionary with 'latitude', 'longitude', 'address' keys, or None if not found
    """
    url = "https://nominatim.openstreetmap.org/search"

    params = {
        "q": address,
        "format": "json",
        "limit": 1
    }

    headers = {
        "User-Agent": "GISCI343-Python/1.0 (University of Auckland)"
    }

    try:
        response = requests.get(url, params=params, headers=headers, timeout=5)
        response.raise_for_status()

        results = response.json()

        if results:
            first_result = results[0]
            return {
                "latitude": float(first_result["lat"]),
                "longitude": float(first_result["lon"]),
                "address": first_result["display_name"]
            }
        else:
            return None

    except requests.exceptions.RequestException as e:
        print(f"Error geocoding '{address}': {e}")
        return None

# Test with multiple addresses
addresses = [
    "Queen Street, Auckland, New Zealand",
    "University of Auckland, New Zealand",
    "100 Greys Avenue, Auckland, New Zealand",
    "Waitakere Ranges, Auckland, New Zealand"
]

print("Geocoding Auckland addresses...\n")

results = []
for address in addresses:
    result = geocode_address(address)
    if result:
        results.append(result)
        print(f"✓ {address}")
        print(f"  Coordinates: ({result['latitude']:.4f}, {result['longitude']:.4f})\n")
    else:
        print(f"✗ Could not geocode: {address}\n")

    # Be polite to the API—add a small delay
    requests.utils.THROTTLE_SLEEP = 1

# Create a DataFrame
df = pd.DataFrame(results)
print("\nSummary DataFrame:")
print(df)

# Expected output (values will vary slightly based on API data):
# latitude       longitude                                           address
# 0  -37.776700  174.768600  Queen Street, Karangahape, Auckland, ...
# 1  -37.781883  174.768597  University of Auckland, Symonds Stre...
# 2  -37.785500  174.775200  100 Greys Avenue, Auckland Central, ...
# 3  -37.595317  174.465270  Waitakere Ranges, Auckland, New Zealand
```

### 2.2 Overpass API for OSM Data

**Task:** Fetch all bus stops in Auckland CBD using Overpass API.

```python
import requests
import pandas as pd

def fetch_bus_stops(bbox):
    """
    Fetch bus stops from OpenStreetMap using Overpass API.

    Parameters:
    -----------
    bbox : str
        Bounding box string: "min_lon,min_lat,max_lon,max_lat"

    Returns:
    --------
    list
        List of dictionaries with bus stop data
    """
    # Overpass QL query for bus stops
    query = f"""
    [bbox:{bbox}];
    (
      node["highway"="bus_stop"];
      way["highway"="bus_stop"];
    );
    out geom;
    """

    url = "https://overpass-api.de/api/interpreter"

    try:
        response = requests.post(url, data={"data": query}, timeout=30)
        response.raise_for_status()

        data = response.json()
        bus_stops = []

        for element in data.get("elements", []):
            if element["type"] == "node":
                stop = {
                    "id": element["id"],
                    "latitude": element["lat"],
                    "longitude": element["lon"],
                    "name": element.get("tags", {}).get("name", "Unnamed"),
                    "type": "node"
                }
                bus_stops.append(stop)
            elif element["type"] == "way":
                # For ways, get the centre point
                if "center" in element:
                    stop = {
                        "id": element["id"],
                        "latitude": element["center"]["lat"],
                        "longitude": element["center"]["lon"],
                        "name": element.get("tags", {}).get("name", "Unnamed"),
                        "type": "way"
                    }
                    bus_stops.append(stop)

        return bus_stops

    except requests.exceptions.RequestException as e:
        print(f"Error fetching bus stops: {e}")
        return []

# Auckland CBD bounding box (min_lon, min_lat, max_lon, max_lat)
auckland_cbd_bbox = "174.75,-37.80,174.85,-37.76"

print("Fetching bus stops in Auckland CBD...")
bus_stops = fetch_bus_stops(auckland_cbd_bbox)

# Convert to DataFrame
df = pd.DataFrame(bus_stops)
print(f"\nFound {len(bus_stops)} bus stops\n")
print(df.head(10))

# Summary statistics
print(f"\nBus stops by type:")
print(df["type"].value_counts())

# Expected output (actual numbers vary):
# Found 247 bus stops
#        id  latitude  longitude                                name    type
# 0  123456  -37.7823  174.7658              Queen Street (Stop A)    node
# 1  123457  -37.7825  174.7665              Queen Street (Stop B)    node
# 2  123458  -37.7830  174.7672                  Greys Avenue (NB)    node
# ... (more rows)
```

**Hints:**
- The Overpass API can be slow for large queries. Be patient!
- Increase `timeout` if requests time out
- Try smaller bounding boxes if the API is overloaded
- Check Overpass API status: https://overpass-api.de/

---

## Exercise 3: Combining Functions and APIs (45 minutes)

### 3.1 Function: Geocode and Return Coordinates

**Task:** Write a function that takes an address string, geocodes it via Nominatim, and returns coordinates.

```python
import requests
import time

def get_coordinates_from_address(address, delay=1):
    """
    Get latitude and longitude coordinates for an address.

    Parameters:
    -----------
    address : str
        Address to geocode
    delay : float
        Delay in seconds between requests (default 1, to respect rate limits)

    Returns:
    --------
    tuple or None
        (latitude, longitude) if successful, None otherwise
    """
    url = "https://nominatim.openstreetmap.org/search"

    params = {
        "q": address,
        "format": "json",
        "limit": 1
    }

    headers = {
        "User-Agent": "GISCI343-Python/1.0 (University of Auckland)"
    }

    try:
        response = requests.get(url, params=params, headers=headers, timeout=5)
        response.raise_for_status()

        results = response.json()
        if results:
            lat = float(results[0]["lat"])
            lon = float(results[0]["lon"])
            return (lat, lon)
        else:
            print(f"No results found for: {address}")
            return None

    except Exception as e:
        print(f"Error: {e}")
        return None

    finally:
        # Always add delay to be respectful to the API
        time.sleep(delay)

# Test the function
address = "100 Greys Avenue, Auckland, New Zealand"
coords = get_coordinates_from_address(address)

if coords:
    print(f"Address: {address}")
    print(f"Coordinates: {coords}")

    # Use with your haversine_distance function from Exercise 1
    auckland_cbd = (-37.7870, 174.7765)
    distance = haversine_distance(coords[0], coords[1],
                                  auckland_cbd[0], auckland_cbd[1])
    print(f"Distance to Auckland CBD: {distance:.2f} km")

# Expected output:
# Address: 100 Greys Avenue, Auckland, New Zealand
# Coordinates: (-37.7855, 174.7752)
# Distance to Auckland CBD: 0.18 km
```

### 3.2 Function: Find Nearest Bus Stops

**Task:** Write a function that finds the nearest bus stop to a given coordinate.

```python
def find_nearest_bus_stop(latitude, longitude, bus_stops_df, max_distance=1.0):
    """
    Find the nearest bus stop to a given coordinate.

    Parameters:
    -----------
    latitude, longitude : float
        Coordinates of the search location
    bus_stops_df : pandas.DataFrame
        DataFrame with bus stop data (must have 'latitude', 'longitude', 'name' columns)
    max_distance : float
        Maximum search distance in kilometres (default 1.0)

    Returns:
    --------
    dict or None
        Nearest bus stop data, or None if no stops within max_distance
    """
    # Calculate distance to all bus stops
    bus_stops_df["distance_km"] = bus_stops_df.apply(
        lambda row: haversine_distance(
            latitude, longitude,
            row["latitude"], row["longitude"]
        ),
        axis=1
    )

    # Filter by max distance
    nearby = bus_stops_df[bus_stops_df["distance_km"] <= max_distance]

    if nearby.empty:
        return None

    # Return the nearest
    nearest = nearby.loc[nearby["distance_km"].idxmin()]
    return {
        "name": nearest["name"],
        "latitude": nearest["latitude"],
        "longitude": nearest["longitude"],
        "distance_km": nearest["distance_km"]
    }

# Example usage with data from Exercise 2
if not df.empty:  # df is the bus_stops DataFrame from Exercise 2

    # Auckland Central Library coordinates
    lib_coords = (-37.7870, 174.7765)

    nearest = find_nearest_bus_stop(lib_coords[0], lib_coords[1], df, max_distance=2.0)

    if nearest:
        print(f"Nearest bus stop to Auckland Central Library:")
        print(f"  Name: {nearest['name']}")
        print(f"  Coordinates: ({nearest['latitude']:.4f}, {nearest['longitude']:.4f})")
        print(f"  Distance: {nearest['distance_km']:.2f} km")
    else:
        print("No bus stops found within 2 km")

# Expected output:
# Nearest bus stop to Auckland Central Library:
#   Name: Greys Avenue (South bound)
#   Coordinates: (-37.7823, 174.7665)
#   Distance: 0.64 km
```

### 3.3 Complete Workflow: From Address to Map

**Task:** Combine everything—geocode an address, find nearby bus stops, and visualise on a map.

```python
import pandas as pd
import folium
import requests

def create_location_map(address, bus_stops_df, max_distance=2.0):
    """
    Geocode an address and create a map showing nearby bus stops.

    Parameters:
    -----------
    address : str
        Address to geocode
    bus_stops_df : pandas.DataFrame
        DataFrame with bus stop data
    max_distance : float
        Maximum distance to search for bus stops (km)

    Returns:
    --------
    folium.Map
        Folium map object
    """
    # Step 1: Geocode the address
    coords = get_coordinates_from_address(address)
    if not coords:
        print(f"Could not geocode address: {address}")
        return None

    lat, lon = coords
    print(f"\nAddress: {address}")
    print(f"Coordinates: ({lat:.4f}, {lon:.4f})")

    # Step 2: Create map centred on the address
    m = folium.Map(
        location=[lat, lon],
        zoom_start=15,
        tiles="OpenStreetMap"
    )

    # Step 3: Add marker for the address
    folium.Marker(
        location=[lat, lon],
        popup=address,
        icon=folium.Icon(color="blue", icon="info-sign"),
        tooltip="Search Location"
    ).add_to(m)

    # Step 4: Find nearby bus stops
    bus_stops_df["distance_km"] = bus_stops_df.apply(
        lambda row: haversine_distance(lat, lon, row["latitude"], row["longitude"]),
        axis=1
    )

    nearby = bus_stops_df[bus_stops_df["distance_km"] <= max_distance]
    print(f"Found {len(nearby)} bus stops within {max_distance} km")

    # Step 5: Add bus stop markers to map
    for idx, stop in nearby.iterrows():
        folium.CircleMarker(
            location=[stop["latitude"], stop["longitude"]],
            radius=5,
            popup=f"{stop['name']}<br>Distance: {stop['distance_km']:.2f} km",
            color="red",
            fill=True,
            fillOpacity=0.6,
            tooltip=stop["name"]
        ).add_to(m)

    return m

# Complete example workflow
print("=" * 60)
print("LOCATION AND BUS STOP MAPPER")
print("=" * 60)

# Fetch bus stops (from Exercise 2)
auckland_cbd_bbox = "174.75,-37.80,174.85,-37.76"
print("Fetching bus stops in Auckland CBD...")
bus_stops = fetch_bus_stops(auckland_cbd_bbox)
bus_stops_df = pd.DataFrame(bus_stops)
print(f"Retrieved {len(bus_stops_df)} bus stops\n")

# Create map for a specific address
test_address = "100 Greys Avenue, Auckland, New Zealand"
map_obj = create_location_map(test_address, bus_stops_df, max_distance=1.0)

if map_obj:
    # Save the map
    map_obj.save("auckland_bus_stops.html")
    print("\nMap saved to 'auckland_bus_stops.html'")
    print("Open this file in a web browser to view the interactive map")

# Expected output:
# ============================================================
# LOCATION AND BUS STOP MAPPER
# ============================================================
# Fetching bus stops in Auckland CBD...
# Retrieved 247 bus stops
#
# Address: 100 Greys Avenue, Auckland, New Zealand
# Coordinates: (-37.7855, 174.7752)
# Found 12 bus stops within 1.0 km
#
# Map saved to 'auckland_bus_stops.html'
# Open this file in a web browser to view the interactive map
```

---

## Challenge Exercises

### Challenge 1: Error Handling Improvements
Modify the `get_coordinates_from_address` function to handle these scenarios:
- Network connection errors
- API timeout (server not responding)
- Invalid address format (e.g., missing country)
- Rate limiting (getting 429 status code)

Implement appropriate error messages and retry logic.

### Challenge 2: Batch Geocoding
Create a function that geocodes a list of addresses and returns a pandas DataFrame with the results. Include error handling to continue processing even if some addresses fail.

```python
def batch_geocode(addresses, output_file="geocoded_results.csv"):
    """Geocode multiple addresses and save to CSV."""
    # Your implementation here
    pass
```

### Challenge 3: Reverse Geocoding
Use Nominatim's reverse geocoding endpoint to convert coordinates back to addresses.

```python
url = "https://nominatim.openstreetmap.org/reverse"
params = {
    "format": "json",
    "lat": latitude,
    "lon": longitude
}
```

### Challenge 4: API Comparison
Compare three different geocoding APIs (Nominatim, Google Maps, and one other of your choice):
- Accuracy (do they return the same coordinates?)
- Speed
- Rate limits
- Ease of use

Create a comparison table in your notebook.

### Challenge 5: Real-time Transport Data
Integrate with Auckland Transport API to fetch real-time bus arrival information for stops found in Exercise 3.

---

## Summary Checklist

By the end of this lab, you should be able to:

- [ ] Define functions with parameters, return values, and docstrings
- [ ] Understand local and global scope
- [ ] Explain what an API is and how HTTP requests work
- [ ] Use the `requests` library to make GET and POST requests
- [ ] Parse JSON responses from APIs
- [ ] Handle API errors using try/except blocks
- [ ] Work with query parameters and headers
- [ ] Respect API rate limits
- [ ] Geocode addresses using Nominatim
- [ ] Fetch geographic data from Overpass API
- [ ] Combine functions and APIs in a complete workflow
- [ ] Visualise results on interactive maps with folium

---

## Useful Resources

**Documentation:**
- Python Requests: https://docs.python-requests.org/
- Nominatim API: https://nominatim.org/
- Overpass API: https://wiki.openstreetmap.org/wiki/Overpass_API
- Folium Maps: https://folium.readthedocs.io/
- Pandas: https://pandas.pydata.org/

**Tutorials:**
- Real Python: Working with APIs in Python
- OpenStreetMap Wiki: Overpass API usage
- GIS Stack Exchange: Common API questions

**API Credentials:**
- Most free APIs (Nominatim, Overpass) require no key
- For Google Maps, Auckland Transport, etc., create free developer accounts
- Never share API keys publicly

---

**Last Updated:** 2026
**Course:** GISCI 343 – GIS Python Programming
**Instructor:** Dr Hyesop Shin
**University of Auckland**
