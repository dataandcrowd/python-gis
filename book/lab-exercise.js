const pptxgen = require("pptxgenjs");

let pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "Hyesop Shin";
pres.title = "GISCI343 Lab Exercise - Working with Auckland Pedestrian Data";

// Colour palette - Ocean/Auckland theme
const C = {
  navy: "065A82",
  teal: "1C7293",
  midnight: "21295C",
  coral: "F96167",
  light: "F5F7FA",
  white: "FFFFFF",
  dark: "1E293B",
  muted: "64748B",
  codeBg: "1E293B",
  codeText: "E2E8F0",
  mint: "0D9488",
  amber: "F59E0B",
  lightTeal: "E0F2FE",
};

// Font config
const H_FONT = "Georgia";
const B_FONT = "Calibri";

// Helper: factory for shadows (fresh object each time)
const makeShadow = () => ({
  type: "outer", color: "000000", blur: 6, offset: 2, angle: 135, opacity: 0.1,
});

// Helper: code block
function addCodeBlock(slide, code, x, y, w, h) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h, fill: { color: C.codeBg }, shadow: makeShadow(),
  });
  slide.addText(code, {
    x: x + 0.15, y: y + 0.1, w: w - 0.3, h: h - 0.2,
    fontFace: "Consolas", fontSize: 11, color: C.codeText,
    valign: "top", paraSpaceAfter: 2,
  });
}

// Helper: section divider slide
function addSectionSlide(title, subtitle, duration) {
  let s = pres.addSlide();
  s.background = { color: C.midnight };
  s.addText(title, {
    x: 0.8, y: 1.2, w: 8.4, h: 1.2,
    fontFace: H_FONT, fontSize: 40, color: C.white, bold: true,
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: 2.5, w: 1.5, h: 0.06, fill: { color: C.coral },
  });
  s.addText(subtitle, {
    x: 0.8, y: 2.8, w: 8.4, h: 0.8,
    fontFace: B_FONT, fontSize: 18, color: "94A3B8",
  });
  s.addText(duration, {
    x: 0.8, y: 4.2, w: 3, h: 0.5,
    fontFace: B_FONT, fontSize: 14, color: C.coral, italic: true,
  });
  return s;
}

// Helper: activity slide with code
function addActivitySlide(num, title, instructions, code, expected) {
  let s = pres.addSlide();
  s.background = { color: C.light };

  // Activity number badge
  s.addShape(pres.shapes.OVAL, {
    x: 0.5, y: 0.3, w: 0.55, h: 0.55, fill: { color: C.teal },
  });
  s.addText(String(num), {
    x: 0.5, y: 0.3, w: 0.55, h: 0.55,
    fontFace: H_FONT, fontSize: 18, color: C.white, bold: true,
    align: "center", valign: "middle", margin: 0,
  });

  // Title
  s.addText(title, {
    x: 1.2, y: 0.3, w: 8, h: 0.55,
    fontFace: H_FONT, fontSize: 24, color: C.navy, bold: true,
    valign: "middle", margin: 0,
  });

  // Instructions
  let instrItems = instructions.map((t, i) => ({
    text: t,
    options: { bullet: true, breakLine: i < instructions.length - 1 },
  }));
  s.addText(instrItems, {
    x: 0.5, y: 1.0, w: 4.2, h: 2.2,
    fontFace: B_FONT, fontSize: 13, color: C.dark, valign: "top",
    paraSpaceAfter: 4,
  });

  // Code block
  if (code) {
    addCodeBlock(s, code, 5.0, 1.0, 4.5, 2.2);
  }

  // Expected output
  if (expected) {
    s.addText("Expected output:", {
      x: 0.5, y: 3.4, w: 4, h: 0.3,
      fontFace: B_FONT, fontSize: 11, color: C.muted, italic: true,
    });
    addCodeBlock(s, expected, 0.5, 3.7, 9.0, 1.5);
  }

  return s;
}

