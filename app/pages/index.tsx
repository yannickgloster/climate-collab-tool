import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import Layout from "../components/layout";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { socket, snackbarProps } from "./_app";
import { socketEvent } from "../utils/socketServerHandler";
import { userState } from "../utils/game";
import { gameCodeLength } from "../utils/constants";

import AnnotatedTypography from "../components/annotatedTypography";

import { Trans, t } from "@lingui/macro";
import { loadTranslation } from "../utils/translation";
import { GetStaticProps } from "next/types";

const disableButtonSeconds = 1;

export const getStaticProps: GetStaticProps = async (ctx) => {
  const translation = await loadTranslation(
    ctx.locale!,
    process.env.NODE_ENV === "production"
  );

  return {
    props: {
      translation,
    },
  };
};

export default function Home({
  user,
  setUser,
  snackbar,
  setSnackbar,
}: userState & snackbarProps) {
  const [gameCode, setGameCode] = useState("");
  const [joinEnable, setJoinEnable] = useState(true);
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

  const joinRoom = (code: string) => {
    setJoinEnable(false);
    const newUser = { ...user, gameCode: code };
    socket.emit(socketEvent.join_room, newUser, code);
    setUser(newUser);
  };

  useEffect(() => {
    if (router.query?.join) {
      setGameCode(router.query.join.toString());
      setTimeout(() => {
        joinRoom(router.query.join.toString());
      }, 1500);
    }
  }, [router.query.join, socket]);

  useEffect(() => {
    if (!joinEnable) {
      setTimeout(() => {
        setJoinEnable(true);
      }, disableButtonSeconds * 1000);
    }
  }, [joinEnable]);

  return (
    <Layout img="/images/eberhard-grossgasteiger-jCL98LGaeoE-unsplash.jpg">
      <Typography variant="h3" textAlign="center" fontWeight={800}>
        <Trans id="title">Climate Change Simulation</Trans>
      </Typography>
      <Typography variant="subtitle1" textAlign="center">
        <AnnotatedTypography
          text={t`Can you work with others to reduce the worst impacts of climate change? Built using the IPCC CMIP6 climate projections.`}
        />
      </Typography>
      <Button
        variant="contained"
        size="large"
        onClick={generateGameCode}
        data-cy="newGameButton"
      >
        <Trans id="button.newSimulation">New Simulation</Trans>
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
        onClick={() => joinRoom(gameCode)}
        data-cy="joinGameButton"
        disabled={!joinEnable}
      >
        <Trans id="button.joinSimulation">Join Simulation</Trans>
      </Button>
    </Layout>
  );
}
