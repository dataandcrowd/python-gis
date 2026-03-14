"""
GISCI343 - Lab Week 02: Working with Auckland Pedestrian Data
Extracted code blocks from the Quarto source.
"""


# ============================================================
# Task 1: Variables and Data Types
# ============================================================

sensor_name = "45 Queen Street"
sensor_id = 5
avg_hourly_count = 487.3
is_active = True

print(f"Sensor: {sensor_name}")
print(f"ID: {sensor_id}")
print(f"Average hourly count: {avg_hourly_count}")
print(f"Active: {is_active}")
print(f"Type of avg_hourly_count: {type(avg_hourly_count)}")


# ============================================================
# Task 2: Lists
# ============================================================

# Auckland CBD sensor locations
locations = [
    "107 Quay Street",
    "45 Queen Street",
    "30 Queen Street",
    "2 High Street",
    "150 K Road"
]

# Access by index (0-based)
print(f"First location: {locations[0]}")
print(f"Last location: {locations[-1]}")
print(f"Total locations: {len(locations)}")

# Slice to get a subset
print(f"Middle three: {locations[1:4]}")


# ============================================================
# Slice to get a subset
# ============================================================

# Hourly counts for 107 Quay Street on 1 Jan 2024 (6am-9pm)
counts = [78, 201, 644, 394, 861, 1283, 1335, 1423, 1159, 1005, 995, 780, 602, 498, 310, 195]
hours = list(range(6, 22))

print(f"Hours recorded: {len(counts)}")
print(f"Maximum count: {max(counts)}")
print(f"Minimum count: {min(counts)}")
print(f"Total daily: {sum(counts):,}")


# ============================================================
# Task 3: Loops
# ============================================================

locations = ["107 Quay Street", "45 Queen Street", "30 Queen Street", "2 High Street", "150 K Road"]
peak_counts = [1423, 1076, 1245, 129, 381]

print("=== Peak Hourly Counts ===")
for i, loc in enumerate(locations):
    print(f"  {i+1}. {loc}: {peak_counts[i]:,}")

print(f"\nTotal across 5 sensors: {sum(peak_counts):,}")


# ============================================================
# Task 3: Loops
# ============================================================

# Calculate a running total
running_total = 0
for count in peak_counts:
    running_total += count
    print(f"  Adding {count:,} -> Running total: {running_total:,}")


# ============================================================
# Task 4: Conditionals
# ============================================================

sensor_counts = {
    "107 Quay Street": 1423,
    "45 Queen Street": 1076,
    "30 Queen Street": 1245,
    "2 High Street": 129,
    "150 K Road": 381,
    "61 Federal Street": 141,
    "19 Shortland Street": 176
}

print("=== Traffic Classification ===")
for loc, count in sensor_counts.items():
    if count > 1000:
        level = "HIGH"
    elif count > 300:
        level = "MEDIUM"
    else:
        level = "LOW"
    print(f"  {loc}: {count:,} -> {level}")


# ============================================================
# Task 4: Conditionals
# ============================================================

# Count how many locations fall into each category
high = sum(1 for c in sensor_counts.values() if c > 1000)
med = sum(1 for c in sensor_counts.values() if 300 < c <= 1000)
low = sum(1 for c in sensor_counts.values() if c <= 300)

print(f"\nHigh traffic: {high} locations")
print(f"Medium traffic: {med} locations")
print(f"Low traffic: {low} locations")


# ============================================================
# Task 5: Combining Concepts
# ============================================================

# Simulated hourly data for 107 Quay Street (1 Jan 2024, 6am-9pm)
hours = list(range(6, 22))
counts = [78, 201, 644, 394, 861, 1283, 1335, 1423, 1159, 1005, 995, 780, 602, 498, 310, 195]

peak_hour = hours[0]
peak_count = counts[0]
off_peak_hours = []

for i in range(len(hours)):
    if counts[i] > peak_count:
        peak_count = counts[i]
        peak_hour = hours[i]
    if counts[i] < 300:
        off_peak_hours.append(hours[i])

