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
  private _availableRegions: string[];

  constructor(gameCode: string, users: user[], availableRegions?: string[]) {
    this._gameCode = gameCode;
    this._users = users;
    this._timestamp = Date.now();

    // HACK: relates to the sockets passing this around as an object and not a class
    if (availableRegions) {
      this._availableRegions = availableRegions;
    } else {
      this._availableRegions = Object.keys(Regions);
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

  randomlyAssignRegion(user: user) {
    const randomRegion = this._availableRegions.splice(
      Math.floor(Math.random() * this._availableRegions.length),
      1
    )[0];

    // FIXME: This assumes that the user exists
    this.users.filter((u) => u.userId === user.userId)[0].region =
      Regions[randomRegion];
    this._timestamp = Date.now();
  }

  addUser(user: user) {
    this._timestamp = Date.now();
    this._users.push(user);
  }

  removeUser(user: user) {
    this._timestamp = Date.now();
    const removedUser = this._users.splice(this._users.indexOf(user), 1)[0];
    // FIXME: This assumes that the user has a region
    this._availableRegions.push(removedUser.region);
  }
}

export interface userState {
  user: user;
  setUser: Dispatch<SetStateAction<user>>;
}

export interface gameState {
  game: Game;
  setGame: Dispatch<SetStateAction<Game>>;
}
