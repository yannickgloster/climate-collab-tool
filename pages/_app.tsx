import type { AppProps } from "next/app";

import { Game, user as userType } from "../utils/types/game";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { socketEvent } from "../utils/socketHandler";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

export let socket: Socket;

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<userType>({ userId: uuidv4() });
  const [game, setGame] = useState<Game>();

  useEffect(() => {
    fetch("/api/socket").finally(() => {
      socket = io();

      socket.on(socketEvent.connect, () => {
        console.log("connected");
      });

      socket.on(socketEvent.connected_user, (message) => {
        console.log(message);
      });

      socket.on(socketEvent.room_broadcast, (message) => {
        console.log(message);
      });

      socket.on(socketEvent.disconnect, () => {
        console.log("disconnect");
      });

      socket.on(socketEvent.joined_room, (game) => {
        // HACK: Instead of getting back the class, we only actually get an object with no functions so we need to create a new one
        setGame(new Game(game._gameCode, game._users, game._availableRegions));
      });
    });
  }, []);

  return (
    <Component
      {...pageProps}
      user={user}
      setUser={setUser}
      game={game}
      setGame={setGame}
    />
  );
}
