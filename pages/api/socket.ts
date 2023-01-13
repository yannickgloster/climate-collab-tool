import type { NextApiRequest } from "next";
import type { NextApiResponseWithSocket } from "../../utils/types/NextApiSocket";
import { Server } from "socket.io";
import cron from "node-cron";

import sockets, { socketEvent } from "../../utils/socketServerHandler";
import { Game } from "../../utils/types/game";
import { cronjobLengthHours } from "../../utils/constants";

const socketHandler = function handler(
  req: NextApiRequest,
  res: NextApiResponseWithSocket
) {
  if (!res.socket.server.io) {
    console.log("*First use, starting socket.io");

    const io = new Server(res.socket.server);
    const rooms = new Map<string, Game>();

    io.on("connection", (socket) => {
      sockets(io, socket, rooms);
    });

    // TODO: Investigate if this is the best way to run a cron job
    cron.schedule(`0 0 */${cronjobLengthHours} * * *`, function () {
      console.log("Checking for hanging rooms");
      rooms.forEach((game, code) => {
        if (
          Date.now() - game.timestamp >
          (cronjobLengthHours / 2) * 1000 * 60 * 60
        ) {
          io.to(code).emit(socketEvent.lobby_timeout);
          io.socketsLeave(code);
          rooms.delete(code);
          console.log(`Deleted ${code} room`);
        }
      });
    });

    res.socket.server.io = io;
  } else {
    console.log("socket.io already running");
  }
  res.end();
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default socketHandler;
