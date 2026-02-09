# GISCI 343: GIS Python – Assignment Briefs

**Course:** GISCI 343: GIS Python
**Instructor:** Dr Hyesop Shin
**Institution:** University of Auckland
**Semester:** 1, 2026

---

## Assignment 1: Auckland Urban Data Analysis (Individual) — 25%

### Course Information
- **Code:** GISCI 343
- **Title:** GIS Python
- **Assessment Type:** Individual assignment
- **Weighting:** 25% of final grade
- **Coverage:** Weeks 1–5 (Python basics, pandas DataFrames, functions, APIs)

### Due Date
**Week 7, [Placeholder Date] by 5:00 PM**
Submit via Canvas. Late submissions will incur a 10% penalty per calendar day unless an extension has been formally approved.

### Learning Outcomes Assessed
Upon completion of this assignment, you will have demonstrated:
- LO1: Ability to import, clean, and manipulate geospatial and urban datasets using pandas
- LO2: Competence in writing modular, reusable Python functions for data analysis
- LO3: Capability to integrate external APIs to enrich datasets
- LO4: Skill in creating publication-quality visualisations using both statistical plots and geospatial maps
- LO5: Capacity to communicate analytical findings in a structured written report

### Task Description

You are tasked with conducting an exploratory data analysis on an Auckland urban dataset of your choice. Your analysis should demonstrate proficiency in data wrangling, function writing, API integration, and visualisation.

#### Part A: Dataset Selection
Choose **ONE** of the following Auckland datasets:

1. **Footfall Data (Retail/Pedestrian)**
   Analyse pedestrian traffic patterns across Auckland's CBD, suburbs, or specific shopping centres. Examine trends by time of day, day of week, location, and season.

2. **Air Quality Data (LAWA – Land Air Water Aotearoa)**
   Analyse air quality measurements across Auckland monitoring stations. Investigate pollutants (PM2.5, PM10, NO₂, O₃), temporal trends, and spatial variation. Correlate with weather or traffic data where available.

3. **Auckland Transport Bus Data**
   Analyse bus route performance, passenger boarding patterns, on-time reliability, or route efficiency. Explore variation by route, time period, and location.

You may source data from public repositories such as:
- Stats NZ (StatsNZ.govt.nz)
- LAWA (lawa.org.nz)
- Auckland Council Data Repository (data.aucklandcouncil.govt.nz)
- Open Street Map (OpenStreetMap.org)
- Auckland Transport website or Waka Kotahi NZTA APIs

#### Part B: Data Import and Cleaning
- Import your dataset into a pandas DataFrame
- Document and address any missing values, duplicates, or data quality issues
- Standardise data types, units, and naming conventions
- Provide summary statistics and data profiling
- Ensure geospatial data (if applicable) is properly formatted with coordinates in WGS84 (EPSG:4326)

#### Part C: Custom Functions for Analysis
Write **at least 3 custom functions** that perform meaningful analysis on your dataset. Functions must:
- Have clear docstrings (including parameters, return values, and usage examples)
- Be modular and reusable
- Include error handling where appropriate
- Examples: statistical summaries by group, anomaly detection, time-series aggregation, spatial queries, data validation

#### Part D: API Integration
Integrate **at least ONE public API** to enrich your dataset. Examples include:
- **Geocoding API** (Google Maps, Nominatim, or similar) to convert addresses to coordinates
- **Weather API** (OpenWeatherMap, NIWA) to fetch historical or current weather data
- **Public Transport API** (Auckland Transport or Waka Kotahi) to retrieve route, stop, or service information
- **Elevation API** (to derive topographic information)

Document your API calls, handle rate limiting and errors gracefully, and explain how the enriched data enhances your analysis.

#### Part E: Visualisations
Create **at least 2 visualisations**:

1. **Statistical Plot** (at least 1): boxplot, histogram, scatter plot, violin plot, density plot, or time-series line graph. Ensure proper labels, titles, legends, and units.

2. **Geospatial Visualisation** (at least 1): a Folium interactive map showing your data spatially. Examples: cluster markers, choropleth layer, heatmap, route visualisation. Ensure the map is properly projected and includes contextual basemap tiles.

