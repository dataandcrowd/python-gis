# Week 9 Lab: Building Your First Python Package

**GISCI 343 - Week 9 Lab Activity**

## 🎯 Learning Objectives

By the end of this lab, you will:
- Create a proper Python package structure using `uv`
- Understand the `src/` layout and why it's best practice
- Configure package metadata in `pyproject.toml`
- Build wheel and source distributions
- Test your package locally before publishing
- Prepare for next week's TestPyPI publication

**Time**: 2 hours
**What you'll build**: `geohello-yourname` - a simple geospatial greeting package

**Important**: We will NOT publish to PyPI this week. Week 10 is for that!

---

## 📚 Key Vocabulary

Before we start, understand these terms:

| Term | Definition |
|------|------------|
| **Package** | A collection of Python modules that can be installed and reused |
| **Module** | A single `.py` file containing Python code |
| **src/ layout** | A package structure with code in a `src/` directory (best practice) |
| **Wheel** | A pre-built package format (`.whl` file) that installs quickly |
| **Source Distribution (sdist)** | Package source code in `.tar.gz` format |
| **pyproject.toml** | Configuration file that describes your package |
| **Distribution** | A packaged version of your code ready for installation |

---

## Part 1: Create Your Package Structure (20 minutes)

### Step 1: Initialize a New Library Project

Open your terminal and run:

```bash
cd ~/Documents/GISCI343  # Or wherever you keep course work
uv init --lib geohello-yourname
cd geohello-yourname
```

**Replace `yourname`** with your actual name or student ID. Examples:
- `geohello-alice`
- `geohello-12345678`
- `geohello-asmith`

**What just happened?**
- `uv init --lib` created a **library** project (code for others to use)
- The `--lib` flag sets up the `src/` layout automatically
- This is different from `uv init` which creates an application

---

### Step 2: Explore the Created Structure

Run:
```bash
ls -R
```

You should see:
```
.
├── .git/                    # Git repository (version control)
├── .python-version          # Python version for this project
├── pyproject.toml           # Package configuration (IMPORTANT!)
├── README.md                # Package description
└── src/
    └── geohello_yourname/   # Your package code goes here
        ├── __init__.py      # Makes this directory a package
        └── py.typed         # Indicates package has type hints
```

**✅ Checkpoint 1**: Do you see this structure? If not, ask for help!

---

### Step 3: Understand the src/ Layout

**Question**: Why is our code in `src/geohello_yourname/` instead of just `geohello_yourname/`?

**Answer**: The `src/` layout is best practice because:
1. **Forces you to install the package** - can't accidentally import from local directory
2. **Catches import errors** - ensures package structure is correct
3. **Cleaner testing** - separates source code from tests
4. **Industry standard** - professional packages use this layout

**Key files**:
- `src/geohello_yourname/__init__.py` - Code here is available when someone imports your package
- `pyproject.toml` - Package metadata and configuration
- `README.md` - Documentation shown on PyPI

---

## Part 2: Write Your Package Code (15 minutes)

### Step 4: Add Your First Function

Open `src/geohello_yourname/__init__.py` in your editor (Positron, VS Code, etc.)

**Replace** all content with:

```python
"""A simple geospatial greeting library for urban analytics."""

__version__ = "0.1.0"

def hello(place: str = "Auckland") -> str:
    """
    Generate a greeting for a specific place.

    This is a simple example function for learning Python packaging.
    In your Assignment 3 package, you'll have much more complex
    geospatial functions!

    Parameters
    ----------
    place : str, optional
        The location to greet from, by default "Auckland"

    Returns
    -------
    str
        A greeting message

    Examples
    --------
    >>> hello()
    'Hello from Auckland!'

    >>> hello("Tokyo")
    'Hello from Tokyo!'
    """
    return f"Hello from {place}!"


def greeting_with_coords(place: str, lat: float, lon: float) -> str:
    """
    Generate a greeting with coordinates.

    Parameters
    ----------
    place : str
        The place name
    lat : float
        Latitude
    lon : float
        Longitude

    Returns
    -------
    str
        Greeting with coordinates

    Examples
    --------
    >>> greeting_with_coords("Auckland", -36.8485, 174.7633)
    'Hello from Auckland at (-36.8485, 174.7633)!'
    """
    return f"Hello from {place} at ({lat}, {lon})!"
```

