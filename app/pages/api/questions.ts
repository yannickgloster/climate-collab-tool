import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../utils/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let questions = await prisma.question.findMany({
    include: { answers: true, regionWeights: true },
  });
  res.json({ questions: questions.sort((a, b) => a.id - b.id) });
};

export default handler;
