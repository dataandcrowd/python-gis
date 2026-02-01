# Canvas Assignment Descriptions

**Copy-paste these into Canvas for Week 9 and Week 10 assignments**

---

## Week 9: Package Building Lab (Completion Credit)

### Assignment Title
Week 9 Lab: Building Your First Python Package

### Assignment Type
Lab Activity / Participation (Ungraded or Completion Credit)

### Due Date
Friday, 15 May 2026, 5:00 PM

### Points
Completion credit (required for Week 10 participation) OR 2% if grading

---

### Instructions

**Objective**: Create and build your first Python package locally using modern packaging tools.

In this lab, you'll create a simple Python package called `geohello-yourname` using the `uv` package manager. This hands-on activity teaches you the fundamentals of Python package structure, metadata configuration, and distribution building - essential skills for Assignment 3.

**Important**: This week we focus on building packages locally. We will NOT publish to PyPI yet - that's next week!

**What you'll do**:
1. Initialize a new library project with `uv init --lib`
2. Write simple functions with docstrings and type hints
3. Configure package metadata in `pyproject.toml`
4. Build wheel and source distributions
5. Test your package works locally
6. Version control your code with git

**Time estimate**: 2 hours (complete in Tuesday lab session)

---

### Learning Outcomes

By completing this lab, you will:
- Understand Python package structure and the `src/` layout
- Write valid `pyproject.toml` configuration files
- Build wheel (`.whl`) and source distribution (`.tar.gz`) files
- Test package installation locally before publishing
- Apply version control to package development

These skills are foundational for:
- Assignment 3 (30% of final grade)
- Professional Python development
- Open source contributions

---

### Materials Provided

- **Lab Guide**: Week 9 Lab Guide (Files → Week 9)
- **Lecture Slides**: Week 9 Package Development (Modules → Week 9)
- **Troubleshooting Reference**: Quick Reference Guide (Files → Week 9)

---

### Submission Requirements

Submit the following to Canvas:

#### 1. Screenshot 1: Successful Build (Required)
- Run `uv build` in your package directory
- Take screenshot showing both files created:
  - `geohello_yourname-0.1.0-py3-none-any.whl`
  - `geohello_yourname-0.1.0.tar.gz`
- Screenshot should show command and output

#### 2. Screenshot 2: Successful Import Test (Required)
- Run: `uv run python -c "import geohello_yourname; print(geohello_yourname.hello())"`
- Take screenshot showing output: `Hello from Auckland!`
- This proves your package structure is correct

#### 3. Screenshot 3: Distribution Files (Required)
- Run `ls dist/` to show your built files
- Take screenshot showing both `.whl` and `.tar.gz` files
- Includes file sizes and timestamps

#### 4. Reflection (100-150 words, Required)

Answer these questions:
- What did you learn about Python package structure?
- What surprised you during this lab?
- How will this knowledge help you with Assignment 3?
- What questions do you still have about packaging?

**Format**: Plain text or PDF

---

### Evaluation

**Completion credit** (ungraded, but required for Week 10):
- All three screenshots submitted: ✓
- Reflection completed: ✓

**If grading (2% of final grade)**:
- Screenshots show successful build and import (1%)
- Reflection demonstrates understanding (1%)

---

### Help and Resources

**During Lab**:
- Ask tutors and instructor for help
- Work through lab guide step-by-step
- Help your peers (collaboration encouraged!)

**If stuck**:
1. Check troubleshooting section in lab guide
2. Post question to Canvas discussion forum
3. Email instructor: hyesop.shin@auckland.ac.nz
4. Attend office hours (Mondays 3-5pm)

**Common issues**:
- Package name conflicts → Use unique name
- Import errors → Check `__init__.py` exists
- Build failures → Check Python syntax errors

---

### Important Notes

- You **do not need** a PyPI account for this week
- We will **not publish** packages this week - focus on local building
- Keep your package folder - we'll use it in Week 10!
- This is practice for Assignment 3 (due Week 12)

---

### Late Submission

- Completion credit: Must submit before Week 10 lab to participate
- If graded: 5% penalty per day late (including weekends)

---

### Academic Integrity

- You may collaborate and discuss with peers
- Write your own code and take your own screenshots
- AI tools (ChatGPT, Copilot) are permitted for debugging
- Understand all code you submit

---

### Questions?

Post to the Canvas discussion forum or ask during lab sessions!

**Looking ahead**: Next week (Week 10) we'll add tests, documentation, and publish to TestPyPI. Make sure you complete this week's lab to be ready!

---

---

## Week 10: Testing and TestPyPI Publication (Graded)

### Assignment Title
Week 10 Lab: Testing, Documentation, and TestPyPI Publication

### Assignment Type
Lab Assignment (Graded)

### Due Date
Friday, 22 May 2026, 5:00 PM

### Points
5% of final grade

---

### Instructions

**Objective**: Add tests and documentation to your Week 9 package, then publish it to TestPyPI (the practice version of PyPI).

