import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import type { Dispatch, SetStateAction } from "react";

import io, { Socket } from "socket.io-client";
import { socketEvent } from "../utils/socketServerHandler";
import { v4 as uuidv4 } from "uuid";
import { Game, user as userType } from "../utils/game";
import { RegionDetails } from "../utils/details";
import { Region } from "@prisma/client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import Loading from "../components/loading";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { i18n } from "@lingui/core";
import { initTranslation } from "../utils/translation";
import { I18nProvider } from "@lingui/react";

initTranslation(i18n);

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

// TODO: create custom theme and move location
const theme = createTheme();

export default function App({ Component, pageProps }: AppProps) {
  // TODO: consider saving to cookies to refresh?
  const [user, setUser] = useState<userType>({ userId: uuidv4(), points: 20 });
  const [game, setGame] = useState<Game>();

  const [snackbar, setSnackbar] = useState<snackbarType>({
    text: "",
    enabled: false,
    severity: "error",
  });
  const router = useRouter();

  const locale = router.locale || router.defaultLocale;
  const firstRender = useRef(true);

  if (pageProps.translation && firstRender.current) {
    //load the translations for the locale
    i18n.load(locale, pageProps.translation);
    i18n.activate(locale);
    // render only once
    firstRender.current = false;
  }

  // listen for the locale changes
  useEffect(() => {
    if (pageProps.translation) {
      i18n.load(locale, pageProps.translation);
      i18n.activate(locale);
    }
  }, [locale, pageProps.translation]);

  useEffect(() => {
    fetch("/api/socket").finally(() => {
      socket = io();

      socket.on(socketEvent.connect, () => {
        console.log("connected");
      });

      socket.on(socketEvent.connected_user, (message) => {
        console.log(message);
      });

      socket.on(socketEvent.disconnect, () => {
        console.log("disconnect");
      });

      socket.on(socketEvent.game_update, (game) => {
        // HACK: Instead of getting back the class, we only actually get an object with no functions so we need to create a new one
        setGame(
          new Game(
            game._gameCode,
            game._users,
            false,
            game._availableRegions,
            game._status,
            game._ssp
          )
        );
      });

      socket.on(socketEvent.start_game, () => {
        router.push("/questions");
      });

      socket.on(socketEvent.recieved_questions, () => {
        router.push("/visualize");
      });

      socket.on(socketEvent.joined_room, (code: string, region: Region) => {
        setUser({
          ...user,
          points: 20,
          gameCode: code,
          region: region,
          emission: RegionDetails[region].emissionUnits,
        });
        router.push("/lobby");
      });

      socket.on(socketEvent.left_room, () => {
        router.push("/");
        setUser({ ...user, gameCode: null, region: null, emission: null });
        setGame(null);
      });

      socket.on(socketEvent.lobby_timeout, () => {
        router.push("/");
        setUser({ ...user, gameCode: null });
        setGame(null);
        setSnackbar({
          text: "Lobby timed out and you have been disconnected.",
          enabled: true,
          severity: "warning",
        });
      });

      socket.on(socketEvent.error_lobby_does_not_exist, () => {
        setSnackbar({
          text: "Lobby does not exist.",
          enabled: true,
          severity: "error",
        });
        setUser({ ...user, gameCode: null });
      });

      socket.on(socketEvent.error_lobby_already_exists, () => {
        setSnackbar({
          text: "Lobby code already in use. Try again by clicking New Game.",
          enabled: true,
          severity: "error",
        });
      });

      socket.on(socketEvent.error_lobby_full, () => {
        setSnackbar({
          text: "Cannot join lobby, lobby full.",
          enabled: true,
          severity: "error",
        });
      });

      socket.on(socketEvent.error_lobby_not_full, () => {
        setSnackbar({
          text: "Cannot start game, lobby not full.",
          enabled: true,
          severity: "error",
        });
      });
    });
  }, []);

  useEffect(() => {
    if (
      (router.pathname === "/lobby" ||
        router.pathname === "/questions" ||
        router.pathname === "/visualize") &&
      !user?.gameCode
    ) {
      setSnackbar({
        text: "You aren't in a lobby.",
        enabled: true,
        severity: "error",
      });
      router.push("/", undefined, { shallow: true });
    }
  }, []);

  if (
    (router.pathname === "/lobby" ||
      router.pathname === "/questions" ||
      router.pathname === "/visualize") &&
    !user?.gameCode
  ) {
    return <Loading />;
  }

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
    <I18nProvider i18n={i18n}>
      <Head>
        <title>Climate Change Simulation</title>
        <meta name="description" content="TODO: Write Description" />
        <meta name="theme-color" content="#005EB8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="/" />
        <meta property="og:title" content="Climate Change Game" />
        <meta property="og:description" content="TODO: Write Description" />
        <meta property="og:image" content="/social-image.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="/" />
        <meta property="twitter:title" content="Climate Change Game" />
        <meta
          property="twitter:description"
          content="TODO: Write Description"
        />
        <meta property="twitter:image" content="/social-image.png" />
      </Head>
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </I18nProvider>
  );
}