All visualisations should be publication-quality with appropriate colour schemes, axes labels, and captions.

#### Part F: Report
Write a brief analytical report (500–800 words) that includes:
- **Introduction:** Motivation for selecting this dataset and research question
- **Data and Methods:** Data sources, cleaning procedures, and analytical approach
- **Key Findings:** Summary of insights revealed by your analysis
- **Limitations:** Acknowledge constraints in data quality, coverage, or methodology
- **Conclusions:** Implications and suggestions for further investigation

### Deliverables
Submit the following to Canvas:

1. **Jupyter Notebook (.ipynb)**
   Contains all code, markdown documentation, visualisations, and final report. Code must be executable without errors.

2. **Exported HTML (.html)**
   Export your notebook to HTML format for easy viewing. (In Jupyter: File → Export As → HTML)

3. **Optional: Data File**
   If your dataset is not publicly available, provide a subset or anonymised version (maximum 50 MB).

### Marking Rubric

| Criterion | Percentage | Descriptor |
|-----------|-----------|-----------|
| **Data Import & Cleaning** | 20% | Data is correctly loaded and profiled. Missing values, duplicates, and data type issues are identified and handled appropriately. Documentation of cleaning procedures is clear. |
| **Functions & Code Quality** | 25% | At least 3 custom functions are present. Functions are modular, reusable, well-documented, and error-handled. Code follows PEP 8 conventions. |
| **API Integration** | 20% | At least one external API is successfully integrated. API calls are documented, errors are handled, and the enriched data meaningfully enhances the analysis. |
| **Visualisation** | 20% | Visualisations are publication-quality, properly labelled, and directly support findings. At least 1 statistical plot and 1 map are present. |
| **Report & Documentation** | 15% | Report is well-structured, findings are articulated clearly, limitations are acknowledged, and markdown documentation within the notebook is comprehensive. |

**Total: 100%**

### Academic Integrity Statement

This assignment must be your own work. You may consult course materials, official Python and pandas documentation, and seek clarification from instructors or tutors. You may not:
- Copy code from peers or online sources without attribution
- Use generative AI tools (ChatGPT, Copilot, etc.) to write code or analysis
- Submit work that has been submitted for another course

Any breaches of academic integrity will be addressed under the University of Auckland's Student Conduct procedures and may result in a zero grade or further disciplinary action.

### Submission Instructions

1. Ensure your notebook runs without errors: `Kernel → Restart & Run All`
2. Clear all output before final submission
3. Name your file: `GISCI343_A1_YourLastName_YourUPI.ipynb`
4. Export to HTML with the same naming convention
5. Upload both files to the Assignment 1 submission folder on Canvas
6. Check the submission confirmation receipt

**Questions?** Post in the course forum or attend office hours (Tuesdays, 2–4 PM, room TBA).

---

## Assignment 2: Interactive Shiny Dashboard (Individual) — 25%

### Course Information
- **Code:** GISCI 343
- **Title:** GIS Python
- **Assessment Type:** Individual assignment
- **Weighting:** 25% of final grade
- **Coverage:** Weeks 6–8 (PyShiny, reactive programming, OD matrices, transport analytics)

### Due Date
**Week 10, [Placeholder Date] by 5:00 PM**
Submit via Canvas. Late submissions will incur a 10% penalty per calendar day unless an extension has been formally approved.

### Learning Outcomes Assessed
Upon completion of this assignment, you will have demonstrated:
- LO1: Ability to design and build interactive web applications using PyShiny for Python
- LO2: Competence in implementing reactive calculations that respond to user input
- LO3: Skill in integrating multiple data visualisation types within a single application
- LO4: Capability to design user-centred interfaces with clear information architecture
- LO5: Proficiency in deploying web applications to cloud platforms
- LO6: Capacity to document technical solutions comprehensively

### Task Description

You are tasked with designing and developing an interactive Shiny dashboard that enables exploration of Auckland-related transport or urban data. Your application should demonstrate mastery of PyShiny's reactive programming model and geospatial visualisation techniques.

#### Part A: Application Scope and Topic
Your dashboard must address a meaningful question related to Auckland's urban environment. Choose **ONE** of the following suggested topics, or propose an alternative (subject to instructor approval):

