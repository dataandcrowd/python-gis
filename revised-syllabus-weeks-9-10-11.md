# Revised Syllabus: Weeks 9-11 (Package Development and Publishing)

**Use this to replace the existing Week 9, 10, and 11 sections in your syllabus.**

---

## Week 9: Package Structure and Building (11 May)

### Lecture Topics (2 hours)

**Urban Analytics Context (45 mins)**:
- Cities as networks: flows, connectivity, resilience
- Micromobility revolution: e-scooters and urban transport
- E-scooter trip patterns and network analysis
- Origin-destination flows for shared micromobility
- Geofencing and parking zone analysis
- Integration with public transport networks
- Policy challenges: safety, equity, clutter

**Python Package Development Fundamentals (1 hour)**:
- From analysis scripts to Python packages: why package your code?
- Package architecture: structure and organisation
- The `src/` layout vs flat layout (and why `src/` is best practice)
- Understanding `pyproject.toml` (PEP 621): package metadata and configuration
- Modular code design principles
- Building distributions: wheels and source distributions explained
- Package naming conventions and best practices
- **Live demo**: Creating and building `geohello-instructor-demo`

**Key Concepts Introduced**:
- What makes a directory a Python package (`__init__.py`)
- How Python finds and imports packages
- The build process: source → distributions
- Metadata: name, version, dependencies, entry points

---

### Lab Activities (2 hours)

**Main Activity: Build Your First Package** (90 mins)

Follow the Week 9 lab guide to:
1. Initialize a new library project with `uv init --lib geohello-yourname`
2. Understand the created package structure
3. Write a simple geospatial greeting function
4. Configure package metadata in `pyproject.toml`
5. Improve the README for future users
6. Build distributions with `uv build`
7. Test local installation and imports
8. Verify the package works correctly

**Learning Objectives**:
- Understand Python package structure
- Write valid `pyproject.toml` configuration
- Build wheel and source distributions
- Test packages locally before publication

**Secondary Activity: Assignment 3 Planning** (30 mins)
- Brainstorm package scope and functionality
- Review micromobility or other urban analytics topics
- Identify reusable functions from previous assignments
- Sketch package module structure

---

### Week 9 Deliverable (Participation/Completion)

**Task**: Build and test a simple Python package locally

**Due**: End of Week 9 lab (or Friday 15 May, 5pm if working at home)

**Submission to Canvas**:
- Screenshot of successful `uv build` output showing both `.whl` and `.tar.gz` created
- Screenshot of successful local import: `uv run python -c "import geohello; print(geohello.hello())"`
- Brief reflection (100-150 words): What did you learn about package structure?

**Grading**: Completion credit (ungraded, but required for Week 10 lab participation)

**Purpose**: Ensure all students can build packages before adding testing and publication complexity

---

### Key Skills
- Package initialization with uv
- Understanding `src/` layout
- Writing `pyproject.toml` metadata
- Building distributions
- Local package testing

---

### Real-World Applications

**Example Package Structures Discussed**:
- **Micromobility toolkit**: `src/escooter_analytics/` with modules for trips, geofencing, networks
- **Accessibility calculator**: `src/accessibility/` with modules for isochrones, walkshed, transit
- **Urban morphology tools**: `src/urban_form/` with modules for street metrics, building analysis

**Case Study**: How `osmnx` is structured - students explore a real geospatial package on GitHub

---

## Week 10: Testing, Documentation, and TestPyPI Publication (18 May)

### Lecture Topics (2 hours)

**Testing Geospatial Code** (45 mins):
- Why testing matters: correctness, reproducibility, confidence
- Introduction to pytest: writing and running tests
- Testing spatial operations: geometries, transformations, calculations
- Test fixtures for geospatial data
- Mocking external data sources (APIs, file downloads)
- Testing edge cases specific to spatial data:
  - Empty geometries
  - Invalid coordinates
  - Projection transformations
  - Tolerance in geometric comparisons
- Test coverage: measuring and improving

**Documentation Strategies** (30 mins):
- Docstrings: NumPy/Google style guide
- README files: installation, quick start, examples
- API reference documentation
- User guides and tutorials
- MkDocs for documentation websites
- Documentation as code: keeping docs synchronized

