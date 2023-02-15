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
  RegionsToPrisma,
} from "../utils/types/game";
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

  const answerCallback = (answer: answer, index: number) => {
    const question = questions[questionIndex];
    const newUser = {
      ...user,
      power: user.power - answer.cost,
      // TODO: add question importance
      emission:
        user.emission - question.regionWeights[0].weight * answer.weight,
    };
    setUser(newUser);
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
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
    fetch(`/api/questions/${RegionsToPrisma[user.region]}`)
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data.questions);
        setLoading(false);
      })
      .catch((_error) => {
        // TODO: add snackbar error
        setLoading(false);
        console.log(_error);
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
        img={questions[questionIndex].imgUrl}
      >
        <Typography variant="h6">Power: {user.power}</Typography>
        <Question
          question={questions[questionIndex]}
          answerCallback={(answer) => answerCallback(answer, questionIndex)}
        />
      </Layout>
    </>
  );
}
