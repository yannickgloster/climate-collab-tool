import numpy as np
import xarray as xr

import matplotlib.path as mpath
import matplotlib.pyplot as plt

from shapely.geometry import Point, Polygon

datasets_root = "data"

monthly_air_temperature_2015_to_2099_netCDF = (
    "ta_Amon_EC-Earth3-Veg_ssp119_r1i1p1f1_gr_20150116-20991216_v20200226.nc"
)

ds = xr.open_dataset(f"{datasets_root}/{monthly_air_temperature_2015_to_2099_netCDF}")

print(ds.stack(lat_lon=["lat", "lon"]))

# TODO: Average the mean for all the areas within the boundary of the 8 regions.

# loop over each long/lat pairing

# i = 0
# # FIXME: this doesn't do the comment above
# for data_point in ds.ta.groupby("lat", "lon"):
#     print(data_point)
#     print("-----------------------------------")
#     i += 1
#     if i == 2:
#         break


# check if it's within the area defined by the region
"""
Example Code:

coords = [(10, 20), (30, 20), (30, 40), (10, 40), (10, 20)]
point = Point(25, 35)
bounding_area = Polygon(coords)
print(point.within(bounding_area))
"""

# if it's in the region, add it to a rolling average (or sum and increase count)

# once completed, store in .nc file for the time being.

# TODO: Upload to DB
