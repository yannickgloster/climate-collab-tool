import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../utils/prisma";
import { SSP, Region } from "@prisma/client";
import SimpleLinearRegression from "ml-regression-simple-linear";

const KELVIN_CELSIUS_DIFF = 273.15;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { ssp, region } = req.query;
  const results = await prisma.data.findUnique({
    where: {
      ssp_model_region: {
        ssp: SSP[ssp.toString()],
        region: Region[region.toString()],
        model: "CNRM_ESM2_1",
      },
    },
    select: {
      temp_max_rows: true,
    },
  });

  const mapData = await prisma.mapData.findUnique({
    where: {
      ssp_model: {
        ssp: SSP[ssp.toString()],
        model: "CNRM_ESM2_1",
      },
    },
    select: {
      temp_max_map_rows: true,
    },
  });

  const processedData = results.temp_max_rows.map((dataPoint) => {
    return {
      date: dataPoint.year.getUTCFullYear(),
      temp:
        Math.round(
          (dataPoint.tasmax - KELVIN_CELSIUS_DIFF + Number.EPSILON) * 10000
        ) / 10000,
    };
  });

  const regression = new SimpleLinearRegression(
    processedData.map((dp) => dp.date),
    processedData.map((dp) => dp.temp)
  );

  res.json({
    line: processedData.map((dp) => {
      return {
        ...dp,
        linear_regression: regression.predict(dp.date),
      };
    }),
    mapData: mapData.temp_max_map_rows,
  });
};

export default handler;
