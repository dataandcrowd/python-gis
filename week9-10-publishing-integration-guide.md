# Two-Week PyPI Publishing Integration: Weeks 9-10

## Overview

This guide integrates the PyPI publishing lab materials across **Weeks 9 and 10**, with Week 11 reserved for final polish and showcase preparation.

**Week 9**: Package structure, building, and local testing
**Week 10**: Testing, documentation, and TestPyPI publication
**Week 11**: Final polish, optional real PyPI, poster showcase prep

---

## Weekly Breakdown

### Week 9: "From Scripts to Packages"
**Theme**: Structure and build your first package

**Students learn:**
- Package architecture and the `src/` layout
- Writing `pyproject.toml` configuration
- Building distributions (wheel + sdist)
- Local testing and imports
- Modular code organization

**Students do:**
- Create `geohello-yourname` package
- Build locally with `uv build`
- Test imports in local environment
- Understand package metadata
- **No publication yet** - focus on structure and building

**Deliverable**: Built package (not yet published)

---

### Week 10: "Quality and Publication"
**Theme**: Test, document, and publish to TestPyPI

**Students learn:**
- Writing tests with pytest for geospatial code
- Documentation with docstrings and MkDocs
- TestPyPI workflow
- Handling publication errors
- Installation verification

**Students do:**
- Add tests to their `geohello` package (from Week 9)
- Write docstrings and basic documentation
- Publish to TestPyPI
- Verify installation works
- Apply lessons to Assignment 3 package

**Deliverable**: Published TestPyPI package URL

---

### Week 11: "Showcase Preparation"
**Theme**: Final polish and presentation

**Students focus on:**
- Assignment 3 final quality improvements
- Optional: Publish to real PyPI
- Poster design and printing
- Demonstration notebooks
- Course wrap-up

**Deliverable**: Assignment 3 submission + Poster

---

## Pedagogical Flow

```
Week 9: Build confidence
  └─> Students successfully build a package locally
      └─> "I made something that could be distributed!"

Week 10: Add quality + publish
  └─> Students add tests, docs, publish to TestPyPI
      └─> "My package is tested, documented, and publicly available!"

Week 11: Apply to real project
  └─> Students finalize Assignment 3 with all skills
      └─> "I'm a published package author!"
```

---

## Time Allocation

### Week 9 (4 hours total)
- **Lecture (2 hours)**:
  - Urban analytics: Micromobility/networks (45 min)
  - Package structure and architecture (45 min)
  - Live demo: Building a package (20 min)
  - Q&A (10 min)

- **Lab (2 hours)**:
  - Complete Week 9 lab guide
  - Students create and build their first package
  - Local testing and verification
  - Begin Assignment 3 planning

### Week 10 (4 hours total)
- **Lecture (2 hours)**:
  - Testing geospatial code (45 min)
  - Documentation strategies (30 min)
  - Publishing workflow and troubleshooting (30 min)
  - Live demo: TestPyPI publication (15 min)

- **Lab (2 hours)**:
  - Add tests to Week 9 package
  - Write docstrings
  - Publish to TestPyPI
  - Troubleshoot and verify
  - Apply to Assignment 3

### Week 11 (Labs only - no lecture due to King's Birthday)
- **Lab (2 hours)**:
  - Assignment 3 final polish
  - Optional: Real PyPI publication
  - Poster design workshop
  - Individual consultations

---

## Assessment Integration

### Week 9: Participation Activity (Optional)
**Task**: Build a simple package locally
**Weight**: Participation/completion credit (or ungraded)
**Due**: End of Week 9 lab
**Submission**: Screenshot of successful `uv build` output + `dist/` folder

**Purpose**: Low-stakes practice before graded work

---

### Week 10: TestPyPI Publication (Graded)
**Task**: Publish a tested, documented package to TestPyPI
**Weight**: 5% (part of Assignment 3 scaffolding)
**Due**: End of Week 10 (Friday 22 May, 5pm)
**Submission**:
- TestPyPI URL
- GitHub repository link
- Brief reflection (150 words)

**Criteria**:
- Package published successfully (2%)
- Tests pass (1%)
- Documentation present (1%)
- Installation verified (1%)

**Purpose**: Ensure all students can publish before final assignment

---

### Week 12: Assignment 3 (Main Assessment)
**Task**: Full urban analytics package published to PyPI
**Weight**: 30% (as per original syllabus)
**Due**: 5 June
**Requirements**: Build on Week 9-10 skills with complex functionality

---

## Materials Usage

### Week 9 Materials:
1. **Instructor**: Use "lab-pypi-publishing-instructor-notes.md" (Sections on package structure, building, common setup errors)
2. **Students**: Use "Week 9 Lab Guide" (created below)
3. **Reference**: Quick reference guide (building and structure sections only)

### Week 10 Materials:
1. **Instructor**: Use instructor notes (Sections on testing, publishing, troubleshooting)
2. **Students**: Use "Week 10 Lab Guide" (created below) + original student guide (Steps 5-8)
3. **Reference**: Full troubleshooting quick reference

