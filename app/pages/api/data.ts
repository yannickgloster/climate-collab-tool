import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../utils/prisma";
import { SSP, Region } from "@prisma/client";
import SimpleLinearRegression from "ml-regression-simple-linear";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { ssp, region } = req.query;
  const model = "CNRM_ESM2_1";

  const results = await prisma.data.findUnique({
    where: {
      ssp_model_region: {
        ssp: SSP[ssp.toString()],
        region: Region[region.toString()],
        model: model,
      },
    },
    select: {
      temp_max_rows: true,
      temp_rows: true,
    },
  });

  const mapData = await prisma.mapData.findUnique({
    where: {
      ssp_model: {
        ssp: SSP[ssp.toString()],
        model: model,
      },
    },
    select: {
      temp_max_map_rows: true,
      temp_map_rows: true,
    },
  });

  const processedMaxTempData = results.temp_max_rows.map((dataPoint) => {
    return {
      date: dataPoint.year.getUTCFullYear(),
      temp: dataPoint.tasmax,
    };
  });

  const processedTempData = results.temp_rows.map((dataPoint) => {
    return {
      date: dataPoint.year.getUTCFullYear(),
      temp: dataPoint.tas,
    };
  });

  const regressionMaxTemp = new SimpleLinearRegression(
    processedMaxTempData.map((dp) => dp.date),
    processedMaxTempData.map((dp) => dp.temp)
  );

  const regressionTemp = new SimpleLinearRegression(
    processedTempData.map((dp) => dp.date),
    processedTempData.map((dp) => dp.temp)
  );

  res.json({
    line: {
      temp_max: processedMaxTempData.map((dp) => {
        return {
          ...dp,
          linear_regression: regressionMaxTemp.predict(dp.date),
        };
      }),
      temp: processedTempData.map((dp) => {
        return {
          ...dp,
          linear_regression: regressionTemp.predict(dp.date),
        };
      }),
    },
    mapData: {
      temp_max_map_rows: mapData.temp_max_map_rows,
      temp_map_rows: mapData.temp_map_rows,
    },
  });
};

export default handler;
