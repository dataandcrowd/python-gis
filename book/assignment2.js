const pptxgen = require("pptxgenjs");

let pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "Hyesop Shin";
pres.title = "GISCI343 Assignment 2 - Auckland Footfall Analytics";

// Colour palette - Teal Trust (matches course theme)
const C = {
  teal: "028090",
  seafoam: "00A896",
  mint: "02C39A",
  dark: "1A1A2E",
  charcoal: "2D3436",
  white: "FFFFFF",
  light: "F0F5F5",
  muted: "636E72",
  coral: "E17055",
  gold: "FDCB6E",
  navy: "0C2D48",
};

const H = "Georgia";
const B = "Calibri";

const mkShadow = () => ({ type: "outer", color: "000000", blur: 6, offset: 2, angle: 135, opacity: 0.08 });

// ===== SLIDE 1: TITLE =====
let s1 = pres.addSlide();
s1.background = { color: C.dark };
s1.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 10, h: 5.625,
  fill: { color: C.dark },
});
// Accent strip
s1.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 0.12, h: 5.625, fill: { color: C.teal },
});
s1.addText("GISCI343", {
  x: 0.8, y: 0.6, w: 5, h: 0.5,
  fontFace: B, fontSize: 16, color: C.seafoam,
});
s1.addText("Auckland Footfall\nAnalytics", {
  x: 0.8, y: 1.1, w: 8, h: 2,
  fontFace: H, fontSize: 46, color: C.white, bold: true,
});
s1.addShape(pres.shapes.RECTANGLE, {
  x: 0.8, y: 3.2, w: 2, h: 0.06, fill: { color: C.coral },
});
s1.addText("Assignment 2  |  15%", {
  x: 0.8, y: 3.5, w: 5, h: 0.5,
  fontFace: B, fontSize: 20, color: C.gold, bold: true,
});
s1.addText([
  { text: "Due: Saturday 5 April, 23:59 (Week 5)", options: { breakLine: true } },
  { text: "Individual Assignment" },
], {
  x: 0.8, y: 4.2, w: 8, h: 0.8,
  fontFace: B, fontSize: 14, color: "B2BEC3",
});

// ===== SLIDE 2: WHY THIS MATTERS =====
let s2 = pres.addSlide();
s2.background = { color: C.white };
s2.addText("Why This Assignment Matters", {
  x: 0.5, y: 0.3, w: 9, h: 0.7,
  fontFace: H, fontSize: 30, color: C.dark, bold: true, margin: 0,
});

// Two-column layout
s2.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: 1.2, w: 4.3, h: 3.8, fill: { color: C.light }, shadow: mkShadow(),
});
s2.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: 1.2, w: 4.3, h: 0.07, fill: { color: C.teal },
});
s2.addText("The Data Story", {
  x: 0.7, y: 1.4, w: 3.9, h: 0.5,
  fontFace: H, fontSize: 18, color: C.teal, bold: true,
});
s2.addText("Auckland's Heart of the City collects hourly pedestrian counts from 21 sensors across the CBD. This data captures how people move through urban spaces. Understanding these patterns matters for transport planning, retail strategy, and urban design.", {
  x: 0.7, y: 1.9, w: 3.9, h: 2.8,
  fontFace: B, fontSize: 13, color: C.charcoal, valign: "top",
});

s2.addShape(pres.shapes.RECTANGLE, {
  x: 5.2, y: 1.2, w: 4.3, h: 3.8, fill: { color: C.light }, shadow: mkShadow(),
});
s2.addShape(pres.shapes.RECTANGLE, {
  x: 5.2, y: 1.2, w: 4.3, h: 0.07, fill: { color: C.coral },
});
s2.addText("Your Task", {
  x: 5.4, y: 1.4, w: 3.9, h: 0.5,
  fontFace: H, fontSize: 18, color: C.coral, bold: true,
});
s2.addText("You will analyse this real-world dataset using Python, enrich it with external APIs, create compelling visualisations, and publish your findings as a public Substack blog post. This is not about how much code you can write. It is about communicating data insights clearly to a public audience.", {
  x: 5.4, y: 1.9, w: 3.9, h: 2.8,
  fontFace: B, fontSize: 13, color: C.charcoal, valign: "top",
});

