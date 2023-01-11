import type { NextApiRequest, NextApiResponse } from "next";
import type { NextApiResponseWithSocket } from "../../utils/types/NextApiSocket";
import { RemoteSocket, Server } from "socket.io";

import sockets from "../../utils/socketHandler";
import { socketEvent } from "../../utils/socketHandler";

const socketHandler = function handler(
  req: NextApiRequest,
  res: NextApiResponseWithSocket
) {
  if (!res.socket.server.io) {
    console.log("*First use, starting socket.io");

    const io = new Server(res.socket.server);

    io.on("connection", (socket) => {
      // socket.broadcast.emit(socketEvent.connected_user, "a user connected");
      sockets(io, socket);
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
