import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Layout from "../components/layout";
import Question from "../components/question";
import LoopIcon from "@mui/icons-material/Loop";
import { motion } from "framer-motion";

import { snackbarProps, socket } from "./_app";
import { socketEvent } from "../utils/socketServerHandler";
import { answer, userState, gameState, GameStatus } from "../utils/types/game";

import { sampleQuestions } from "../data/questions";

export default function Questions({
  user,
  setUser,
  game,
  setGame,
  snackbar,
  setSnackbar,
}: userState & gameState & snackbarProps) {
  const router = useRouter();

  const [questionIndex, setQuestionIndex] = useState(0);

  const answerCallback = (answer: answer, index: number) => {
    // TODO: Store answer
    console.log(answer);
    // TODO: Switch this to real questions
    if (questionIndex < sampleQuestions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      socket.emit(socketEvent.completed_questions, user, user.gameCode);
    }
  };

  return (
    <Layout>
      <Question
        question={sampleQuestions[questionIndex]}
        answerCallback={(answer) => answerCallback(answer, questionIndex)}
      />
    </Layout>
  );
}
