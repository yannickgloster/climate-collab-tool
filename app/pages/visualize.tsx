import { useEffect, useState } from "react";
import Head from "next/head";

import Layout from "../components/layout";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { snackbarProps } from "./_app";
import {
  userState,
  gameState,
  GameStatus,
  AtlasMeanTemperatureLinks,
} from "../utils/types/game";

import Visualize, { VisualizeProps } from "../components/visualize";

export default function VisualizePage({
  user,
  setUser,
  game,
  setGame,
  snackbar,
  setSnackbar,
}: userState & gameState & snackbarProps) {
  const [data, setData] = useState<VisualizeProps["data"]>();

  useEffect(() => {
    if (game.ssp) {
      // TODO: add query for data
    }
  }, [game.ssp]);

  return (
    <>
      <Head>
        <title>View the World</title>
      </Head>
      <Layout gameCode={user.gameCode} region={user.region}>
        {game.status == GameStatus.questions && (
          <Typography variant="h3" textAlign="center" fontWeight={800}>
            Everyone hasn't finished their questions.
          </Typography>
        )}
        {game.status == GameStatus.visualize && (
          <Typography variant="h3" textAlign="center" fontWeight={800}>
            Visualize Data: {game.ssp}
          </Typography>
        )}
        {game.status == GameStatus.visualize && (
          <Typography variant="body1" textAlign="center">
            SSP Description
          </Typography>
        )}
        {/* {game.status == GameStatus.visualize && (
          <Button
            variant="contained"
            size="large"
            href={AtlasMeanTemperatureLinks[game.ssp]}
            target="_blank"
            rel="noopener noreffer"
          >
            View Interactive Atlas
          </Button>
        )} */}
      </Layout>
    </>
  );
}
