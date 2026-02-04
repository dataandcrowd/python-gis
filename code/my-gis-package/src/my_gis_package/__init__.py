from importlib import resources
import pandas as pd

def load_sample_census_nz() -> pd.DataFrame:
    data_path = resources.files("my_gis_package").joinpath("data", "sample_census_nz.csv")
    return pd.read_csv(data_path)