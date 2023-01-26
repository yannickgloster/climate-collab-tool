import Layout from "../components/layout";
import Question from "../components/question";
import { answer, question, userState } from "../utils/types/game";

const questionData: question = {
  title: "Test",
  text: "Where where you born?",
  img: "/images/questionTest.jpg",
  answers: [
    {
      text: "Santa Barbara?",
      cost: 10,
    },
    {
      text: "Dublin?",
      cost: 0,
    },
  ],
};

export default function QuestionTest({ user, setUser }: userState) {
  const answerCallback = (answer: answer) => {
    console.log(answer);
  };

  return (
    <Layout>
      <Question question={questionData} answerCallback={answerCallback} />
    </Layout>
  );
}
