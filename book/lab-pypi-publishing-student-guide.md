# Lab: Publishing Your First Python Package to PyPI

## 🎯 Learning Objectives

By the end of this lab, you will:
- Understand what a Python package is and how it differs from a script
- Build a distributable Python library
- Publish your package to TestPyPI (testing platform) and PyPI (production)
- Install and use your published package
- Understand modern Python packaging workflows

**Estimated Time:** 60-90 minutes

---

## 📚 Key Vocabulary

Before we start, let's define important terms:

| Term | Definition |
|------|------------|
| **Package** | A collection of Python modules that can be installed and imported |
| **Module** | A single Python file (`.py`) containing code |
| **PyPI** | The Python Package Index - the official repository for Python packages (like an app store for code) |
| **TestPyPI** | A separate instance of PyPI for testing (uploads here don't affect the real PyPI) |
| **Wheel** | A pre-built package format (`.whl` file) that installs quickly |
| **Source Distribution (sdist)** | A package in source code form (`.tar.gz` file) that needs to be built |
| **API Token** | A secret password for publishing packages (safer than username/password) |
| **pyproject.toml** | The configuration file that describes your package |

---

## 🛠️ Prerequisites

1. **uv installed** - Check with: `uv --version`
   - If not installed, visit: https://docs.astral.sh/uv/getting-started/installation/

2. **TestPyPI account** (you'll create this in Step 6)

3. **PyPI account** (optional, for Step 8)

---

## Part 1: Create Your Library Project

### Step 1: Initialize a New Library

```bash
uv init --lib geohello
cd geohello
```

**What just happened?**
- `--lib` tells uv to create a **library** (code for others to use) rather than an application
- This creates a `src/` layout, which is best practice for libraries

**✅ Checkpoint:** You should see these files:
```
geohello/
├── pyproject.toml       # Package configuration
├── README.md            # Description (appears on PyPI)
├── src/
│   └── geohello/
│       ├── __init__.py  # Your code goes here
│       └── py.typed     # Tells Python your package has type hints
```

---

### Step 2: Write Your Package Code

Open `src/geohello/__init__.py` and **replace** the entire content with:

```python
"""A simple geospatial greeting library."""

__version__ = "0.1.0"

def hello(place: str = "Auckland") -> str:
    """
    Generate a greeting for a specific place.

    Args:
        place: The location to greet from (default: Auckland)

    Returns:
        A greeting message string
    """
    return f"Hello from {place}!"
```

**💡 Why `__init__.py`?**
- This file makes the folder a Python package
- Code here is available when someone does `import geohello`
- Without it, Python won't recognize the folder as a package

**Test it locally:**
```bash
uv run python -c "import geohello; print(geohello.hello())"
```

**Expected output:** `Hello from Auckland!`

**Try with a custom place:**
```bash
uv run python -c "import geohello; print(geohello.hello('Paris'))"
```

**Expected output:** `Hello from Paris!`

**✅ Checkpoint:** If you see the greeting, your package works locally!

---

### Step 3: Configure Package Metadata

Open `pyproject.toml` and review these critical fields:

```toml
[project]
name = "geohello"              # ⚠️ Must be UNIQUE on PyPI!
version = "0.1.0"              # Start at 0.1.0 for first release
description = "A simple geospatial greeting library"
readme = "README.md"           # This appears on your PyPI page
requires-python = ">=3.9"      # Minimum Python version
```

**🚨 IMPORTANT: Package Naming Rules**
1. **Must be globally unique** across ALL of PyPI (millions of packages!)
2. Can only contain letters, numbers, hyphens, underscores
3. Case-insensitive (GeoheLLo = geohello)
4. Check if taken: https://pypi.org/project/geohello

**Recommended for this lab:** Use a unique name like:
- `geohello-yourname` (e.g., `geohello-alice`)
- `geohello-uoa-2026` (your university + year)
- `geohello-lab-{random}` (e.g., `geohello-lab-42`)

**Update your `name =` field now** before proceeding!

**✅ Checkpoint:** Your pyproject.toml has a unique package name

---

### Step 4: Improve Your README

Your README.md appears on your PyPI page. Edit it to be helpful:

```markdown
# GeoHello

A simple Python library for generating geospatial greetings.

## Installation

```bash
pip install geohello-yourname  # Use YOUR package name!
```

## Quick Start

```python
import geohello

print(geohello.hello())           # Hello from Auckland!
print(geohello.hello("Tokyo"))    # Hello from Tokyo!
```

## About

Created for the GIScience Python course at UoA.
```

**💡 Why this matters:**
- First thing people see on https://pypi.org/project/your-package/
- Good documentation = more users!

---

## Part 2: Build and Publish

### Step 5: Build Your Package

```bash
uv build
```

**What just happened?**
- uv created two types of distribution files in `dist/`:
  - `geohello_yourname-0.1.0-py3-none-any.whl` (wheel - fast to install)
  - `geohello_yourname-0.1.0.tar.gz` (source distribution - contains source code)

**Check what was created:**
```bash
ls dist/
```

**💡 Understanding Distribution Files:**
- **Wheel (.whl)**: Pre-built, ready to install (like a compiled app)
- **Sdist (.tar.gz)**: Source code that gets built during installation
- PyPI requires **both** for most packages

**✅ Checkpoint:** You have 2 files in `dist/`

---

### Step 6: Configure TestPyPI

**First, create a TestPyPI account:**
1. Visit https://test.pypi.org/account/register/
2. Verify your email
3. Go to https://test.pypi.org/manage/account/token/
4. Click "Add API token"
   - Token name: `uv-publishing-lab`
   - Scope: "Entire account" (for now)
5. **Copy the token** (starts with `pypi-...`) - you can't see it again!

**Add TestPyPI as a publishing index:**

Add this to the **bottom** of your `pyproject.toml`:

```toml
[[tool.uv.index]]
name = "testpypi"
url = "https://test.pypi.org/simple/"
publish-url = "https://test.pypi.org/legacy/"
explicit = true
```

**💡 Why TestPyPI?**
- Safe practice environment - mistakes here don't affect real PyPI
- You can experiment without consequences
- Standard workflow: TestPyPI → verify → real PyPI

**✅ Checkpoint:** TestPyPI index configured in pyproject.toml

---

### Step 7: Publish to TestPyPI

**⚠️ SECURITY NOTE:** Never commit your token to git!

**Publish:**
```bash
uv publish --index testpypi --token pypi-YOUR-TOKEN-HERE
```

**Expected output (success):**
```
Uploading geohello_yourname-0.1.0-py3-none-any.whl
Uploading geohello_yourname-0.1.0.tar.gz
✓ Successfully published to https://test.pypi.org/project/geohello-yourname/
```

**🎉 Success!** Visit the URL to see your package live!

---

### 🚨 Common Errors and Solutions

<details>
<summary><b>Error: "403 Forbidden" or "File already exists"</b></summary>

**Problem:** Package name is taken OR you already uploaded this version.

**Solutions:**
1. **If name is taken:** Change `name =` in pyproject.toml to something unique
2. **If version exists:** Increment `version = "0.1.1"` in pyproject.toml
3. Rebuild: `uv build`
4. Try publishing again

**Note:** You can NEVER re-upload the same version. Always increment!
</details>

<details>
<summary><b>Error: "Invalid or expired token"</b></summary>

**Problem:** Token is wrong or wasn't copied correctly.

**Solutions:**
1. Check your token starts with `pypi-` and has no extra spaces
2. Generate a new token at https://test.pypi.org/manage/account/token/
3. Try again
</details>

<details>
<summary><b>Error: "File name has been previously used"</b></summary>

**Problem:** You already uploaded this version.

**Solutions:**
1. Bump version in pyproject.toml: `version = "0.1.1"`
2. Run `uv build` again
3. Publish again
</details>

<details>
<summary><b>Error: Network connection issues</b></summary>

**Solutions:**
1. Check your internet connection
2. Try again - TestPyPI sometimes has brief outages
3. If upload partially succeeded, re-running is safe (PyPI ignores duplicates)
</details>

---

### Step 8: Verify Your Package Works

**Create a completely separate test project:**

```bash
cd ..                          # Leave your geohello folder
mkdir test-install
cd test-install
uv init --bare                 # Creates minimal project
```

**Install your package from TestPyPI:**
```bash
uv add --index https://test.pypi.org/simple/ geohello-yourname
```

**Test it:**
```bash
uv run python -c "import geohello; print(geohello.hello('TestPyPI'))"
```

**Expected output:** `Hello from TestPyPI!`

**✅ Checkpoint:** If this works, your package is successfully published and installable!

**💡 Why this step is crucial:**
- Verifies the package installs correctly
- Catches packaging errors before publishing to real PyPI
- Simulates what users will experience

---

## Part 3: Publishing to Real PyPI (Optional)

**⚠️ WARNING: Real PyPI is permanent!**
- You **cannot delete** packages (only "yank" versions)
- Package names are claimed forever
- Think carefully before publishing

### Step 9: Publish to Production PyPI

If you're confident and want your package on real PyPI:

1. **Create a PyPI account:** https://pypi.org/account/register/
2. **Generate a token:** https://pypi.org/manage/account/token/
3. **Publish:**
   ```bash
   cd ../geohello  # Back to your package directory
   uv publish --token pypi-YOUR-REAL-PYPI-TOKEN
   ```

4. **Verify:**
   ```bash
   cd ..
   mkdir final-test
   cd final-test
   uv init --bare
   uv add geohello-yourname  # No --index needed for real PyPI!
   uv run python -c "import geohello; print(geohello.hello('PyPI'))"
   ```

**🎉 Congratulations!** Your package is now publicly available to millions of Python developers worldwide!

---

## 🚀 Optional Challenges

### Challenge 1: Add a Dependency
Modify your package to use an external library:

```bash
cd geohello
uv add requests
```

Update `src/geohello/__init__.py`:
```python
import requests

def geocode(place: str) -> str:
    """Get coordinates for a place name (mock example)."""
    # In real world, you'd call a geocoding API
    return f"Geocoding {place}... (this is a demo)"
```

Rebuild and publish as version `0.2.0`.

---

### Challenge 2: Fix a Bug and Release Patch

1. Find a "bug" in your code (e.g., add input validation)
2. Update version to `0.1.1` (patch version)
3. Update README with changelog
4. Rebuild and republish

**Learn about:** Semantic versioning (MAJOR.MINOR.PATCH)

---

### Challenge 3: Add Type Checking

```bash
uv add --dev mypy
uv run mypy src/geohello
```

Fix any type errors, then republish.

---

## 📖 Key Takeaways

1. **Modern Python packaging is standardized** - pyproject.toml is the single source of truth
2. **TestPyPI is your friend** - always test there first
3. **Versions can't be replaced** - only incremented
4. **Package names are global** - choose wisely
5. **Tokens > passwords** - never use passwords for publishing
6. **Documentation matters** - README shows on PyPI page

---

## 🔗 Additional Resources

- **uv documentation:** https://docs.astral.sh/uv/
- **Python Packaging Guide:** https://packaging.python.org/
- **PyPI:** https://pypi.org/
- **TestPyPI:** https://test.pypi.org/
- **Semantic Versioning:** https://semver.org/

---

## 🆘 Getting Help

**Common issues checklist:**
- [ ] Package name is unique
- [ ] Version number increments each publish
- [ ] Token is valid and has no extra spaces
- [ ] `uv build` succeeded without errors
- [ ] You're in the correct directory (`geohello/`)

**Still stuck?** Ask your instructor or check the troubleshooting guide.

---

## 🎓 Quiz Questions (Self-Check)

1. What's the difference between a wheel and a source distribution?
2. Why do we publish to TestPyPI first?
3. Can you delete a package from PyPI? Why or why not?
4. What happens if two people try to publish packages with the same name?
5. What does `__init__.py` do in a Python package?

**Answers:**
1. Wheel is pre-built (fast install), sdist is source code (built during install)
2. To test safely without affecting production PyPI or claiming package names permanently
3. No - only "yank" to hide versions. PyPI names are permanent to ensure dependency stability
4. First one wins - package names are globally unique, first-come-first-served
5. Makes a directory a Python package and defines what's available when imported

---

**Lab complete! 🎉** You're now a published Python package author!
