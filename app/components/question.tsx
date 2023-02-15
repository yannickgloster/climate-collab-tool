import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Image from "next/image";
import { questionProps } from "../utils/types/game";

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
