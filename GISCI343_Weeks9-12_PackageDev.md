# GISCI 343: GIS Python - Weeks 9-12
## Python Package Development using `uv`
**University of Auckland | Dr Hyesop Shin**

---

## Week 9: Package Foundations with uv

### Lecture Notes

#### 9.1 Why Build Packages?

When you've written useful code for geographical or scientific analysis, packaging it offers several advantages:

**Reusability**
- Code written once can be used across multiple projects
- Consistent interface means less relearning for future work
- Reduces duplication and maintenance burden

**Collaboration**
- Team members can use your code without understanding internal implementation
- Clear API (Application Programming Interface) separates usage from internal details
- Version control ensures everyone works with stable, tested code

**Open Science and Reproducibility**
- Shareable packages allow others to reproduce your research
- Published packages contribute to scientific advancement
- Community contributions improve code quality through peer review

**Professional Development**
- Building packages demonstrates software engineering skills
- Open source contributions are valued in academic and industry contexts
- Experience preparing code for real-world use is highly marketable

#### 9.2 What is `uv`?

`uv` is a modern Python project manager written in Rust, developed by Astral (the team behind Ruff). It dramatically simplifies Python package development by combining the functionality of several traditional tools:

| Traditional Tool | Purpose | Replaced by `uv` |
|---|---|---|
| `pip` | Package installation | `uv pip`, `uv add` |
| `venv` | Virtual environments | `uv venv` |
| `setuptools` | Package building | `uv build` |
| `poetry` | Project management | `uv` itself |
| `pyenv` | Python version management | `uv python` |

**Key Advantages of `uv`**:
- **Speed**: 10-100x faster than pip for dependency resolution
- **Simplicity**: Single tool replaces multiple utilities
- **Lock files**: Reproducible environments across machines
- **Python version management**: Install and switch Python versions easily
- **Deterministic builds**: Same dependencies every time, everywhere

#### 9.3 Installing and Setting Up `uv`

**Installation (Linux/macOS)**

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

This downloads and installs the `uv` binary. Add the installation directory to your PATH:

```bash
# Add to ~/.bashrc or ~/.zshrc
export PATH="$HOME/.cargo/bin:$PATH"
```

Verify installation:

```bash
uv --version
# Output: uv 0.X.X
```

**Installation (Windows)**

Download from: https://github.com/astral/uv/releases

Or use Scoop:

```powershell
scoop install uv
```

#### 9.4 Creating Your First Project with `uv`

**Option A: Network Analysis Package**

For building a package to analyse transport networks in Auckland:

```bash
uv init auckland-network --lib
cd auckland-network
```

**Option B: Micromobility Analytics Package**

For analysing e-scooter and bike-share data:

```bash
uv init auckland-micromobility --lib
cd auckland-micromobility
```

Both commands create a project with the recommended `src` layout.

#### 9.5 Understanding Project Structure

After running `uv init auckland-network --lib`, your directory structure looks like:

```
auckland-network/
├── pyproject.toml          # Project metadata and dependencies
├── README.md               # Project description
├── .gitignore             # Git exclusions (auto-generated)
├── uv.lock                # Lock file (dependency versions)
├── src/
│   └── auckland_network/
│       ├── __init__.py     # Package initialisation
│       └── py.typed        # PEP 561 type hints marker
└── tests/
    └── test_main.py        # Initial test file
```

**Why the `src` layout?**
- Ensures your installed package is used, not the local source directory
- Better for testing (catches import issues earlier)
- Clearer separation between development and installed code
- Industry standard for professional Python packages

#### 9.6 Understanding `pyproject.toml`

The `pyproject.toml` file is the single source of truth for your project. Here's a fully annotated example for Option A:

```toml
[build-system]
# These are always the same for uv projects
requires = ["hatchling"]
build-backend = "hatchling.build"

[project]
# Core metadata about your package
name = "auckland-network"                    # PyPI package name (lowercase, hyphens)
version = "0.1.0"                           # Semantic versioning (MAJOR.MINOR.PATCH)
description = "Network analysis tools for Auckland transport"
readme = "README.md"                        # File to show on PyPI
requires-python = ">=3.9"                   # Minimum Python version
license = {text = "MIT"}                    # Open source licence
authors = [
    {name = "Your Name", email = "your.email@auckland.ac.nz"}
]
keywords = ["gis", "network", "auckland", "transport"]
classifiers = [
    "Development Status :: 3 - Alpha",
    "Intended Audience :: Science/Research",
    "Topic :: Scientific/Engineering :: GIS",
    "License :: OSI Approved :: MIT License",
    "Programming Language :: Python :: 3.9",
    "Programming Language :: Python :: 3.10",
    "Programming Language :: Python :: 3.11",
    "Programming Language :: Python :: 3.12",
]

# Package dependencies
dependencies = [
    "geopandas>=0.14.0",
    "networkx>=3.0",
    "pandas>=2.0",
    "shapely>=2.0",
]

# Optional dependency groups for different use cases
[project.optional-dependencies]
dev = [
    "pytest>=7.0",
    "pytest-cov>=4.0",
    "black>=23.0",
    "ruff>=0.1.0",
]
docs = [
    "sphinx>=7.0",
    "sphinx-rtd-theme>=1.3",
]

# Project URLs
[project.urls]
Homepage = "https://github.com/yourusername/auckland-network"
Documentation = "https://auckland-network.readthedocs.io"
Repository = "https://github.com/yourusername/auckland-network.git"
"Bug Tracker" = "https://github.com/yourusername/auckland-network/issues"

# Tool configurations
[tool.uv]
dev-dependencies = [
    "pytest>=7.0",
    "pytest-cov>=4.0",
    "black>=23.0",
    "ruff>=0.1.0",
    "mypy>=1.5",
]

[tool.black]
line-length = 88

[tool.ruff]
line-length = 88
target-version = "py39"

[tool.pytest.ini_options]
testpaths = ["tests"]
```

#### 9.7 Managing Dependencies with `uv`

**Adding dependencies** (for your package to work):

```bash
# Single dependency
uv add geopandas

# Multiple dependencies at once
uv add pandas geopandas networkx shapely

# Specific version
uv add "networkx>=3.0,<4.0"

# Development dependencies (testing, formatting, etc.)
uv add --dev pytest pytest-cov black ruff mypy
```

When you run any `uv add` command:
1. `uv` resolves all dependencies and their sub-dependencies
2. Updates `pyproject.toml` with version constraints
3. Updates `uv.lock` with exact pinned versions
4. Both files should be committed to git

**Removing dependencies**:

```bash
uv remove geopandas
uv remove --dev pytest
```

#### 9.8 Running Python Code and Tests

**Running Python scripts**:

```bash
# Execute a Python script in the project environment
uv run python script.py

# Run with arguments
uv run python script.py --input data.geojson --output result.json

# Interactive Python shell
uv run python
```

**Running tests**:

```bash
# Run all tests
uv run pytest

# Run specific test file
uv run pytest tests/test_main.py

# Run with verbose output
uv run pytest -v

# Run with coverage report
uv run pytest --cov=src/auckland_network

# Run specific test function
uv run pytest tests/test_main.py::test_network_creation
```

**Syncing your environment**:

```bash
# Install all dependencies specified in pyproject.toml
# Useful after pulling changes that add dependencies
uv sync

# Sync and install in editable mode (for development)
uv sync --editable
```

#### 9.9 Lock Files and Reproducibility

When you add a dependency, `uv` creates a `uv.lock` file:

```
name = "auckland-network"
version = "0.1.0"
requires-python = ">=3.9"

[[package]]
name = "geopandas"
version = "0.14.0"
source = {type = "pypi", url = "..."}
dependencies = [
    "pandas>=2.0",
    "shapely>=2.0",
    "pyproj>=3.4",
]

[[package]]
name = "networkx"
version = "3.2"
source = {type = "pypi", url = "..."}
```

**Lock file benefits**:
- **Reproducibility**: Same versions install across all machines
- **Pinned dependencies**: Exact versions prevent surprises from updates
- **Transparency**: See entire dependency tree with versions
- **Collaboration**: Team members use identical environments

**Workflow**:
1. Developer adds dependency: `uv add pandas`
2. `uv.lock` is updated automatically
3. Commit both `pyproject.toml` and `uv.lock` to git
4. Teammates pull changes and run `uv sync`
5. Everyone has identical environments

#### 9.10 Python Version Management with `uv`

`uv` can manage Python versions directly:

```bash
# Install a specific Python version
uv python install 3.12

# Install multiple versions
uv python install 3.9 3.10 3.11 3.12

# List installed versions
uv python list

# Use specific version for current project
uv python pin 3.11

# View current Python version
uv python show
```

This is far simpler than using `pyenv` or manual installation.

#### 9.11 Git Basics for Your Project

Initialize a Git repository to track your package development:

```bash
# Create initial commit
git init
git add .
git commit -m "Initial project structure with uv"

# Check status
git status

# View commit history
git log --oneline
```

Create a `.gitignore` file for Python projects (often auto-created by `uv`):

```
# Byte-compiled / optimised / DLL files
__pycache__/
*.py[cod]
*$py.class

# Virtual environments
.venv/
venv/
ENV/

# IDE
.vscode/
.idea/
*.swp
*.swo

# Distribution
build/
dist/
*.egg-info/
.eggs/

# Testing
.pytest_cache/
.coverage
htmlcov/

# Documentation
docs/_build/

# OS
.DS_Store
```

#### 9.12 Key Commands Summary

```bash
# Project creation
uv init project-name --lib

# Dependencies
uv add package-name
uv add --dev pytest
uv remove package-name
uv list                           # Show installed packages

# Running code
uv run python script.py
uv run pytest
uv sync

# Environment management
uv venv                           # Create virtual environment
uv python install 3.12           # Manage Python versions

# Building (Week 12)
uv build                          # Create distribution
uv publish                        # Publish to PyPI
```

---

### Lab Exercise: Week 9 (2 hours)

**Objective**: Create a new package with proper structure, initialise dependencies, write first test, and commit to git.

#### Part 1: Create Project (20 minutes)

**For Option A (Network Analysis)**:

```bash
uv init auckland-network --lib
cd auckland-network
```

**For Option B (Micromobility Analytics)**:

```bash
uv init auckland-micromobility --lib
cd auckland-micromobility
```

Verify the structure:

```bash
ls -la
# Should show: README.md, pyproject.toml, src/, tests/, .gitignore, uv.lock
```

#### Part 2: Configure `pyproject.toml` (20 minutes)

Edit `pyproject.toml` to add your information. Replace the `[project]` section:

**For Option A**:

```toml
[project]
name = "auckland-network"
version = "0.1.0"
description = "Network analysis tools for Auckland transport"
readme = "README.md"
requires-python = ">=3.9"
license = {text = "MIT"}
authors = [
    {name = "Your Name", email = "your.email@auckland.ac.nz"}
]
keywords = ["gis", "network", "auckland", "transport"]
dependencies = [
    "geopandas>=0.14.0",
    "networkx>=3.0",
    "pandas>=2.0",
    "shapely>=2.0",
]

[project.optional-dependencies]
dev = [
    "pytest>=7.0",
    "pytest-cov>=4.0",
    "black>=23.0",
    "ruff>=0.1.0",
]
```

**For Option B**:

