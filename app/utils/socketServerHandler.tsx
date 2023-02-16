import type { Server, Socket } from "socket.io";
import {
  user as userType,
  Game,
  GameStatus,
  SPP_Emissions,
} from "./types/game";
import { SSP } from "@prisma/client";

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
  user_request_start_game = "user_request_start_game",
  start_game = "start_game",
  completed_questions = "completed_questions",
  recieved_questions = "recieved_questions",

  // Errors
  error_lobby_does_not_exist = "error_lobby_does_not_exist",
  error_lobby_already_exists = "error_lobby_already_exists",
  error_lobby_full = "error_lobby_full",
  error_lobby_not_full = "error_lobby_not_full",
  lobby_timeout = "lobby_timeout",
}

export default (io: Server, socket: Socket, rooms: Map<string, Game>) => {
  // TODO: add types for each function
  // Room Logic
  const createRoom = (user: userType, code: string) => {
    if (!rooms.has(code)) {
      socket.join(code);
      const game = new Game(code, [user], true);
      const region = game.randomlyAssignRegion(user);
      rooms.set(code, game);
      io.to(socket.id).emit(socketEvent.joined_room, code, region);
      io.to(code).emit(socketEvent.game_update, game);
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
        const region = game.randomlyAssignRegion(user);
        io.to(socket.id).emit(socketEvent.joined_room, code, region);
        io.to(code).emit(socketEvent.game_update, game);
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
      io.to(code).emit(socketEvent.game_update, game);
      if (game.users.length == 0) {
        rooms.delete(code);
      }
    } else {
      io.to(socket.id).emit(socketEvent.error_lobby_does_not_exist);
    }
  };
  socket.on(socketEvent.leave_room, leaveRoom);

  const startGame = (code: string) => {
    if (rooms.has(code)) {
      const game = rooms.get(code);
      if (game.availableRegions.length == 0) {
        game.status = GameStatus.questions;
        io.to(code).emit(socketEvent.game_update, game);
        io.to(code).emit(socketEvent.start_game);
      } else {
        io.to(socket.id).emit(socketEvent.error_lobby_not_full);
      }
    } else {
      io.to(socket.id).emit(socketEvent.error_lobby_does_not_exist);
    }
  };
  socket.on(socketEvent.user_request_start_game, startGame);

  // Game Logic
  const userCompletedQuestions = (
    user: userType,
    code: string,
    emission: number
  ) => {
    if (rooms.has(code)) {
      const game = rooms.get(code);
      game.userCompletedQuestion(user);
      game.addEmission(emission);
      io.to(code).emit(socketEvent.game_update, game);
      io.to(socket.id).emit(socketEvent.recieved_questions);
      console.log(game.users);
      if (game.allUsersCompletedQuestion()) {
        game.status = GameStatus.visualize;
        const finalSSP = SPP_Emissions.reduce((a, b) => {
          return Math.abs(b.emission - game.emission) <
            Math.abs(a.emission - game.emission)
            ? b
            : a;
        });
        // TODO: Remove after debugging
        console.log("Emmission: " + game.emission);
        console.log("Closest SSP: " + finalSSP.ssp + " " + finalSSP.emission);
        game.ssp = finalSSP.ssp;
        io.to(code).emit(socketEvent.game_update, game);
      }
    } else {
      io.to(socket.id).emit(socketEvent.error_lobby_does_not_exist);
    }
  };
  socket.on(socketEvent.completed_questions, userCompletedQuestions);
};