**Save the file.**

**💡 Notice**:
- We defined `__version__` - this will be your package version number
- We wrote **docstrings** - documentation for each function
- We used **type hints** - `place: str`, `-> str`
- We included **examples** - helps users understand how to use functions

---

### Step 5: Test Locally (Before Building)

Let's make sure your code works before building:

```bash
uv run python -c "import geohello_yourname; print(geohello_yourname.hello())"
```

**Expected output**:
```
Hello from Auckland!
```

**Try with a custom place**:
```bash
uv run python -c "import geohello_yourname; print(geohello_yourname.hello('Paris'))"
```

**Expected output**:
```
Hello from Paris!
```

**Try the coordinates function**:
```bash
uv run python -c "import geohello_yourname; print(geohello_yourname.greeting_with_coords('Auckland', -36.8485, 174.7633))"
```

**Expected output**:
```
Hello from Auckland at (-36.8485, 174.7633)!
```

**✅ Checkpoint 2**: All three commands work? Great! If not, check for typos.

---

## Part 3: Configure Package Metadata (20 minutes)

### Step 6: Edit pyproject.toml

Open `pyproject.toml` in your editor. You'll see something like:

```toml
[project]
name = "geohello-yourname"
version = "0.1.0"
description = "Add your description here"
readme = "README.md"
requires-python = ">=3.9"
```

**Update it to**:

```toml
[project]
name = "geohello-yourname"         # CHANGE: Use your actual name/ID
version = "0.1.0"
description = "A simple geospatial greeting library for learning Python packaging"
readme = "README.md"
requires-python = ">=3.9"
authors = [
    { name = "Your Name", email = "your.email@auckland.ac.nz" }
]
keywords = ["geospatial", "urban-analytics", "learning"]
classifiers = [
    "Development Status :: 3 - Alpha",
    "Intended Audience :: Education",
    "Programming Language :: Python :: 3",
    "Programming Language :: Python :: 3.9",
    "Programming Language :: Python :: 3.10",
    "Programming Language :: Python :: 3.11",
]

[project.urls]
Homepage = "https://github.com/yourusername/geohello-yourname"
Repository = "https://github.com/yourusername/geohello-yourname"
```

**Important changes**:
1. **name**: Must match your folder name
2. **description**: Short summary (appears on PyPI)
3. **authors**: Your name and email
4. **keywords**: Help people find your package
5. **classifiers**: Categorize your package
6. **urls**: Links to your code (update when you create GitHub repo)

---

### Understanding pyproject.toml Fields

| Field | Purpose | Example |
|-------|---------|---------|
| `name` | Package name (must be unique on PyPI) | `"geohello-alice"` |
| `version` | Current version (semantic versioning) | `"0.1.0"` |
| `description` | One-line summary | `"A greeting library"` |
| `readme` | Long description file | `"README.md"` |
| `requires-python` | Minimum Python version | `">=3.9"` |
| `dependencies` | Required packages | `["geopandas", "shapely"]` |
| `authors` | Package creators | `[{name = "Alice"}]` |

**For Assignment 3**, you'll add dependencies like:
```toml
dependencies = [
    "geopandas>=0.14.0",
    "shapely>=2.0.0",
    "pandas>=2.0.0",
]
```

---

### Step 7: Improve Your README

Open `README.md` and replace content with:

```markdown
# GeoHello

A simple Python package for generating geospatial greetings.

This package was created as part of GISCI 343 (Python for Urban Analytics) at the University of Auckland to learn Python packaging and publishing workflows.

## Installation

**Note**: This package is not yet published. Installation instructions will be added after Week 10.

For now, install locally:
```bash
git clone https://github.com/yourusername/geohello-yourname
cd geohello-yourname
pip install -e .
```

## Quick Start

```python
import geohello_yourname

