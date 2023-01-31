import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import { parse } from "csv";
import { pipeline } from "stream/promises";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { ssp } = req.query;
  // FIXME: Temporary data serving from CSV. Switch to Database
  // npm uninstall csv
  const data = [];
  // FIXME: Creates stalled request
  await new Promise((resolve) => {
    fs.createReadStream(`../data-preprocessing/data/ssp_${ssp}_tasmax_EU.csv`)
      .pipe(parse({ delimiter: ",", from_line: 2 }))
      .on("data", function (row) {
        data.push({ date: Date.parse(row[0]), temp: row[1] });
      })
      .on("end", function () {
        resolve(data);
      });
  });
  res.json({ line: data });
};

export default handler;