```toml
[project]
name = "auckland-micromobility"
version = "0.1.0"
description = "Analytics tools for micromobility in Auckland"
readme = "README.md"
requires-python = ">=3.9"
license = {text = "MIT"}
authors = [
    {name = "Your Name", email = "your.email@auckland.ac.nz"}
]
keywords = ["gis", "micromobility", "auckland", "transport"]
dependencies = [
    "geopandas>=0.14.0",
    "pandas>=2.0",
    "shapely>=2.0",
]

[project.optional-dependencies]
dev = [
    "pytest>=7.0",
    "pytest-cov>=4.0",
    "black>=23.0",
    "ruff>=0.1.0",
]
```

#### Part 3: Add Dependencies (15 minutes)

```bash
# Add main dependencies
uv add geopandas networkx pandas shapely

# Add development dependencies
uv add --dev pytest pytest-cov black ruff mypy
```

Verify `uv.lock` was created:

```bash
ls -la uv.lock
```

Check installed packages:

```bash
uv list
```

#### Part 4: Create Initial Module (15 minutes)

Edit `src/auckland_network/__init__.py` (or `src/auckland_micromobility/__init__.py`):

```python
"""
Auckland Network Analysis Package

Provides tools for analysing transport networks in Auckland.
"""

__version__ = "0.1.0"
__author__ = "Your Name"

# Import main classes for easy access
from . import network  # noqa: F401

__all__ = ["network"]
```

Create `src/auckland_network/network.py`:

```python
"""
Core network analysis module.
"""

import geopandas as gpd
import networkx as nx
from typing import Optional


class Network:
    """
    Represents a transport network in Auckland.

    A network consists of nodes (intersections/stops) and edges (connections).
    """

    def __init__(self, name: str = "Auckland Network"):
        """
        Initialise a new network.

        Parameters
        ----------
        name : str
            Name of the network
        """
        self.name = name
        self.graph = nx.MultiDiGraph()

    def add_node(self, node_id: int, lat: float, lon: float, **kwargs) -> None:
        """
        Add a node (intersection/stop) to the network.

        Parameters
        ----------
        node_id : int
            Unique identifier for the node
        lat : float
            Latitude coordinate
        lon : float
            Longitude coordinate
        **kwargs
            Additional attributes (e.g., name, stop_type)
        """
        self.graph.add_node(node_id, latitude=lat, longitude=lon, **kwargs)

    def add_edge(self, source: int, target: int, distance: float, **kwargs) -> None:
        """
        Add an edge (connection) to the network.

        Parameters
        ----------
        source : int
            Source node ID
        target : int
            Target node ID
        distance : float
            Distance in kilometres
        **kwargs
            Additional attributes (e.g., speed, route_type)
        """
        self.graph.add_edge(source, target, distance=distance, **kwargs)

    def node_count(self) -> int:
        """Return the number of nodes in the network."""
        return self.graph.number_of_nodes()

    def edge_count(self) -> int:
        """Return the number of edges in the network."""
        return self.graph.number_of_edges()
```

#### Part 5: Write First Test (15 minutes)

Edit `tests/test_main.py`:

```python
"""
Tests for the core network module.
"""

import pytest
from auckland_network.network import Network


class TestNetwork:
    """Test the Network class."""

    @pytest.fixture
    def network(self):
        """Create a test network."""
        return Network("Test Network")

    def test_network_creation(self, network):
        """Test that a network can be created."""
        assert network.name == "Test Network"
        assert network.node_count() == 0
        assert network.edge_count() == 0

    def test_add_node(self, network):
        """Test adding a node to the network."""
        network.add_node(1, -37.7849, 175.2635, name="Britomart Station")
        assert network.node_count() == 1

    def test_add_edge(self, network):
        """Test adding an edge between nodes."""
        network.add_node(1, -37.7849, 175.2635)
        network.add_node(2, -37.8066, 175.2858)
        network.add_edge(1, 2, distance=3.5)
        assert network.edge_count() == 1

    def test_multiple_nodes(self, network):
        """Test adding multiple nodes."""
        for i in range(5):
            network.add_node(i, -37.7 + i*0.01, 175.2 + i*0.01)
        assert network.node_count() == 5
```

Run the test:

```bash
uv run pytest -v
```

You should see:

```
tests/test_main.py::TestNetwork::test_network_creation PASSED  [ 25%]
tests/test_main.py::TestNetwork::test_add_node PASSED          [ 50%]
tests/test_main.py::TestNetwork::test_add_edge PASSED          [ 75%]
tests/test_main.py::TestNetwork::test_multiple_nodes PASSED   [100%]

======================== 4 passed in 0.05s ========================
```

#### Part 6: Initialise Git Repository (10 minutes)

```bash
# Initialise git
git init

# Add all files
git add .

# Make initial commit
git commit -m "Initial project structure with uv and first tests"

# View commit
git log --oneline
```

You should see:

```
abc1234 Initial project structure with uv and first tests
```

#### Part 7: Verification Checklist

Before moving to Week 10, verify:

- [ ] Project directory created with `uv init`
- [ ] `pyproject.toml` configured with your metadata
- [ ] Dependencies added (geopandas, networkx, pandas, etc.)
- [ ] Dev dependencies added (pytest, black, ruff)
- [ ] Module created with `Network` class
- [ ] `__init__.py` imports modules correctly
- [ ] First test written and passing
- [ ] `uv run pytest` shows all tests passing
- [ ] Git repository initialised
- [ ] Initial commit made
- [ ] `uv.lock` generated and visible

---

## Week 10: Core Implementation & Testing

### Lecture Notes

#### 10.1 Object-Oriented Design for GIS Packages

Well-designed classes make your package intuitive and maintainable. For GIS applications, think about the fundamental objects you're working with:

**Design Principles**

1. **Single Responsibility**: Each class handles one concern
   - `Network`: Manages the graph structure
   - `Route`: Represents a path through the network
   - `Station`: Represents a location

2. **Clear Interfaces**: Public methods define how users interact
   - Hide complexity in private methods (prefix with `_`)
   - Document what methods do, not how

3. **Immutability Where Sensible**: Prevent accidental modifications
   - Return copies of data instead of internal state
   - Validate inputs before storing

**Example for Network Package**:

```python
class Network:
    """Public interface for network analysis."""

    def shortest_path(self, source, target):
        """Find shortest path - user cares about this."""
        return self._dijkstra_shortest_path(source, target)

    def _dijkstra_shortest_path(self, source, target):
        """Internal implementation detail."""
        # Complex algorithm...
        pass
```

#### 10.2 Writing Clean, Testable Modules

**Dependency Injection**

Instead of hardcoding dependencies, pass them as arguments:

```python
# Bad: Hard to test
class Route:
    def __init__(self):
        self.network = Network()  # Cannot test with different network

# Good: Testable
class Route:
    def __init__(self, network):
        self.network = network  # Can inject test network
```

**Side Effects**

Keep methods pure when possible (same input = same output):

```python
# Impure: Modifies external state
def calculate_distance(node1, node2):
    global total_calculations
    total_calculations += 1
    return math.sqrt((node1.x - node2.x)**2 + (node1.y - node2.y)**2)

# Pure: No side effects
def calculate_distance(node1, node2):
    return math.sqrt((node1.x - node2.x)**2 + (node1.y - node2.y)**2)
```

#### 10.3 Pytest Fundamentals

**Test Discovery**

Pytest automatically finds tests by convention:

```
tests/
├── test_network.py          # test_*.py
├── test_route.py
└── unit/
    └── test_geometry.py

OR

src/
└── auckland_network/
    ├── network.py
    └── tests/
        └── test_network.py  # *_test.py also works
```

Test functions must start with `test_`:

```python
def test_network_creation():        # ✓ Found by pytest
    ...

def network_creation():             # ✗ Ignored by pytest
    ...

class TestNetwork:                  # ✓ Found by pytest
    def test_add_node(self):       # ✓ Found by pytest
        ...

    def helper_method(self):       # ✗ Not a test
        ...
```

**Assertions and Common Patterns**

```python
# Equality
assert result == expected_value
assert network.node_count() == 5

# Membership
assert "Node 1" in network.nodes

# Type checking
assert isinstance(result, Network)

# Boolean checks
assert network.is_connected()
assert not network.has_cycle()

# Approximate equality (for floats)
assert result == pytest.approx(3.14159, rel=1e-5)

# Exceptions
with pytest.raises(ValueError):
    network.shortest_path(999, 1000)  # Non-existent nodes

# Comparisons
assert distance > 0
assert len(nodes) >= 1
```

**Fixtures: Reusable Test Data**

Fixtures set up test data and resources:

```python
import pytest
from auckland_network.network import Network


@pytest.fixture
def sample_network():
    """Create a network with sample data for testing."""
    net = Network("Test Network")
    # Add nodes (coordinates for Auckland suburbs)
    net.add_node(1, -37.7849, 175.2635, name="Britomart")
    net.add_node(2, -37.8066, 175.2858, name="Newmarket")
    net.add_node(3, -37.8248, 175.2768, name="Epsom")
    # Add edges
    net.add_edge(1, 2, distance=3.5)
    net.add_edge(2, 3, distance=2.1)
    return net


class TestNetwork:
    """Uses sample_network fixture automatically."""

    def test_node_count(self, sample_network):
        """Fixture passed as parameter."""
        assert sample_network.node_count() == 3

    def test_edge_count(self, sample_network):
        """Each test gets a fresh fixture instance."""
        assert sample_network.edge_count() == 2
```

**Parametrised Tests**

Test multiple scenarios with one test function:

```python
import pytest
from auckland_network.network import Network


class TestNetworkDistance:

    @pytest.mark.parametrize("lat1,lon1,lat2,lon2,expected", [
        # Format: (lat1, lon1, lat2, lon2, expected_distance_km)
        (-37.7849, 175.2635, -37.7849, 175.2635, 0.0),     # Same point
        (-37.7849, 175.2635, -37.8066, 175.2858, 3.5),     # Actual distance
        (-37.8066, 175.2858, -37.7849, 175.2635, 3.5),     # Symmetrical
    ])
    def test_distance_calculation(self, lat1, lon1, lat2, lon2, expected):
        """Test distance calculation for various point pairs."""
        net = Network()
        net.add_node(1, lat1, lon1)
        net.add_node(2, lat2, lon2)
        result = net.calculate_distance(1, 2)
        assert result == pytest.approx(expected, rel=0.01)
```

This runs the test function three times with different parameters.

**Running Subsets of Tests**

```bash
# Run specific test file
uv run pytest tests/test_network.py

# Run specific test class
uv run pytest tests/test_network.py::TestNetwork

# Run specific test method
uv run pytest tests/test_network.py::TestNetwork::test_add_node

# Run tests matching a pattern
uv run pytest -k "distance"          # Run all tests with "distance" in name

# Run only failed tests from last run
uv run pytest --lf

# Run failed tests first, then others
uv run pytest --ff

# Stop after first failure
uv run pytest -x

# Show local variables on failure
uv run pytest -l
```

#### 10.4 Type Hints for Better Code

Type hints document what types functions expect and return. They enable IDE autocompletion and catch errors early:

