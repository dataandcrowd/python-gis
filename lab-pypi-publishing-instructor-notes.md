# Instructor Notes: PyPI Publishing Lab

## 📋 Overview

This lab teaches students the complete workflow of creating and publishing a Python package to PyPI. It's designed for students with **limited Python experience** and emphasizes modern tooling (uv) and best practices.

---

## ⏱️ Time Estimates

| Section | Estimated Time | Notes |
|---------|---------------|-------|
| Pre-lab setup (accounts) | 10-15 min | Can be assigned as homework |
| Part 1: Create library | 20-25 min | Includes checkpoints and testing |
| Part 2: Build & publish | 25-35 min | Most errors happen here |
| Part 3: Real PyPI (optional) | 10-15 min | Only if time permits |
| Challenges (optional) | 15-30 min | For advanced students |
| **Total** | **60-90 min** | Budget 90 min for first-timers |

**Pacing recommendations:**
- **Week 1:** Parts 1-2 (TestPyPI only)
- **Week 2:** Part 3 + challenges (optional)
- **Homework:** Create accounts before class

---

## 🎯 Learning Outcomes Mapping

| Outcome | Assessment Method | Success Criteria |
|---------|------------------|------------------|
| Create a Python package | Lab completion | Package structure correct, imports work |
| Use modern build tools | Observation | Successfully runs `uv build` |
| Publish to PyPI | Verification | Package visible on TestPyPI |
| Debug packaging errors | Troubleshooting | Resolves at least 1 common error |
| Read package metadata | Quiz/discussion | Can explain pyproject.toml fields |

---

## 🚨 Anticipated Problems & Solutions

### Problem 1: "My package name is taken!"

**Frequency:** Very high (50-70% of students in large classes)

**Why it happens:**
- PyPI has millions of packages
- Simple names (geohello, test, mypackage) are already claimed
- Students don't check availability first

**Prevention:**
- Recommend unique naming convention in instructions
- Suggest: `packagename-studentid` or `packagename-uoa-2026`
- Have students check https://pypi.org/project/NAME before building

**Solution during class:**
1. "No problem! This is common. Just add your name to the package."
2. Update `name =` in pyproject.toml
3. Rename the directory: `mv src/geohello src/geohello-yourname`
4. Update imports if needed (usually not necessary for simple case)
5. Rebuild: `uv build`

**Teaching moment:** "This is why companies often prefix packages (e.g., `aws-`, `google-cloud-`)"

---

### Problem 2: "I already published 0.1.0, now I can't publish again!"

**Frequency:** High (30-40% of students)

**Why it happens:**
- Students make typos in code after publishing
- PyPI prevents re-uploading same version (by design)
- Students don't understand versioning

**Prevention:**
- Emphasize in lecture: **versions are immutable**
- Add clear warning in student guide
- Explain semantic versioning early

**Solution:**
1. "This is actually a feature, not a bug!"
2. Update `version = "0.1.1"` in pyproject.toml
3. Rebuild: `uv build`
4. Publish again

**Teaching moment:** "In production, this prevents breaking existing installations. Immutability = reliability."

---

### Problem 3: Token errors (invalid, expired, wrong scope)

**Frequency:** Moderate (20-30%)

