import type { NextApiRequest } from "next";
import type { NextApiResponseWithSocket } from "../../utils/types/NextApiSocket";
import { Server } from "socket.io";
import { instrument } from "@socket.io/admin-ui";
import cron from "node-cron";

import sockets, { socketEvent } from "../../utils/socketServerHandler";
import { Game, GameStatus } from "../../utils/game";
import { cronjobLengthHours } from "../../utils/constants";

const socketHandler = function handler(
  _req: NextApiRequest,
  res: NextApiResponseWithSocket
) {
  if (!res.socket.server.io) {
    console.log("*First use, starting socket.io");

    const io = new Server(res.socket.server, {
      cors: {
        origin: ["https://admin.socket.io"],
        credentials: true,
      },
    });
    const rooms = new Map<string, Game>();

    io.on("connection", (socket) => {
      sockets(io, socket, rooms);
    });

    instrument(io, {
      auth: {
        type: "basic",
        username: "admin",
        password:
          "$2b$10$9.1eoj31nAQW2WBMqk72d.NeDYb1YiAIvDmwHuQ.77hUbIrgMxOIG",
      },
    });

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

    cron.schedule(`0 0 */${cronjobLengthHours / 2} * * *`, function () {
      console.log("Checking for finished rooms");
      rooms.forEach((game, code) => {
        if (
          Date.now() - game.timestamp >
            (cronjobLengthHours / 4) * 1000 * 60 * 60 &&
          game.status == GameStatus.visualize
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
