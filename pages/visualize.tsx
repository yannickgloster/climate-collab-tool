import { useRouter } from "next/router";

import Layout from "../components/layout";
import Typography from "@mui/material/Typography";

import { snackbarProps, socket } from "./_app";
import { userState, gameState, GameStatus } from "../utils/types/game";

export default function Visualize({
  user,
  setUser,
  game,
  setGame,
  snackbar,
  setSnackbar,
}: userState & gameState & snackbarProps) {
  const router = useRouter();

  return (
    <Layout>
      {game.status == GameStatus.questions && (
        <Typography variant="h3" textAlign="center">
          Everyone hasn't finished their questions.
        </Typography>
      )}
      {game.status == GameStatus.visualize && (
        <Typography variant="h3" textAlign="center">
          Visualize Data: {game.ssp}
        </Typography>
      )}
    </Layout>
  );
}
