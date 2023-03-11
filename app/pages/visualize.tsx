import { useEffect, useState } from "react";
import Head from "next/head";

import Layout from "../components/layout";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import { snackbarProps } from "./_app";
import { userState, gameState, GameStatus } from "../utils/game";

import Visualize, { VisualizeProps } from "../components/visualize";
import { Trans, t, plural } from "@lingui/macro";

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
      fetch(`/api/data?ssp=${game.ssp}&region=${user.region}`)
        .then((res) => res.json())
        .then((data) => {
          setData(data);
        })
        .catch((_error) => {
          setSnackbar({
            text: t`Could not load data.`,
            enabled: true,
            severity: "error",
          });
        });
    }
  }, [game.ssp]);

  return (
    <>
      <Head>
        <title>{t`View the World`}</title>
      </Head>
      <Layout gameCode={user.gameCode} region={user.region}>
        {game.status == GameStatus.questions && (
          <Typography variant="h3" textAlign="center" fontWeight={800}>
            <Trans>Everyone hasn't finished their questions.</Trans>
          </Typography>
        )}
        {game.status == GameStatus.visualize && !data && <CircularProgress />}
        {game.status == GameStatus.visualize && data && (
          <Visualize data={data} ssp={game.ssp} region={user.region} />
        )}
      </Layout>
    </>
  );
}
