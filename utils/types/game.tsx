import type { Dispatch, SetStateAction } from "react";

export enum Regions {
  EU = "European Union",
  US = "United States",
  China = "China",
  SA = "South American Amazonian Countries", //  (Brazil, Columbia, Bolivia, Peru, Ecuador, Venezuela, Suriname, Guyana)
  India = "India",
  Island = "Alliance of Small Island States", // https://en.wikipedia.org/wiki/Alliance_of_Small_Island_States
}

// TODO: consider changing to class
export interface user {
  readonly userId: string;
  region?: Regions;
  gameCode?: string;
}

export class Game {
  private _users: user[];
  private _gameCode: string;
  private _timestamp: number;

  constructor(user: user, gameCode: string) {
    this._gameCode = gameCode;
    this._users = [user];
    this._timestamp = Date.now();
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

  addUser(user: user) {
    this._timestamp = Date.now();
    this._users.push(user);
  }

  removeUser(user: user) {
    this._timestamp = Date.now();
    this._users.splice(this._users.indexOf(user), 1);
  }
}

export interface userState {
  user: user;
  setUser: Dispatch<SetStateAction<user>>;
}