### Week 11:
- Instructor notes (showcase preparation, final polish)
- No new lab guide (work session)

---

## Key Differences from Original Plan

| Aspect | Original Single-Week | New Two-Week Approach |
|--------|---------------------|---------------------|
| **Pace** | Rushed (all in one week) | Gradual, digestible |
| **Week 9** | Everything at once | Structure + building only |
| **Week 10** | Testing only | Testing + publication |
| **Cognitive load** | High | Manageable |
| **Error handling** | Limited time to debug | Two weeks to troubleshoot |
| **Application** | Theory → practice gap | Scaffold → apply |

---

## Success Metrics

### End of Week 9:
- 90%+ students have built package locally
- Students understand `src/` layout
- Students can explain `pyproject.toml` fields
- No publishing errors (because not publishing yet!)

### End of Week 10:
- 80%+ students published to TestPyPI
- Students have working tests
- Students resolved at least one common error
- Confidence in publishing workflow

### End of Week 11:
- 95%+ students submit Assignment 3
- Most students publish to real PyPI
- High-quality posters for showcase

---

## Communication to Students

### Week 9 Announcement:
> "This week we begin learning how to package Python code. You'll create your first package and build it locally. **We won't publish to PyPI yet** - Week 10 is for that. Focus this week on understanding package structure and getting your build working."

### Week 10 Announcement:
> "Now that you've built a package (Week 9), this week we add quality: tests and documentation. Then we'll publish to TestPyPI - the practice version of PyPI. This is your chance to learn the publishing workflow before Assignment 3."

### Week 11 Announcement:
> "No lecture this week (King's Birthday). Labs are dedicated to Assignment 3 final work, poster preparation, and optional real PyPI publication. This is your time to polish and prepare for the showcase."

---

## Instructor Preparation Checklist

### Before Week 9:
- [ ] Review package structure best practices
- [ ] Prepare live demo: `geohello-instructor-demo`
- [ ] Test `uv build` on lab computers
- [ ] Print Week 9 lab guides (1 per student)
- [ ] Prepare example `pyproject.toml` templates

### Before Week 10:
- [ ] Create TestPyPI account if you don't have one
- [ ] Prepare live demo: Publishing to TestPyPI
- [ ] Generate backup tokens for students who have issues
- [ ] Print troubleshooting quick reference (1 per 4 students)
- [ ] Review common TestPyPI errors

### Before Week 11:
- [ ] Finalize poster showcase logistics (venue, time)
- [ ] Prepare poster design examples
- [ ] Set up office hours schedule
- [ ] Review Assignment 3 submissions so far

---

## Student Journey Map

```
Week 9 Monday Lecture:
├─> "Wow, packages have structure I didn't know about"
├─> "pyproject.toml is like a package's resume"
└─> "The src/ layout makes sense for libraries"

Week 9 Tuesday Lab:
├─> "I created my first package!"
├─> "uv build actually worked!"
├─> "I can import my own code!"
└─> Feeling: Accomplished, but package is local only

Between Weeks 9-10:
├─> Start planning Assignment 3 package
├─> Think about testing strategies
└─> Read documentation examples

Week 10 Monday Lecture:
├─> "Testing spatial code has specific challenges"
├─> "Documentation is how people use my package"
└─> "TestPyPI is where I practice publishing"

Week 10 Tuesday Lab:
├─> "I added tests to my package!"
├─> "My package is on TestPyPI - it's real!"
├─> "I debugged a version conflict!"
└─> Feeling: Confident, ready for Assignment 3

Week 11 Labs:
├─> "My real package is almost done"
├─> "I'm designing my poster"
└─> Feeling: Pride in completed work

Week 12 Showcase:
└─> "I'm a published Python package author!"
```

---

## FAQ for Instructors

**Q: Why not publish in Week 9?**
A: Publishing adds complexity (tokens, errors, TestPyPI accounts). Week 9 focuses on structure - students build confidence without publication stress. Week 10 adds publication when they're comfortable with packaging.

**Q: What if students skip Week 9 lab?**
A: Week 10 will be very difficult. Emphasize Week 9 is foundation. Consider making Week 9 participation credit to ensure attendance.

**Q: Should Week 10 be graded?**
A: Recommend light grading (5%) as scaffolding for Assignment 3. Ensures everyone can publish before the main assignment.

**Q: What about students who finish early?**
A: Week 9: Start Assignment 3 package structure. Week 10: Publish Assignment 3 to TestPyPI early.

**Q: Is `geohello` too simple?**
A: That's the point! Simple example = focus on workflow, not complexity. Assignment 3 is where they apply to real geospatial problems.

---

## Next Steps

1. Review Week 9 revised syllabus section (below)
2. Review Week 10 revised syllabus section (below)
3. Use Week 9 lab guide in first week
4. Use Week 10 lab guide + original materials in second week
5. Monitor student progress and adjust as needed

**Key principle**: Scaffold the learning, celebrate small wins, build to complex application.
