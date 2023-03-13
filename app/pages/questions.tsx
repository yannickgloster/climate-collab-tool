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
import { Trans, t, plural } from "@lingui/macro";
import { Button } from "@mui/material";
import router from "next/router";

export default function Questions({
  user,
  setUser,
  game,
  setGame,
  snackbar,
  setSnackbar,
}: userState & gameState & snackbarProps) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [images, setImages] = useState<string[]>();
  const [questions, setQuestions] = useState<question[]>();
  const [isLoading, setLoading] = useState(true);

  const answerCallback = (answer: Answer, index: number) => {
    const question = questions[questionIndex];
    const extraPoints = regeneratePoints(questionIndex, questions.length);
    const regionWeight = question.regionWeights.filter(
      (rw) => rw.region == user.region
    )[0];
    const newUser = {
      ...user,
      points: user.points - answer.cost + extraPoints,
      emission: user.emission - qFactor * regionWeight.weight * answer.weight,
    };

    if (extraPoints > 0) {
      setSnackbar({
        text: plural(extraPoints, {
          one: "You've been given an extra point to spend!",
          other: "You've been given # extra points to spend!",
        }),
        enabled: true,
        severity: "success",
      });
    }

    if (user.points - answer.cost >= 0) {
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
        text: t`You cannot afford this option`,
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
        const imgs = data.questions.map((question) => question.imgUrl);
        setImages(imgs);
        setLoading(false);
      })
      .catch((_error) => {
        setLoading(false);
        setSnackbar({
          text: t`Could not load questions.`,
          enabled: true,
          severity: "error",
        });
      });
  }, []);

  useEffect(() => {
    if (router.asPath === "/questions") {
      window.onpopstate = () => {
        history.go(1);
      };
    }
  }, [router]);

  if (isLoading) return <Loading />;
  if (!questions) return <LoadingError href="/questions" />;

  return (
    <>
      <Head>
        <title>
          <Trans>Answer Questions</Trans>
        </title>
      </Head>
      <Layout
        gameCode={user.gameCode}
        region={user.region}
        img={
          questions[questionIndex]?.imgUrl.length > 0
            ? questions[questionIndex].imgUrl
            : undefined
        }
        imgs={images}
        progress={((questionIndex + 1) * 100) / questions.length}
      >
        <Typography variant="h6">
          {plural(user.points, {
            one: "# Point Remaining To Spend",
            other: "# Points Remaining To Spend",
          })}
        </Typography>
        {/* TODO: Localize questions */}
        {questionIndex < questions.length ? (
          <Question
            question={questions[questionIndex]}
            answerCallback={(answer) => answerCallback(answer, questionIndex)}
          />
        ) : (
          <Typography variant="h6">
            <Trans>Thank you for answering all the questions!</Trans>
          </Typography>
        )}
      </Layout>
    </>
  );
}
