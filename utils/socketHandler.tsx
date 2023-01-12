import type { Server, Socket } from "socket.io";
import { user as userType, Game } from "../utils/types/game";

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
  select_region = "select_region",
  start_game = "start_game",
  completed_questions = "completed_questions",
  visualize_data = "visualize_data",
}

// TODO: have some script to remove empty rooms or untouched rooms after a certain period of time
const rooms = new Map<string, Game>();

export default (io: Server, socket: Socket) => {
  // Room Logic
  const createRoom = (user: userType, code: string) => {
    if (!rooms.has(code)) {
      socket.join(code);
      rooms.set(code, new Game(user, code));
    } else {
      // TODO: if there is random collision, handle this somehow. Throw error or loop to generate new one or something
    }
  };
  socket.on(socketEvent.create_room, createRoom);

  // TODO: Differentiate from create room. Check to see if room exists.
  const joinRoom = (user: userType, code: string) => {
    if (rooms.has(code)) {
      socket.join(code);
      rooms.get(code).addUser(user);
      io.to(code).emit(socketEvent.joined_room, rooms.get(code));
    } else {
      // TODO: throw error that the room doesn't exist
    }
  };
  socket.on(socketEvent.join_room, joinRoom);

  const testRoom = (user: userType, code: string, message: string) => {
    io.to(code).emit(socketEvent.room_broadcast, message);
  };
  socket.on(socketEvent.test_room, testRoom);

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
