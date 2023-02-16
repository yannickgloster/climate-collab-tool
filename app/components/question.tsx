import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { questionProps } from "../utils/types/question";

export default function Question(props: questionProps) {
  return (
    <>
      <Typography variant="h3" textAlign="center">
        {props.question.topic}
      </Typography>
      <Typography variant="h4" textAlign="center">
        {props.question.text}
      </Typography>
      {props.question.answers.map((answer, i) => {
        return (
          <Button
            fullWidth
            variant="contained"
            size="large"
            key={i}
            onClick={() => props.answerCallback(answer)}
            sx={{ mt: 2 }}
          >
            <Typography variant="body1" textAlign="center">
              {answer.text} - {answer.cost}
            </Typography>
          </Button>
        );
      })}
    </>
  );
}
