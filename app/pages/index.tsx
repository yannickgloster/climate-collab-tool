import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import Layout from "../components/layout";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";

import { socket, snackbarProps } from "./_app";
import { socketEvent } from "../utils/socketServerHandler";
import { DescriptiveTooltips } from "../utils/details";
import { userState } from "../utils/game";
import { gameCodeLength } from "../utils/constants";

const disableButtonSeconds = 1;

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
    console.log(`Joining room ${code}`);
    setJoinEnable(false);
    const newUser = { ...user, gameCode: code };
    socket.emit(socketEvent.join_room, newUser, code);
    setUser(newUser);
  };

  useEffect(() => {
    console.log("useEffect outside IF");
    console.log(router.query);
    if (router.query?.join && socket) {
      console.log("useEffect inside IF");
      setGameCode(router.query.join.toString());
      setTimeout(() => {
        console.log("TIMEOUT CALLED");
        joinRoom(router.query.join.toString());
      }, 1000);
    }
  }, [router.query, socket]);

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
        Climate Change Simulation
      </Typography>
      <Typography variant="subtitle1" textAlign="center">
        Built using the{" "}
        <Tooltip title={DescriptiveTooltips["IPCC"]} placement="bottom-end">
          <Typography
            sx={{ textDecoration: "dotted underline" }}
            display="inline"
          >
            IPCC
          </Typography>
        </Tooltip>{" "}
        Dataset. This is the description.
      </Typography>
      <Button
        variant="contained"
        size="large"
        onClick={generateGameCode}
        data-cy="newGameButton"
      >
        New Simulation
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
        Join Simulation
      </Button>
    </Layout>
  );
}