1. **Congestion Charging Impact Explorer**
   Interactive tool to visualise potential impacts of congestion charging schemes on traffic flow, emissions, revenue, and equity. Include scenarios for different charging zones and rates.

2. **Origin-Destination (OD) Matrix Visualiser**
   Tool to explore commute patterns, journey flows, and transport demand between Auckland suburbs or zones. Allow filtering by transport mode, time of day, or demographic group.

3. **Public Transport Accessibility Tool**
   Interactive map showing accessibility to public transport services (buses, trains, ferries) from different locations. Include metrics such as walking distance, frequency, and journey time to key destinations.

4. **Cycling Network Gap Analyser**
   Dashboard to visualise Auckland's cycling network, identify infrastructure gaps, analyse route safety, and assess equity of access to safe cycling facilities.

**Alternative Topics:** Other transport or urban analytics applications (e.g., air quality forecasting, retail accessibility, urban greenspace analysis) may be approved by the instructor.

#### Part B: Application Requirements

Your PyShiny application must include the following elements:

**Interactive Controls (minimum 3):**
- Input widgets such as dropdown menus, sliders, date pickers, text search boxes, radio buttons, or checkboxes
- Controls should enable users to filter, compare, or parameterise visualisations
- Example: "Select a zone," "Choose transport mode," "Set date range"

**Visualisations (minimum 2 types):**
- At least one **interactive map** (using Folium or Plotly) showing spatial data
- At least one **chart or plot** (using Plotly, Matplotlib, or similar) showing quantitative patterns
- Additional visualisations may include tables, time-series plots, or heatmaps

**Reactive Calculations:**
- Dashboard logic must be **reactive**—visualisations and summaries update automatically when users modify inputs
- Use PyShiny's `@reactive.Calc` decorator to define data transformations
- Ensure calculations are efficient and do not cause excessive lag

**User Interface Design:**
- Clean, professional layout with logical organisation of inputs and outputs
- Clear labelling of all controls and visualisations
- Informative help text or instructions for first-time users
- Responsive design that works on desktop and tablet screens (at least 1200 px width)

**Data Sourcing and Preparation:**
- Source data from publicly available APIs or datasets
- Document all data sources, copyright, and licensing
- Ensure data is cleaned and validated before use in the app

#### Part C: Deployment
Deploy your application to **one of the following platforms:**

- **Shinylive** (recommended): Client-side Python execution in the browser. No server required. Easy deployment via GitHub Pages.
- **Shinyapps.io**: Cloud hosting service with a free tier. Requires signup and deployment via `rsconnect-python`.
- **Hugging Face Spaces**: Free tier with Gradio or Shiny-compatible frameworks.

Provide the deployed application URL in your submission. The application must be fully functional and accessible without requiring local software installation.

#### Part D: Design Report
Write a comprehensive **design report (approximately 5 pages, single-spaced)** that includes:

**1. Motivation and Target Audience**
Explain the motivation for your dashboard. Who are the intended users (e.g., transport planners, environmental advocates, commuters)? What decision or insight does your tool enable?

**2. Data Sources and Preparation**
Describe the datasets used (sources, variables, temporal coverage). Explain any preprocessing, cleaning, or transformation steps. Address data quality, limitations, and spatial reference systems.

**3. Technical Implementation**
- Summarise the application architecture (e.g., data processing pipeline, reactive dependency graph)
- Explain how reactivity is implemented (which inputs trigger which calculations?)
- Describe any custom functions or classes used
- Discuss performance optimisations (if applicable)

**4. User Interface Walkthrough**
- Provide 3–4 screenshots annotated with labels and descriptions
- Explain the purpose of each control and visualisation
- Describe a typical user workflow (e.g., "User selects zone → app computes metrics → map and chart update")

**5. Limitations and Future Improvements**
- Identify constraints in data availability, accuracy, or scope
- Propose enhancements (e.g., additional data sources, analytics, user features)
- Reflect on lessons learned during development

### Deliverables
Submit the following to Canvas:

