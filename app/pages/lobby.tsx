import { Fragment } from "react";
import Head from "next/head";

import Layout from "../components/layout";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import LoopIcon from "@mui/icons-material/Loop";
import { motion } from "framer-motion";
import Tooltip from "@mui/material/Tooltip";

import { snackbarProps, socket } from "./_app";
import { socketEvent } from "../utils/socketServerHandler";
import { userState, gameState, GameStatus } from "../utils/game";
import { DescriptiveTooltips, RegionDetails } from "../utils/details";
import { Region } from "@prisma/client";

import { Trans, t, plural } from "@lingui/macro";
import { loadTranslation } from "../utils/translation";
import { GetStaticProps } from "next/types";

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

export default function Join({
  user,
  setUser,
  game,
  setGame,
  snackbar,
  setSnackbar,
}: userState & gameState & snackbarProps) {
  const leaveRoom = () => {
    socket.emit(socketEvent.leave_room, user, user.gameCode);
  };

  const startGame = () => {
    if (game.availableRegions.length == 0) {
      socket.emit(socketEvent.user_request_start_game, user.gameCode);
    } else {
      setSnackbar({
        text: t`Cannot start game, lobby not full.`,
        enabled: true,
        severity: "error",
      });
    }
  };

  if (!user?.gameCode || game?.status != GameStatus.lobby)
    return (
      <Layout>
        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut",
          }}
        >
          <LoopIcon fontSize="large" />
        </motion.div>
      </Layout>
    );

  return (
    <>
      <Head>
        <title>
          {game.availableRegions.length > 0
            ? plural(game.availableRegions.length, {
                one: "# Region Remaining",
                other: "# Regions Remaining",
              })
            : t`Ready to start!`}
          {!game ? t`Region Lobby` : ""}
        </title>
      </Head>
      <Layout gameCode={user.gameCode} region={user.region}>
        <Typography variant="h3" textAlign="center" fontWeight={800}>
          <Trans id="region.title">Region Lobby</Trans>
        </Typography>
        <Typography variant="subtitle1" textAlign="center">
          <Trans id="region.description">
            You've been automatically assigned a region. Once the simulation
            starts, each player will have to make policy decisions for their
            region which will impact the global state of the world. Be careful
            as to not spend all your money!
          </Trans>
        </Typography>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {Object.keys(Region).map((region) => {
            // const region: Regions = Regions[r];
            const selfRegion =
              game?.users.filter(
                (u) => u.userId === user.userId && u.region === region
              ).length > 0;

            const takenRegion =
              !selfRegion &&
              game?.users.filter((u) => u.region === region).length > 0;

            const regionToolTip = DescriptiveTooltips[region];

            return (
              <Fragment key={region}>
                <Grid item xs={6}>
                  {/* // TODO: Replace with my auto tooltip function */}
                  <Tooltip title={regionToolTip} placement="bottom-end">
                    <Typography
                      variant="h6"
                      textAlign="right"
                      sx={{
                        textDecoration: `${
                          regionToolTip ? "dotted underline" : ""
                        }`,
                      }}
                    >
                      {RegionDetails[region].name}
                    </Typography>
                  </Tooltip>
                </Grid>
                <Grid item xs={6}>
                  <Chip
                    label={`${
                      selfRegion
                        ? t`Your Region`
                        : `${
                            takenRegion ? t`Taken Region` : t`Unassigned Region`
                          }`
                    }`}
                    color={selfRegion ? "success" : "primary"}
                    disabled={takenRegion}
                  />
                </Grid>
              </Fragment>
            );
          })}
        </Grid>
        <Button
          variant="contained"
          size="large"
          onClick={startGame}
          disabled={game && game?.availableRegions.length > 0}
        >
          <Trans id="region.button.start">Start Simulation</Trans>
        </Button>
        <Button variant="contained" size="large" onClick={leaveRoom}>
          <Trans id="region.button.leave">Leave Simulation</Trans>
        </Button>
      </Layout>
    </>
  );
}
