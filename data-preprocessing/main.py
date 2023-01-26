import numpy as np
import xarray as xr

import matplotlib.path as mpath
import matplotlib.pyplot as plt

ds = xr.open_dataset(
    f'data/ta_Amon_EC-Earth3-Veg_ssp119_r1i1p1f1_gr_20150116-20991216_v20200226.nc')
    
print(ds)
