import type { Server, Socket } from "socket.io";

export default (io: Server, socket: Socket) => {
  const test = (msg: any) => {
    socket.broadcast.emit("testBroadcast", msg);
  };

  socket.on("test", test);

  const createRoom = (code: string) => {
    socket.join(code);
  };
  socket.on("CREATE_ROOM", createRoom);

  // TODO: combine with CREATE_ROOM
  const joinRoom = (code: string) => {
    socket.join(code);
  };
  socket.on("JOIN_ROOM", joinRoom);

  const testRoom = (code: string, message: string) => {
    io.to(code).emit("ROOM_BROADCAST", message);
  };
  socket.on("TEST_ROOM", testRoom);
};