```python
from typing import Optional, List, Dict, Tuple
import geopandas as gpd


class Network:

    def add_node(self, node_id: int, lat: float, lon: float) -> None:
        """
        Add a node to the network.

        Parameters
        ----------
        node_id : int
            Unique identifier
        lat : float
            Latitude in decimal degrees
        lon : float
            Longitude in decimal degrees
        """
        self.graph.add_node(node_id, lat=lat, lon=lon)

    def shortest_path(self, source: int, target: int) -> Optional[List[int]]:
        """
        Find shortest path between nodes.

        Parameters
        ----------
        source : int
            Start node ID
        target : int
            End node ID

        Returns
        -------
        Optional[List[int]]
            List of node IDs in order, or None if no path exists
        """
        try:
            return nx.shortest_path(self.graph, source, target)
        except nx.NetworkXNoPath:
            return None

    def get_nodes_by_type(self, node_type: str) -> Dict[int, str]:
        """
        Get all nodes of a specific type.

        Parameters
        ----------
        node_type : str
            Type to filter by (e.g., 'station', 'intersection')

        Returns
        -------
        Dict[int, str]
            Dictionary mapping node IDs to names
        """
        return {
            node_id: attrs.get('name', '')
            for node_id, attrs in self.graph.nodes(data=True)
            if attrs.get('type') == node_type
        }

    def load_from_geojson(self, filepath: str) -> None:
        """
        Load network from GeoJSON file.

        Parameters
        ----------
        filepath : str
            Path to GeoJSON file
        """
        gdf = gpd.read_file(filepath)
        # Implementation...
```

**Running Type Checking**

Install mypy (included in dev dependencies):

```bash
uv add --dev mypy

# Check types without running code
uv run mypy src/auckland_network/
```

Output shows type errors:

```
src/auckland_network/network.py:42: error: Argument 1 to "add_node"
has incompatible type "str"; expected "int"
```

#### 10.5 Docstrings (NumPy Style)

NumPy-style docstrings are standard for scientific Python packages:

```python
def shortest_path(self, source: int, target: int, weight: str = 'distance') -> Optional[List[int]]:
    """
    Find the shortest path between two nodes using Dijkstra's algorithm.

    This method uses the specified weight attribute on edges to determine
    the shortest path. If no path exists, returns None.

    Parameters
    ----------
    source : int
        Identifier of the starting node
    target : int
        Identifier of the destination node
    weight : str, optional
        Edge attribute to use as weight, by default 'distance'

    Returns
    -------
    Optional[List[int]]
        List of node IDs representing the shortest path from source to target,
        or None if no path exists. The list includes both source and target.

    Raises
    ------
    ValueError
        If source or target node does not exist in the network

    Examples
    --------
    >>> net = Network()
    >>> net.add_node(1, -37.78, 175.26)
    >>> net.add_node(2, -37.81, 175.29)
    >>> net.add_edge(1, 2, distance=3.5)
    >>> path = net.shortest_path(1, 2)
    >>> print(path)
    [1, 2]

    See Also
    --------
    all_pairs_shortest_paths : Find paths between all pairs of nodes
    dijkstra_path_length : Get only the path length, not the nodes
    """
    if source not in self.graph:
        raise ValueError(f"Source node {source} not in network")
    if target not in self.graph:
        raise ValueError(f"Target node {target} not in network")

    try:
        return nx.shortest_path(self.graph, source, target, weight=weight)
    except nx.NetworkXNoPath:
        return None
```

NumPy docstring sections:
- **Summary**: One-line description
- **Extended Description**: Detailed explanation
- **Parameters**: Input arguments and types
- **Returns**: Output and its type
- **Raises**: Exceptions that might be raised
- **Examples**: Usage examples (doctests)
- **See Also**: Related functions

#### 10.6 Code Formatting with Black and Ruff

**Black** enforces consistent code style automatically:

```bash
# Format all Python files
uv run black src/ tests/

# Check without modifying
uv run black --check src/ tests/

# Format specific file
uv run black src/auckland_network/network.py
```

Black enforces:
- 88-character line limit (configurable)
- Double quotes for strings
- Consistent spacing

**Ruff** is a fast linter catching bugs and style issues:

```bash
# Check for issues
uv run ruff check src/ tests/

# Fix automatically
uv run ruff check --fix src/ tests/

# Specific rules
uv run ruff check src/ --select E501  # Line too long
uv run ruff check src/ --select F     # PyFlakes errors
```

**Typical workflow**:

```bash
# Make changes
# ... edit code ...

# Format code
uv run black src/

# Fix linting issues
uv run ruff check --fix src/

# Run tests
uv run pytest

# Commit
git add src/ tests/
git commit -m "Implement shortest_path method"
```

---

### Lab Exercise: Week 10 (2 hours)

**Objective**: Implement core functionality with proper OOP design, comprehensive tests, and clean code formatting.

#### Option A: Network Analysis Package

**Part 1: Expand Network Class (40 minutes)**

Edit `src/auckland_network/network.py` to add methods for shortest path and centrality:

```python
"""
Core network analysis module.
"""

from typing import Optional, List, Dict, Tuple
import geopandas as gpd
import networkx as nx
import pandas as pd
from math import radians, sin, cos, sqrt, atan2


class Network:
    """
    Represents a transport network in Auckland.

    A network consists of nodes (intersections/stops) and edges (connections).

    Attributes
    ----------
    name : str
        Name of the network
    graph : nx.MultiDiGraph
        NetworkX graph object

    Examples
    --------
    >>> net = Network("Auckland Transport")
    >>> net.add_node(1, -37.7849, 175.2635, name="Britomart")
    >>> net.add_node(2, -37.8066, 175.2858, name="Newmarket")
    >>> net.add_edge(1, 2, distance=3.5)
    >>> path = net.shortest_path(1, 2)
    >>> print(path)
    [1, 2]
    """

    def __init__(self, name: str = "Auckland Network"):
        """
        Initialise a new network.

        Parameters
        ----------
        name : str, optional
            Name of the network, by default "Auckland Network"
        """
        self.name = name
        self.graph = nx.MultiDiGraph()

    def add_node(self, node_id: int, lat: float, lon: float, **kwargs) -> None:
        """
        Add a node (intersection/stop) to the network.

        Parameters
        ----------
        node_id : int
            Unique identifier for the node
        lat : float
            Latitude coordinate (WGS84)
        lon : float
            Longitude coordinate (WGS84)
        **kwargs
            Additional attributes (e.g., name='Britomart', stop_type='station')

        Raises
        ------
        ValueError
            If node_id already exists
        ValueError
            If lat/lon are outside valid ranges
        """
        if node_id in self.graph:
            raise ValueError(f"Node {node_id} already exists")
        if not (-90 <= lat <= 90):
            raise ValueError(f"Latitude {lat} out of range [-90, 90]")
        if not (-180 <= lon <= 180):
            raise ValueError(f"Longitude {lon} out of range [-180, 180]")

        self.graph.add_node(node_id, latitude=lat, longitude=lon, **kwargs)

    def add_edge(
        self,
        source: int,
        target: int,
        distance: float,
        **kwargs
    ) -> None:
        """
        Add an edge (connection) to the network.

        Parameters
        ----------
        source : int
            Source node ID
        target : int
            Target node ID
        distance : float
            Distance in kilometres
        **kwargs
            Additional attributes (e.g., speed=50, route_type='bus')

        Raises
        ------
        ValueError
            If either node does not exist
        """
        if source not in self.graph:
            raise ValueError(f"Source node {source} not in network")
        if target not in self.graph:
            raise ValueError(f"Target node {target} not in network")

        self.graph.add_edge(source, target, distance=distance, **kwargs)

    def node_count(self) -> int:
        """
        Return the number of nodes in the network.

        Returns
        -------
        int
            Number of nodes
        """
        return self.graph.number_of_nodes()

    def edge_count(self) -> int:
        """
        Return the number of edges in the network.

        Returns
        -------
        int
            Number of edges
        """
        return self.graph.number_of_edges()

    def shortest_path(
        self,
        source: int,
        target: int,
        weight: str = 'distance'
    ) -> Optional[List[int]]:
        """
        Find the shortest path between two nodes using Dijkstra's algorithm.

        Parameters
        ----------
        source : int
            Starting node ID
        target : int
            Destination node ID
        weight : str, optional
            Edge attribute to use as weight, by default 'distance'

        Returns
        -------
        Optional[List[int]]
            List of node IDs from source to target, or None if no path exists

        Raises
        ------
        ValueError
            If source or target node does not exist
        """
        if source not in self.graph:
            raise ValueError(f"Source node {source} not in network")
        if target not in self.graph:
            raise ValueError(f"Target node {target} not in network")

        try:
            return nx.shortest_path(
                self.graph,
                source,
                target,
                weight=weight
            )
        except nx.NetworkXNoPath:
            return None

    def path_distance(
        self,
        path: List[int],
        weight: str = 'distance'
    ) -> float:
        """
        Calculate total distance of a path.

        Parameters
        ----------
        path : List[int]
            List of node IDs
        weight : str, optional
            Edge attribute to use, by default 'distance'

        Returns
        -------
        float
            Total distance in kilometres
        """
        total = 0.0
        for source, target in zip(path[:-1], path[1:]):
            edge_data = self.graph.get_edge_data(source, target)
            if edge_data:
                # Get first edge if multiple exist
                first_edge = next(iter(edge_data.values()))
                total += first_edge.get(weight, 0)
        return total

    def betweenness_centrality(self) -> Dict[int, float]:
        """
        Calculate betweenness centrality for all nodes.

        Betweenness centrality measures how often a node lies on the shortest
        path between other nodes. Higher values indicate more important nodes.

        Returns
        -------
        Dict[int, float]
            Dictionary mapping node IDs to centrality scores (0-1)

        Notes
        -----
        For directed graphs, considers direction of edges.
        """
        return nx.betweenness_centrality(self.graph, weight='distance')

    def degree_centrality(self) -> Dict[int, float]:
        """
        Calculate degree centrality for all nodes.

        Degree centrality is the fraction of nodes a node is connected to.

        Returns
        -------
        Dict[int, float]
            Dictionary mapping node IDs to centrality scores (0-1)
        """
        return nx.degree_centrality(self.graph)

    def closeness_centrality(self) -> Dict[int, float]:
        """
        Calculate closeness centrality for all nodes.

        Closeness centrality measures how close a node is to all other nodes.
        Nodes with higher values can reach other nodes more quickly.

        Returns
        -------
        Dict[int, float]
            Dictionary mapping node IDs to centrality scores (0-1)
        """
        return nx.closeness_centrality(self.graph, distance='distance')

    def is_connected(self) -> bool:
        """
        Check if the network is strongly connected.

        A network is strongly connected if there is a path from every node
        to every other node.

        Returns
        -------
        bool
            True if network is strongly connected
        """
        return nx.is_strongly_connected(self.graph)

    def load_from_geodataframe(
        self,
        nodes_gdf: gpd.GeoDataFrame,
        edges_gdf: gpd.GeoDataFrame
    ) -> None:
        """
        Load network from GeoPandas GeoDataFrames.

        Parameters
        ----------
        nodes_gdf : gpd.GeoDataFrame
            GeoDataFrame with columns: node_id, geometry, and optional attributes
        edges_gdf : gpd.GeoDataFrame
            GeoDataFrame with columns: source, target, distance, geometry

        Raises
        ------
        ValueError
            If required columns are missing
        """
        required_node_cols = {'node_id', 'geometry'}
        required_edge_cols = {'source', 'target', 'distance'}

        if not required_node_cols.issubset(nodes_gdf.columns):
            raise ValueError(f"nodes_gdf missing required columns: {required_node_cols}")
        if not required_edge_cols.issubset(edges_gdf.columns):
            raise ValueError(f"edges_gdf missing required columns: {required_edge_cols}")

        # Add nodes
        for _, row in nodes_gdf.iterrows():
            self.add_node(
                int(row['node_id']),
                row.geometry.y,
                row.geometry.x,
                **{col: row[col] for col in nodes_gdf.columns if col != 'node_id'}
            )

        # Add edges
        for _, row in edges_gdf.iterrows():
            self.add_edge(
                int(row['source']),
                int(row['target']),
                float(row['distance']),
                **{col: row[col] for col in edges_gdf.columns
                   if col not in {'source', 'target', 'distance'}}
            )

    def summary(self) -> Dict[str, any]:
        """
        Return a summary of network statistics.

        Returns
        -------
        Dict[str, any]
            Dictionary containing network statistics
        """
        return {
            'name': self.name,
            'nodes': self.node_count(),
            'edges': self.edge_count(),
            'is_connected': self.is_connected(),
            'density': nx.density(self.graph),
        }
```