# Basic greeting
print(geohello_yourname.hello())
# Output: Hello from Auckland!

# Custom place
print(geohello_yourname.hello("Tokyo"))
# Output: Hello from Tokyo!

# With coordinates
print(geohello_yourname.greeting_with_coords("Auckland", -36.8485, 174.7633))
# Output: Hello from Auckland at (-36.8485, 174.7633)!
```

## About

Created for GISCI 343: Python for Urban Analytics
University of Auckland, 2026

## License

MIT License (see LICENSE file)
```

**Why README matters**:
- First thing people see on GitHub and PyPI
- Explains how to install and use your package
- For Assignment 3, this is critical for users to understand your urban analytics tools

**✅ Checkpoint 3**: README updated? Good!

---

## Part 4: Build Your Package (25 minutes)

### Step 8: Build Distributions

Now for the exciting part - building your package!

```bash
uv build
```

**What happens**:
1. uv reads `pyproject.toml`
2. Finds your code in `src/geohello_yourname/`
3. Creates two distribution formats:
   - **Wheel** (`.whl`) - pre-built, fast to install
   - **Source distribution** (`.tar.gz`) - source code, built during install

**Expected output**:
```
Building geohello-yourname
  - Building wheel...
  - Built geohello_yourname-0.1.0-py3-none-any.whl
  - Building source distribution...
  - Built geohello_yourname-0.1.0.tar.gz

Successfully built geohello-yourname
```

---

### Step 9: Verify Build Outputs

Check what was created:

```bash
ls dist/
```

**You should see**:
```
geohello_yourname-0.1.0-py3-none-any.whl
geohello_yourname-0.1.0.tar.gz
```

**Understanding the wheel filename**:
- `geohello_yourname` - your package name
- `0.1.0` - version number
- `py3` - Python 3 compatible
- `none` - no specific ABI
- `any` - works on any platform (Windows, Mac, Linux)

This means your package is **pure Python** and platform-independent!

---

### Step 10: Understanding What's Inside

Let's peek inside the wheel:

```bash
unzip -l dist/geohello_yourname-0.1.0-py3-none-any.whl
```

**You'll see**:
```
Archive:  dist/geohello_yourname-0.1.0-py3-none-any.whl
  Length      Date    Time    Name
---------  ---------- -----   ----
     xxxx  2026-05-11 13:00   geohello_yourname/__init__.py
     xxxx  2026-05-11 13:00   geohello_yourname/py.typed
     xxxx  2026-05-11 13:00   geohello_yourname-0.1.0.dist-info/METADATA
     ...
```

**This is your packaged code** ready to be installed anywhere!

**✅ Checkpoint 4**: Two files in `dist/`? Perfect!

---

## Part 5: Test Installation Locally (30 minutes)

### Step 11: Create a Test Environment

Let's test if your package installs correctly. Create a **separate** test directory:

```bash
cd ..  # Go back up one level
mkdir test-geohello-install
cd test-geohello-install
```

**Why separate directory?**
- Tests installation from scratch
- Simulates a user downloading your package
- Catches import errors you might miss in development environment

---

### Step 12: Install Your Package Locally

Now install your package from the wheel you built:

```bash
uv init --bare
uv pip install ../geohello-yourname/dist/geohello_yourname-0.1.0-py3-none-any.whl
```

**What happens**:
1. `uv init --bare` creates a minimal project
2. `uv pip install` installs your wheel file
3. Your package is now available to import!

---

### Step 13: Test the Installed Package

```bash
uv run python -c "import geohello_yourname; print(geohello_yourname.hello())"
```

**Expected**: `Hello from Auckland!`

