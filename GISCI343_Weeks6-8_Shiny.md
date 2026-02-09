# GISCI 343: Interactive Web Applications with Shiny
## Weeks 6–8: PyShiny for GIS Applications
### University of Auckland | Dr Hyesop Shin

---

# Week 6: Introduction to Shiny & Auckland Congestion Charging Explorer

## Lecture Notes

### 6.1 What is Shiny?

Shiny is a reactive web framework that allows you to build interactive web applications without needing to learn JavaScript or HTML (though you can use those skills if you wish). Originally developed for R, **PyShiny** brings this powerful framework to Python, making it accessible to Python developers in GIS and data science.

**Why use Shiny?**
- Build interactive data dashboards quickly in pure Python
- Reactive programming: outputs automatically update when inputs change
- Perfect for exploratory spatial data analysis
- No frontend coding required – focus on your GIS logic
- Deploy easily to the web

**Key Concept: Reactivity**
In Shiny, you define relationships between inputs and outputs. When a user changes an input (e.g., selects a zone from a dropdown), the app automatically recalculates any outputs that depend on that input. This is called "reactive programming."

### 6.2 Installing PyShiny

PyShiny requires Python 3.8+. Install it using pip:

```bash
pip install shiny
pip install pandas numpy matplotlib folium plotly
```

For this course, we also recommend:
```bash
pip install geopandas shapely
```

Verify installation:
```python
from shiny import App, ui, render
print("PyShiny installed successfully!")
```

### 6.3 Basic Shiny App Structure

Every Shiny app has two main components:

1. **app_ui** – Defines the user interface (buttons, sliders, tables, maps)
2. **server** – Contains the logic that responds to user actions

Here's a minimal example:

```python
from shiny import App, ui, render

# Define the UI
app_ui = ui.page_sidebar(
    ui.sidebar(
        ui.input_text("name", "Enter your name:"),
    ),
    ui.panel_main(
        ui.output_text("greeting"),
    ),
)

# Define the server logic
def server(input, output, session):
    @output
    @render.text
    def greeting():
        return f"Hello, {input.name()}!"

# Create and run the app
app = App(app_ui, server)
```

**To run this app:**
```bash
shiny run app.py
```

Then open your browser to `http://localhost:8000`.

### 6.4 Core Concepts: Inputs, Outputs, and Reactivity

#### Inputs
Inputs are UI elements that capture user interaction. Common ones:

- `ui.input_text(id, label)` – Text box
- `ui.input_slider(id, label, min, max, value)` – Slider
- `ui.input_select(id, label, choices)` – Dropdown menu
- `ui.input_checkbox(id, label)` – Checkbox
- `ui.input_date(id, label)` – Date picker
- `ui.input_numeric(id, label, value)` – Number input

