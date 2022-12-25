import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Image from "next/image";

export interface QuestionProps {
  question: {
    text: string;
    img: string;
    answers: Answer[];
  };
  answerCallback: (answer: Answer) => void;
}

export interface Answer {
  text: string;
  cost: number;
}

export default function Question(props: QuestionProps) {
  return (
    <Paper>
      <Image
        src={props.question.img}
        alt="Question Image"
        width={500}
        height={500}
      />
      <Typography variant="h4" textAlign="center">
        {props.question.text}
      </Typography>
      {props.question.answers.map((answer, i) => {
        return (
          <Box key={i} onClick={() => props.answerCallback(answer)}>
            <Typography variant="body1" textAlign="center">
              {answer.text}
            </Typography>
          </Box>
        );
      })}
    </Paper>
  );
}