// Helper: explanation slide (two-column text + visual element)
function addExplainSlide(title, paragraphs, rightContent) {
  let s = pres.addSlide();
  s.background = { color: C.white };

  s.addText(title, {
    x: 0.5, y: 0.3, w: 9, h: 0.6,
    fontFace: H_FONT, fontSize: 26, color: C.navy, bold: true, margin: 0,
  });

  let paraItems = paragraphs.map((t, i) => ({
    text: t,
    options: { breakLine: i < paragraphs.length - 1, paraSpaceAfter: 6 },
  }));
  let leftW = rightContent ? 5.0 : 9.0;
  s.addText(paraItems, {
    x: 0.5, y: 1.1, w: leftW, h: 4.0,
    fontFace: B_FONT, fontSize: 14, color: C.dark, valign: "top",
  });

  if (rightContent && rightContent.code) {
    addCodeBlock(s, rightContent.code, 5.8, 1.1, 3.7, rightContent.h || 3.5);
  }

  return s;
}

// ===== TITLE SLIDE =====
let titleSlide = pres.addSlide();
titleSlide.background = { color: C.navy };
titleSlide.addText("GISCI343 Lab Exercise", {
  x: 0.8, y: 0.8, w: 8.4, h: 0.8,
  fontFace: B_FONT, fontSize: 16, color: "94A3B8",
});
titleSlide.addText("Working with Auckland\nPedestrian Data", {
  x: 0.8, y: 1.5, w: 8.4, h: 1.8,
  fontFace: H_FONT, fontSize: 44, color: C.white, bold: true,
});
titleSlide.addShape(pres.shapes.RECTANGLE, {
  x: 0.8, y: 3.5, w: 2, h: 0.06, fill: { color: C.coral },
});
titleSlide.addText("Sections 2.1, 2.2, and 2.3", {
  x: 0.8, y: 3.8, w: 5, h: 0.5,
  fontFace: B_FONT, fontSize: 18, color: "CBD5E1",
});
titleSlide.addText([
  { text: "Duration: 2+ hours  |  Dataset: akl_ped-2024.csv", options: { breakLine: true } },
  { text: "Hyesop Shin  |  University of Auckland" },
], {
  x: 0.8, y: 4.6, w: 8.4, h: 0.7,
  fontFace: B_FONT, fontSize: 12, color: "94A3B8",
});

// ===== OVERVIEW SLIDE =====
let overSlide = pres.addSlide();
overSlide.background = { color: C.white };
overSlide.addText("Lab Overview", {
  x: 0.5, y: 0.3, w: 9, h: 0.7,
  fontFace: H_FONT, fontSize: 30, color: C.navy, bold: true, margin: 0,
});

// Three cards for three parts
const parts = [
  { num: "2.1", title: "Python Foundations", time: "~30 min", desc: "Variables, lists, loops, and conditionals using pedestrian data context", color: C.teal },
  { num: "2.2", title: "DataFrames & Pandas", time: "~60 min", desc: "Read, explore, filter, group, reshape, and merge the Auckland pedestrian CSV", color: C.navy },
  { num: "2.3", title: "Data Visualisation", time: "~30 min", desc: "Line plots, bar charts, heatmaps, and multi-panel figures with matplotlib and seaborn", color: C.coral },
];

parts.forEach((p, i) => {
  let cx = 0.5 + i * 3.1;
  overSlide.addShape(pres.shapes.RECTANGLE, {
    x: cx, y: 1.2, w: 2.9, h: 3.8,
    fill: { color: C.light }, shadow: makeShadow(),
  });
  // Accent bar top
  overSlide.addShape(pres.shapes.RECTANGLE, {
    x: cx, y: 1.2, w: 2.9, h: 0.08, fill: { color: p.color },
  });
  overSlide.addText(p.num, {
    x: cx + 0.2, y: 1.5, w: 2.5, h: 0.6,
    fontFace: H_FONT, fontSize: 32, color: p.color, bold: true,
  });
  overSlide.addText(p.title, {
    x: cx + 0.2, y: 2.1, w: 2.5, h: 0.5,
    fontFace: H_FONT, fontSize: 16, color: C.dark, bold: true,
  });
  overSlide.addText(p.time, {
    x: cx + 0.2, y: 2.6, w: 2.5, h: 0.35,
    fontFace: B_FONT, fontSize: 12, color: C.coral, italic: true,
  });
  overSlide.addText(p.desc, {
    x: cx + 0.2, y: 3.0, w: 2.5, h: 1.8,
    fontFace: B_FONT, fontSize: 12, color: C.muted, valign: "top",
  });
});

