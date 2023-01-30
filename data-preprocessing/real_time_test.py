from matplotlib import pyplot as plt
import numpy as np
import pandas as pd
import xarray as xr
import zarr
import fsspec
import time

# http://gallery.pangeo.io/repos/pangeo-gallery/cmip6/basic_search_and_load.html
# modified to be equivelant to download_data.py

start_time = time.time()

df = pd.read_csv(
    "https://storage.googleapis.com/cmip6/cmip6-zarr-consolidated-stores.csv"
)

df_tasmax = df.query(
    "activity_id=='ScenarioMIP' & experiment_id == 'ssp126' & variable_id == 'tasmax' & table_id=='Amon'"
)

df_tasmax_ec_earth = df_tasmax.query(
    'institution_id == "EC-Earth-Consortium" & source_id == "EC-Earth3"'
)
# print(df_tasmax_ec_earth)

zstore = df_tasmax_ec_earth.zstore.values[-1]
# print(zstore)

# create a mutable-mapping-style interface to the store
mapper = fsspec.get_mapper(zstore)

# open it using xarray and zarr
ds = xr.open_zarr(mapper, consolidated=True)
elapsed_time = time.time() - start_time
print("Elapsed time:", elapsed_time, "seconds")
print(ds)
