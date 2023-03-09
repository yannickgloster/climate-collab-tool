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
    },
  });

  const processedData = results.temp_max_rows.map((dataPoint) => {
    return {
      date: dataPoint.year.getUTCFullYear(),
      temp: dataPoint.tasmax,
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
