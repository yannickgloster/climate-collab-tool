import { useState, useEffect } from "react";
import Head from "next/head";

import Layout from "../components/layout";
import Question from "../components/question";

import { snackbarProps, socket } from "./_app";
import { socketEvent } from "../utils/socketServerHandler";
import { question } from "../utils/types/question";
import { Answer } from "@prisma/client";
import { userState, gameState, regeneratePoints } from "../utils/game";
import Loading from "../components/loading";
import LoadingError from "../components/loadingError";
import Typography from "@mui/material/Typography";
import { qFactor } from "../utils/constants";

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

  const answerCallback = (answer: Answer, index: number) => {
    const question = questions[questionIndex];
    const extraPoints = regeneratePoints(questionIndex, questions.length);
    const newUser = {
      ...user,
      points: user.points - answer.cost + extraPoints,
      emission:
        user.emission -
        qFactor * question.regionWeights[0].weight * answer.weight,
    };

    if (extraPoints > 0) {
      setSnackbar({
        text: `You've been given ${extraPoints} extra points to spend!`,
        enabled: true,
        severity: "success",
      });
    }

    if (user.points - answer.cost > 0) {
      setUser(newUser);
      setQuestionIndex(questionIndex + 1);
      if (questionIndex == questions.length - 1) {
        socket.emit(
          socketEvent.completed_questions,
          user,
          user.gameCode,
          newUser.emission
        );
      }
    } else {
      setSnackbar({
        text: "You cannot afford this option",
        enabled: true,
        severity: "error",
      });
    }
  };

  useEffect(() => {
    setLoading(true);
    fetch(`/api/questions/${user.region}`)
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data.questions);
        setLoading(false);
      })
      .catch((_error) => {
        setLoading(false);
        setSnackbar({
          text: "Could not load questions.",
          enabled: true,
          severity: "error",
        });
      });
  }, []);

  if (isLoading) return <Loading />;
  if (!questions) return <LoadingError href="/questions" />;

  return (
    <>
      <Head>
        <title>Answer Questions</title>
      </Head>
      <Layout
        gameCode={user.gameCode}
        region={user.region}
        img={
          questions[questionIndex]?.imgUrl.length > 0
            ? questions[questionIndex].imgUrl
            : undefined
        }
      >
        <Typography variant="h6">Points Remaining: {user.points}</Typography>
        {questionIndex < questions.length ? (
          <Question
            question={questions[questionIndex]}
            answerCallback={(answer) => answerCallback(answer, questionIndex)}
          />
        ) : (
          <Typography variant="h6">
            Thank you for answering all the questions!
          </Typography>
        )}
      </Layout>
    </>
  );
}
