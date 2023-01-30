import numpy as np
import pandas as pd
import xarray as xr

import matplotlib.path as mpath
import matplotlib.pyplot as plt
import cartopy.crs as ccrs
import cftime

from shapely.geometry import Point, Polygon

import constants

datasets_root = "data"

monthly_near_surface_air_temperature_2015_to_2099_netCDF = (
    "tasmax_Amon_EC-Earth3_ssp119_r4i1p1f1_gr_20150116-20991216_v20200425.nc"
)

ds = xr.open_dataset(
    f"{datasets_root}/{monthly_near_surface_air_temperature_2015_to_2099_netCDF}",
    decode_times=True,
    use_cftime=True,
)

ds_var_name = "tasmax"
ssp = "ssp_119"

for region in constants.regions.keys():
    # Generate Polygons
    polygons = []

    for coords in constants.regions[region]["points"]:
        r = Polygon(coords)
        polygons.append(r)

    all_means = []

    for polygon in polygons:
        in_region = ds.where(
            (ds.lat >= polygon.bounds[0])
            & (ds.lat <= polygon.bounds[2])
            & (ds.lon >= polygon.bounds[1])
            & (ds.lon <= polygon.bounds[3]),
            drop=True,
        )
        # Get Mean across time
        # TODO: consider getting median
        mean_data = in_region[ds_var_name].mean(dim=["lat", "lon"]).drop_vars("height")
        all_means.append(mean_data)

    if len(all_means) > 0:
        combinded_means: xr.DataArray = xr.merge(all_means)

        # TODO: Upload to DB
        # FIXME: Temporarily saving to CSV
        combinded_means.to_dataframe().to_csv(
            f"{datasets_root}/{ssp}_{ds_var_name}_{region}.csv"
        )
