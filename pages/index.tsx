import Head from "next/head";
import { useEffect, useState } from "react";

import styles from "../styles/Home.module.css";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { gameCodeLength } from "../utils/constants";
import Layout from "../components/layout";
import { userState } from "../utils/types/game";
import { socketEvent } from "../utils/socketHandler";
import Link from "next/link";
import { useRouter } from "next/router";

import { socket } from "./_app";

export default function Home({ user, setUser }: userState) {
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

    // TODO: Check if code exists. If it does, generate a new code.

    socket.emit(socketEvent.create_room, user, generateGameCode);

    setUser({ ...user, gameCode: generateGameCode });
    router.push("/regionSelect");
  };

  const joinRoom = () => {
    socket.emit(socketEvent.join_room, user, gameCode);
  };

  const testRoom = () => {
    socket.emit(socketEvent.test_room, user, gameCode, "TEST MESSAGE WOOO");
  };

  return (
    <>
      <Head>
        <title>Thesis</title>
        <meta name="description" content="TODO: Write Description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
          <Button
            variant="contained"
            size="large"
            onClick={testRoom}
            data-cy="testRoomButton"
          >
            Test Room
          </Button>
        </Stack>
      </Layout>
    </>
  );
}
