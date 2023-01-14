import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Image from "next/image";
import { questionProps } from "../utils/types/game";

export default function Question(props: questionProps) {
  return (
    <Paper>
      <Image
        src={props.question.img}
        alt="Question Image"
        width={500}
        height={500}
      />
      <Typography variant="h3" textAlign="center">
        {props.question.title}
      </Typography>
      <Typography variant="h4" textAlign="center">
        {props.question.text}
      </Typography>
      {props.question.answers.map((answer, i) => {
        return (
          <Box key={i} onClick={() => props.answerCallback(answer)}>
            <Typography variant="body1" textAlign="center">
              {answer.text} - {answer.cost}
            </Typography>
          </Box>
        );
      })}
    </Paper>
  );
}
