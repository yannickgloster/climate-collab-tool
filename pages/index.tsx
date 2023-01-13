import { useRouter } from "next/router";
import { useState } from "react";

import Layout from "../components/layout";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

import { socket, snackbarProps } from "./_app";
import { socketEvent } from "../utils/socketServerHandler";
import { userState } from "../utils/types/game";
import { gameCodeLength } from "../utils/constants";

import styles from "../styles/Home.module.css";

export default function Home({
  user,
  setUser,
  snackbar,
  setSnackbar,
}: userState & snackbarProps) {
  const [gameCode, setGameCode] = useState("");
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length <= gameCodeLength) {
      setGameCode(event.target.value);
    }
  };

  const generateGameCode = () => {
    const generateGameCode = Math.random()
      .toString(16)
      .substring(2, 2 + gameCodeLength);

    const newUser = { ...user, gameCode: generateGameCode };

    socket.emit(socketEvent.create_room, newUser, generateGameCode);
    setUser(newUser);
  };

  const joinRoom = () => {
    const newUser = { ...user, gameCode: gameCode };
    socket.emit(socketEvent.join_room, newUser, gameCode);
    setUser(newUser);
  };

  return (
    <Layout>
      <Stack spacing={2}>
        <Typography variant="h3" textAlign="center">
          IPCC Microworld
        </Typography>
        <Typography variant="subtitle1" textAlign="center">
          This is the description.
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={generateGameCode}
          data-cy="newGameButton"
        >
          New Game
        </Button>
        <TextField
          id="gameCodeTextField"
          placeholder={"fh6sd93da0dm28s".substring(0, gameCodeLength)}
          inputProps={{ style: { textTransform: "uppercase" } }}
          onChange={handleChange}
          value={gameCode}
        />
        <Button
          variant="contained"
          size="large"
          onClick={joinRoom}
          data-cy="joinGameButton"
        >
          Join Game
        </Button>
      </Stack>
    </Layout>
  );
}