// ===== SLIDE 3: ASSESSMENT OVERVIEW =====
let s3 = pres.addSlide();
s3.background = { color: C.light };
s3.addText("Assessment Overview (15%)", {
  x: 0.5, y: 0.3, w: 9, h: 0.7,
  fontFace: H, fontSize: 28, color: C.dark, bold: true, margin: 0,
});

const parts = [
  { label: "A", title: "Data Import\n& Cleaning", pct: "2%", color: C.teal },
  { label: "B", title: "Functions", pct: "3%", color: C.seafoam },
  { label: "C", title: "API\nIntegration", pct: "3%", color: C.mint },
  { label: "D", title: "Visualisations", pct: "4%", color: C.coral },
  { label: "E", title: "Substack\nBlog Report", pct: "3%", color: C.gold },
];

parts.forEach((p, i) => {
  let cx = 0.5 + i * 1.85;
  s3.addShape(pres.shapes.RECTANGLE, {
    x: cx, y: 1.2, w: 1.65, h: 3.6, fill: { color: C.white }, shadow: mkShadow(),
  });
  s3.addShape(pres.shapes.RECTANGLE, {
    x: cx, y: 1.2, w: 1.65, h: 0.07, fill: { color: p.color },
  });
  // Part letter in circle
  s3.addShape(pres.shapes.OVAL, {
    x: cx + 0.52, y: 1.45, w: 0.6, h: 0.6, fill: { color: p.color },
  });
  s3.addText(p.label, {
    x: cx + 0.52, y: 1.45, w: 0.6, h: 0.6,
    fontFace: H, fontSize: 20, color: C.white, bold: true,
    align: "center", valign: "middle", margin: 0,
  });
  s3.addText(p.title, {
    x: cx + 0.1, y: 2.2, w: 1.45, h: 0.9,
    fontFace: B, fontSize: 13, color: C.dark, bold: true, align: "center",
  });
  s3.addText(p.pct, {
    x: cx + 0.1, y: 3.2, w: 1.45, h: 0.6,
    fontFace: H, fontSize: 28, color: p.color, bold: true, align: "center",
  });
});

s3.addText("Total: 15%  |  Due: Saturday 5 April, 23:59 (Week 5)", {
  x: 0.5, y: 5.0, w: 9, h: 0.4,
  fontFace: B, fontSize: 13, color: C.muted, align: "center",
});

// ===== SLIDE 4: PART A =====
let s4 = pres.addSlide();
s4.background = { color: C.white };
s4.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 0.12, h: 5.625, fill: { color: C.teal },
});
s4.addShape(pres.shapes.OVAL, {
  x: 0.5, y: 0.3, w: 0.6, h: 0.6, fill: { color: C.teal },
});
s4.addText("A", {
  x: 0.5, y: 0.3, w: 0.6, h: 0.6,
  fontFace: H, fontSize: 22, color: C.white, bold: true,
  align: "center", valign: "middle", margin: 0,
});
s4.addText("Data Import and Cleaning (2%)", {
  x: 1.3, y: 0.3, w: 8, h: 0.6,
  fontFace: H, fontSize: 24, color: C.dark, bold: true, valign: "middle", margin: 0,
});

s4.addText([
  { text: "Download the pedestrian count CSV from Canvas (or from the Heart of the City website)", options: { bullet: true, breakLine: true } },
  { text: "Load the data using pandas and explore its structure", options: { bullet: true, breakLine: true } },
  { text: "Handle missing values with a documented strategy", options: { bullet: true, breakLine: true } },
  { text: "Create temporal features (month, day of week, hour) from Date and Time columns", options: { bullet: true, breakLine: true } },
  { text: "Rename any columns with errors (e.g., typos in sensor names)", options: { bullet: true, breakLine: true } },
  { text: "Reshape data as needed (wide to long format)", options: { bullet: true } },
], {
  x: 0.5, y: 1.2, w: 5.5, h: 3.5,
  fontFace: B, fontSize: 14, color: C.charcoal, valign: "top", paraSpaceAfter: 6,
});

// Code hint box
s4.addShape(pres.shapes.RECTANGLE, {
  x: 6.3, y: 1.2, w: 3.3, h: 2.5, fill: { color: C.dark },
});
s4.addText(`import pandas as pd

ped = pd.read_csv(
  "akl_ped-2024.csv"
)
ped["Date"] = pd.to_datetime(
  ped["Date"]
)
ped["month"] = \\
  ped["Date"].dt.month
ped["hour"] = ped["Time"] \\
  .str.split(":") \\
  .str[0].astype(int)`, {
  x: 6.45, y: 1.3, w: 3.0, h: 2.3,
  fontFace: "Consolas", fontSize: 10, color: "E2E8F0", valign: "top",
});

