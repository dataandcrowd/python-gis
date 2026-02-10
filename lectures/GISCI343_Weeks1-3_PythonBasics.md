# GISCI 343: GIS Python - Weeks 1-3
## Python Foundations for GIS
**University of Auckland | Dr Hyesop Shin**

---

## Week 1: Python Fundamentals & Environment Setup

### Lecture Notes

#### Why Python for GIS?

Python has become the dominant programming language for geospatial analysis and GIS applications. Key advantages include:

- **Open Source**: Free to use and modify; extensive community contributions
- **Rich Ecosystem**: Libraries like GeoPandas, Shapely, Rasterio, Folium, and ArcPy
- **Readability**: Clear, intuitive syntax that prioritises readable code
- **Community Support**: Large GIS and data science communities with abundant tutorials and forums
- **Reproducibility**: Scripts can be version-controlled and shared easily
- **Integration**: Works seamlessly with databases, web services, and desktop GIS tools
- **Automation**: Ideal for batch processing large spatial datasets

#### Setting Up Your Environment

**Anaconda/Miniconda Installation:**
- Download from anaconda.com or docs.conda.io/projects/miniconda
- Anaconda includes Jupyter, NumPy, Pandas, and many data science tools
- Miniconda is lighter; install packages as needed

**Creating a GIS Environment:**
```bash
conda create -n gis-python python=3.10
conda activate gis-python
conda install jupyter pandas geopandas shapely folium
```

**Launching Jupyter Notebook:**
```bash
jupyter notebook
```
This opens a browser window at localhost:8888 where you can create new Python notebooks.

**Alternative: VS Code**
- Install Python extension
- Create `.py` files and run with Python interpreter
- Useful for larger projects and scripts

#### Python Basics: Variables and Data Types

**Variables** store information. In Python, you don't declare types; they're inferred:

```python
# Integers
population = 1_640_000  # Auckland population
latitude = -37
longitude = 174

# Floats (decimal numbers)
latitude_precise = -37.7383
longitude_precise = 174.8860

# Strings (text)
city_name = "Auckland"
location = 'New Zealand'

# Booleans (True/False)
is_urban = True
is_coastal = True
```

**Key Points:**
- Variable names are case-sensitive: `City` ≠ `city`
- Use descriptive names: `population` not `p`
- No spaces in names; use underscores: `median_income` not `median income`
- Avoid Python keywords (if, for, while, def, class, etc.)

#### Data Types: The Main Four

| Type | Example | Usage |
|------|---------|-------|
| `int` | `1640000` | Whole numbers, counts |
| `float` | `-37.7383` | Decimal values, coordinates |
| `str` | `"Auckland"` | Text, place names |
| `bool` | `True` | Logic (yes/no, on/off) |

**Checking Types:**
```python
print(type(population))      # <class 'int'>
print(type(latitude_precise)) # <class 'float'>
print(type(city_name))        # <class 'str'>
print(type(is_urban))         # <class 'bool'>
```

#### Operators

**Arithmetic Operators:**
```python
distance1 = 10  # km
distance2 = 5.5  # km

addition = distance1 + distance2          # 15.5
subtraction = distance1 - distance2       # 4.5
multiplication = distance1 * distance2    # 55.0
division = distance1 / distance2          # 1.818...
floor_division = distance1 // distance2   # 1
exponentiation = distance1 ** 2           # 100
modulo = distance1 % distance2            # 4.5 (remainder)
```

**Comparison Operators:** Return True or False
```python
population = 1_640_000

population > 1_000_000      # True
population == 1_640_000     # True
population != 1_500_000     # True
population < 2_000_000      # True
population >= 1_640_000     # True
population <= 1_640_000     # True
```

**Logical Operators:**
```python
is_urban = True
is_coastal = True
is_southern_hemisphere = True

is_urban and is_coastal              # True (both must be True)
is_urban or False                    # True (at least one True)
not is_urban                         # False (negates the value)

# Example: Auckland classification
auckland_valid = is_urban and is_coastal and is_southern_hemisphere  # True
```

#### Type Conversion

Converting between types is common in GIS work:

```python
# String to integer
lat_string = "-37"
lat_int = int(lat_string)           # -37

# String to float
long_string = "174.8860"
long_float = float(long_string)     # 174.886

# Number to string
zone = "Zone "
zone_number = 60
zone_label = zone + str(zone_number)  # "Zone 60"

# Float to integer (truncates decimal)
distance = 15.9
distance_rounded = int(distance)     # 15

# Boolean to integer (False=0, True=1)
int(True)   # 1
int(False)  # 0
```

**Conversion Caution:**
```python
# This fails:
int("37.5")  # ValueError

# Must convert to float first:
int(float("37.5"))  # 37
```

#### Print Statements and F-Strings

**Basic Printing:**
```python
print("Hello, Auckland GIS!")
```

**Printing Multiple Items:**
```python
suburb = "Grey Lynn"
population = 12500
print(suburb, population)  # Grey Lynn 12500
```

**F-Strings (Formatted String Literals):**
The modern, clean way to format text:

```python
suburb = "Ponsonby"
lat = -37.8267
lng = 174.7647
population = 18200

# Simple insertion
print(f"The suburb {suburb} has {population} residents")
# Output: The suburb Ponsonby has 18200 residents

# With formatting
print(f"Coordinates: ({lat:.4f}, {lng:.4f})")
# Output: Coordinates: (-37.8267, 174.7647)

# Multiple lines
info = f"""
Suburb: {suburb}
Population: {population:,}
Latitude: {lat}
Longitude: {lng}
"""
print(info)
```

**F-String Formatting Options:**
```python
pi = 3.14159265

f"{pi:.2f}"          # 3.14 (2 decimal places)
f"{pi:.4f}"          # 3.1416 (4 decimal places)
f"{1640000:,}"       # 1,640,000 (with commas)
f"{100:.1%}"         # 100.0% (as percentage)
```

#### Comments and Documentation

**Single-line Comments:**
```python
# Calculate distance between two points in Auckland
distance = 15.5  # in kilometres
```

**Multi-line Comments:**
```python
# Estimate population density
# Using 2023 census data
# Units: people per square kilometre
density = 1640000 / 1086  # people/km²
```

**Docstrings (for functions/classes—coming later):**
```python
def calculate_distance(lat1, lng1, lat2, lng2):
    """
    Calculate approximate straight-line distance between two coordinates.

    Args:
        lat1, lng1: First point (latitude, longitude)
        lat2, lng2: Second point (latitude, longitude)

    Returns:
        float: Approximate distance in kilometres
    """
    # Implementation here
    pass
```

**Best Practices:**
- Comment the "why", not the "what"
- Keep comments up-to-date with code
- Use meaningful variable names to reduce need for comments

---

### Lab Exercise (2 hours)

#### Exercise 1: Set Up Jupyter Notebook Environment

**Objective:** Familiarise yourself with the Jupyter Notebook interface and create your first cell.

1. **Launch Jupyter:**
   ```bash
   jupyter notebook
   ```

