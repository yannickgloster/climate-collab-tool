# https://prisma-client-py.readthedocs.io/en/stable/reference/config/#config-options

import numpy as np
import pandas as pd
import xarray as xr

import matplotlib.path as mpath
import matplotlib.pyplot as plt
import rioxarray

import cftime

from shapely.geometry import Point, Polygon, box
from math import isnan

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


async def process_tasmax_map() -> None:
    ds_var_name = "tasmax"

    # Generated from https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json using https://mapshaper.org/
    world_shape = gpd.read_file(f"{datasets_root}/world_countries.shp")
    db = Prisma()

    for ssp in downloaded_ssps:
        # Dataset renamed to follow the following format
        data = rioxarray.open_rasterio(
            f"{datasets_root}/{ds_var_name}_Amon_{model}_ssp{ssp}.nc",
            decode_times=True,
            use_cftime=True,
            masked=True,
        )[1]
        # Convert longitude from 0 to 360 to -180 to 180
        data.coords["x"] = (data.coords["x"] + 180) % 360 - 180
        data = data.sortby(data.x)
        # Add in the correct crs
        data.rio.write_crs(world_shape.crs, inplace=True)
        data[ds_var_name][0, ...].plot()
        plt.title(f"{ssp}")
        plt.show()

        await db.connect()
        for index, country in world_shape.iterrows():
            # Get the data only for the one region
            country_data = data.rio.clip(
                gpd.GeoSeries(country.geometry), world_shape.crs, drop=False
            )
            # Get the max across time and across that region
            country_max = country_data.max()[ds_var_name]
            if isnan(country_max):
                # Replace NaN with -1, mostly for very small countries
                country_max = -1
            else:
                # Convert values to degrees C
                country_max = country_max - 273.1

            ssp_enum = SSP["SSP" + ssp.upper()]
            model_enum = Model[model.upper().replace("-", "_")]

            try:
                await db.mapdata.create(data={"ssp": ssp_enum, "model": model_enum})
            except:
                print("Data row already exists")

            await db.tempmaxmaprow.create(
                data={
                    "tasmax": float(country_max),
                    "ISO3": country.FID,
                    "dataSsp": ssp_enum,
                    "dataModel": model_enum,
                }
            )
        await db.disconnect()


async def process_tasmax() -> None:
    ds_var_name = "tasmax"

    world_shape = gpd.read_file(f"{datasets_root}/world_countries.shp")
    db = Prisma()

    for ssp in downloaded_ssps:
        # Load in data
        # The first element in the array is height while the second is tasmax, lat, and lon over time.
        data = rioxarray.open_rasterio(
            f"{datasets_root}/{ds_var_name}_Amon_{model}_ssp{ssp}.nc",
            decode_times=True,
            use_cftime=True,
            masked=True,
        )[1]
        # Convert longitude from 0 to 360 to -180 to 180
        data.coords["x"] = (data.coords["x"] + 180) % 360 - 180
        data = data.sortby(data.x)
        # Add in the correct crs
        data.rio.write_crs(world_shape.crs, inplace=True)
        data[ds_var_name][0, ...].plot()
        plt.title(f"{ssp}")
        plt.show()

        for region in constants.regions.keys():
            polygons = []
            if "points" in constants.regions[region]:
                polygons.append(
                    gpd.GeoDataFrame(
                        geometry=[box(-25, 34, 32, 72)], crs=world_shape.crs
                    )
                )
            else:
                if "country_names" in constants.regions[region]:
                    for country_name in constants.regions[region]["country_names"]:
                        polygons.append(world_shape[world_shape.name == country_name])
                else:
                    polygons.append(
                        world_shape[
                            world_shape.name == constants.regions[region]["full_name"]
                        ]
                    )

            # Group all the different polygon data into one dataset
            all_clips = []
            for p in polygons:
                all_clips.append(data.rio.clip(p.geometry, world_shape.crs, drop=False))
            region_data = xr.merge(all_clips)
            # Plot first data point on map for debug
            # region_data[ds_var_name][0, ...].plot()
            # plt.show()

            # get the max temperature in the region over time
            region_data = region_data.max(dim=["x", "y"])

            # convert max temperature from monthly data to yearly data
            region_data = region_data.groupby("time.year").max()

            # convert K to degrees C
            region_data[ds_var_name] = region_data[ds_var_name] - 273.15

            # Plot line chart for debug
            # region_data[ds_var_name].plot()
            # plt.show()

            region_data_df = region_data.to_dataframe()

            # Prisma Enums
            ssp_enum = SSP["SSP" + ssp.upper()]
            model_enum = Model[model.upper().replace("-", "_")]
            region_enum = Region[region]

            await db.connect()

            try:
                await db.data.create(
                    data={"ssp": ssp_enum, "model": model_enum, "region": region_enum}
                )
            except:
                print("Data row already exists")

            for index, row in region_data_df.iterrows():
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