s4.addText("Data source: hotcity.co.nz/city-centre/results-and-statistics/pedestrian-counts", {
  x: 0.5, y: 5.0, w: 9, h: 0.4,
  fontFace: B, fontSize: 10, color: C.muted, italic: true,
});

// ===== SLIDE 5: PART B =====
let s5 = pres.addSlide();
s5.background = { color: C.white };
s5.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 0.12, h: 5.625, fill: { color: C.seafoam },
});
s5.addShape(pres.shapes.OVAL, {
  x: 0.5, y: 0.3, w: 0.6, h: 0.6, fill: { color: C.seafoam },
});
s5.addText("B", {
  x: 0.5, y: 0.3, w: 0.6, h: 0.6,
  fontFace: H, fontSize: 22, color: C.white, bold: true,
  align: "center", valign: "middle", margin: 0,
});
s5.addText("Functions (3%)", {
  x: 1.3, y: 0.3, w: 8, h: 0.6,
  fontFace: H, fontSize: 24, color: C.dark, bold: true, valign: "middle", margin: 0,
});

s5.addText([
  { text: "Write at least two reusable Python functions that support your analysis", options: { bullet: true, breakLine: true } },
  { text: "Functions should accept parameters and return values (not just print)", options: { bullet: true, breakLine: true } },
  { text: "Include docstrings explaining what each function does", options: { bullet: true, breakLine: true } },
  { text: "Demonstrate calling each function with different inputs", options: { bullet: true } },
], {
  x: 0.5, y: 1.2, w: 5.5, h: 2.5,
  fontFace: B, fontSize: 14, color: C.charcoal, valign: "top", paraSpaceAfter: 6,
});

// Example box
s5.addShape(pres.shapes.RECTANGLE, {
  x: 6.3, y: 1.2, w: 3.3, h: 3.2, fill: { color: C.dark },
});
s5.addText(`def hourly_summary(df, location):
    """Return mean, max,
    and peak hour for a
    given sensor location."""
    series = df[location]
    return {
        "mean": series.mean(),
        "max": series.max(),
        "peak_hour": df.loc[
          series.idxmax(),
          "hour"
        ]
    }

stats = hourly_summary(
  ped, "45 Queen Street"
)`, {
  x: 6.45, y: 1.3, w: 3.0, h: 3.0,
  fontFace: "Consolas", fontSize: 10, color: "E2E8F0", valign: "top",
});

s5.addText("Ideas: a filtering function, a plotting function, a data cleaning function, a statistics summary function", {
  x: 0.5, y: 4.5, w: 9, h: 0.4,
  fontFace: B, fontSize: 12, color: C.muted, italic: true,
});

// ===== SLIDE 6: PART C =====
let s6 = pres.addSlide();
s6.background = { color: C.white };
s6.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 0.12, h: 5.625, fill: { color: C.mint },
});
s6.addShape(pres.shapes.OVAL, {
  x: 0.5, y: 0.3, w: 0.6, h: 0.6, fill: { color: C.mint },
});
s6.addText("C", {
  x: 0.5, y: 0.3, w: 0.6, h: 0.6,
  fontFace: H, fontSize: 22, color: C.white, bold: true,
  align: "center", valign: "middle", margin: 0,
});
s6.addText("API Integration (3%)", {
  x: 1.3, y: 0.3, w: 8, h: 0.6,
  fontFace: H, fontSize: 24, color: C.dark, bold: true, valign: "middle", margin: 0,
});

s6.addText([
  { text: "Integrate at least one external data source via an API", options: { bullet: true, breakLine: true } },
  { text: "Merge the external data with your pedestrian counts", options: { bullet: true, breakLine: true } },
  { text: "Use the combined data in your analysis or visualisation", options: { bullet: true, breakLine: true } },
  { text: "Document the API source and what it adds to your analysis", options: { bullet: true } },
], {
  x: 0.5, y: 1.2, w: 5.5, h: 2.5,
  fontFace: B, fontSize: 14, color: C.charcoal, valign: "top", paraSpaceAfter: 6,
});

