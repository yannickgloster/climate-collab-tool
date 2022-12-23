import type { NextApiRequest, NextApiResponse } from "next";
import type { NextApiResponseWithSocket } from "../../types/NextApiSocket";
import { RemoteSocket, Server } from "socket.io";

import sockets from "../../utils/sockets";

const socketHandler = function handler(
  req: NextApiRequest,
  res: NextApiResponseWithSocket
) {
  if (!res.socket.server.io) {
    console.log("*First use, starting socket.io");

    const io = new Server(res.socket.server);

    io.on("connection", (socket) => {
      socket.broadcast.emit("a user connected");
      sockets(io, socket);
    });

    res.socket.server.io = io;
  } else {
    console.log("socket.io already running");
  }
  console.log(res.socket.server);
  res.end();
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default socketHandler;