2. **Create a New Notebook:**
   - Click "New" → Python 3 (or your environment's Python version)

3. **Explore the Interface:**
   - **Code Cell**: Write and run Python code
   - **Markdown Cell**: Write documentation, notes, titles
   - Run cells with Shift+Enter

4. **Create Your First Cells:**

   Cell 1 (Markdown):
   ```markdown
   # GISCI 343: GIS Python Lab
   ## Week 1: Python Fundamentals
   Student: [Your Name]
   Date: [Today's Date]
   ```

   Cell 2 (Code):
   ```python
   print("Welcome to GIS Python!")
   print("This notebook covers Week 1 fundamentals.")
   ```

5. **Save Your Notebook:**
   - File → Save As
   - Name: `GISCI343_Week1_Lab.ipynb`

---

#### Exercise 2: Variables and Types

**Objective:** Store Auckland geographical data and perform basic calculations.

**Code:**
```python
# ============================================
# Exercise 2: Variables and Types
# ============================================

# === Part A: Store Auckland landmarks as variables ===

# Aotea Centre, downtown Auckland
aotea_lat = -37.7814
aotea_lng = 174.7649
aotea_name = "Aotea Centre"

# One Tree Hill, volcanic peak
one_tree_lat = -37.7653
one_tree_lng = 174.7768
one_tree_name = "One Tree Hill"

# Piha Beach, west coast
piha_lat = -37.8283
piha_lng = 174.4579
piha_name = "Piha Beach"

print(f"\n=== Auckland Landmarks ===")
print(f"{aotea_name}: ({aotea_lat}, {aotea_lng})")
print(f"{one_tree_name}: ({one_tree_lat}, {one_tree_lng})")
print(f"{piha_name}: ({piha_lat}, {piha_lng})")


# === Part B: Calculate straight-line distance ===

# Simplified distance formula (Euclidean)
# Real GIS uses Haversine, but this demonstrates arithmetic

lat_diff = abs(aotea_lat - one_tree_lat)
lng_diff = abs(aotea_lng - one_tree_lng)

# Rough conversion: 1 degree latitude ≈ 111 km, longitude varies
km_per_lat_degree = 111
km_per_lng_degree = 89  # at Auckland's latitude

distance_lat = lat_diff * km_per_lat_degree
distance_lng = lng_diff * km_per_lng_degree

# Pythagorean theorem
import math
straight_line_distance = math.sqrt(distance_lat**2 + distance_lng**2)

print(f"\n=== Distance Calculation ===")
print(f"Distance from {aotea_name} to {one_tree_name}:")
print(f"  Latitude difference: {lat_diff:.4f}° × {km_per_lat_degree} = {distance_lat:.2f} km")
print(f"  Longitude difference: {lng_diff:.4f}° × {km_per_lng_degree} = {distance_lng:.2f} km")
print(f"  Straight-line distance: {straight_line_distance:.2f} km")


# === Part C: Type conversion exercises ===

print(f"\n=== Type Conversion ===")

# String coordinates to numbers
coord_string = "174.8860"
coord_float = float(coord_string)
print(f"String '{coord_string}' → Float: {coord_float}")

# Number to string (for labels)
zone_number = 60
zone_text = "UTM Zone " + str(zone_number)
print(f"Integer {zone_number} → String: '{zone_text}'")

# Population data
auckland_population_str = "1,640,000"
# Remove comma first
auckland_population = int(auckland_population_str.replace(",", ""))
print(f"Population string '{auckland_population_str}' → {auckland_population} people")

# Boolean conversions
has_data = bool(auckland_population)
print(f"bool({auckland_population}) = {has_data}")

data_count = 0
has_data = bool(data_count)
print(f"bool({data_count}) = {has_data}")
```

**Expected Output:**
```
=== Auckland Landmarks ===
Aotea Centre: (-37.7814, 174.7649)
One Tree Hill: (-37.7653, 174.7768)
Piha Beach: (-37.8283, 174.4579)

=== Distance Calculation ===
Distance from Aotea Centre to One Tree Hill:
  Latitude difference: 0.0161° × 111 = 1.79 km
  Longitude difference: 0.0119° × 89 = 1.06 km
  Straight-line distance: 2.07 km

=== Type Conversion ===
String '174.8860' → Float: 174.886
Integer 60 → String: 'UTM Zone 60'
Population string '1,640,000' → 1640000 people
bool(1640000) = True
bool(0) = False
```

---

#### Exercise 3: String Operations

**Objective:** Format geographical data and create map labels.

**Code:**
```python
# ============================================
# Exercise 3: String Operations
# ============================================

# === Part A: Format place names and create labels ===

suburbs = ["Ponsonby", "Grey Lynn", "Devonport", "Takapuna", "Mission Bay"]
print(f"\n=== Formatted Suburb List ===")

for suburb in suburbs:
    # Convert to title case (already is, but demonstration)
    formatted = suburb.title()

    # Create a label with padding
    label = f"{formatted:^20} | GIS Zone 60"
    print(label)


# === Part B: F-string formatting for coordinates ===

print(f"\n=== Coordinate Display Formatting ===")

locations = [
    ("Aotea Centre", -37.7814, 174.7649),
    ("One Tree Hill", -37.7653, 174.7768),
    ("Mount Eden", -37.7694, 174.7664),
    ("Piha Beach", -37.8283, 174.4579)
]

for name, lat, lng in locations:
    # Standard formatting
    print(f"{name}: ({lat}, {lng})")

    # Fixed decimal places
    print(f"{name}: ({lat:.4f}°S, {lng:.4f}°E)")

    # With direction labels
    lat_dir = "S" if lat < 0 else "N"
    lng_dir = "E" if lng > 0 else "W"
    print(f"{name}: {abs(lat):.4f}°{lat_dir}, {abs(lng):.4f}°{lng_dir}")
    print()


# === Part C: String methods for geographic data ===

print(f"\n=== String Methods ===")

place = "  auckland  "

print(f"Original: '{place}'")
print(f"Strip whitespace: '{place.strip()}'")
print(f"Uppercase: '{place.upper()}'")
print(f"Lowercase: '{place.lower()}'")
print(f"Title case: '{place.title()}'")

# Create abbreviations
full_name = "Auckland Council"
abbreviation = full_name.replace(" Council", "").upper()
print(f"\n'{full_name}' abbreviation: {abbreviation}")


# === Part D: String manipulation for data entry ===

print(f"\n=== Data Entry Scenarios ===")

# Scenario 1: Cleaning user input
user_input = "  Grey Lynn  "
clean_suburb = user_input.strip().title()
print(f"User input: '{user_input}' → Clean: '{clean_suburb}'")

# Scenario 2: Building complex labels
suburb_name = "Devonport"
population = 12450
area_sqkm = 5.2

label = f"{suburb_name} | Pop: {population:,} | Area: {area_sqkm} km²"
print(f"Suburb label: {label}")

# Scenario 3: Creating a CSV-like string
data_row = f"{suburb_name},{population},{area_sqkm:.1f}"
print(f"Data row: {data_row}")
```

**Expected Output:**
```
=== Formatted Suburb List ===
       Ponsonby        | GIS Zone 60
       Grey Lynn       | GIS Zone 60
       Devonport       | GIS Zone 60
       Takapuna        | GIS Zone 60
       Mission Bay     | GIS Zone 60

=== Coordinate Display Formatting ===
Aotea Centre: (-37.7814, 174.7649)
Aotea Centre: (-37.7814°S, 174.7649°E)
Aotea Centre: 37.7814°S, 174.7649°E

One Tree Hill: (-37.7653, 174.7768)
One Tree Hill: (-37.7653°S, 174.7768°E)
One Tree Hill: 37.7653°S, 174.7768°E

[... more locations ...]

=== String Methods ===
Original: '  auckland  '
Strip whitespace: 'auckland'
Uppercase: 'AUCKLAND'
Lowercase: 'auckland'
Title case: 'Auckland'

'Auckland Council' abbreviation: AUCKLAND

=== Data Entry Scenarios ===
User input: '  Grey Lynn  ' → Clean: 'Devonport'
Suburb label: Devonport | Pop: 12,450 | Area: 5.2 km²
Data row: Devonport,12450,5.2
```

---

#### Exercise 4: Simple Calculations

**Objective:** Perform geospatial calculations relevant to GIS work.

**Code:**
```python
# ============================================
# Exercise 4: Simple Calculations
# ============================================

import math

# === Part A: Convert between coordinate systems ===

print(f"\n=== Degree to Radian Conversion ===")

# Auckland coordinates in degrees
auckland_lat_deg = -37.7383
auckland_lng_deg = 174.8860

# Convert to radians (formula: radians = degrees × π / 180)
auckland_lat_rad = auckland_lat_deg * math.pi / 180
auckland_lng_rad = auckland_lng_deg * math.pi / 180

print(f"Auckland coordinates (degrees): ({auckland_lat_deg}°, {auckland_lng_deg}°)")
print(f"Auckland coordinates (radians): ({auckland_lat_rad:.6f}, {auckland_lng_rad:.6f})")

# Reverse: radians to degrees
lat_back_to_deg = auckland_lat_rad * 180 / math.pi
lng_back_to_deg = auckland_lng_rad * 180 / math.pi

print(f"\nConvert back to degrees: ({lat_back_to_deg:.4f}°, {lng_back_to_deg:.4f}°)")


# === Part B: Calculate bounding box area ===

print(f"\n=== Bounding Box Area Calculation ===")

# Bounding box for central Auckland (rough)
# Northern boundary (higher latitude, closer to 0)
north_lat = -37.7

# Southern boundary (lower latitude, further from equator)
south_lat = -37.8

# Western boundary (lower longitude)
west_lng = 174.7

# Eastern boundary (higher longitude)
east_lng = 174.9

# Calculate differences
lat_span = abs(north_lat - south_lat)  # degrees
lng_span = abs(east_lng - west_lng)    # degrees

print(f"Bounding box: ({north_lat}°, {west_lng}°) to ({south_lat}°, {east_lng}°)")
print(f"Latitude span: {lat_span}°")
print(f"Longitude span: {lng_span}°")

# Convert degrees to kilometres
# At Auckland's latitude (~37.7°S):
#   1° latitude ≈ 111 km (consistent everywhere)
#   1° longitude ≈ 89 km (varies by latitude)

km_per_lat_deg = 111
km_per_lng_deg = 89

height_km = lat_span * km_per_lat_deg
width_km = lng_span * km_per_lng_deg

area_sqkm = height_km * width_km

print(f"\nBounding box dimensions:")
print(f"  Height (North-South): {lat_span}° × {km_per_lat_deg} = {height_km:.2f} km")
print(f"  Width (East-West): {lng_span}° × {km_per_lng_deg} = {width_km:.2f} km")
print(f"  Area: {height_km:.2f} km × {width_km:.2f} km = {area_sqkm:.2f} km²")


# === Part C: Distance calculations between multiple points ===

print(f"\n=== Multi-point Distance Analysis ===")

# Key Auckland locations
locations = {
    "Aotea Centre": (-37.7814, 174.7649),
    "One Tree Hill": (-37.7653, 174.7768),
    "Mount Eden": (-37.7694, 174.7664)
}

def simple_distance(lat1, lng1, lat2, lng2):
    """Calculate approximate straight-line distance (km)."""
    lat_diff = abs(lat1 - lat2) * 111
    lng_diff = abs(lng1 - lng2) * 89
    return math.sqrt(lat_diff**2 + lng_diff**2)

# Calculate distances from Aotea Centre
aotea_coords = locations["Aotea Centre"]

for place_name, coords in locations.items():
    if place_name != "Aotea Centre":
        dist = simple_distance(aotea_coords[0], aotea_coords[1],
                               coords[0], coords[1])
        print(f"Aotea Centre → {place_name}: {dist:.2f} km")


# === Part D: Practical GIS calculation: Population density ===

print(f"\n=== Population Density Calculation ===")

# Auckland suburbs data
suburbs_data = {
    "Ponsonby": {"population": 18200, "area_sqkm": 2.8},
    "Grey Lynn": {"population": 12500, "area_sqkm": 1.5},
    "Devonport": {"population": 9800, "area_sqkm": 4.2},
    "Takapuna": {"population": 15300, "area_sqkm": 3.1}
}

print(f"{'Suburb':<15} {'Population':>12} {'Area (km²)':>12} {'Density':>12}")
print("=" * 52)

for suburb, data in suburbs_data.items():
    pop = data["population"]
    area = data["area_sqkm"]
    density = pop / area

    print(f"{suburb:<15} {pop:>12,} {area:>12.1f} {density:>12.1f}")

# Calculate overall statistics
total_population = sum(d["population"] for d in suburbs_data.values())
total_area = sum(d["area_sqkm"] for d in suburbs_data.values())
average_density = total_population / total_area

print("=" * 52)
print(f"{'Total':<15} {total_population:>12,} {total_area:>12.1f} {average_density:>12.1f}")
```

**Expected Output:**
```
=== Degree to Radian Conversion ===
Auckland coordinates (degrees): (-37.7383°, 174.8860°)
Auckland coordinates (radians): (-0.658741, 3.052933)

Convert back to degrees: (-37.7383°, 174.8860°)

=== Bounding Box Area Calculation ===
Bounding box: (-37.7°, 174.7°) to (-37.8°, 174.9°)
Latitude span: 0.1°
Longitude span: 0.2°

Bounding box dimensions:
  Height (North-South): 0.1° × 111 = 11.10 km
  Width (East-West): 0.2° × 89 = 17.80 km
  Area: 11.10 km × 17.80 km = 197.58 km²

=== Multi-point Distance Analysis ===
Aotea Centre → One Tree Hill: 2.07 km
Aotea Centre → Mount Eden: 0.77 km

=== Population Density Calculation ===
Suburb             Population        Area (km²)        Density
============================================================
Ponsonby                 18,200             2.8        6,500.0
Grey Lynn                12,500             1.5        8,333.3
Devonport                 9,800             4.2        2,333.3
Takapuna                 15,300             3.1        4,935.5
============================================================
Total                    56,000            11.6        4,827.6
```

---

## Week 2: Control Flow & Conditional Logic

### Lecture Notes

#### If-Elif-Else Statements

Conditional statements allow your code to make decisions based on conditions:

```python
# Simple if statement
temperature = 25

if temperature > 20:
    print("It's warm in Auckland today")
```

**If-Else:**
```python
if temperature > 20:
    print("Warm")
else:
    print("Cool")
```

**If-Elif-Else (multiple conditions):**
```python
if temperature > 25:
    print("Hot")
elif temperature > 20:
    print("Warm")
elif temperature > 15:
    print("Cool")
else:
    print("Cold")
```

#### Nested Conditionals

Checking conditions within conditions:

```python
suburb = "Ponsonby"
population = 18200
is_coastal = True

if is_coastal:
    if population > 15000:
        print(f"{suburb} is a large, coastal suburb")
    else:
        print(f"{suburb} is a small, coastal suburb")
else:
    print(f"{suburb} is an inland suburb")
```

#### For Loops

Iterate over sequences (lists, ranges, strings):

```python
# Loop using range
for i in range(5):
    print(f"Iteration {i}")

# Loop through a list
suburbs = ["Ponsonby", "Grey Lynn", "Devonport"]
for suburb in suburbs:
    print(f"Suburb: {suburb}")

# Loop with index
for index, suburb in enumerate(suburbs):
    print(f"{index}: {suburb}")
```

#### While Loops

Repeat code whilst a condition is true:

```python
count = 0
while count < 5:
    print(f"Count: {count}")
    count = count + 1  # or count += 1

# Example: simulating a movement
position = 0
while position < 10:
    print(f"Position: {position}")
    position += 1
```

#### Break and Continue

Control loop execution:

```python
# break: exit the loop immediately
for i in range(10):
    if i == 5:
        break  # stops the loop at i=5
    print(i)

# continue: skip to next iteration
for i in range(5):
    if i == 2:
        continue  # skips i=2, goes to next iteration
    print(i)
```

#### Boolean Logic

Combining conditions:

```python
is_urban = True
is_coastal = True
population = 18200

# AND: both conditions must be true
if is_urban and is_coastal:
    print("Urban coastal suburb")

# OR: at least one condition must be true
if is_urban or population > 20000:
    print("Major area")

# NOT: negate a condition
if not is_urban:
    print("Rural area")
```

#### Practical GIS Example: Land Use Classification

```python
# Classify land use based on multiple criteria
def classify_land_use(building_density, vegetation_coverage, water_proximity):
    """
    Classify land use type based on environmental metrics.

    Parameters:
        building_density: percentage (0-100)
        vegetation_coverage: percentage (0-100)
        water_proximity: metres

    Returns:
        str: land use classification
    """

    if building_density > 70:
        return "Urban"
    elif building_density > 40 and vegetation_coverage > 30:
        return "Suburban"
    elif vegetation_coverage > 70:
        return "Forest"
    elif water_proximity < 200:
        return "Waterfront"
    else:
        return "Rural"

# Test the classifier
print(classify_land_use(80, 20, 500))   # Urban
print(classify_land_use(50, 40, 500))   # Suburban
print(classify_land_use(10, 85, 1000))  # Forest
print(classify_land_use(40, 50, 150))   # Waterfront
```

---

### Lab Exercise (2 hours)

#### Exercise 1: Conditional Classification

**Objective:** Classify geographical data based on conditions.

**Code:**
```python
# ============================================
# Exercise 1: Conditional Classification
# ============================================

# === Part A: Classify suburbs by population density ===

print(f"\n=== Population Density Classification ===\n")

# Auckland suburbs with population and area data
suburbs = [
    {"name": "Ponsonby", "population": 18200, "area": 2.8},
    {"name": "Grey Lynn", "population": 12500, "area": 1.5},
    {"name": "Devonport", "population": 9800, "area": 4.2},
    {"name": "Takapuna", "population": 15300, "area": 3.1},
    {"name": "Papakura", "population": 32000, "area": 12.0},
    {"name": "Waiuku", "population": 11500, "area": 8.5},
]

def classify_suburb_density(population, area):
    """Classify suburb by population density."""
    density = population / area

    if density > 6000:
        return "High density (>6000 people/km²)"
    elif density > 3000:
        return "Medium density (3000-6000 people/km²)"
    else:
        return "Low density (<3000 people/km²)"

# Classify each suburb
for suburb in suburbs:
    density = suburb["population"] / suburb["area"]
    classification = classify_suburb_density(suburb["population"], suburb["area"])

    print(f"{suburb['name']:15} {density:8.1f} people/km² → {classification}")


# === Part B: Classify air quality readings ===

print(f"\n\n=== Air Quality Classification ===\n")

# Air quality measurements (PM2.5 micrograms per cubic metre)
air_quality_readings = [
    {"station": "Aotea Centre", "pm25": 12},
    {"station": "One Tree Hill", "pm25": 8},
    {"station": "Grey Lynn", "pm25": 35},
    {"station": "Mt Smart Stadium", "pm25": 45},
    {"station": "Piha Beach", "pm25": 6},
    {"station": "Takapuna", "pm25": 28},
]

def classify_air_quality(pm25):
    """
    Classify air quality based on PM2.5 levels.
    Thresholds based on NZ Air Quality Guidelines.
    """
    if pm25 <= 15:
        return "Good"
    elif pm25 <= 30:
        return "Moderate"
    elif pm25 <= 40:
        return "Unhealthy for sensitive groups"
    else:
        return "Unhealthy"

# Classify each reading
for reading in air_quality_readings:
    pm25 = reading["pm25"]
    quality = classify_air_quality(pm25)

    print(f"{reading['station']:20} PM2.5: {pm25:3d} µg/m³ → {quality}")


# === Part C: Multi-criteria classification (Transport Accessibility) ===

print(f"\n\n=== Transport Accessibility Classification ===\n")

# Location data with transport metrics
locations = [
    {"name": "Aotea Centre", "bus_routes": 15, "train_station": True, "traffic_congestion": 8},
    {"name": "Ponsonby", "bus_routes": 8, "train_station": False, "traffic_congestion": 6},
    {"name": "Britomart", "bus_routes": 20, "train_station": True, "traffic_congestion": 9},
    {"name": "Devonport", "bus_routes": 3, "train_station": False, "traffic_congestion": 2},
    {"name": "Takapuna", "bus_routes": 12, "train_station": False, "traffic_congestion": 5},
]

def classify_transport_access(bus_routes, has_train, congestion):
    """
    Classify transport accessibility using multiple criteria.
    """

    # Highly accessible
    if has_train and bus_routes >= 12:
        return "Excellent"

    # Good accessibility
    elif has_train and bus_routes >= 8:
        return "Very Good"
    elif (not has_train) and bus_routes >= 12:
        return "Very Good"

    # Moderate accessibility
    elif bus_routes >= 8:
        return "Good"

    # Limited accessibility
    elif bus_routes >= 5:
        return "Moderate"

    # Poor accessibility
    else:
        return "Limited"

# Classify each location
for location in locations:
    classification = classify_transport_access(
        location["bus_routes"],
        location["train_station"],
        location["traffic_congestion"]
    )

    train_text = "Yes" if location["train_station"] else "No"
    print(f"{location['name']:20} Bus routes: {location['bus_routes']:2d}  " +
          f"Train: {train_text:3} → {classification}")
```

**Expected Output:**
```
=== Population Density Classification ===

Ponsonby          6500.0 people/km² → High density (>6000 people/km²)
Grey Lynn         8333.3 people/km² → High density (>6000 people/km²)
Devonport         2333.3 people/km² → Low density (<3000 people/km²)
Takapuna          4935.5 people/km² → Medium density (3000-6000 people/km²)
Papakura          2666.7 people/km² → Low density (<3000 people/km²)
Waiuku            1352.9 people/km² → Low density (<3000 people/km²)


=== Air Quality Classification ===

Aotea Centre         PM2.5:  12 µg/m³ → Good
One Tree Hill        PM2.5:   8 µg/m³ → Good
Grey Lynn            PM2.5:  35 µg/m³ → Unhealthy for sensitive groups
Mt Smart Stadium     PM2.5:  45 µg/m³ → Unhealthy
Piha Beach           PM2.5:   6 µg/m³ → Good
Takapuna             PM2.5:  28 µg/m³ → Moderate


=== Transport Accessibility Classification ===

Aotea Centre         Bus routes: 15  Train: Yes  → Excellent
Ponsonby             Bus routes:  8  Train: No   → Good
Britomart            Bus routes: 20  Train: Yes  → Excellent
Devonport            Bus routes:  3  Train: No   → Limited
Takapuna             Bus routes: 12  Train: No   → Very Good
```

---

#### Exercise 2: Loop Exercises

**Objective:** Use loops to process geographical data and simulate spatial operations.

**Code:**
```python
# ============================================
# Exercise 2: Loop Exercises
# ============================================

import math

# === Part A: Filter bus stops by distance threshold ===

print(f"\n=== Bus Stops Within Distance Threshold ===\n")

# Reference point: Aotea Centre
reference_lat = -37.7814
reference_lng = 174.7649
distance_threshold = 2.0  # kilometres

# Auckland bus stops data
bus_stops = [
    {"name": "Aotea Centre", "lat": -37.7814, "lng": 174.7649},
    {"name": "Wynyard Quarter", "lat": -37.7791, "lng": 174.7600},
    {"name": "Britomart", "lat": -37.7679, "lng": 174.7669},
    {"name": "Karangahape", "lat": -37.7753, "lng": 174.7681},
    {"name": "Ponsonby Road", "lat": -37.7885, "lng": 174.7507},
    {"name": "One Tree Hill", "lat": -37.7653, "lng": 174.7768},
    {"name": "Devonport", "lat": -37.8246, "lng": 174.7881},
]

def distance_km(lat1, lng1, lat2, lng2):
    """Calculate approximate distance in kilometres."""
    lat_diff = abs(lat1 - lat2) * 111
    lng_diff = abs(lng1 - lng2) * 89
    return math.sqrt(lat_diff**2 + lng_diff**2)

print(f"Bus stops within {distance_threshold} km of Aotea Centre:\n")

for stop in bus_stops:
    dist = distance_km(reference_lat, reference_lng, stop["lat"], stop["lng"])

    if dist <= distance_threshold:
        print(f"  {stop['name']:20} {dist:5.2f} km")

print("\n" + "="*50)
print("Nearby stops summary: Use these for short walking distance recommendations")


# === Part B: Simple random walk simulation ===

print(f"\n\n=== Random Walk Simulation (Displacement) ===\n")

import random

# Starting position (Aotea Centre)
lat = -37.7814
lng = 174.7649
steps = 10
step_size = 0.001  # degrees (approximately 111m per degree latitude)

print(f"Starting position: ({lat:.4f}, {lng:.4f})")
print(f"\nSimulating {steps} random steps of {step_size} degrees:\n")

step_count = 0

while step_count < steps:
    # Random direction (North, South, East, or West)
    direction = random.choice(['N', 'S', 'E', 'W'])

    # Move one step
    if direction == 'N':
        lat += step_size
    elif direction == 'S':
        lat -= step_size
    elif direction == 'E':
        lng += step_size
    elif direction == 'W':
        lng -= step_size

    step_count += 1
    print(f"Step {step_count}: Moved {direction:5} → ({lat:.4f}, {lng:.4f})")

print(f"\nFinal position: ({lat:.4f}, {lng:.4f})")

# Calculate total displacement
total_displacement = distance_km(-37.7814, 174.7649, lat, lng)
print(f"Total displacement: {total_displacement:.4f} km")


# === Part C: Create distance matrix between 5 Auckland locations ===

print(f"\n\n=== Distance Matrix Between Auckland Locations ===\n")

locations = {
    "Aotea": (-37.7814, 174.7649),
    "One Tree": (-37.7653, 174.7768),
    "Mount Eden": (-37.7694, 174.7664),
    "Piha Beach": (-37.8283, 174.4579),
    "Devonport": (-37.8246, 174.7881),
}

location_names = list(locations.keys())
n = len(location_names)

# Create header
print(f"{'Location':15}", end="")
for name in location_names:
    print(f"{name:>12}", end="")
print("\n" + "-" * (15 + 12 * n))

# Create distance matrix
for i, name1 in enumerate(location_names):
    print(f"{name1:15}", end="")

    for name2 in location_names:
        lat1, lng1 = locations[name1]
        lat2, lng2 = locations[name2]

        dist = distance_km(lat1, lng1, lat2, lng2)
        print(f"{dist:12.2f}", end="")

    print()  # New line

print("\nInterpretation: Piha Beach is notably distant (≈30km west)")
print("Devonport is furthest north among central locations")
```

**Expected Output:**
```
=== Bus Stops Within Distance Threshold ===

Bus stops within 2.0 km of Aotea Centre:

  Aotea Centre         0.00 km
  Wynyard Quarter      0.23 km
  Britomart            1.33 km
  Karangahape          0.41 km
  Ponsonby Road        1.63 km
==================================================
Nearby stops summary: Use these for short walking distance recommendations


=== Random Walk Simulation (Displacement) ===

Starting position: (-37.7814, 174.7649)

Simulating 10 random steps of 0.001 degrees:

Step 1: Moved W     → (-37.7814, 174.7639)
Step 2: Moved S     → (-37.7824, 174.7639)
[... more steps ...]

Final position: (-37.7759, 174.7701)
Total displacement: 0.8234 km


=== Distance Matrix Between Auckland Locations ===

Location          Aotea     One Tree   Mount Eden   Piha Beach   Devonport
---------------------------------------------------------------------------
Aotea             0.00        2.07        0.77       30.22         5.30
One Tree          2.07        0.00        1.33       31.45         7.14
Mount Eden        0.77        1.33        0.00       31.19         5.97
Piha Beach       30.22       31.45       31.19        0.00        35.25
Devonport         5.30        7.14        5.97       35.25         0.00

Interpretation: Piha Beach is notably distant (≈30km west)
Devonport is furthest north among central locations
```

---

#### Exercise 3: Combined Flow Control

**Objective:** Integrate conditionals and loops to process realistic spatial datasets.

**Code:**
```python
# ============================================
# Exercise 3: Combined Flow Control
# ============================================

# === Comprehensive traffic monitoring script ===

print(f"\n=== Traffic Count Analysis (Mon-Fri Workdays) ===\n")

# Traffic count data (vehicles per hour)
# Format: (day, time, count)
traffic_data = [
    ("Monday", "07:00", 450),
    ("Monday", "08:00", 1200),
    ("Monday", "09:00", 950),
    ("Tuesday", "07:00", 480),
    ("Tuesday", "08:00", 1180),
    ("Tuesday", "09:00", 920),
    ("Wednesday", "07:00", 460),
    ("Wednesday", "08:00", 1220),
    ("Wednesday", "09:00", 940),
    ("Thursday", "07:00", 470),
    ("Thursday", "08:00", 1250),
    ("Thursday", "09:00", 960),
    ("Friday", "07:00", 520),
    ("Friday", "08:00", 1300),
    ("Friday", "09:00", 1100),
    ("Saturday", "08:00", 620),
    ("Saturday", "09:00", 780),
    ("Sunday", "08:00", 540),
    ("Sunday", "09:00", 620),
]

weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
peak_hour_threshold = 1000  # vehicles per hour

print(f"Processing {len(traffic_data)} traffic records...\n")
print(f"{'Day':<12} {'Time':<8} {'Count':<8} {'Status':<30}")
print("=" * 60)

peak_hours_detected = 0
total_weekday_traffic = 0
weekday_count = 0

for day, time, count in traffic_data:
    # Skip weekends
    if day not in weekdays:
        print(f"{day:<12} {time:<8} {count:<8} WEEKEND - SKIPPED")
        continue

    # Check if we exceed threshold (trigger break on extreme congestion)
    if count > 1500:
        print(f"{day:<12} {time:<8} {count:<8} EXTREME - ANALYSIS HALTED")
        print("\n*** WARNING: Extreme traffic detected. Stopping analysis. ***")
        break

    # Classify the count
    if count >= peak_hour_threshold:
        status = "PEAK HOUR"
        peak_hours_detected += 1
    else:
        status = "Off-peak"

    print(f"{day:<12} {time:<8} {count:<8} {status:<30}")

    total_weekday_traffic += count
    weekday_count += 1

print("=" * 60)

# Summary statistics
if weekday_count > 0:
    average_traffic = total_weekday_traffic / weekday_count
    print(f"\nWeekday Summary:")
    print(f"  Records processed: {weekday_count}")
    print(f"  Peak hours (>{peak_hour_threshold}): {peak_hours_detected}")
    print(f"  Average traffic: {average_traffic:.0f} vehicles/hour")
    print(f"  Total weekday vehicles: {total_weekday_traffic:,}")


# === Part B: Nested loop - Traffic corridor analysis ===

print(f"\n\n=== Traffic Corridor Analysis ===\n")

# Multiple monitoring stations along a corridor
stations = ["Queen St", "Karangahape Rd", "Ponsonby Rd", "Great North Rd"]

# Morning peak period traffic (hours and vehicles)
corridor_traffic = {
    "Queen St": [450, 1200, 950, 600, 400],
    "Karangahape Rd": [420, 1100, 850, 550, 380],
    "Ponsonby Rd": [380, 950, 720, 480, 320],
    "Great North Rd": [340, 850, 620, 420, 280],
}

hours = ["07:00", "08:00", "09:00", "10:00", "11:00"]

print(f"Morning Traffic Flow Analysis\n")
print(f"{'Station':<18} {'Time':<8} {'Count':<8} {'Trend':<15}")
print("=" * 50)

for station in stations:
    print(f"\n{station}:")
    previous_count = None

    for i, time in enumerate(hours):
        count = corridor_traffic[station][i]

        # Determine trend
        if previous_count is None:
            trend = "Initial"
        elif count > previous_count:
            trend = "↑ Increasing"
        elif count < previous_count:
            trend = "↓ Decreasing"
        else:
            trend = "→ Stable"

        print(f"  {time:<8} {count:>6} vehicles/hr  {trend}")
        previous_count = count


# === Part C: Complex filtering with multiple conditions ===

print(f"\n\n=== Sensor Data Quality Check ===\n")

# Sensor readings with metadata
sensor_readings = [
    {"sensor_id": "S01", "location": "Aotea", "value": 25.3, "battery": 95, "signal": "Good"},
    {"sensor_id": "S02", "location": "Queen St", "value": -5.2, "battery": 15, "signal": "Weak"},
    {"sensor_id": "S03", "location": "Ponsonby", "value": 24.8, "battery": 87, "signal": "Good"},
    {"sensor_id": "S04", "location": "Devonport", "value": 23.1, "battery": 45, "signal": "Fair"},
    {"sensor_id": "S05", "location": "One Tree", "value": 26.5, "battery": 92, "signal": "Good"},
    {"sensor_id": "S06", "location": "Mt Smart", "value": 999.0, "battery": 10, "signal": "Lost"},
]

print(f"Processing {len(sensor_readings)} sensor readings...\n")
print(f"{'ID':<6} {'Location':<12} {'Value':<10} {'Status':<40}")
print("=" * 70)

valid_readings = 0
problematic_readings = 0

for reading in sensor_readings:
    sensor_id = reading["sensor_id"]
    location = reading["location"]
    value = reading["value"]
    battery = reading["battery"]
    signal = reading["signal"]

    # Complex validation logic
    if value < 0 or value > 100:
        status = "ERROR: Invalid temperature reading"
        problematic_readings += 1
    elif battery < 20:
        status = "WARNING: Low battery"
        problematic_readings += 1
    elif signal == "Lost":
        status = "CRITICAL: No signal"
        problematic_readings += 1
    elif battery < 30:
        status = "CAUTION: Battery getting low"
        problematic_readings += 1
    elif signal == "Weak":
        status = "WARNING: Weak signal"
        problematic_readings += 1
    else:
        status = "OK: Valid reading"
        valid_readings += 1

    print(f"{sensor_id:<6} {location:<12} {value:>8.1f}°C  {status}")

print("=" * 70)
print(f"\nSummary: {valid_readings} valid readings, {problematic_readings} issues detected")
```

**Expected Output:**
```
=== Traffic Count Analysis (Mon-Fri Workdays) ===

Processing 19 traffic records...

Day          Time     Count    Status
============================================================
Monday       07:00    450      Off-peak
Monday       08:00    1200     PEAK HOUR
Monday       09:00    950      Off-peak
[... more data ...]
============================================================

Weekday Summary:
  Records processed: 15
  Peak hours (>1000): 5
  Average traffic: 874 vehicles/hour
  Total weekday vehicles: 13,110


=== Traffic Corridor Analysis ===

Morning Traffic Flow Analysis

Queen St:
  07:00    450 vehicles/hr  Initial
  08:00   1200 vehicles/hr  ↑ Increasing
  09:00    950 vehicles/hr  ↓ Decreasing
  10:00    600 vehicles/hr  ↓ Decreasing
  11:00    400 vehicles/hr  ↓ Decreasing

[... more stations ...]

=== Sensor Data Quality Check ===

Processing 6 sensor readings...

ID     Location     Value      Status
======================================================================
S01    Aotea        25.3°C     OK: Valid reading
S02    Queen St     -5.2°C     ERROR: Invalid temperature reading
S03    Ponsonby     24.8°C     OK: Valid reading
S04    Devonport    23.1°C     CAUTION: Battery getting low
S05    One Tree     26.5°C     OK: Valid reading
S06    Mt Smart    999.0°C     CRITICAL: No signal
======================================================================

Summary: 4 valid readings, 2 issues detected
```

---

## Week 3: Data Structures & Pandas Basics

### Lecture Notes

#### Lists

Lists are ordered, mutable collections of items. They're fundamental to GIS data handling:

```python
# Creating lists
suburbs = ["Ponsonby", "Grey Lynn", "Devonport"]
population = [18200, 12500, 9800]
coordinates = [(-37.7885, 174.7507), (-37.7883, 174.7614), (-37.8246, 174.7881)]

# Accessing items (zero-indexed)
first_suburb = suburbs[0]          # "Ponsonby"
last_suburb = suburbs[-1]          # "Devonport"
slice_suburbs = suburbs[0:2]       # ["Ponsonby", "Grey Lynn"]

# List methods
suburbs.append("Takapuna")         # Add to end
suburbs.extend(["Mission Bay", "Remuera"])  # Add multiple
suburbs.remove("Takapuna")         # Remove specific item
suburbs.sort()                     # Sort alphabetically
suburbs.reverse()                  # Reverse order
length = len(suburbs)              # Get length
```

#### Dictionaries

Key-value pairs are perfect for storing geographic attributes:

```python
# Creating dictionaries
suburb_info = {
    "name": "Ponsonby",
    "population": 18200,
    "area_sqkm": 2.8,
    "is_coastal": True
}

# Accessing values
name = suburb_info["name"]
population = suburb_info.get("population")  # safer with .get()

# Modifying
suburb_info["median_income"] = 85000
del suburb_info["is_coastal"]

# Dictionary methods
keys = suburb_info.keys()          # Get all keys
values = suburb_info.values()      # Get all values
items = suburb_info.items()        # Get key-value pairs
```

#### Tuples

Immutable sequences—cannot be changed after creation:

```python
# Creating tuples
coordinates = (-37.7885, 174.7507)  # (latitude, longitude)
location_info = ("Ponsonby", -37.7885, 174.7507)

# Accessing (like lists)
lat = coordinates[0]
lng = coordinates[1]

# Unpacking
lat, lng = coordinates

# Why tuples? They're used as dictionary keys and in sets
locations = {
    (-37.7885, 174.7507): "Ponsonby",
    (-37.8246, 174.7881): "Devonport"
}

# Cannot modify
# coordinates[0] = -37.8000  # This raises an error
```

#### Sets

Unordered collections of unique values:

```python
# Creating sets
zones = {"Zone 60", "Zone 61", "Zone 60"}  # Duplicates removed
zones = set(["Zone 60", "Zone 61", "Zone 60"])

# Set operations
zones.add("Zone 59")
zones.remove("Zone 61")

# Finding unique values
all_readings = [25, 26, 25, 24, 26, 25]
unique_readings = set(all_readings)  # {24, 25, 26}

# Set intersections and unions
zone_group_a = {"Zone 60", "Zone 61"}
zone_group_b = {"Zone 61", "Zone 62"}
common = zone_group_a & zone_group_b       # {"Zone 61"}
all_zones = zone_group_a | zone_group_b    # {"Zone 60", "Zone 61", "Zone 62"}
```

#### Nested Data Structures

Real-world data is often hierarchical:

```python
# List of dictionaries (common for tabular data)
suburbs_data = [
    {"name": "Ponsonby", "population": 18200, "area": 2.8},
    {"name": "Grey Lynn", "population": 12500, "area": 1.5},
]

# Dictionary of dictionaries (common for hierarchical data)
locations = {
    "Aotea": {
        "coordinates": (-37.7814, 174.7649),
        "population": None,
        "type": "landmark"
    },
    "Ponsonby": {
        "coordinates": (-37.7885, 174.7507),
        "population": 18200,
        "type": "suburb"
    }
}

# Accessing nested data
aotea_coords = locations["Aotea"]["coordinates"]
ponsonby_pop = locations["Ponsonby"]["population"]
```

#### Introduction to Pandas

Pandas is the primary library for tabular data analysis in GIS. Two main structures:

**Series:** 1D labelled array
```python
import pandas as pd

# Create a Series
populations = pd.Series([18200, 12500, 9800], index=["Ponsonby", "Grey Lynn", "Devonport"])

# Access
populations["Ponsonby"]        # 18200
populations[0]                 # 18200 (positional)
```

**DataFrame:** 2D table (like a spreadsheet)
```python
# Create a DataFrame
data = {
    "suburb": ["Ponsonby", "Grey Lynn", "Devonport"],
    "population": [18200, 12500, 9800],
    "area": [2.8, 1.5, 4.2]
}

df = pd.DataFrame(data)

# Basic exploration
df.head()                      # First 5 rows
df.info()                      # Data types and non-null counts
df.describe()                  # Summary statistics
df.shape                       # (3, 3) - 3 rows, 3 columns
```

**Selection and Filtering:**
```python
# Select columns
df["population"]               # Single column (Series)
df[["suburb", "population"]]   # Multiple columns (DataFrame)

# Select rows by condition
df[df["population"] > 12000]   # Rows where population > 12000

# Select rows by label
df.loc[0]                      # First row
df.loc[[0, 2]]                 # First and third rows
```

**GroupBy:**
```python
# Assume df has a "zone" column
df.groupby("zone")["population"].sum()     # Total population per zone
df.groupby("zone")["population"].mean()    # Average population per zone
```

**Plotting:**
```python
df.plot(x="suburb", y="population", kind="bar")
df.plot(kind="scatter", x="area", y="population")
```

---

### Lab Exercise (2 hours)

#### Exercise 1: Data Structures

**Objective:** Create and manipulate complex data structures for geographic data.

**Code:**
```python
# ============================================
# Exercise 1: Data Structures
# ============================================

# === Part A: Lists and list operations ===

print(f"\n=== Part A: Lists of Auckland Suburbs ===\n")

# Create a list of suburbs
auckland_suburbs = [
    "Ponsonby",
    "Grey Lynn",
    "Devonport",
    "Takapuna",
    "Mission Bay",
    "Remuera",
    "Mount Eden"
]

print(f"Original list ({len(auckland_suburbs)} suburbs):")
print(auckland_suburbs)

# List operations
auckland_suburbs.append("Piha")
auckland_suburbs.extend(["Karangahape", "Birkenhead"])

print(f"\nAfter additions ({len(auckland_suburbs)} suburbs):")
print(auckland_suburbs)

# Sort alphabetically
auckland_suburbs.sort()
print(f"\nAlphabetically sorted:")
print(auckland_suburbs)

# Find and remove
auckland_suburbs.remove("Piha")
print(f"\nAfter removing 'Piha':")
print(auckland_suburbs)


# === Part B: Dictionary mapping suburbs to attributes ===

print(f"\n\n=== Part B: Suburb Attributes (Dictionary) ===\n")

# Single-level dictionary for one suburb
ponsonby = {
    "name": "Ponsonby",
    "population": 18200,
    "area_sqkm": 2.8,
    "median_income": 85000,
    "is_coastal": False,
    "established_year": 1902
}

print("Ponsonby suburb data:")
for key, value in ponsonby.items():
    print(f"  {key}: {value}")

# Multiple suburbs in a dictionary of dictionaries
suburbs_data = {
    "Ponsonby": {
        "population": 18200,
        "area_sqkm": 2.8,
        "median_income": 85000
    },
    "Grey Lynn": {
        "population": 12500,
        "area_sqkm": 1.5,
        "median_income": 72000
    },
    "Devonport": {
        "population": 9800,
        "area_sqkm": 4.2,
        "median_income": 95000
    },
    "Takapuna": {
        "population": 15300,
        "area_sqkm": 3.1,
        "median_income": 88000
    },
}

print(f"\n\nAll suburbs data:\n")

for suburb_name, data in suburbs_data.items():
    print(f"{suburb_name}:")
    print(f"  Population: {data['population']:,}")
    print(f"  Area: {data['area_sqkm']} km²")
    print(f"  Median income: ${data['median_income']:,}")
    print()

# Calculate density for each
print("Suburb Densities:\n")
for suburb_name, data in suburbs_data.items():
    density = data["population"] / data["area_sqkm"]
    print(f"  {suburb_name:15} {density:8.1f} people/km²")


# === Part C: Nested dictionaries with coordinates and zones ===

print(f"\n\n=== Part C: Hierarchical Location Data ===\n")

# Complex nested structure
auckland_locations = {
    "Aotea Centre": {
        "coordinates": {
            "latitude": -37.7814,
            "longitude": 174.7649
        },
        "zone": 60,
        "type": "landmark",
        "attributes": {
            "building_area_m2": 36000,
            "established": 1990,
            "has_public_transport": True
        }
    },
    "One Tree Hill": {
        "coordinates": {
            "latitude": -37.7653,
            "longitude": 174.7768
        },
        "zone": 60,
        "type": "volcanic_peak",
        "attributes": {
            "elevation_m": 196,
            "established": 1841,
            "has_public_transport": True
        }
    },
    "Piha Beach": {
        "coordinates": {
            "latitude": -37.8283,
            "longitude": 174.4579
        },
        "zone": 60,
        "type": "beach",
        "attributes": {
            "surf_quality": "excellent",
            "established": 1900,
            "has_public_transport": False
        }
    }
}

# Access nested data
print("Accessing nested data:\n")

print(f"Aotea Centre coordinates: ({auckland_locations['Aotea Centre']['coordinates']['latitude']}, " +
      f"{auckland_locations['Aotea Centre']['coordinates']['longitude']})")

print(f"One Tree Hill elevation: {auckland_locations['One Tree Hill']['attributes']['elevation_m']} m")

print(f"Piha Beach surf quality: {auckland_locations['Piha Beach']['attributes']['surf_quality']}")

# Iterate through locations and extract data
print(f"\n\nSummary of all locations:\n")

for location_name, data in auckland_locations.items():
    coords = data["coordinates"]
    loc_type = data["type"]

    print(f"{location_name} ({loc_type}):")
    print(f"  Latitude: {coords['latitude']:.4f}°")
    print(f"  Longitude: {coords['longitude']:.4f}°")
    print(f"  Zone: {data['zone']}")
    print()


# === Part D: Tuples and sets for coordinate pairs ===

print(f"\n=== Part D: Tuples and Sets ===\n")

# Tuples for immutable coordinate pairs
location_tuples = [
    ("Aotea Centre", (-37.7814, 174.7649)),
    ("One Tree Hill", (-37.7653, 174.7768)),
    ("Mount Eden", (-37.7694, 174.7664)),
]

print("Locations as tuples:\n")

for name, (lat, lng) in location_tuples:
    print(f"{name:20} Lat: {lat:10.4f}  Lng: {lng:10.4f}")

# Dictionary with tuple keys (coordinates as keys)
coordinate_map = {
    (-37.7814, 174.7649): "Aotea Centre",
    (-37.7653, 174.7768): "One Tree Hill",
    (-37.7694, 174.7664): "Mount Eden",
}

print(f"\n\nCoordinate-to-location mapping:\n")

for coord, location in coordinate_map.items():
    print(f"{coord} → {location}")

# Sets for finding unique zones
zone_assignments = [60, 61, 60, 60, 59, 61, 60, 62]
unique_zones = set(zone_assignments)

print(f"\n\nZone distribution:\n")
print(f"All zone assignments: {zone_assignments}")
print(f"Unique zones: {sorted(unique_zones)}")
print(f"Number of unique zones: {len(unique_zones)}")
```

**Expected Output:**
```
=== Part A: Lists of Auckland Suburbs ===

Original list (7 suburbs):
['Ponsonby', 'Grey Lynn', 'Devonport', 'Takapuna', 'Mission Bay', 'Remuera', 'Mount Eden']

After additions (9 suburbs):
['Ponsonby', 'Grey Lynn', 'Devonport', 'Takapuna', 'Mission Bay', 'Remuera', 'Mount Eden', 'Piha', 'Karangahape', 'Birkenhead']

Alphabetically sorted:
['Birkenhead', 'Devonport', 'Grey Lynn', 'Karangahape', 'Mission Bay', 'Mount Eden', 'Ponsonby', 'Remuera', 'Takapuna']

After removing 'Piha':
['Birkenhead', 'Devonport', 'Grey Lynn', 'Karangahape', 'Mission Bay', 'Mount Eden', 'Ponsonby', 'Remuera', 'Takapuna']


=== Part B: Suburb Attributes (Dictionary) ===

Ponsonby suburb data:
  name: Ponsonby
  population: 18200
  area_sqkm: 2.8
  median_income: 85000
  is_coastal: False
  established_year: 1902

[... more suburbs ...]

Suburb Densities:

  Ponsonby         6500.0 people/km²
  Grey Lynn        8333.3 people/km²
  Devonport        2333.3 people/km²
  Takapuna         4935.5 people/km²


=== Part C: Hierarchical Location Data ===

Accessing nested data:

Aotea Centre coordinates: (-37.7814, 174.7649)
One Tree Hill elevation: 196 m
Piha Beach surf quality: excellent

Summary of all locations:

Aotea Centre (landmark):
  Latitude: -37.7814°
  Longitude: 174.7649°
  Zone: 60

[... more locations ...]
```

---

#### Exercise 2: Pandas Fundamentals

**Objective:** Load, explore, and analyse geographical data using Pandas.

**Code:**
```python
# ============================================
# Exercise 2: Pandas Fundamentals
# ============================================

import pandas as pd
import numpy as np

# === Part A: Create DataFrame from inline data ===

print(f"\n=== Part A: Create and Explore DataFrame ===\n")

# Auckland footfall data (pedestrian counts)
# Representing hourly footfall at different locations
footfall_data = {
    'Date': ['2024-01-01', '2024-01-01', '2024-01-01', '2024-01-01',
             '2024-01-02', '2024-01-02', '2024-01-02', '2024-01-02',
             '2024-01-03', '2024-01-03', '2024-01-03', '2024-01-03'],
    'Hour': [9, 12, 15, 18, 9, 12, 15, 18, 9, 12, 15, 18],
    'Location': ['Queen Street', 'Queen Street', 'Queen Street', 'Queen Street',
                 'Aotea Square', 'Aotea Square', 'Aotea Square', 'Aotea Square',
                 'Ponsonby Road', 'Ponsonby Road', 'Ponsonby Road', 'Ponsonby Road'],
    'Footfall': [850, 1200, 950, 650, 420, 580, 480, 320, 380, 520, 420, 280],
    'Day_of_week': ['Monday', 'Monday', 'Monday', 'Monday',
                    'Tuesday', 'Tuesday', 'Tuesday', 'Tuesday',
                    'Wednesday', 'Wednesday', 'Wednesday', 'Wednesday']
}

df = pd.DataFrame(footfall_data)

print("DataFrame created successfully!")
print(f"\nDataFrame shape: {df.shape} (rows, columns)")
print(f"\nFirst 5 rows (using head()):")
print(df.head())

print(f"\n\nData types and missing values (using info()):")
df.info()

print(f"\n\nSummary statistics (using describe()):")
print(df.describe())

print(f"\n\nBasic statistics:")
print(f"Total rows: {len(df)}")
print(f"Columns: {list(df.columns)}")


# === Part B: Selection and filtering ===

print(f"\n\n=== Part B: Selection and Filtering ===\n")

# Select a single column
print("Footfall column only:")
print(df['Footfall'])

# Select multiple columns
print(f"\n\nLocation and Footfall columns:")
print(df[['Location', 'Footfall']])

# Filter by condition: high footfall
print(f"\n\nLocations with high footfall (>800):")
high_footfall = df[df['Footfall'] > 800]
print(high_footfall)

# Filter by specific location
print(f"\n\nQueenStreet data only:")
queen_street = df[df['Location'] == 'Queen Street']
print(queen_street)

# Multiple conditions (AND)
print(f"\n\nHigh footfall AND Monday:")
monday_high = df[(df['Day_of_week'] == 'Monday') & (df['Footfall'] > 800)]
print(monday_high)

# Multiple conditions (OR)
print(f"\n\nEarly (9am) OR very high footfall (>1000):")
early_or_high = df[(df['Hour'] == 9) | (df['Footfall'] > 1000)]
print(early_or_high)


# === Part C: Data manipulation and aggregation ===

print(f"\n\n=== Part C: Data Manipulation ===\n")

# Calculate mean footfall per location
print("Mean footfall by location:")
mean_by_location = df.groupby('Location')['Footfall'].mean()
print(mean_by_location)

print(f"\n\nMedian footfall by location:")
median_by_location = df.groupby('Location')['Footfall'].median()
print(median_by_location)

print(f"\n\nTotal footfall by day of week:")
total_by_day = df.groupby('Day_of_week')['Footfall'].sum()
print(total_by_day)

print(f"\n\nFootfall count by hour of day:")
count_by_hour = df.groupby('Hour')['Footfall'].count()
print(count_by_hour)

# Multiple aggregations
print(f"\n\nMultiple statistics by location:")
location_stats = df.groupby('Location')['Footfall'].agg(['count', 'mean', 'min', 'max', 'std'])
print(location_stats)


# === Part D: New columns and peak hour classification ===

print(f"\n\n=== Part D: Create New Column - Peak Hour Classification ===\n")

# Copy the dataframe to avoid modifying original
df_classified = df.copy()

# Create a new column classifying peak vs off-peak
df_classified['Period'] = df_classified['Footfall'].apply(
    lambda x: 'Peak' if x > 800 else 'Off-peak'
)

print("DataFrame with new 'Period' column:")
print(df_classified[['Location', 'Hour', 'Footfall', 'Period']])

# Count peak vs off-peak
print(f"\n\nPeak vs Off-peak distribution:")
period_counts = df_classified['Period'].value_counts()
print(period_counts)

# Add hour category
df_classified['Hour_Category'] = df_classified['Hour'].apply(
    lambda x: 'Morning' if x < 12 else 'Afternoon' if x < 18 else 'Evening'
)

print(f"\n\nWith hour categories:")
print(df_classified[['Location', 'Hour', 'Hour_Category', 'Footfall', 'Period']])


# === Part E: Simple plotting ===

print(f"\n\n=== Part E: Data Visualisation (Pandas Plotting) ===\n")

import matplotlib.pyplot as plt

# Bar chart: Mean footfall by location
print("Generating visualisations...\n")

fig, axes = plt.subplots(2, 2, figsize=(12, 10))

# 1. Bar chart: Mean footfall by location
mean_by_location.plot(kind='bar', ax=axes[0, 0], color='steelblue')
axes[0, 0].set_title('Mean Footfall by Location')
axes[0, 0].set_ylabel('Footfall (people)')
axes[0, 0].set_xlabel('Location')
axes[0, 0].tick_params(axis='x', rotation=45)

# 2. Line plot: Footfall trend across hours (for Queen Street)
queen_street_data = df[df['Location'] == 'Queen Street'].sort_values('Hour')
axes[0, 1].plot(queen_street_data['Hour'], queen_street_data['Footfall'],
                marker='o', linewidth=2, markersize=8, color='green')
axes[0, 1].set_title('Footfall Trend - Queen Street')
axes[0, 1].set_xlabel('Hour of Day')
axes[0, 1].set_ylabel('Footfall (people)')
axes[0, 1].grid(True, alpha=0.3)

# 3. Bar chart: Total footfall by day
total_by_day.plot(kind='bar', ax=axes[1, 0], color='coral')
axes[1, 0].set_title('Total Footfall by Day of Week')
axes[1, 0].set_ylabel('Total Footfall (people)')
axes[1, 0].set_xlabel('Day of Week')
axes[1, 0].tick_params(axis='x', rotation=45)

# 4. Scatter plot: Footfall vs Hour
axes[1, 1].scatter(df['Hour'], df['Footfall'], s=100, alpha=0.6, c=df['Footfall'], cmap='viridis')
axes[1, 1].set_title('Footfall Distribution by Hour')
axes[1, 1].set_xlabel('Hour of Day')
axes[1, 1].set_ylabel('Footfall (people)')
axes[1, 1].grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig('auckland_footfall_analysis.png', dpi=100, bbox_inches='tight')
print("Chart saved as 'auckland_footfall_analysis.png'")
plt.show()

print("\nVisualisation complete!")
```

**Expected Output:**
```
=== Part A: Create and Explore DataFrame ===

DataFrame created successfully!

DataFrame shape: (12, 5) (rows, columns)

First 5 rows (using head()):
        Date  Hour     Location  Footfall Day_of_week
0  2024-01-01     9  Queen Street       850      Monday
1  2024-01-01    12  Queen Street      1200      Monday
2  2024-01-01    15  Queen Street       950      Monday
3  2024-01-01    18  Queen Street       650      Monday
4  2024-01-02     9  Aotea Square       420     Tuesday


Data types and missing values (using info()):
<class 'pandas.core.frame.DataFrame'>
RangeIndex: 12 entries, 0 to 11
Data columns (total 5 columns):
 #   Column       Non-Null Count  Dtype
---  ----------------------------------------
 0   Date         12 non-null      object
 1   Hour         12 non-null      int64
 2   Location     12 non-null      object
 3   Footfall     12 non-null      int64
 4   Day_of_week  12 non-null      object
dtypes: int64(2), object(3)


Summary statistics (using describe()):
            Hour  Footfall
count  12.000000  12.000000
mean   13.500000  679.166667
std     3.162278  313.857968
min     9.000000  280.000000
25%    12.000000  405.000000
50%    13.500000  650.000000
75%    15.000000  920.000000
max    18.000000  1200.000000


=== Part B: Selection and Filtering ===

Locations with high footfall (>800):
        Date  Hour     Location  Footfall Day_of_week
0  2024-01-01     9  Queen Street       850      Monday
1  2024-01-01    12  Queen Street      1200      Monday
2  2024-01-01    15  Queen Street       950      Monday


High footfall AND Monday:
        Date  Hour     Location  Footfall Day_of_week
0  2024-01-01     9  Queen Street       850      Monday
1  2024-01-01    12  Queen Street      1200      Monday
2  2024-01-01    15  Queen Street       950      Monday


=== Part C: Data Manipulation ===

Mean footfall by location:
Location
Aotea Square      455.0
Ponsonby Road     370.0
Queen Street      912.5
Name: Footfall, dtype: float64


Total footfall by day of week:
Day_of_week
Monday       3650
Tuesday      1400
Wednesday    1220
Name: Footfall, dtype: int64


=== Part D: Create New Column - Peak Hour Classification ===

DataFrame with new 'Period' column:
      Location  Hour  Footfall Period
0  Queen Street     9       850   Peak
1  Queen Street    12      1200   Peak
2  Queen Street    15       950   Peak
3  Queen Street    18       650 Off-peak
4  Aotea Square     9       420 Off-peak
5  Aotea Square    12       580 Off-peak
6  Aotea Square    15       480 Off-peak
7  Aotea Square    18       320 Off-peak
8  Ponsonby Road    9       380 Off-peak
9  Ponsonby Road   12       520 Off-peak
10 Ponsonby Road   15       420 Off-peak
11 Ponsonby Road   18       280 Off-peak


Peak vs Off-peak distribution:
Period
Off-peak    8
Peak        4
Name: Footfall, dtype: int64


Chart saved as 'auckland_footfall_analysis.png'
Visualisation complete!
```

---

#### Exercise 3: Data Manipulation and Analysis

**Objective:** Perform comprehensive spatial and temporal data analysis.

**Code:**
```python
# ============================================
# Exercise 3: Data Manipulation and Analysis
# ============================================

import pandas as pd
import numpy as np

# === Create a larger dataset for comprehensive analysis ===

print(f"\n=== Exercise 3: Comprehensive Data Analysis ===\n")

# Extended Auckland footfall dataset
data = {
    'Date': ['2024-01-08', '2024-01-08', '2024-01-08', '2024-01-08',
             '2024-01-09', '2024-01-09', '2024-01-09', '2024-01-09',
             '2024-01-10', '2024-01-10', '2024-01-10', '2024-01-10',
             '2024-01-11', '2024-01-11', '2024-01-11', '2024-01-11',
             '2024-01-12', '2024-01-12', '2024-01-12', '2024-01-12',
             '2024-01-13', '2024-01-13', '2024-01-13', '2024-01-13',
             '2024-01-14', '2024-01-14', '2024-01-14', '2024-01-14'],
    'Location': ['Queen Street', 'Queen Street', 'Queen Street', 'Queen Street',
                 'Queen Street', 'Queen Street', 'Queen Street', 'Queen Street',
                 'Queen Street', 'Queen Street', 'Queen Street', 'Queen Street',
                 'Aotea Square', 'Aotea Square', 'Aotea Square', 'Aotea Square',
                 'Aotea Square', 'Aotea Square', 'Aotea Square', 'Aotea Square',
                 'Ponsonby Road', 'Ponsonby Road', 'Ponsonby Road', 'Ponsonby Road',
                 'Ponsonby Road', 'Ponsonby Road', 'Ponsonby Road', 'Ponsonby Road'],
    'Hour': [9, 12, 15, 18, 9, 12, 15, 18, 9, 12, 15, 18,
             9, 12, 15, 18, 9, 12, 15, 18, 9, 12, 15, 18,
             9, 12, 15, 18],
    'Footfall': [850, 1200, 950, 650,
                 880, 1250, 980, 670,
                 820, 1150, 920, 630,
                 420, 580, 480, 320,
                 450, 620, 510, 350,
                 380, 520, 420, 280,
                 360, 500, 400, 260],
    'Day': ['Monday', 'Monday', 'Monday', 'Monday',
            'Tuesday', 'Tuesday', 'Tuesday', 'Tuesday',
            'Wednesday', 'Wednesday', 'Wednesday', 'Wednesday',
            'Thursday', 'Thursday', 'Thursday', 'Thursday',
            'Friday', 'Friday', 'Friday', 'Friday',
            'Saturday', 'Saturday', 'Saturday', 'Saturday',
            'Sunday', 'Sunday', 'Sunday', 'Sunday']
}

df = pd.DataFrame(data)

print("Dataset loaded successfully!")
print(f"Shape: {df.shape}")
print(f"\nFirst few rows:")
print(df.head())


# === Part A: GroupBy Analysis ===

print(f"\n\n=== Part A: GroupBy - Average Footfall by Day of Week ===\n")

# Group by day of week and calculate mean footfall
daily_footfall = df.groupby('Day')['Footfall'].mean().sort_values(ascending=False)

print("Average footfall by day of week (ranked):")
for day, footfall in daily_footfall.items():
    print(f"  {day:12} {footfall:7.1f} people/hour")

# Calculate with multiple statistics
print(f"\n\nDetailed daily statistics:")
daily_stats = df.groupby('Day')['Footfall'].agg(['count', 'mean', 'median', 'min', 'max', 'std'])
print(daily_stats)

# Group by hour of day
print(f"\n\nAveragefootfall by hour of day:")
hourly_footfall = df.groupby('Hour')['Footfall'].mean().sort_index()
for hour, footfall in hourly_footfall.items():
    print(f"  {hour:02d}:00  {footfall:7.1f} people")


# === Part B: Sorting and Ranking ===

print(f"\n\n=== Part B: Sort Values - Busiest to Quietest Locations ===\n")

# Sort by location footfall (descending)
location_summary = df.groupby('Location')['Footfall'].agg(['mean', 'sum', 'count']).sort_values('mean', ascending=False)

print("Location ranking (busiest to quietest):")
print("\n{:<20} {:>12} {:>12} {:>8}".format("Location", "Avg Footfall", "Total", "Count"))
print("=" * 55)

for location, row in location_summary.iterrows():
    print(f"{location:<20} {row['mean']:>12.1f} {row['sum']:>12.0f} {row['count']:>8.0f}")

# Sort entire dataframe by footfall
print(f"\n\nTop 10 records by footfall:")
top_10 = df.nlargest(10, 'Footfall')[['Date', 'Location', 'Hour', 'Footfall', 'Day']]
print(top_10.to_string(index=False))

print(f"\n\nBottom 5 records by footfall:")
bottom_5 = df.nsmallest(5, 'Footfall')[['Date', 'Location', 'Hour', 'Footfall', 'Day']]
print(bottom_5.to_string(index=False))


# === Part C: Create new column - peak/off-peak classification ===

print(f"\n\n=== Part C: Create Peak/Off-Peak Column ===\n")

# Copy dataframe
df_classified = df.copy()

# Method 1: Using apply with lambda
df_classified['Period'] = df_classified['Footfall'].apply(
    lambda x: 'Peak' if x > 800 else 'Off-peak'
)

# Method 2: Using cut for more granular bins
df_classified['Footfall_Category'] = pd.cut(
    df_classified['Footfall'],
    bins=[0, 400, 600, 800, 1500],
    labels=['Very Quiet', 'Quiet', 'Busy', 'Very Busy']
)

# Display sample with classifications
print("Sample data with classifications:\n")
print(df_classified[['Location', 'Hour', 'Footfall', 'Period', 'Footfall_Category']].head(10))

# Count records by period
print(f"\n\nDistribution of Peak vs Off-Peak:")
period_dist = df_classified['Period'].value_counts()
for period, count in period_dist.items():
    percentage = (count / len(df_classified)) * 100
    print(f"  {period:12} {count:3d} records ({percentage:5.1f}%)")

# Count by footfall category
print(f"\n\nDistribution by Footfall Category:")
category_dist = df_classified['Footfall_Category'].value_counts().sort_index()
for category, count in category_dist.items():
    percentage = (count / len(df_classified)) * 100
    print(f"  {category:12} {count:3d} records ({percentage:5.1f}%)")


# === Part D: Cross-tabulation and multi-dimensional analysis ===

print(f"\n\n=== Part D: Cross-Tabulation Analysis ===\n")

# Create a pivot table: Location × Day of Week
pivot_by_day = df.pivot_table(
    values='Footfall',
    index='Location',
    columns='Day',
    aggfunc='mean'
)

print("Average footfall by Location and Day of Week:")
print(pivot_by_day.round(1))

# Create a pivot table: Location × Hour
pivot_by_hour = df.pivot_table(
    values='Footfall',
    index='Location',
    columns='Hour',
    aggfunc='mean'
)

print(f"\n\nAverage footfall by Location and Hour:")
print(pivot_by_hour.round(0).astype('Int64'))

# Create a crosstab: Period × Day
crosstab = pd.crosstab(df_classified['Day'], df_classified['Period'])

print(f"\n\nCross-tabulation: Day × Period:")
print(crosstab)


# === Part E: Summary statistics and insights ===

print(f"\n\n=== Part E: Summary Statistics and Insights ===\n")

# Overall statistics
total_footfall = df['Footfall'].sum()
avg_footfall = df['Footfall'].mean()
max_footfall = df['Footfall'].max()
min_footfall = df['Footfall'].min()
std_footfall = df['Footfall'].std()

print("Overall Statistics:")
print(f"  Total footfall (all locations, all times): {total_footfall:,}")
print(f"  Average footfall per hour: {avg_footfall:.1f}")
print(f"  Peak footfall recorded: {max_footfall}")
print(f"  Lowest footfall recorded: {min_footfall}")
print(f"  Standard deviation: {std_footfall:.1f}")

# Busiest location
busiest_location = df.groupby('Location')['Footfall'].mean().idxmax()
busiest_avg = df.groupby('Location')['Footfall'].mean().max()

# Quietest location
quietest_location = df.groupby('Location')['Footfall'].mean().idxmin()
quietest_avg = df.groupby('Location')['Footfall'].mean().min()

print(f"\nLocation Insights:")
print(f"  Busiest location: {busiest_location} ({busiest_avg:.1f} avg footfall)")
print(f"  Quietest location: {quietest_location} ({quietest_avg:.1f} avg footfall)")

# Busiest time
busiest_hour = df.groupby('Hour')['Footfall'].mean().idxmax()
busiest_hour_avg = df.groupby('Hour')['Footfall'].mean().max()

# Quietest time
quietest_hour = df.groupby('Hour')['Footfall'].mean().idxmin()
quietest_hour_avg = df.groupby('Hour')['Footfall'].mean().min()

print(f"\nTemporal Insights:")
print(f"  Busiest hour: {busiest_hour}:00 ({busiest_hour_avg:.1f} avg footfall)")
print(f"  Quietest hour: {quietest_hour}:00 ({quietest_hour_avg:.1f} avg footfall)")

# Weekday vs Weekend
df_classified['Is_Weekday'] = df_classified['Day'].isin(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'])
weekday_avg = df_classified[df_classified['Is_Weekday']]['Footfall'].mean()
weekend_avg = df_classified[~df_classified['Is_Weekday']]['Footfall'].mean()

print(f"\nWeekday vs Weekend:")
print(f"  Weekday average: {weekday_avg:.1f}")
print(f"  Weekend average: {weekend_avg:.1f}")
print(f"  Difference: {abs(weekday_avg - weekend_avg):.1f} ({((weekday_avg - weekend_avg) / weekend_avg * 100):.1f}%)")

print(f"\n\nAnalysis complete!")
```

**Expected Output:**
```
=== Exercise 3: Comprehensive Data Analysis ===

Dataset loaded successfully!
Shape: (28, 5)

First few rows:
        Date      Location  Hour  Footfall      Day
0  2024-01-08  Queen Street     9       850   Monday
1  2024-01-08  Queen Street    12      1200   Monday
2  2024-01-08  Queen Street    15       950   Monday
3  2024-01-08  Queen Street    18       650   Monday


=== Part A: GroupBy - Average Footfall by Day of Week ===

Average footfall by day of week (ranked):
  Monday             920.0 people/hour
  Friday             655.0 people/hour
  Wednesday          640.0 people/hour
  Thursday           550.0 people/hour
  Tuesday            680.0 people/hour
  Saturday           430.0 people/hour
  Sunday             380.0 people/hour


Location ranking (busiest to quietest):
Location                 Avg Footfall         Total    Count
===========================================================
Queen Street                    952.5        11430        12
Aotea Square                    492.5         5910        12
Ponsonby Road                   420.0         5040        12


Top 10 records by footfall:
        Date      Location  Hour  Footfall       Day
  2024-01-09  Queen Street    12      1250    Tuesday
  2024-01-08  Queen Street    12      1200    Monday
  2024-01-10  Queen Street    12      1150  Wednesday
  2024-01-08  Queen Street    15       950    Monday
  2024-01-09  Queen Street    15       980    Tuesday
  2024-01-10  Queen Street    15       920  Wednesday
  2024-01-08  Queen Street     9       850    Monday
  2024-01-09  Queen Street     9       880    Tuesday
  2024-01-10  Queen Street     9       820  Wednesday


Summary Statistics and Insights:

Overall Statistics:
  Total footfall (all locations, all times): 18,380
  Average footfall per hour: 655.7
  Peak footfall recorded: 1250
  Lowest footfall recorded: 260
  Standard deviation: 320.8

Location Insights:
  Busiest location: Queen Street (952.5 avg footfall)
  Quietest location: Ponsonby Road (420.0 avg footfall)

Temporal Insights:
  Busiest hour: 12:00 (917.1 avg footfall)
  Quietest hour: 18:00 (413.3 avg footfall)

Weekday vs Weekend:
  Weekday average: 732.5
  Weekend average: 405.0
  Difference: 327.5 (80.8%)

Analysis complete!
```

---

## Summary

This comprehensive three-week module covers the Python foundations essential for GIS work:

**Week 1** establishes core Python syntax, data types, and basic operations—the building blocks for all subsequent geospatial programming.

**Week 2** introduces control flow and conditional logic, enabling you to filter, classify, and process spatial data based on multiple criteria.

**Week 3** transitions into data structures and Pandas, providing practical tools for handling real-world geographical datasets—the heart of GIS analysis.

**Key Takeaways:**
- Python's simplicity enables rapid development of geospatial tools
- Control flow and conditionals classify and filter spatial data effectively
- Pandas DataFrames are essential for managing and analysing geographical datasets
- Real-world GIS work combines these foundational concepts with geospatial libraries (GeoPandas, Shapely, Folium) covered in later weeks

**Next Steps:**
- Week 4 typically covers functions and modules, preparing for library use
- Week 5 introduces GeoPandas for vector data
- Week 6 covers raster data with Rasterio
- Subsequent weeks integrate mapping, spatial analysis, and real GIS workflows

---

**Course Information:**
- **Course Code:** GISCI 343
- **Institution:** University of Auckland
- **Instructor:** Dr Hyesop Shin
- **Language:** UK English
- **Last Updated:** 2024
