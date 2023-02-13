import { useState, useEffect } from "react";
import Head from "next/head";

import Layout from "../components/layout";
import Question from "../components/question";

import { snackbarProps, socket } from "./_app";
import { socketEvent } from "../utils/socketServerHandler";
import {
  question,
  answer,
  userState,
  gameState,
  GameStatus,
} from "../utils/types/game";

export default function Questions({
  user,
  setUser,
  game,
  setGame,
  snackbar,
  setSnackbar,
}: userState & gameState & snackbarProps) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<question[]>();
  const [isLoading, setLoading] = useState(true);

  const answerCallback = (answer: answer, index: number) => {
    // TODO: Store answer
    console.log(answer);
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      socket.emit(socketEvent.completed_questions, user, user.gameCode);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetch("/api/questions")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data.question);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!questions) return <p>No data</p>;

  return (
    <>
      <Head>
        <title>Answer Questions</title>
      </Head>
      <Layout
        gameCode={user.gameCode}
        region={user.region}
        img={questions[questionIndex].imgUrl}
      >
        <Question
          question={questions[questionIndex]}
          answerCallback={(answer) => answerCallback(answer, questionIndex)}
        />
      </Layout>
    </>
  );
}