**Publishing Workflow** (30 mins):
- TestPyPI vs real PyPI: why test first
- Creating PyPI accounts and tokens
- Token security best practices
- Publishing with `uv publish`
- Common publication errors and solutions
- Verifying installation from TestPyPI
- Semantic versioning (SemVer): MAJOR.MINOR.PATCH

**Live Demo** (15 mins):
- Add tests to Week 9 `geohello` package
- Write docstrings
- Publish to TestPyPI
- Verify installation

---

### Lab Activities (2 hours)

**Main Activity: Test, Document, and Publish to TestPyPI** (110 mins)

Follow the Week 10 lab guide to:

**Part 1: Add Tests (30 mins)**
1. Create `tests/` directory
2. Write tests for your `geohello` functions
3. Learn pytest basics: assertions, fixtures, parametrization
4. Run tests and achieve >80% coverage

**Part 2: Add Documentation (20 mins)**
5. Write comprehensive docstrings
6. Improve README with examples
7. Add usage instructions

**Part 3: Publish to TestPyPI (40 mins)**
8. Create TestPyPI account (if not done)
9. Generate API token
10. Configure publishing index in `pyproject.toml`
11. Publish: `uv publish --index testpypi --token YOUR-TOKEN`
12. Troubleshoot any errors (common: name conflicts, version issues)

**Part 4: Verify Installation (20 mins)**
13. Create fresh test environment
14. Install from TestPyPI
15. Test that package works as expected
16. Document the verification process

---

### Week 10 Assessment: TestPyPI Publication (5% of final grade)

**Task**: Publish a tested, documented package to TestPyPI

**Due**: Friday 22 May, 5pm

**Submission to Canvas**:
1. TestPyPI package URL (e.g., `https://test.pypi.org/project/geohello-yourname/`)
2. GitHub repository link with:
   - Complete package code
   - Tests in `tests/` directory
   - Comprehensive README
   - Clear commit history
3. Installation verification screenshot showing successful install from TestPyPI
4. Brief reflection (150-200 words) on:
   - What challenges did you encounter?
   - How did you resolve them?
   - What will you apply to Assignment 3?

**Evaluation Criteria**:
- **Package published successfully to TestPyPI** (2%): Package is visible and downloadable
- **Tests present and passing** (1%): At least 3 meaningful tests, >80% coverage
- **Documentation complete** (1%): Docstrings, README with installation/usage examples
- **Installation verified** (1%): Successfully installs in fresh environment and works

**Purpose**:
- Ensure all students can publish before Assignment 3 deadline
- Practice troubleshooting in low-stakes environment
- Build confidence with publication workflow

---

### Key Skills
- Writing pytest tests for geospatial functions
- Documentation with docstrings and README
- TestPyPI account and token management
- Publishing workflow with uv
- Troubleshooting publication errors
- Verifying package installation

---

### Testing Geospatial Code Examples

**Example tests students write**:

```python
# tests/test_geohello.py
import pytest
from geohello import hello

def test_hello_default():
    """Test default greeting returns Auckland"""
    result = hello()
    assert "Auckland" in result
    assert "Hello from" in result

def test_hello_custom_place():
    """Test custom place name works"""
    result = hello("Tokyo")
    assert "Tokyo" in result

@pytest.mark.parametrize("place,expected", [
    ("Paris", "Hello from Paris!"),
    ("Auckland", "Hello from Auckland!"),
    ("New York", "Hello from New York!"),
])
def test_hello_parametrized(place, expected):
    """Test multiple places with parametrization"""
    assert hello(place) == expected
```

**For Assignment 3 geospatial testing** (preview):
```python
# tests/test_geofencing.py
from shapely.geometry import Point, Polygon
from escooter_analytics.geofencing import is_within_geofence

def test_point_in_polygon():
    """Test point correctly identified as inside geofence"""
    geofence = Polygon([(0, 0), (1, 0), (1, 1), (0, 1)])
    point = Point(0.5, 0.5)
    assert is_within_geofence(point, geofence) is True

def test_point_outside_polygon():
    """Test point correctly identified as outside geofence"""
    geofence = Polygon([(0, 0), (1, 0), (1, 1), (0, 1)])
    point = Point(2, 2)
    assert is_within_geofence(point, geofence) is False
```

