import { getMaxAge } from "next/dist/server/image-optimizer";
import type { Server, Socket } from "socket.io";
import { user as userType, Game } from "./types/game";
import { gameCodeLength } from "./constants";

export enum socketEvent {
  // Built in
  connect = "connect",
  disconnect = "disconnect",

  // Game
  create_room = "create_room",
  join_room = "join_room",
  joined_room = "joined_room",
  leave_room = "leave_room",
  left_room = "left_room",
  game_update = "game_update",
  room_broadcast = "room_broadcast",
  connected_user = "connected_user",
  select_region = "select_region",
  start_game = "start_game",
  completed_questions = "completed_questions",
  visualize_data = "visualize_data",

  // Errors
  error_lobby_does_not_exist = "error_lobby_does_not_exist",
  error_lobby_already_exists = "error_lobby_already_exists",
  error_lobby_full = "error_lobby_full",
  lobby_timeout = "lobby_timeout",
}

// export const rooms = new Map<string, Game>();

export default (io: Server, socket: Socket, rooms: Map<string, Game>) => {
  // Room Logic
  const createRoom = (user: userType, code: string) => {
    if (!rooms.has(code)) {
      socket.join(code);
      const game = new Game(code, [user]);
      game.randomlyAssignRegion(user);
      rooms.set(code, game);
      io.to(socket.id).emit(socketEvent.joined_room);
      io.to(code).emit(socketEvent.game_update, rooms.get(code));
    } else {
      io.to(socket.id).emit(socketEvent.error_lobby_already_exists);
    }
  };
  socket.on(socketEvent.create_room, createRoom);

  const joinRoom = (user: userType, code: string) => {
    if (rooms.has(code)) {
      const game = rooms.get(code);
      if (game.availableRegions.length > 0) {
        socket.join(code);
        game.addUser(user);
        game.randomlyAssignRegion(user);
        io.to(socket.id).emit(socketEvent.joined_room);
        io.to(code).emit(socketEvent.game_update, rooms.get(code));
      } else {
        io.to(socket.id).emit(socketEvent.error_lobby_full);
      }
    } else {
      io.to(socket.id).emit(socketEvent.error_lobby_does_not_exist);
    }
  };
  socket.on(socketEvent.join_room, joinRoom);

  const leaveRoom = (user: userType, code: string) => {
    if (rooms.has(code)) {
      const game = rooms.get(code);
      socket.leave(code);
      game.removeUser(user);
      io.to(socket.id).emit(socketEvent.left_room);
      io.to(code).emit(socketEvent.game_update, rooms.get(code));
      if (game.users.length == 0) {
        rooms.delete(code);
      }
    } else {
      io.to(socket.id).emit(socketEvent.error_lobby_does_not_exist);
    }
  };
  socket.on(socketEvent.leave_room, leaveRoom);

  // Game Logic
  const userCompletedQuestions = (user: userType) => {
    /* 
      TODO: Check if all other users are done, keep track of them somehow.
      Once all users are completed, trigger visualize_data event.
      Before triggering the visualize event, process all the weights from each user.
    */
  };
  socket.on(socketEvent.completed_questions, userCompletedQuestions);

  // Visualize Logic
};
