# GISCI 343: GIS Python Programming

**Syllabus — Semester 1, 2026**

---

## Course Information

| | |
|---|---|
| **Course Code** | GISCI 343 |
| **Course Title** | GIS Python Programming |
| **Institution** | University of Auckland, Department of Geography |
| **Semester** | Semester 1, 2026 |
| **Duration** | 12 weeks |
| **Instructor** | Dr Hyesop Shin |
| **Contact** | hyesop.shin@auckland.ac.nz |
| **Office Hours** | By appointment |
| **Course Delivery** | Lectures + Laboratory Sessions |

---

## Course Description

This course introduces students to Python programming with a focus on geospatial and urban analysis applications relevant to Auckland and Aotearoa New Zealand. Beginning with fundamental programming concepts, students develop proficiency in data manipulation, analysis, and visualisation using industry-standard geospatial libraries. The course progresses from command-line scripts through interactive web applications to production-ready Python packages, providing a comprehensive foundation in GIS software development.

Throughout the course, students engage with real Auckland datasets including transport networks, congestion charging zones, air quality measurements, crime statistics, and footfall data. This applied approach ensures that theoretical programming concepts remain grounded in practical, locally-relevant problems. The course emphasises professional development practices including version control, testing, documentation, and collaborative software engineering from the outset.

By the end of this course, students will be capable of developing sophisticated geospatial applications, publishing Python packages for community use, and contributing to the open-source GIS ecosystem. The progression from individual assignments to pair-based package development cultivates both technical competence and collaborative skills essential for modern GIS practitioners and data scientists.

---

## Learning Outcomes

Upon successful completion of this course, students will be able to:

1. **Write clear, well-documented Python code** following industry-standard conventions (PEP 8, type hints, docstrings) to solve geospatial problems of moderate complexity.

2. **Analyse urban and environmental datasets** using pandas and geopandas to extract insights, create summary statistics, and identify patterns relevant to Auckland's geography and urban planning.

3. **Design and implement interactive web applications** using PyShiny that enable non-technical stakeholders to explore geospatial data and generate insights through intuitive user interfaces.

4. **Develop production-quality Python packages** with comprehensive testing, documentation, and continuous integration workflows suitable for public release and community contribution.

5. **Integrate external data sources** including public APIs (transport, environmental, census) and web services (geocoding, routing) into complete analytical workflows.

6. **Apply professional software engineering practices** including version control (Git), testing frameworks (pytest), and deployment strategies to ensure code quality, maintainability, and reliability.

---

## Course Schedule Overview

| Week | Topic | Lab Exercise | Assessment |
|------|-------|--------------|------------|
| 1 | Python Fundamentals & Environment Setup | Getting Started with Python | — |
| 2 | Control Flow & Conditional Logic | Control Flow with Auckland Transport Data | — |
| 3 | Data Structures & Pandas Basics | Structuring Auckland Urban Data with Pandas | — |
| 4 | Assessment & Statistical Methods | Mid-Semester Test | **Mid-Semester Test (20%)** |
| 5 | Functions & Web APIs | Building Functions and Fetching Auckland Data from APIs | — |
| 6 | Interactive Web Applications — Shiny Part 1 | Building Your First Shiny App: Auckland Congestion Charging Explorer | — |
| 7 | Interactive Web Applications — Shiny Part 2 | Origin-Destination Matrix Explorer for Auckland Transport | — |
| 8 | Advanced Shiny & Publishing | Publishing Your Congestion Charging & OD Explorer App | **Assignment 2 Due (25%)** |
| 9 | Python Package Development — Part 1: Foundations | Initialising Your Package Project with uv | — |
| 10 | Python Package Development — Part 2: Core Implementation | Implementing Core Functionality and Writing Tests | — |
| 11 | Python Package Development — Part 3: Advanced Features | Polishing Your Package: Documentation and Optimisation | — |
| 12 | Package Release and Collaboration | Publishing Your Package and Final Presentations | **Assignment 3 Due (30%)** |

**Note:** Assignment 1 is due during Week 5 (25% of final grade).

---

## Detailed Weekly Schedule

---

### Week 1: Python Fundamentals & Environment Setup

**Lecture Topic:** Variables, Data Types, and Operators

#### Learning Objectives

- Understand Python syntax and variable assignment
- Distinguish between primitive data types (int, float, string, bool)
- Perform arithmetic, comparison, and logical operations
- Set up development environment and write first Python script
- Understand type conversion and casting

#### Lecture Content Outline

1. **Introduction to Python**
   - Why Python for GIS and geospatial analysis
   - Python ecosystem and community resources
   - Course overview and learning pathway

2. **Python Environment Setup**
   - Installing Python and required tools
   - Understanding virtual environments
   - Working with Jupyter Notebook and JupyterLab
   - Introduction to integrated development environments (VS Code, PyCharm)

3. **Variables and Assignment**
   - Variable naming conventions and best practices
   - Dynamic typing in Python
   - Memory and object references
   - Working with geographic coordinates as variables

4. **Primitive Data Types**
   - Integers and floats: representing coordinates and measurements
   - Strings: storing location names and descriptions
   - Booleans: conditional logic for spatial queries
   - Type checking with `type()` and `isinstance()`

5. **Operators**
   - Arithmetic operators: calculating distances and areas
   - Comparison operators: filtering spatial features
   - Logical operators: combining multiple conditions
   - Operator precedence and evaluation order

6. **Type Conversion and Casting**
   - Implicit and explicit type conversion
   - Common pitfalls and type errors
   - Converting between numeric types for GIS calculations

#### Lab Exercise: Getting Started with Python

**Duration:** 2 hours

Students establish their Python development environment and complete foundational exercises:

1. **Environment Setup**
   - Install Python 3.11+ and required packages
   - Create a virtual environment for the course
   - Launch Jupyter Notebook and verify installation

2. **Basic Calculations with Auckland Coordinates**
   - Assign latitude/longitude pairs for Auckland locations (CBD: -37.7870, 174.7670; Mount Eden: -37.7752, 174.7637)
   - Calculate differences in coordinates
   - Compute approximate distances using Euclidean distance formula: √((Δlat)² + (Δlon)²)

3. **Type Exploration**
   - Create variables of different types
   - Perform type conversions and observe results
   - Document observations about Python's type system

4. **Problem Solving**
   - Calculate great-circle distance between two Auckland suburbs
   - Convert distances from degrees to kilometres
   - Create a small script that takes user input for coordinates and calculates distance

#### Required Readings and Resources

