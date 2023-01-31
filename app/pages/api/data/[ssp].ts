import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import { parse } from "csv";

// TODO: Move convertion to C from K somewhere else
const KELVIN_CELSIUS_DIFF = 273.15;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { ssp } = req.query;
  // FIXME: Temporary data serving from CSV. Switch to Database
  // npm uninstall csv
  const data = [];

  await new Promise((resolve) => {
    fs.createReadStream(`../data-preprocessing/data/ssp${ssp}_tasmax_EU.csv`)
      .pipe(parse({ delimiter: ",", from_line: 2 }))
      .on("data", (row) => {
        data.push({
          date: Date.parse(row[0]),
          temp:
            // Round to 0.0000
            Math.round(
              (Number.parseFloat(row[1]) -
                KELVIN_CELSIUS_DIFF +
                Number.EPSILON) *
                10000
            ) / 10000,
        });
      })
      .on("end", () => {
        resolve(data);
      });
  });
  res.json({ line: data });
};

export default handler;
