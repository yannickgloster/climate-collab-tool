import Layout from "../components/layout";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Regions } from "../utils/types/game";

import { motion } from "framer-motion";

import { useEffect, useState } from "react";
import { userState, gameState } from "../utils/types/game";
import { useRouter } from "next/router";

import { snackbarProps, socket } from "./_app";
import { socketEvent } from "../utils/socketHandler";

import LoopIcon from "@mui/icons-material/Loop";

export default function RegionSelect({
  user,
  setUser,
  game,
  setGame,
  snackbar,
  setSnackbar,
}: userState & gameState & snackbarProps) {
  const router = useRouter();

  useEffect(() => {
    if (!user?.gameCode) {
      setSnackbar({
        text: "You aren't in a lobby.",
        enabled: true,
        severity: "error",
      });
      router.push("/");
    }
  }, []);

  if (!user?.gameCode)
    return (
      <Layout>
        <motion.div
          animate={{
            rotate: 360,
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
    <Layout>
      <Typography variant="overline">Game Code: {user.gameCode}</Typography>
      <Typography variant="h3" textAlign="center">
        Select Region
      </Typography>
      <Typography variant="subtitle1" textAlign="center">
        This is the description.
      </Typography>
      <Stack spacing={2}>
        {/* TODO: This isn't very efficient, fix this. Loopings over all the users for every region.*/}
        {Object.keys(Regions).map((r) => {
          const region: Regions = Regions[r];
          const selfRegion =
            game?.users.filter(
              (u) => u.userId === user.userId && u.region === region
            ).length > 0;

          const takenRegion =
            !selfRegion &&
            game?.users.filter((u) => u.region === region).length > 0;
          return (
            <Stack direction="row" spacing={2} key={r}>
              <Typography variant="h6" textAlign="center">
                {region}
              </Typography>
              {/* disabled={true} for when others select the country*/}
              <Button
                variant="contained"
                size="small"
                color={selfRegion ? "success" : "primary"}
                disabled={takenRegion}
              >
                {selfRegion && "Your"}
                {takenRegion && "Taken"}
                {!takenRegion && !selfRegion && "Unselected"} Region
              </Button>
            </Stack>
          );
        })}
      </Stack>
      <Button
        variant="contained"
        size="large"
        onClick={() => {
          alert("start game");
        }}
        disabled={game && game?.availableRegions.length > 0}
      >
        Start Game
      </Button>
      <br />
      <Button
        variant="contained"
        size="large"
        onClick={() => {
          console.log(user);
          console.log(game);
        }}
        data-cy="testRoomButton"
      >
        Test
      </Button>
    </Layout>
  );
}
