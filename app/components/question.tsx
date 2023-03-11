import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { questionProps } from "../utils/types/question";
import AnnotatedTypography from "./annotatedTypography";
import { QuestionTopicDetails } from "../utils/details";
import { Trans } from "@lingui/macro";

export default function Question(props: questionProps) {
  return (
    <>
      <Typography variant="h3" textAlign="center">
        {QuestionTopicDetails[props.question.topic].name}
      </Typography>
      <Typography variant="h4" textAlign="center">
        <AnnotatedTypography text={props.question.text} />
      </Typography>
      {props.question.answers.map((answer, i) => {
        return (
          <Button
            fullWidth
            key={i}
            variant="outlined"
            size="large"
            sx={{
              mt: 2,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
            onClick={() => props.answerCallback(answer)}
          >
            <Typography variant="inherit">
              <AnnotatedTypography text={answer.text} />
            </Typography>
            <Typography variant="inherit">
              <Trans>Cost</Trans>: {answer.cost}
            </Typography>
          </Button>
        );
      })}
    </>
  );
}