- **Mandatory:** Lutz, M. (2013). *Learning Python* (5th ed.). O'Reilly. Chapters 1–4.
- **Python Official Documentation:** [python.org/3/tutorial/](https://docs.python.org/3/tutorial/)
- **GIS-Focused Resources:** "A Gentle Introduction to GIS" (Shapely and GeoPandas primers)
- **Auckland Data Context:** Explore AT Metro website for Auckland transport zones and coordinates

#### Key Concepts

- Variables and assignment
- Primitive data types: int, float, str, bool
- Arithmetic operators: +, −, *, /, //, %, **
- Comparison operators: ==, !=, <, >, <=, >=
- Logical operators: and, or, not
- Type conversion: int(), float(), str(), bool()
- Print statements and f-strings for output formatting
- Comments and inline documentation
- Python naming conventions (snake_case)

---

### Week 2: Control Flow & Conditional Logic

**Lecture Topic:** If-Else Statements and Loops

#### Learning Objectives

- Implement conditional statements (if, elif, else)
- Construct loops using for and while statements
- Write nested control structures
- Understand loop control (break, continue)
- Apply control flow to geographic data filtering

#### Lecture Content Outline

1. **Conditional Statements**
   - Boolean expressions and truth values
   - If, elif, and else structures
   - Nested conditionals for complex logic
   - Practical example: classifying traffic congestion levels in Auckland

2. **For Loops**
   - Iterating over sequences (lists, strings)
   - Range objects and numeric iteration
   - Practical example: processing Auckland bus stop data

3. **While Loops**
   - Loop conditions and termination
   - Infinite loop prevention
   - Use cases in geospatial iteration

4. **Loop Control**
   - Break statement for early exit
   - Continue statement for skipping iterations
   - Loop-else construct for fallback logic

5. **Nested Control Structures**
   - Loops within conditionals and vice versa
   - Debugging nested structures
   - Performance considerations

6. **Practical Applications in GIS**
   - Filtering geographic features by spatial criteria
   - Processing multipart geometries
   - Iterating through coordinate lists

#### Lab Exercise: Control Flow with Auckland Transport Data

**Duration:** 2 hours

Students use conditional statements and loops to filter and analyse transport data:

1. **Conditional Filtering**
   - Load sample Auckland bus stop data (synthetic dataset with coordinates, route numbers)
   - Filter stops within a specified distance threshold from a user-entered location
   - Classify stops as "CBD", "inner suburbs", or "outer suburbs" based on distance from city centre

2. **Loop-Based Processing**
   - Iterate through a list of Auckland suburbs
   - For each suburb, calculate average congestion level (synthetic time-series data)
   - Identify suburbs exceeding a congestion threshold

3. **Nested Control Structures**
   - For each traffic route, iterate through peak hours
   - Check conditions: is congestion > 80%? Is it a weekday?
   - Count matching conditions and generate summary report

4. **Edge Case Handling**
   - Use break to stop processing once a threshold is exceeded
   - Use continue to skip data points with missing values
   - Test robustness with malformed input data

5. **Challenge Exercise**
   - Write a script that iterates through Auckland suburbs and identifies those with both high congestion AND low air quality
   - Output results as a prioritised list for intervention planning

#### Required Readings and Resources

- **Mandatory:** Lutz, M. (2013). *Learning Python* (5th ed.). O'Reilly. Chapters 12–14.
- **Interactive Tutorial:** [Python.org Control Flow](https://docs.python.org/3/tutorial/controlflow.html)
- **Auckland Context:** AT Metro API documentation for real transport zone structures
- **GIS Application:** Examples of spatial filtering with Shapely geometries

#### Key Concepts

- Boolean expressions and truth values
- If-elif-else statement structure and flow
- For loops: range(), enumerate(), iteration over sequences
- While loops: conditions and termination
- Break and continue for loop control
- Nested conditionals and loops
- Logical operators in conditional expressions (and, or, not)
- Pattern matching for spatial/thematic criteria
- Performance implications of nested loops

---

### Week 3: Data Structures & Pandas Basics

**Lecture Topic:** Lists, Dictionaries, Tuples, and Introduction to DataFrames

#### Learning Objectives

- Create and manipulate lists, dictionaries, and tuples
- Understand mutable vs. immutable data structures
- Introduce pandas DataFrames and Series
- Load, explore, and perform basic operations on geospatial datasets
- Understand indexing and slicing operations

#### Lecture Content Outline

1. **Lists**
   - Creating and indexing lists
   - List methods: append, extend, insert, remove, pop, sort
   - List slicing and negative indexing
   - List comprehensions for elegant filtering

2. **Dictionaries**
   - Key-value pairs and dictionary creation
   - Dictionary methods: keys(), values(), items()
   - Nested dictionaries for structured data
   - Mapping relationships (e.g., suburb names to statistics)

3. **Tuples**
   - Immutability and use cases
   - Tuple packing and unpacking
   - Named tuples for clearer code
   - Coordinate pairs as tuples

4. **Pandas Introduction**
   - Series: one-dimensional labelled arrays
   - DataFrames: two-dimensional tabular data
   - Indices and columns in pandas
   - Loading data from CSV files with pandas.read_csv()

5. **DataFrame Exploration**
   - head(), tail(), info(), describe() methods
   - Shape, size, and memory usage
   - Data types and dtype conversion
   - Identifying missing values

6. **Indexing and Selection**
   - Label-based indexing with .loc[]
   - Integer-based indexing with .iloc[]
   - Boolean indexing for filtering
   - Using query() for complex selections

7. **Basic DataFrame Operations**
   - Arithmetic operations on columns
   - Sorting and ranking
   - Groupby operations for aggregation
   - Calculating summary statistics

#### Lab Exercise: Structuring Auckland Urban Data with Pandas

**Duration:** 2 hours

Students work with real Auckland datasets to build proficiency in data manipulation:

1. **Data Loading and Exploration**
   - Download or receive a sample dataset (Auckland footfall, air quality, crime, or traffic)
   - Load into pandas DataFrame using read_csv()
   - Explore structure with head(), info(), describe()
   - Identify data types, missing values, and outliers

2. **Data Structure Creation**
   - Create lists of suburb names and corresponding statistics
   - Build dictionaries mapping postcodes to neighbourhood attributes
   - Store coordinate tuples for major Auckland landmarks
   - Combine into a nested structure for multi-suburb analysis

3. **DataFrame Filtering and Selection**
   - Filter data by geographic region (e.g., all observations in CBD)
   - Select time periods (e.g., peak hours, weekdays only)
   - Use boolean indexing to identify records meeting multiple criteria
   - Calculate counts of matching records

4. **Summary Statistics**
   - Calculate mean, median, min, max for numeric columns
   - Group by categorical column (e.g., by suburb or time period)
   - Compute percentage change over time
   - Create pivot tables for cross-tabulation analysis

5. **Data Cleaning**
   - Identify and handle missing values (NaN)
   - Remove or impute incomplete records
   - Rename columns for clarity
   - Verify data integrity after transformations

6. **Challenge Exercise**
   - Identify Auckland's top 5 suburbs by footfall
   - Correlate air quality with traffic volume across suburbs
   - Create a summary table showing mean statistics per suburb

#### Required Readings and Resources

- **Mandatory:** McKinney, W. (2022). *Python for Data Analysis* (3rd ed.). O'Reilly. Chapters 4–6.
- **Pandas Documentation:** [pandas.pydata.org/docs/](https://pandas.pydata.org/docs/)
- **Real Data Sources:** AT Metro, LAWA, Stats NZ open data portals
- **Example Dataset:** Prepared CSV files with Auckland transport and environmental data

#### Key Concepts

- Lists: creation, indexing, slicing, methods, comprehensions
- Dictionaries: key-value pairs, nested structures, methods
- Tuples: immutability, unpacking, use as dictionary keys
- Nested data structures for complex relationships
- Pandas Series: one-dimensional labelled arrays
- Pandas DataFrame: two-dimensional tabular data with indices and columns
- Reading CSV data: pandas.read_csv() and parameters
- DataFrame exploration: head(), tail(), info(), describe(), shape, dtypes
- Indexing: .loc[] (label-based), .iloc[] (integer-based), direct column access
- Boolean indexing: filtering with conditions
- Basic operations: arithmetic, sorting, ranking
- GroupBy: aggregation and summarisation
- Handling missing data: identifying NaN, dropna(), fillna()

---

### Week 4: Mid-Semester Test & Statistical Methods

**Lecture Topic:** Assessment & Statistical Methods

#### Learning Objectives

- Synthesise Weeks 1–3 content in a timed assessment
- Demonstrate debugging and problem-solving skills
- Apply statistical concepts to geospatial data
- Visualise data distributions using boxplots and maps

#### Lecture Content Outline

1. **Code Debugging Strategies**
   - Reading error messages and tracebacks
   - Common syntax and logical errors
   - Using print statements for diagnosis
   - Debugging tools and Python debugger (pdb)

2. **Conditional Logic Evaluation**
   - Tracing through if-elif-else structures
   - Identifying incorrect boolean expressions
   - Fixing operator precedence errors

3. **Data Import and Cleaning**
   - Handling file paths and encoding issues
   - Verifying successful data loading
   - Type checking and conversion
   - Addressing missing and invalid values

4. **Descriptive Statistics**
   - Measures of central tendency (mean, median, mode)
   - Measures of spread (variance, standard deviation, IQR)
   - Quartiles and percentiles
   - Detecting outliers using IQR method

5. **Data Visualisation**
   - Boxplots for distribution visualisation
   - Histograms for frequency analysis
   - Scatter plots for relationships
   - Choropleth maps with folium and Jenks Natural Breaks

6. **Jenks Natural Breaks Classification**
   - Algorithm principles and interpretation
   - Optimal classification for geospatial data
   - Minimising variance within classes, maximising between classes
   - Application to Auckland suburb statistics

7. **Missing Data Handling**
   - Identifying missing value patterns
   - Forward fill (ffill) for time series
   - Mean/median imputation for cross-sectional data
   - Interpolation for continuous data
   - Decisions about deletion vs. imputation

#### Lab Exercise: Mid-Semester Test

**Duration:** 2 hours (timed assessment)

**Section 1: Algorithms & Code Debugging (30 minutes)**

Students receive broken Python scripts with conditional logic errors and are asked to:
- Identify syntax and logical errors
- Explain what the code is intended to do
- Fix the errors and verify correct output
- Example: A script that filters Auckland bus stops by distance threshold contains incorrect boolean operators

**Section 2: Data Import, Analysis & Visualisation (60 minutes)**

Students are provided with a real Auckland dataset (e.g., footfall data for shopping centres, traffic congestion by suburb, or air quality measurements) and must:
1. Load the CSV file into a pandas DataFrame
2. Explore the data: check shape, dtypes, missing values
3. Calculate descriptive statistics: mean, median, std dev by suburb or region
4. Create a boxplot visualising distribution across categories (e.g., footfall by shopping centre)
5. Use the Jenks Natural Breaks algorithm to classify data into 4–5 categories
6. Create a choropleth map using folium with Jenks-classified data, displaying Auckland suburbs with colour-coded values
7. Provide interpretation: which suburbs are outliers? What patterns emerge?

**Section 3: Statistical Imputation (30 minutes)**

Students receive a geospatial time-series dataset with missing values (e.g., daily air quality readings or hourly traffic counts) and must:
1. Identify missing data patterns (MCAR, MAR, MNAR)
2. Apply appropriate imputation: forward fill for time series, or mean imputation for cross-sectional gaps
3. Justify imputation method choice
4. Verify post-imputation data integrity
5. Calculate statistics before and after imputation to assess impact

#### Required Readings and Resources

- **Mandatory:** McKinney, W. (2022). *Python for Data Analysis* (3rd ed.). O'Reilly. Chapter 7 (Data Cleaning and Preparation).
- **Statistical Foundation:** Walpole, R.E., Myers, R.H., Myers, S.L., & Ye, K. (2021). *Probability and Statistics for Engineers and Scientists* (10th ed.).
- **Jenks Classification:** Jenks, G.F. (1967). "The Data Model Concept in Statistical Mapping." *International Yearbook of Cartography*, 7, 186–190.
- **Folium Documentation:** [python-visualization.github.io/folium/](https://python-visualization.github.io/folium/)
- **Missing Data:** Rubin, D.B. (1976). "Inference and Missing Data." *Biometrika*, 63(3), 581–592.

#### Key Concepts

- Code debugging: reading tracebacks, identifying errors
- Conditional logic: evaluating boolean expressions
- Data import: handling files, encoding, errors
- Descriptive statistics: mean, median, std dev, quartiles, IQR
- Outlier detection: IQR method, z-scores
- Data visualisation: boxplots, histograms, scatter plots
- Jenks Natural Breaks algorithm: principles and application
- Choropleth mapping with folium
- Missing data mechanisms: MCAR, MAR, MNAR
- Imputation strategies: deletion, forward fill, mean/median, interpolation
- Assessing imputation impact and data quality

---

### Week 5: Functions & Web APIs

**Lecture Topic:** Function Definition, Scope, and Introduction to APIs

#### Learning Objectives

- Define and call functions with parameters and return values
- Understand function scope and variable lifetime
- Use built-in and imported functions effectively
- Introduce HTTP requests and API fundamentals
- Retrieve geospatial data from public APIs

#### Lecture Content Outline

1. **Function Definition**
   - Def keyword and function syntax
   - Parameters and arguments
   - Default parameter values
   - Variable-length arguments (*args, **kwargs)

2. **Return Values**
   - Single and multiple return values
   - Return None and side effects
   - Tuple unpacking of return values

3. **Scope and Namespaces**
   - Local, enclosing, global, and built-in scopes (LEGB rule)
   - Global and nonlocal keywords
   - Variable lifetime and garbage collection
   - Avoiding global state

4. **Built-In Functions**
   - len(), sum(), min(), max(), sorted()
   - enumerate() for index-value pairs
   - zip() for parallel iteration
   - map() and filter() for functional programming

5. **Docstrings and Documentation**
   - Writing docstrings (Google and NumPy styles)
   - Extracting docstrings with help() and __doc__
   - Generating documentation from docstrings

6. **API Fundamentals**
   - REST architecture principles
   - HTTP methods: GET, POST, PUT, DELETE
   - Status codes: 200, 400, 404, 500
   - Request headers and response formatting

7. **Making HTTP Requests**
   - Requests library: get(), post()
   - Query parameters and URL construction
   - Timeouts and retries
   - Authentication: API keys, OAuth

8. **Working with JSON**
   - JSON structure: objects and arrays
   - Parsing JSON responses
   - Accessing nested data
   - Converting Python objects to JSON

9. **Geospatial APIs**
   - OpenStreetMap API: querying geographic features
   - Google Maps API: geocoding, directions, distance matrix
   - AT Metro API: real-time transport data
   - LAWA API: environmental monitoring data

#### Lab Exercise: Building Functions and Fetching Auckland Data from APIs

**Duration:** 2 hours

Students write reusable functions and integrate external data sources:

1. **Writing Spatial Functions**
   - Write a function: calculate_distance(lat1, lon1, lat2, lon2) that returns Euclidean distance in kilometres
   - Write a function: classify_congestion(speed_kmh) that returns "free flow", "congested", or "gridlock"
   - Write a function: filter_by_distance(coordinates_list, reference_point, threshold) that filters locations
   - Include docstrings explaining parameters, return values, and examples

2. **API Authentication and Requests**
   - Register for a free API key (OpenStreetMap, Google Maps, or AT Metro)
   - Construct API request URLs with parameters
   - Send GET request using requests library
   - Handle response status codes and errors

3. **Parsing API Responses**
   - Fetch geospatial data from OpenStreetMap (e.g., bus stops, cycling infrastructure)
   - Parse JSON response and extract relevant fields
   - Handle nested JSON structures
   - Convert API response to pandas DataFrame

4. **Practical Exercise: Auckland Transport Analysis**
   - Use AT Metro API to fetch real-time bus data for Auckland city centre
   - Write function: get_nearest_stops(latitude, longitude, num_stops=5) that calls API and returns nearest bus stops
   - Integrate results with distance calculation function
   - Create visualisation: map of nearest stops with distances

5. **Error Handling**
   - Implement try-except blocks for API calls
   - Handle connection timeouts, invalid API keys, missing data
   - Provide informative error messages
   - Implement retry logic with exponential backoff

6. **Challenge Exercise**
   - Build a function that geocodes an Auckland address using Google Maps API
   - Chain functions: geocode address → find nearest bus stops → calculate travel distance
   - Demonstrate reusability by applying to multiple addresses

#### Required Readings and Resources

- **Mandatory:** Lutz, M. (2013). *Learning Python* (5th ed.). O'Reilly. Chapters 16–18.
- **API Documentation:**
  - [Requests Library](https://docs.python-requests.org/)
  - [OpenStreetMap API](https://wiki.openstreetmap.org/wiki/API)
  - [Google Maps API](https://developers.google.com/maps)
  - [AT Metro API](https://api.at.govt.nz/)
- **JSON Handling:** [json.org](https://www.json.org/)
- **REST API Best Practices:** Richardson, L., & Amundsen, M. (2013). *RESTful Web APIs*.

#### Key Concepts

- Function definition: def keyword, parameters, return statements
- Parameters: positional, keyword, default values
- *args and **kwargs: variable-length arguments
- Return values: single, multiple, tuple unpacking
- Scope and namespaces: LEGB rule
- Global and nonlocal keywords
- Built-in functions: len, sum, min, max, sorted, enumerate, zip, map, filter
- Docstrings: Google style, NumPy style
- Type hints and function annotations
- REST architecture and HTTP methods
- HTTP status codes and error handling
- Request headers and authentication
- JSON structure and parsing
- Requests library: get(), post(), parameters, headers, timeout
- API integration patterns and workflows

---

### Week 6: Interactive Web Applications — Shiny Part 1

**Lecture Topic:** Introduction to Shiny (PyShiny or Shinylive) and UI Design

#### Learning Objectives

- Understand reactive programming paradigms
- Design interactive user interfaces with input and output components
- Build a basic Shiny app with Auckland congestion charging data
- Understand layout and theming
- Deploy apps to web servers

#### Lecture Content Outline

1. **Reactive Programming Concepts**
   - Reactive vs. imperative programming
   - Event-driven architecture
   - Dependencies and automatic updates
   - Isolating side effects

2. **Shiny Architecture**
   - User interface (UI) definition
   - Server-side logic and reactivity
   - Two-way data binding
   - Client-server communication

3. **Input Components**
   - selectInput: dropdown menus for zone selection
   - sliderInput: range selections for dates or thresholds
   - checkboxInput: boolean toggles
   - dateRangeInput: temporal filtering
   - textInput and numericInput
   - fileInput: data upload capabilities

4. **Output Components**
   - tableOutput and renderTable: dynamic tables
   - plotOutput and renderPlot: matplotlib/ggplot visualisations
   - leafletOutput and renderLeaflet: interactive maps
   - textOutput and renderText: dynamic text
   - uiOutput and renderUI: conditional UI

5. **Reactive Expressions**
   - reactive() for reusable computations
   - observe() for side effects
   - Dependency tracking and invalidation
   - Performance optimisation

6. **Layouts and Themes**
   - Page layouts: fluidPage, fixedPage, navbarPage
   - Row and column layouts for responsive design
   - Sidebar layouts for common UI patterns
   - Bootstrap themes and customisation

7. **Auckland Congestion Charging Context**
   - Congestion charging zone (CCZ) boundaries
   - Pricing structure by time and day
   - Real-time traffic data
   - OD flows and congestion impacts

#### Lab Exercise: Building Your First Shiny App — Auckland Congestion Charging Explorer

**Duration:** 2 hours

Students create an interactive web application exploring Auckland's congestion charging system:

1. **Project Setup**
   - Create a new Shiny project directory
   - Install PyShiny and dependencies (folium, pandas, geopandas)
   - Set up basic app.py structure

2. **User Interface Design**
   - Create sidebarLayout with input controls:
     - selectInput: choose congestion charging zone
     - dateRangeInput: select analysis period
     - checkboxInput: filter by vehicle type (car, truck, motorcycle)
     - sliderInput: congestion threshold (0–100%)
   - Design output areas:
     - tabPanel: Summary statistics (revenue, vehicles, congestion)
     - tabPanel: Interactive map showing CCZ boundaries
     - tabPanel: Time-series plot of congestion over selected period

3. **Server-Side Logic**
   - Load sample Auckland CCZ data (shape file or GeoJSON)
   - Write reactive expressions to filter data by selected zone and date range
   - Calculate summary statistics: total revenue, vehicle counts, average congestion
   - Prepare data for visualisation

4. **Interactive Mapping**
   - Use folium (with shiny-leaflet integration) to display:
     - CCZ polygon boundaries with colour coding
     - Charge rate information in popup
     - Traffic volume heatmap overlaid on zones
   - Update map reactively when inputs change

5. **Data Visualisation**
   - Create time-series plot: congestion over time for selected zone
   - Update dynamically as user selects different zones
   - Add reference lines for policy thresholds

6. **Table Output**
   - Display table with detailed congestion data by hour
   - Show vehicles by category, revenue by zone
   - Reactive filtering based on user selections

7. **Deployment**
   - Deploy to local server for testing
   - Verify responsiveness and performance
   - Document app usage in README

#### Required Readings and Resources

- **Mandatory:** Posit Shiny Documentation: [shiny.posit.co/py/](https://shiny.posit.co/py/)
- **Reactive Programming:** Chang, W. (2020). *Mastering Shiny*. O'Reilly. (Available free online)
- **Auckland Data:** AT congestion charging zone information and traffic data
- **Leaflet Integration:** [folium](https://python-visualization.github.io/folium/) and [shiny-leaflet](https://github.com/posit-dev/py-shiny-leaflet)
- **UI/UX Design:** Nielsen, J., & Norman, D.A. (2015). *Usability 101: Introduction to Usability*.

#### Key Concepts

- Reactive programming paradigm
- Event-driven architecture and data flow
- Shiny app structure: ui, server, shinyApp
- Input components: selectInput, sliderInput, checkboxInput, dateRangeInput, textInput, numericInput, fileInput
- Output components: tableOutput, plotOutput, leafletOutput, textOutput, uiOutput
- Render functions: renderTable, renderPlot, renderLeaflet, renderText, renderUI
- Reactive expressions: reactive(), observe(), observeEvent()
- Dependency tracking and invalidation
- Layouts: fluidPage, fixedPage, navbarPage, sidebarLayout, flowLayout
- Bootstrap grid system: fluidRow, column
- Theming and CSS customisation
- Interactive mapping with folium and leaflet
- Performance optimisation for large datasets
- Debugging reactive applications

---

### Week 7: Interactive Web Applications — Shiny Part 2

**Lecture Topic:** Advanced Shiny: Reactivity, Modules, and OD Matrices

#### Learning Objectives

- Implement complex reactive logic and side effects
- Use Shiny modules for code organisation and reusability
- Visualise origin-destination (OD) matrices for transport analysis
- Handle large datasets efficiently in Shiny apps
- Integrate multiple data sources

#### Lecture Content Outline

1. **Advanced Reactive Patterns**
   - observeEvent() for explicit event handling
   - eventReactive() for reactive values triggered by events
   - isolate() for breaking reactive dependencies
   - debounce() and throttle() for performance

2. **Shiny Modules**
   - Module architecture and composition
   - moduleUI() and moduleServer()
   - Scoping and namespacing
   - Reusable component design
   - Module communication patterns

3. **Origin-Destination (OD) Matrices**
   - OD matrix structure and interpretation
   - Commute flows and movement patterns
   - Travel demand and peak hour analysis
   - OD data for Auckland transport

4. **Advanced Visualisation**
   - Chord diagrams: showing flow relationships
   - Flow maps: directional movement visualisation
   - Animated maps: temporal evolution of flows
   - Heatmaps: intensity of movement patterns

5. **Large Dataset Handling**
   - Data aggregation and sampling strategies
   - Lazy loading and pagination
   - Client-side vs. server-side filtering
   - Caching computed results
   - Database integration for persistent storage

6. **Multiple Data Source Integration**
   - Loading from APIs in background
   - Combining real-time and static data
   - Synchronising updates across sources
   - Error handling for missing data

#### Lab Exercise: Origin-Destination Matrix Explorer for Auckland Transport

**Duration:** 2 hours

Students extend their Shiny app from Week 6 to visualise Auckland transport movements:

1. **OD Data Preparation**
   - Load Auckland OD matrix data (commute flows between suburbs)
   - Parse data structure: origin zone, destination zone, flow volume
   - Calculate statistics: total flows, peak flows, average distance

2. **Module Architecture**
   - Create modules for reusability:
     - filterModule: input controls for zone selection and filtering
     - mapModule: interactive mapping output
     - statModule: summary statistics calculation and display
   - Implement module communication for linked filtering

3. **Chord Diagram Visualisation**
   - Create interactive chord diagram showing OD flows
   - Display connections between suburbs (origins to destinations)
   - Colour code by flow volume
   - Update reactively when user selects zone or time period

4. **Flow Map Visualisation**
   - Create flow map with directional arrows showing movement
   - Arrow width proportional to volume
   - Colour coding by vehicle type (car, bus, bike) or speed
   - Animate temporal evolution during peak hours

5. **Filter Implementation**
   - Vehicle type filter: car, bus, bicycle, pedestrian
   - Time period filter: peak hour, off-peak, weekday/weekend
   - Origin/destination zone selection
   - Distance threshold filter

6. **Performance Optimisation**
   - Aggregate large OD matrices to reduce data size
   - Cache computed statistics
   - Use debounce() to reduce update frequency
   - Lazy load map layers
   - Monitor memory usage

7. **Integration and Testing**
   - Connect modules together in main app
   - Verify filters update all outputs correctly
   - Test with various data subsets
   - Document module interfaces

#### Required Readings and Resources

- **Mandatory:** Posit Shiny Documentation: [Advanced Patterns](https://shiny.posit.co/py/docs/reactive.html)
- **Modules:** Posit Guide: [Shiny Modules](https://shiny.posit.co/py/docs/modules.html)
- **OD Matrix Analysis:** Ortúzar, J.D., & Willumsen, L.G. (2011). *Modelling Transport* (4th ed.). Wiley.
- **Chord Diagrams:** [plotly express](https://plotly.com/python/)
- **Flow Visualisation:** [Kepler.gl](https://kepler.gl/) or custom implementations

#### Key Concepts

- Advanced reactive patterns: observeEvent, eventReactive, isolate
- Debouncing and throttling for performance
- Shiny modules: moduleUI, moduleServer, namespace isolation
- Module composition and communication
- OD matrix structure and manipulation
- Chord diagrams and flow visualisations
- Animated maps and temporal visualisation
- Data aggregation and sampling
- Lazy loading and pagination
- Caching strategies
- Database integration (SQLite, PostgreSQL)
- Error handling and validation
- Testing modules independently

---

### Week 8: Advanced Shiny & Publishing

**Lecture Topic:** Polishing Apps, Testing, and Deployment

#### Learning Objectives

- Refine app performance and user experience
- Implement testing for Shiny applications
- Deploy apps to production environments
- Handle user authentication and data privacy
- Document and maintain application code

#### Lecture Content Outline

1. **User Experience (UX) Design**
   - Accessibility standards (WCAG)
   - Colour contrast and inclusive design
   - Navigation and information hierarchy
   - Responsive design for mobile devices

2. **Input Validation and Error Handling**
   - validate() and need() for input validation
   - Informative error messages
   - Recovering from errors gracefully
   - User feedback and status indicators

3. **Help and Documentation**
   - Modal dialogs and tooltips
   - Help panels and documentation tabs
   - Contextual help based on user actions
   - Accessibility-friendly documentation

4. **Testing Shiny Applications**
   - testServer() for server logic testing
   - recordTest() for recording interactions
   - Snapshot testing for UI consistency
   - Integration testing with Selenium

5. **Debugging Tools**
   - browser() for interactive debugging
   - reactlog for visualising reactive dependencies
   - Performance profiling with Shiny
   - Console and logging output

6. **Deployment Strategies**
   - shinyapps.io: cloud hosting
   - Shiny Server: self-hosted option
   - Docker containerisation
   - GitHub Pages with Shinylive

7. **Security Considerations**
   - Protecting sensitive data (API keys, credentials)
   - Input sanitisation for injection prevention
   - User authentication and authorisation
   - HTTPS and secure communication

8. **Monitoring and Maintenance**
   - Application logs and error tracking
   - Performance monitoring
   - Version management and updates
   - User feedback channels

#### Lab Exercise: Publishing Your Congestion Charging & OD Explorer App

**Duration:** 2 hours

Students refine and deploy their Shiny applications:

1. **UI/UX Improvements**
   - Audit current design against WCAG standards
   - Improve colour contrast and readability
   - Add responsive design for tablet and mobile viewing
   - Implement tooltips for complex features
   - Organise controls into logical groups

2. **Input Validation**
   - Add validate() checks for all user inputs
   - Implement needful() for required selections
   - Display informative error messages
   - Provide guidance on valid input ranges
   - Test with invalid data (negative values, missing fields)

3. **Documentation and Help**
   - Create a "Help" tab with usage instructions
   - Explain congestion charging zones and OD data
   - Provide examples and common questions
   - Add glossary for technical terms
   - Ensure documentation is accessible and clear

4. **Testing Implementation**
   - Write unit tests for server logic using testServer()
   - Test reactive expressions and calculations
   - Verify output formatting and filtering logic
   - Record interaction patterns with recordTest()
   - Achieve >80% code coverage

5. **Performance Optimisation**
   - Profile app to identify bottlenecks
   - Cache expensive computations
   - Implement lazy loading for map tiles
   - Reduce data payload for initial load
   - Measure page load times

6. **Deployment to shinyapps.io**
   - Create shinyapps.io account
   - Configure deployment from local environment
   - Deploy app and verify functionality
   - Monitor deployment logs for errors
   - Gather usage metrics and performance data

7. **Documentation and README**
   - Write comprehensive README.md
   - Include installation and setup instructions
   - Provide usage examples and screenshots
   - Document dependencies and version requirements
   - Add troubleshooting section

8. **Feedback and Iteration**
   - Share deployed app with peers or instructors
   - Collect feedback on usability and features
   - Document improvements for future versions
   - Plan for maintenance and updates

#### Required Readings and Resources

- **Mandatory:** Posit Shiny Documentation: [Testing](https://shiny.posit.co/py/docs/testing.html)
- **Testing:** [Shiny App Testing Handbook](https://shiny.posit.co/r/articles/test/testing-overview/)
- **Deployment:** [Shiny Deployment Guide](https://posit.co/products/open-source/shinyserver/)
- **Docker:** [Docker documentation](https://docs.docker.com/)
- **Security:** OWASP Top 10 Web Application Security Risks
- **UX Design:** Nielsen Norman Group resources on accessibility and usability

#### Key Concepts

- Accessibility standards and WCAG compliance
- Responsive design and mobile optimisation
- Input validation: validate(), need(), showNotification()
- Error handling and user feedback
- Modal dialogs and tooltips for help
- Testing Shiny apps: testServer, recordTest, snapshot testing
- Debugging: browser(), reactlog, performance profiling
- Deployment platforms: shinyapps.io, Shiny Server, Docker
- CI/CD pipelines for automated deployment
- Security: authentication, authorisation, data protection
- Logging and monitoring
- Version control and changelog maintenance
- Documentation and user guides

---

### Week 9: Python Package Development — Part 1: Foundations

**Lecture Topic:** Package Structure, uv Tool, and Version Control

#### Learning Objectives

- Understand Python package structure and conventions
- Use `uv` tool for project and dependency management
- Initialise a package project with proper layout
- Manage versions, dependencies, and metadata
- Use git for version control and collaboration

#### Lecture Content Outline

1. **Python Package Structure**
   - Flat vs. src layouts
   - __init__.py files and package initialisation
   - Module organisation and naming conventions
   - Top-level directories: src, tests, docs, examples

2. **pyproject.toml and Package Metadata**
   - PEP 517/518 build system declaration
   - Project metadata: name, version, description, authors
   - Dependencies and optional dependencies
   - Dependency version constraints and pinning
   - Entry points and CLI interfaces
   - Python version specification

3. **uv Tool Fundamentals**
   - Creating new projects: uv new
   - Managing dependencies: uv add, uv remove
   - Synchronising environment: uv sync
   - Running scripts and tests: uv run
   - Building packages: uv build

4. **Virtual Environment Management**
   - Purpose and isolation benefits
   - Creating and activating environments
   - Dependency installation and reproducibility
   - Cleaning and removing environments

5. **Git Basics for Collaboration**
   - Initialising repositories: git init
   - Staging and committing changes
   - Branches for feature development
   - Merging and conflict resolution
   - Remote repositories (GitHub)

6. **Version Control Best Practices**
   - Meaningful commit messages
   - Logical grouping of changes
   - .gitignore for excluding files
   - README and documentation in repos
   - Collaborative workflows

7. **Auckland Transport/Mobility Context**
   - Option A: Network Analysis Package (for transport networks)
     - Analysing shortest paths (Dijkstra's algorithm)
     - Network centrality measures (betweenness, closeness)
     - Accessibility analysis
     - Integration with OpenStreetMap data
   - Option B: Micromobility Package (for bike/scooter sharing)
     - Trip analysis and patterns
     - Station utilisation and demand forecasting
     - Rebalancing algorithms
     - Impact analysis for Auckland

#### Lab Exercise: Initialising Your Package Project with uv

**Duration:** 2 hours (Pair Work)

Students establish the foundation for a production-quality Python package:

1. **Project Setup**
   - Choose Option A (Network Analysis) or Option B (Micromobility)
   - Create new project: `uv new my_package_name`
   - Review generated directory structure

2. **Package Metadata Configuration**
   - Edit pyproject.toml with project details:
     - Name: descriptive package name (e.g., auckland-net-tools or auckland-mobility)
     - Version: 0.1.0 (semantic versioning)
     - Description: 2–3 sentence overview
     - Authors and contact information
   - Add keywords and classifiers (topic, license, development stage)
   - Specify Python version requirement (>=3.11)

3. **Dependency Declaration**
   - Add core dependencies: geopandas, networkx, pandas, folium, requests
   - Use `uv add package_name` to add each dependency
   - Review dependency tree and compatibility
   - Specify version constraints (e.g., pandas>=2.0,<3.0)
   - Add development dependencies: pytest, black, ruff, sphinx

4. **Git Initialisation**
   - Create .gitignore file (Python template)
   - Initialise git repository: git init
   - Make initial commit with boilerplate
   - Create GitHub repository and add remote
   - Push initial commits

5. **Project Structure**
   - Verify src layout with src/my_package/ directory
   - Create __init__.py files in package
   - Create subdirectories for modules (e.g., analysis, data, utils)
   - Arrange tests in tests/ directory

6. **Documentation Start**
   - Create README.md with:
     - Project title and description
     - Installation instructions
     - Basic usage example
     - Links to documentation and issues
   - Create CONTRIBUTING.md outlining development process
   - Create LICENSE file (MIT or Apache 2.0)

7. **First Commits**
   - Stage all files: `git add .`
   - Commit with message: "Initial project setup with uv"
   - Make second commit: "Add README and package metadata"
   - Push to GitHub

8. **Verification**
   - Run `uv sync` to verify environment creation
   - Test import: `uv run python -c "import my_package"`
   - Verify all pair members can clone and set up locally

#### Required Readings and Resources

- **Mandatory:** Posit Packaging Guide: [Python Packages](https://py-pkgs.org/)
- **uv Documentation:** [astral-sh/uv](https://github.com/astral-sh/uv)
- **PEP References:**
   - [PEP 517: Build System Interface](https://www.python.org/dev/peps/pep-0517/)
   - [PEP 518: Specifying Minimum Build System](https://www.python.org/dev/peps/pep-0518/)
   - [PEP 440: Version Identification](https://www.python.org/dev/peps/pep-0440/)
- **Git Documentation:** [git-scm.com](https://git-scm.com/book/en/v2)
- **GitHub Collaboration:** GitHub Guides: [Hello World](https://guides.github.com/activities/hello-world/)
- **Semantic Versioning:** [semver.org](https://semver.org/)

#### Key Concepts

- Python package structure: flat vs. src layout
- __init__.py and package initialisation
- Module naming and organisation
- pyproject.toml: build system, project metadata, dependencies
- PEP 517/518 standards
- Dependency specification and version constraints
- Optional dependencies and extras
- Entry points for CLI tools
- uv commands: new, add, remove, sync, run, build
- Virtual environments and isolation
- Git workflow: init, add, commit, push
- Branching and merging
- .gitignore for Python projects
- README and documentation basics
- Semantic versioning: MAJOR.MINOR.PATCH
- Collaborative development practices

---

### Week 10: Python Package Development — Part 2: Core Implementation

**Lecture Topic:** Writing Modules, Classes, and Testing

#### Learning Objectives

- Organise code into logical modules and packages
- Write classes and methods for reusable components
- Implement comprehensive unit tests
- Use assertions and test fixtures
- Follow PEP 8 style guidelines and use linters

#### Lecture Content Outline

1. **Module and Package Organisation**
   - Logical grouping of related functionality
   - Single responsibility principle
   - Circular import prevention
   - __all__ for public API definition

2. **Object-Oriented Design**
   - Classes and objects in Python
   - Attributes and methods
   - Encapsulation and naming conventions
   - Inheritance and polymorphism
   - Composition over inheritance

3. **Special Methods**
   - __init__: object initialisation
   - __repr__: unambiguous representation
   - __str__: user-friendly representation
   - __eq__, __lt__: comparison operators
   - __len__, __getitem__: container protocols

4. **Testing with pytest**
   - Test structure and naming conventions
   - assert statements and equality
   - Fixtures for setup and teardown
   - Parametrisation for multiple test cases
   - Mocking and patching external dependencies
   - Test coverage measurement

5. **Code Quality Tools**
   - black: code formatting
   - ruff: linting and error detection
   - mypy: static type checking
   - Coverage: measuring test coverage

6. **Documentation with Docstrings**
   - Google style docstrings
   - NumPy style docstrings
   - Parameter descriptions and type hints
   - Generating API documentation from docstrings

7. **Option A: Network Analysis Package Design**
   - Graph class: representing transport networks
   - Pathfinding module: shortest paths (Dijkstra)
   - Centrality module: betweenness, closeness, pagerank
   - Data module: importing from OSM, shapefiles
   - Utilities: distance calculations, coordinate transformations

8. **Option B: Micromobility Package Design**
   - Trip class: individual trip records
   - Station class: station attributes and utilisation
   - Fleet class: aggregated fleet statistics
   - Demand module: forecasting and patterns
   - Rebalancing module: algorithms for station balancing

#### Lab Exercise: Implementing Core Functionality and Writing Tests

**Duration:** 3 hours (Pair Work)

Students implement core package functionality with comprehensive testing:

1. **Core Class Implementation (Option A: Network Analysis)**
   - Implement Graph class:
     - __init__: load from GeoDataFrame (OSM data)
     - add_node, add_edge methods
     - __len__, __repr__ special methods
     - find_shortest_path using Dijkstra's algorithm
   - Implement analysis functions:
     - calculate_betweenness_centrality
     - calculate_closeness_centrality
     - identify_critical_edges
   - Document with comprehensive docstrings

   **OR**

   **Core Class Implementation (Option B: Micromobility)**
   - Implement Trip class:
     - __init__: trip record with origin, destination, duration
     - __repr__, __eq__ for comparisons
     - Methods: trip_distance(), trip_speed(), time_of_day()
   - Implement Station class:
     - __init__: station location and capacity
     - Methods: utilisation_rate(), demand_at_time(), rebalance()
   - Implement Fleet class:
     - __init__: collection of stations and trips
     - aggregate_trips(): summarise by station pair
     - forecast_demand: predict future patterns

2. **Unit Test Suite**
   - Create tests/test_graph.py (or tests/test_trip.py)
   - Write fixtures for sample data (small Auckland network or trip dataset)
   - Test class initialisation and attributes
   - Test core methods: shortest path, centrality calculations
   - Test edge cases: empty graphs, disconnected nodes, invalid inputs
   - Use parametrisation for multiple test scenarios

3. **Test Coverage**
   - Run coverage measurement: `uv run pytest --cov=my_package`
   - Target >80% code coverage
   - Identify untested code paths
   - Add tests for uncovered branches

4. **Code Quality**
   - Run black formatter: `uv run black src/`
   - Run ruff linter: `uv run ruff check src/`
   - Fix all linting issues
   - Verify code adheres to PEP 8

5. **Type Hints**
   - Add type hints to function signatures
   - Specify return types
   - Use typing module for complex types (List, Dict, Optional, Union)
   - Run mypy: `uv run mypy src/`
   - Resolve type errors

6. **Integration Testing**
   - Load real Auckland dataset (OSM or transport data)
   - Test workflow: load data → create graph → run analysis
   - Verify results are reasonable
   - Document known limitations (e.g., algorithm complexity)

7. **Documentation**
   - Expand docstrings with examples
   - Create examples/ directory with usage scripts
   - Test examples in docstrings (doctest)
   - Build HTML documentation (preview)

#### Required Readings and Resources

- **Mandatory:** Goodger, D., & Rossum, G.V. (2001). PEP 257 – Docstring Conventions
- **pytest Documentation:** [docs.pytest.org](https://docs.pytest.org/)
- **Real Python:** "Unit Testing in Python with pytest" and "Type Checking in Python"
- **OOP Design:** Martin, R.C. (2008). *Clean Code*. Prentice Hall.
- **Black Documentation:** [black.readthedocs.io](https://black.readthedocs.io/)
- **Ruff:** [astral-sh.ruff](https://docs.astral.sh/ruff/)
- **mypy:** [mypy.readthedocs.io](https://mypy.readthedocs.io/)
- **Auckland Data:** OSM exports, Stats NZ census, AT Metro API

#### Key Concepts

- Module and package organisation
- Single responsibility principle
- Classes and objects: attributes, methods, state
- Inheritance: base classes, method overriding, super()
- Polymorphism and duck typing
- Special methods: __init__, __repr__, __str__, __eq__, __len__, __getitem__
- Property decorators for computed attributes
- pytest framework: test functions, assertions, fixtures
- Test parametrisation and multiple scenarios
- Mocking and patching for testing dependencies
- Test coverage measurement and targets
- Code formatting with black
- Linting with ruff: error categories and rules
- Type checking with mypy: type hints and annotations
- Docstrings: Google style and NumPy style
- Doctest for testing documentation examples
- Test discovery and organisation
- Continuous integration setup (GitHub Actions)

---

### Week 11: Python Package Development — Part 3: Advanced Features

**Lecture Topic:** Documentation, API Design, and Performance

#### Learning Objectives

- Generate professional documentation with Sphinx
- Design intuitive and well-documented APIs
- Optimise code for performance
- Implement logging and error handling
- Consider edge cases and robustness

#### Lecture Content Outline

1. **Sphinx Documentation**
   - Installing Sphinx and configuring conf.py
   - ReStructuredText (RST) formatting
   - API documentation generation from docstrings
   - Building HTML documentation locally
   - Hosting on ReadTheDocs

2. **API Design Principles**
   - Consistency and predictability
   - Simplicity and minimalism
   - Explicit over implicit
   - Backwards compatibility considerations
   - Deprecation and migration paths

3. **Performance Profiling**
   - cProfile for runtime profiling
   - line_profiler for line-by-line analysis
   - Identifying bottlenecks
   - Memory profiling with memory_profiler

4. **Vectorisation with NumPy and Pandas**
   - Avoiding explicit loops
   - NumPy array operations
   - Pandas apply, groupby, and transform
   - Broadcasting for efficiency

5. **Caching Strategies**
   - functools.lru_cache for simple memoisation
   - Custom caching for complex scenarios
   - Cache invalidation strategies
   - Trade-offs: memory vs. speed

6. **Logging and Error Handling**
   - Python logging module configuration
   - Log levels: DEBUG, INFO, WARNING, ERROR, CRITICAL
   - Custom exception classes
   - Informative error messages
   - Graceful degradation

7. **Edge Case Handling**
   - Input validation and type checking
   - Handling None and missing values
   - Empty datasets and edge geometries
   - Boundary conditions and limits
   - Defensive programming techniques

8. **Code Refactoring**
   - Identifying code smells
   - Extracting functions for clarity
   - Reducing cyclomatic complexity
   - Improving readability and maintainability
   - Technical debt assessment

#### Lab Exercise: Polishing Your Package: Documentation and Optimisation

**Duration:** 3 hours (Pair Work)

Students enhance their package with professional documentation and optimisations:

1. **Sphinx Documentation Setup**
   - Initialize Sphinx: `sphinx-quickstart docs/`
   - Configure conf.py for project metadata
   - Set up autodoc extension for API documentation
   - Generate API reference from docstrings
   - Customise theme (e.g., Furo or ReadTheDocs theme)

2. **Documentation Content**
   - Create guide sections:
     - Getting Started: installation and basic usage
     - Tutorials: step-by-step workflows with Auckland data
     - API Reference: auto-generated from docstrings
     - Examples: code samples demonstrating features
     - Glossary: domain-specific terms
   - Build HTML locally: `sphinx-build -b html docs/ docs/_build/html/`

3. **API Design Review**
   - Document public API in __all__
   - Review function signatures for consistency
   - Simplify interfaces by grouping related parameters
   - Rename for clarity (e.g., calculate_centrality vs. centrality)
   - Remove redundant or conflicting methods
   - Add convenience functions for common workflows

4. **Performance Profiling**
   - Identify computational bottlenecks (e.g., shortest path calculation)
   - Use cProfile: `uv run python -m cProfile -s cumtime script.py`
   - Identify functions consuming most time
   - Use line_profiler for detailed line-by-line analysis
   - Record baseline performance metrics

5. **Vectorisation and Optimisation**
   - Replace explicit loops with NumPy/pandas operations
   - Use geopandas spatial operations (dissolve, buffer)
   - Vectorise distance calculations
   - Benchmark before/after optimisations
   - Document performance improvements

6. **Caching Implementation**
   - Identify computationally expensive functions
   - Apply @lru_cache decorator (for pure functions)
   - Implement custom cache for complex scenarios
   - Set reasonable cache size limits
   - Test cache correctness

7. **Logging and Error Handling**
   - Configure logging in package __init__.py
   - Add logging statements throughout code:
     - DEBUG: detailed algorithm steps
     - INFO: major milestones and results
     - WARNING: unusual conditions, recovered errors
     - ERROR: unrecoverable failures
   - Create custom exception classes (e.g., InvalidNetworkError, InsufficientDataError)
   - Provide actionable error messages

8. **Edge Case Testing**
   - Test with empty inputs (no nodes, no stations)
   - Test with invalid data (negative values, missing coordinates)
   - Test boundary conditions (single node, same origin-destination)
   - Test with real Auckland data edge cases
   - Document limitations and assumptions

9. **Code Refactoring**
   - Identify code with high complexity (>10 cyclomatic complexity)
   - Extract helper functions for clarity
   - Reduce parameter lists (create config objects)
   - Improve variable and function naming
   - Add comments for non-obvious logic

#### Required Readings and Resources

- **Mandatory:** Posit Packaging Guide: [Documentation](https://py-pkgs.org/08-documentation.html)
- **Sphinx Documentation:** [sphinx-doc.org](https://www.sphinx-doc.org/)
- **ReadTheDocs:** [readthedocs.org](https://readthedocs.org/)
- **API Design:** Bloch, J. (2018). *Effective Java* (3rd ed.). Addison-Wesley. (Principles apply to Python)
- **Performance:** Gorelick, M., & Ozsvald, I. (2020). *High Performance Python* (2nd ed.). O'Reilly.
- **Code Quality:** McConnell, S. (2004). *Code Complete* (2nd ed.). Microsoft Press.

#### Key Concepts

- Sphinx: configuration, source structure, extensions
- ReStructuredText (RST) formatting
- autodoc for automatic API documentation
- Building and hosting documentation
- ReadTheDocs integration
- API design: consistency, simplicity, predictability
- Performance profiling: cProfile, line_profiler, memory_profiler
- Identifying and fixing bottlenecks
- Vectorisation and NumPy broadcasting
- pandas optimisations: apply, groupby, transform
- Caching: @lru_cache, custom implementations
- Logging module: configuration, levels, handlers
- Custom exception classes and informative messages
- Input validation and type checking
- Edge case handling and defensive programming
- Code refactoring: extracting functions, reducing complexity
- Technical debt identification and management
- Benchmarking: timing and performance metrics

---

### Week 12: Package Release and Collaboration

**Lecture Topic:** Distribution, PyPI, and Open Source Best Practices

#### Learning Objectives

- Prepare a package for public release
- Upload package to PyPI (Python Package Index)
- Manage releases and versioning
- Handle code review and collaborative development
- Contribute to the geospatial Python ecosystem

#### Lecture Content Outline

1. **Building and Packaging**
   - Creating wheel distributions
   - Source distributions (sdist)
   - Build backend configuration (uv build)
   - Verifying build outputs

2. **PyPI and Distribution**
   - Creating PyPI and TestPyPI accounts
   - Uploading packages with twine
   - PyPI metadata and package page
   - Managing versions and releases

3. **Continuous Integration and Deployment**
   - GitHub Actions for automated testing
   - Running tests on multiple Python versions
   - Automated building and publishing
   - Deployment triggers and protection rules

4. **Code Review Practices**
   - Pull request structure and description
   - Reviewer guidelines and feedback
   - Addressing code review comments
   - Collaboration and communication

5. **Semantic Versioning**
   - MAJOR.MINOR.PATCH versions
   - Backwards compatibility considerations
   - Pre-releases and development versions
   - Deprecation policies

6. **Changelog and Release Notes**
   - CHANGELOG.md format and content
   - Documenting new features, bug fixes, breaking changes
   - Release notes for announcements
   - Version history and milestones

7. **Contributing Guidelines**
   - CONTRIBUTING.md file
   - Development setup instructions
   - Code style and standards
   - Testing requirements
   - Documentation expectations

8. **Community Engagement**
   - Issues and bug reporting
   - Feature requests and discussions
   - Responding to users and contributions
   - Building a sustainable project
   - Licensing and legal considerations

#### Lab Exercise: Publishing Your Package and Final Presentations

**Duration:** 4 hours (Pair Work)

Students complete package development lifecycle and present their work:

1. **Final Quality Checks**
   - Run complete test suite: `uv run pytest -v --cov`
   - Verify test coverage >80%
   - Run type checking: `uv run mypy src/`
   - Run linting: `uv run ruff check src/`
   - Format code: `uv run black src/`
   - Build documentation: Sphinx build succeeds

2. **Version and Metadata**
   - Update version in pyproject.toml (e.g., 0.1.0 → 1.0.0)
   - Review package metadata completeness
   - Add keywords and classifiers
   - Verify author and contact information
   - Review README for clarity

3. **CHANGELOG Creation**
   - Create CHANGELOG.md with all releases
   - Document version 1.0.0:
     - New features (e.g., "Network analysis module")
     - Bug fixes (e.g., "Fixed edge case with single-node graphs")
     - Breaking changes (e.g., API changes from alpha)
     - Contributors and acknowledgments

4. **CI/CD Pipeline Setup**
   - Create .github/workflows/tests.yml for GitHub Actions
   - Configure to run on: push, pull requests
   - Test on Python 3.11, 3.12, 3.13
   - Run: tests, linting, type checking, coverage
   - Publish build artifacts

5. **Building Distributions**
   - Build wheel: `uv build --wheel`
   - Build source distribution: `uv build --sdist`
   - Verify distributions: wheel contains all files, sdist is extractable
   - Test installation locally: `pip install dist/my_package-1.0.0-py3-none-any.whl`

6. **PyPI Publishing (TestPyPI First)**
   - Create account on TestPyPI
   - Create ~/.pypirc with token authentication
   - Upload to TestPyPI: `twine upload --repository testpypi dist/*`
   - Verify package on TestPyPI website
   - Test installation from TestPyPI: `pip install --index-url https://test.pypi.org/simple/ my_package`

7. **Publication to PyPI (Production)**
   - Create account on official PyPI
   - Update ~/.pypirc with token
   - Upload to PyPI: `twine upload dist/*`
   - Verify package is live and installable
   - Create GitHub Release with download links

8. **Documentation and Contributing Guide**
   - Create CONTRIBUTING.md with:
     - Development setup (uv sync)
     - Running tests locally
     - Code style and standards
     - Pull request process
     - Reporting bugs and requesting features
   - Create LICENSE file (MIT or Apache 2.0)
   - Create CODE_OF_CONDUCT.md

9. **Final Presentation (10–15 minutes per pair)**
   - Demo the package with real Auckland data examples:
     - Show shortest path routing on Auckland transport network, OR
     - Show demand forecasting for Auckland micromobility system
   - Walk through architecture: key classes and modules
   - Discuss design decisions and trade-offs
   - Show test coverage and documentation
   - Demonstrate CI/CD pipeline
   - Discuss lessons learned and future improvements

10. **Q&A and Peer Feedback**
    - Classmates and instructor ask questions
    - Feedback on functionality, usability, code quality
    - Suggestions for improvement or extension

#### Required Readings and Resources

- **Mandatory:** Python Packaging Guide: [packaging.python.org](https://packaging.python.org/)
- **Building:** PyPA Build: [pypa/build](https://github.com/pypa/build)
- **PyPI:** [PyPI](https://pypi.org/) and [TestPyPI](https://test.pypi.org/)
- **twine:** [twine documentation](https://twine.readthedocs.io/)
- **GitHub Actions:** [docs.github.com/en/actions](https://docs.github.com/en/actions)
- **Semantic Versioning:** [semver.org](https://semver.org/)
- **Keepachangelog:** [keepachangelog.com](https://keepachangelog.com/)
- **Open Source Best Practices:** [opensourceguide.org](https://opensource.guide/)

#### Key Concepts

- Building distributions: wheel, sdist
- uv build and build backends
- PyPI and TestPyPI
- Package uploads and verification
- Package metadata and PyPI page
- GitHub Actions workflow configuration
- Test matrix: multiple Python versions
- Automated testing on push and pull requests
- Semantic versioning: MAJOR.MINOR.PATCH
- Pre-release versions: alpha, beta, rc
- CHANGELOG format and content
- Release notes and announcements
- Pull request code review
- Contributing guidelines
- Issue management: bugs, features, discussions
- Community engagement and sustainability
- Licensing considerations: MIT, Apache 2.0, GPL
- Code of Conduct for inclusive community

---

## Assessment Overview

### Mid-Semester Test (Week 4) — 20% of Final Grade

**Format:** Timed examination (2 hours)

**Sections:**
1. **Code Debugging:** Identify and fix errors in Python code (30 minutes)
2. **Data Analysis:** Import dataset, calculate statistics, create visualisation (60 minutes)
3. **Statistical Methods:** Apply imputation and classification to geospatial data (30 minutes)

**Learning Outcomes Assessed:**
- Write and debug Python code
- Analyse data with pandas
- Apply statistical methods to spatial data
- Create professional visualisations

### Assignment 1: Python Fundamentals — Auckland Urban Data Analysis — 25% of Final Grade

**Due:** End of Week 5

**Type:** Individual

**Description:**

Students complete a comprehensive assignment demonstrating mastery of Python fundamentals. The assignment requires students to select an Auckland dataset (air quality from LAWA, traffic from AT Metro, footfall from commercial sources, or crime statistics from Police NZ), perform exploratory data analysis using pandas, write custom functions for metric calculation, integrate data from a public API, and present findings through visualisations and analysis.

**Deliverables:**

1. Jupyter notebook (.ipynb) containing:
   - Data loading and exploration
   - Data cleaning and handling missing values
   - Summary statistics and basic analysis
   - Custom functions (≥2) for calculating domain-specific metrics
   - At least one API call to retrieve supplementary data
   - At least three visualisations (one folium map required)
   - Markdown cells explaining methodology and findings

2. Accompanying report (2–3 pages, PDF or Markdown):
   - Summary of dataset and research question
   - Key findings and insights
   - Data quality and limitations discussion
   - References to data sources

**Grading Criteria (100 points):**
- Code correctness and functionality (25 points)
- Code style, documentation, and clarity (15 points)
- Data exploration and analysis (25 points)
- Visualisations and communication (20 points)
- Analytical insights and interpretation (15 points)

**Estimated Effort:** 20 hours

### Assignment 2: Interactive Dashboard — Auckland Congestion & Mobility — 25% of Final Grade

**Due:** End of Week 8

**Type:** Individual

**Description:**

Students design, build, and deploy a polished Shiny web application exploring an Auckland transport or urban phenomenon. The application must include multiple interactive input controls, several visualisations (maps, charts, tables), and a responsive layout suitable for desktop and tablet viewing. Students may analyse congestion charging impacts, public transport usage patterns, cycling network coverage, micromobility distribution, or air quality correlations with traffic. The completed app must be deployed to a public server and the code hosted on GitHub.

**Deliverables:**

1. Deployed Shiny application (URL provided):
   - ≥3 input controls (select, slider, checkbox, date range)
   - ≥4 interactive output components (maps, charts, tables)
   - Responsive layout suitable for multiple screen sizes
   - Help/documentation tab
   - Professional styling and colour scheme

2. GitHub repository containing:
   - Complete application code (app.py or ui.R + server.R)
   - Dependency specification (requirements.txt or renv.lock)
   - README.md with usage and deployment instructions
   - Example screenshots in README

3. Written report (5 pages):
   - Problem statement and research objectives
   - Data sources and preparation
   - Application design and technical architecture
   - Features and user interface explanation
   - Deployment and maintenance notes
   - Lessons learned and future improvements

**Grading Criteria (100 points):**
- Application functionality (20 points)
- User interface and experience design (20 points)
- Code quality and organisation (15 points)
- Documentation and README (15 points)
- Report and analysis (20 points)
- Professional presentation and deployment (10 points)

**Estimated Effort:** 25 hours

### Assignment 3: Python Package Development — Auckland Transport/Mobility Tool — 30% of Final Grade

**Due:** End of Week 12

**Type:** Pair Work

**Description:**

Students develop a production-quality Python package addressing a geospatial or transport problem relevant to Auckland. Option A: Network Analysis Package for transport and cycling networks with features such as shortest path routing, network centrality measures, and accessibility analysis. Option B: Micromobility Analytics Package for bike/scooter sharing systems with trip analysis, demand forecasting, and rebalancing algorithms. The package must include comprehensive testing (>80% coverage), professional documentation generated with Sphinx, continuous integration pipeline, and be published to PyPI.

**Deliverables:**

1. Published PyPI Package:
   - Installable via `pip install package_name`
   - Package metadata complete and searchable on PyPI
   - Documented version history and releases
   - Source code available on GitHub

2. GitHub Repository with:
   - Well-organised src layout: src/package_name/
   - Complete test suite in tests/ directory (pytest)
   - Comprehensive documentation in docs/ directory (Sphinx-generated HTML)
   - GitHub Actions CI/CD pipeline (.github/workflows/)
   - CHANGELOG.md documenting all releases
   - CONTRIBUTING.md for potential contributors
   - LICENSE file (MIT or Apache 2.0)
   - README.md with installation, usage, and contribution guidance

3. Code Quality:
   - >80% test coverage (measured with pytest-cov)
   - All tests pass on Python 3.11, 3.12, 3.13
   - Code formatted with black and linted with ruff
   - Type hints and mypy type checking (no errors)
   - Docstrings (Google or NumPy style) for all public APIs

4. Documentation:
   - HTML documentation built with Sphinx
   - API reference auto-generated from docstrings
   - Getting Started guide with installation steps
   - Usage tutorials with real Auckland data examples
   - Performance notes and limitations
   - Glossary of domain terms

5. Final Presentation (20 minutes per pair):
   - Live demonstration of package functionality with Auckland data
   - Architecture overview: key classes, modules, design patterns
   - Design decisions and trade-offs
   - Test coverage and code quality metrics
   - CI/CD pipeline overview
   - Lessons learned in package development
   - Vision for future extensions
   - Q&A and peer feedback

**Option A: Network Analysis Package**

Core features:
- Graph class for representing transport networks
- Shortest path algorithms (Dijkstra)
- Network centrality measures (betweenness, closeness, degree)
- Accessibility analysis (nodes within distance threshold)
- Data import from OpenStreetMap (geopandas integration)

Real-world application:
- Analyse Auckland's transport network (bus, train, cycling)
- Identify critical intersections and routes
- Assess neighbourhood accessibility to public transport
- Optimise service coverage planning

**Option B: Micromobility Analytics Package**

Core features:
- Trip data parsing and analysis
- Station utilisation and demand calculations
- Demand forecasting (temporal patterns)
- Rebalancing algorithms
- Integration with open data APIs

Real-world application:
- Analyse Auckland bike/scooter sharing systems
- Predict demand by time and location
- Identify optimal rebalancing strategies
- Assess equity and accessibility of service coverage

**Grading Criteria (100 points):**
- Code quality and architecture (25 points)
- Test coverage and robustness (20 points)
- Documentation and API design (20 points)
- Deployment and CI/CD (10 points)
- Package publishing and usability (10 points)
- Final presentation and demonstration (10 points)
- Collaboration and team contribution (5 points)

**Estimated Effort:** 40 hours per pair (80 person-hours total)

### Overall Assessment Summary

| Assessment | Weight | Timing | Format |
|---|---|---|---|
| Mid-Semester Test | 20% | Week 4 | Timed exam (2 hours) |
| Assignment 1: Data Analysis | 25% | Week 5 | Individual; Jupyter + Report |
| Assignment 2: Shiny Dashboard | 25% | Week 8 | Individual; Deployed app + Report |
| Assignment 3: Package Development | 30% | Week 12 | Pair work; Published package + Presentation |

**Total Course Effort:** Approximately 100 hours across 12 weeks (8–9 hours per week including lectures, labs, and assignments)

---

## Course Policies

### Academic Integrity

Students must adhere to the University of Auckland Academic Code of Conduct. Specifically:

- **Original Work:** All submitted work must be your own or clearly attributed to collaborators (pair assignments only).
- **Plagiarism:** Copying code, analyses, or text from external sources without attribution constitutes plagiarism. Use proper citations for any code references.
- **Collaboration:** Unless specified (e.g., Assignment 3), assignments are individual. Discussing approaches is acceptable; sharing code or solutions is not.
- **AI Tools:** Students may use AI tools (ChatGPT, GitHub Copilot) to assist with learning, but must understand and be able to explain all submitted code. Wholesale code generation without understanding is not acceptable.

Suspected academic integrity violations will be reported to the School of Environment and the Conflict Resolution Team.

### Late Submission Policy

- **Assignments 1 & 2:** 5% deduction per calendar day late (up to 7 days). After 7 days, submissions will not be accepted.
- **Assignment 3 & Presentation:** Must be completed by the scheduled date. Deferred assessment may be available in special circumstances (medical, hardship); contact the instructor immediately.
- **Mid-Semester Test:** Must be completed during scheduled time; no deferrals except in cases of documented illness or emergency.

**Extensions:** If you anticipate late submission, request an extension at least 48 hours before the deadline, providing justification (medical certificate, family emergency, etc.). Extensions are granted on a case-by-case basis.

### Attendance and Participation

- **Lectures & Labs:** Attendance is expected. Labs include hands-on exercises assessed through participation and completed work.
- **Flexibility:** If illness or other circumstances prevent attendance, notify the instructor. Labs can sometimes be made up; contact the instructor.
- **Presentations:** Attendance during Week 12 final presentations is required. If unable to attend due to exceptional circumstances, contact the instructor immediately.

### Getting Help

- **Instructor Office Hours:** Dr. Hyesop Shin offers office hours by appointment. Email h.shin@auckland.ac.nz to schedule.
- **Lab Sessions:** TAs are present during labs to assist with technical issues and conceptual questions.
- **Discussion Forum:** Course discussion forum (Canvas) for general questions, code troubleshooting, and peer support.
- **Student Learning Services:** The university offers free tutoring and writing support at [studentservices.auckland.ac.nz](https://www.auckland.ac.nz/en/students.html).
- **IT Support:** University IT Help Desk: [itsupport.auckland.ac.nz](https://www.auckland.ac.nz/en/students.html) or ext. 85000

### Accessibility and Accommodations

Students with disabilities or accessibility needs should contact Disability Services at the beginning of the semester to discuss accommodations. This course can be delivered in accessible formats (large print, screen reader compatible, extended time for assessments, etc.). Contact disability@auckland.ac.nz or visit [auckland.ac.nz/disability](https://www.auckland.ac.nz/en/about-us/our-organisation/university-services/student-services/disability-services.html).

### Software and Tools (All Free and Open-Source)

**Core Languages and Environments:**
- Python 3.11+ ([python.org](https://www.python.org/))
- Jupyter Notebook / JupyterLab ([jupyter.org](https://jupyter.org/))
- Visual Studio Code ([code.visualstudio.com](https://code.visualstudio.com/))

**Data Processing and Analysis:**
- pandas ([pandas.pydata.org](https://pandas.pydata.org/))
- NumPy ([numpy.org](https://numpy.org/))
- geopandas ([geopandas.org](https://geopandas.org/))
- Shapely ([shapely.readthedocs.io](https://shapely.readthedocs.io/))

**Spatial Analysis and Visualisation:**
- folium ([python-visualization.github.io/folium](https://python-visualization.github.io/folium/))
- leaflet ([leafletjs.com](https://leafletjs.com/))
- networkx ([networkx.org](https://networkx.org/))
- geoplot ([residentmario.github.io/geoplot](https://residentmario.github.io/geoplot/))

**Web Applications:**
- PyShiny ([shiny.posit.co/py](https://shiny.posit.co/py/))
- Shinylive ([shiny.posit.co/py/docs/shinylive](https://shiny.posit.co/py/docs/shinylive.html))

**Package Development:**
- uv ([astral-sh/uv](https://github.com/astral-sh/uv))
- pytest ([pytest.org](https://pytest.org/))
- Sphinx ([sphinx-doc.org](https://www.sphinx-doc.org/))
- black ([black.readthedocs.io](https://black.readthedocs.io/))
- ruff ([astral-sh/ruff](https://docs.astral.sh/ruff/))
- mypy ([mypy.readthedocs.io](https://mypy.readthedocs.io/))

**Version Control:**
- Git ([git-scm.com](https://git-scm.com/))
- GitHub ([github.com](https://github.com/))

**APIs and Data Integration:**
- requests library ([requests.readthedocs.io](https://requests.readthedocs.io/))
- OpenStreetMap API ([openstreetmap.org](https://www.openstreetmap.org/))
- Google Maps API ([developers.google.com/maps](https://developers.google.com/maps))
- AT Metro API (Auckland Transport) ([api.at.govt.nz](https://api.at.govt.nz/))

**Data Sources:**
- LAWA (Air and Water Quality): [lawa.org.nz](https://www.lawa.org.nz/)
- Stats NZ (Census and Transport): [stats.govt.nz](https://www.stats.govt.nz/)
- Waka Kotahi (Transport Agency): [nzta.govt.nz](https://www.nzta.govt.nz/)
- Auckland Council Data: [data.auckland.govt.nz](https://data.auckland.govt.nz/)
- Police NZ Crime Data: [police.govt.nz](https://www.police.govt.nz/)

All required software is free and available for Windows, macOS, and Linux.

---

## Course Competencies and Graduate Attributes

This course develops University of Auckland graduate attributes and professional competencies:

### Graduate Attributes

- **Research, Inquiry, and Knowledge Discovery:** Students conduct geospatial analysis using real Auckland data and develop packages contributing to the GIS ecosystem.
- **Critical Thinking and Problem Solving:** Students debug code, optimise algorithms, and design solutions for urban and environmental challenges.
- **Teamwork and Collaboration:** Pair-based package development requires communication, code review, and shared responsibility.
- **Communication and Expression:** Visualisations, documentation, Sphinx guides, and final presentations develop communication skills.
- **Intercultural Competence:** Auckland's diverse communities are reflected in data sources and real-world applications throughout the course.

### Professional Competencies

- **Technical Programming:** Fluency in Python, testing, version control, and industry tools
- **Geospatial Analysis:** Data processing, visualisation, network analysis, and spatial reasoning
- **Software Engineering:** Package design, documentation, testing, CI/CD, and deployment
- **Professional Communication:** Writing technical documentation, presenting to audiences, collaborating asynchronously
- **Continuous Learning:** Engagement with open-source communities, reading technical documentation, adapting to new tools

---

## Course Support and Learning Resources

### Recommended Reading

- **Core Python:** Lutz, M. (2013). *Learning Python* (5th ed.). O'Reilly.
- **Data Analysis:** McKinney, W. (2022). *Python for Data Analysis* (3rd ed.). O'Reilly.
- **Geospatial Analysis:** Westra, E. (2016). *The Geospatial Analysis Handbook*. Locate Press.
- **Web Applications:** Chang, W. (2020). *Mastering Shiny*. O'Reilly.
- **Software Engineering:** Martin, R.C. (2008). *Clean Code*. Prentice Hall.
- **Performance:** Gorelick, M., & Ozsvald, I. (2020). *High Performance Python* (2nd ed.). O'Reilly.

### Online Resources

- **Python Documentation:** [python.org/3/](https://docs.python.org/3/)
- **Real Python:** Tutorials and articles on Python topics ([realpython.com](https://realpython.com/))
- **GeoPandas Documentation:** [geopandas.org/docs/](https://geopandas.org/docs/)
- **Stack Overflow:** Community Q&A for code issues ([stackoverflow.com](https://stackoverflow.com/))
- **GitHub Discussions:** Peer support and examples in geospatial Python projects

### Library Services

The University of Auckland Library provides:
- Access to O'Reilly Learning Platform (books and videos)
- Subject librarians specialising in geospatial and data science
- Research data management support
- Citation management tools (Zotero, Mendeley)

Visit [auckland.ac.nz/library](https://www.auckland.ac.nz/en/library.html) for access information.

---

## Course Feedback and Improvement

Your feedback is essential for improving this course. Opportunities to provide feedback include:

- **Mid-course Feedback:** Informal check-in (Week 6) to address concerns
- **Official Evaluation:** End-of-course survey (Canvas) assessing teaching, content, and resources
- **One-on-One:** Office hours with the instructor to discuss learning experience
- **Focus Groups:** Participation in end-of-semester focus group (optional, catered)

All feedback is anonymous and used to enhance future offerings of GISCI 343.

---

## Important Dates

| Date | Event |
|---|---|
| Week 1, Monday | Course begins; lectures and labs commence |
| Week 4 (specific date TBA) | Mid-Semester Test (2 hours, in-person) |
| End of Week 5 | **Assignment 1 due** (11:59 PM) |
| Week 6, Friday | Mid-course feedback check-in |
| End of Week 8 | **Assignment 2 due** (11:59 PM) |
| Week 12, (date TBA) | **Final Presentations** (all pairs present) |
| End of Week 12 | **Assignment 3 due** (deployed app + code on GitHub) |
| End of Semester 1 | Course concludes; grades released |

---

## Contact and Support

**Instructor:** Dr Hyesop Shin
- **Email:** h.shin@auckland.ac.nz
- **Office Hours:** By appointment (email to schedule)
- **Office Location:** To be confirmed

**Course Coordinator:** Dr Hyesop Shin

**Teaching Assistants:** (Names and contact details to be provided in Week 1)

**Course Canvas Site:** Access via [canvas.auckland.ac.nz](https://canvas.auckland.ac.nz/)

For urgent matters outside office hours, contact the Department of Geography administrative office.

---

*This syllabus is subject to change at the instructor's discretion. Students will be notified of any significant changes via Canvas announcement.*

**Last Updated:** 2 February 2026

**Version:** 1.0
