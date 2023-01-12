import type { AppProps } from "next/app";
import Head from "next/head";

import { Game, user as userType } from "../utils/types/game";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { socketEvent } from "../utils/socketHandler";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import type { Dispatch, SetStateAction } from "react";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

export let socket: Socket;

interface snackbarType {
  text: string;
  enabled: boolean;
  severity: AlertProps["severity"];
}

export interface snackbarProps {
  snackbar: snackbarType;
  setSnackbar: Dispatch<SetStateAction<snackbarType>>;
}

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<userType>({ userId: uuidv4() });
  const [game, setGame] = useState<Game>();
  const [snackbar, setSnackbar] = useState<snackbarType>({
    text: "",
    enabled: false,
    severity: "error",
  });

  useEffect(() => {
    fetch("/api/socket").finally(() => {
      socket = io();

      socket.on(socketEvent.connect, () => {
        console.log("connected");
      });

      socket.on(socketEvent.connected_user, (message) => {
        console.log(message);
      });

      socket.on(socketEvent.room_broadcast, (message) => {
        console.log(message);
      });

      socket.on(socketEvent.disconnect, () => {
        console.log("disconnect");
      });

      socket.on(socketEvent.joined_room, (game) => {
        // HACK: Instead of getting back the class, we only actually get an object with no functions so we need to create a new one
        setGame(new Game(game._gameCode, game._users, game._availableRegions));
      });
    });
  }, []);

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbar({ ...snackbar, enabled: false });
  };

  return (
    <>
      <Head>
        <title>Thesis</title>
        <meta name="description" content="TODO: Write Description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component
        {...pageProps}
        user={user}
        setUser={setUser}
        game={game}
        setGame={setGame}
        snackbar={snackbar}
        setSnackbar={setSnackbar}
      />
      <Snackbar
        open={snackbar.enabled}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <MuiAlert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.text}
        </MuiAlert>
      </Snackbar>
    </>
  );
}