// API suggestions
s6.addText("Suggested APIs:", {
  x: 0.5, y: 3.8, w: 2, h: 0.4,
  fontFace: B, fontSize: 14, color: C.dark, bold: true,
});

const apis = [
  { name: "Weather API", desc: "Temperature, rainfall, wind", color: C.teal },
  { name: "Stats NZ", desc: "Census, population data", color: C.seafoam },
  { name: "LINZ", desc: "Spatial boundaries, parcels", color: C.mint },
  { name: "AT / GTFS", desc: "Public transport schedules", color: C.coral },
];

apis.forEach((api, i) => {
  let cx = 0.5 + i * 2.35;
  s6.addShape(pres.shapes.RECTANGLE, {
    x: cx, y: 4.3, w: 2.2, h: 0.9, fill: { color: C.light }, shadow: mkShadow(),
  });
  s6.addShape(pres.shapes.RECTANGLE, {
    x: cx, y: 4.3, w: 2.2, h: 0.06, fill: { color: api.color },
  });
  s6.addText(api.name, {
    x: cx + 0.1, y: 4.4, w: 2.0, h: 0.35,
    fontFace: B, fontSize: 12, color: C.dark, bold: true,
  });
  s6.addText(api.desc, {
    x: cx + 0.1, y: 4.75, w: 2.0, h: 0.35,
    fontFace: B, fontSize: 10, color: C.muted,
  });
});

// ===== SLIDE 7: PART D =====
let s7 = pres.addSlide();
s7.background = { color: C.white };
s7.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 0.12, h: 5.625, fill: { color: C.coral },
});
s7.addShape(pres.shapes.OVAL, {
  x: 0.5, y: 0.3, w: 0.6, h: 0.6, fill: { color: C.coral },
});
s7.addText("D", {
  x: 0.5, y: 0.3, w: 0.6, h: 0.6,
  fontFace: H, fontSize: 22, color: C.white, bold: true,
  align: "center", valign: "middle", margin: 0,
});
s7.addText("Visualisations (4%)", {
  x: 1.3, y: 0.3, w: 8, h: 0.6,
  fontFace: H, fontSize: 24, color: C.dark, bold: true, valign: "middle", margin: 0,
});

s7.addText([
  { text: "Create at least four distinct visualisations", options: { bullet: true, breakLine: true } },
  { text: "Each visualisation should reveal a different pattern or insight", options: { bullet: true, breakLine: true } },
  { text: "Use appropriate chart types (line, bar, heatmap, scatter, map, etc.)", options: { bullet: true, breakLine: true } },
  { text: "Include clear titles, axis labels, and legends", options: { bullet: true, breakLine: true } },
  { text: "At least one visualisation should use the API data from Part C", options: { bullet: true, breakLine: true } },
  { text: "Optional bonus: include a Folium interactive map", options: { bullet: true } },
], {
  x: 0.5, y: 1.2, w: 5.5, h: 3.5,
  fontFace: B, fontSize: 14, color: C.charcoal, valign: "top", paraSpaceAfter: 6,
});

// Visual suggestions
s7.addShape(pres.shapes.RECTANGLE, {
  x: 6.3, y: 1.2, w: 3.3, h: 3.5, fill: { color: C.light }, shadow: mkShadow(),
});
s7.addText("Ideas", {
  x: 6.5, y: 1.3, w: 3, h: 0.4,
  fontFace: H, fontSize: 16, color: C.coral, bold: true,
});
s7.addText([
  { text: "Time series of daily totals", options: { bullet: true, breakLine: true } },
  { text: "Heatmap: hour vs day of week", options: { bullet: true, breakLine: true } },
  { text: "Bar chart comparing locations", options: { bullet: true, breakLine: true } },
  { text: "Weekday vs weekend profiles", options: { bullet: true, breakLine: true } },
  { text: "Scatter: count vs temperature", options: { bullet: true, breakLine: true } },
  { text: "Monthly box plots", options: { bullet: true, breakLine: true } },
  { text: "Folium map of sensor locations", options: { bullet: true } },
], {
  x: 6.5, y: 1.7, w: 3, h: 2.8,
  fontFace: B, fontSize: 12, color: C.charcoal, valign: "top", paraSpaceAfter: 4,
});

