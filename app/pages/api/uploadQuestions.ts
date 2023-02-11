import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import { parse } from "csv";

import prisma from "../../utils/prisma";

import { QuestionTopic, Region } from "@prisma/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let questions = [];

  await new Promise((resolve) => {
    fs.createReadStream(`../data-preprocessing/data/questions.csv`)
      .pipe(parse({ delimiter: ",", from_line: 2 }))
      .on("data", (row) => {
        questions.push(row);
      })
      .on("end", () => {
        resolve([questions]);
      });
  });

  // TODO: look into create many
  questions.forEach(async (row) => {
    let topic: QuestionTopic;
    if (row[2] === "Land Use Change") {
      topic = QuestionTopic.LandUseChange;
    } else if (row[2] === "Energy Production") {
      topic = QuestionTopic.EnergyProduction;
    }

    const id = Number(row[0]);

    await prisma.question.create({
      data: {
        id: id,
        imgUrl: row[1],
        topic: topic,
        text: row[3],
      },
    });

    await prisma.regionWeight.createMany({
      data: [
        {
          region: Region.China,
          questionId: id,
          weight: Number(row[4]),
        },
        {
          region: Region.US,
          questionId: id,
          weight: Number(row[5]),
        },
        {
          region: Region.India,
          questionId: id,
          weight: Number(row[6]),
        },
        {
          region: Region.EU,
          questionId: id,
          weight: Number(row[7]),
        },
        {
          region: Region.SA,
          questionId: id,
          weight: Number(row[8]),
        },
        {
          region: Region.Island,
          questionId: id,
          weight: Number(row[9]),
        },
      ],
    });

    // Assuming all questions have 3 answers
    await prisma.answer.createMany({
      data: [
        {
          text: row[10],
          weight: Number(row[11]),
          cost: Number(row[12]),
          questionId: id,
        },
        {
          text: row[13],
          weight: Number(row[14]),
          cost: Number(row[15]),
          questionId: id,
        },
        {
          text: row[16],
          weight: Number(row[17]),
          cost: Number(row[18]),
          questionId: id,
        },
      ],
    });

    if (row[19] !== "") {
      await prisma.answer.create({
        data: {
          text: row[19],
          weight: Number(row[20]),
          cost: Number(row[21]),
          questionId: id,
        },
      });
    }
  });

  res.json({ stauts: "Completed" });
};

export default handler;