Access input values in the server using `input.id()` (note the parentheses – it's a function call).

#### Outputs
Outputs are placeholders in the UI that display results. Common ones:

- `ui.output_text()` – Plain text
- `ui.output_plot()` – Matplotlib/Plotly plots
- `ui.output_table()` – Data tables
- `ui.output_ui()` – Dynamic HTML

Produce output using decorators like `@render.text`, `@render.plot`, `@render.table`.

#### Reactivity in Action

```python
from shiny import App, ui, render

app_ui = ui.page_sidebar(
    ui.sidebar(
        ui.input_slider("count", "How many items?", min=1, max=10, value=5),
    ),
    ui.panel_main(
        ui.output_text("result"),
        ui.output_plot("plot"),
    ),
)

def server(input, output, session):
    @output
    @render.text
    def result():
        n = input.count()
        return f"You selected {n} items."

    @output
    @render.plot
    def plot():
        import matplotlib.pyplot as plt
        n = input.count()
        plt.bar(range(n), range(1, n+1))
        plt.xlabel("Item")
        plt.ylabel("Value")
        return plt.gcf()

app = App(app_ui, server)
```

When you move the slider, both the text and plot update instantly.

### 6.5 UI Components Deep Dive

#### Layout Components

**`ui.page_sidebar()`** – Creates a two-column layout with sidebar and main panel:
```python
app_ui = ui.page_sidebar(
    ui.sidebar(
        ui.input_slider("x", "Value:", 0, 100, 50),
    ),
    ui.panel_main(
        ui.output_plot("plot"),
    ),
)
```

**`ui.navset_tab()`** – Creates tabbed interface:
```python
app_ui = ui.page_sidebar(
    ui.sidebar(...),
    ui.panel_main(
        ui.navset_tab(
            ui.nav("Tab 1", ui.output_plot("plot1")),
            ui.nav("Tab 2", ui.output_table("table1")),
        ),
    ),
)
```

**`ui.panel_well()`** – Adds a visual container with light background:
```python
ui.panel_well(
    ui.p("This text is inside a well panel."),
)
```

#### Input Components

```python
# Dropdown menu
ui.input_select(
    "zone",
    "Select congestion zone:",
    choices={"zone1": "Zone 1 (CBD)", "zone2": "Zone 2 (Ponsonby)"}
)

# Radio buttons
ui.input_radio_buttons(
    "period",
    "Peak period:",
    choices={"morning": "7–9 AM", "evening": "5–7 PM"}
)

# Checkbox
ui.input_checkbox("show_details", "Show detailed statistics")

# Slider
ui.input_slider(
    "hour",
    "Hour of day:",
    min=0,
    max=23,
    value=8,
    step=1
)

# Date range picker
ui.input_date_range(
    "dates",
    "Select date range:",
    start="2024-01-01",
    end="2024-01-31"
)
```

#### Output Components

```python
# Text output
ui.output_text("greeting")

# Plot output (for matplotlib, plotly)
ui.output_plot("traffic_chart")

# Table output
ui.output_table("zone_table")

# Dynamic HTML (for embedding maps, custom HTML)
ui.output_ui("map_container")
```

### 6.6 Auckland Congestion Charging Context

#### What is Congestion Charging?

Congestion charging is a demand-management transport policy where drivers pay a fee to use certain roads during peak hours. The revenue funds public transport improvements.

**How it works:**
1. A zone is defined (usually the CBD or city centre)
2. A daily charge is applied to vehicles entering the zone during peak times
3. Certain vehicles (electric cars, buses, emergency services) may be exempt
4. Charges vary by time of day – higher during peak hours, lower off-peak

**Benefits:**
- Reduces traffic congestion
- Encourages public transport use
- Raises revenue for transport infrastructure
- Incentivises carpooling and off-peak travel

**Similar schemes globally:**
- London: £15/day (peak times)
- Singapore: Variable rates based on congestion
- Stockholm: 10–35 SEK depending on time of day

#### Auckland's Proposed Congestion Charging

Auckland Council has proposed a congestion charging zone covering approximately 600 km² of the isthmus. The proposed zones are:

| Zone | Area | Current Status |
|------|------|---|
| **Inner Zone** | CBD, Parnell, Ponsonby, Grey Lynn, Freemans Bay | Core charging zone |
| **Outer Zone** | Mt Eden, Newmarket, Remuera, Epsom, Blockhouse Bay | Ring around inner zone |

**Proposed rate structure:**
- Peak hours (7–9 AM, 4–6 PM): £3.50 per vehicle per entry
- Off-peak (9 AM–4 PM): £2.00 per vehicle per entry
- Evening/early morning: Exempt

#### Sample Congestion Data Structure

In our applications, congestion data will look like this:

```python
import pandas as pd

zones = pd.DataFrame({
    'zone_id': ['CBD', 'Ponsonby', 'Newmarket', 'Remuera'],
    'zone_name': ['Central Business District', 'Ponsonby', 'Newmarket', 'Remuera'],
    'peak_charge': [3.50, 3.50, 2.50, 2.00],
    'offpeak_charge': [2.00, 2.00, 1.50, 1.00],
    'avg_traffic_volume': [15000, 8000, 6000, 4500],
    'estimated_revenue': [52500, 28000, 15000, 9000],
})
```

---

## Week 6 Lab Exercise: Build an Auckland Congestion Charging Explorer

### Learning Objectives
1. Create a functional Shiny app from scratch
2. Implement reactive inputs and outputs
3. Visualise congestion data with charts and tables
4. Embed a map in a Shiny app
5. Style and deploy a simple application

### Exercise Duration: 2 hours

### Part A: Create Sample Data (15 minutes)

Create a file called `data.py`:

```python
import pandas as pd
import geopandas as gpd
from shapely.geometry import box

# Auckland zones with congestion charging data
zones_data = {
    'zone_id': ['CBD', 'Ponsonby', 'Newmarket', 'Remuera', 'Mt Eden', 'Epsom'],
    'zone_name': [
        'Central Business District',
        'Ponsonby',
        'Newmarket',
        'Remuera',
        'Mt Eden',
        'Epsom'
    ],
    'peak_charge': [3.50, 3.50, 2.50, 2.00, 2.50, 2.00],
    'offpeak_charge': [2.00, 2.00, 1.50, 1.00, 1.50, 1.00],
    'morning_traffic': [15000, 8000, 6000, 4500, 3500, 2800],
    'evening_traffic': [16000, 9000, 6500, 5000, 4000, 3200],
    'midday_traffic': [8000, 4000, 3000, 2200, 1800, 1500],
    'latitude': [-37.7870, -37.7780, -37.7760, -37.7710, -37.7620, -37.7700],
    'longitude': [174.7765, 174.7460, 174.7860, 174.7960, 174.7740, 174.7550],
}

zones_df = pd.DataFrame(zones_data)

# Calculate estimated daily revenue
zones_df['estimated_daily_revenue'] = (
    zones_df['morning_traffic'] * 0.7 * zones_df['peak_charge'] +
    zones_df['evening_traffic'] * 0.7 * zones_df['peak_charge'] +
    zones_df['midday_traffic'] * zones_df['offpeak_charge']
).round(2)

def get_zone_summary(zone_id):
    """Get detailed summary for a specific zone"""
    zone = zones_df[zones_df['zone_id'] == zone_id].iloc[0]
    return {
        'zone_name': zone['zone_name'],
        'peak_charge': f"£{zone['peak_charge']:.2f}",
        'offpeak_charge': f"£{zone['offpeak_charge']:.2f}",
        'morning_traffic': int(zone['morning_traffic']),
        'evening_traffic': int(zone['evening_traffic']),
        'estimated_daily_revenue': f"£{zone['estimated_daily_revenue']:,.2f}",
    }
```

### Part B: Build the Shiny App (1 hour 30 minutes)

Create a file called `congestion_app.py`:

```python
from shiny import App, ui, render, reactive
import pandas as pd
import matplotlib.pyplot as plt
import folium
import json
from data import zones_df, get_zone_summary

# Define the UI
app_ui = ui.page_sidebar(
    ui.head_content(
        ui.HTML("<title>Auckland Congestion Charging Explorer</title>")
    ),
    ui.sidebar(
        ui.h2("Filters & Controls"),
        ui.input_select(
            "zone_select",
            "Select a zone:",
            choices={row['zone_id']: row['zone_name']
                     for _, row in zones_df.iterrows()}
        ),
        ui.input_radio_buttons(
            "time_period",
            "Time period:",
            choices={
                "morning": "Morning peak (7–9 AM)",
                "midday": "Midday (9 AM–4 PM)",
                "evening": "Evening peak (4–6 PM)"
            },
            selected="morning"
        ),
        ui.input_checkbox(
            "show_revenue",
            "Show estimated revenue",
            value=True
        ),
        ui.hr(),
        ui.p(
            ui.em("This explorer displays Auckland's proposed congestion "
                  "charging zones with traffic volumes and charge rates."),
            style="font-size: 0.9em; color: #666;"
        ),
    ),
    ui.panel_main(
        ui.navset_tab(
            ui.nav(
                "Overview",
                ui.output_table("zone_table"),
                ui.br(),
                ui.h3("Charge Rates Comparison"),
                ui.output_plot("charges_plot"),
            ),
            ui.nav(
                "Zone Details",
                ui.panel_well(
                    ui.h3(ui.output_text("selected_zone_name")),
                    ui.layout_columns(
                        ui.value_box(
                            "Peak Charge",
                            ui.output_text("peak_charge_text"),
                            theme="info"
                        ),
                        ui.value_box(
                            "Off-peak Charge",
                            ui.output_text("offpeak_charge_text"),
                            theme="success"
                        ),
                        col_widths=[6, 6]
                    ),
                    ui.br(),
                    ui.output_plot("traffic_timeline"),
                ),
            ),
            ui.nav(
                "Traffic Volume",
                ui.output_plot("traffic_comparison"),
            ),
            ui.nav(
                "Map",
                ui.output_ui("zone_map"),
            ),
        ),
    ),
)

# Define server logic
def server(input, output, session):

    # Reactive: Get current zone data
    @reactive.Calc
    def current_zone():
        zone_id = input.zone_select()
        return zones_df[zones_df['zone_id'] == zone_id].iloc[0]

    # Output: Selected zone name
    @output
    @render.text
    def selected_zone_name():
        return current_zone()['zone_name']

    # Output: Peak charge text
    @output
    @render.text
    def peak_charge_text():
        return f"£{current_zone()['peak_charge']:.2f}"

    # Output: Off-peak charge text
    @output
    @render.text
    def offpeak_charge_text():
        return f"£{current_zone()['offpeak_charge']:.2f}"

    # Output: Zone table
    @output
    @render.table
    def zone_table():
        display_df = zones_df[[
            'zone_name', 'peak_charge', 'offpeak_charge',
            'morning_traffic', 'evening_traffic'
        ]].copy()
        display_df.columns = [
            'Zone', 'Peak Charge (£)', 'Off-peak Charge (£)',
            'Morning Traffic', 'Evening Traffic'
        ]
        return display_df

    # Output: Charge rates bar chart
    @output
    @render.plot
    def charges_plot():
        fig, ax = plt.subplots(figsize=(10, 5))
        zones = zones_df['zone_name'].values
        peak = zones_df['peak_charge'].values
        offpeak = zones_df['offpeak_charge'].values

        x = range(len(zones))
        width = 0.35

        ax.bar([i - width/2 for i in x], peak, width, label='Peak', color='#e74c3c')
        ax.bar([i + width/2 for i in x], offpeak, width, label='Off-peak', color='#2ecc71')

        ax.set_ylabel('Charge (£)', fontsize=11, fontweight='bold')
        ax.set_xlabel('Zone', fontsize=11, fontweight='bold')
        ax.set_title('Auckland Congestion Charging Rates by Zone', fontsize=13, fontweight='bold')
        ax.set_xticks(x)
        ax.set_xticklabels(zones, rotation=45, ha='right')
        ax.legend()
        ax.grid(axis='y', alpha=0.3)

        return fig

    # Output: Traffic timeline for selected zone
    @output
    @render.plot
    def traffic_timeline():
        zone = current_zone()
        periods = ['Morning\n(7–9 AM)', 'Midday\n(9 AM–4 PM)', 'Evening\n(4–6 PM)']
        traffic = [zone['morning_traffic'], zone['midday_traffic'], zone['evening_traffic']]
        colours = ['#e74c3c', '#f39c12', '#e74c3c']

        fig, ax = plt.subplots(figsize=(8, 5))
        bars = ax.bar(periods, traffic, colour=colours, edgecolor='black', linewidth=1.5)

        ax.set_ylabel('Traffic Volume (vehicles)', fontsize=11, fontweight='bold')
        ax.set_title(f'Traffic Pattern – {zone["zone_name"]}', fontsize=13, fontweight='bold')
        ax.grid(axis='y', alpha=0.3)

        # Add value labels on bars
        for bar, value in zip(bars, traffic):
            height = bar.get_height()
            ax.text(bar.get_x() + bar.get_width()/2., height,
                   f'{int(value):,}',
                   ha='center', va='bottom', fontweight='bold')

        return fig

    # Output: Traffic comparison across zones
    @output
    @render.plot
    def traffic_comparison():
        time_period = input.time_period()

        if time_period == 'morning':
            traffic_col = 'morning_traffic'
            title_suffix = 'Morning Peak (7–9 AM)'
        elif time_period == 'midday':
            traffic_col = 'midday_traffic'
            title_suffix = 'Midday (9 AM–4 PM)'
        else:
            traffic_col = 'evening_traffic'
            title_suffix = 'Evening Peak (4–6 PM)'

        fig, ax = plt.subplots(figsize=(10, 5))
        zones = zones_df['zone_name'].values
        traffic = zones_df[traffic_col].values

        bars = ax.barh(zones, traffic, colour='#3498db', edgecolor='black', linewidth=1)
        ax.set_xlabel('Traffic Volume (vehicles)', fontsize=11, fontweight='bold')
        ax.set_title(f'Traffic Volume – {title_suffix}', fontsize=13, fontweight='bold')
        ax.grid(axis='x', alpha=0.3)

        # Add value labels
        for bar, value in zip(bars, traffic):
            width = bar.get_width()
            ax.text(width, bar.get_y() + bar.get_height()/2.,
                   f' {int(value):,}',
                   ha='left', va='center', fontweight='bold')

        return fig

    # Output: Interactive map
    @output
    @render.ui
    def zone_map():
        # Create folium map centred on Auckland
        m = folium.Map(
            location=[-37.7770, 174.8860],
            zoom_start=12,
            tiles='OpenStreetMap'
        )

        # Add markers for each zone
        for _, zone in zones_df.iterrows():
            folium.CircleMarker(
                location=[zone['latitude'], zone['longitude']],
                radius=8,
                popup=f"{zone['zone_name']}<br>Peak: £{zone['peak_charge']}",
                color='#e74c3c' if zone['zone_id'] in ['CBD', 'Ponsonby'] else '#3498db',
                fill=True,
                fillOpacity=0.7,
                weight=2
            ).add_to(m)

        # Convert map to HTML
        map_html = m._repr_html_()
        return ui.HTML(f"""
            <div style="width: 100%; height: 500px;">
                {map_html}
            </div>
        """)

# Create and run the app
app = App(app_ui, server)
```

### Part C: Run and Test (15 minutes)

1. **Run the app:**
   ```bash
   shiny run congestion_app.py
   ```

2. **Test interactivity:**
   - Select different zones from the dropdown
   - Change time periods with radio buttons
   - Toggle the "Show revenue" checkbox
   - Click through the tabs

3. **Observe reactivity:**
   - Notice how all outputs update instantly when you change inputs
   - The map updates with zone markers
   - Charts change based on selected filters

### Part D: Extension Tasks (Optional)

**Task 1: Add Revenue Calculation**
Modify the app to display estimated daily revenue based on the formula:
```
Daily Revenue = (Morning Traffic × 70% × Peak Rate) +
                (Evening Traffic × 70% × Peak Rate) +
                (Midday Traffic × Off-peak Rate)
```

**Task 2: Filter Table**
Add a second table that shows only zones with peak charges above a user-selected threshold.

**Task 3: Summary Statistics**
Add a new tab that displays summary statistics like:
- Total traffic across all zones
- Average peak charge
- Highest revenue zone

---

# Week 7: Advanced Shiny & OD Matrix Visualisation

## Lecture Notes

### 7.1 What is an Origin-Destination (OD) Matrix?

An **Origin-Destination (OD) matrix** is a fundamental tool in transport planning. It's a table where:

- **Rows** represent origins (where trips start)
- **Columns** represent destinations (where trips end)
- **Values** represent the number of trips, average travel time, distance, or other metrics

#### Example OD Matrix: Auckland Suburb Commute Flows

|          | To CBD | To Newmarket | To Ponsonby | To Remuera |
|----------|--------|--------------|-------------|-----------|
| **From CBD** | 100 | 250 | 180 | 90 |
| **From Newmarket** | 520 | 50 | 80 | 200 |
| **From Ponsonby** | 780 | 120 | 200 | 70 |
| **From Remuera** | 650 | 240 | 90 | 150 |

**What does this tell us?**
- 520 trips go from Newmarket to CBD (likely commuters)
- 100 trips stay within CBD (internal movement)
- The matrix is asymmetrical – flows differ by direction

#### Real-World Uses of OD Matrices

1. **Transport Planning**: Identify which routes need improvement
2. **Congestion Prediction**: Understand peak hour flow patterns
3. **Public Transport Design**: Plan bus/train routes matching demand
4. **Pricing & Tolls**: Set charges based on route demand
5. **Urban Planning**: Assess whether new developments will increase traffic
6. **Accessibility Analysis**: Measure how easy it is to reach services

#### OD Matrices in Auckland Context

Auckland Council uses OD matrices to:
- Understand commute patterns across suburbs
- Plan congestion charging (zones with high incoming flow may need higher charges)
- Design public transport networks
- Evaluate major infrastructure (e.g., Eastern Transport Corridor)

Sample data might show:
- Morning peak: Strong flows from outer suburbs → CBD (inbound)
- Evening peak: Reverse flow – CBD → suburbs (outbound)
- Mid-day: More dispersed flows between suburbs

### 7.2 Reactive Programming: Deeper Dive

In Week 6, we used simple inputs and outputs. Week 7 introduces more sophisticated reactive patterns.

#### `reactive.Calc()` – Computed Values

`reactive.Calc()` creates a cached, reactive value that only recalculates when its dependencies change.

```python
from shiny import reactive

def server(input, output, session):

    # This recalculates whenever input.zone_select() changes
    @reactive.Calc
    def filtered_od_data():
        origin = input.zone_select()
        # Filter OD matrix for trips from this origin
        return od_matrix[od_matrix['origin'] == origin]

    @output
    @render.table
    def od_table():
        return filtered_od_data()
```

**Benefits:**
- If multiple outputs depend on the same filtered data, it's calculated once
- More efficient than recalculating in each output
- Cleaner code – separates data logic from rendering

#### `reactive.Effect()` – Side Effects

`reactive.Effect()` executes code when dependencies change, useful for logging, downloading, or updating external systems.

```python
@reactive.Effect
def log_zone_selection():
    selected = input.zone_select()
    print(f"User selected zone: {selected}")
    # Could also write to a file, send to API, etc.
```

#### Decorators: `@output` and `@render`

We've seen these in action, but here's the full picture:

```python
# The @output decorator tells Shiny this is an output
# The @render.plot tells Shiny what type of output to render
@output
@render.plot
def my_chart():
    # Return a matplotlib figure
    return fig

# Order matters – @output must come first
```

Common render types:
- `@render.plot` – Matplotlib/Plotly figure
- `@render.table` – Pandas DataFrame
- `@render.text` – Plain text string
- `@render.ui` – HTML/Shiny UI
- `@render.data_frame` – Interactive DataTable

#### Example: Complex Reactivity

```python
from shiny import App, ui, render, reactive
import pandas as pd

app_ui = ui.page_sidebar(
    ui.sidebar(
        ui.input_select("origin", "From:", choices=["CBD", "Ponsonby", "Newmarket"]),
        ui.input_select("destination", "To:", choices=["CBD", "Ponsonby", "Newmarket"]),
    ),
    ui.panel_main(
        ui.output_text("trip_count"),
        ui.output_plot("route_chart"),
    ),
)

# Sample OD data
od_data = pd.DataFrame({
    'origin': ['CBD', 'CBD', 'Ponsonby', 'Ponsonby', 'Newmarket', 'Newmarket'],
    'destination': ['Ponsonby', 'Newmarket', 'CBD', 'Newmarket', 'CBD', 'Ponsonby'],
    'trips': [250, 180, 780, 120, 520, 240],
    'avg_time_mins': [15, 25, 20, 18, 22, 28],
})

def server(input, output, session):

    # Reactive: Get trip count between selected zones
    @reactive.Calc
    def trip_count():
        origin = input.origin()
        destination = input.destination()
        trips = od_data[
            (od_data['origin'] == origin) &
            (od_data['destination'] == destination)
        ]['trips'].values
        return trips[0] if len(trips) > 0 else 0

    # Reactive: Get all trips from origin
    @reactive.Calc
    def origin_trips():
        origin = input.origin()
        return od_data[od_data['origin'] == origin].sort_values('trips', ascending=False)

    # Output: Trip count text
    @output
    @render.text
    def trip_count():
        count = trip_count()
        origin = input.origin()
        destination = input.destination()
        return f"{count:,} trips from {origin} to {destination} (daily)"

    # Output: Destination breakdown chart
    @output
    @render.plot
    def route_chart():
        df = origin_trips()
        fig, ax = plt.subplots(figsize=(8, 5))

        ax.barh(df['destination'], df['trips'], colour='#3498db')
        ax.set_xlabel('Number of Trips', fontweight='bold')
        ax.set_title(f'Trip Distribution from {input.origin()}', fontweight='bold')
        ax.grid(axis='x', alpha=0.3)

        return fig

app = App(app_ui, server)
```

### 7.3 Shiny Modules for Code Organisation

As your Shiny app grows, code becomes hard to manage. **Modules** let you package related inputs/outputs into reusable components.

A module is a pair of functions: `*_ui()` and `*_server()`.

```python
# File: zone_selector_module.py
from shiny import ui, render, reactive

def zone_selector_ui(id):
    """UI for the zone selector module"""
    ns = ui.namespace(id)
    return ui.panel_well(
        ui.h3("Zone Selection"),
        ui.input_select(ns("zone"), "Choose zone:",
                       choices=["CBD", "Ponsonby", "Newmarket"]),
        ui.output_text(ns("selected")),
    )

def zone_selector_server(id, zones_df):
    """Server logic for the zone selector module"""
    def module_server(input, output, session):
        @reactive.Calc
        def selected_zone():
            return zones_df[zones_df['zone_id'] == input.zone()]

        @output
        @render.text
        def selected():
            zone = selected_zone()
            return f"Selected: {zone['zone_name'].values[0]}"

        # Return reactive to share with other modules
        return selected_zone

    return module_server
```

Use modules in your main app:

```python
from zone_selector_module import zone_selector_ui, zone_selector_server

app_ui = ui.page_sidebar(
    ui.sidebar(
        zone_selector_ui("zone_mod"),
    ),
    ui.panel_main(
        ui.output_table("od_table"),
    ),
)

def server(input, output, session):
    # Initialize module
    selected_zone_reactive = zone_selector_server("zone_mod", zones_df)

    @output
    @render.table
    def od_table():
        zone = selected_zone_reactive()
        return get_od_for_zone(zone['zone_id'].values[0])

app = App(app_ui, server)
```

**Benefits:**
- Reusable components
- Easier testing
- Cleaner separation of concerns

### 7.4 Visualising OD Data

#### 1. Heatmaps

Heatmaps show the full OD matrix with colours representing trip volumes.

```python
import seaborn as sns
import matplotlib.pyplot as plt
import numpy as np

# Create OD matrix (10×10)
zones = ['CBD', 'Ponsonby', 'Newmarket', 'Remuera', 'Mt Eden',
         'Epsom', 'Freemans Bay', 'Parnell', 'Blockhouse Bay', 'Grey Lynn']

# Sample data – in reality, you'd load this from a database
np.random.seed(42)
od_matrix = np.random.randint(50, 1000, size=(len(zones), len(zones)))
np.fill_diagonal(od_matrix, np.random.randint(100, 500, len(zones)))  # Internal trips

df = pd.DataFrame(od_matrix, index=zones, columns=zones)

# Create heatmap
fig, ax = plt.subplots(figsize=(10, 8))
sns.heatmap(df, annot=True, fmt='d', cmap='YlOrRd', cbar_kws={'label': 'Trips'},
           ax=ax, linewidths=0.5)
ax.set_title('Auckland Suburb Commute Matrix (Morning Peak)', fontweight='bold', fontsize=13)
ax.set_xlabel('Destination', fontweight='bold')
ax.set_ylabel('Origin', fontweight='bold')

plt.tight_layout()
plt.show()
```

**Advantages:**
- Shows full matrix at once
- Easy to spot patterns (e.g., diagonal shows internal trips)
- Colour intensity represents magnitude

**Limitations:**
- Hard to read with many zones (10+ becomes crowded)
- Doesn't show direction clearly for asymmetrical flows

#### 2. Chord Diagrams

Chord diagrams show flow relationships as curves between zones.

For Shiny, we can use Plotly or a JavaScript library. Here's a text-based description:

**Concept:** A circular diagram with zones arranged around a circle. Chords (curved lines) connect zones, with chord thickness representing flow volume.

To implement, install a library:
```bash
pip install chord
```

```python
from chord import Chord

# Create chord data (list of [source, target, value] triplets)
flows = [
    ['CBD', 'Ponsonby', 250],
    ['CBD', 'Newmarket', 180],
    ['Ponsonby', 'CBD', 780],
    ['Ponsonby', 'Newmarket', 120],
    ['Newmarket', 'CBD', 520],
    ['Newmarket', 'Remuera', 240],
]

# Create chord diagram
c = Chord(flows, ['CBD', 'Ponsonby', 'Newmarket', 'Remuera'])
c.save_html("chord_diagram.html")
```

#### 3. Flow Maps with Folium

Flow maps show OD pairs as lines on a geographic map, with line thickness representing flow volume.

```python
import folium
from folium.plugins import AntPath
import pandas as pd

# Create base map
m = folium.Map(location=[-37.7770, 174.8860], zoom_start=12)

# Zone coordinates
zone_coords = {
    'CBD': [-37.7870, 174.7765],
    'Ponsonby': [-37.7780, 174.7460],
    'Newmarket': [-37.7760, 174.7860],
    'Remuera': [-37.7710, 174.7960],
}

# OD flows to visualize
flows = [
    {'origin': 'Ponsonby', 'destination': 'CBD', 'trips': 780},
    {'origin': 'Newmarket', 'destination': 'CBD', 'trips': 520},
    {'origin': 'Remuera', 'destination': 'CBD', 'trips': 650},
]

# Normalize flow volume for line width (max 5)
max_trips = max([f['trips'] for f in flows])

for flow in flows:
    origin_coord = zone_coords[flow['origin']]
    dest_coord = zone_coords[flow['destination']]

    # Line width proportional to flow
    width = 2 + (flow['trips'] / max_trips) * 3

    # Add line
    folium.PolyLine(
        locations=[origin_coord, dest_coord],
        weight=width,
        color='#e74c3c',
        opacity=0.7,
        popup=f"{flow['origin']} → {flow['destination']}: {flow['trips']:,} trips"
    ).add_to(m)

    # Add arrow using AntPath (animated line)
    AntPath(
        locations=[origin_coord, dest_coord],
        weight=width,
        colour='#3498db',
        opacity=0.5,
        delay=800,
    ).add_to(m)

# Add zone markers
for zone, coord in zone_coords.items():
    folium.CircleMarker(
        location=coord,
        radius=8,
        popup=zone,
        colour='#2ecc71',
        fill=True,
        fillOpacity=0.8,
    ).add_to(m)

m.save('od_flow_map.html')
```

### 7.5 Working with Larger Datasets Efficiently

When you have thousands of zone pairs, efficiency matters.

#### Data Structures

Store OD data efficiently:

```python
# Option 1: Long-format DataFrame (most flexible)
od_long = pd.DataFrame({
    'origin': ['CBD', 'CBD', 'Ponsonby', ...],
    'destination': ['Ponsonby', 'Newmarket', 'CBD', ...],
    'period': ['morning', 'morning', 'morning', ...],
    'trips': [250, 180, 780, ...],
})

# Option 2: Wide-format matrix (for mathematical operations)
od_wide = pd.pivot_table(od_long, index='origin',
                         columns='destination', values='trips')

# Option 3: Sparse matrix (for very large matrices with many zeros)
from scipy.sparse import csr_matrix
matrix_sparse = csr_matrix(od_wide.values)
```

#### Filtering Efficiently

```python
# Fast filtering with .loc[]
morning_flows = od_long.loc[od_long['period'] == 'morning']

# Chaining conditions
high_volume_morning = od_long.loc[
    (od_long['period'] == 'morning') &
    (od_long['trips'] > 500)
]

# Using .query() for complex conditions
result = od_long.query('period == "morning" and trips > 500 and origin == "CBD"')
```

#### Caching in Shiny

Use `reactive.Calc()` to cache expensive operations:

```python
@reactive.Calc
def filtered_data():
    # This expensive operation is cached
    # Only recalculates when period changes
    return od_long[od_long['period'] == input.period()].copy()
```

#### Aggregation for Visualisation

For heatmaps with many zones, aggregate related zones:

```python
# Group suburbs into larger zones
zone_grouping = {
    'CBD': 'Inner Zone',
    'Ponsonby': 'Inner Zone',
    'Newmarket': 'Outer Zone',
    'Remuera': 'Outer Zone',
}

od_aggregated = od_long.copy()
od_aggregated['origin_group'] = od_aggregated['origin'].map(zone_grouping)
od_aggregated['dest_group'] = od_aggregated['destination'].map(zone_grouping)

# Create summary matrix
summary_matrix = od_aggregated.groupby(['origin_group', 'dest_group'])['trips'].sum()
```

---

## Week 7 Lab Exercise: Build an OD Matrix Explorer for Auckland

### Learning Objectives
1. Create and understand OD matrices
2. Implement multi-input filtering with reactivity
3. Visualise OD data with heatmaps and flow maps
4. Calculate summary statistics
5. Handle tabular and geographic visualisations together

### Exercise Duration: 2 hours

### Part A: Create OD Sample Data (20 minutes)

Create a file called `od_data.py`:

```python
import pandas as pd
import numpy as np

# Define Auckland suburbs (10 zones)
zones = [
    'CBD', 'Ponsonby', 'Newmarket', 'Remuera', 'Mt Eden',
    'Epsom', 'Freemans Bay', 'Parnell', 'Blockhouse Bay', 'Grey Lynn'
]

zone_coords = {
    'CBD': [-37.7870, 174.7765],
    'Ponsonby': [-37.7780, 174.7460],
    'Newmarket': [-37.7760, 174.7860],
    'Remuera': [-37.7710, 174.7960],
    'Mt Eden': [-37.7620, 174.7740],
    'Epsom': [-37.7700, 174.7550],
    'Freemans Bay': [-37.7920, 174.7580],
    'Parnell': [-37.7820, 174.7920],
    'Blockhouse Bay': [-37.7850, 174.7200],
    'Grey Lynn': [-37.7740, 174.7360],
}

# Generate synthetic OD matrix for morning peak
np.random.seed(42)
n = len(zones)
morning_matrix = np.zeros((n, n))

# Set seeds: high flow towards CBD
for i in range(n):
    if zones[i] != 'CBD':
        # Strong flow to CBD in morning
        morning_matrix[i, 0] = np.random.randint(400, 900)
        # Some inter-suburb flows
        for j in range(1, n):
            if i != j:
                morning_matrix[i, j] = np.random.randint(50, 300)
    else:
        # CBD internal movement
        morning_matrix[i, i] = np.random.randint(100, 300)

# Evening peak: reverse flow + lateral movements
evening_matrix = np.zeros((n, n))
for i in range(n):
    for j in range(n):
        if i == j:
            evening_matrix[i, j] = np.random.randint(80, 250)
        elif zones[i] == 'CBD' and zones[j] != 'CBD':
            # Flow away from CBD
            evening_matrix[i, j] = np.random.randint(300, 700)
        else:
            evening_matrix[i, j] = np.random.randint(40, 250)

# Mid-day: lower volumes, more dispersed
midday_matrix = np.zeros((n, n))
for i in range(n):
    for j in range(n):
        midday_matrix[i, j] = np.random.randint(20, 150)

# Create DataFrames
def create_od_dataframe(matrix, period):
    data = []
    for i, origin in enumerate(zones):
        for j, dest in enumerate(zones):
            trips = int(matrix[i, j])
            if trips > 0:  # Only include flows > 0
                data.append({
                    'origin': origin,
                    'destination': dest,
                    'period': period,
                    'trips': trips,
                })
    return pd.DataFrame(data)

# Combine all periods
od_morning = create_od_dataframe(morning_matrix, 'morning')
od_midday = create_od_dataframe(midday_matrix, 'midday')
od_evening = create_od_dataframe(evening_matrix, 'evening')

od_full = pd.concat([od_morning, od_midday, od_evening], ignore_index=True)

# Create pivot tables for heatmap visualisation
def get_matrix(period):
    """Return OD matrix for a period as DataFrame"""
    df = od_full[od_full['period'] == period].copy()
    matrix = df.pivot_table(index='origin', columns='destination',
                            values='trips', fill_value=0)
    # Ensure all zones are in matrix
    for zone in zones:
        if zone not in matrix.index:
            matrix.loc[zone] = 0
        if zone not in matrix.columns:
            matrix[zone] = 0
    return matrix[zones].loc[zones]

# Summary statistics function
def get_top_routes(period, n=5):
    """Get top N routes by trip volume for a period"""
    df = od_full[od_full['period'] == period].copy()
    return df.nlargest(n, 'trips')[['origin', 'destination', 'trips']]

def get_zone_totals(period):
    """Get total trips by zone (sum of origins)"""
    df = od_full[od_full['period'] == period].copy()
    return df.groupby('origin')['trips'].sum().sort_values(ascending=False)
```

### Part B: Build the OD Matrix Explorer App (1 hour 20 minutes)

Create a file called `od_explorer_app.py`:

```python
from shiny import App, ui, render, reactive
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import folium
from od_data import od_full, zones, zone_coords, get_matrix, get_top_routes, get_zone_totals

# Define UI
app_ui = ui.page_sidebar(
    ui.head_content(
        ui.HTML("<title>Auckland OD Matrix Explorer</title>")
    ),
    ui.sidebar(
        ui.h2("OD Matrix Filters"),
        ui.input_radio_buttons(
            "period",
            "Travel period:",
            choices={
                "morning": "Morning Peak (7–9 AM)",
                "midday": "Mid-day (9 AM–4 PM)",
                "evening": "Evening Peak (4–6 PM)"
            },
            selected="morning"
        ),
        ui.input_select(
            "origin_filter",
            "Filter by origin (optional):",
            choices={"all": "All zones"} | {zone: zone for zone in zones}
        ),
        ui.input_checkbox(
            "show_stats",
            "Show detailed statistics",
            value=True
        ),
        ui.hr(),
        ui.p(
            ui.em("This explorer visualises Origin-Destination commute flows "
                  "across Auckland suburbs."),
            style="font-size: 0.9em; color: #666;"
        ),
    ),
    ui.panel_main(
        ui.navset_tab(
            ui.nav(
                "Heatmap",
                ui.panel_well(
                    ui.h3("OD Matrix Heatmap"),
                    ui.output_plot("heatmap"),
                ),
            ),
            ui.nav(
                "Statistics",
                ui.panel_well(
                    ui.h3("Top Routes"),
                    ui.output_table("top_routes_table"),
                    ui.br(),
                    ui.h3("Zone Totals (Origins)"),
                    ui.output_table("zone_totals_table"),
                ),
            ),
            ui.nav(
                "Flow Map",
                ui.output_ui("flow_map"),
            ),
            ui.nav(
                "Data Table",
                ui.output_table("od_data_table"),
            ),
        ),
    ),
)

# Server logic
def server(input, output, session):

    # Reactive: Get filtered OD data
    @reactive.Calc
    def filtered_od():
        period = input.period()
        df = od_full[od_full['period'] == period].copy()

        origin_filter = input.origin_filter()
        if origin_filter != "all":
            df = df[df['origin'] == origin_filter]

        return df

    # Reactive: Get OD matrix for heatmap
    @reactive.Calc
    def od_matrix():
        return get_matrix(input.period())

    # Output: OD heatmap
    @output
    @render.plot
    def heatmap():
        matrix = od_matrix()

        fig, ax = plt.subplots(figsize=(11, 9))
        sns.heatmap(
            matrix,
            annot=True,
            fmt='.0f',
            cmap='YlOrRd',
            cbar_kws={'label': 'Number of Trips'},
            ax=ax,
            linewidths=0.5,
            linecolor='grey'
        )

        period_label = {
            'morning': 'Morning Peak (7–9 AM)',
            'midday': 'Mid-day (9 AM–4 PM)',
            'evening': 'Evening Peak (4–6 PM)'
        }[input.period()]

        ax.set_title(f'Auckland OD Matrix – {period_label}',
                    fontweight='bold', fontsize=13, pad=20)
        ax.set_xlabel('Destination', fontweight='bold', fontsize=11)
        ax.set_ylabel('Origin', fontweight='bold', fontsize=11)

        return fig

    # Output: Top routes table
    @output
    @render.table
    def top_routes_table():
        df = get_top_routes(input.period(), n=10)
        df.columns = ['Origin', 'Destination', 'Trips']
        return df

    # Output: Zone totals
    @output
    @render.table
    def zone_totals_table():
        totals = get_zone_totals(input.period())
        df = pd.DataFrame({
            'Zone': totals.index,
            'Total Outbound Trips': totals.values
        })
        return df

    # Output: OD data table
    @output
    @render.table
    def od_data_table():
        df = filtered_od()
        df_display = df.copy()
        df_display.columns = ['Origin', 'Destination', 'Period', 'Trips']
        return df_display.sort_values('Trips', ascending=False).head(50)

    # Output: Flow map
    @output
    @render.ui
    def flow_map():
        # Create base map
        m = folium.Map(
            location=[-37.7770, 174.8860],
            zoom_start=12,
            tiles='OpenStreetMap'
        )

        # Get data for this period
        df = filtered_od()

        # Normalize line width
        max_trips = df['trips'].max()
        min_trips = df['trips'].min()

        # Add flow lines
        for _, row in df.iterrows():
            origin = row['origin']
            dest = row['destination']
            trips = row['trips']

            if origin in zone_coords and dest in zone_coords:
                origin_coord = zone_coords[origin]
                dest_coord = zone_coords[dest]

                # Scale line width
                weight = 1 + ((trips - min_trips) / (max_trips - min_trips)) * 4

                # Colour based on volume
                if trips > 500:
                    colour = '#e74c3c'
                elif trips > 250:
                    colour = '#f39c12'
                else:
                    colour = '#3498db'

                # Add line with popup
                folium.PolyLine(
                    locations=[origin_coord, dest_coord],
                    weight=weight,
                    colour=colour,
                    opacity=0.6,
                    popup=f"{origin} → {dest}: {int(trips)} trips"
                ).add_to(m)

        # Add zone markers
        for zone, coord in zone_coords.items():
            folium.CircleMarker(
                location=coord,
                radius=7,
                popup=zone,
                colour='#2ecc71',
                fill=True,
                fillOpacity=0.8,
                weight=2,
                fillColour='#27ae60'
            ).add_to(m)

        # Convert to HTML
        map_html = m._repr_html_()
        return ui.HTML(f"""
            <div style="width: 100%; height: 600px;">
                {map_html}
            </div>
        """)

# Create app
app = App(app_ui, server)
```

### Part C: Run and Explore (25 minutes)

1. **Run the app:**
   ```bash
   shiny run od_explorer_app.py
   ```

2. **Explore each tab:**
   - **Heatmap**: Notice the strong diagonal (internal trips) and CBD-centric morning flows
   - **Statistics**: Identify the top 10 routes
   - **Flow Map**: Visualise geographic patterns with line thickness
   - **Data Table**: Browse raw data

3. **Test filtering:**
   - Select different periods (morning, midday, evening)
   - Filter by origin zone
   - Observe how patterns change

### Part D: Extension Tasks (Optional)

**Task 1: Add Peak Detection**
Write a function that identifies the busiest route for the selected period and highlight it.

**Task 2: Accessibility Analysis**
Add a tab showing "Accessibility Index": for each origin, calculate average travel time to all destinations.

**Task 3: Comparison View**
Add a tab that shows side-by-side heatmaps for morning vs. evening periods.

**Task 4: Export Data**
Add a download button that exports filtered OD data as CSV.

---

# Week 8: Polishing, Testing & Deployment

## Lecture Notes

### 8.1 UX Design Principles for Data Apps

A good data app should be:

1. **Intuitive**: Users understand what to do without instructions
2. **Fast**: No lag when changing inputs
3. **Beautiful**: Professional appearance builds trust
4. **Accessible**: Works for users with different abilities
5. **Documented**: Help text and explanations are clear

#### Layout and Navigation

**Principle: Information Hierarchy**
Most important controls/information at the top.

```python
app_ui = ui.page_sidebar(
    ui.sidebar(
        ui.h2("Primary Controls"),  # Large, clear heading
        ui.input_select("zone", "Zone (most important)", ...),
        ui.input_select("period", "Period (secondary)", ...),
        ui.input_checkbox("show_details", "Show details", ...),
    ),
    ui.panel_main(...),
)
```

**Principle: Grouping Related Controls**
Use panels to group related inputs.

```python
ui.panel_well(
    ui.h4("Filters"),
    ui.input_select(...),
    ui.input_slider(...),
)

ui.panel_well(
    ui.h4("Visualisation Options"),
    ui.input_radio_buttons(...),
)
```

**Principle: Progressive Disclosure**
Advanced options in separate tabs or collapsible sections.

```python
ui.navset_tab(
    ui.nav("Overview", simple_visualisation),
    ui.nav("Advanced Analysis", complex_visualisation),
)
```

#### Typography and Colour

**Text Sizes:**
```python
ui.h1("Main Title")      # 32px – Page title only
ui.h2("Section Title")   # 24px – Major sections
ui.h3("Subsection")      # 18px – Within a tab
ui.h4("Label")          # 16px – Input labels
ui.p("Normal text")     # 14px – Body text
```

**Colour:**
- Use a consistent palette (3–5 colours)
- Ensure sufficient contrast for accessibility
- Don't rely on colour alone to convey meaning

Bootstrap colours in Shiny:
```python
ui.value_box("Title", "Content", theme="info")     # Blue
ui.value_box("Title", "Content", theme="success")  # Green
ui.value_box("Title", "Content", theme="warning")  # Orange
ui.value_box("Title", "Content", theme="danger")   # Red
```

#### Error Handling and Validation

Prevent users from making mistakes:

```python
from shiny import ui, render, reactive

def server(input, output, session):

    # Validate: Ensure destination != origin
    @reactive.Effect
    def _validate_od():
        if input.origin() == input.destination():
            ui.notification_show("Origin and destination must be different!",
                               type="error", duration=3)

    # Validate: Ensure start date < end date
    @reactive.Effect
    def _validate_dates():
        if input.start_date() > input.end_date():
            ui.notification_show("Start date must be before end date",
                               type="error")
```

Display validation messages:

```python
@output
@render.text
def validation_message():
    if input.trips() < 100:
        return "Note: Low traffic volume selected"
    return ""
```

#### Responsive Design

Shiny apps should work on mobile and desktop.

```python
# Use layout_columns for responsive grid
ui.layout_columns(
    ui.value_box("Stat 1", "Value", theme="info"),
    ui.value_box("Stat 2", "Value", theme="success"),
    col_widths=[6, 6]  # 50/50 on desktop, stacks on mobile
)

# Alternatively, use col_widths=[12, 12] for mobile-first
ui.layout_columns(
    ui.panel_well(...),
    ui.panel_well(...),
    col_widths=[12, 12]  # Stacks on mobile
)
```

### 8.2 Adding Help Text, Tooltips, and Documentation

Users need to understand your app.

#### Help Text in Inputs

```python
ui.input_select(
    "zone",
    "Select congestion zone:",
    choices=zones,
    # Help text appears below input
)

ui.help_text("Leave blank to include all zones")
```

#### Tooltips

Add information on hover:

```python
ui.layout_columns(
    ui.value_box(
        ui.span(
            "Peak Hour Charge",
            ui.tags.span(
                "?",
                title="Charge per vehicle during peak hours (7–9 AM, 4–6 PM)",
                style="cursor: help; margin-left: 5px; font-weight: bold;"
            )
        ),
        "£3.50"
    )
)
```

#### Documentation Tab

Include an "About" or "Help" tab:

```python
ui.nav(
    "About",
    ui.panel_well(
        ui.h3("About This App"),
        ui.p("This app explores Auckland's congestion charging proposal."),
        ui.h4("Data Sources"),
        ui.ul(
            ui.li("Auckland Council Transport Strategy 2024"),
            ui.li("NZ Household Travel Survey"),
        ),
        ui.h4("How to Use"),
        ui.ol(
            ui.li("Select a zone from the sidebar"),
            ui.li("Choose a time period (peak/off-peak)"),
            ui.li("Explore the visualisations"),
        ),
        ui.h4("Definitions"),
        ui.tags.dl(
            ui.tags.dt("OD Matrix"),
            ui.tags.dd("Origin-Destination matrix showing trip flows between zones"),
            ui.tags.dt("Peak Hour"),
            ui.tags.dd("7–9 AM or 4–6 PM on weekdays"),
        ),
    )
)
```

### 8.3 Input Validation and Error Handling

Robust apps gracefully handle invalid input.

#### Type Validation

```python
def server(input, output, session):

    @reactive.Calc
    def validated_zone():
        zone = input.zone_select()
        valid_zones = zones_df['zone_id'].tolist()

        if zone not in valid_zones:
            return None
        return zone

    @output
    @render.text
    def zone_info():
        zone = validated_zone()
        if zone is None:
            return "Please select a valid zone"
        return f"Selected: {zone}"
```

#### Range Validation

```python
@reactive.Calc
def validated_year():
    year = input.year()
    if year < 2015 or year > 2024:
        return 2024  # Default to current year
    return year
```

#### Null/Missing Value Handling

```python
@output
@render.table
def od_table():
    df = filtered_od()
    if df.empty:
        return pd.DataFrame({"Message": ["No data for selected filters"]})
    return df
```

#### Try-Except in Server

```python
@output
@render.plot
def complex_plot():
    try:
        zone = input.zone_select()
        period = input.period()

        data = get_od_for_zone_period(zone, period)
        if data.empty:
            raise ValueError("No data available")

        # Create plot
        fig, ax = plt.subplots()
        ax.plot(data['time'], data['traffic'])
        return fig

    except Exception as e:
        # Return error message
        return plt.text(0.5, 0.5, f"Error: {str(e)}", ha='center')
```

### 8.4 Testing Shiny Apps

Testing ensures your app works reliably.

#### Manual Testing Checklist

```
[ ] All inputs work (dropdowns, sliders, checkboxes)
[ ] All outputs update when inputs change
[ ] No errors in browser console
[ ] App handles edge cases (empty data, invalid selections)
[ ] Responsive on mobile (test with browser resize)
[ ] Text is readable and well-formatted
[ ] Links open in new tab (if external)
[ ] Download buttons work
```

#### Unit Testing Server Logic

Test reactive calculations separately:

```python
# test_server.py
import pandas as pd
from od_data import get_top_routes, get_zone_totals

def test_top_routes():
    routes = get_top_routes('morning', n=5)
    assert len(routes) == 5
    assert 'origin' in routes.columns
    assert routes['trips'].iloc[0] >= routes['trips'].iloc[-1]

def test_zone_totals():
    totals = get_zone_totals('morning')
    assert len(totals) > 0
    assert all(totals >= 0)

# Run with pytest
# pytest test_server.py -v
```

#### Browser Testing Tools

Use browser developer tools:
- **Console**: Check for JavaScript errors
- **Network**: Monitor API calls and data loading
- **Performance**: Check load times

### 8.5 Deployment Options

#### Option 1: Shinyapps.io (Easiest)

Posit (formerly RStudio) hosts Shiny apps.

**Setup:**
1. Create account at shinyapps.io
2. Install rsconnect:
   ```bash
   pip install rsconnect-python
   ```
3. Authenticate:
   ```bash
   rsconnect add --account <account_name> --token <token> --secret <secret>
   ```
4. Deploy:
   ```bash
   rsconnect deploy shiny . --new
   ```

**Cost**: Free tier available (limited); paid plans from $9/month

**Pros**: No server setup needed, automatic scaling
**Cons**: Requires RStudio account, hosting costs for production

#### Option 2: Shinylive (No Backend Required)

Shinylive runs entirely in the browser – no server needed!

**Setup:**
1. Convert your app:
   ```bash
   pip install shinylive
   shinylive create . --app my_app
   ```
2. Deploy HTML to any static host (GitHub Pages, Netlify, etc.)

**Cost**: Free (static hosting)

**Pros**: No backend, fast, cheap
**Cons**: Limited to Python packages that work in browser; no file I/O

**Example: Deploy to GitHub Pages**
```bash
# Create gh-pages branch
git checkout --orphan gh-pages

# Deploy app
shinylive create . --site

# Push to GitHub
git add .
git commit -m "Deploy app"
git push origin gh-pages
```

#### Option 3: Self-Hosted

Run Shiny on your own server.

**Setup:**
```bash
# On server
pip install shiny gunicorn

# Run with Gunicorn
gunicorn --bind 0.0.0.0:8000 --workers 4 app:app
```

Use Nginx as reverse proxy:
```nginx
server {
    listen 80;
    server_name myapp.example.com;

    location / {
        proxy_pass http://localhost:8000;
    }
}
```

**Cost**: Server rental ($5–50/month depending on traffic)

**Pros**: Full control, no vendor lock-in
**Cons**: Requires server administration, scaling is your responsibility

### 8.6 Creating Documentation

A README helps users understand your project.

**Example README.md:**

```markdown
# Auckland Congestion Charging Explorer

Interactive web application for exploring Auckland's proposed congestion
charging system and Origin-Destination (OD) commute flows.

## Features

- **Zone Explorer**: Visualise congestion charge rates and traffic volumes
- **OD Matrix Viewer**: Explore suburb-to-suburb commute patterns
- **Interactive Maps**: See geographic distribution of flows
- **Peak Hour Analysis**: Compare morning, midday, and evening patterns

## Installation

```bash
git clone https://github.com/yourusername/auckland-od-explorer.git
cd auckland-od-explorer

pip install -r requirements.txt
```

## Running the App

```bash
shiny run app.py
```

Visit http://localhost:8000 in your browser.

## Data Sources

- Auckland Council Transport Strategy 2024
- NZ Household Travel Survey 2021
- Census data (suburb boundaries)

## Project Structure

```
.
├── app.py                 # Main Shiny app
├── congestion_app.py      # Week 6 lab app
├── od_explorer_app.py     # Week 7 lab app
├── data.py                # Congestion zone data
├── od_data.py             # OD matrix data
├── requirements.txt       # Python dependencies
└── README.md
```

## Usage

### Congestion Charging Explorer
1. Select a zone from the dropdown
2. Choose a time period (peak/off-peak)
3. Explore charge rates and traffic patterns

### OD Matrix Explorer
1. Select a travel period (morning/midday/evening)
2. View the heatmap to identify key routes
3. Check the flow map for geographic patterns

## Deployment

### Shinylive (Browser-based)
```bash
shinylive create . --site
# Deploy the resulting HTML to GitHub Pages or Netlify
```

### Shinyapps.io
```bash
rsconnect deploy shiny . --new
```

## License

MIT License

## Author

Your Name (GISCI 343, University of Auckland)
```

---

## Week 8 Lab Exercise: Polishing, Testing & Deployment

### Learning Objectives
1. Combine Week 6 and 7 apps into one polished application
2. Add input validation and error handling
3. Create comprehensive documentation
4. Deploy to Shinylive or shinyapps.io
5. Write a professional README

### Exercise Duration: 2 hours

### Part A: Create Polished Combined App (50 minutes)

Create a file called `final_app.py`:

```python
from shiny import App, ui, render, reactive
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import folium
from data import zones_df, get_zone_summary
from od_data import od_full, zones, zone_coords, get_matrix, get_top_routes, get_zone_totals

# Define UI with professional styling
app_ui = ui.page_navbar(
    ui.head_content(
        ui.HTML("""
        <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
            .navbar { background-color: #2c3e50; }
            .sidebar { background-color: #ecf0f1; }
            h1, h2 { color: #2c3e50; }
            .value-box { border-radius: 8px; }
        </style>
        """),
        ui.HTML("<title>Auckland Transport Explorer</title>")
    ),
    ui.nav(
        "Congestion Zones",
        ui.page_sidebar(
            ui.sidebar(
                ui.h3("Zone Filters"),
                ui.input_select(
                    "zone_select",
                    "Select a zone:",
                    choices={row['zone_id']: row['zone_name']
                            for _, row in zones_df.iterrows()}
                ),
                ui.input_radio_buttons(
                    "time_period",
                    "Time period:",
                    choices={
                        "morning": "Morning peak (7–9 AM)",
                        "midday": "Mid-day (9 AM–4 PM)",
                        "evening": "Evening peak (4–6 PM)"
                    },
                    selected="morning"
                ),
                ui.hr(),
                ui.p(
                    ui.strong("Help:"),
                    ui.br(),
                    "Select a zone to see detailed congestion information. "
                    "Peak charges apply during morning and evening rush hours.",
                    style="font-size: 0.9em; color: #555;"
                ),
            ),
            ui.panel_main(
                ui.navset_tab(
                    ui.nav(
                        "Overview",
                        ui.output_table("zone_table"),
                        ui.br(),
                        ui.h3("Charge Rates"),
                        ui.output_plot("charges_plot"),
                    ),
                    ui.nav(
                        "Zone Details",
                        ui.panel_well(
                            ui.h3(ui.output_text("selected_zone_name")),
                            ui.layout_columns(
                                ui.value_box(
                                    "Peak Charge",
                                    ui.output_text("peak_charge_text"),
                                    theme="info"
                                ),
                                ui.value_box(
                                    "Off-peak Charge",
                                    ui.output_text("offpeak_charge_text"),
                                    theme="success"
                                ),
                                col_widths=[6, 6]
                            ),
                            ui.br(),
                            ui.output_plot("traffic_timeline"),
                        ),
                    ),
                    ui.nav(
                        "Map",
                        ui.output_ui("zone_map"),
                    ),
                ),
            ),
        ),
    ),
    ui.nav(
        "OD Matrix",
        ui.page_sidebar(
            ui.sidebar(
                ui.h3("OD Filters"),
                ui.input_radio_buttons(
                    "od_period",
                    "Travel period:",
                    choices={
                        "morning": "Morning Peak (7–9 AM)",
                        "midday": "Mid-day (9 AM–4 PM)",
                        "evening": "Evening Peak (4–6 PM)"
                    },
                    selected="morning"
                ),
                ui.input_select(
                    "origin_filter",
                    "Filter by origin:",
                    choices={"all": "All zones"} | {zone: zone for zone in zones}
                ),
                ui.hr(),
                ui.p(
                    ui.strong("Help:"),
                    ui.br(),
                    "The OD Matrix shows commute flows from origins (rows) "
                    "to destinations (columns). Darker colours indicate "
                    "higher traffic volumes.",
                    style="font-size: 0.9em; color: #555;"
                ),
            ),
            ui.panel_main(
                ui.navset_tab(
                    ui.nav(
                        "Heatmap",
                        ui.output_plot("heatmap"),
                    ),
                    ui.nav(
                        "Top Routes",
                        ui.output_table("top_routes_table"),
                        ui.br(),
                        ui.output_table("zone_totals_table"),
                    ),
                    ui.nav(
                        "Flow Map",
                        ui.output_ui("flow_map"),
                    ),
                ),
            ),
        ),
    ),
    ui.nav(
        "About",
        ui.panel_well(
            ui.h2("About This Application"),
            ui.p(
                "This application explores Auckland's proposed congestion charging "
                "system and commute flow patterns across the city."
            ),
            ui.h3("Features"),
            ui.ul(
                ui.li(ui.strong("Congestion Zones"), " – View charge rates and traffic volumes"),
                ui.li(ui.strong("OD Matrix"), " – Analyse origin-destination commute flows"),
                ui.li(ui.strong("Maps"), " – Visualise geographic patterns"),
            ),
            ui.h3("Data Sources"),
            ui.ul(
                ui.li("Auckland Council Transport Strategy 2024"),
                ui.li("NZ Household Travel Survey 2021"),
            ),
            ui.h3("Definitions"),
            ui.tags.dl(
                ui.tags.dt("Congestion Charge"),
                ui.tags.dd("Daily fee charged to vehicles entering a congestion zone"),
                ui.tags.dt("OD Matrix"),
                ui.tags.dd("Origin-Destination matrix: rows=origins, columns=destinations, "
                          "values=trip counts"),
                ui.tags.dt("Peak Hour"),
                ui.tags.dd("7–9 AM or 4–6 PM on weekdays"),
            ),
            ui.h3("Contact"),
            ui.p("For questions, contact Dr Hyesop Shin (h.shin@auckland.ac.nz)"),
        ),
    ),
    title="Auckland Transport Explorer",
    theme="bootstrap",
)

# Server logic
def server(input, output, session):

    # ==== CONGESTION ZONES TAB ====

    @reactive.Calc
    def current_zone():
        zone_id = input.zone_select()
        return zones_df[zones_df['zone_id'] == zone_id].iloc[0]

    @output
    @render.text
    def selected_zone_name():
        return current_zone()['zone_name']

    @output
    @render.text
    def peak_charge_text():
        return f"£{current_zone()['peak_charge']:.2f}"

    @output
    @render.text
    def offpeak_charge_text():
        return f"£{current_zone()['offpeak_charge']:.2f}"

    @output
    @render.table
    def zone_table():
        display_df = zones_df[[
            'zone_name', 'peak_charge', 'offpeak_charge',
            'morning_traffic', 'evening_traffic'
        ]].copy()
        display_df.columns = [
            'Zone', 'Peak Charge (£)', 'Off-peak Charge (£)',
            'Morning Traffic', 'Evening Traffic'
        ]
        return display_df

    @output
    @render.plot
    def charges_plot():
        fig, ax = plt.subplots(figsize=(10, 5))
        zones = zones_df['zone_name'].values
        peak = zones_df['peak_charge'].values
        offpeak = zones_df['offpeak_charge'].values

        x = range(len(zones))
        width = 0.35

        ax.bar([i - width/2 for i in x], peak, width, label='Peak', colour='#e74c3c')
        ax.bar([i + width/2 for i in x], offpeak, width, label='Off-peak', colour='#2ecc71')

        ax.set_ylabel('Charge (£)', fontsize=11, fontweight='bold')
        ax.set_title('Congestion Charge Rates by Zone', fontsize=13, fontweight='bold')
        ax.set_xticks(x)
        ax.set_xticklabels(zones, rotation=45, ha='right')
        ax.legend()
        ax.grid(axis='y', alpha=0.3)

        return fig

    @output
    @render.plot
    def traffic_timeline():
        zone = current_zone()
        periods = ['Morning\n(7–9 AM)', 'Mid-day\n(9 AM–4 PM)', 'Evening\n(4–6 PM)']
        traffic = [zone['morning_traffic'], zone['midday_traffic'], zone['evening_traffic']]
        colours = ['#e74c3c', '#f39c12', '#e74c3c']

        fig, ax = plt.subplots(figsize=(8, 5))
        bars = ax.bar(periods, traffic, color=colours, edgecolor='black', linewidth=1.5)

        ax.set_ylabel('Traffic Volume (vehicles)', fontsize=11, fontweight='bold')
        ax.set_title(f'Traffic Pattern – {zone["zone_name"]}', fontsize=13, fontweight='bold')
        ax.grid(axis='y', alpha=0.3)

        for bar, value in zip(bars, traffic):
            height = bar.get_height()
            ax.text(bar.get_x() + bar.get_width()/2., height,
                   f'{int(value):,}', ha='center', va='bottom', fontweight='bold')

        return fig

    @output
    @render.ui
    def zone_map():
        m = folium.Map(
            location=[-37.7770, 174.8860],
            zoom_start=12,
            tiles='OpenStreetMap'
        )

        for _, zone in zones_df.iterrows():
            folium.CircleMarker(
                location=[zone['latitude'], zone['longitude']],
                radius=8,
                popup=f"{zone['zone_name']}<br>Peak: £{zone['peak_charge']}",
                colour='#e74c3c' if zone['zone_id'] in ['CBD', 'Ponsonby'] else '#3498db',
                fill=True,
                fillOpacity=0.7,
                weight=2
            ).add_to(m)

        map_html = m._repr_html_()
        return ui.HTML(f"<div style='width: 100%; height: 500px;'>{map_html}</div>")

    # ==== OD MATRIX TAB ====

    @reactive.Calc
    def filtered_od():
        period = input.od_period()
        df = od_full[od_full['period'] == period].copy()

        origin_filter = input.origin_filter()
        if origin_filter != "all":
            df = df[df['origin'] == origin_filter]

        return df

    @reactive.Calc
    def od_matrix():
        return get_matrix(input.od_period())

    @output
    @render.plot
    def heatmap():
        matrix = od_matrix()

        fig, ax = plt.subplots(figsize=(11, 9))
        sns.heatmap(
            matrix,
            annot=True,
            fmt='.0f',
            cmap='YlOrRd',
            cbar_kws={'label': 'Number of Trips'},
            ax=ax,
            linewidths=0.5,
            linecolour='grey'
        )

        period_label = {
            'morning': 'Morning Peak (7–9 AM)',
            'midday': 'Mid-day (9 AM–4 PM)',
            'evening': 'Evening Peak (4–6 PM)'
        }[input.od_period()]

        ax.set_title(f'OD Matrix – {period_label}',
                    fontweight='bold', fontsize=13, pad=20)
        ax.set_xlabel('Destination', fontweight='bold', fontsize=11)
        ax.set_ylabel('Origin', fontweight='bold', fontsize=11)

        return fig

    @output
    @render.table
    def top_routes_table():
        df = get_top_routes(input.od_period(), n=10)
        df.columns = ['Origin', 'Destination', 'Trips']
        return df

    @output
    @render.table
    def zone_totals_table():
        totals = get_zone_totals(input.od_period())
        df = pd.DataFrame({
            'Zone': totals.index,
            'Total Trips': totals.values
        })
        return df

    @output
    @render.ui
    def flow_map():
        m = folium.Map(
            location=[-37.7770, 174.8860],
            zoom_start=12,
            tiles='OpenStreetMap'
        )

        df = filtered_od()

        if df.empty:
            return ui.HTML("<p style='padding: 20px;'>No data available for selected filters.</p>")

        max_trips = df['trips'].max()
        min_trips = df['trips'].min()

        for _, row in df.iterrows():
            origin = row['origin']
            dest = row['destination']
            trips = row['trips']

            if origin in zone_coords and dest in zone_coords:
                origin_coord = zone_coords[origin]
                dest_coord = zone_coords[dest]

                weight = 1 + ((trips - min_trips) / (max_trips - min_trips)) * 4

                if trips > 500:
                    colour = '#e74c3c'
                elif trips > 250:
                    colour = '#f39c12'
                else:
                    colour = '#3498db'

                folium.PolyLine(
                    locations=[origin_coord, dest_coord],
                    weight=weight,
                    colour=colour,
                    opacity=0.6,
                    popup=f"{origin} → {dest}: {int(trips)} trips"
                ).add_to(m)

        for zone, coord in zone_coords.items():
            folium.CircleMarker(
                location=coord,
                radius=7,
                popup=zone,
                colour='#2ecc71',
                fill=True,
                fillOpacity=0.8,
                weight=2,
            ).add_to(m)

        map_html = m._repr_html_()
        return ui.HTML(f"<div style='width: 100%; height: 600px;'>{map_html}</div>")

app = App(app_ui, server)
```

### Part B: Create Requirements File (10 minutes)

Create `requirements.txt`:

```
shiny==0.10.0
pandas==2.1.0
numpy==1.24.0
matplotlib==3.7.0
seaborn==0.12.0
folium==0.14.0
geopandas==0.13.0
shapely==2.0.0
plotly==5.14.0
```

### Part C: Write README (20 minutes)

Create `README.md`:

```markdown
# Auckland Transport Explorer

Interactive web application for exploring Auckland's proposed congestion charging
system and Origin-Destination (OD) commute flow patterns.

## Features

### Congestion Charging Zones
- View congestion charge rates for each zone
- Analyse traffic volumes across time periods
- Interactive map showing zone locations
- Detailed statistics for peak and off-peak periods

### Origin-Destination Matrix
- Visualise commute flows between suburbs
- Heatmap showing flow intensity
- Geographic flow map with animated routes
- Identify busiest routes and accessibility patterns

### Time Periods
- **Morning Peak (7–9 AM)**: Strong inbound flows to CBD
- **Mid-day (9 AM–4 PM)**: Lower volumes, dispersed flows
- **Evening Peak (4–6 PM)**: Reverse flows, outbound from CBD

## Installation

### Prerequisites
- Python 3.8 or later
- pip (Python package manager)

### Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/auckland-transport-explorer.git
cd auckland-transport-explorer
```

2. Create a virtual environment (recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

## Running Locally

```bash
shiny run final_app.py
```

The app will be available at `http://localhost:8000`.

## Project Structure

```
.
├── final_app.py           # Main combined application
├── congestion_app.py      # Week 6: Congestion charging explorer
├── od_explorer_app.py     # Week 7: OD matrix explorer
├── data.py                # Auckland zones dataset
├── od_data.py             # OD matrix dataset
├── requirements.txt       # Python dependencies
└── README.md
```

## Data Sources

- Auckland Council Transport Strategy 2024
- New Zealand Household Travel Survey 2021
- Census 2023 (suburb boundaries)

**Note**: This application uses sample/synthetic data for educational purposes.
Real deployments would integrate actual transport data.

## Deployment

### Option 1: Shinylive (Browser-based, No Backend)

Shinylive allows deployment without a backend server.

```bash
pip install shinylive
shinylive create . --site
```

Deploy the `_shinylive` folder to GitHub Pages or Netlify.

### Option 2: Shinyapps.io

```bash
pip install rsconnect-python
rsconnect add --account <account> --token <token> --secret <secret>
rsconnect deploy shiny . --new
```

### Option 3: Self-Hosted

```bash
pip install gunicorn
gunicorn --bind 0.0.0.0:8000 --workers 4 --timeout 120 final_app:app
```

Use Nginx/Apache as a reverse proxy for production.

## Usage Guide

### Congestion Zones Tab
1. Select a zone from the dropdown
2. Choose a time period
3. View charge rates and traffic patterns
4. Click the Map tab to see geographic location

### OD Matrix Tab
1. Select a travel period
2. Optionally filter by origin suburb
3. Study the heatmap (darker = more trips)
4. Check the Flow Map for geographic patterns
5. Review Top Routes table

### About Tab
- Definitions of key terms
- Data sources and methodology
- Contact information

## Technical Details

### Shiny Framework
- **PyShiny**: Python implementation of Shiny
- **Reactive Programming**: Outputs automatically update when inputs change
- **Bootstrap**: Responsive design framework

### Visualisations
- **Matplotlib**: Static plots (bar charts, traffic timelines)
- **Seaborn**: Heatmaps (OD matrices)
- **Folium**: Interactive maps (zone locations, flow routes)

### Data Processing
- **Pandas**: Data manipulation and aggregation
- **NumPy**: Numerical operations

## Testing

### Manual Testing Checklist
- [ ] All filters work correctly
- [ ] Outputs update when inputs change
- [ ] No console errors in browser DevTools
- [ ] Maps load and are interactive
- [ ] Responsive design works on mobile
- [ ] About section displays correctly

### Unit Tests

```bash
# Example test file: test_data.py
import pytest
from od_data import get_top_routes, get_zone_totals

def test_top_routes():
    routes = get_top_routes('morning', n=5)
    assert len(routes) == 5
    assert 'origin' in routes.columns

def test_zone_totals():
    totals = get_zone_totals('morning')
    assert len(totals) > 0

# Run tests
pytest test_data.py -v
```

## Performance Notes

- **Heatmap rendering**: Optimised for up to 20 zones; for larger matrices,
  consider data aggregation
- **Map loading**: Folium maps are responsive; complex visualisations (100+ flows)
  may be slower
- **Data filtering**: Uses pandas `.loc[]` for efficient subsetting; handles
  10,000+ records easily

## Accessibility

- High contrast colour schemes
- Alt text for images (maps include popups)
- Keyboard navigation supported
- Help text and tooltips provided

## Limitations

- Sample/synthetic data (not real traffic)
- Fixed set of zones (can be extended)
- No real-time updates
- Map requires internet connection (OpenStreetMap)

## Future Enhancements

- Real transport data integration
- Year-over-year comparisons
- Custom date range selection
- Data export (CSV, GeoJSON)
- Advanced analytics (clustering, accessibility indices)
- Multi-language support

## License

MIT License – See LICENSE file

## Author

Created for GISCI 343: Python for GIS
University of Auckland | Dr Hyesop Shin

## Contact & Support

- **Course Enquiries**: h.shin@auckland.ac.nz
- **Code Issues**: Create an issue on GitHub

---

**Last Updated**: February 2024
```

### Part D: Deploy to Shinylive (30 minutes)

1. **Install Shinylive:**
   ```bash
   pip install shinylive
   ```

2. **Convert app to standalone:**
   ```bash
   shinylive create . --app final_app
   ```

3. **Deploy to GitHub Pages:**
   ```bash
   # Initialise git if needed
   git init
   git add -A
   git commit -m "Initial commit"

   # Create gh-pages branch
   git checkout --orphan gh-pages
   git rm -rf .

   # Copy shinylive output
   cp -r _shinylive/* .
   git add .
   git commit -m "Deploy to GitHub Pages"

   # Push
   git push origin gh-pages
   ```

4. **Access the app:**
   Visit `https://yourusername.github.io/auckland-transport-explorer/`

### Part E: Documentation Review (10 minutes)

Review your app for:
- ✓ Clear input labels and help text
- ✓ Error messages for invalid input
- ✓ Responsive design (test on mobile)
- ✓ Informative About tab
- ✓ Professional styling
- ✓ Fast load times

---

## Summary & Key Takeaways

### Week 6: Building Foundations
- Shiny app structure: UI + server
- Reactive programming basics
- Input/output components
- Working with Auckland congestion charging data

### Week 7: Advanced Techniques
- OD matrices and their applications
- Complex reactivity patterns
- Multiple visualisation types (heatmaps, maps, flow diagrams)
- Handling larger datasets efficiently

### Week 8: Professional Polish
- UX design principles
- Input validation and error handling
- Comprehensive testing
- Deployment strategies (Shinylive, shinyapps.io, self-hosted)
- Professional documentation

---

## Assessment Rubric

| Criterion | Excellent (A) | Good (B) | Satisfactory (C) |
|-----------|---------------|---------|-----------------|
| **Functionality** | All features work flawlessly; app handles edge cases | All features work; minor bugs | Core features work; notable bugs |
| **UI/UX** | Intuitive, professional, fully responsive | Clear layout, mostly responsive | Basic layout, some usability issues |
| **Code Quality** | Well-organised, commented, efficient | Functional, some comments | Works, minimal documentation |
| **Documentation** | Comprehensive README, inline comments | Clear README, adequate comments | Basic README, few comments |
| **Deployment** | Successfully deployed and accessible | Deployment instructions clear | Deployment attempted |

---

## Additional Resources

### Official Documentation
- **PyShiny**: https://shiny.posit.co/py/
- **Folium**: https://python-visualization.github.io/folium/
- **Seaborn**: https://seaborn.pydata.org/
- **Pandas**: https://pandas.pydata.org/docs/

### Transport Planning
- Auckland Council Transport Strategy: https://www.aucklandtransport.govt.nz/
- Congestion Charging Information: https://www.aucklandcouncil.govt.nz/

### Deployment
- Shinylive Docs: https://shiny.posit.co/py/docs/shinylive.html
- GitHub Pages: https://pages.github.com/

---

**End of Lecture Notes and Lab Exercises**

Created for GISCI 343: Python for GIS | University of Auckland | Dr Hyesop Shin