print(f"Peak hour: {peak_hour}:00 with {peak_count:,} pedestrians")
print(f"Off-peak hours (< 300): {[f'{h}:00' for h in off_peak_hours]}")
print(f"Average count: {sum(counts) / len(counts):,.0f}")


# ============================================================
# Task 6: Importing Libraries and Reading Data
# ============================================================

import pandas as pd
import numpy as np


# ============================================================
# Task 6: Importing Libraries and Reading Data
# ============================================================

url = "https://raw.githubusercontent.com/dataandcrowd/GISCI343/refs/heads/main/pedestrians/akl_ped-2024.csv"
ped = pd.read_csv(url)
print(f"Shape: {ped.shape}")
print(f"Rows: {ped.shape[0]}, Columns: {ped.shape[1]}")


# ============================================================
# Task 6: Importing Libraries and Reading Data
# ============================================================

ped.head()


# ============================================================
# Task 7: Exploring the Data
# ============================================================

ped.info()


# ============================================================
# Task 7: Exploring the Data
# ============================================================

ped.describe()


# ============================================================
# Task 7: Exploring the Data
# ============================================================

# How many sensor locations?
sensor_cols = ped.columns[2:]  # Everything after Date and Time
print(f"Sensor locations: {len(sensor_cols)}")
print(f"\nColumn names:")
for col in sensor_cols:
    print(f"  - {col}")


# ============================================================
# Task 8: Selecting Columns and Rows
# ============================================================

# Select a single column (returns a Series)
queen45 = ped["45 Queen Street"]
print(type(queen45))
print(queen45.head())


# ============================================================
# Select a single column (returns a Series)
# ============================================================

# Select multiple columns (returns a DataFrame)
subset = ped[["Date", "Time", "45 Queen Street", "30 Queen Street"]]
subset.head()


# ============================================================
# Select multiple columns (returns a DataFrame)
# ============================================================

# Select by position with .iloc[]
# First 5 rows, first 4 columns
ped.iloc[0:5, 0:4]


# ============================================================
# First 5 rows, first 4 columns
# ============================================================

# Select by label with .loc[]
# All rows, specific columns
ped.loc[:, ["Date", "Time", "150 K Road"]].head()


# ============================================================
# Task 9: Filtering Rows with Boolean Indexing
# ============================================================

# Where was 45 Queen Street count above 1000?
high_traffic = ped[ped["45 Queen Street"] > 1000]
print(f"Hours with >1000 pedestrians at 45 Queen St: {len(high_traffic)}")


# ============================================================
# Where was 45 Queen Street count above 1000?
# ============================================================

# Multiple conditions: use & (and), | (or), with parentheses
busy_both = ped[
    (ped["45 Queen Street"] > 500) &
    (ped["30 Queen Street"] > 500)
]
print(f"Hours where BOTH Queen St sensors > 500: {len(busy_both)}")


# ============================================================
# Multiple conditions: use & (and), | (or), with parentheses
# ============================================================

# The .query() method is an alternative syntax (often more readable)
result = ped.query("`45 Queen Street` > 1000 and `30 Queen Street` > 800")
print(f"Both high: {len(result)} rows")


# ============================================================
# Task 10: Creating New Columns
# ============================================================

# The CSV contains a "Daylight Savings" marker row and 11 blank separator rows.
# Drop all non-data rows before converting.
ped = ped.dropna(subset=["Date", "Time"]).copy()
ped = ped[ped["Date"] != "Daylight Savings"].copy()

# Convert Date to datetime type
ped["Date"] = pd.to_datetime(ped["Date"])

# Extract temporal features
ped["month"] = ped["Date"].dt.month
ped["day_of_week"] = ped["Date"].dt.day_name()
ped["day_num"] = ped["Date"].dt.dayofweek  # 0=Monday, 6=Sunday

# Extract hour from the Time column
ped["hour"] = ped["Time"].str.split(":").str[0].astype(int)

