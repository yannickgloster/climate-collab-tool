import { Question, Answer, RegionWeight } from "@prisma/client";

export interface questionProps {
  question: question;
  answerCallback: (answer: Answer) => void;
}

// TODO: is there a way to get this directly from Prisma
export interface question extends Question {
  answers: Answer[];
  regionWeights: RegionWeight[];
}