**Part 2: Write Comprehensive Tests (40 minutes)**

Edit `tests/test_main.py`:

```python
"""
Comprehensive tests for the network module.
"""

import pytest
from auckland_network.network import Network


@pytest.fixture
def empty_network():
    """Create an empty network."""
    return Network("Test Network")


@pytest.fixture
def sample_network():
    """
    Create a sample network of Auckland suburbs.

    Network structure:
    1 (Britomart) --3.5km--> 2 (Newmarket)
                           |
                         2.1km
                           |
                           v
                      3 (Epsom)
    """
    net = Network("Auckland Test Network")

    # Add nodes (actual Auckland coordinates)
    net.add_node(1, -37.7849, 175.2635, name="Britomart", type="station")
    net.add_node(2, -37.8066, 175.2858, name="Newmarket", type="station")
    net.add_node(3, -37.8248, 175.2768, name="Epsom", type="intersection")
    net.add_node(4, -37.8456, 175.2501, name="Mount Eden", type="station")

    # Add edges
    net.add_edge(1, 2, distance=3.5, speed=40)
    net.add_edge(2, 3, distance=2.1, speed=40)
    net.add_edge(3, 4, distance=1.8, speed=40)
    net.add_edge(2, 1, distance=3.5, speed=40)  # Return edge

    return net


class TestNetworkCreation:
    """Tests for network creation and basic operations."""

    def test_create_empty_network(self, empty_network):
        """Test creating an empty network."""
        assert empty_network.name == "Test Network"
        assert empty_network.node_count() == 0
        assert empty_network.edge_count() == 0

    def test_create_named_network(self):
        """Test creating a network with a specific name."""
        net = Network("Custom Network")
        assert net.name == "Custom Network"

    def test_network_summary(self, sample_network):
        """Test network summary statistics."""
        summary = sample_network.summary()
        assert summary['name'] == "Auckland Test Network"
        assert summary['nodes'] == 4
        assert summary['edges'] == 4


class TestNodeOperations:
    """Tests for adding and managing nodes."""

    def test_add_single_node(self, empty_network):
        """Test adding a single node."""
        empty_network.add_node(1, -37.7849, 175.2635)
        assert empty_network.node_count() == 1

    def test_add_multiple_nodes(self, empty_network):
        """Test adding multiple nodes."""
        for i in range(5):
            empty_network.add_node(i, -37.7 + i*0.01, 175.2 + i*0.01)
        assert empty_network.node_count() == 5

    def test_add_node_with_attributes(self, empty_network):
        """Test adding a node with extra attributes."""
        empty_network.add_node(
            1,
            -37.7849,
            175.2635,
            name="Britomart",
            stop_type="station",
            capacity=1000
        )
        assert empty_network.node_count() == 1

    def test_duplicate_node_error(self, sample_network):
        """Test that adding a duplicate node raises an error."""
        with pytest.raises(ValueError, match="already exists"):
            sample_network.add_node(1, -37.7849, 175.2635)

    @pytest.mark.parametrize("lat,lon", [
        (-91.0, 0.0),    # Latitude too low
        (91.0, 0.0),     # Latitude too high
        (0.0, -181.0),   # Longitude too low
        (0.0, 181.0),    # Longitude too high
    ])
    def test_invalid_coordinates(self, empty_network, lat, lon):
        """Test that invalid coordinates are rejected."""
        with pytest.raises(ValueError):
            empty_network.add_node(1, lat, lon)

    @pytest.mark.parametrize("lat,lon", [
        (-37.7849, 175.2635),   # Valid (Britomart)
        (-37.0, 175.0),         # Valid
        (0.0, 0.0),             # Valid (prime meridian/equator)
    ])
    def test_valid_coordinates(self, empty_network, lat, lon):
        """Test that valid coordinates are accepted."""
        empty_network.add_node(1, lat, lon)
        assert empty_network.node_count() == 1


class TestEdgeOperations:
    """Tests for adding and managing edges."""

    def test_add_edge(self, empty_network):
        """Test adding an edge between nodes."""
        empty_network.add_node(1, -37.7849, 175.2635)
        empty_network.add_node(2, -37.8066, 175.2858)
        empty_network.add_edge(1, 2, distance=3.5)
        assert empty_network.edge_count() == 1

    def test_add_edge_with_attributes(self, empty_network):
        """Test adding an edge with extra attributes."""
        empty_network.add_node(1, -37.7849, 175.2635)
        empty_network.add_node(2, -37.8066, 175.2858)
        empty_network.add_edge(1, 2, distance=3.5, speed=50, route_type="bus")
        assert empty_network.edge_count() == 1

    def test_invalid_source_node(self, sample_network):
        """Test that adding edge with non-existent source raises error."""
        with pytest.raises(ValueError, match="Source node"):
            sample_network.add_edge(999, 1, distance=1.0)

    def test_invalid_target_node(self, sample_network):
        """Test that adding edge with non-existent target raises error."""
        with pytest.raises(ValueError, match="Target node"):
            sample_network.add_edge(1, 999, distance=1.0)

    def test_multiple_edges_same_nodes(self, empty_network):
        """Test that multiple edges can exist between same nodes."""
        empty_network.add_node(1, -37.7849, 175.2635)
        empty_network.add_node(2, -37.8066, 175.2858)
        empty_network.add_edge(1, 2, distance=3.5, route_type="bus")
        empty_network.add_edge(1, 2, distance=3.8, route_type="train")
        assert empty_network.edge_count() == 2


class TestShortestPath:
    """Tests for shortest path functionality."""

    def test_simple_shortest_path(self, sample_network):
        """Test finding a simple shortest path."""
        path = sample_network.shortest_path(1, 2)
        assert path == [1, 2]

    def test_multi_hop_path(self, sample_network):
        """Test finding a path that requires multiple hops."""
        path = sample_network.shortest_path(1, 4)
        # Path should be 1 -> 2 -> 3 -> 4
        assert len(path) == 4
        assert path[0] == 1
        assert path[-1] == 4

    def test_reverse_path(self, sample_network):
        """Test finding path in opposite direction."""
        path = sample_network.shortest_path(2, 1)
        assert path == [2, 1]

    def test_no_path_exists(self):
        """Test when no path exists between nodes."""
        net = Network("Disconnected")
        net.add_node(1, -37.7849, 175.2635)
        net.add_node(2, -37.8066, 175.2858)
        # No edges, so no path exists
        path = net.shortest_path(1, 2)
        assert path is None

    def test_invalid_source(self, sample_network):
        """Test with non-existent source node."""
        with pytest.raises(ValueError, match="Source node"):
            sample_network.shortest_path(999, 1)

    def test_invalid_target(self, sample_network):
        """Test with non-existent target node."""
        with pytest.raises(ValueError, match="Target node"):
            sample_network.shortest_path(1, 999)


class TestPathDistance:
    """Tests for path distance calculation."""

    def test_single_edge_distance(self, sample_network):
        """Test distance calculation for single edge."""
        distance = sample_network.path_distance([1, 2])
        assert distance == pytest.approx(3.5)

    def test_multi_edge_distance(self, sample_network):
        """Test distance calculation for multiple edges."""
        distance = sample_network.path_distance([1, 2, 3])
        assert distance == pytest.approx(3.5 + 2.1)

    def test_empty_path(self, sample_network):
        """Test distance for path with single node."""
        distance = sample_network.path_distance([1])
        assert distance == 0.0


class TestCentrality:
    """Tests for centrality measures."""

    def test_betweenness_centrality(self, sample_network):
        """Test betweenness centrality calculation."""
        centrality = sample_network.betweenness_centrality()
        # Should return a dictionary with all nodes
        assert len(centrality) == 4
        # All values should be between 0 and 1
        assert all(0 <= v <= 1 for v in centrality.values())

    def test_degree_centrality(self, sample_network):
        """Test degree centrality calculation."""
        centrality = sample_network.degree_centrality()
        assert len(centrality) == 4
        assert all(0 <= v <= 1 for v in centrality.values())

    def test_closeness_centrality(self, sample_network):
        """Test closeness centrality calculation."""
        centrality = sample_network.closeness_centrality()
        assert len(centrality) == 4
        assert all(0 <= v <= 1 for v in centrality.values())


class TestNetworkProperties:
    """Tests for network properties."""

    def test_is_connected_true(self, sample_network):
        """Test connectivity check on connected network."""
        # Sample network should be connected
        assert sample_network.is_connected() is True

    def test_is_connected_false(self):
        """Test connectivity check on disconnected network."""
        net = Network("Disconnected")
        net.add_node(1, -37.7849, 175.2635)
        net.add_node(2, -37.8066, 175.2858)
        net.add_node(3, -37.8248, 175.2768)
        net.add_edge(1, 2, distance=1.0)
        # Node 3 is isolated
        assert net.is_connected() is False
```

**Part 3: Format Code (15 minutes)**

Format code with Black:

```bash
uv run black src/ tests/
```

Check for linting issues:

```bash
uv run ruff check src/ tests/
```

Fix common issues:

```bash
uv run ruff check --fix src/ tests/
```

Run type checking:

```bash
uv run mypy src/auckland_network/ --ignore-missing-imports
```

**Part 4: Run Full Test Suite (10 minutes)**

```bash
# Run all tests with verbose output
uv run pytest -v

# Run with coverage
uv run pytest --cov=src/auckland_network tests/
```

Expected output:

```
tests/test_main.py::TestNetworkCreation::test_create_empty_network PASSED
tests/test_main.py::TestNetworkCreation::test_create_named_network PASSED
tests/test_main.py::TestNetworkCreation::test_network_summary PASSED
tests/test_main.py::TestNodeOperations::test_add_single_node PASSED
tests/test_main.py::TestNodeOperations::test_add_multiple_nodes PASSED
... [many more tests] ...

======================== 28 passed in 0.34s ========================
```

**Part 5: Commit Changes (10 minutes)**

```bash
git add src/ tests/
git commit -m "Implement Network class with shortest path and centrality methods

- Add shortest_path() using Dijkstra's algorithm
- Add path_distance() to calculate total path cost
- Add centrality measures: betweenness, degree, closeness
- Add is_connected() to check network connectivity
- Add load_from_geodataframe() for GIS data
- Add comprehensive tests with fixtures and parametrisation
- Format code with Black and Ruff"
```

---

**Option B: Micromobility Analytics Package**

*(Similar structure to Option A, adapted for micromobility)*

**Part 1: Implement Core Classes (40 minutes)**

Create `src/auckland_micromobility/trip.py`:

```python
"""
Trip and Station classes for micromobility analysis.
"""

from typing import Optional
from datetime import datetime
import pandas as pd


class Station:
    """
    Represents a bike-share or e-scooter station.

    Attributes
    ----------
    station_id : int
        Unique station identifier
    latitude : float
        Latitude coordinate
    longitude : float
        Longitude coordinate
    name : str
        Station name
    capacity : int
        Maximum number of vehicles
    """

    def __init__(
        self,
        station_id: int,
        latitude: float,
        longitude: float,
        name: str,
        capacity: int = 20,
    ):
        """
        Initialise a station.

        Parameters
        ----------
        station_id : int
            Unique identifier
        latitude : float
            Latitude (WGS84)
        longitude : float
            Longitude (WGS84)
        name : str
            Station name
        capacity : int, optional
            Maximum capacity, by default 20
        """
        self.station_id = station_id
        self.latitude = latitude
        self.longitude = longitude
        self.name = name
        self.capacity = capacity
        self.vehicles = 0

    def add_vehicle(self) -> None:
        """Add a vehicle to the station."""
        if self.vehicles < self.capacity:
            self.vehicles += 1

    def remove_vehicle(self) -> None:
        """Remove a vehicle from the station."""
        if self.vehicles > 0:
            self.vehicles -= 1

    def utilisation(self) -> float:
        """
        Calculate station utilisation rate.

        Returns
        -------
        float
            Utilisation as proportion (0-1)
        """
        if self.capacity == 0:
            return 0.0
        return self.vehicles / self.capacity


class Trip:
    """
    Represents a single micromobility trip.

    Attributes
    ----------
    trip_id : int
        Unique trip identifier
    start_station : Station
        Origin station
    end_station : Station
        Destination station
    start_time : datetime
        Trip start time
    end_time : Optional[datetime]
        Trip end time
    """

    def __init__(
        self,
        trip_id: int,
        start_station: Station,
        end_station: Station,
        start_time: datetime,
        end_time: Optional[datetime] = None,
    ):
        """
        Initialise a trip.

        Parameters
        ----------
        trip_id : int
            Unique identifier
        start_station : Station
            Starting station
        end_station : Station
            Ending station
        start_time : datetime
            Start timestamp
        end_time : Optional[datetime], optional
            End timestamp, by default None (ongoing)
        """
        self.trip_id = trip_id
        self.start_station = start_station
        self.end_station = end_station
        self.start_time = start_time
        self.end_time = end_time

    def duration_minutes(self) -> Optional[float]:
        """
        Calculate trip duration in minutes.

        Returns
        -------
        Optional[float]
            Duration in minutes, or None if trip is ongoing
        """
        if self.end_time is None:
            return None
        return (self.end_time - self.start_time).total_seconds() / 60

    def end_trip(self, end_time: datetime) -> None:
        """
        End the trip.

        Parameters
        ----------
        end_time : datetime
            Trip end time
        """
        if end_time < self.start_time:
            raise ValueError("End time cannot be before start time")
        self.end_time = end_time


def calculate_trip_summary(trips: list) -> dict:
    """
    Calculate summary statistics from a list of trips.

    Parameters
    ----------
    trips : list
        List of Trip objects

    Returns
    -------
    dict
        Dictionary with summary statistics
    """
    completed_trips = [t for t in trips if t.end_time is not None]

    if not completed_trips:
        return {
            'total_trips': 0,
            'completed_trips': 0,
            'average_duration_minutes': 0.0,
        }

    durations = [t.duration_minutes() for t in completed_trips]

    return {
        'total_trips': len(trips),
        'completed_trips': len(completed_trips),
        'average_duration_minutes': sum(durations) / len(durations),
        'max_duration_minutes': max(durations),
        'min_duration_minutes': min(durations),
    }


def station_utilisation_summary(stations: list) -> pd.DataFrame:
    """
    Create DataFrame summarising station utilisation.

    Parameters
    ----------
    stations : list
        List of Station objects

    Returns
    -------
    pd.DataFrame
        DataFrame with utilisation statistics
    """
    data = []
    for station in stations:
        data.append({
            'station_id': station.station_id,
            'name': station.name,
            'vehicles': station.vehicles,
            'capacity': station.capacity,
            'utilisation': station.utilisation(),
        })
    return pd.DataFrame(data)
```

**Part 2: Write Tests (40 minutes)**

Create comprehensive tests in `tests/test_micromobility.py` (similar structure to Option A)

**Part 3-5: Format, Test, and Commit**

Follow the same workflow as Option A.

---

#### Option A Continuation: Run Tests and Verify

```bash
# Full test run with coverage
uv run pytest --cov=src/auckland_network --cov-report=html tests/

# View coverage report
open htmlcov/index.html  # Or use 'xdg-open' on Linux
```

#### Part 6: Verification Checklist

Before Week 11, verify:

- [ ] Core classes implemented with proper docstrings
- [ ] Type hints on all methods
- [ ] All methods return correct types
- [ ] At least 20 test functions written
- [ ] Fixtures used for reusable test data
- [ ] Parametrised tests for multiple scenarios
- [ ] All tests passing (`uv run pytest`)
- [ ] Code formatted with Black
- [ ] No linting errors (`uv run ruff check`)
- [ ] Type checking passes (`uv run mypy`)
- [ ] Changes committed to git with descriptive message

---

## Week 11: Documentation & Advanced Features

### Lecture Notes

#### 11.1 Sphinx Documentation Setup

Sphinx generates professional HTML documentation automatically from your code:

**Installation and Initialisation**

```bash
# Add Sphinx to dev dependencies
uv add --dev sphinx sphinx-rtd-theme

# Create docs directory structure
uv run sphinx-quickstart docs

# When prompted:
# Root path: . (current directory)
# Project name: auckland-network (or your package name)
# Author: Your Name
# Release: 0.1.0
# Language: en
```

This creates:

```
docs/
├── conf.py              # Sphinx configuration
├── index.rst            # Documentation home page
├── _static/             # CSS, images, etc.
├── _templates/          # Custom HTML templates
└── Makefile             # Build automation
```

**Configuring Sphinx**

Edit `docs/conf.py`:

```python
import os
import sys

# Add src directory to path so Sphinx can find your package
sys.path.insert(0, os.path.abspath('../src'))

project = 'auckland-network'
copyright = '2024, Your Name'
author = 'Your Name'
release = '0.1.0'

# Enabled extensions
extensions = [
    'sphinx.ext.autodoc',           # Auto-document from docstrings
    'sphinx.ext.napoleon',          # Support NumPy-style docstrings
    'sphinx.ext.intersphinx',       # Link to other project documentation
    'sphinx.ext.viewcode',          # Show source code links
    'sphinx.ext.githubpages',       # Deploy to GitHub Pages
]

# Theme configuration
html_theme = 'sphinx_rtd_theme'
html_static_path = ['_static']

# Napoleon settings for NumPy docstrings
napoleon_google_docstring = False
napoleon_numpy_docstring = True
napoleon_include_init_doc = True
napoleon_include_private_with_doc = False
napoleon_attr_annotations = True

# autodoc settings
autodoc_typehints = 'description'
```

**Building Documentation**

```bash
# Build HTML documentation
cd docs
uv run make html

# Output is in docs/_build/html/
# Open in browser
open _build/html/index.html
```

#### 11.2 Writing Documentation Pages

Create `docs/usage.rst`:

```rst
==============
Usage Examples
==============

Creating a Network
==================

To create a network and add nodes:

.. code-block:: python

    from auckland_network.network import Network

    # Create a network
    net = Network("Auckland Transport")

    # Add nodes (stations/intersections)
    net.add_node(1, -37.7849, 175.2635, name="Britomart Station")
    net.add_node(2, -37.8066, 175.2858, name="Newmarket Station")
    net.add_node(3, -37.8248, 175.2768, name="Epsom Intersection")

Adding Edges
============

Connect nodes with edges:

.. code-block:: python

    # Add edges (connections between nodes)
    net.add_edge(1, 2, distance=3.5, speed=40)  # 3.5 km, 40 km/h
    net.add_edge(2, 3, distance=2.1, speed=40)

Finding Shortest Paths
======================

Find optimal routes through the network:

.. code-block:: python

    # Find shortest path between nodes
    path = net.shortest_path(1, 3)
    print(path)  # Output: [1, 2, 3]

    # Calculate total distance
    distance = net.path_distance(path)
    print(f"Total distance: {distance} km")

Analysing Network Properties
=============================

Examine network structure:

.. code-block:: python

    # Get network statistics
    summary = net.summary()
    print(f"Nodes: {summary['nodes']}")
    print(f"Edges: {summary['edges']}")
    print(f"Connected: {summary['is_connected']}")

    # Calculate centrality measures
    betweenness = net.betweenness_centrality()
    print(f"Most important nodes: {sorted(betweenness.items(), key=lambda x: x[1], reverse=True)[:3]}")

See Also
========

- :py:mod:`auckland_network.network` - Core module documentation
- :py:class:`auckland_network.network.Network` - Network class reference
```

Add reference to `docs/index.rst`:

```rst
Welcome to auckland-network
==========================

Contents
--------

.. toctree::
   :maxdepth: 2

   usage
   api
   contributing

Network Analysis Tools for Auckland Transport
==============================================

This package provides tools for analysing transport networks in Auckland.

Quick Start
-----------

.. code-block:: bash

    pip install auckland-network

.. code-block:: python

    from auckland_network.network import Network
    net = Network()
    net.add_node(1, -37.7849, 175.2635)
    net.add_node(2, -37.8066, 175.2858)
    net.add_edge(1, 2, distance=3.5)
    path = net.shortest_path(1, 2)
```

#### 11.3 Auto-Generating API Documentation

Create `docs/api.rst`:

```rst
=============
API Reference
=============

.. automodule:: auckland_network.network
   :members:
   :undoc-members:
   :show-inheritance:

Network Class
=============

.. autoclass:: auckland_network.network.Network
   :members:
   :inherited-members:
```

Sphinx automatically generates documentation from your NumPy-style docstrings.

#### 11.4 Logging Module Basics

Add logging to track execution and diagnose issues:

```python
"""
Network analysis module with logging.
"""

import logging

# Create module logger
logger = logging.getLogger(__name__)


class Network:
    """Transport network."""

    def __init__(self, name: str = "Network"):
        """Initialise network."""
        self.name = name
        self.graph = {}
        logger.debug(f"Created network: {name}")

    def add_node(self, node_id: int, lat: float, lon: float, **kwargs) -> None:
        """Add a node to the network."""
        if node_id in self.graph:
            logger.warning(f"Node {node_id} already exists, skipping")
            return

        self.graph[node_id] = {'lat': lat, 'lon': lon, **kwargs}
        logger.info(f"Added node {node_id} at ({lat}, {lon})")

    def add_edge(self, source: int, target: int, distance: float) -> None:
        """Add an edge between nodes."""
        if source not in self.graph:
            logger.error(f"Source node {source} does not exist")
            raise ValueError(f"Source node {source} not found")
        if target not in self.graph:
            logger.error(f"Target node {target} does not exist")
            raise ValueError(f"Target node {target} not found")

        logger.info(f"Added edge {source} -> {target} ({distance} km)")
```

**Setting Up Logging in Scripts**

```python
import logging
from auckland_network.network import Network

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

# Create and use network
net = Network("Auckland")
net.add_node(1, -37.7849, 175.2635)
net.add_node(2, -37.8066, 175.2858)
net.add_edge(1, 2, distance=3.5)

# Output:
# 2024-01-15 10:30:45,123 - __main__ - INFO - Created network: Auckland
# 2024-01-15 10:30:45,125 - auckland_network.network - INFO - Added node 1 at (-37.7849, 175.2635)
# ...
```

#### 11.5 Custom Exceptions

Create exception classes for your package:

```python
"""
Custom exceptions for network analysis.
"""


class NetworkError(Exception):
    """Base exception for network operations."""
    pass


class NodeNotFoundError(NetworkError):
    """Raised when a node is not found in the network."""

    def __init__(self, node_id: int):
        self.node_id = node_id
        super().__init__(f"Node {node_id} not found in network")


class PathNotFoundError(NetworkError):
    """Raised when no path exists between nodes."""

    def __init__(self, source: int, target: int):
        self.source = source
        self.target = target
        super().__init__(f"No path found from {source} to {target}")


class InvalidCoordinateError(NetworkError):
    """Raised for invalid latitude/longitude values."""

    def __init__(self, lat: float, lon: float):
        self.lat = lat
        self.lon = lon
        super().__init__(f"Invalid coordinates: lat={lat}, lon={lon}")
```

Use in your code:

```python
class Network:

    def add_node(self, node_id: int, lat: float, lon: float) -> None:
        """Add a node, raising custom exceptions for errors."""
        if not (-90 <= lat <= 90):
            raise InvalidCoordinateError(lat, lon)
        if not (-180 <= lon <= 180):
            raise InvalidCoordinateError(lat, lon)
        # ... rest of method
```

#### 11.6 Performance Optimisation: Vectorisation

Use NumPy/GeoPandas operations for speed:

```python
import geopandas as gpd
import pandas as pd
from shapely.geometry import Point


# Slow: Loop through rows
def slow_distance_calculation(nodes_gdf):
    """Calculate distances with Python loop."""
    distances = []
    for idx, row in nodes_gdf.iterrows():
        # Slow!
        for idx2, row2 in nodes_gdf.iterrows():
            dist = ((row.geometry.x - row2.geometry.x)**2 +
                   (row.geometry.y - row2.geometry.y)**2)**0.5
            distances.append(dist)
    return distances


# Fast: Vectorised with GeoPandas
def fast_distance_calculation(nodes_gdf):
    """Calculate distances vectorised."""
    # Much faster - operates on whole arrays
    base_point = nodes_gdf.geometry.iloc[0]
    distances = nodes_gdf.geometry.distance(base_point)
    return distances.values
```

Example with NetworkX and pandas:

```python
import networkx as nx
import pandas as pd


class Network:

    def get_node_metrics(self) -> pd.DataFrame:
        """
        Get metrics for all nodes.

        Instead of looping through nodes, use NetworkX functions
        which are optimised for large graphs.
        """
        # Vectorised approach
        betweenness = nx.betweenness_centrality(self.graph, weight='distance')
        degree = nx.degree_centrality(self.graph)
        closeness = nx.closeness_centrality(self.graph, distance='distance')

        # Combine into DataFrame
        metrics = pd.DataFrame({
            'node_id': list(self.graph.nodes()),
            'betweenness': [betweenness[n] for n in self.graph.nodes()],
            'degree': [degree[n] for n in self.graph.nodes()],
            'closeness': [closeness[n] for n in self.graph.nodes()],
        })

        return metrics
```

#### 11.7 Edge Case Handling

Design for unusual inputs:

```python
class Network:

    def shortest_path(self, source: int, target: int) -> list:
        """
        Find shortest path, handling edge cases.

        Edge cases:
        - Source and target are the same
        - Nodes don't exist
        - No path exists
        - Disconnected network
        """
        # Edge case: same node
        if source == target:
            return [source]

        # Edge case: nodes don't exist
        if source not in self.graph:
            raise ValueError(f"Source {source} not in network")
        if target not in self.graph:
            raise ValueError(f"Target {target} not in network")

        # Edge case: no path exists
        try:
            return nx.shortest_path(self.graph, source, target, weight='distance')
        except nx.NetworkXNoPath:
            return None

    def path_distance(self, path: list) -> float:
        """
        Calculate path distance, handling edge cases.
        """
        # Edge case: empty or single-node path
        if not path or len(path) < 2:
            return 0.0

        total = 0.0
        for source, target in zip(path[:-1], path[1:]):
            # Edge case: no edge exists
            if not self.graph.has_edge(source, target):
                return float('inf')  # Or raise exception
            total += self.graph[source][target]['distance']

        return total
```

---

### Lab Exercise: Week 11 (2 hours)

**Objective**: Create documentation, add logging and custom exceptions, optimise code, and handle edge cases.

#### Part 1: Set Up Sphinx (15 minutes)

```bash
# Add Sphinx to dev dependencies
uv add --dev sphinx sphinx-rtd-theme

# Create docs structure
uv run sphinx-quickstart docs
```

When prompted, answer:
- Root path: `.`
- Project name: `auckland-network`
- Author name: Your name
- Release: `0.1.0`
- Language: `en`

#### Part 2: Configure Sphinx (15 minutes)

Edit `docs/conf.py`:

```python
import os
import sys

sys.path.insert(0, os.path.abspath('../src'))

project = 'auckland-network'
copyright = '2024, Your Name'
author = 'Your Name'
release = '0.1.0'

extensions = [
    'sphinx.ext.autodoc',
    'sphinx.ext.napoleon',
    'sphinx.ext.intersphinx',
    'sphinx.ext.viewcode',
]

html_theme = 'sphinx_rtd_theme'

napoleon_google_docstring = False
napoleon_numpy_docstring = True
```

#### Part 3: Write Usage Documentation (20 minutes)

Create `docs/usage.rst`:

```rst
==============
Usage Examples
==============

Creating and Using a Network
=============================

Basic network creation:

.. code-block:: python

    from auckland_network.network import Network

    net = Network("Auckland Network")
    net.add_node(1, -37.7849, 175.2635, name="Britomart")
    net.add_node(2, -37.8066, 175.2858, name="Newmarket")
    net.add_edge(1, 2, distance=3.5)

    # Find shortest path
    path = net.shortest_path(1, 2)
    distance = net.path_distance(path)
    print(f"Path: {path}, Distance: {distance} km")
```

Edit `docs/index.rst` to include usage page in toctree.

#### Part 4: Create API Reference Documentation (15 minutes)

Create `docs/api.rst`:

```rst
=============
API Reference
=============

Network Module
==============

.. automodule:: auckland_network.network
   :members:
   :show-inheritance:
```

#### Part 5: Build Documentation (10 minutes)

```bash
cd docs
uv run make html
open _build/html/index.html
```

Verify documentation builds and all methods are documented.

#### Part 6: Add Logging (20 minutes)

Edit `src/auckland_network/network.py` to add logging:

```python
"""
Network analysis module with logging.
"""

import logging
from typing import Optional, List, Dict

# Create module logger
logger = logging.getLogger(__name__)

# ... rest of code ...

class Network:

    def __init__(self, name: str = "Network"):
        """Initialise network."""
        self.name = name
        self.graph = nx.MultiDiGraph()
        logger.debug(f"Initialised network: {name}")

    def add_node(self, node_id: int, lat: float, lon: float, **kwargs) -> None:
        """Add a node, logging the operation."""
        if node_id in self.graph:
            logger.warning(f"Node {node_id} already exists")
            raise ValueError(f"Node {node_id} already exists")

        if not (-90 <= lat <= 90) or not (-180 <= lon <= 180):
            logger.error(f"Invalid coordinates: ({lat}, {lon})")
            raise ValueError("Invalid coordinates")

        self.graph.add_node(node_id, latitude=lat, longitude=lon, **kwargs)
        logger.info(f"Added node {node_id}")

    def shortest_path(self, source: int, target: int) -> Optional[List[int]]:
        """Find shortest path, logging the operation."""
        logger.debug(f"Finding path from {source} to {target}")

        if source == target:
            logger.debug(f"Source equals target: {source}")
            return [source]

        if source not in self.graph:
            logger.error(f"Source node {source} not found")
            raise ValueError(f"Source {source} not in network")

        try:
            path = nx.shortest_path(self.graph, source, target, weight='distance')
            logger.info(f"Found path of length {len(path)}")
            return path
        except nx.NetworkXNoPath:
            logger.warning(f"No path exists from {source} to {target}")
            return None
```

Test logging:

```bash
cat > test_logging.py << 'EOF'
import logging
from auckland_network.network import Network

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

net = Network("Test")
net.add_node(1, -37.7849, 175.2635)
net.add_node(2, -37.8066, 175.2858)
net.add_edge(1, 2, distance=3.5)
path = net.shortest_path(1, 2)
print(f"Path: {path}")
EOF

uv run python test_logging.py
```

#### Part 7: Add Custom Exceptions (15 minutes)

Create `src/auckland_network/exceptions.py`:

```python
"""
Custom exceptions for the network module.
"""


class NetworkError(Exception):
    """Base exception for network operations."""
    pass


class NodeNotFoundError(NetworkError):
    """Raised when a node is not found."""

    def __init__(self, node_id: int):
        super().__init__(f"Node {node_id} not found")


class InvalidCoordinateError(NetworkError):
    """Raised for invalid coordinates."""

    def __init__(self, lat: float, lon: float):
        super().__init__(f"Invalid coordinates: ({lat}, {lon})")
```

Update `src/auckland_network/__init__.py`:

```python
"""Auckland Network Analysis Package."""

__version__ = "0.1.0"

from . import network
from .exceptions import NetworkError, NodeNotFoundError, InvalidCoordinateError

__all__ = [
    "network",
    "NetworkError",
    "NodeNotFoundError",
    "InvalidCoordinateError",
]
```

#### Part 8: Optimise Functions (15 minutes)

Add optimised centrality calculation using built-in NetworkX functions (already vectorised).

Update network.py to add a performance optimisation example:

```python
def betweenness_centrality_sample(self, k: Optional[int] = None) -> Dict[int, float]:
    """
    Calculate betweenness centrality with optional sampling.

    For large networks, use k to sample nodes instead of calculating for all.
    This is much faster for networks with thousands of nodes.

    Parameters
    ----------
    k : Optional[int]
        If specified, calculate for k randomly sampled nodes instead of all

    Returns
    -------
    Dict[int, float]
        Betweenness centrality scores

    Notes
    -----
    Sampling trades accuracy for speed on very large networks.
    """
    logger.info(f"Calculating betweenness centrality (k={k})")
    return nx.betweenness_centrality(self.graph, weight='distance', k=k)
```

#### Part 9: Handle Edge Cases (15 minutes)

Update shortest_path to handle edge cases:

```python
def shortest_path(self, source: int, target: int) -> Optional[List[int]]:
    """
    Find shortest path with edge case handling.

    Edge cases:
    - source == target: returns [source]
    - node not found: raises NodeNotFoundError
    - no path exists: returns None
    """
    logger.debug(f"Finding path from {source} to {target}")

    # Edge case: same source and target
    if source == target:
        logger.debug("Source equals target")
        return [source]

    # Edge case: invalid nodes
    if source not in self.graph:
        logger.error(f"Source {source} not found")
        raise NodeNotFoundError(source)

    if target not in self.graph:
        logger.error(f"Target {target} not found")
        raise NodeNotFoundError(target)

    # Edge case: no path exists
    try:
        path = nx.shortest_path(self.graph, source, target, weight='distance')
        logger.info(f"Found path: {path}")
        return path
    except nx.NetworkXNoPath:
        logger.warning(f"No path from {source} to {target}")
        return None
```

#### Part 10: Verify and Commit (10 minutes)

```bash
# Format code
uv run black src/ tests/ docs/

# Check linting
uv run ruff check --fix src/

# Run tests
uv run pytest

# Build docs
cd docs && uv run make html

# Verify it builds
ls _build/html/index.html
```

Commit changes:

```bash
git add src/ tests/ docs/
git commit -m "Add documentation, logging, and custom exceptions

- Set up Sphinx documentation with RTD theme
- Write usage examples and API reference
- Add logging throughout Network class
- Create custom exception classes
- Add edge case handling
- Optimise centrality calculations with sampling"
```

