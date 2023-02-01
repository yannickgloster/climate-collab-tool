import numpy as np
import pandas as pd
import xarray as xr

import matplotlib.path as mpath
import matplotlib.pyplot as plt
import cartopy.crs as ccrs
import cftime

from shapely.geometry import Point, Polygon

import constants

downloaded_ssps = ["ssp126", "ssp245", "ssp370", "ssp585"]

datasets_root = "data"
ds_var_name = "tasmax"
model = "CNRM-CM6-1"

for ssp in downloaded_ssps:
    # Dataset renamed to follow the following format
    ds = xr.open_dataset(
        f"{datasets_root}/{ssp}_{ds_var_name}_{model}.nc",
        decode_times=True,
        use_cftime=True,
    )

    for region in constants.regions.keys():
        # Generate Polygons
        polygons = []

        for coords in constants.regions[region]["points"]:
            r = Polygon(coords)
            polygons.append(r)

        all_in_region = []

        for polygon in polygons:
            in_region = ds.where(
                (ds.lat >= polygon.bounds[0])
                & (ds.lat <= polygon.bounds[2])
                & (ds.lon >= polygon.bounds[1])
                & (ds.lon <= polygon.bounds[3]),
                drop=True,
            )

            all_in_region.append(in_region[ds_var_name])

        if len(all_in_region) > 0:
            whole_region: xr.DataArray = xr.merge(all_in_region)

            # FIXME: there's something broken here the numbers don't seem right, I think it's the region boundaries for the US
            # TODO: consider using median or mean
            mean_whole_region = whole_region.max(dim=["lat", "lon"]).drop_vars("height")
            print(mean_whole_region)

            # Get the max of the max temperatures per year
            monthly_max_mean_region = mean_whole_region.groupby("time.year").max()

            # TODO: Upload to DB
            # FIXME: Temporarily saving to CSV
            monthly_max_mean_region.to_dataframe().to_csv(
                f"{datasets_root}/{ssp}_{ds_var_name}_{region}.csv"
            )