1. **GitHub Repository URL**
   Repository must contain:
   - Complete PyShiny application code (`app.py` or modular structure)
   - `README.md` with setup and deployment instructions
   - `requirements.txt` or `pyproject.toml` with dependencies
   - Any data files or scripts used for data preparation

2. **Deployed Application URL**
   A live, working link to your app accessible from any browser.

3. **Design Report (PDF or DOCX)**
   Formatted report (5 pages) with screenshots, as described above.

### Marking Rubric

| Criterion | Percentage | Descriptor |
|-----------|-----------|-----------|
| **App Functionality & Interactivity** | 30% | Application runs without errors. At least 3 interactive controls function correctly. Reactive logic is sound and responsive. Deployed app is fully accessible. |
| **Visualisation Quality** | 20% | Visualisations are publication-quality and directly support exploration. Maps are properly configured with context. Charts are appropriately styled with clear legends and axes. |
| **Code Quality & Organisation** | 20% | Code is modular, readable, and follows PEP 8. Comments and docstrings explain logic. File structure is logical and scalable. |
| **Design Report** | 20% | Report is well-structured, comprehensive, and reflects critical thought. Technical descriptions are clear and accurate. Limitations are thoughtfully addressed. |
| **Deployment & Documentation** | 10% | Application is successfully deployed and accessible via provided URL. GitHub repository is complete and well-documented. Instructions enable reproduction of the deployment. |

**Total: 100%**

### Academic Integrity Statement

This assignment must be your own work. You may consult course materials, PyShiny documentation, and seek clarification from instructors or tutors. You may not:
- Copy application code or design from peers or online sources without attribution
- Use generative AI tools (ChatGPT, Copilot, etc.) to generate application code or design reports
- Submit work that has been submitted for another course

Any breaches of academic integrity will be addressed under the University of Auckland's Student Conduct procedures and may result in a zero grade or further disciplinary action.

### Submission Instructions

1. Ensure your deployed application is fully functional and accessible
2. Test all interactive controls and verify reactive updates work as expected
3. Name your design report: `GISCI343_A2_DesignReport_YourLastName_YourUPI.pdf`
4. Create a submission summary document listing:
   - GitHub repository URL
   - Deployed app URL
   - Brief description of your dashboard topic
5. Upload the design report and summary to Canvas
6. Include the GitHub and app URLs in the text submission field on Canvas as well

**Questions?** Post in the course forum or attend office hours (Tuesdays, 2–4 PM, room TBA).

---

## Assignment 3: Python Package Development (Pair Work) — 30%

### Course Information
- **Code:** GISCI 343
- **Title:** GIS Python
- **Assessment Type:** Pair work assignment
- **Weighting:** 30% of final grade
- **Coverage:** Weeks 9–12 (package development, `uv` package manager, testing, documentation, CI/CD)

### Due Date
**Week 12, [Placeholder Date]**
- GitHub repository and TestPyPI package must be finalised by 5:00 PM on the due date
- **In-class presentations:** Week 12, [Placeholder Dates and Times] (10–15 minutes per pair; schedule TBA)

Late submissions will incur a 10% penalty per calendar day unless an extension has been formally approved. Presentations cannot be rescheduled except under exceptional circumstances.

### Learning Outcomes Assessed
Upon completion of this assignment, you will have demonstrated:
- LO1: Ability to design and develop production-ready Python packages with professional structure
- LO2: Competence in using modern Python packaging tools (`uv`, `pyproject.toml`)
- LO3: Skill in writing comprehensive test suites with adequate coverage
- LO4: Capability to generate publication-quality software documentation (Sphinx)
- LO5: Proficiency in implementing continuous integration and deployment pipelines
- LO6: Competence in collaborative software development using Git and GitHub
- LO7: Capacity to present technical work clearly to a technical audience

### Task Description

Working in pairs, you will develop a production-ready Python package that provides tools for analysing Auckland's urban infrastructure (networks or micromobility). Your package will be published to TestPyPI (and optionally PyPI), documented comprehensively, tested rigorously, and presented to the class.

#### Part A: Package Scope and Topic Selection

Choose **ONE** of the following options:

**Option A: Auckland Network Analysis Package (Recommended)**

