# https://prisma-client-py.readthedocs.io/en/stable/reference/config/#config-options

import numpy as np
import pandas as pd
import xarray as xr

import matplotlib.path as mpath
import matplotlib.pyplot as plt

# import cartopy.crs as ccrs
import cftime

from shapely.geometry import Point, Polygon

import constants

import asyncio
from prisma import Prisma
from enum import Enum
from datetime import datetime
from prisma.enums import SSP, Model, Region

import geopandas as gpd

# prisma generate --schema="../app/prisma/schema.prisma"
datasets_root = "data"
downloaded_ssps = ["119", "126", "245", "370", "434", "460", "534OS", "585"]
model = "CNRM-ESM2-1"  # (FRANCE)


async def process_tasmax() -> None:
    ds_var_name = "tasmax"

    # https://thematicmapping.org/downloads/world_borders.php
    # https://larmarange.github.io/prevR/reference/TMWorldBorders.html
    world_shape = gpd.read_file(f"{datasets_root}/TM_WORLD_BORDERS-0.3.shp")
    db = Prisma()

    for ssp in downloaded_ssps:
        # Dataset renamed to follow the following format
        ds = xr.open_dataset(
            f"{datasets_root}/{ds_var_name}_Amon_{model}_ssp{ssp}.nc",
            decode_times=True,
            use_cftime=True,
        )

        for region in constants.regions.keys():
            if "points" in constants.regions[region]:
                polygon = Polygon(constants.regions[region]["points"])
            else:
                if "country_names" in constants.regions[region]:
                    polygon = []
                    for country_name in constants.regions[region]["country_names"]:
                        polygon.append(
                            world_shape[world_shape.NAME == country_name]
                                .iloc[0]
                                .geometry
                        )
                else:
                    polygon = (
                        world_shape[
                            world_shape.NAME == constants.regions[region]["full_name"]
                            ]
                            .iloc[0]
                            .geometry
                    )

            if "country_names" in constants.regions[region]:
                all_in_region = []
                for p in polygon:
                    bounds = p.bounds
                    in_region_temp = ds.where(
                        (ds.lat >= bounds[0])
                        & (ds.lat <= bounds[2])
                        & (ds.lon >= bounds[1])
                        & (ds.lon <= bounds[3])
                    )
                    all_in_region.append(in_region_temp[ds_var_name])
                in_region: xr.Dataset = xr.merge(all_in_region)
            else:
                in_region = ds.where(
                    (ds.lat >= polygon.bounds[0])
                    & (ds.lat <= polygon.bounds[2])
                    & (ds.lon >= polygon.bounds[1])
                    & (ds.lon <= polygon.bounds[3]),
                    drop=True,
                )[ds_var_name]

            # FIXME: After testing with test(), it looks like there's a problem with China and India in the actual dataset
            mean_whole_region = in_region.max(dim=["lat", "lon"]).drop_vars("height")

            # Get the max of the max temperatures per year
            monthly_max_mean_region = mean_whole_region.groupby("time.year").max()

            ssp_enum = SSP["SSP" + ssp.upper()]
            model_enum = Model[model.upper().replace("-", "_")]
            region_enum = Region[region]
            df = monthly_max_mean_region.to_dataframe()

            await db.connect()

            try:
                await db.data.create(
                    data={"ssp": ssp_enum, "model": model_enum, "region": region_enum}
                )
            except:
                print("Data row already exists")

            # TODO: switch to create many
            for index, row in df.iterrows():
                await db.tempmaxrow.create(
                    data={
                        "year": datetime(index, 1, 1),
                        "tasmax": float(row["tasmax"]),
                        "dataSsp": ssp_enum,
                        "dataModel": model_enum,
                        "dataRegion": region_enum,
                    }
                )

            await db.disconnect()


async def process_tasmax_map() -> None:
    ds_var_name = "tasmax"

    # https://thematicmapping.org/downloads/world_borders.php
    # https://larmarange.github.io/prevR/reference/TMWorldBorders.html
    world_shape = gpd.read_file(f"{datasets_root}/TM_WORLD_BORDERS-0.3.shp")
    db = Prisma()

    for ssp in downloaded_ssps:
        # Dataset renamed to follow the following format
        ds = xr.open_dataset(
            f"{datasets_root}/{ds_var_name}_Amon_{model}_ssp{ssp}.nc",
            decode_times=True,
            use_cftime=True,
        )
        for _index, country in world_shape.iterrows():
            in_region = None
            data_point = -1
            try:
                in_region = ds.where(
                    (ds.lat >= country.geometry.bounds[0])
                    & (ds.lat <= country.geometry.bounds[2])
                    & (ds.lon >= country.geometry.bounds[1])
                    & (ds.lon <= country.geometry.bounds[3]),
                    drop=True,
                )[ds_var_name]
            except:
                data_point = -1

            if in_region is not None:
                max_whole_region = in_region.max(dim=["lat", "lon"]).drop_vars("height").max()
                data_point = max_whole_region.values

            ssp_enum = SSP["SSP" + ssp.upper()]
            model_enum = Model[model.upper().replace("-", "_")]

            await db.connect()

            try:
                await db.mapdata.create(
                    data={"ssp": ssp_enum, "model": model_enum}
                )
            except:
                print("Data row already exists")

            await db.tempmaxmaprow.create(
                data={
                    "tasmax": float(data_point),
                    "ISO3": country.ISO3,
                    "dataSsp": ssp_enum,
                    "dataModel": model_enum,
                }
            )
            await db.disconnect()


def test():
    world_shape = gpd.read_file(
        f"{datasets_root}/TM_WORLD_BORDERS-0.3.shp", decode_coords="all"
    )
    # EPSG:4326
    print()
    print(world_shape.crs)

    ds_var_name = "tasmax"

    model = "CNRM-ESM2-1"  # (FRANCE)

    ssp = "119"

    ds = xr.open_dataset(
        f"{datasets_root}/{ds_var_name}_Amon_{model}_ssp{ssp}.nc",
        decode_times=True,
        use_cftime=True,
    )
    print(ds.attrs)

    ds["tasmax"].isel(time=1019).plot(cmap="coolwarm")
    plt.show()


if __name__ == "__main__":
    asyncio.run(process_tasmax_map())
    asyncio.run(process_tasmax())
