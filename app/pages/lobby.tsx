import { useRouter } from "next/router";
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
import {
  userState,
  gameState,
  GameStatus,
  DescriptiveTooltips,
  RegionDetails,
} from "../utils/types/game";
import { Region } from "@prisma/client";

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
        text: "Cannot start game, lobby not full.",
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
            ? `${game.availableRegions.length} Region${
                game.availableRegions.length > 1 ? "s" : ""
              } Remaining`
            : `Ready to start!`}
          {!game ? "Select Region" : ""}
        </title>
      </Head>
      <Layout gameCode={user.gameCode} region={user.region}>
        <Typography variant="h3" textAlign="center" fontWeight={800}>
          Select Region
        </Typography>
        <Typography variant="subtitle1" textAlign="center">
          This is the description.
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
                        ? "Your"
                        : `${takenRegion ? "Taken" : "Unassigned"}`
                    } Region`}
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
          Start Simulation
        </Button>
        <Button variant="contained" size="large" onClick={leaveRoom}>
          Leave Simulation
        </Button>
      </Layout>
    </>
  );
}
