import Layout from "../../components/layout";
import { question } from "../../utils/types/question";
import { regeneratePoints, userState } from "../../utils/game";
import { Answer } from "@prisma/client";
import Question from "../../components/question";
import { useEffect, useState } from "react";
import Loading from "../../components/loading";
import LoadingError from "../../components/loadingError";
import Typography from "@mui/material/Typography";
import { Region } from "@prisma/client";
import { RegionDetails } from "../../utils/details";
import { qFactor } from "../../utils/constants";
import { snackbarProps } from "../_app";

import { loadTranslation } from "../../utils/translation";
import { GetStaticProps } from "next/types";

export const getStaticProps: GetStaticProps = async (ctx) => {
  const translation = await loadTranslation(
    ctx.locale!,
    process.env.NODE_ENV === "production"
  );

  return {
    props: {
      translation,
    },
  };
};

export default function QuestionTest({
  user,
  setUser,
  snackbar,
  setSnackbar,
}: userState & snackbarProps) {
  const [questions, setQuestions] = useState<question[]>();
  const [images, setImages] = useState<string[]>();
  const [isLoading, setLoading] = useState(true);
  const [questionIndex, setQuestionIndex] = useState(0);

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
        alert("(not) Alerting server of completion");
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
    const region = Region.EU;
    setLoading(true);
    setUser({
      userId: "TEST",
      points: 20,
      gameCode: "TEST",
      region: region,
      emission: RegionDetails[region].emissionUnits,
    });
    fetch(`/api/questions/${region}`)
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data.questions);
        const imgs = data.questions.map((question) => question.imgUrl);
        setImages(imgs);
        setLoading(false);
      })
      .catch((_error) => {
        setLoading(false);
      });
  }, []);

  if (isLoading) return <Loading />;
  if (!questions) return <LoadingError href="/demo/question" />;

  return (
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
      <Typography variant="h6">Points Remaining: {user.points}</Typography>
      {questionIndex < questions.length - 1 ? (
        <Question
          question={questions[questionIndex]}
          answerCallback={(answer) => answerCallback(answer, questionIndex)}
        />
      ) : (
        <Typography variant="h6">
          Thank you for answering all the questions!
        </Typography>
      )}
      <Typography variant="h6">DEBUG Emission: {user.emission}</Typography>
    </Layout>
  );
}
