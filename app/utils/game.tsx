import { Region, SSP } from "@prisma/client";
import type { Dispatch, SetStateAction } from "react";

export interface user {
  readonly userId: string;
  power: number; // TODO: Think about renaming this
  region?: Region;
  gameCode?: string;
  completedQuestions?: boolean;
  emission?: number;
}

export enum GameStatus {
  lobby,
  questions,
  visualize,
}

export interface userState {
  user: user;
  setUser: Dispatch<SetStateAction<user>>;
}

export interface gameState {
  game: Game;
  setGame: Dispatch<SetStateAction<Game>>;
}

export class Game {
  private _users: user[];
  private _gameCode: string;
  private _timestamp: number;
  private _availableRegions: string[];
  private _status: GameStatus;
  private _ssp: SSP;
  private _emission: number;

  constructor(
    gameCode: string,
    users: user[],
    newGame: boolean = false,
    availableRegions?: string[],
    status?: GameStatus,
    ssp?: SSP
  ) {
    this._gameCode = gameCode;
    if (newGame) {
      users.forEach((u) => (u.completedQuestions = false));
    }
    this._users = users;
    this._timestamp = Date.now();
    // TODO: the client might want this.
    this._emission = 0;

    // HACK: relates to the sockets passing this around as an object and not a class
    if (availableRegions) {
      this._availableRegions = availableRegions;
    } else {
      this._availableRegions = Object.keys(Region);
    }

    if (status) {
      this._status = status;
    } else {
      this._status = GameStatus.lobby;
    }

    if (ssp) {
      this._ssp = ssp;
    }
  }

  get timestamp() {
    return this._timestamp;
  }

  get gameCode() {
    this._timestamp = Date.now();
    return this._gameCode;
  }

  get users() {
    this._timestamp = Date.now();
    return this._users;
  }

  get availableRegions() {
    this._timestamp = Date.now();
    return this._availableRegions;
  }

  get status() {
    this._timestamp = Date.now();
    return this._status;
  }

  set status(status: GameStatus) {
    this._timestamp = Date.now();
    this._status = status;
  }

  get ssp() {
    this._timestamp = Date.now();
    return this._ssp;
  }

  get emission() {
    this._timestamp = Date.now();
    return this._emission;
  }

  set ssp(ssp: SSP) {
    this._timestamp = Date.now();
    this._ssp = ssp;
  }

  randomlyAssignRegion(user: user) {
    const randomRegion = this._availableRegions.splice(
      Math.floor(Math.random() * this._availableRegions.length),
      1
    )[0];

    // FIXME: This assumes that the user exists
    this.users.filter((u) => u.userId === user.userId)[0].region =
      Region[randomRegion];
    this._timestamp = Date.now();

    return randomRegion;
  }

  userCompletedQuestion(user: user) {
    this._users.filter((u) => u.userId == user.userId)[0].completedQuestions =
      true;
  }

  allUsersCompletedQuestion() {
    return this._users.every((u) => u.completedQuestions);
  }

  addUser(user: user) {
    this._timestamp = Date.now();
    user.completedQuestions = false;
    this._users.push(user);
  }

  removeUser(user: user) {
    this._timestamp = Date.now();
    const removedUser = this._users.splice(this._users.indexOf(user), 1)[0];
    removedUser.completedQuestions = null;
    // FIXME: This assumes that the user has a region
    this._availableRegions.push(removedUser.region);
  }

  addEmission(emission: number) {
    this._timestamp = Date.now();
    this._emission += emission;
  }
}
