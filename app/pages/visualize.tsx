import { useEffect, useState } from "react";
import Head from "next/head";

import Layout from "../components/layout";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { snackbarProps } from "./_app";
import { userState, gameState, GameStatus } from "../utils/game";
import { SSPDetails } from "../utils/details";

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
      fetch(`/api/data?ssp=${game.ssp}&region=${user.region}`)
        .then((res) => res.json())
        .then((data) => {
          setData(data);
        })
        .catch((_error) => {
          setSnackbar({
            text: "Could not load data.",
            enabled: true,
            severity: "error",
          });
        });
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
            Visualize Data: {SSPDetails[game.ssp].name}
          </Typography>
        )}
        {game.status == GameStatus.visualize && (
          <Typography variant="body1" textAlign="center">
            {SSPDetails[game.ssp].description}
          </Typography>
        )}
        {game.status == GameStatus.visualize && data && (
          <>
            <Visualize data={data} />
            {SSPDetails[game.ssp]?.atlasLink && (
              <Button
                variant="contained"
                size="large"
                href={SSPDetails[game.ssp]?.atlasLink}
                target="_blank"
                rel="noopener noreffer"
              >
                View Interactive Atlas
              </Button>
            )}
          </>
        )}
      </Layout>
    </>
  );
}