**Try more tests**:
```bash
# Test custom place
uv run python -c "import geohello_yourname; print(geohello_yourname.hello('Berlin'))"

# Test coordinates function
uv run python -c "import geohello_yourname; print(geohello_yourname.greeting_with_coords('Wellington', -41.2924, 174.7787))"

# Check version
uv run python -c "import geohello_yourname; print(geohello_yourname.__version__)"
```

**All working?** 🎉 **Your package is properly built!**

---

### Step 14: Interactive Testing

Create a small test script:

```bash
echo 'import geohello_yourname

# Test all functions
print(geohello_yourname.hello())
print(geohello_yourname.hello("London"))
print(geohello_yourname.greeting_with_coords("Sydney", -33.8688, 151.2093))
print(f"Package version: {geohello_yourname.__version__}")
' > test_package.py

uv run python test_package.py
```

**Expected output**:
```
Hello from Auckland!
Hello from London!
Hello from Sydney at (-33.8688, 151.2093)!
Package version: 0.1.0
```

**✅ Checkpoint 5**: Everything works? Excellent!

---

## Part 6: Version Control (20 minutes)

### Step 15: Initialize Git Repository

Go back to your package directory:

```bash
cd ../geohello-yourname
```

Check if git is already initialized:
```bash
git status
```

If not initialized (unlikely with `uv init`), run:
```bash
git init
```

---

### Step 16: Create .gitignore

**Important**: Don't commit build artifacts!

Check if `.gitignore` exists:
```bash
cat .gitignore
```

If it doesn't have these entries, add them:

```bash
echo '# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
env/
venv/
.venv/

# Distribution / packaging
dist/
build/
*.egg-info/
.eggs/

# uv
.python-version

# IDEs
.vscode/
.idea/
*.swp

# OS
.DS_Store
Thumbs.db
' >> .gitignore
```

**Why .gitignore?**
- `dist/` contains build artifacts (regenerated each build)
- `__pycache__/` is temporary Python bytecode
- These bloat your repository and cause conflicts

---

### Step 17: Make Your First Commit

```bash
git add .
git commit -m "Initial package structure for geohello

- Created package with uv init --lib
- Added hello() and greeting_with_coords() functions
- Configured pyproject.toml metadata
- Added comprehensive README
- Successfully built wheel and sdist
"
```

**✅ Checkpoint 6**: Commit successful? Great!

---

### Step 18: Create GitHub Repository (Optional but Recommended)

1. Go to https://github.com/new
2. Repository name: `geohello-yourname`
3. Description: "A simple geospatial greeting library for learning Python packaging"
4. **Public** (required for PyPI)
5. **Don't** initialize with README (you already have one)
6. Create repository

Then push your code:

```bash
git remote add origin https://github.com/YOUR-USERNAME/geohello-yourname.git
git branch -M main
git push -u origin main
```

**Update URLs in pyproject.toml** with your actual GitHub URL.

---

## Part 7: Reflection and Next Steps (10 minutes)

### What You Accomplished Today

✅ Created a properly structured Python package
✅ Wrote functions with docstrings and type hints
✅ Configured package metadata in `pyproject.toml`
✅ Built wheel and source distributions
✅ Tested installation locally
✅ Version controlled your code with git
✅ (Optional) Published code to GitHub

**This is a complete, working Python package!** Just not published yet.

---

### Week 9 Lab Submission (Due: End of Week 9 or Friday 15 May, 5pm)

Submit to Canvas:

1. **Screenshot 1**: Successful `uv build` output showing both `.whl` and `.tar.gz` created
2. **Screenshot 2**: Successful import test: `uv run python -c "import geohello_yourname; print(geohello_yourname.hello())"`
3. **Screenshot 3**: `ls dist/` showing your two distribution files
4. **Reflection** (100-150 words):
   - What did you learn about Python package structure?
   - What surprised you?
   - How will this help with Assignment 3?

**Grading**: Completion credit (ungraded, but required for Week 10)

---

### What's Next: Week 10

Next week we'll add:
- **Tests** with pytest
- **Documentation** with proper docstrings
- **Publication** to TestPyPI
- **Verification** of installation from TestPyPI

