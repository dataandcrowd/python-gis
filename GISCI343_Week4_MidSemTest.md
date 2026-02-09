# GISCI 343: GIS Python Programming
## Week 4 Mid-Semester Test

**Institution:** University of Auckland
**Course:** GISCI 343 – GIS Python Programming (3rd Year)
**Instructor:** Dr Hyesop Shin
**Duration:** 2 hours (120 minutes)
**Total Marks:** 100 marks
**Date:** [Date to be completed]

---

## Instructions

1. Answer all questions in the spaces provided or on additional pages as needed.
2. Write your student ID on all pages.
3. For code questions, you may write pseudocode or Python code. Pseudocode will be accepted if clearly annotated.
4. You are permitted to reference Python syntax guides, but not to access external websites or AI tools.
5. Show your working for all calculations and logic explanations.
6. Allocate your time across sections: Section 1 (25 min), Section 2 (35 min), Section 3 (35 min), Section 4 (20 min), Review (5 min).

---

## Section 1: Algorithms and Control Flow (25 marks)

### Question 1.1: Conditional Logic Debugging (10 marks)

A GIS technician has written a Python script to determine whether pedestrians in central Auckland need to carry a raincoat, based on weather data from a local API. The script below contains logical errors that produce counterintuitive results.

```python
temperature = 18  # Celsius
humidity = 85     # Percentage
wind_speed = 12   # km/h
chance_of_rain = 65  # Percentage

# Determine if raincoat is needed
if temperature < 20 or humidity > 70:
    if chance_of_rain > 50 and wind_speed > 15:
        raincoat_needed = True
    else:
        raincoat_needed = False
else:
    if humidity > 80 and wind_speed < 10:
        raincoat_needed = True
    else:
        raincoat_needed = False

print(f"Raincoat needed: {raincoat_needed}")
```

**a)** Trace through the logic with the given values. What does the script output and why? (4 marks)

**b)** Identify the logical flaw(s) in this script. Explain what weather conditions are considered "high risk" by the current logic and why this is problematic for Auckland's climate. (3 marks)

**c)** Rewrite the conditional logic to correctly identify when a raincoat is needed. Your logic should flag a raincoat as necessary when:
- Chance of rain is greater than 60%, OR
- Both humidity exceeds 80% AND temperature is below 15°C, OR
- Wind speed exceeds 20 km/h AND temperature is below 10°C

(3 marks)

---

### Question 1.2: Loop and Counter Logic (8 marks)

A pedestrian footfall counter at Queen Street, Auckland, records hourly foot traffic data for a week. You need to identify peak traffic hours.

**a)** Complete the code below to count how many hours had footfall greater than 500 pedestrians. (4 marks)

```python
hourly_footfall = [120, 480, 650, 720, 890, 950, 1100,
                   1050, 920, 850, 780, 650, 520, 380,
                   250, 180, 200, 320, 410, 550, 620, 700,
                   680, 450]

peak_count = 0

# Your code here to count hours with footfall > 500


print(f"Number of peak hours: {peak_count}")
```

**b)** Explain the difference between using a `while` loop versus a `for` loop for this task. Which is more appropriate and why? (2 marks)

**c)** If you wanted to find not just the count but also the hour of day (0–23) with the highest footfall, what data structure would you use to store both pieces of information? (2 marks)

---

### Question 1.3: Operator Precedence and Type Coercion (7 marks)

**a)** Evaluate the following expressions. Show your working:

i) `5 + 3 * 2 - 1` (1 mark)

ii) `10 > 5 and 3 < 2 or 4 == 4` (1 mark)

iii) `"2" + str(3)` (1 mark)

iv) `int("5") * 2 == "10"` (1 mark)

**b)** In GIS coordinate systems, you might encounter: `lat = "51.2889"` (string) and `lon = "-117.2693"` (string). Write code to convert these to floats and calculate the sum. (2 marks)

---

## Section 2: Data Import, Processing, and Visualisation (30 marks)

### Question 2.1: Pandas Data Analysis – Queen Street Footfall Data (15 marks)

You have been provided with a CSV file containing daily pedestrian footfall data for Queen Street, Auckland, recorded over one month. The file contains columns: `date`, `weekday`, `footfall_count`, `weather_condition`.

**a)** Write code to:
   i) Import the CSV file using pandas (1 mark)

   ii) Display the first 5 rows of data (1 mark)

   iii) Calculate the mean, median, minimum, and maximum footfall counts (3 marks)

```python
import pandas as pd

# Your code here
```

**b)** Using the footfall data, identify which weekday (Monday–Sunday) has the highest average pedestrian traffic. Write code to group by weekday and calculate the mean footfall. (3 marks)