Develop a package for analysing Auckland's infrastructure networks (road network, cycling network, or public transport network). Your package must include:

- **Core Features:**
  - Load and parse network data (from OpenStreetMap, Auckland Council GIS datasets, or similar)
  - Calculate shortest paths between locations
  - Compute network centrality metrics (betweenness, closeness, degree centrality)
  - Identify network connectivity gaps or critical infrastructure

- **Visualisation:**
  - Render networks on interactive maps using Folium
  - Highlight routes, clusters, or high-demand areas

- **Example Use Case:**
  Planning a new cycling route: load the cycling network, identify gaps in coverage, calculate accessibility to schools or hospitals, and visualise the proposed addition.

**Option B: Auckland Micromobility Analytics Package**

Develop a package for analysing bike-sharing or scooter-sharing data in Auckland. Your package must include:

- **Core Features:**
  - Import and analyse trip data (origin, destination, duration, user type)
  - Compute station utilisation metrics (occupancy, turnover, demand imbalance)
  - Identify demand patterns (temporal, spatial, demographic)
  - Detect anomalies or maintenance issues

- **Visualisation:**
  - Generate heatmaps of demand by location and time
  - Plot trip flows and origin-destination matrices
  - Create demand forecasting visualisations

- **Example Use Case:**
  Optimising bike-sharing rebalancing: analyse demand patterns across stations, predict peak usage times, and visualise the routes for redistribution vehicles.

**Alternative Topics:** Other Auckland-focused geospatial or urban analytics packages may be approved by the instructor. Contact the course coordinator to propose an alternative.

#### Part B: Package Development Requirements

Your package must meet the following standards:

**1. Structure and Build System**
- Project structure follows Python packaging conventions:
  ```
  my-package/
  ├── pyproject.toml          # Project metadata and dependencies
  ├── src/my_package/         # Main package source code
  │   ├── __init__.py
  │   ├── core.py             # Core functionality
  │   ├── utils.py            # Utility functions
  │   └── visualisation.py    # Plotting functions
  ├── tests/                  # Test suite
  ├── docs/                   # Sphinx documentation
  ├── README.md               # Project overview
  ├── CHANGELOG.md            # Version history
  ├── LICENSE                 # License file (e.g., MIT)
  └── .github/workflows/      # CI/CD workflows
  ```

- Built and managed using **`uv`** package manager
- `pyproject.toml` specifies metadata (name, version, author, description, dependencies, Python version)
- Dependencies are pinned to specific versions in a lockfile (if using `uv lock`)

**2. Code Quality**
- **PEP 8 Compliance:** Code follows PEP 8 style guidelines (use a linter such as `flake8` or `ruff`)
- **Type Hints:** All functions include type annotations for parameters and return values
- **Docstrings:** All public functions and classes have docstrings in Google or NumPy format
- **Error Handling:** Appropriate exceptions are raised and caught; graceful error messages are provided
- **Modularity:** Code is organised into logical modules with single responsibilities

**3. Testing and Coverage**
- Comprehensive test suite using `pytest`
- **Minimum 70% code coverage** (assessed using `pytest-cov`)
- Tests cover:
  - Normal use cases (happy path)
  - Edge cases and invalid inputs
  - Error handling
  - Integration between modules
- Test file structure mirrors source code structure (e.g., `tests/test_core.py` for `src/my_package/core.py`)
- Tests are documented with descriptive names and docstrings

**4. Documentation**
- **README.md:**
  - Project overview and motivation
  - Installation instructions (`pip install` from TestPyPI)
  - Quick-start example with code snippet
  - Links to full documentation
  - Contribution guidelines (if applicable)
  - License information

- **Sphinx Documentation:**
  - `docs/` directory with Sphinx configuration
  - API reference auto-generated from docstrings
  - Usage guide with worked examples
  - Installation and setup instructions
  - License and acknowledgements
  - Built documentation must be accessible (provided as a link to a hosting service, or local build included in submission)

- **CHANGELOG.md:**
  - Version history with descriptions of changes
  - Follows semantic versioning (e.g., 0.1.0, 1.0.0)