**Preparation for Week 10**:
- [ ] Create TestPyPI account: https://test.pypi.org/account/register/
- [ ] Verify email address
- [ ] Keep your `geohello-yourname` package - we'll use it next week!

---

## 🎓 Understanding Check (Self-Quiz)

Test your understanding:

1. **What's the difference between a wheel and source distribution?**
   <details>
   <summary>Answer</summary>
   Wheel (.whl) is pre-built and installs fast. Source distribution (.tar.gz) contains source code that's built during installation.
   </details>

2. **Why do we use the src/ layout?**
   <details>
   <summary>Answer</summary>
   Forces proper installation, catches import errors, separates source from tests, industry standard.
   </details>

3. **What does pyproject.toml do?**
   <details>
   <summary>Answer</summary>
   Describes package metadata (name, version, dependencies, authors) and configuration for build tools.
   </details>

4. **Why test installation in a separate directory?**
   <details>
   <summary>Answer</summary>
   Simulates a fresh user environment, catches packaging errors you might miss in development directory.
   </details>

5. **What would happen if we forgot `__init__.py`?**
   <details>
   <summary>Answer</summary>
   Python wouldn't recognize the directory as a package - imports would fail.
   </details>

---

## 🆘 Troubleshooting

### Problem: "ModuleNotFoundError: No module named 'geohello_yourname'"

**Solution**:
1. Check you're in the right directory: `pwd`
2. Try: `uv run python -c "import geohello_yourname"` (not just `python`)
3. Verify `__init__.py` exists: `ls src/geohello_yourname/`

---

### Problem: "uv build" fails with syntax error

**Solution**:
1. Check your Python code for syntax errors
2. Test manually: `uv run python -c "import geohello_yourname"`
3. Fix any import errors before building

---

### Problem: Package name contains hyphens but import uses underscores

**This is normal!**
- Package name (PyPI): `geohello-yourname` (hyphens OK)
- Import name (Python): `geohello_yourname` (must use underscores)
- Python converts hyphens to underscores automatically

---

### Problem: "dist/" folder doesn't exist

**Solution**:
```bash
# Create it explicitly
mkdir dist
uv build
```

---

## 📚 Additional Resources

**For deeper understanding**:
- Python Packaging Guide: https://packaging.python.org/
- uv documentation: https://docs.astral.sh/uv/
- PEP 621 (pyproject.toml): https://peps.python.org/pep-0621/
- Semantic Versioning: https://semver.org/

**Example packages to study**:
- GeoPandas: https://github.com/geopandas/geopandas
- Shapely: https://github.com/shapely/shapely
- OSMnx: https://github.com/gboeing/osmnx

---

## 💡 Thinking Ahead: Assignment 3

Your Assignment 3 package will be similar in structure, but with:
- **More complex functions** (geospatial analysis, not greetings!)
- **Dependencies** (geopandas, shapely, etc.)
- **Multiple modules** (e.g., `analysis.py`, `visualization.py`, `utils.py`)
- **Comprehensive tests** (Week 10 topic)
- **Full documentation** (Week 10 topic)

**Example Assignment 3 structure**:
```
escooter-analytics/
├── pyproject.toml
├── README.md
├── LICENSE
├── src/
│   └── escooter_analytics/
│       ├── __init__.py
│       ├── trips.py          # Trip analysis functions
│       ├── geofencing.py     # Geofence validation
│       ├── networks.py       # Network analysis
│       └── visualization.py  # Mapping functions
├── tests/
│   ├── test_trips.py
│   ├── test_geofencing.py
│   └── test_networks.py
├── examples/
│   └── demo.ipynb
└── docs/
    └── index.md
```

---

**Congratulations!** 🎉 **You've built your first Python package!**

**Next week**: Testing, documentation, and TestPyPI publication.

---

**Last Updated**: May 2026
**Course**: GISCI 343 - Python for Urban Analytics
**University of Auckland**
