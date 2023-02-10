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

    await prisma.question.create({
      data: {
        id: row[0],
        imgUrl: row[1],
        topic: topic,
        text: row[3],
      },
    });

    await prisma.regionWeight.createMany({
      data: [
        {
          region: Region.China,
          questionId: row[0],
          weight: row[4],
        },
        {
          region: Region.US,
          questionId: row[0],
          weight: row[5],
        },
        {
          region: Region.India,
          questionId: row[0],
          weight: row[6],
        },
        {
          region: Region.EU,
          questionId: row[0],
          weight: row[7],
        },
        {
          region: Region.SA,
          questionId: row[0],
          weight: row[8],
        },
        {
          region: Region.Island,
          questionId: row[0],
          weight: row[9],
        },
      ],
    });

    // Assuming all questions have 3 answers
    await prisma.answer.createMany({
      data: [
        {
          text: row[10],
          weight: row[11],
          cost: row[12],
          questionId: row[0],
        },
        {
          text: row[13],
          weight: row[14],
          cost: row[15],
          questionId: row[0],
        },
        {
          text: row[16],
          weight: row[17],
          cost: row[18],
          questionId: row[0],
        },
      ],
    });

    if (row[19] !== "") {
      await prisma.answer.create({
        data: {
          text: row[19],
          weight: row[20],
          cost: row[21],
          questionId: row[0],
        },
      });
    }
  });

  res.json({ stauts: "Completed" });
};

export default handler;