**5. Version Control and Collaboration**
- Code hosted on GitHub in a public repository
- Commit history reflects both pair members' contributions (frequent, meaningful commits from both accounts)
- **Pair Work Statement:** Include a `PAIR_WORK.md` file describing:
  - How work was divided
  - Which features each member developed
  - How code was reviewed and integrated
  - Any conflicts or challenges and how they were resolved

**6. Package Publishing**
- **Published to TestPyPI** (https://test.pypi.org)
  - Package name must be unique and follow naming conventions (e.g., `auckland-network-tools`)
  - Includes README, metadata, and dependencies
  - Installation verified: `pip install -i https://test.pypi.org/simple/ auckland-network-tools`

- **Bonus:** Published to live PyPI (https://pypi.org) for genuine public use

**7. Continuous Integration / Continuous Deployment (CI/CD)**
- GitHub Actions workflow (`.github/workflows/`) that:
  - Runs tests on each push / pull request
  - Reports code coverage
  - Lints code with `flake8` or `ruff`
  - (Optional) Automatically deploys documentation

#### Part C: In-Class Presentation
Each pair will deliver a **10–15 minute presentation** during Week 12. Presentations must include:

1. **Project Overview** (1–2 min)
   - Motivation and target audience
   - Problem solved by the package

2. **Feature Demonstration** (4–6 min)
   - Live demo of the package using real Auckland data
   - Show key functionality (e.g., loading data, running analysis, generating visualisation)
   - Highlight the most novel or challenging feature

3. **Design and Implementation** (2–3 min)
   - Describe the architecture and key design decisions
   - Explain how modularity was achieved
   - Discuss any technical challenges overcome

4. **Testing and Validation** (1–2 min)
   - Show test coverage report
   - Demonstrate a few key test cases

5. **Documentation and Deployment** (1–2 min)
   - Briefly describe documentation structure
   - Confirm successful publication to TestPyPI

6. **Q&A** (2–3 min)
   - Audience questions and discussion

**Presentation deliverables:**
- Slides (PDF or PowerPoint)
- Any demo notebooks or scripts used during presentation
- Upload to Canvas within 24 hours of presentation

### Deliverables
Submit the following to Canvas and/or GitHub:

1. **GitHub Repository URL**
   Public repository containing:
   - Complete source code with proper structure
   - Test suite with coverage report (screenshot of `pytest-cov` output)
   - Sphinx documentation (or link to deployed docs)
   - README.md, CHANGELOG.md, LICENSE files
   - `.github/workflows/` CI/CD configuration
   - `pyproject.toml` with correct metadata
   - `PAIR_WORK.md` with pair contribution statement

2. **TestPyPI Package URL**
   Direct link to your published package on https://test.pypi.org/project/[your-package-name]/

3. **Documentation Link**
   Link to built Sphinx documentation (hosted on ReadTheDocs, GitHub Pages, or submitted as local HTML build)

4. **Presentation Slides (PDF)**
   Upload slides to Canvas after your presentation

5. **Optional: PyPI Publication**
   If published to live PyPI, provide URL (bonus consideration)

### Marking Rubric

| Criterion | Percentage | Descriptor |
|-----------|-----------|-----------|
| **Code Quality & Architecture** | 25% | Code is well-organised, modular, and follows PEP 8. Type hints and docstrings are comprehensive. Design decisions are sound and defensible. |
| **Testing & Coverage** | 20% | Test suite is comprehensive and well-structured. Coverage meets 70% minimum with meaningful tests for core functionality. Edge cases and errors are handled. |
| **Documentation** | 20% | Sphinx documentation is complete and professional. README is clear and helpful. API documentation is auto-generated and accurate. Examples are provided. |
| **Package Management & CI/CD** | 15% | Package structure follows conventions. `uv` is properly configured. TestPyPI publication is successful. CI/CD workflow is functional and runs on each commit. |
| **Presentation** | 20% | Presentation is clear and well-organised. Demo is functional and relevant. Technical content is accurate. Pair members are equally involved and prepared. |

**Total: 100%**

**Pair Work Assessment:**
- Both members must contribute meaningfully (assessed via Git commit history)
- If contributions are severely imbalanced (e.g., <25% contribution from one member), individual marks may be assigned
- Failure to communicate or collaborate may result in lower marks for both members

### Pair Work Policy and Responsibilities

**Assignment of Pairs:**
- Pairs will be self-selected (arrange with a partner by [Placeholder Week]). If you do not have a partner, contact the course coordinator for assignment.

**Expectations:**
- Both members are responsible for understanding all aspects of the package
- Work should be divided equitably (not necessarily equally—division can reflect different strengths)
- Commit frequently to GitHub with meaningful commit messages from both accounts
- Communicate regularly (weekly meetings minimum)

**Managing Conflicts:**
- Disagreements on design or code should be resolved through discussion and documented in commit messages or issues
- If a member is not contributing or is unavailable, **notify the instructor immediately**
- The instructor may reassign work or adjust individual marks based on demonstrated contribution

**Pair Work Statement (`PAIR_WORK.md`):**
- Include a clear statement of how work was divided
- Example:
  ```
  # Pair Work Statement

  ## Contributions
  - **Alice**: Designed and implemented core network analysis functions
    (shortest path, centrality metrics), wrote unit tests
  - **Bob**: Implemented data loading and visualisation modules,
    built Sphinx documentation, set up CI/CD

  ## Collaboration
  - Weekly meetings on Tuesdays via Teams
  - Conducted code reviews for all pull requests
  - Resolved conflicts through discussion
  ```

### Academic Integrity Statement

This is a pair work assignment. Both members' contributions must be distinct and identifiable from Git history. You may not:
- Copy code from other groups or online sources without attribution
- Use generative AI tools (ChatGPT, Copilot, etc.) to write code or documentation
- Submit work that has been submitted for another course
- Misrepresent your contributions relative to your partner's

Any breaches of academic integrity will be addressed under the University of Auckland's Student Conduct procedures and may result in a zero grade or further disciplinary action.

### Submission Instructions

1. **GitHub Setup** (complete by Week 11)
   - Create a public GitHub repository with a descriptive name
   - Initialise with a README.md, LICENSE, and .gitignore
   - Both pair members should have commit history in the repository

2. **Code Development** (Weeks 9–12)
   - Implement features incrementally with frequent commits
   - Use branches for experimental features (good practice, though not required)
   - Conduct code reviews before merging

3. **Testing and Documentation** (by Week 12 deadline)
   - Ensure all tests pass locally: `pytest -v`
   - Generate coverage report: `pytest --cov`
   - Build documentation locally: `cd docs && make html`
   - Verify the package installs from TestPyPI

4. **Publication to TestPyPI** (by Week 12 deadline)
   - Build distribution: `uv build`
   - Upload to TestPyPI (instructions at https://test.pypi.org/help/#upload)
   - Provide the URL in your submission

5. **Canvas Submission**
   - Upload a summary document with:
     - GitHub repository URL
     - TestPyPI package URL
     - Documentation link (if hosted externally)
     - Pair members' names and UPIs
     - Brief description of package functionality
   - Presentation slides (upload after your presentation)

6. **In-Class Presentation**
   - Schedule: [Placeholder details]
   - Prepare slides and demo materials in advance
   - Arrive 5 minutes early to test equipment

**Questions?** Post in the course forum or attend office hours (Tuesdays, 2–4 PM, room TBA).

---

## General Notes

### Contact and Support
- **Instructor:** Dr Hyesop Shin
- **Office Hours:** Tuesdays, 2–4 PM, [Room TBA]
- **Course Forum:** Canvas course page
- **Email:** [Placeholder email]

### Extensions
Extension requests must be submitted **at least 5 working days before the due date** with supporting documentation (medical certificates, compassionate grounds, etc.). Extensions are typically granted for no more than 5 working days.

### Plagiarism and Academic Integrity
The University of Auckland has a zero-tolerance policy for academic integrity breaches. All work must be original and properly attributed. Use of generative AI tools to write code, analysis, or documentation is considered plagiarism in this course.

### Accessibility
If you require accessibility accommodations, contact the Disability Services office and notify the instructor as soon as possible.

---

**Document Version:** 1.0
**Last Updated:** February 2026
**Next Review:** January 2027