#### Verification Checklist

- [ ] Sphinx documentation set up
- [ ] HTML docs build successfully
- [ ] Usage examples written
- [ ] API documentation auto-generated
- [ ] Logging added to key functions
- [ ] Custom exceptions created and used
- [ ] Edge cases handled in methods
- [ ] Code formatted and linted
- [ ] All tests still passing
- [ ] Documentation committed to git

---

## Week 12: Release & Presentation

### Lecture Notes

#### 12.1 Building Distributions

A distribution is a packaged version of your code ready for others to install:

```bash
# Build your package
uv build

# This creates two files in dist/ directory:
# - auckland-network-0.1.0.tar.gz  (source distribution)
# - auckland-network-0.1.0-py3-none-any.whl  (wheel)
```

The wheel (`.whl`) is a pre-built binary format, faster to install. The source distribution (`.tar.gz`) includes full source code.

**Understanding pyproject.toml for Building**

Your `pyproject.toml` contains the build configuration:

```toml
[build-system]
requires = ["hatchling"]           # Build backend (Hatch)
build-backend = "hatchling.build"

[project]
name = "auckland-network"
version = "0.1.0"                  # Must match your __version__
description = "..."
readme = "README.md"               # Shown on PyPI
license = {text = "MIT"}
requires-python = ">=3.9"
```

#### 12.2 Publishing to TestPyPI

Before publishing to the real PyPI, test on TestPyPI (a sandbox):

**Create TestPyPI Account**

1. Visit https://test.pypi.org/account/register/
2. Create account and verify email
3. Generate API token: Account Settings → API Tokens → "Create token"
4. Store token securely

**Configure uv with Token**

```bash
# Option 1: Use environment variable
export PYPI_TOKEN="pypi-..."  # Your TestPyPI token

# Option 2: Store in ~/.pypirc (less secure)
[testpypi]
repository = https://test.pypi.org/legacy/
username = __token__
password = pypi-...
```

**Publish to TestPyPI**

```bash
# Build distribution first
uv build

# Publish to TestPyPI
uv publish --index testpypi

# Or with environment variable
PYPI_TOKEN="pypi-..." uv publish --index testpypi
```

**Test Installation from TestPyPI**

In a new environment:

```bash
# Create fresh virtual environment
uv venv /tmp/test-install

# Activate
source /tmp/test-install/bin/activate

# Install from TestPyPI
pip install --index-url https://test.pypi.org/simple/ auckland-network==0.1.0

# Test it works
python -c "from auckland_network.network import Network; net = Network(); print('Success!')"

# Deactivate
deactivate
```

#### 12.3 Publishing to Real PyPI

Once testing is complete:

**Create PyPI Account**

1. Visit https://pypi.org/account/register/
2. Verify email
3. Generate API token in Account Settings
4. Store token securely

**Publish to PyPI**

```bash
# Build
uv build

# Publish to PyPI
uv publish

# Or with token
PYPI_TOKEN="pypi-..." uv publish

# Check it's published
open https://pypi.org/project/auckland-network/
```

**Users Can Now Install**

```bash
pip install auckland-network
```

#### 12.4 GitHub Actions for CI/CD

Automate testing and publishing with GitHub Actions.

**Create Testing Workflow**

Create `.github/workflows/test.yml`:

```yaml
name: Tests

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        python-version: ["3.9", "3.10", "3.11", "3.12"]

    steps:
      - uses: actions/checkout@v3

      - name: Install uv
        uses: astral-sh/setup-uv@v2

      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: ${{ matrix.python-version }}

      - name: Sync dependencies
        run: uv sync

      - name: Format check
        run: uv run black --check src/ tests/

      - name: Lint check
        run: uv run ruff check src/ tests/

      - name: Type check
        run: uv run mypy src/auckland_network/ --ignore-missing-imports

      - name: Run tests
        run: uv run pytest --cov=src/auckland_network tests/

      - name: Build distribution
        run: uv build
```

**Create Publishing Workflow**

Create `.github/workflows/publish.yml`:

```yaml
name: Publish to PyPI

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Install uv
        uses: astral-sh/setup-uv@v2

      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: "3.11"

      - name: Build distribution
        run: uv build

      - name: Publish to PyPI
        run: uv publish
        env:
          UV_PUBLISH_TOKEN: ${{ secrets.PYPI_TOKEN }}
```

#### 12.5 Semantic Versioning

Version numbers follow MAJOR.MINOR.PATCH:

- **MAJOR**: Breaking changes (API incompatible)
- **MINOR**: New features (backwards compatible)
- **PATCH**: Bug fixes (backwards compatible)

Examples:
- `0.1.0` → `0.2.0`: Added new functionality
- `0.1.0` → `0.1.1`: Bug fix
- `0.1.0` → `1.0.0`: First stable release with breaking changes
- `1.2.3` → `2.0.0`: Major version bump (breaking changes)

Update version in:
1. `pyproject.toml`: `version = "0.2.0"`
2. `src/auckland_network/__init__.py`: `__version__ = "0.2.0"`

#### 12.6 CHANGELOG Best Practices

Create `CHANGELOG.md` documenting changes:

```markdown
# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- New features coming next

## [0.2.0] - 2024-02-01

### Added
- `betweenness_centrality()` method for network analysis
- Logging throughout Network class
- Custom exception classes

### Fixed
- Bug in shortest path calculation for disconnected graphs
- Edge case handling for same source/target nodes

### Changed
- Improved documentation with Sphinx

## [0.1.0] - 2024-01-15

### Added
- Initial release
- Network class with basic operations
- Shortest path using Dijkstra's algorithm
- Pytest test suite
```

#### 12.7 Open Source Licences

Choose a licence for your package. Common options:

**MIT Licence** (permissive, recommended)
- Simple and widely used
- Allows commercial use
- Requires attribution

```
MIT License

Copyright (c) 2024 Your Name

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...
```

**Apache 2.0** (permissive with patent protection)
- More legal protection
- Allows commercial use
- Requires attribution

**GPL 3.0** (copyleft)
- Free software licence
- Requires derivative works to also be open source
- Stricter than MIT/Apache

Create `LICENSE` file in your repo with the licence text.

#### 12.8 Contributing Guidelines

Create `CONTRIBUTING.md`:

```markdown
# Contributing to auckland-network

We welcome contributions! This document explains how to get started.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/auckland-network.git`
3. Create a new branch: `git checkout -b feature/your-feature`
4. Install development dependencies: `uv sync`

## Development Workflow

1. Make changes to the code
2. Write tests: `uv run pytest`
3. Format code: `uv run black src/ tests/`
4. Lint: `uv run ruff check --fix src/`
5. Check types: `uv run mypy src/`

## Submitting Changes

1. Push to your fork
2. Open a Pull Request
3. Describe what your changes do
4. Ensure CI/CD tests pass

## Code Standards

- All code must have type hints
- Functions must have NumPy-style docstrings
- All features must have tests (aim for >80% coverage)
- Code must pass Black and Ruff checks
```

---

### Lab Exercise: Week 12 (2 hours)

**Objective**: Build distribution, publish to TestPyPI, set up CI/CD, and prepare presentation.

#### Part 1: Build Distribution (15 minutes)

```bash
# Ensure version is updated in pyproject.toml
# version = "0.1.0"

# Ensure version matches in __init__.py
# __version__ = "0.1.0"

# Build the package
uv build

# Check output
ls -lah dist/
# Should show:
# auckland-network-0.1.0-py3-none-any.whl
# auckland-network-0.1.0.tar.gz
```

Inspect the wheel:

```bash
# List contents of wheel
unzip -l dist/auckland-network-0.1.0-py3-none-any.whl | head -20
```

#### Part 2: Create Semantic Versioning Strategy (10 minutes)

Update version numbers for next release:

In `pyproject.toml`:

```toml
version = "0.2.0"
```

In `src/auckland_network/__init__.py`:

```python
__version__ = "0.2.0"
```

#### Part 3: Write CHANGELOG (15 minutes)

Create `CHANGELOG.md`:

```markdown
# Changelog

All notable changes are documented here.

## [0.2.0] - 2024-02-10

### Added
- Sphinx documentation with RTD theme
- Logging throughout Network module
- Custom exception classes (NetworkError, NodeNotFoundError, InvalidCoordinateError)
- Edge case handling for shortest path and path distance
- Centrality measures with sampling support
- Comprehensive test suite (25+ tests)
- GitHub Actions CI/CD workflows

### Fixed
- Improved error messages with specific context

### Changed
- Enhanced docstrings with NumPy style
- Better parameter validation with informative errors

## [0.1.0] - 2024-01-15

### Added
- Initial release
- Network class for transport network analysis
- Node and edge management
- Shortest path algorithm using Dijkstra's method
- Centrality measures: betweenness, degree, closeness
- Network connectivity checks
- GeoPandas integration for GIS data
```

#### Part 4: Create Contributing Guide (10 minutes)

Create `CONTRIBUTING.md`:

```markdown
# Contributing to auckland-network

## Quick Start

```bash
# Clone repository
git clone https://github.com/yourusername/auckland-network.git
cd auckland-network

# Install and develop
uv sync

# Make changes
vim src/auckland_network/network.py

# Test changes
uv run pytest -v

# Format and lint
uv run black src/ tests/
uv run ruff check --fix src/

# Commit
git add .
git commit -m "Brief description of changes"
git push origin feature-branch
```

## Code Standards

- Type hints required on all functions
- NumPy-style docstrings for public methods
- Tests for all new features (aim for >80% coverage)
- Code must pass Black, Ruff, and mypy checks

## Testing

```bash
# Run all tests
uv run pytest

# Run with coverage
uv run pytest --cov=src/auckland_network

# Run specific test
uv run pytest tests/test_main.py::TestNetwork::test_shortest_path
```

## Documentation

Docs are built with Sphinx:

```bash
cd docs
uv run make html
open _build/html/index.html
```

Add docstrings to new functions following NumPy style.

## Before Submitting PR

- [ ] Tests pass (`uv run pytest`)
- [ ] Code formatted (`uv run black src/`)
- [ ] No lint errors (`uv run ruff check src/`)
- [ ] Types check (`uv run mypy src/`)
- [ ] Documentation updated
- [ ] CHANGELOG.md updated

## Questions?

Create an issue on GitHub!
```

#### Part 5: Set Up GitHub Actions (20 minutes)

Create `.github/workflows/test.yml`:

```yaml
name: Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        python-version: ["3.9", "3.10", "3.11", "3.12"]

    steps:
      - uses: actions/checkout@v4

      - name: Install uv
        uses: astral-sh/setup-uv@v2
        with:
          version: "latest"

      - name: Set up Python ${{ matrix.python-version }}
        uses: actions/setup-python@v4
        with:
          python-version: ${{ matrix.python-version }}

      - name: Sync dependencies
        run: uv sync

      - name: Format check
        run: uv run black --check src/ tests/

      - name: Lint
        run: uv run ruff check src/ tests/

      - name: Type check
        run: uv run mypy src/auckland_network/ --ignore-missing-imports

      - name: Run tests
        run: uv run pytest --cov=src/auckland_network --cov-report=xml tests/

      - name: Build distribution
        run: uv build

  docs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Install uv
        uses: astral-sh/setup-uv@v2

      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: "3.11"

      - name: Sync dependencies
        run: uv sync

      - name: Build documentation
        run: cd docs && uv run make html