ped[["Date", "Time", "month", "day_of_week", "hour"]].head(10)


# ============================================================
# Extract hour from the Time column
# ============================================================

# Create a total count across all sensors
ped["total_count"] = ped[sensor_cols].sum(axis=1)

print(f"Highest single-hour total: {ped['total_count'].max():,.0f}")
print(f"Lowest single-hour total: {ped['total_count'].min():,.0f}")


# ============================================================
# Task 11: The Importance of .copy()
# ============================================================

# Safe: always use .copy() when creating subsets you will modify
january = ped[ped["month"] == 1].copy()
january["season"] = "Summer"

# The original ped DataFrame is unaffected
print(f"'season' in ped columns: {'season' in ped.columns}")
print(f"'season' in january columns: {'season' in january.columns}")


# ============================================================
# Task 12: Grouping and Aggregation
# ============================================================

# Average hourly count by month for 45 Queen Street
monthly_avg = ped.groupby("month")["45 Queen Street"].mean()
print(monthly_avg.round(0))


# ============================================================
# Average hourly count by month for 45 Queen Street
# ============================================================

# Average by hour across all sensors
hourly_avg = ped.groupby("hour")[sensor_cols.tolist()].mean()
hourly_total = hourly_avg.sum(axis=1)
print(f"\nBusiest hour (all sensors): {hourly_total.idxmax()}:00")
print(f"Quietest hour (all sensors): {hourly_total.idxmin()}:00")


# ============================================================
# Average by hour across all sensors
# ============================================================

# Multiple aggregations at once
agg_stats = ped.groupby("month")["45 Queen Street"].agg(["mean", "median", "std", "min", "max"])
agg_stats.round(0)


# ============================================================
# Task 13: Reshaping Data (Wide to Long)
# ============================================================

# Melt from wide to long
ped_long = pd.melt(
    ped,
    id_vars=["Date", "Time", "month", "day_of_week", "day_num", "hour"],
    value_vars=sensor_cols.tolist(),
    var_name="location",
    value_name="count"
)

print(f"Wide shape: {ped.shape}")
print(f"Long shape: {ped_long.shape}")
ped_long.head()


# ============================================================
# Melt from wide to long
# ============================================================

# Now we can easily group by location
location_avg = ped_long.groupby("location")["count"].mean().sort_values(ascending=False)
print("Top 5 busiest locations (average hourly count):")
print(location_avg.head().round(0))


# ============================================================
# Task 14: Handling Missing Data
# ============================================================

# Check for missing values across all sensor columns
missing = ped[sensor_cols].isna().sum()
print(f"Total missing cells: {missing.sum()}")


# ============================================================
# Check for missing values across all sensor columns
# ============================================================

# Simulate a sensor outage: remove hours 10-15 on a busy weekday
sensor = "45 Queen Street"
sim = ped[["Date", "Time", "hour", sensor]].copy()

# Pick a Wednesday in March (a busy weekday)
target_date = pd.Timestamp("2024-03-06")
mask = (sim["Date"] == target_date) & (sim["hour"].between(10, 15))
print(f"Rows to blank out: {mask.sum()}")
print(f"True values we are hiding:")
print(sim.loc[mask, ["hour", sensor]].to_string(index=False))

# Replace with NaN
sim.loc[mask, sensor] = np.nan


# ============================================================
# Replace with NaN
# ============================================================

# Apply four strategies
sim["fill_zero"] = sim[sensor].fillna(0)
sim["fill_ffill"] = sim[sensor].ffill()
sim["fill_bfill"] = sim[sensor].bfill()
sim["fill_interp"] = sim[sensor].interpolate()


# ============================================================
# Apply four strategies
# ============================================================

# Compare strategies for the gap period
gap_rows = sim[mask].copy()
gap_rows = gap_rows.rename(columns={sensor: "true_value"})

# Retrieve the true values from the original ped DataFrame
gap_rows["true_value"] = ped.loc[mask, sensor].values