---

## Week 11: Final Polish and Showcase Preparation (25 May)

**King's Birthday Public Holiday**: Monday 1 June 2026 (Week 12)
**Note**: Week 11 has normal lecture schedule. Week 12 (1 June) has no lecture.

### Lecture Topics (2 hours)

**Continuous Integration and Final Publication** (1 hour):
- Continuous Integration/Continuous Deployment (CI/CD) overview
- GitHub Actions for automated testing
- Pre-commit hooks for code quality (ruff, black, mypy)
- Semantic versioning review
- From TestPyPI to real PyPI: final checklist
- Licensing for open source software (MIT, BSD, Apache 2.0)
- **Optional**: Publishing to real PyPI (demonstration)

**Academic Poster Design for Technical Projects** (45 mins):
- Effective poster design principles
- Communicating technical work visually
- Poster structure: title, motivation, methods, results, conclusions
- Code snippets and visualizations on posters
- QR codes for linking to documentation
- A1 poster specifications and printing

**Course Wrap-Up** (15 mins):
- Review of key learnings
- Assignment 3 final expectations
- Showcase logistics (venue, time, format)
- Career pathways using Python geospatial skills

---

### Lab Activities (2 hours)

**This is a flexible work session - students choose focus areas:**

**Option A: Assignment 3 Final Development** (for most students)
- Refine package functionality
- Improve test coverage
- Enhance documentation
- Add example notebooks
- Polish README and user guide

**Option B: CI/CD Setup** (for advanced students)
- Configure GitHub Actions workflow
- Set up pre-commit hooks
- Automate testing on push/PR
- Generate coverage reports

**Option C: Real PyPI Publication** (for ready students)
- Final quality check
- Create PyPI account
- Generate PyPI token
- Publish to production PyPI: `uv publish`
- Verify listing on pypi.org

**Option D: Poster Design** (required for all)
- Review poster examples and templates
- Design poster layout (A1 size)
- Create visualizations for poster
- Write clear, concise text
- Add QR code linking to documentation/GitHub
- Prepare for printing (PDF export)

**Instructor and TA Support**:
- Roving consultations
- One-on-one help with stuck students
- Code review sessions
- Poster feedback
- Publication troubleshooting

---

### Week 11 Lab Deliverable (Optional)

**Task**: Bring draft poster for feedback

**Format**: Digital draft (PDF) or printed draft

**Feedback**: Instructor/peer review on design, clarity, content

**Purpose**: Iterate on poster before final printing

---

### Key Activities
- Assignment 3 final refinement
- Optional CI/CD and real PyPI publication
- Poster design and review
- Individual consultations

---

## Week 12: Showcase and Course Completion (1 June)

**King's Birthday Public Holiday**: Monday 1 June 2026
**No Lecture**: Tuesday 2 June (public holiday observed)
**Labs Operate**: All scheduled lab sessions run as normal

---

### Lab Activities (2 hours)

**Final Work Session - Choose Your Priority**:

**Priority 1: Assignment 3 Completion** (most students)
- Final code refinement
- Last testing and bug fixes
- Documentation polish
- Create demonstration notebook
- Verify PyPI publication (or publish if not yet done)
- Prepare submission materials

**Priority 2: Poster Finalization** (all students)
- Incorporate feedback from Week 11
- Final design polish
- Export to PDF for printing
- Print posters (printing services info provided)
- Prepare 2-minute poster pitch
- Practice explaining package to diverse audiences

**Priority 3: Individual Consultations** (as needed)
- Technical troubleshooting
- Last-minute debugging
- Publication issues
- Poster feedback
- Assignment 3 questions

---

### Assignment 3 Due: Thursday 5 June, 5pm

**Task**: Publish a Python package to PyPI containing reusable urban analytics functions

**Full requirements** as per original syllabus (30% of final grade):
- Published to PyPI and installable via `pip install your-package`
- Proper package structure with `src/` layout
- Test coverage >80% with pytest
- Comprehensive documentation (MkDocs or Sphinx)
- Optional but encouraged: Passing CI/CD pipeline on GitHub
- Example notebooks demonstrating usage
- Clear README with installation and usage instructions
- Appropriate open source license

