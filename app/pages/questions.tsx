import { useState, useEffect } from "react";
import Head from "next/head";

import Layout from "../components/layout";
import Question from "../components/question";

import { snackbarProps, socket } from "./_app";
import { socketEvent } from "../utils/socketServerHandler";
import { question } from "../utils/types/question";
import { Answer } from "@prisma/client";
import { userState, gameState } from "../utils/game";
import Loading from "../components/loading";
import LoadingError from "../components/loadingError";
import Typography from "@mui/material/Typography";

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
    const newUser = {
      ...user,
      power: user.power - answer.cost,
      // TODO: add question importance
      emission:
        user.emission - question.regionWeights[0].weight * answer.weight,
    };
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
        img={questions[questionIndex]?.imgUrl}
      >
        <Typography variant="h6">Power: {user.power}</Typography>
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
