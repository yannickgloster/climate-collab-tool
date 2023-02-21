import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { questionProps } from "../utils/types/question";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import AnnotatedTypography from "./annotatedTypography";

export default function Question(props: questionProps) {
  return (
    <>
      <Typography variant="h3" textAlign="center">
        {props.question.topic}
      </Typography>
      <Typography variant="h4" textAlign="center">
        <AnnotatedTypography text={props.question.text} />
      </Typography>
      {props.question.answers.map((answer, i) => {
        return (
          <>
            <Button
              fullWidth
              variant="outlined"
              size="large"
              key={i}
              onClick={() => props.answerCallback(answer)}
              sx={{ mt: 2 }}
            >
              <Stack
                direction="row"
                spacing={2}
                divider={<Divider orientation="vertical" flexItem />}
              >
                <Typography variant="overline">
                  <AnnotatedTypography text={answer.text} />
                </Typography>
                <Typography variant="overline">Cost: {answer.cost}</Typography>
              </Stack>
            </Button>
          </>
        );
      })}
    </>
  );
}