async def process_tas() -> None:
    ds_var_name = "tas"

    world_shape = gpd.read_file(f"{datasets_root}/world_countries.shp")
    db = Prisma()

    for ssp in downloaded_ssps:
        # Load in data
        # The first element in the array is height while the second is tasmax, lat, and lon over time.
        data = rioxarray.open_rasterio(
            f"{datasets_root}/{ds_var_name}_Amon_{model}_ssp{ssp}.nc",
            decode_times=True,
            use_cftime=True,
            masked=True,
        )[1]
        # Convert longitude from 0 to 360 to -180 to 180
        data.coords["x"] = (data.coords["x"] + 180) % 360 - 180
        data = data.sortby(data.x)
        # Add in the correct crs
        data.rio.write_crs(world_shape.crs, inplace=True)
        data[ds_var_name][0, ...].plot()
        plt.title(f"{ssp}")
        plt.show()

        for region in constants.regions.keys():
            polygons = []
            if "points" in constants.regions[region]:
                polygons.append(
                    gpd.GeoDataFrame(
                        geometry=[box(-25, 34, 32, 72)], crs=world_shape.crs
                    )
                )
            else:
                if "country_names" in constants.regions[region]:
                    for country_name in constants.regions[region]["country_names"]:
                        polygons.append(world_shape[world_shape.name == country_name])
                else:
                    polygons.append(
                        world_shape[
                            world_shape.name == constants.regions[region]["full_name"]
                        ]
                    )

            # Group all the different polygon data into one dataset
            all_clips = []
            for p in polygons:
                all_clips.append(data.rio.clip(p.geometry, world_shape.crs, drop=False))
            region_data = xr.merge(all_clips)
            # Plot first data point on map for debug
            # region_data[ds_var_name][0, ...].plot()
            # plt.show()

            # get the max temperature in the region over time
            region_data = region_data.mean(dim=["x", "y"])

            # convert max temperature from monthly data to yearly data
            region_data = region_data.groupby("time.year").mean()

            # convert K to degrees C
            region_data[ds_var_name] = region_data[ds_var_name] - 273.15

            # Plot line chart for debug
            # region_data[ds_var_name].plot()
            # plt.show()

            region_data_df = region_data.to_dataframe()

            # Prisma Enums
            ssp_enum = SSP["SSP" + ssp.upper()]
            model_enum = Model[model.upper().replace("-", "_")]
            region_enum = Region[region]

            await db.connect()

            try:
                await db.data.create(
                    data={"ssp": ssp_enum, "model": model_enum, "region": region_enum}
                )
            except:
                print("Data row already exists")

            for index, row in region_data_df.iterrows():
                await db.temprow.create(
                    data={
                        "year": datetime(index, 1, 1),
                        "tas": float(row["tas"]),
                        "dataSsp": ssp_enum,
                        "dataModel": model_enum,
                        "dataRegion": region_enum,
                    }
                )

            await db.disconnect()


async def process_tas_map() -> None:
    ds_var_name = "tas"

    # Generated from https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json using https://mapshaper.org/
    world_shape = gpd.read_file(f"{datasets_root}/world_countries.shp")
    db = Prisma()

    for ssp in downloaded_ssps:
        # Dataset renamed to follow the following format
        data = rioxarray.open_rasterio(
            f"{datasets_root}/{ds_var_name}_Amon_{model}_ssp{ssp}.nc",
            decode_times=True,
            use_cftime=True,
            masked=True,
        )[1]
        print(data)

        # Convert longitude from 0 to 360 to -180 to 180
        data.coords["x"] = (data.coords["x"] + 180) % 360 - 180
        data = data.sortby(data.x)
        # Add in the correct crs
        data.rio.write_crs(world_shape.crs, inplace=True)
        data[ds_var_name][0, ...].plot()
        plt.title(f"{ssp}")
        plt.show()

        await db.connect()
        for index, country in world_shape.iterrows():
            # Get the data only for the one region
            country_data = data.rio.clip(
                gpd.GeoSeries(country.geometry), world_shape.crs, drop=False
            )
            # Get the max across time and across that region
            country_mean = country_data.mean()[ds_var_name]
            if isnan(country_mean):
                # Replace NaN with -1, mostly for very small countries
                country_mean = -1
            else:
                # Convert values to degrees C
                country_mean = country_mean - 273.1

            ssp_enum = SSP["SSP" + ssp.upper()]
            model_enum = Model[model.upper().replace("-", "_")]

            try:
                await db.mapdata.create(data={"ssp": ssp_enum, "model": model_enum})
            except:
                print("Data row already exists")

            await db.tempmaprow.create(
                data={
                    "tas": float(country_mean),
                    "ISO3": country.FID,
                    "dataSsp": ssp_enum,
                    "dataModel": model_enum,
                }
            )
        await db.disconnect()


async def process_zos_map() -> None:
    ds_var_name = "zos"

    # Generated from https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json using https://mapshaper.org/
    oceanShape = gpd.read_file(f"{datasets_root}/goas_v03.shp")
    db = Prisma()

    for ssp in [downloaded_ssps[0]]:
        ds = xr.open_dataset(
            f"{datasets_root}/{ds_var_name}_Omon_{model}_ssp{ssp}.nc",
            decode_times=True,
            use_cftime=True,
        )
        # data = rioxarray.open_rasterio(
        #     f"{datasets_root}/{ds_var_name}_Omon_{model}_ssp{ssp}.nc",
        #     decode_times=True,
        #     use_cftime=True,
        #     masked=True,
        #     parse_coordinates=False
        # )
        print(ds)
        # print(data)
        ds[ds_var_name][0, ...].plot()
        plt.show()
        # ds.rio.set_spatial_dims(x_dim="x", y_dim="y", inplace=True)
        # ds.rio.write_crs("WGS84", inplace=True)


if __name__ == "__main__":
    # asyncio.run(process_tasmax())
    # asyncio.run(process_tasmax_map())
    # asyncio.run(process_zos_map())
    asyncio.run(process_tas_map())
    asyncio.run(process_tas())
