# Week 10 Lab: Testing, Documentation, and TestPyPI Publication

**GISCI 343 - Week 10 Lab Activity**

## 🎯 Learning Objectives

By the end of this lab, you will:
- Write tests for your Python package using pytest
- Understand testing geospatial code and edge cases
- Write comprehensive docstrings and documentation
- Publish your package to TestPyPI
- Troubleshoot common publication errors
- Verify package installation from TestPyPI

**Time**: 2 hours
**Building on**: Week 9's `geohello-yourname` package
**New skills**: Testing, documentation, publishing

---

## Prerequisites

Before starting:
- [ ] Completed Week 9 lab (built `geohello-yourname` package)
- [ ] `geohello-yourname/` directory with working package
- [ ] TestPyPI account created (https://test.pypi.org/account/register/)
- [ ] Email verified on TestPyPI

**Don't have TestPyPI account yet?** Create one now:
1. Go to https://test.pypi.org/account/register/
2. Fill in username, email, password
3. Verify email (check spam folder!)
4. Come back to this lab

---

## Part 1: Add Tests to Your Package (40 minutes)

### Step 1: Install pytest

First, add pytest as a development dependency:

```bash
cd ~/Documents/GISCI343/geohello-yourname  # Your package directory
uv add --dev pytest pytest-cov
```

**What this does**:
- `--dev` means it's only needed for development (not for users)
- `pytest` is the testing framework
- `pytest-cov` measures test coverage

Check `pyproject.toml` - you'll see a new section:
```toml
[dependency-groups]
dev = [
    "pytest>=8.0.0",
    "pytest-cov>=4.1.0",
]
```

---

### Step 2: Create Test Directory

```bash
mkdir tests
touch tests/__init__.py
```

**Why `__init__.py` in tests/?**
- Makes tests importable
- Allows sharing test fixtures
- Standard practice

---

### Step 3: Write Your First Test

Create `tests/test_hello.py`:

```python
"""Tests for geohello_yourname package."""

import pytest
from geohello_yourname import hello, greeting_with_coords


def test_hello_default():
    """Test that default greeting returns Auckland."""
    result = hello()
    assert result == "Hello from Auckland!"
    assert "Auckland" in result


def test_hello_custom_place():
    """Test greeting with custom place name."""
    result = hello("Tokyo")
    assert result == "Hello from Tokyo!"
    assert "Tokyo" in result


def test_hello_empty_string():
    """Test greeting with empty string."""
    result = hello("")
    assert result == "Hello from !"


def test_coordinates_function():
    """Test greeting with coordinates."""
    result = greeting_with_coords("Wellington", -41.2924, 174.7787)
    assert "Wellington" in result
    assert "-41.2924" in result
    assert "174.7787" in result


def test_coordinates_negative():
    """Test that negative coordinates work correctly."""
    result = greeting_with_coords("South Pole", -90.0, 0.0)
    assert "South Pole" in result
    assert "-90.0" in result


@pytest.mark.parametrize("place,expected", [
    ("Paris", "Hello from Paris!"),
    ("Auckland", "Hello from Auckland!"),
    ("New York", "Hello from New York!"),
    ("Berlin", "Hello from Berlin!"),
])
def test_hello_parametrized(place, expected):
    """Test multiple places with parametrization."""
    assert hello(place) == expected
```

**Understanding the tests**:
- `test_hello_default()` - tests the default behavior
- `test_hello_custom_place()` - tests with custom input
- `test_hello_empty_string()` - tests edge case
- `@pytest.mark.parametrize` - tests multiple cases efficiently

---

### Step 4: Run Your Tests

```bash
uv run pytest
```

**Expected output**:
```
======================== test session starts ========================
collected 8 items

tests/test_hello.py ........                                  [100%]

========================= 8 passed in 0.12s =========================
```

**All green?** 🎉 **Your tests pass!**

---

### Step 5: Check Test Coverage

```bash
uv run pytest --cov=geohello_yourname --cov-report=term-missing
```

**Expected output**:
```
---------- coverage: platform linux, python 3.11.7 -----------
Name                              Stmts   Miss  Cover   Missing
---------------------------------------------------------------
src/geohello_yourname/__init__.py    4      0   100%
---------------------------------------------------------------
TOTAL                                 4      0   100%
```

**100% coverage!** Every line of your code is tested.

**✅ Checkpoint 1**: Tests pass and coverage is 100%? Perfect!

---

### Understanding Test Coverage

| Coverage | Meaning | Action |
|----------|---------|--------|
| 100% | Every line tested | Excellent! |
| 80-99% | Most code tested | Good, identify gaps |
| 60-79% | Moderate testing | Add more tests |
| <60% | Insufficient testing | Major gaps, add tests |

**For Assignment 3**: Aim for >80% coverage

---

## Part 2: Improve Documentation (25 minutes)

### Step 6: Review and Enhance Docstrings

Open `src/geohello_yourname/__init__.py` again.

Your docstrings should follow this format:

```python
def hello(place: str = "Auckland") -> str:
    """
    Generate a greeting for a specific place.

    This function demonstrates basic package functionality.
    In real geospatial packages, functions would perform complex
    spatial analysis, but the documentation structure is the same.

    Parameters
    ----------
    place : str, optional
        The location to greet from, by default "Auckland"

    Returns
    -------
    str
        A greeting message string

    Examples
    --------
    >>> hello()
    'Hello from Auckland!'

    >>> hello("Tokyo")
    'Hello from Tokyo!'

    Notes
    -----
    This is a simple demonstration. Real urban analytics packages
    would document data sources, assumptions, and edge cases here.

    See Also
    --------
    greeting_with_coords : Greeting function that includes coordinates
    """
    return f"Hello from {place}!"
```

**This is NumPy-style documentation** - the standard for scientific Python packages.

---

### Step 7: Add Module-Level Documentation

At the **top** of `src/geohello_yourname/__init__.py`, add:

```python
"""
GeoHello: A Simple Geospatial Greeting Library
===============================================

This package provides simple greeting functions for demonstrating
Python packaging concepts in the context of urban analytics.

Main Functions
--------------
- hello() : Generate a greeting for a place
- greeting_with_coords() : Generate a greeting with coordinates

Example Usage
-------------
>>> import geohello_yourname
>>> geohello_yourname.hello("Auckland")
'Hello from Auckland!'

For Assignment 3
----------------
Your urban analytics package will have similar structure but with
functions like:
- calculate_walkability() : Compute walkability index for an area
- analyze_escooter_trips() : Process e-scooter trip data
- assess_accessibility() : Measure accessibility to amenities

Each function should have complete docstrings like the examples here.
"""

__version__ = "0.1.0"
__author__ = "Your Name"
__email__ = "your.email@auckland.ac.nz"

# ... rest of your code
```

---

### Step 8: Update README with Installation from TestPyPI

Update your `README.md` with installation instructions:

```markdown
# GeoHello

A simple Python package for generating geospatial greetings.

Created for GISCI 343 (Python for Urban Analytics) to learn Python packaging.

## Installation

### From TestPyPI (Week 10)

```bash
pip install --index-url https://test.pypi.org/simple/ geohello-yourname
```

### From source

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

## API Reference

### `hello(place="Auckland")`

Generate a simple greeting for a place.

**Parameters:**
- `place` (str): Location name (default: "Auckland")

**Returns:**
- str: Greeting message

### `greeting_with_coords(place, lat, lon)`

Generate a greeting with geographic coordinates.

**Parameters:**
- `place` (str): Location name
- `lat` (float): Latitude in decimal degrees
- `lon` (float): Longitude in decimal degrees

**Returns:**
- str: Greeting with coordinates

## Development

### Running Tests

```bash
uv run pytest
```

### Check Coverage

```bash
uv run pytest --cov=geohello_yourname
```

## License

MIT License

## About

Created for GISCI 343: Python for Urban Analytics
University of Auckland, 2026
```

---

### Step 9: Add a LICENSE File

```bash
cat > LICENSE << 'EOF'
MIT License

Copyright (c) 2026 Your Name

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
EOF
```

**Why license matters**:
- Tells users how they can use your code
- Required for PyPI publication
- MIT is most common for open source

**✅ Checkpoint 2**: Documentation complete? Great!

---

## Part 3: Rebuild with Tests and Documentation (10 minutes)

### Step 10: Commit Your Changes

```bash
git add .
git commit -m "Add tests and documentation

- Added pytest tests with 100% coverage
- Enhanced docstrings with NumPy style
- Updated README with installation instructions
- Added MIT license
- Ready for TestPyPI publication
"
```

---

### Step 11: Rebuild the Package

```bash
uv build
```

**What's different this time?**
- Your package now includes tests (but they're not in the distribution)
- Documentation is embedded in docstrings
- LICENSE file is included

Check the new build:
```bash
ls -lh dist/
```

You'll see updated timestamps on your distribution files.

---

## Part 4: Publish to TestPyPI (35 minutes)

### Step 12: Generate TestPyPI Token

1. Visit https://test.pypi.org/manage/account/token/
2. Click **"Add API token"**
3. Token name: `geohello-publication-lab`
4. Scope: **"Entire account"** (for first time)
5. Click **"Add token"**
6. **Copy the token** (starts with `pypi-...`)

**⚠️ CRITICAL**: You can only see the token ONCE! Copy it now!

**Token format**:
```
pypi-AgEIcHlwaS5vcmc....[very long string]
```

Save it temporarily in a text file (delete after lab!)

---

### Step 13: Configure TestPyPI Index

Add this to the **bottom** of your `pyproject.toml`:

```toml
[[tool.uv.index]]
name = "testpypi"
url = "https://test.pypi.org/simple/"
publish-url = "https://test.pypi.org/legacy/"
explicit = true
```

**What this does**:
- Defines TestPyPI as a publishing target
- `explicit = true` means it won't be used unless you specify it
- Separate from the main PyPI

---

### Step 14: Publish!

**IMPORTANT**: Replace `YOUR-TOKEN` with your actual token!

```bash
uv publish --index testpypi --token pypi-YOUR-ACTUAL-TOKEN-HERE
```

**Expected output (success)**:
```
Uploading distributions to https://test.pypi.org/legacy/

Uploading geohello_yourname-0.1.0-py3-none-any.whl
Uploading geohello_yourname-0.1.0.tar.gz

View at:
https://test.pypi.org/project/geohello-yourname/
```

🎉 **CONGRATULATIONS!** Your package is published!

---

### 🚨 Common Errors and Solutions

<details>
<summary><b>Error: "403 Forbidden" or "The name 'geohello' is already taken"</b></summary>

**Problem**: Someone else used this name

**Solution**:
1. Change `name =` in `pyproject.toml` to something unique:
   ```toml
   name = "geohello-alice-12345"  # Add your student ID
   ```
2. Rebuild: `uv build`
3. Try publishing again
</details>

<details>
<summary><b>Error: "File already exists"</b></summary>

**Problem**: You already uploaded version 0.1.0

**Solution**:
1. Update version in `pyproject.toml`:
   ```toml
   version = "0.1.1"
   ```
2. Rebuild: `uv build`
3. Publish again

**Remember**: Can't re-upload same version!
</details>

<details>
<summary><b>Error: "Invalid or expired token"</b></summary>

**Solutions**:
1. Check token has no extra spaces/line breaks
2. Verify it starts with `pypi-`
3. Generate new token and try again
4. Make sure you're using TestPyPI token (not PyPI)
</details>

<details>
<summary><b>Error: "HTTPError: 400 Bad Request"</b></summary>

**Problem**: Metadata issue in pyproject.toml

**Solutions**:
1. Check all required fields are present: name, version, description
2. Ensure version follows format: `"0.1.0"` (quoted)
3. Verify no special characters in name
</details>

---

### Step 15: View Your Package on TestPyPI

Visit: `https://test.pypi.org/project/geohello-yourname/`

**You should see**:
- Your package name and version
- Description from pyproject.toml
- README rendered as the long description
- Release history
- **Download files** showing your wheel and sdist

**Take a screenshot!** You'll submit this.

**✅ Checkpoint 3**: Package visible on TestPyPI? Excellent!

---

## Part 5: Verify Installation from TestPyPI (20 minutes)

### Step 16: Create Fresh Test Environment

**Critical**: Test in a completely separate directory!

```bash
cd ~/Documents/GISCI343
mkdir test-testpypi-install
cd test-testpypi-install
```

---

### Step 17: Install from TestPyPI

```bash
uv init --bare
uv add --index https://test.pypi.org/simple/ geohello-yourname
```

**⚠️ Important**: Use YOUR package name!

**Expected output**:
```
Resolved 1 package in 0.5s
Downloaded 1 package in 0.3s
Installed 1 package in 0.2s
 + geohello-yourname==0.1.0
```

---

### Step 18: Test the Installed Package

```bash
uv run python -c "import geohello_yourname; print(geohello_yourname.hello())"
```

**Expected**: `Hello from Auckland!`

**More tests**:
```bash
# Test custom place
uv run python -c "import geohello_yourname; print(geohello_yourname.hello('TestPyPI'))"

# Test coordinates
uv run python -c "import geohello_yourname; print(geohello_yourname.greeting_with_coords('Wellington', -41.29, 174.78))"

# Check version
uv run python -c "import geohello_yourname; print(f'Version: {geohello_yourname.__version__}')"

# Check author
uv run python -c "import geohello_yourname; print(f'Author: {geohello_yourname.__author__}')"
```

**All working?** 🎊 **Your package is successfully published and installable!**

---

### Step 19: Create Verification Script

```bash
cat > verify_package.py << 'EOF'
"""Verify geohello_yourname package works correctly."""

import geohello_yourname

print("=" * 50)
print("Testing geohello_yourname package")
print("=" * 50)

# Test 1: Default hello
print("\nTest 1: Default greeting")
result1 = geohello_yourname.hello()
print(f"  Result: {result1}")
assert "Auckland" in result1, "Default should include Auckland"
print("  ✓ PASS")

# Test 2: Custom place
print("\nTest 2: Custom place")
result2 = geohello_yourname.hello("TestPyPI")
print(f"  Result: {result2}")
assert "TestPyPI" in result2, "Should include TestPyPI"
print("  ✓ PASS")

# Test 3: Coordinates
print("\nTest 3: Coordinates")
result3 = geohello_yourname.greeting_with_coords("Auckland", -36.8485, 174.7633)
print(f"  Result: {result3}")
assert "Auckland" in result3 and "-36.8485" in result3
print("  ✓ PASS")

# Test 4: Package metadata
print("\nTest 4: Package metadata")
print(f"  Version: {geohello_yourname.__version__}")
print(f"  Author: {geohello_yourname.__author__}")
print("  ✓ PASS")

print("\n" + "=" * 50)
print("ALL TESTS PASSED! Package works correctly.")
print("=" * 50)
EOF

uv run python verify_package.py
```

**Expected output**:
```
==================================================
Testing geohello_yourname package
==================================================

Test 1: Default greeting
  Result: Hello from Auckland!
  ✓ PASS

Test 2: Custom place
  Result: Hello from TestPyPI!
  ✓ PASS

Test 3: Coordinates
  Result: Hello from Auckland at (-36.8485, 174.7633)!
  ✓ PASS

Test 4: Package metadata
  Version: 0.1.0
  Author: Your Name
  ✓ PASS

==================================================
ALL TESTS PASSED! Package works correctly.
==================================================
```

**Take a screenshot of this output!**

**✅ Checkpoint 4**: All verification tests pass? You're done!

---

## Week 10 Lab Submission (Due: Friday 22 May, 5pm)

Submit to Canvas (Week 10 Assignment worth 5%):

### Required Submissions:

1. **TestPyPI URL**
   - Link to your package: `https://test.pypi.org/project/geohello-yourname/`

2. **GitHub Repository**
   - Link to your GitHub repo
   - Must include:
     - Complete package code
     - Tests in `tests/` directory
     - Enhanced docstrings
     - Updated README
     - LICENSE file
     - Clear commit history

3. **Screenshot 1**: TestPyPI package page showing your package

4. **Screenshot 2**: Successful installation output:
   ```bash
   uv add --index https://test.pypi.org/simple/ geohello-yourname
   ```

5. **Screenshot 3**: Verification script output showing all tests passing

6. **Reflection** (150-200 words):
   - What challenges did you encounter during testing or publication?
   - How did you resolve them?
   - What will you do differently for Assignment 3?
   - What did you learn about the publication workflow?

---

## Evaluation Criteria (5% of Final Grade)

| Criteria | Points | What We're Looking For |
|----------|--------|------------------------|
| **Package published to TestPyPI** | 2% | Package visible, correct metadata, installable |
| **Tests present and passing** | 1% | At least 3 meaningful tests, >80% coverage, pytest runs |
| **Documentation complete** | 1% | Docstrings follow NumPy style, README clear, LICENSE present |
| **Installation verified** | 1% | Screenshots show successful install and execution |

---

## Part 6: Applying to Assignment 3 (10 minutes)

### What You've Learned That Applies to Assignment 3

**Package structure**:
```
your-assignment3-package/
├── pyproject.toml          # ✓ You know how to configure this
├── README.md               # ✓ You know how to write this
├── LICENSE                 # ✓ You know to include this
├── src/
│   └── your_package/
│       ├── __init__.py     # ✓ You understand this
│       ├── analysis.py     # NEW: Your urban analytics functions
│       ├── visualization.py # NEW: Your mapping functions
│       └── utils.py         # NEW: Helper functions
├── tests/
│   ├── test_analysis.py    # ✓ You can write tests now
│   ├── test_visualization.py
│   └── test_utils.py
└── examples/
    └── demo.ipynb           # NEW: Demonstration notebook
```

**Key differences for Assignment 3**:
1. **More modules**: Split code into logical files
2. **Dependencies**: Add geopandas, shapely, etc.
3. **Real data**: Tests use actual geospatial data
4. **Complex functions**: Urban analytics, not greetings
5. **Documentation website** (optional): MkDocs

---

### Example Assignment 3 Test

```python
# tests/test_accessibility.py
import pytest
import geopandas as gpd
from shapely.geometry import Point
from your_package.accessibility import calculate_walkshed

def test_walkshed_basic():
    """Test walkshed calculation with simple point."""
    point = Point(174.7633, -36.8485)  # Auckland CBD
    distance = 800  # 800m = ~10 min walk

    walkshed = calculate_walkshed(point, distance)

    # Walkshed should be a polygon
    assert walkshed.geom_type == "Polygon"

    # Area should be approximately pi * r^2 (rough check)
    # With 800m radius ≈ 2 km² (in projected coordinates)
    assert walkshed.area > 0

def test_walkshed_invalid_distance():
    """Test that negative distance raises error."""
    point = Point(174.7633, -36.8485)

    with pytest.raises(ValueError):
        calculate_walkshed(point, distance=-100)
```

---

## 🎓 Understanding Check

Answer these questions to test your understanding:

1. **What's the difference between TestPyPI and real PyPI?**
   <details>
   <summary>Answer</summary>
   TestPyPI is for practice/testing. Data is periodically deleted. Real PyPI is permanent and production. Always test on TestPyPI first!
   </details>

2. **Why test in a separate directory after installation?**
   <details>
   <summary>Answer</summary>
   Simulates fresh user environment, catches packaging errors, ensures package is truly standalone.
   </details>

3. **Can you re-upload the same version number?**
   <details>
   <summary>Answer</summary>
   No! Must increment version. This ensures reproducibility - same version = same code.
   </details>

4. **What does 80% test coverage mean?**
   <details>
   <summary>Answer</summary>
   80% of code lines are executed by tests. Higher = more confident code works correctly.
   </details>

5. **Why write docstrings?**
   <details>
   <summary>Answer</summary>
   Users need to know how to use functions. Tools can generate documentation from docstrings. Shows professionalism.
   </details>

---

## 🆘 Troubleshooting Guide

**Problem**: Tests fail after publication
**Solution**: You probably edited code without re-building. Run `uv build` again.

**Problem**: Can't find my package on TestPyPI
**Solution**: Check URL is correct, verify publication succeeded, wait 1-2 minutes for indexing.

**Problem**: Import works in dev but not after install
**Solution**: Check package name vs import name (hyphens vs underscores), verify `__init__.py` exists.

**Problem**: "No distributions available" when installing
**Solution**: Check you're using correct index URL, verify package name spelling, ensure publication succeeded.

---

## 🚀 Next Steps

**This week (Week 10)**:
- Complete this lab and submit to Canvas
- Start building your Assignment 3 package

**Next week (Week 11)**:
- Polish Assignment 3 package
- Optional: Set up CI/CD with GitHub Actions
- Optional: Publish to real PyPI
- Design poster for showcase

**Week 12 (Final)**:
- Submit Assignment 3
- Present poster at showcase
- Celebrate being a published package author!

---

## 📚 Additional Resources

**Testing**:
- pytest documentation: https://docs.pytest.org/
- Testing geospatial code: Examples in GeoPandas tests
- pytest-cov: https://pytest-cov.readthedocs.io/

**Documentation**:
- NumPy docstring guide: https://numpydoc.readthedocs.io/
- Writing good README: https://www.makeareadme.com/
- Choose a license: https://choosealicense.com/

**Publishing**:
- uv publish guide: https://docs.astral.sh/uv/guides/publish/
- TestPyPI: https://test.pypi.org/
- PyPI help: https://pypi.org/help/

---

**Congratulations!** 🎉 **You've published your first package to TestPyPI!**

You now know the complete workflow: build → test → document → publish → verify.

Next: Apply these skills to create a professional urban analytics package for Assignment 3!

---

**Last Updated**: May 2026
**Course**: GISCI 343 - Python for Urban Analytics
**University of Auckland**