overSlide.addText("Dataset: Auckland CBD pedestrian counts from 21 sensor locations, hourly data for 2024", {
  x: 0.5, y: 5.1, w: 9, h: 0.4,
  fontFace: B_FONT, fontSize: 11, color: C.muted, italic: true,
});

// ============================================================
// PART 2.1: PYTHON FOUNDATIONS
// ============================================================
addSectionSlide("Part 2.1", "Python Foundations Review", "~30 minutes");

// Activity 1: Variables
addActivitySlide(1, "Variables and Data Types",
  [
    "Create variables to store pedestrian data information",
    "Use appropriate types: str, int, float, bool",
    "Print each variable with a descriptive label",
    "Check types using type()",
  ],
  `# Sensor metadata
sensor_name = "45 Queen Street"
sensor_id = 5
avg_count = 487.3
is_active = True

print(f"Sensor: {sensor_name}")
print(f"Type: {type(avg_count)}")`,
  `Sensor: 45 Queen Street
Type: <class 'float'>`
);

// Activity 2: Lists
addActivitySlide(2, "Working with Lists",
  [
    "Create a list of Auckland CBD sensor locations",
    "Access elements by index (0-based)",
    "Slice the list to get a subset",
    "Use len() to count elements",
    "Append a new location",
  ],
  `locations = [
    "107 Quay Street",
    "45 Queen Street",
    "30 Queen Street",
    "2 High Street",
    "150 K Road"
]
print(f"Total: {len(locations)}")
print(f"First: {locations[0]}")
print(f"Last 2: {locations[-2:]}")`,
  `Total: 5
First: 107 Quay Street
Last 2: ['2 High Street', '150 K Road']`
);

// Activity 3: Loops
addActivitySlide(3, "For Loops with Pedestrian Data",
  [
    "Iterate through sensor locations",
    "Use enumerate() to get index + value",
    "Calculate total from a list of counts",
    "Use range() for numbered sequences",
  ],
  `counts = [861, 774, 755, 604, 576]
locations = ["Quay St", "45 Queen",
  "30 Queen", "210 Queen", "261 Queen"]

total = 0
for i, loc in enumerate(locations):
    total += counts[i]
    print(f"{i+1}. {loc}: {counts[i]}")

print(f"\\nTotal: {total:,}")`,
  `1. Quay St: 861
2. 45 Queen: 774
3. 30 Queen: 755
4. 210 Queen: 604
5. 261 Queen: 576

Total: 3,570`
);

// Activity 4: Conditionals
addActivitySlide(4, "Conditionals: Filtering by Threshold",
  [
    "Use if/elif/else to classify pedestrian volumes",
    "Combine loops + conditionals to filter data",
    "Classify locations as high, medium, or low traffic",
  ],
  `counts = {
    "Quay St": 861, "45 Queen": 774,
    "30 Queen": 755, "K Road": 381,
    "High St": 76, "Federal St": 141
}

for loc, count in counts.items():
    if count > 700:
        level = "HIGH"
    elif count > 300:
        level = "MEDIUM"
    else:
        level = "LOW"
    print(f"{loc}: {count} ({level})")`,
  `Quay St: 861 (HIGH)
45 Queen: 774 (HIGH)
30 Queen: 755 (HIGH)
K Road: 381 (MEDIUM)
High St: 76 (LOW)
Federal St: 141 (LOW)`
);

// Activity 5: Combining concepts
addActivitySlide(5, "Challenge: Hourly Summary",
  [
    "Combine variables, lists, loops, and conditionals",
    "Simulate hourly counts for a single sensor",
    "Find the peak hour and total daily count",
    "Classify hours as peak vs off-peak",
  ],
  `hours = list(range(6, 22))
counts = [78, 201, 644, 394, 861,
  1283, 1335, 1423, 1159, 1005,
  995, 780, 602, 498, 310, 195]

peak_count = 0
peak_hour = 0
for i, h in enumerate(hours):
    if counts[i] > peak_count:
        peak_count = counts[i]
        peak_hour = h
print(f"Peak: {peak_hour}:00 "
      f"({peak_count:,} people)")
print(f"Daily total: {sum(counts):,}")`,
  `Peak: 13:00 (1,423 people)
Daily total: 11,763`
);

