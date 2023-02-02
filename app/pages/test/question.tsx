import Layout from "../../components/layout";
import { Regions, userState } from "../../utils/types/game";
import { sampleQuestions } from "../../data/questions";
import Question from "../../components/question";

export default function QuestionTest({ user, setUser }: userState) {
  return (
    <Layout gameCode={"TEST"} region={Regions.EU} img={sampleQuestions[0].img}>
      <Question
        question={sampleQuestions[0]}
        answerCallback={(answer) => console.log(answer)}
      />
    </Layout>
  );
}