comparison = gap_rows[["hour", "true_value", "fill_zero", "fill_ffill", "fill_bfill", "fill_interp"]]
comparison.columns = ["Hour", "True", "Zero", "Fwd Fill", "Bck Fill", "Interpolate"]
print(comparison.to_string(index=False))


# ============================================================
# Retrieve the true values from the original ped DataFrame
# ============================================================

# Compute the error for each strategy
for strategy in ["Zero", "Fwd Fill", "Bck Fill", "Interpolate"]:
    mae = (comparison[strategy] - comparison["True"]).abs().mean()
    print(f"  {strategy:12s}  Mean Absolute Error = {mae:,.0f}")


# ============================================================
# Compute the error for each strategy
# ============================================================

# Visualise the gap and each strategy's attempt to fill it
import matplotlib.pyplot as plt

day = sim[sim["Date"] == target_date].copy()

fig, ax = plt.subplots(figsize=(10, 4))

# True values (from original data)
true_day = ped.loc[ped["Date"] == target_date, ["hour", sensor]]
ax.plot(true_day["hour"], true_day[sensor], "ko-", label="True", linewidth=2, zorder=5)

# Each strategy
ax.plot(day["hour"], day["fill_zero"], "s--", label="Fill 0", alpha=0.7)
ax.plot(day["hour"], day["fill_ffill"], "^--", label="Forward fill", alpha=0.7)
ax.plot(day["hour"], day["fill_bfill"], "v--", label="Backward fill", alpha=0.7)
ax.plot(day["hour"], day["fill_interp"], "D-", label="Interpolate", alpha=0.7)

# Shade the gap
ax.axvspan(9.5, 15.5, color="grey", alpha=0.12, label="Simulated gap")

ax.set_title(f"Imputation strategies: {sensor}, {target_date.date()}", fontweight="bold")
ax.set_xlabel("Hour of day")
ax.set_ylabel("Pedestrian count")
ax.legend(fontsize=9)
plt.tight_layout()
plt.show()


# ============================================================
# Task 15: Merging DataFrames
# ============================================================

# Create a simple metadata table
metadata = pd.DataFrame({
    "location": ["107 Quay Street", "45 Queen Street", "30 Queen Street",
                  "150 K Road", "183 K Road", "2 High Street"],
    "zone": ["Waterfront", "CBD Core", "CBD Core", "K Road", "K Road", "CBD Core"],
    "installed_year": [2019, 2018, 2018, 2020, 2020, 2019]
})

metadata


# ============================================================
# Create a simple metadata table
# ============================================================

# Merge with long-format data
merged = ped_long.merge(metadata, on="location", how="inner")
print(f"Merged shape: {merged.shape}")
merged.head()


# ============================================================
# Merge with long-format data
# ============================================================

# Now we can group by zone
zone_avg = merged.groupby("zone")["count"].mean().sort_values(ascending=False)
print("Average hourly count by zone:")
print(zone_avg.round(0))


# ============================================================
# Task 16: Setup and Line Plot
# ============================================================

import matplotlib.pyplot as plt
import seaborn as sns

# Clean style for all plots
sns.set_style("whitegrid")


# ============================================================
# Clean style for all plots
# ============================================================

# Daily total for 45 Queen Street
daily_queen = ped.groupby("Date")["45 Queen Street"].sum()

fig, ax = plt.subplots(figsize=(10, 4))
daily_queen.plot(ax=ax, color="#065A82", linewidth=0.7, alpha=0.8)
ax.set_title("45 Queen Street: Daily Pedestrian Count (2024)", fontsize=14, fontweight="bold")
ax.set_xlabel("Date")
ax.set_ylabel("Daily Count")
ax.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()


# ============================================================
# Task 17: Bar Chart Comparing Locations
# ============================================================

# Average hourly count per location
avg_by_location = ped[sensor_cols].mean().sort_values()

fig, ax = plt.subplots(figsize=(8, 7))
colours = ["#F96167" if v >= avg_by_location.nlargest(3).min() else "#065A82"
           for v in avg_by_location]