// ============================================================
// PART 2.2: DATAFRAMES & PANDAS
// ============================================================
addSectionSlide("Part 2.2", "DataFrames and Pandas", "~60 minutes");

// Explain: imports
addExplainSlide("Importing Libraries", [
  "Before working with data, you need to import the libraries that provide the tools. Python uses import statements to load external packages.",
  "The import statement loads the entire library. The as keyword creates a short alias so you do not need to type the full name every time.",
  "The from ... import syntax lets you import specific functions or classes from a library without loading everything.",
  "Standard aliases: pd for pandas, np for numpy, plt for matplotlib.pyplot. Using these conventions makes your code readable to other Python users.",
], { code: `import pandas as pd
import numpy as np

# Or import specific items
from pathlib import Path

# Check version
print(pd.__version__)`, h: 2.5 });

// Activity 6: Read CSV
addActivitySlide(6, "Read the Auckland Pedestrian CSV",
  [
    "Use pd.read_csv() to load the data",
    "Store result in a variable called ped",
    "Print the shape (rows, columns)",
    "Display the first 5 rows with .head()",
  ],
  `import pandas as pd

ped = pd.read_csv("akl_ped-2024.csv")

print(f"Shape: {ped.shape}")
print(f"Rows: {ped.shape[0]}")
print(f"Columns: {ped.shape[1]}")
ped.head()`,
  `Shape: (5856, 23)
Rows: 5856
Columns: 23`
);

// Activity 7: Explore
addActivitySlide(7, "Exploring the Data",
  [
    "Use .info() to see column types and missing values",
    "Use .describe() for summary statistics",
    "Use .columns to list all column names",
    "How many sensor locations are there? (hint: subtract Date and Time)",
  ],
  `# Column info
ped.info()

# Summary statistics
ped.describe()

# List columns
print(ped.columns.tolist())

# Count sensor locations
n_sensors = len(ped.columns) - 2
print(f"Sensors: {n_sensors}")`,
  `Sensors: 21
(info() shows 23 columns, dtypes,
 non-null counts, memory usage)`
);

// Activity 8: Selecting data
addActivitySlide(8, "Selecting Columns and Rows",
  [
    "Select a single column (returns a Series)",
    "Select multiple columns (returns a DataFrame)",
    "Use .iloc[] for position-based selection",
    "Use .loc[] for label-based selection",
  ],
  `# Single column (Series)
queen45 = ped["45 Queen Street"]

# Multiple columns
subset = ped[["Date", "Time",
              "45 Queen Street",
              "30 Queen Street"]]

# First 10 rows of subset
subset.head(10)

# Specific rows by position
ped.iloc[0:5, 0:4]`,
  null
);

// Activity 9: Filtering
addActivitySlide(9, "Filtering with Boolean Indexing",
  [
    "Create boolean conditions to filter rows",
    "Use & (and) and | (or) for multiple conditions",
    "Try the .query() method as an alternative",
    "Find hours where Queen St had 1000+ pedestrians",
  ],
  `# High traffic at 45 Queen Street
high = ped[ped["45 Queen Street"] > 1000]
print(f"High traffic hours: {len(high)}")

# Multiple conditions (use parentheses!)
busy = ped[
    (ped["45 Queen Street"] > 500) &
    (ped["30 Queen Street"] > 500)
]

# Using .query()
result = ped.query(
    "\`45 Queen Street\` > 1000"
)`,
  `High traffic hours: 542`
);

// Activity 10: New columns
addActivitySlide(10, "Creating New Columns",
  [
    "Extract temporal features from the Date column",
    "Create month, day_of_week, hour columns",
    "Calculate a total_count column across all sensors",
    "These new columns enable powerful grouping later",
  ],
  `# Convert Date to datetime
ped["Date"] = pd.to_datetime(
    ped["Date"])

# Extract temporal features
ped["month"] = ped["Date"].dt.month
ped["day_of_week"] = \\
    ped["Date"].dt.day_name()
ped["day_num"] = \\
    ped["Date"].dt.dayofweek

# Extract hour from Time
ped["hour"] = ped["Time"].str.split(
    ":").str[0].astype(int)

print(ped[["Date","month",
  "day_of_week","hour"]].head())`,
  null
);