Building on last week's `geohello-yourname` package, you'll now add professional-quality tests using pytest, write comprehensive documentation, and publish your package to TestPyPI - the safe testing environment before publishing to production PyPI.

This lab ensures everyone can successfully publish packages before tackling Assignment 3.

**What you'll do**:
1. Add pytest tests to your package (aim for >80% coverage)
2. Write comprehensive docstrings following NumPy style
3. Create a TestPyPI account and generate API token
4. Configure publishing settings in `pyproject.toml`
5. Publish your package to TestPyPI
6. Verify installation from TestPyPI works correctly
7. Troubleshoot common publication errors

**Prerequisites**:
- Completed Week 9 lab (built `geohello-yourname` package)
- TestPyPI account (create at https://test.pypi.org/account/register/)

**Time estimate**: 2 hours (complete in Tuesday lab session)

---

### Learning Outcomes

By completing this assignment, you will:
- Write effective tests for Python packages using pytest
- Measure and improve test coverage
- Document code with professional docstrings
- Navigate the PyPI publication workflow
- Troubleshoot common publishing errors
- Verify package installation and functionality

These skills prepare you for:
- Assignment 3 publication to real PyPI (30% of grade)
- Professional software development practices
- Open source package maintenance

---

### Materials Provided

- **Lab Guide**: Week 10 Lab Guide (Files → Week 10)
- **Lecture Slides**: Testing and Publishing (Modules → Week 10)
- **Troubleshooting Guide**: Quick Reference (Files → Week 10)
- **Example Tests**: Sample test files (Files → Week 10)

---

### Submission Requirements

Submit the following to Canvas by Friday, 22 May, 5:00 PM:

#### 1. TestPyPI URL (Required)
Provide the URL to your published package on TestPyPI:
- Format: `https://test.pypi.org/project/geohello-yourname/`
- Package must be visible and accessible
- Must show correct metadata (name, version, description)

#### 2. GitHub Repository URL (Required)
Link to your GitHub repository containing:
- Complete package source code
- Tests in `tests/` directory (at least 3 test functions)
- Enhanced docstrings in NumPy style
- Updated README with installation instructions
- LICENSE file (MIT recommended)
- Clear git commit history showing progression

**Your repository must be public.**

#### 3. Screenshot 1: TestPyPI Package Page (Required)
- Navigate to your package on TestPyPI
- Take full-page screenshot showing:
  - Package name and version
  - Description
  - README rendering
  - Download statistics section
- Proves package is published

#### 4. Screenshot 2: Successful Installation (Required)
- Create fresh directory
- Run: `uv add --index https://test.pypi.org/simple/ geohello-yourname`
- Take screenshot showing successful installation output
- Must show package name and version installed

#### 5. Screenshot 3: Verification Tests Passing (Required)
- Run the verification script from lab guide
- Take screenshot showing all tests passing:
  - Test 1: Default greeting ✓
  - Test 2: Custom place ✓
  - Test 3: Coordinates ✓
  - Test 4: Package metadata ✓
- Proves package works correctly after installation

#### 6. Reflection (150-200 words, Required)

Address these points:
- What challenges did you encounter during testing or publication?
- How did you resolve publication errors (if any)?
- What will you do differently when publishing Assignment 3?
- What did you learn about the testing and publication workflow?
- How confident do you feel about publishing to real PyPI for Assignment 3?

**Format**: Plain text or PDF

---

### Evaluation Criteria (5% total)

| Criteria | Points | Details |
|----------|--------|---------|
| **Package Published to TestPyPI** | 2% | • Package visible at provided URL<br>• Correct metadata (name, version, description)<br>• Installable via pip<br>• README renders correctly |
| **Tests Present and Passing** | 1% | • At least 3 meaningful test functions<br>• Tests pass when running pytest<br>• Test coverage >80%<br>• Tests in `tests/` directory |
| **Documentation Complete** | 1% | • Docstrings follow NumPy style<br>• README has installation instructions<br>• LICENSE file present<br>• Clear and helpful documentation |
| **Installation Verified** | 1% | • Screenshots show successful install<br>• Package works after installation<br>• All verification tests pass<br>• Proves package is functional |

---

### Grading Rubric Detail

**Package Published to TestPyPI (2%)**:
- 2% - Perfect: Package published, all metadata correct, installable, README renders
- 1.5% - Good: Package published, minor metadata issues, installable
- 1% - Acceptable: Package published but has issues
- 0% - Not published or not accessible

**Tests Present and Passing (1%)**:
- 1% - >80% coverage, 3+ meaningful tests, all pass
- 0.75% - 60-80% coverage, 3+ tests, all pass
- 0.5% - <60% coverage or some tests fail
- 0% - No tests or cannot run

**Documentation Complete (1%)**:
- 1% - All docstrings complete, README excellent, LICENSE present
- 0.75% - Most docstrings, good README, LICENSE present
- 0.5% - Basic docstrings, minimal README
- 0% - No documentation

**Installation Verified (1%)**:
- 1% - All screenshots present, verification complete, works perfectly
- 0.75% - Screenshots present, minor verification issues
- 0.5% - Incomplete verification
- 0% - Cannot verify installation

---

### Common Issues and Solutions

**Issue**: "The name 'geohello' is already taken"
**Solution**: Change package name to include your student ID: `geohello-12345678`

**Issue**: "File already exists" (version conflict)
**Solution**: Increment version in `pyproject.toml` to `0.1.1`, rebuild, republish

**Issue**: "Invalid token"
**Solution**: Regenerate token on TestPyPI, ensure no extra spaces when copying

**Issue**: Package not found when installing
**Solution**: Check package name spelling, verify publication succeeded, wait 1-2 minutes

See lab guide troubleshooting section for complete list!

---

### Help and Resources

**During Lab (Tuesday 2-4pm)**:
- Tutors available for technical help
- Instructor for conceptual questions
- Peer support encouraged

**Outside Lab**:
- Canvas discussion forum (24-48 hour response)
- Office hours: Mondays 3-5pm
- Email: hyesop.shin@auckland.ac.nz (48 hour response)

**Technical Resources**:
- uv publish guide: https://docs.astral.sh/uv/guides/publish/
- pytest docs: https://docs.pytest.org/
- TestPyPI help: https://test.pypi.org/help/

---

### Important Notes

- **TestPyPI vs PyPI**: TestPyPI is for practice! Data is periodically deleted. Don't worry about mistakes here.
- **Tokens**: Keep your API token secure. Don't commit it to git!
- **Publication is permanent**: Even on TestPyPI, you can't delete versions (only increment)
- **Test locally first**: Always run `uv build` and test locally before publishing
- **Assignment 3 preparation**: This lab teaches the exact workflow you'll use for Assignment 3

---

### Late Submission Policy

- 5% penalty per day late (including weekends)
- Maximum 5 days late (after that, 0%)
- Extensions available for documented circumstances (apply in advance)
- Technical issues: Contact instructor immediately, not after deadline

---

### Academic Integrity

**Permitted**:
- Discuss concepts and troubleshooting with peers
- Use AI tools (ChatGPT, Copilot) for debugging and learning
- Share general knowledge about PyPI and testing
- Help classmates fix errors during lab

**Not Permitted**:
- Copy code from peers without attribution
- Submit work you don't understand
- Share API tokens
- Submit identical packages as peers

**Remember**: This is a learning exercise. Struggling and solving problems is part of learning!

---

### Connection to Assignment 3

This lab is **direct preparation** for Assignment 3:

| Week 10 Lab | Assignment 3 |
|-------------|--------------|
| Simple `geohello` package | Complex urban analytics package |
| Basic tests | Comprehensive test suite (>80% coverage) |
| TestPyPI publication | Real PyPI publication |
| Simple functions | Geospatial analysis functions |
| 5% of grade | 30% of grade |

**Everything you learn this week applies directly to Assignment 3!**

---

### Extension Opportunities (Optional)

**For students who finish early or want extra challenge**:

1. **Add more sophisticated tests**:
   - Test edge cases (empty strings, special characters)
   - Use pytest fixtures
   - Add parametrized tests

2. **Set up CI/CD**:
   - Create GitHub Actions workflow
   - Automate testing on push
   - Generate coverage reports

3. **Start Assignment 3 package**:
   - Apply today's skills to your real project
   - Publish Assignment 3 to TestPyPI early
   - Get feedback before final deadline

No extra credit, but valuable learning!

---

### Success Indicators

You're successful if you can:
- ✓ Publish a package to TestPyPI
- ✓ Install your package in a fresh environment
- ✓ Run tests and see them pass
- ✓ Explain what each part of `pyproject.toml` does
- ✓ Troubleshoot common publication errors
- ✓ Feel confident about publishing Assignment 3

---

### Questions?

**Before starting**: Review lab guide, watch lecture recording
**During lab**: Ask tutors and instructor
**After lab**: Post to Canvas discussion forum

**Remember**: Everyone struggles with publication the first time. That's why we practice on TestPyPI first! Don't be discouraged by errors - debugging is part of learning.

---

### Looking Ahead

**Week 11**:
- Final polish for Assignment 3
- Optional: CI/CD and real PyPI publication
- Poster design for showcase

**Week 12**:
- Assignment 3 submission (30%)
- Poster showcase (10%)

**This week's skills (Week 10) are essential for success in Weeks 11-12!**

---

### Acknowledgments

Lab materials adapted from:
- uv documentation (Astral)
- Python Packaging Guide (PyPA)
- Real-world Python packaging best practices

Created for GISCI 343: Python for Urban Analytics
University of Auckland, 2026

---

**Good luck! We're excited to see your packages on TestPyPI! 🚀**
