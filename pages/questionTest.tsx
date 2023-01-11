import Layout from "../components/layout";
import Question, { Answer } from "../components/question";
import { userState } from "../utils/types/game";

const questionData = {
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
  const answerCallback = (answer: Answer) => {
    console.log(answer);
  };

  return (
    <Layout>
      <Question question={questionData} answerCallback={answerCallback} />
    </Layout>
  );
}
