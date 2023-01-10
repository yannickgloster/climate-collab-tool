import type { Server, Socket } from "socket.io";
import { user as userType } from "../utils/types/game";

export enum socketEvent {
  // Built in
  connect = "connect",
  disconnect = "disconnect",

  // Game
  create_room = "create_room",
  join_room = "join_room",
  joined_room = "joined_room",
  test_room = "test_room",
  room_broadcast = "room_broadcast",
  connected_user = "connected_user",
}

export default (io: Server, socket: Socket) => {
  const createRoom = (_: userType, code: string) => {
    socket.join(code);
  };
  socket.on(socketEvent.create_room, createRoom);

  // TODO: combine with CREATE_ROOM
  const joinRoom = (user: userType, code: string) => {
    socket.join(code);
    io.to(code).emit(socketEvent.room_broadcast, {
      user: user,
      code: code,
    });
  };
  socket.on(socketEvent.join_room, joinRoom);

  const testRoom = (user: userType, code: string, message: string) => {
    io.to(code).emit(socketEvent.room_broadcast, message);
  };
  socket.on(socketEvent.test_room, testRoom);
};
