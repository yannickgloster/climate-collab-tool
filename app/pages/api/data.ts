import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import { parse } from "csv";
import SimpleLinearRegression from "ml-regression-simple-linear";

// TODO: Move convertion to C from K somewhere else
const KELVIN_CELSIUS_DIFF = 273.15;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { ssp, region } = req.query;
  // FIXME: Temporary data serving from CSV. Switch to Database
  // npm uninstall csv
  const data = [];
  const regression_x = [];
  const regression_y = [];

  await new Promise((resolve) => {
    fs.createReadStream(
      `../data-preprocessing/data/ssp${ssp}_tasmax_${region}.csv`
    )
      .pipe(parse({ delimiter: ",", from_line: 2 }))
      .on("data", (row) => {
        const date = Date.parse(row[0]);
        // Round to 0.0000
        const temp =
          Math.round(
            (Number.parseFloat(row[1]) - KELVIN_CELSIUS_DIFF + Number.EPSILON) *
              10000
          ) / 10000;
        data.push({
          date: date,
          temp: temp,
        });

        regression_x.push(date);
        regression_y.push(temp);
      })
      .on("end", () => {
        resolve([data, regression_x, regression_y]);
      });
  });

  const regression = new SimpleLinearRegression(regression_x, regression_y);

  const line_with_regression = data.map((data_point) => {
    return {
      ...data_point,
      linear_regression: regression.predict(data_point.date),
    };
  });

  res.json({ line: line_with_regression });
};

export default handler;