```

Create `.github/workflows/publish.yml`:

```yaml
name: Publish

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Install uv
        uses: astral-sh/setup-uv@v2

      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: "3.11"

      - name: Sync dependencies
        run: uv sync

      - name: Run tests
        run: uv run pytest

      - name: Build distribution
        run: uv build

      - name: Publish to PyPI
        run: uv publish
        env:
          UV_PUBLISH_TOKEN: ${{ secrets.PYPI_TOKEN }}
```

Create `.github/workflows/docs.yml`:

```yaml
name: Build Documentation

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Install uv
        uses: astral-sh/setup-uv@v2

      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: "3.11"

      - name: Sync dependencies
        run: uv sync

      - name: Build docs
        run: cd docs && uv run make html

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./docs/_build/html
```

Commit workflows:

```bash
git add .github/workflows/
git commit -m "Add GitHub Actions CI/CD workflows for testing and publishing"
```

#### Part 6: Create Package Documentation (15 minutes)

Create comprehensive `README.md`:

```markdown
# auckland-network

Network analysis tools for Auckland transport systems.

[![Tests](https://github.com/yourusername/auckland-network/workflows/Tests/badge.svg)](https://github.com/yourusername/auckland-network/actions)
[![PyPI](https://img.shields.io/pypi/v/auckland-network.svg)](https://pypi.org/project/auckland-network/)
[![Python 3.9+](https://img.shields.io/badge/python-3.9+-blue.svg)](https://www.python.org/downloads/)

## Features

- Network creation and management with spatial data
- Shortest path algorithms using Dijkstra's method
- Centrality measures: betweenness, degree, closeness
- Integration with GeoPandas for GIS analysis
- Comprehensive documentation and examples
- Full test coverage with pytest

## Installation

```bash
pip install auckland-network
```

## Quick Start

```python
from auckland_network.network import Network

# Create network
net = Network("Auckland Transport")

# Add nodes (stations/intersections)
net.add_node(1, -37.7849, 175.2635, name="Britomart")
net.add_node(2, -37.8066, 175.2858, name="Newmarket")
net.add_node(3, -37.8248, 175.2768, name="Epsom")

# Add connections
net.add_edge(1, 2, distance=3.5)  # 3.5 km between nodes
net.add_edge(2, 3, distance=2.1)

# Find shortest path
path = net.shortest_path(1, 3)
distance = net.path_distance(path)
print(f"Shortest path: {path}")
print(f"Distance: {distance} km")

# Network analysis
summary = net.summary()
print(f"Nodes: {summary['nodes']}, Edges: {summary['edges']}")
```

## Documentation

Full documentation available at: [https://auckland-network.readthedocs.io](https://auckland-network.readthedocs.io)

## Contributing

Contributions welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT License - see [LICENSE](LICENSE) for details.
```

#### Part 7: Prepare Presentation (30 minutes)

Create `presentation.md` (for 10-15 minute presentation):

```markdown
# auckland-network: A Python GIS Package

## Presentation Outline (15 minutes)

### 1. Problem & Motivation (2 min)
- Auckland transport networks are complex
- Current tools (ArcGIS) are expensive
- Need open-source Python alternative
- Goal: Make network analysis accessible

### 2. Solution: auckland-network Package (2 min)
- Built with uv (modern Python package manager)
- Uses NetworkX for graph algorithms
- GeoPandas for spatial data
- Comprehensive documentation with Sphinx

### 3. Package Architecture (2 min)
- `Network` class: Main API
- Shortest path via Dijkstra's algorithm
- Centrality measures for node importance
- Loading from GIS formats (GeoJSON, Shapefiles)

### 4. Key Features Demo (5 min)
```python
# Create network
net = Network("Auckland")
net.add_node(1, -37.78, 175.26, name="Britomart")
net.add_node(2, -37.81, 175.29, name="Newmarket")
net.add_edge(1, 2, distance=3.5)

# Find optimal routes
path = net.shortest_path(1, 2)

# Analyse importance
centrality = net.betweenness_centrality()
```

### 5. Development Workflow (2 min)
- Package development with uv
- Automated testing with pytest
- Code quality with Black, Ruff, mypy
- Documentation with Sphinx
- CI/CD with GitHub Actions

### 6. Lessons Learned (1 min)
- Start simple, add complexity gradually
- Test-driven development essential
- Documentation from the start
- CI/CD catches problems early

### 7. Future Work (1 min)
- More algorithms (A*, isochrone analysis)
- Performance optimisations for large networks
- Real-time traffic integration
- Web interface with Flask/Django

## Deliverables

- ✅ Package on PyPI (pip install auckland-network)
- ✅ Full documentation (ReadTheDocs)
- ✅ 95%+ test coverage
- ✅ GitHub Actions CI/CD
- ✅ Contributing guide for open source collaboration
```

#### Part 8: Test Full Installation Pipeline (15 minutes)

Test the complete pipeline in a fresh environment:

```bash
# Create temporary test environment
mkdir /tmp/test-auckland-network
cd /tmp/test-auckland-network
uv venv

# Activate
source .venv/bin/activate

# Install from local built package
pip install /original/path/to/dist/auckland-network-0.2.0-py3-none-any.whl

# Test it works
python << 'EOF'
from auckland_network.network import Network
net = Network("Test")
net.add_node(1, -37.7849, 175.2635)
net.add_node(2, -37.8066, 175.2858)
net.add_edge(1, 2, distance=3.5)
path = net.shortest_path(1, 2)
print(f"✓ Package installed and working!")
print(f"✓ Path: {path}")
print(f"✓ Distance: {net.path_distance(path)} km")
EOF

# Cleanup
deactivate
```

#### Part 9: Final Commit and Tag (10 minutes)

```bash
# Ensure all changes are staged
git status

# Commit version bump and release files
git add pyproject.toml src/auckland_network/__init__.py CHANGELOG.md
git commit -m "Release version 0.2.0

Major improvements:
- Documentation with Sphinx
- Logging and custom exceptions
- Edge case handling
- GitHub Actions CI/CD
- Contributing guidelines"

# Tag the release
git tag -a v0.2.0 -m "Release version 0.2.0

Includes:
- Full test suite (25+ tests)
- Sphinx documentation
- Logging throughout
- Custom exceptions
- GitHub Actions workflows"

# Push to remote
git push origin main
git push origin v0.2.0
```

#### Part 10: Create Release on GitHub (10 minutes)

1. Go to GitHub repository
2. Click "Releases" → "Create a new release"
3. Select tag: `v0.2.0`
4. Title: "auckland-network v0.2.0"
5. Description:

```markdown
# Release Notes

## Features
- Network analysis tools for Auckland transport
- Shortest path algorithms
- Centrality measures
- GIS data integration

## What's New in 0.2.0
- Comprehensive documentation with Sphinx
- Logging throughout application
- Custom exception classes
- Edge case handling
- CI/CD with GitHub Actions

## Installation
```bash
pip install auckland-network
```

## Documentation
https://auckland-network.readthedocs.io

## Changelog
See CHANGELOG.md for full details.
```

#### Verification Checklist

Before presentation, verify:

- [ ] Distribution built successfully (`uv build`)
- [ ] Distribution file exists (`ls dist/`)
- [ ] Version updated in both `pyproject.toml` and `__init__.py`
- [ ] CHANGELOG.md written with all changes
- [ ] CONTRIBUTING.md created with guidelines
- [ ] GitHub Actions workflows created and working
- [ ] README.md comprehensive and clear
- [ ] Package installable from dist
- [ ] All tests passing
- [ ] Documentation builds without errors
- [ ] Git tagged with version
- [ ] Release created on GitHub

#### Presentation Tips

**Do:**
- Show live code demo (safest: pre-recorded)
- Use simple examples that fit on screen
- Highlight problem being solved
- Show test coverage and automation
- Discuss lessons learned

**Avoid:**
- Reading slides verbatim
- Complex mathematical notation
- Too much code at once
- Discussing implementation details

**Structure** (for 10-15 minute talk):
1. Problem (2 min) - Why this package?
2. Solution (2 min) - What does it do?
3. Demo (5 min) - Show it working
4. Architecture (2 min) - How is it built?
5. Lessons (2 min) - What we learned
6. Questions (variable) - Audience engagement

---

## Troubleshooting Guide

### uv Issues

**"uv: command not found"**

```bash
# Re-install uv
curl -LsSf https://astral.sh/uv/install.sh | sh

# Add to PATH
export PATH="$HOME/.cargo/bin:$PATH"

# Verify
uv --version
```

**Dependency resolution failing**

```bash
# Clear cache and retry
rm uv.lock
uv sync

# Check for conflicts
uv pip compile --help
```

### Testing Issues

**"ModuleNotFoundError: No module named 'auckland_network'"**

```bash
# Ensure you're running pytest with uv
uv run pytest

# NOT just 'pytest' (wrong environment)
```

**"Tests can't find module after adding new file"**

```bash
# Rebuild package in editable mode
uv sync
```

### Documentation Issues

**"Sphinx autodoc not finding modules"**

Check `docs/conf.py`:

```python
sys.path.insert(0, os.path.abspath('../src'))  # Must point to src/
```

**"RST formatting errors"**

```bash
# Build with warnings shown
cd docs
uv run make html SPHINXOPTS="-W --keep-going"
```

### Publishing Issues

**"Authentication failed for PyPI"**

```bash
# Check token is valid
export PYPI_TOKEN="pypi-AgE..."

# Try TestPyPI first
uv publish --index testpypi
```

**"Version already exists on PyPI"**

```bash
# Bump version in pyproject.toml and __init__.py
# Rebuild
uv build

# Publish new version
uv publish
```

### GitHub Actions Issues

**"Actions workflow not running"**

1. Check `.github/workflows/test.yml` exists
2. Commit file to main branch
3. Go to repo → Actions → check for errors
4. Ensure Python version specified is valid

**"PyPI_TOKEN secret not found"**

1. Go to Settings → Secrets and Variables → Actions
2. Click "New repository secret"
3. Name: `PYPI_TOKEN`
4. Value: Your PyPI API token
5. Click "Add secret"

---

## Summary

Over 12 weeks, you've built a complete, professional Python GIS package:

**Week 9**: Project foundation with modern tooling (uv)
**Week 10**: Core implementation with testing and code quality
**Week 11**: Documentation, logging, error handling
**Week 12**: Building, publishing, and CI/CD automation

You now have:
- ✅ Working package installable via pip
- ✅ Comprehensive test suite
- ✅ Professional documentation
- ✅ Automated testing with GitHub Actions
- ✅ Ready for open-source collaboration

The skills you've learned apply to any Python project, whether for research, industry, or open-source contribution.

---

## Additional Resources

### Documentation
- [uv Documentation](https://docs.astral.sh/uv/)
- [NetworkX Documentation](https://networkx.org/)
- [GeoPandas Documentation](https://geopandas.org/)
- [Sphinx Documentation](https://www.sphinx-doc.org/)
- [PyPI Help](https://pypi.org/help/)

### Best Practices
- [Python Packaging Guide](https://packaging.python.org/)
- [PEP 8 Style Guide](https://pep8.org/)
- [Real Python Guides](https://realpython.com/)
- [Semantic Versioning](https://semver.org/)
- [Keep a Changelog](https://keepachangelog.com/)

### Tools
- [Black Code Formatter](https://black.readthedocs.io/)
- [Ruff Linter](https://github.com/astral-sh/ruff)
- [Pytest Documentation](https://docs.pytest.org/)
- [mypy Type Checker](https://mypy.readthedocs.io/)

---

**End of GISCI 343 Weeks 9-12: Python Package Development**

*Last updated: February 2024*
*For questions or updates, contact: Dr Hyesop Shin, University of Auckland*