avg_by_location.plot.barh(ax=ax, color=colours)
ax.set_title("Average Hourly Pedestrian Count by Location", fontsize=14, fontweight="bold")
ax.set_xlabel("Average Hourly Count")
plt.tight_layout()
plt.show()


# ============================================================
# Task 18: Heatmap (Hour vs Day of Week)
# ============================================================

# Pivot table: hour (rows) x day_of_week (columns)
pivot = ped.pivot_table(
    values="45 Queen Street",
    index="hour",
    columns="day_of_week",
    aggfunc="mean"
)

# Reorder days logically
day_order = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
pivot = pivot[day_order]

fig, ax = plt.subplots(figsize=(9, 6))
sns.heatmap(pivot, cmap="YlOrRd", annot=True, fmt=".0f", linewidths=0.5, ax=ax)
ax.set_title("45 Queen Street: Average Count by Hour and Day", fontsize=14, fontweight="bold")
ax.set_ylabel("Hour of Day")
ax.set_xlabel("Day of Week")
plt.tight_layout()
plt.show()


# ============================================================
# Task 19: Box Plots by Month
# ============================================================

fig, ax = plt.subplots(figsize=(10, 5))
month_names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
               "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
ped["month_name"] = ped["month"].map(dict(zip(range(1, 13), month_names)))
month_order = month_names[:ped["month"].max()]

sns.boxplot(data=ped, x="month_name", y="45 Queen Street",
            order=month_order, palette="coolwarm", ax=ax)
ax.set_title("Monthly Distribution: 45 Queen Street", fontsize=14, fontweight="bold")
ax.set_xlabel("Month")
ax.set_ylabel("Hourly Count")
plt.tight_layout()
plt.show()


# ============================================================
# Task 20: Multi-Panel Figure
# ============================================================

fig, axes = plt.subplots(2, 2, figsize=(14, 10))

# Panel 1: Daily trend
daily_queen.plot(ax=axes[0, 0], color="#065A82", linewidth=0.6)
axes[0, 0].set_title("Daily Total (45 Queen St)", fontweight="bold")
axes[0, 0].set_xlabel("")

# Panel 2: Hourly average profile
hourly_profile = ped.groupby("hour")["45 Queen Street"].mean()
hourly_profile.plot.bar(ax=axes[0, 1], color="#1C7293", width=0.8)
axes[0, 1].set_title("Average Hourly Profile", fontweight="bold")
axes[0, 1].set_xlabel("Hour")
axes[0, 1].set_ylabel("Avg Count")

# Panel 3: Weekday vs Weekend comparison
weekday_mask = ped["day_num"] < 5
weekday_profile = ped[weekday_mask].groupby("hour")["45 Queen Street"].mean()
weekend_profile = ped[~weekday_mask].groupby("hour")["45 Queen Street"].mean()
axes[1, 0].plot(weekday_profile.index, weekday_profile.values, label="Weekday", color="#065A82", linewidth=2)
axes[1, 0].plot(weekend_profile.index, weekend_profile.values, label="Weekend", color="#F96167", linewidth=2)
axes[1, 0].legend()
axes[1, 0].set_title("Weekday vs Weekend Profile", fontweight="bold")
axes[1, 0].set_xlabel("Hour")
axes[1, 0].set_ylabel("Avg Count")

# Panel 4: Top 5 locations bar chart
top5 = ped[sensor_cols].mean().nlargest(5).sort_values()
top5.plot.barh(ax=axes[1, 1], color=["#1C7293", "#1C7293", "#1C7293", "#065A82", "#065A82"])
axes[1, 1].set_title("Top 5 Busiest Locations", fontweight="bold")
axes[1, 1].set_xlabel("Avg Hourly Count")

plt.suptitle("Auckland CBD Pedestrian Analysis (2024)", fontsize=16, fontweight="bold", y=1.01)
plt.tight_layout()
plt.show()