// Explain: .copy()
addExplainSlide("Why .copy() Matters", [
  "When you slice a DataFrame, pandas may return a view (a window into the original data) rather than an independent copy. Modifying a view can unintentionally change your original DataFrame.",
  "This is one of the most common sources of bugs in pandas code. The SettingWithCopyWarning exists precisely to alert you to this risk.",
  "Always use .copy() when you intend to create an independent subset that you will modify. This ensures your original data remains untouched.",
], { code: `# Without .copy() - risky!
subset = ped[ped["month"] == 1]
subset["label"] = "January"
# May modify ped too!

# With .copy() - safe
subset = ped[ped["month"] == 1].copy()
subset["label"] = "January"
# ped is untouched`, h: 2.8 });

// Activity 11: GroupBy
addActivitySlide(11, "Grouping and Aggregation",
  [
    "Use .groupby() to compute statistics by group",
    "Find average pedestrian count by month",
    "Find busiest hour across all sensors",
    "Try multiple aggregation functions with .agg()",
  ],
  `# Sensor columns only
sensors = ped.columns[2:23]

# Average by month for one sensor
monthly = ped.groupby("month")[
    "45 Queen Street"].mean()
print(monthly.round(0))

# Busiest hour
hourly = ped.groupby("hour")[
    sensors.tolist()].mean()
totals = hourly.sum(axis=1)
peak = totals.idxmax()
print(f"\\nPeak hour: {peak}:00")`,
  `month
1     547.0
2     632.0
...
Peak hour: 12:00`
);

// Activity 12: Reshaping
addActivitySlide(12, "Reshaping: Wide to Long Format",
  [
    "The CSV is in wide format (one column per sensor)",
    "Use pd.melt() to convert to long format",
    "Long format is better for grouping and plotting",
    "Each row becomes one sensor-time observation",
  ],
  `# Melt wide to long
ped_long = pd.melt(
    ped,
    id_vars=["Date", "Time",
             "month", "hour"],
    value_vars=ped.columns[2:23],
    var_name="location",
    value_name="count"
)

print(f"Wide: {ped.shape}")
print(f"Long: {ped_long.shape}")
print(ped_long.head())`,
  `Wide: (5856, 27)
Long: (122976, 6)`
);

// Activity 13: Missing data
addActivitySlide(13, "Handling Missing Data",
  [
    "Check for missing values with .isna().sum()",
    "Decide on a strategy: drop, fill with 0, forward fill, or interpolate",
    "Different strategies suit different analysis goals",
    "Document your choice and reasoning",
  ],
  `# Count missing per column
missing = ped.isna().sum()
print(missing[missing > 0])

# Fill with 0 (assumes no data = no people)
ped_zero = ped.fillna(0)

# Forward fill (carry last known value)
ped_ffill = ped.ffill()

# Interpolate (estimate between knowns)
ped_interp = ped.interpolate()

# Drop rows with any missing
ped_clean = ped.dropna()`,
  null
);

// Challenge slide for Part 2.2
let challengeSlide = pres.addSlide();
challengeSlide.background = { color: C.light };
challengeSlide.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: 0.3, w: 9, h: 0.6, fill: { color: C.coral },
});
challengeSlide.addText("Challenge: Part 2.2 Synthesis", {
  x: 0.7, y: 0.3, w: 8.5, h: 0.6,
  fontFace: H_FONT, fontSize: 24, color: C.white, bold: true,
  valign: "middle", margin: 0,
});
challengeSlide.addText([
  { text: "Using everything from Part 2.2, answer this question:", options: { breakLine: true, paraSpaceAfter: 8 } },
  { text: "Which sensor location had the highest average weekday lunchtime (12:00-13:00) pedestrian count in winter (June-August)?", options: { bold: true, breakLine: true, paraSpaceAfter: 12 } },
  { text: "Steps:", options: { bold: true, breakLine: true } },
  { text: "1. Filter for weekdays (Monday-Friday)", options: { breakLine: true } },
  { text: "2. Filter for winter months (June, July, August)", options: { breakLine: true } },
  { text: "3. Filter for lunchtime hours (12 and 13)", options: { breakLine: true } },
  { text: "4. Calculate mean count per location", options: { breakLine: true } },
  { text: "5. Sort and identify the busiest location", options: { breakLine: true, paraSpaceAfter: 10 } },
  { text: "Time: ~15 minutes", options: { italic: true } },
], {
  x: 0.5, y: 1.2, w: 9, h: 4.0,
  fontFace: B_FONT, fontSize: 14, color: C.dark, valign: "top",
});