// ===== SLIDE 8: PART E =====
let s8 = pres.addSlide();
s8.background = { color: C.white };
s8.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 0.12, h: 5.625, fill: { color: C.gold },
});
s8.addShape(pres.shapes.OVAL, {
  x: 0.5, y: 0.3, w: 0.6, h: 0.6, fill: { color: C.gold },
});
s8.addText("E", {
  x: 0.5, y: 0.3, w: 0.6, h: 0.6,
  fontFace: H, fontSize: 22, color: C.dark, bold: true,
  align: "center", valign: "middle", margin: 0,
});
s8.addText("Public Blog Report on Substack (3%)", {
  x: 1.3, y: 0.3, w: 8, h: 0.6,
  fontFace: H, fontSize: 24, color: C.dark, bold: true, valign: "middle", margin: 0,
});

s8.addText([
  { text: "Write a public-facing blog post on Substack summarising your analysis", options: { bullet: true, breakLine: true } },
  { text: "Write for a general audience, not just your lecturer", options: { bullet: true, breakLine: true } },
  { text: "Use an engaging title (not dry academic language)", options: { bullet: true, breakLine: true } },
  { text: "Embed your best 2-3 visualisations directly in the post", options: { bullet: true, breakLine: true } },
  { text: "Explain what the data shows and why it matters for Auckland", options: { bullet: true, breakLine: true } },
  { text: "Keep it readable: short paragraphs, clear headings, plain English", options: { bullet: true } },
], {
  x: 0.5, y: 1.2, w: 5.5, h: 3.5,
  fontFace: B, fontSize: 14, color: C.charcoal, valign: "top", paraSpaceAfter: 6,
});

// Title examples
s8.addShape(pres.shapes.RECTANGLE, {
  x: 6.3, y: 1.2, w: 3.3, h: 2.5, fill: { color: C.light }, shadow: mkShadow(),
});
s8.addText("Example Titles", {
  x: 6.5, y: 1.3, w: 3, h: 0.4,
  fontFace: H, fontSize: 14, color: C.gold, bold: true,
});
s8.addText([
  { text: "\"Where does Auckland actually walk?\"", options: { italic: true, breakLine: true, paraSpaceAfter: 6 } },
  { text: "\"Lunchtime on Queen Street: a data story\"", options: { italic: true, breakLine: true, paraSpaceAfter: 6 } },
  { text: "\"Rain or shine: do Aucklanders still walk?\"", options: { italic: true } },
], {
  x: 6.5, y: 1.7, w: 3, h: 1.8,
  fontFace: B, fontSize: 12, color: C.charcoal, valign: "top",
});

// ===== SLIDE 9: HOW TO SET UP SUBSTACK =====
let s9 = pres.addSlide();
s9.background = { color: C.light };
s9.addText("How to Set Up Substack", {
  x: 0.5, y: 0.3, w: 9, h: 0.7,
  fontFace: H, fontSize: 28, color: C.dark, bold: true, margin: 0,
});

const steps = [
  { num: "1", title: "Create an account", desc: "Go to substack.com and sign up with your university email. Choose a publication name related to your topic." },
  { num: "2", title: "Start a new post", desc: "Click \"New post\" from your dashboard. Choose the free post option. You do not need to set up a paid subscription." },
  { num: "3", title: "Write your blog", desc: "Use the rich text editor. Add headings, bold text, and paragraphs. Paste your visualisations as images directly into the post." },
  { num: "4", title: "Add images", desc: "Export your matplotlib/seaborn figures as PNG (plt.savefig). Drag and drop or upload them into your Substack post." },
  { num: "5", title: "Publish", desc: "Click \"Publish\" and choose \"Everyone\" so the post is publicly accessible. Copy the URL for your submission." },
];

steps.forEach((st, i) => {
  let sy = 1.1 + i * 0.85;
  s9.addShape(pres.shapes.OVAL, {
    x: 0.5, y: sy, w: 0.45, h: 0.45, fill: { color: C.teal },
  });
  s9.addText(st.num, {
    x: 0.5, y: sy, w: 0.45, h: 0.45,
    fontFace: H, fontSize: 16, color: C.white, bold: true,
    align: "center", valign: "middle", margin: 0,
  });
  s9.addText(st.title, {
    x: 1.1, y: sy, w: 2, h: 0.45,
    fontFace: B, fontSize: 14, color: C.dark, bold: true, valign: "middle",
  });
  s9.addText(st.desc, {
    x: 3.2, y: sy, w: 6.3, h: 0.55,
    fontFace: B, fontSize: 12, color: C.charcoal, valign: "top",
  });
});