**Why it happens:**
- Copy-paste errors (extra spaces, line breaks)
- Using TestPyPI token on PyPI or vice versa
- Token expires (though they shouldn't in this lab)

**Prevention:**
- Show token format: `pypi-AgEIcHlwaS5vcmc...` (starts with `pypi-`)
- Demonstrate copying carefully (select all, no extra whitespace)
- Emphasize TestPyPI vs PyPI tokens are different

**Solution:**
1. Verify token format: `echo "$TOKEN" | wc -c` (should be ~100+ chars)
2. Check for whitespace: `echo "pypi-YOUR-TOKEN" | cat -A`
3. Regenerate token if needed
4. For persistent issues: paste token in file temporarily (then delete!)

**Teaching moment:** "Tokens are like long passwords - one wrong character breaks everything."

---

### Problem 4: "ImportError: No module named geohello" after installation

**Frequency:** Low-Moderate (10-20%)

**Why it happens:**
- Wrong directory structure (forgot `src/`)
- Didn't rename folder when changing package name
- Installed wrong package (typo in package name)

**Prevention:**
- Checkpoint after Step 1: verify directory structure
- Use `uv run python -c "import geohello"` test before building

**Solution:**
1. Check installation: `uv pip list | grep geohello`
2. Verify structure: `ls -R src/`
3. Rebuild if structure is wrong
4. Reinstall: `uv pip uninstall geohello && uv add geohello`

---

### Problem 5: "uv: command not found"

**Frequency:** Low (5-10%, varies by environment)

**Why it happens:**
- Students didn't install uv
- Installation didn't add to PATH
- Using wrong terminal/environment

**Prevention:**
- Pre-lab requirement: install uv and verify
- Provide installation script for common platforms

**Solution:**
```bash
# Quick install (Unix):
curl -LsSf https://astral.sh/uv/install.sh | sh

# Or via pip:
pip install uv

# Verify:
uv --version
```

---

### Problem 6: Build failures due to syntax errors

**Frequency:** Moderate (15-25%)

**Why it happens:**
- Typos in `__init__.py`
- Missing quotes, colons, indentation errors
- Students unfamiliar with Python syntax

**Prevention:**
- Provide code to copy-paste (not retype)
- Run local test (`uv run python -c "import geohello"`) before building

**Solution:**
1. Check build output for error message
2. Run: `uv run python -c "import geohello"` to see Python error
3. Fix syntax error
4. Rebuild

---

## 💡 Teaching Tips

### Before the Lab

**Assign as homework (1 week before):**
- [ ] Install uv: https://docs.astral.sh/uv/getting-started/installation/
- [ ] Create TestPyPI account
- [ ] Verify uv works: `uv --version`

**In previous lecture, cover:**
- What is a package vs script
- Why code reuse matters
- Brief demo of `pip install` (they've seen this)
- Overview of PyPI ecosystem

---

### During the Lab

**Opening (5 min):**
1. "Today you'll publish code that **anyone in the world** can install"
2. Show example: `pip install requests` → it came from PyPI
3. "By the end, your package will be there too"
4. Emphasize: TestPyPI first (safe practice)

**Key moments to pause for whole-class sync:**

| After Step | Pause Point | Check-in Question |
|-----------|-------------|-------------------|
| 1 | File structure created | "Everyone have `src/geohello/__init__.py`?" |
| 2 | Local test works | "Everyone see 'Hello from Auckland!'?" |
| 5 | Build succeeded | "Everyone have 2 files in `dist/`?" |
| 7 | Published to TestPyPI | "Everyone see their package on test.pypi.org?" |
| 8 | Installation verified | "Everyone installed successfully?" |

**Common teaching mistakes to avoid:**
- ❌ Moving too fast through metadata (pyproject.toml) - students don't understand
- ❌ Not showing how to check if name is taken
- ❌ Skipping the verification step (Step 8) - crucial!
- ❌ Publishing to real PyPI in class (too risky, too permanent)

**Good practices:**
- ✅ Live-code alongside students (same errors = teachable moments)
- ✅ Have backup tokens ready (students will lose/break theirs)
- ✅ Celebrate first successful publish (it's genuinely exciting!)
- ✅ Show your own PyPI profile (you're a published author too)

---

### After the Lab

**Debrief discussion questions:**
1. "What surprised you about the process?"
2. "Why do you think PyPI doesn't let you delete packages?"
3. "When would you publish a package vs just share code on GitHub?"
4. "What would you add to your package next?"

**Follow-up assignments (optional):**
- Publish version 0.2.0 with an additional function
- Add a dependency (e.g., `requests`) and use it
- Write tests using `pytest`
- Add GitHub Actions to auto-publish

---

## 🎓 Assessment Rubric

### Lab Completion (Pass/Fail)

| Criteria | Pass | Fail |
|----------|------|------|
| Package published to TestPyPI | ✓ Package visible at test.pypi.org | Package not found |
| Package installable | ✓ `uv add` succeeds | Installation fails |
| Code executes | ✓ `geohello.hello()` returns string | Import or runtime error |
| Metadata complete | ✓ Name, version, description present | Missing critical fields |

### Optional Grading (100 points)

| Component | Points | Criteria |
|-----------|--------|----------|
| **Functionality** | 30 | Package works as specified |
| - Code executes | 15 | `hello()` function works |
| - Local testing | 10 | Verified before publishing |
| - Installation test | 5 | Successfully tested from TestPyPI |
| **Configuration** | 25 | Package metadata correct |
| - Unique name | 10 | Name not taken, follows conventions |
| - Version | 5 | Semantic versioning (0.1.0) |
| - Description & README | 10 | Clear, helpful documentation |
| **Process** | 30 | Followed best practices |
| - Used TestPyPI first | 15 | Published to test environment |
| - Build process | 10 | Generated wheel + sdist |
| - Verification | 5 | Tested installation separately |
| **Troubleshooting** | 15 | Handled errors independently |
| - Resolved 1+ issue | 10 | Fixed errors without help |
| - Asked good questions | 5 | Articulated problems clearly |
| **Total** | **100** | |

---

## 🔧 Pre-Lab Setup (For Instructors)

### Create Example Package

Publish your own example before class:

```bash
uv init --lib geohello-instructor-demo
cd geohello-instructor-demo
# ... follow student guide ...
uv publish --index testpypi --token YOUR-TOKEN
```

Then in class: "Here's mine: https://test.pypi.org/project/geohello-instructor-demo/"

---

### Prepare Backup Resources

1. **Token backup plan:**
   - Create TA/instructor tokens students can use temporarily
   - Keep tokens in secure password manager

2. **Network failure plan:**
   - Download wheels for uv: https://pypi.org/project/uv/#files
   - Have USB drives with uv installer

3. **Example troubleshooting repository:**
   - Create repo with common broken examples
   - Use to demo fixes: "Here's what happens if you forget `src/`..."

---

### Environment Testing

Test these scenarios before class:

- [ ] Fresh install on lab computers
- [ ] Firewall allows test.pypi.org and pypi.org
- [ ] uv is in PATH for all users
- [ ] Students have write permissions in home directories
- [ ] Internet is stable (PyPI uploads can timeout)

---

## 🌟 Extension Ideas

### For Fast Finishers

**Challenge 1: Add CLI (15 min)**
```python
# src/geohello/__init__.py
def main():
    import sys
    place = sys.argv[1] if len(sys.argv) > 1 else "Auckland"
    print(hello(place))

# pyproject.toml
[project.scripts]
geohello = "geohello:main"
```

Now users can run: `geohello Paris`

**Challenge 2: Add Tests (20 min)**
```bash
uv add --dev pytest
mkdir tests
echo 'from geohello import hello\n\ndef test_hello():\n    assert "Auckland" in hello()' > tests/test_geohello.py
uv run pytest
```

**Challenge 3: Real-world package**
"Build a package that solves a problem in your other coursework"

---

### For Struggling Students

**Simplified checklist version:**

```markdown
□ Create project: uv init --lib geohello
□ Edit __init__.py: add hello function
□ Test locally: uv run python -c "import geohello; print(geohello.hello())"
□ Edit pyproject.toml: change name to geohello-YOURNAME
□ Build: uv build
□ Get TestPyPI token
□ Add index to pyproject.toml
□ Publish: uv publish --index testpypi --token TOKEN
□ Test install in new folder
```

---

## 📊 Common Misconceptions

| Misconception | Reality | Correction Strategy |
|---------------|---------|---------------------|
| "I can delete from PyPI if I make a mistake" | Cannot delete, only yank | Emphasize TestPyPI for practice |
| "Packages are just scripts I upload" | Packages need structure, metadata | Show difference between .py file and package |
| "I need to increment version for every edit" | Only for published versions | Local edits don't need version bumps |
| "PyPI is like GitHub" | Different purposes | PyPI = distribution, GitHub = source control |
| "Tokens are like usernames" | Tokens are secret passwords | Show token format, explain security |

---

## 🎤 Demo Script (10-minute intro)

Use this for live demonstration before students start:

```
"Let me show you what we're building today.

[Open terminal]

I'm going to create a tiny package called 'demo-instructor':

    uv init --lib demo-instructor
    cd demo-instructor

[Show file structure]

See this structure? This is a LIBRARY, not a script. It's designed to be imported by other code.

[Edit __init__.py]

I'll add one function... done. Now let's test it locally:

    uv run python -c "import demo_instructor; print(demo_instructor.hello())"

Works! Now I'll build it:

    uv build

[Show dist/ folder]

These files - the .whl and .tar.gz - are what we upload to PyPI.

[Open pyproject.toml]

This file describes my package: name, version, description.

[Open test.pypi.org]

Now I'll publish to TestPyPI... [paste token, publish]

[Wait for success]

And now anyone can install it! Watch:

[New terminal, new directory]

    uv init --bare
    uv add --index https://test.pypi.org/simple/ demo-instructor
    uv run python -c "import demo_instructor; print(demo_instructor.hello())"

That's it! Your turn. Follow the guide, checkpoint by checkpoint. I'll be walking around to help."
```

---

## 📚 Additional Resources for Instructors

**Official Documentation:**
- uv docs: https://docs.astral.sh/uv/
- Python Packaging Guide: https://packaging.python.org/
- PyPI help: https://pypi.org/help/

**Background Reading:**
- [PEP 517](https://peps.python.org/pep-0517/) - Build system specification
- [PEP 621](https://peps.python.org/pep-0621/) - pyproject.toml standard
- [Semantic Versioning](https://semver.org/)

**Video Tutorials (for flipped classroom):**
- "Python Packaging for Beginners" - Real Python
- "Modern Python Packaging" - Talk Python

**Alternative Tools (if uv doesn't work):**
- Poetry: Similar modern tool, more opinionated
- Hatchling: Another build backend
- Setuptools: Traditional (not recommended for beginners)

---

## 🐛 Known Issues & Workarounds

### Issue: TestPyPI sometimes rejects uploads

**Symptom:** Random 5XX errors during publish
**Cause:** TestPyPI has lower reliability than production PyPI
**Workaround:** Wait 1-2 minutes and retry

---

### Issue: Students behind restrictive firewalls

**Symptom:** Cannot connect to pypi.org
**Cause:** Firewall blocks HTTPS uploads
**Workaround:** Request IT to whitelist:
- `https://test.pypi.org`
- `https://pypi.org`
- `https://files.pythonhosted.org`

---

### Issue: Package names with underscores vs hyphens

**Symptom:** Student publishes `geo-hello` but imports `geo_hello`
**Cause:** PyPI normalizes names, Python imports use underscores
**Solution:** This is expected! Explain normalization: `geo-hello` == `geo_hello` == `geo.hello`

---

## ✅ Pre-Class Checklist

**1 week before:**
- [ ] Send setup instructions (install uv, create accounts)
- [ ] Test lab on actual lab computers
- [ ] Verify internet access to PyPI domains

**1 day before:**
- [ ] Create your own example package
- [ ] Prepare backup tokens
- [ ] Print troubleshooting guide (1 per 4 students)

**Day of:**
- [ ] Test projection setup (students will need to see terminal)
- [ ] Open TestPyPI in browser (show leaderboard of student packages)
- [ ] Have class list ready (for unique name suggestions)

---

## 🎯 Success Metrics

**Good lab session indicators:**
- 80%+ students publish to TestPyPI
- 60%+ students complete verification (Step 8)
- Most common questions are about versioning/naming (not install issues)
- Students excited to show their PyPI pages

**Red flags:**
- Most questions about uv installation → Pre-lab prep insufficient
- Lots of network errors → Firewall/connectivity issues
- Many students stuck at same step → Pacing too fast
- No questions at all → Students aren't engaged or are lost

---

## 💬 FAQ (From Previous Iterations)

**Q: "Can students publish to real PyPI in class?"**
A: Not recommended for first lab. Real PyPI is permanent and claiming namespace can prevent future legitimate use. TestPyPI only.

**Q: "What if a student accidentally publishes something inappropriate?"**
A: TestPyPI resets periodically. For real PyPI, contact PyPI administrators to yank the release. Emphasize professionalism beforehand.

**Q: "Should we use personal or shared tokens?"**
A: Personal. It teaches real-world workflow and avoids rate limits. Keep instructor backup tokens for emergencies only.

**Q: "How to handle students who finish early?"**
A: Direct to optional challenges in student guide. Or: "Help a neighbor" (peer teaching).

**Q: "What if half the class has the same package name?"**
A: Pre-assign names: "Use `geohello-<your-student-ID>`" to guarantee uniqueness.

---

**Good luck! This lab is one students remember - they love seeing their code "in the wild" on PyPI. 🎉**
