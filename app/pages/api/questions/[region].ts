import { Region } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../utils/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { region } = req.query;
  const questions = await prisma.question.findMany({
    include: {
      answers: true,
      regionWeights: { where: { region: Region[region.toString()] } },
    },
  });
  res.json({ questions: questions.sort((a, b) => a.id - b.id) });
};

export default handler;