// ===== SLIDE 10: SUBMISSION =====
let s10 = pres.addSlide();
s10.background = { color: C.white };
s10.addText("What to Submit on Canvas", {
  x: 0.5, y: 0.3, w: 9, h: 0.7,
  fontFace: H, fontSize: 28, color: C.dark, bold: true, margin: 0,
});

const submissions = [
  { num: "1", title: "Substack Link", desc: "The public URL of your published Substack blog post. Make sure it is accessible without login.", color: C.teal },
  { num: "2", title: "PDF Copy", desc: "A PDF export of your blog post (File > Print > Save as PDF from your browser). This is a backup in case the link breaks.", color: C.seafoam },
  { num: "3", title: "GitHub Repository", desc: "A public or university-shared GitHub repo containing your Jupyter notebook (.ipynb), the CSV data file, and a README explaining how to run your code.", color: C.mint },
];

submissions.forEach((sub, i) => {
  let sy = 1.2 + i * 1.3;
  s10.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: sy, w: 9, h: 1.1, fill: { color: C.light }, shadow: mkShadow(),
  });
  s10.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: sy, w: 0.08, h: 1.1, fill: { color: sub.color },
  });
  s10.addShape(pres.shapes.OVAL, {
    x: 0.8, y: sy + 0.2, w: 0.5, h: 0.5, fill: { color: sub.color },
  });
  s10.addText(sub.num, {
    x: 0.8, y: sy + 0.2, w: 0.5, h: 0.5,
    fontFace: H, fontSize: 18, color: C.white, bold: true,
    align: "center", valign: "middle", margin: 0,
  });
  s10.addText(sub.title, {
    x: 1.5, y: sy + 0.1, w: 3, h: 0.4,
    fontFace: B, fontSize: 16, color: C.dark, bold: true,
  });
  s10.addText(sub.desc, {
    x: 1.5, y: sy + 0.5, w: 7.8, h: 0.5,
    fontFace: B, fontSize: 12, color: C.muted,
  });
});

s10.addText("Submit all three items via Canvas by Saturday 5 April, 23:59", {
  x: 0.5, y: 5.0, w: 9, h: 0.4,
  fontFace: B, fontSize: 13, color: C.coral, bold: true, align: "center",
});

// ===== SLIDE 11: MARKING RUBRIC =====
let s11 = pres.addSlide();
s11.background = { color: C.white };
s11.addText("Marking Rubric", {
  x: 0.5, y: 0.3, w: 9, h: 0.6,
  fontFace: H, fontSize: 28, color: C.dark, bold: true, margin: 0,
});

const rubric = [
  ["Part", "Weight", "Excellent", "Needs Work"],
  ["A: Data Import", "2%", "Clean pipeline, documented strategy", "Data loaded but not cleaned"],
  ["B: Functions", "3%", "Reusable, documented, well-tested", "No functions or only print()"],
  ["C: API Integration", "3%", "Meaningful enrichment, merged well", "API called but not integrated"],
  ["D: Visualisations", "4%", "4+ clear, varied, insightful plots", "Few plots, no labels, repetitive"],
  ["E: Blog Report", "3%", "Engaging, clear, public-friendly", "Technical dump, hard to follow"],
];

let tableRows = rubric.map((row, ri) => {
  return row.map((cell, ci) => ({
    text: cell,
    options: {
      fill: ri === 0 ? { color: C.dark } : (ri % 2 === 0 ? { color: C.light } : { color: C.white }),
      color: ri === 0 ? C.white : C.charcoal,
      bold: ri === 0 || ci === 0,
      fontSize: 11,
      fontFace: B,
    },
  }));
});

s11.addTable(tableRows, {
  x: 0.5, y: 1.0, w: 9, h: 3.5,
  colW: [1.8, 0.9, 3.2, 3.1],
  border: { pt: 0.5, color: "DEE2E6" },
  autoPage: false,
});

// ===== SLIDE 12: TIPS =====
let s12 = pres.addSlide();
s12.background = { color: C.light };
s12.addText("Tips for a Great Submission", {
  x: 0.5, y: 0.3, w: 9, h: 0.6,
  fontFace: H, fontSize: 28, color: C.dark, bold: true, margin: 0,
});