// ============================================================
// PART 2.3: DATA VISUALISATION
// ============================================================
addSectionSlide("Part 2.3", "Data Visualisation", "~30 minutes");

// Explain: visualisation libraries
addExplainSlide("Python Visualisation Libraries", [
  "matplotlib is the foundation. Nearly all other Python plotting libraries are built on top of it. It gives you precise control over every element of a figure.",
  "pandas provides built-in .plot() methods directly on DataFrames and Series. It is the fastest route from data to chart during exploratory analysis.",
  "seaborn offers polished statistical graphics with sensible defaults. It excels at showing distributions, relationships, and categorical comparisons.",
  "For this lab, we will use all three. Start with pandas plotting for speed, then refine with matplotlib and seaborn for publication-quality output.",
], { code: `import matplotlib.pyplot as plt
import seaborn as sns

# Set a clean style
sns.set_style("whitegrid")

# Increase default figure size
plt.rcParams["figure.figsize"] = \\
    [10, 6]`, h: 2.2 });

// Activity 14: Line plot
addActivitySlide(14, "Line Plot: Daily Pedestrian Trends",
  [
    "Aggregate hourly data to daily totals",
    "Plot a time series for one sensor location",
    "Add axis labels, title, and grid",
    "Save the figure as a PNG file",
  ],
  `# Daily total for 45 Queen Street
daily = ped.groupby("Date")[
    "45 Queen Street"].sum()

fig, ax = plt.subplots(figsize=(10, 4))
daily.plot(ax=ax, color="#065A82",
           linewidth=0.8)
ax.set_title("45 Queen Street: "
    "Daily Pedestrian Count 2024",
    fontsize=14)
ax.set_xlabel("Date")
ax.set_ylabel("Total Count")
plt.tight_layout()
plt.savefig("daily_trend.png", dpi=150)
plt.show()`,
  null
);

// Activity 15: Bar chart
addActivitySlide(15, "Bar Chart: Comparing Locations",
  [
    "Calculate average daily count per sensor",
    "Create a horizontal bar chart",
    "Sort locations from busiest to quietest",
    "Use colour to highlight the top 3 locations",
  ],
  `sensors = ped.columns[2:23]
avg = ped[sensors].mean().sort_values()

fig, ax = plt.subplots(figsize=(8, 7))
colors = ["#F96167" if v >= avg.nlargest(3).min()
          else "#065A82" for v in avg]
avg.plot.barh(ax=ax, color=colors)
ax.set_title("Average Hourly Count "
    "by Location", fontsize=14)
ax.set_xlabel("Average Count")
plt.tight_layout()
plt.savefig("location_bars.png",
            dpi=150)
plt.show()`,
  null
);

// Activity 16: Heatmap
addActivitySlide(16, "Heatmap: Hour vs Day of Week",
  [
    "Create a pivot table: hour (rows) vs day (columns)",
    "Use seaborn's heatmap for a colour-coded matrix",
    "This reveals when and where pedestrians are busiest",
    "Experiment with different colour maps (cmap)",
  ],
  `pivot = ped.pivot_table(
    values="45 Queen Street",
    index="hour",
    columns="day_of_week",
    aggfunc="mean"
)
# Reorder days
day_order = ["Monday","Tuesday",
  "Wednesday","Thursday","Friday",
  "Saturday","Sunday"]
pivot = pivot[day_order]

fig, ax = plt.subplots(figsize=(8, 6))
sns.heatmap(pivot, cmap="YlOrRd",
    annot=True, fmt=".0f", ax=ax)
ax.set_title("Avg Count: Hour x Day")
plt.tight_layout()
plt.savefig("heatmap.png", dpi=150)`,
  null
);