**c)** Create a box plot to visualise the distribution of footfall across different weather conditions (e.g., Sunny, Rainy, Cloudy, Windy). Explain what the box plot reveals about pedestrian behaviour in different weather. (4 marks)

---

### Question 2.2: Geospatial Visualisation – Jenks Natural Breaks Classification (8 marks)

You have footfall data from 15 locations across central Auckland (Queen Street, K Road, Karangahape Road, etc.). You want to create an interactive map using Folium with footfall intensity classified using Jenks Natural Breaks.

**a)** Explain what Jenks Natural Breaks classification does and why it is useful for mapping pedestrian footfall data. (2 marks)

**b)** Write pseudocode or code to:
   i) Classify footfall values into 4 natural breaks (2 marks)

   ii) Create a colour scheme where low footfall is green and high footfall is red (2 marks)

   iii) Create a Folium map centred on Queen Street (51.2889, -117.2693 – hypothetical) with markers coloured by footfall intensity (2 marks)

```python
import folium
from jenkspy import jenks_natural_breaks
import pandas as pd

# Assume df has columns: 'location_name', 'latitude', 'longitude', 'footfall'
# Your code here
```

**c)** Why might Jenks Natural Breaks be more appropriate than equal interval or quantile classification for this pedestrian data? (2 marks)

---

### Question 2.3: Data Quality and Aggregation (7 marks)

**a)** Your footfall dataset contains the following issues:
   - 3% of records have missing values in the `footfall_count` column
   - Some dates are recorded as "2024-01-15" and others as "15/01/2024"
   - One location's name is recorded inconsistently: "K Rd", "K Road", and "Karangahape Rd"

For each issue, name one appropriate Python/pandas method to address it. (3 marks)

**b)** After cleaning, you want to aggregate hourly data into daily totals. Write code to group by date and sum the footfall counts. Include error handling for missing values. (2 marks)

**c)** Calculate the coefficient of variation (standard deviation ÷ mean) for footfall across all locations. Explain what this statistic tells you about consistency of pedestrian traffic. (2 marks)

---

## Section 3: Statistical Imputation and Missing Data (25 marks)

### Question 3.1: Understanding Missing Data Mechanisms (6 marks)

Your geospatial time-series dataset contains hourly pedestrian footfall records for Queen Street over 30 days. Approximately 8% of observations are missing, distributed as follows:

- 3% Missing Completely at Random (MCAR): system failures during sensor downtime
- 4% Missing at Random (MAR): data gaps on rainy days (weather affects both footfall and recording)
- 1% Missing Not at Random (MNAR): intentional removal of anomalous spike values during special events

**a)** Define what each mechanism (MCAR, MAR, MNAR) means. (3 marks)

**b)** For each mechanism present in this dataset, suggest one appropriate imputation strategy. Explain why your choice is suitable. (3 marks)

---

### Question 3.2: Practical Imputation – Forward Fill and Interpolation (10 marks)

Consider a time-series snippet of Queen Street footfall (hourly):

| Hour | Footfall |
|------|----------|
| 8    | 320      |
| 9    | 450      |
| 10   | NaN      |
| 11   | NaN      |
| 12   | 680      |
| 13   | 720      |
| 14   | NaN      |
| 15   | 590      |

**a)** Using forward fill imputation, fill the missing values at hours 10, 11, and 14. Show the resulting series. (2 marks)

**b)** Using linear interpolation, fill the missing values. Show the resulting series and explain the mathematical reasoning. (3 marks)

**c)** Write Python code using pandas to perform both forward fill and linear interpolation on a Series with missing values. (3 marks)

```python
import pandas as pd
import numpy as np

footfall = pd.Series([320, 450, np.nan, np.nan, 680, 720, np.nan, 590])

# Forward fill
# Your code here

# Linear interpolation
# Your code here
```

**d)** Which imputation method is more appropriate for pedestrian footfall data and why? Consider the temporal nature of foot traffic patterns. (2 marks)

---

### Question 3.3: Multiple Imputation by Chained Equations (MICE) (5 marks)

**a)** Explain the concept of Multiple Imputation by Chained Equations (MICE) and how it differs from single imputation methods like forward fill. (2 marks)

**b)** In the context of your Queen Street footfall dataset, which columns might be suitable for MICE imputation? Consider:
   - `footfall_count` (missing 8%)
   - `temperature` (missing 2%)
   - `humidity` (missing 2%)
   - `day_of_week` (complete)

(2 marks)

**c)** Write pseudocode for implementing MICE imputation using the `fancyimpute` or `sklearn.experimental.enable_iterative_imputer` libraries. (1 mark)

---

### Question 3.4: Validation of Imputation (4 marks)

After imputing missing values in your footfall dataset, you need to validate that the imputation was successful and did not introduce bias.

**a)** Describe two statistical methods to assess whether your imputed values are reasonable. (2 marks)