const tips = [
  { title: "Start early", desc: "The API integration and Substack post take longer than you expect. Do not leave everything to the last weekend." },
  { title: "Tell a story", desc: "Your blog should have a narrative arc: What question are you asking? What did you find? Why does it matter for Auckland?" },
  { title: "Quality over quantity", desc: "Four excellent, well-labelled visualisations beat ten messy ones. Each figure should have a clear purpose." },
  { title: "Use your lab skills", desc: "The lab exercise covers everything you need for Parts A and D. Revisit those tasks before you start the assignment." },
  { title: "Cite your sources", desc: "Mention Heart of the City as your data source. Credit any API you use. Link to relevant context about Auckland." },
];

tips.forEach((tip, i) => {
  let ty = 1.1 + i * 0.85;
  s12.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: ty, w: 9, h: 0.7, fill: { color: C.white }, shadow: mkShadow(),
  });
  s12.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: ty, w: 0.07, h: 0.7, fill: { color: C.teal },
  });
  s12.addText(tip.title, {
    x: 0.8, y: ty + 0.02, w: 2, h: 0.35,
    fontFace: B, fontSize: 13, color: C.dark, bold: true,
  });
  s12.addText(tip.desc, {
    x: 0.8, y: ty + 0.35, w: 8.5, h: 0.32,
    fontFace: B, fontSize: 11, color: C.muted,
  });
});

// ===== SLIDE 13: TIMELINE =====
let s13 = pres.addSlide();
s13.background = { color: C.white };
s13.addText("Suggested Timeline", {
  x: 0.5, y: 0.3, w: 9, h: 0.6,
  fontFace: H, fontSize: 28, color: C.dark, bold: true, margin: 0,
});

const timeline = [
  { week: "Week 3", task: "Complete Part A (data import, cleaning, features). Start exploring the data.", color: C.teal },
  { week: "Week 4", task: "Complete Parts B and C (functions, API). Begin visualisations for Part D.", color: C.seafoam },
  { week: "Week 5", task: "Finish Part D (visualisations). Write and publish Part E (Substack blog). Submit by 5 April.", color: C.coral },
];

timeline.forEach((t, i) => {
  let ty = 1.2 + i * 1.3;
  // Connector line
  if (i < timeline.length - 1) {
    s13.addShape(pres.shapes.RECTANGLE, {
      x: 1.45, y: ty + 0.7, w: 0.04, h: 0.6, fill: { color: "DEE2E6" },
    });
  }
  s13.addShape(pres.shapes.OVAL, {
    x: 1.05, y: ty + 0.1, w: 0.8, h: 0.55, fill: { color: t.color },
  });
  s13.addText(t.week, {
    x: 1.05, y: ty + 0.1, w: 0.8, h: 0.55,
    fontFace: B, fontSize: 10, color: C.white, bold: true,
    align: "center", valign: "middle", margin: 0,
  });
  s13.addText(t.task, {
    x: 2.2, y: ty, w: 7.2, h: 0.7,
    fontFace: B, fontSize: 14, color: C.charcoal, valign: "middle",
  });
});

// ===== SLIDE 14: QUESTIONS =====
let s14 = pres.addSlide();
s14.background = { color: C.dark };
s14.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 0.12, h: 5.625, fill: { color: C.teal },
});
s14.addText("Questions?", {
  x: 0.8, y: 1.5, w: 8, h: 1.2,
  fontFace: H, fontSize: 44, color: C.white, bold: true,
});
s14.addShape(pres.shapes.RECTANGLE, {
  x: 0.8, y: 2.8, w: 2, h: 0.06, fill: { color: C.coral },
});
s14.addText([
  { text: "hyesop.shin@auckland.ac.nz", options: { breakLine: true } },
  { text: "Office hours: see Canvas for times", options: { breakLine: true } },
  { text: "Due: Saturday 5 April, 23:59 (Week 5)" },
], {
  x: 0.8, y: 3.2, w: 8, h: 1.5,
  fontFace: B, fontSize: 16, color: "B2BEC3",
});

// Write file
pres.writeFile({ fileName: "/sessions/determined-happy-feynman/mnt/book/GISCI343-Assignment-2.pptx" })
  .then(() => console.log("Assignment PPTX created successfully"))
  .catch(err => console.error(err));