**Suggested Package Scopes**:
- Urban accessibility metrics calculator
- Pedestrian flow analysis toolkit
- **Micromobility analysis toolkit** (e-scooter trip analysis, geofencing, OD flows)
- Street network analysis utilities
- 15-minute city assessment tools
- Air quality exposure calculation
- Green space accessibility metrics
- Transport mode share analysis

**Submission to Canvas**:
1. PyPI package URL (e.g., `https://pypi.org/project/your-package/`)
2. GitHub repository URL with README badges
3. Documentation website URL (if using MkDocs/ReadTheDocs)
4. Brief report (1-2 pages) describing:
   - Package functionality and key features
   - Design decisions and architecture choices
   - Potential applications in urban analytics
   - Challenges encountered and solutions
   - Future development plans

**Evaluation Criteria** (30% total):
- Code quality and architecture (10%)
- Documentation completeness (10%)
- Test coverage and quality (8%)
- Successful PyPI publication (2%)

---

### Poster Showcase: Thursday 5 June (Separate Event)

**Event Details**: Venue and time TBA (likely afternoon, Building 301)

**Format**:
- Poster exhibition (all students display A1 posters)
- 2-minute pitch to explain your package
- Q&A with attendees (faculty, students, potential employers)
- Networking opportunity

**Poster Requirements**:
- A1 size (594mm × 841mm / 23.4" × 33.1")
- Professional design and layout
- Clear visual communication of package purpose and features
- Include: title, your name, package name, PyPI URL/QR code
- Show example use cases with code snippets and outputs
- Display key results (maps, plots, analyses)
- Designed for both technical and non-technical audiences

**Evaluation Criteria** (10% of final grade):
- Visual design and clarity (4%)
- Content quality and accuracy (4%)
- Communication effectiveness during pitch and Q&A (2%)

**Printing**:
- University print services: printcentre.auckland.ac.nz
- Recommended to print by 4 June
- Bring digital backup on USB to showcase

---

## Summary: Three-Week Flow

| Week | Theme | Focus | Deliverable |
|------|-------|-------|-------------|
| **9** | Structure & Build | Package architecture, local building | Built package (completion credit) |
| **10** | Quality & Publish | Testing, docs, TestPyPI | TestPyPI publication (5%) |
| **11** | Polish & Prepare | Final refinement, CI/CD, posters | Draft poster (feedback) |
| **12** | Showcase | Final submission and presentation | Assignment 3 (30%) + Poster (10%) |

**Total assessment value across these weeks**: 45% of final grade

---

## Learning Progression

**Week 9**: "I can build a Python package"
- Understand structure
- Create distributions
- Test locally

**Week 10**: "I can publish a tested, documented package"
- Write meaningful tests
- Create clear documentation
- Navigate TestPyPI workflow
- Troubleshoot publication errors

**Week 11**: "I can create production-quality packages"
- Apply best practices
- Implement CI/CD
- Publish to real PyPI
- Communicate my work professionally

**Week 12**: "I am a published Python package author"
- Showcase completed work
- Network with community
- Reflect on learning journey

---

## Important Notes for Students

1. **Week 9 is foundational** - don't skip this lab! Week 10 builds directly on it.

2. **TestPyPI in Week 10 is practice** - mistakes here don't matter. This is your safe space to learn.

3. **Week 11 is flexible** - focus on what you need most (functionality, CI/CD, poster, publication).

4. **Start early on Assignment 3** - use Weeks 9-10 to build incrementally, not all in Week 12.

5. **Posters are due with Assignment 3** - design throughout Week 11, print early Week 12.

6. **The showcase is a celebration** - show off your work, network, and be proud!

---

## Resources

**Essential Documentation**:
- uv publishing guide: https://docs.astral.sh/uv/guides/publish/
- pytest documentation: https://docs.pytest.org/
- Python Packaging Guide: https://packaging.python.org/
- MkDocs: https://www.mkdocs.org/
- Semantic Versioning: https://semver.org/

**Templates**:
- Poster templates (provided on Canvas)
- Example packages (linked in Week 9 materials)
- CI/CD workflow templates (provided in Week 11)

---

**Last Updated**: February 2026
**Version**: 2.0 (Two-week integration with showcase preparation)
