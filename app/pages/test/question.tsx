import Layout from "../../components/layout";
import { Regions, userState, question, answer } from "../../utils/types/game";
import Question from "../../components/question";
import { useEffect, useState } from "react";
import Loading from "../../components/loading";
import LoadingError from "../../components/loadingError";

export default function QuestionTest({ user, setUser }: userState) {
  const [questions, setQuestions] = useState<question[]>();
  const [isLoading, setLoading] = useState(true);
  const [questionIndex, setQuestionIndex] = useState(0);

  const answerCallback = (answer: answer, index: number) => {
    // TODO: Store answer
    console.log(answer);
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      alert("DONE");
    }
  };

  useEffect(() => {
    setLoading(true);
    fetch("/api/questions")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data.questions);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <Loading />;
  if (!questions) return <LoadingError href="/test/question" />;

  return (
    <Layout
      gameCode={"TEST"}
      region={Regions.EU}
      img={questions[questionIndex]?.imgUrl}
    >
      <Question
        question={questions[questionIndex]}
        answerCallback={(answer) => answerCallback(answer, questionIndex)}
      />
    </Layout>
  );
}
