import Head from "next/head";
import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

import styles from "../styles/Home.module.css";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { gameCodeLength } from "../utils/constants";

let socket: Socket;

export default function Home() {
  const [gameCode, setGameCode] = useState("");

  useEffect(() => {
    fetch("/api/socket").finally(() => {
      socket = io();

      socket.on("connect", () => {
        console.log("connected");
      });

      socket.on("CONNECTED_USER", (message) => {
        console.log(message);
      });

      socket.on("ROOM_BROADCAST", (message) => {
        console.log(message);
      });

      socket.on("disconnect", () => {
        console.log("disconnect");
      });
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length <= gameCodeLength) {
      setGameCode(event.target.value);
    }
  };

  // TODO: Think about moving this into a sperate function
  const generateGameCode = () => {
    const generateGameCode = Math.random()
      .toString(16)
      .substring(2, 2 + gameCodeLength);

    console.log(generateGameCode);

    // TODO: Check if code exists. If it does, generate a new code.

    socket.emit("CREATE_ROOM", generateGameCode);
  };

  const joinRoom = () => {
    socket.emit("JOIN_ROOM", gameCode);
  };

  const testRoom = () => {
    socket.emit("TEST_ROOM", gameCode, "TEST MESSAGE WOOO");
  };

  return (
    <>
      <Head>
        <title>Thesis</title>
        <meta name="description" content="TODO: Write Description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container maxWidth="lg">
          <Typography variant="h3">IPCC Microworld</Typography>
          <Button variant="contained" onClick={generateGameCode}>
            New Game
          </Button>
          <TextField
            placeholder="FH6DA"
            inputProps={{ style: { textTransform: "uppercase" } }}
            onChange={handleChange}
            value={gameCode}
          />
          <Button variant="contained" onClick={joinRoom}>
            Join Game
          </Button>
          <Button variant="contained" onClick={testRoom}>
            Test Room
          </Button>
        </Container>
      </main>
    </>
  );
}