// Activity 17: Multi-panel
addActivitySlide(17, "Multi-Panel Figure",
  [
    "Use plt.subplots(2, 2) for a 2x2 grid",
    "Panel 1: Daily trend line",
    "Panel 2: Hourly average bar chart",
    "Panel 3: Monthly box plot",
    "Panel 4: Location comparison bars",
  ],
  `fig, axes = plt.subplots(2, 2,
    figsize=(12, 8))

# Panel 1: Daily trend
daily.plot(ax=axes[0,0],
    color="#065A82", lw=0.8)
axes[0,0].set_title("Daily Trend")

# Panel 2: Hourly average
hourly_avg = ped.groupby("hour")[
    "45 Queen Street"].mean()
hourly_avg.plot.bar(ax=axes[0,1],
    color="#1C7293")
axes[0,1].set_title("Hourly Average")

# Panel 3 & 4: your choice!
plt.tight_layout()
plt.savefig("multi_panel.png", dpi=150)`,
  null
);

// Final challenge
let finalSlide = pres.addSlide();
finalSlide.background = { color: C.light };
finalSlide.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: 0.3, w: 9, h: 0.6, fill: { color: C.mint },
});
finalSlide.addText("Final Challenge: Complete Analysis", {
  x: 0.7, y: 0.3, w: 8.5, h: 0.6,
  fontFace: H_FONT, fontSize: 24, color: C.white, bold: true,
  valign: "middle", margin: 0,
});
finalSlide.addText([
  { text: "Produce a short report (as a Jupyter notebook) that answers:", options: { breakLine: true, paraSpaceAfter: 8 } },
  { text: "How do pedestrian patterns differ between weekdays and weekends across Auckland CBD?", options: { bold: true, breakLine: true, paraSpaceAfter: 10 } },
  { text: "Your notebook should include:", options: { bold: true, breakLine: true } },
  { text: "1. Data loading, cleaning, and feature extraction (Part 2.1 & 2.2)", options: { breakLine: true } },
  { text: "2. At least 3 different visualisations (Part 2.3)", options: { breakLine: true } },
  { text: "3. A written interpretation of each figure (2-3 sentences)", options: { breakLine: true } },
  { text: "4. A concluding paragraph summarising your findings", options: { breakLine: true, paraSpaceAfter: 10 } },
  { text: "Time: ~20 minutes  |  Submit as .ipynb file", options: { italic: true } },
], {
  x: 0.5, y: 1.2, w: 9, h: 4.0,
  fontFace: B_FONT, fontSize: 14, color: C.dark, valign: "top",
});

// Summary slide
let sumSlide = pres.addSlide();
sumSlide.background = { color: C.midnight };
sumSlide.addText("What You Have Learnt", {
  x: 0.8, y: 0.4, w: 8.4, h: 0.8,
  fontFace: H_FONT, fontSize: 34, color: C.white, bold: true,
});
sumSlide.addShape(pres.shapes.RECTANGLE, {
  x: 0.8, y: 1.2, w: 1.5, h: 0.05, fill: { color: C.coral },
});

const takeaways = [
  ["2.1", "Python foundations: variables, lists, loops, conditionals applied to real sensor data"],
  ["2.2", "Pandas DataFrames: reading CSV files, filtering, grouping, reshaping, and handling missing data"],
  ["2.3", "Data visualisation: line plots, bar charts, heatmaps, and multi-panel figures with matplotlib and seaborn"],
];

takeaways.forEach((t, i) => {
  let ty = 1.6 + i * 1.1;
  sumSlide.addText(t[0], {
    x: 0.8, y: ty, w: 1, h: 0.5,
    fontFace: H_FONT, fontSize: 22, color: C.coral, bold: true,
  });
  sumSlide.addText(t[1], {
    x: 1.9, y: ty, w: 7.3, h: 0.7,
    fontFace: B_FONT, fontSize: 15, color: "CBD5E1", valign: "top",
  });
});

sumSlide.addText("Next: Section 2.4 introduces GeoPandas for spatial analysis, building directly on these DataFrame skills.", {
  x: 0.8, y: 4.8, w: 8.4, h: 0.5,
  fontFace: B_FONT, fontSize: 13, color: "94A3B8", italic: true,
});

// Write file
pres.writeFile({ fileName: "/sessions/determined-happy-feynman/mnt/book/GISCI343-Lab-Exercise.pptx" })
  .then(() => console.log("Lab exercise PPTX created successfully"))
  .catch(err => console.error(err));
