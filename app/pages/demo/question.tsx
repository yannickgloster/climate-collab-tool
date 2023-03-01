import Layout from "../../components/layout";
import { question } from "../../utils/types/question";
import { userState } from "../../utils/game";
import { Answer } from "@prisma/client";
import Question from "../../components/question";
import { useEffect, useState } from "react";
import Loading from "../../components/loading";
import LoadingError from "../../components/loadingError";
import Typography from "@mui/material/Typography";
import { Region } from "@prisma/client";
import { RegionDetails } from "../../utils/details";
import { qFactor } from "../../utils/constants";

export default function QuestionTest({ user, setUser }: userState) {
  const [questions, setQuestions] = useState<question[]>();
  const [isLoading, setLoading] = useState(true);
  const [questionIndex, setQuestionIndex] = useState(0);

  const answerCallback = (answer: Answer, index: number) => {
    const question = questions[questionIndex];
    setUser({
      ...user,
      points: user.points - answer.cost,
      emission:
        user.emission -
        qFactor * question.regionWeights[0].weight * answer.weight,
    });
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      alert("(not) Alerting server of completion");
    }
  };

  useEffect(() => {
    const region = Region.EU;
    setLoading(true);
    setUser({
      userId: "TEST",
      points: 100,
      gameCode: "TEST",
      region: region,
      emission: RegionDetails[region].emissionUnits,
    });
    fetch(`/api/questions/${region}`)
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data.questions);
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
