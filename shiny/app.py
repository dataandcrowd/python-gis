from shiny import App, ui, render, reactive
from shinywidgets import output_widget, render_widget
from ipyleaflet import Map, GeoData
import geopandas as gpd

# Load once at module level — always reproject to EPSG:4326 for ipyleaflet
route = gpd.read_file("data/NX2.gpkg", layer="bus_route").to_crs(4326)

day_labels = {
    "Mon_av": "Monday",
    "Tue_av": "Tuesday",
    "Wed_av": "Wednesday",
    "Thu_av": "Thursday",
    "Fri_av": "Friday",
    "Sat_av": "Saturday",
    "Sun_av": "Sunday",
}

app_ui = ui.page_sidebar(
    ui.sidebar(
        ui.input_select("day", "Day of week", choices=day_labels),
        ui.input_action_button("apply", "Apply"),
        width=250,
    ),
    ui.output_text("summary"),
    output_widget("map"),
    title="NX2 Bus Route Explorer",
)

def server(input, output, session):

    @reactive.calc
    @reactive.event(input.apply, ignore_none=False)
    def selected_day():
        # Returns the chosen column name; outputs read from it
        return input.day()

    @reactive.effect
    @reactive.event(input.apply)
    def _():
        # Side effect: log to console on each apply click
        col = selected_day()
        boardings = int(route[col].iloc[0])
        print(f"Day: {day_labels[col]}, avg boardings: {boardings:,}")

    @render.text
    def summary():
        col = selected_day()
        boardings = int(route[col].iloc[0])
        return f"NX2 average boardings on {day_labels[col]}: {boardings:,}"

    @render_widget
    def map():
        col = selected_day()
        weekdays = {"Mon_av", "Tue_av", "Wed_av", "Thu_av", "Fri_av"}
        colour = "#d73027" if col in weekdays else "#1f78b4"
        m = Map(center=(-36.74, 174.72), zoom=11)
        m.add_layer(GeoData(
            geo_dataframe=route,
            style={"color": colour, "weight": 4, "opacity": 0.8},
            name="NX2 route",
        ))
        return m

app = App(app_ui, server)