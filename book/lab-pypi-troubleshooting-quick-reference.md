# PyPI Publishing Quick Troubleshooting Reference

**Print this page and keep it handy during the lab!**

---

## 🔥 Most Common Errors (90% of issues)

### Error: "The name 'geohello' is already in use"

**Quick fix:**
```toml
# In pyproject.toml, change:
name = "geohello"
# To something unique:
name = "geohello-yourname"
```
Then: `uv build` and try publishing again

**Why:** PyPI has millions of packages. Names must be globally unique.

---

### Error: "File already exists" or "Version 0.1.0 already uploaded"

**Quick fix:**
```toml
# In pyproject.toml, increment version:
version = "0.1.1"  # Was 0.1.0
```
Then: `uv build` and try publishing again

**Why:** PyPI never allows re-uploading the same version. Always increment!

---

### Error: "Invalid or expired token"

**Quick fix:**
1. Check your token starts with `pypi-`
2. Make sure no extra spaces when pasting
3. Generate a new token at https://test.pypi.org/manage/account/token/
4. Try again with new token

**Why:** Tokens are long and easy to copy incorrectly.

---

### Error: "No module named 'geohello'" after installing

**Quick fix:**
```bash
# Check if installed:
uv pip list | grep geohello

# If wrong package, uninstall and reinstall:
uv pip uninstall geohello
uv add --index https://test.pypi.org/simple/ geohello-yourname
```

**Why:** You might have installed a different package with a similar name.

---

### Error: "uv: command not found"

**Quick fix:**
```bash
# Install uv:
curl -LsSf https://astral.sh/uv/install.sh | sh

# Or via pip:
pip install uv

# Close and reopen your terminal, then:
uv --version
```

**Why:** uv isn't installed or not in your PATH.

---

## 📋 Step-by-Step Checklist

Use this if you're stuck and don't know where you went wrong:

**Before Building:**
- [ ] `src/geohello/__init__.py` exists and has the `hello()` function
- [ ] Local test works: `uv run python -c "import geohello; print(geohello.hello())"`
- [ ] `pyproject.toml` has a unique package name
- [ ] Version is set (usually `0.1.0` for first publish)

**Before Publishing:**
- [ ] Build succeeded: `uv build` (no errors)
- [ ] Two files in `dist/`: a `.whl` and a `.tar.gz`
- [ ] TestPyPI account created
- [ ] Token generated and copied correctly
- [ ] Index added to `pyproject.toml`

**After Publishing:**
- [ ] Package appears at https://test.pypi.org/project/your-package-name/
- [ ] Fresh install works in a different directory
- [ ] Import succeeds: `python -c "import geohello"`

---

## 🆘 Debugging Commands

**Check package structure:**
```bash
ls -R src/
# Should show: src/geohello/__init__.py
```

**Test import locally:**
```bash
uv run python -c "import geohello; print(geohello.hello())"
# Should print: Hello from Auckland!
```

**Verify build outputs:**
```bash
ls dist/
# Should show 2 files: .whl and .tar.gz
```

**Check what's installed:**
```bash
uv pip list | grep geohello
```

**Verify token format:**
```bash
echo "YOUR-TOKEN" | head -c 10
# Should print: pypi-AgEIc or similar
```

---

## 🎯 Quick Decision Tree

```
Can't publish?
├─ "Name already exists" → Change name in pyproject.toml
├─ "Version already exists" → Increment version in pyproject.toml
├─ "Invalid token" → Generate new token
└─ "Network error" → Check internet, try again in 1 minute

Can't install?
├─ "Package not found" → Check spelling, verify on test.pypi.org
├─ "No module named..." → Check package installed: uv pip list
└─ Wrong version installed → uv pip uninstall, then reinstall

Build fails?
├─ Syntax error → Fix Python code in __init__.py
├─ "File not found" → Check directory structure (src/geohello/)
└─ Other error → Read error message, fix mentioned file

Import fails?
├─ "No module named..." → Package not installed or wrong name
├─ "AttributeError" → Function name wrong (should be .hello())
└─ Other error → Check code in __init__.py
```

---

## 🔄 Version Number Guide

| What Changed | Old Version | New Version | Example |
|--------------|-------------|-------------|---------|
| Fixed typo | 0.1.0 | 0.1.1 | Patch |
| Added function | 0.1.1 | 0.2.0 | Minor |
| Major rewrite | 0.2.0 | 1.0.0 | Major |

**Remember:** Always increment before republishing!

---

## 🔐 Token Security

**DO:**
✅ Generate one token per project
✅ Copy carefully (no extra spaces)
✅ Keep tokens secret

**DON'T:**
❌ Commit tokens to git
❌ Share tokens with others
❌ Use the same token for TestPyPI and PyPI

---

## 📝 Command Reference

**Essential commands:**
```bash
# Create new library
uv init --lib mypackage

# Build distributions
uv build

# Publish to TestPyPI
uv publish --index testpypi --token pypi-YOUR-TOKEN

# Publish to real PyPI
uv publish --token pypi-YOUR-TOKEN

# Install from TestPyPI
uv add --index https://test.pypi.org/simple/ mypackage

# Install from PyPI
uv add mypackage
```

---

## 🌐 Important URLs

| Purpose | URL |
|---------|-----|
| TestPyPI home | https://test.pypi.org |
| TestPyPI register | https://test.pypi.org/account/register/ |
| TestPyPI tokens | https://test.pypi.org/manage/account/token/ |
| Check if name is taken | https://pypi.org/project/NAME |
| Real PyPI home | https://pypi.org |
| uv documentation | https://docs.astral.sh/uv/ |

---

## 💡 Pro Tips

1. **Always use TestPyPI first** - mistakes there don't affect production
2. **Test locally before building** - catch errors early
3. **Check if name is taken** before choosing - save time
4. **Read error messages carefully** - they usually tell you exactly what's wrong
5. **Keep a version log** - write down what changed in each version

---

## ❓ Quick Questions Answered

**Q: Can I delete a package from PyPI?**
A: No. You can only "yank" versions to hide them. Choose names carefully!

**Q: Can I change my package name after publishing?**
A: Not really. You'd need to publish a completely new package with a new name.

**Q: How do I update my package?**
A: Increment version, rebuild (`uv build`), and publish again.

**Q: What if I make a typo in my code after publishing?**
A: Fix it, increment version to 0.1.1, rebuild, and republish.

**Q: TestPyPI vs PyPI - which should I use?**
A: For this lab, TestPyPI only. Real PyPI is permanent!

**Q: How long until my package shows up after publishing?**
A: Usually instant (< 1 minute).

---

## 🎓 When to Ask for Help

**Try to fix it yourself first if:**
- Error message is clear (e.g., "name already exists")
- It's one of the common errors listed above
- You can Google the exact error message

**Ask for help if:**
- Error message is unclear or very long
- You've tried the suggested fix and it still doesn't work
- You're stuck for more than 5 minutes
- You're not sure what went wrong

**How to ask good questions:**
1. "I tried to [do X]"
2. "I expected [Y] to happen"
3. "Instead I got this error: [exact error message]"
4. "I already tried [Z]"

---

## 🎉 Success Indicators

You're done when:
- ✅ Package visible at https://test.pypi.org/project/your-package-name/
- ✅ Can install in a fresh directory
- ✅ `import geohello` works
- ✅ `geohello.hello()` returns a string

**Congratulations - you're a published package author!** 🎊

---

**Last updated: 2026-02-01**
**Questions? Ask your instructor or check the full student guide.**
