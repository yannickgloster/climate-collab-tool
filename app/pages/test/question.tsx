import Layout from "../../components/layout";
import {
  Regions,
  userState,
  question,
  answer,
  EmisionUnits,
  RegionsToPrisma,
} from "../../utils/types/game";
import Question from "../../components/question";
import { useEffect, useState } from "react";
import Loading from "../../components/loading";
import LoadingError from "../../components/loadingError";
import Typography from "@mui/material/Typography";

export default function QuestionTest({ user, setUser }: userState) {
  const [questions, setQuestions] = useState<question[]>();
  const [isLoading, setLoading] = useState(true);
  const [questionIndex, setQuestionIndex] = useState(0);

  const answerCallback = (answer: answer, index: number) => {
    const question = questions[questionIndex];
    setUser({
      ...user,
      power: user.power - answer.cost,
      // TODO: add question importance
      emission:
        user.emission - question.regionWeights[0].weight * answer.weight,
    });
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      alert("(not) Alerting server of completion");
    }
  };

  useEffect(() => {
    setLoading(true);
    setUser({
      userId: "TEST",
      power: 100,
      gameCode: "TEST",
      region: Regions.EU,
      emission: EmisionUnits[Regions.EU],
    });
    fetch(`/api/questions/${RegionsToPrisma[Regions.EU]}`)
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
  if (!questions) return <LoadingError href="/test/question" />;

  return (
    <Layout
      gameCode={user.gameCode}
      region={user.region}
      img={questions[questionIndex].imgUrl}
    >
      <Typography variant="h6">Emission: {user.emission}</Typography>
      <Typography variant="h6">Power: {user.power}</Typography>
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
    </Layout>
  );
}
