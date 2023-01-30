import { question } from "../utils/types/game";

export const sampleQuestions: question[] = [
  {
    title: "Land use change",
    text: "You must set aside an area of protected forest in your country, do you:",
    img: "/images/questionTest.jpg",
    answers: [
      {
        text: "Restore areas of historical forest",
        cost: 1,
      },
      {
        text: "Protect a portion of existing forest",
        cost: 1,
      },
      {
        text: "Reduce current forest logging/harvesting",
        cost: 1,
      },
      {
        text: "Do nothing",
        cost: 1,
      },
    ],
  },
  {
    title: "Energy production",
    text: "Emissions from energy used by industry are a large component of the global carbon budget. Do you:",
    img: "/images/questionTest.jpg",
    answers: [
      {
        text: "Switch energy supply to renewable energy",
        cost: 1,
      },
      {
        text: "Reduce industry output",
        cost: 1,
      },
      {
        text: "Move your industry to a different country",
        cost: 1,
      },
      {
        text: "Do nothing - your industry is too important for your economy",
        cost: 1,
      },
    ],
  },
];