**b)** How would you check whether the imputation process has changed the mean, variance, or distribution of your data? (2 marks)

---

## Section 4: APIs and Real-Time Data Integration (20 marks)

### Question 4.1: API Fundamentals (5 marks)

**a)** Define what an API (Application Programming Interface) is and explain its relevance to GIS applications. (2 marks)

**b)** Name three public APIs that could provide useful data for urban GIS analysis (e.g., weather, traffic, or demographic data). For each, explain what data it provides. (3 marks)

---

### Question 4.2: HTTP Requests and JSON Parsing (8 marks)

The Auckland Transport API provides real-time public transport data. A simplified endpoint structure is:

```
https://api.at.govt.nz/v2/gtfs/routes
```

**a)** Write Python code using the `requests` library to:
   i) Make a GET request to a hypothetical endpoint that returns pedestrian footfall data (2 marks)

   ii) Check if the request was successful (status code 200) (1 mark)

   iii) Parse the JSON response and extract footfall counts (2 marks)

```python
import requests
import json

# Your code here
```

**b)** If the API response contains nested JSON with the structure:

```json
{
  "status": "success",
  "data": {
    "locations": [
      {"name": "Queen Street", "footfall": 850},
      {"name": "K Road", "footfall": 620}
    ]
  }
}
```

Write code to extract the footfall value for "Queen Street". (3 marks)

---

### Question 4.3: Error Handling and Rate Limiting (4 marks)

**a)** Write code to handle common HTTP errors when calling an API:
   - Connection timeout (status code will not be 200)
   - JSON parsing error
   - Invalid API endpoint

Use try-except blocks. (3 marks)

```python
import requests

api_url = "https://api.example.com/footfall"

# Your code here
```

**b)** Explain what rate limiting is and why APIs implement it. How would you design your code to respect a rate limit of 100 requests per hour? (1 mark)

---

### Question 4.4: Practical API Integration with GIS Data (3 marks)

You are tasked with building a dashboard that displays real-time pedestrian footfall data for multiple Auckland locations (Queen Street, K Road, Aotea Square, etc.) on an interactive Folium map.

**a)** Design a workflow (pseudocode or text description) that:
   i) Fetches current footfall data from an API (1 mark)

   ii) Converts the data to a pandas DataFrame (0.5 marks)

   iii) Creates a Folium map with markers coloured by footfall intensity (1 mark)

   iv) Updates the map every 15 minutes (0.5 marks)

Mention the libraries you would use and any challenges you might encounter.

---

## Summary of Marks

| Section | Subsection | Marks |
|---------|-----------|-------|
| **1** | Algorithms & Control Flow | 25 |
| 1.1 | Conditional Logic Debugging | 10 |
| 1.2 | Loop and Counter Logic | 8 |
| 1.3 | Operator Precedence | 7 |
| **2** | Data Import & Visualisation | 30 |
| 2.1 | Pandas Data Analysis | 15 |
| 2.2 | Geospatial Visualisation (Jenks) | 8 |
| 2.3 | Data Quality & Aggregation | 7 |
| **3** | Statistical Imputation | 25 |
| 3.1 | Missing Data Mechanisms | 6 |
| 3.2 | Forward Fill & Interpolation | 10 |
| 3.3 | MICE | 5 |
| 3.4 | Validation of Imputation | 4 |
| **4** | APIs & Real-Time Data | 20 |
| 4.1 | API Fundamentals | 5 |
| 4.2 | HTTP Requests & JSON Parsing | 8 |
| 4.3 | Error Handling & Rate Limiting | 4 |
| 4.4 | Practical API Integration | 3 |
| **TOTAL** | | **100** |

---

## Appendix A: Useful Libraries and Functions Reference

Students are expected to be familiar with:

- **pandas**: `read_csv()`, `groupby()`, `describe()`, `fillna()`, `interpolate()`, `dropna()`
- **numpy**: `np.nan`, `np.mean()`, `np.std()`
- **matplotlib**: Basic plotting
- **folium**: Map creation, `folium.Map()`, `folium.Marker()`, `folium.Choropleth()`
- **requests**: `requests.get()`, `.json()`, `.status_code`
- **json**: `json.loads()`, `json.dumps()`
- **jenkspy**: `jenks_natural_breaks()`

---

## Appendix B: Auckland Geography Reference

**Key Locations (hypothetical coordinates for reference):**
- Queen Street: 51.2889°S, 117.2693°E
- K Road (Karangahape Road): 51.2923°S, 117.2653°E
- Aotea Square: 51.2857°S, 117.2686°E

*Note: Use these coordinates for map-based questions. Actual coordinates should be verified with current data sources.*

---

**End of Test**

*This is a 2-hour examination. Please manage your time carefully. If you complete all questions early, please review your answers before submission.*
