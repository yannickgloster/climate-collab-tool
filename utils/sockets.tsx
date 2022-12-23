import type { Server, Socket } from "socket.io";

export default (io: Server, socket: Socket) => {
  const test = (msg: any) => {
    socket.broadcast.emit("testBroadcast", msg);
  };

  socket.on("test", test);
};
