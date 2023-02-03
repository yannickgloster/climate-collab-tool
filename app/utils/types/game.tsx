import type { Dispatch, SetStateAction } from "react";

export enum Regions {
  EU = "European Union",
  US = "United States",
  China = "China",
  SA = "South American Amazonian Countries", //  (Brazil, Columbia, Bolivia, Peru, Ecuador, Venezuela, Suriname, Guyana)
  India = "India",
  Island = "Alliance of Small Island States", // https://en.wikipedia.org/wiki/Alliance_of_Small_Island_States
}

export const DescriptiveTooltips = {
  [Regions.SA]:
    "Brazil, Columbia, Bolivia, Peru, Ecuador, Venezuela, Suriname, Guyana",
  [Regions.Island]:
    "Alliance of Small Island States (AOSIS) is an intergovernmental organization of 39 low-lying coastal and small island countries.",
  IPCC: "The Intergovernmental Panel on Climate Change (IPCC) is an intergovernmental body of the United Nations who's job is to advance scientific knowledge about climate change caused by human activities.",
};

export interface user {
  readonly userId: string;
  power: number;
  region?: Regions;
  gameCode?: string;
  completedQuestions?: boolean;
}

export enum GameStatus {
  lobby,
  questions,
  visualize,
}

export class Game {
  private _users: user[];
  private _gameCode: string;
  private _timestamp: number;
  private _availableRegions: string[];
  private _status: GameStatus;
  private _ssp: SSP;

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

    // HACK: relates to the sockets passing this around as an object and not a class
    if (availableRegions) {
      this._availableRegions = availableRegions;
    } else {
      this._availableRegions = Object.keys(Regions);
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
      Regions[randomRegion];
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
}

export interface userState {
  user: user;
  setUser: Dispatch<SetStateAction<user>>;
}

export interface gameState {
  game: Game;
  setGame: Dispatch<SetStateAction<Game>>;
}

export interface questionProps {
  question: question;
  answerCallback: (answer: answer) => void;
}

export interface question {
  title: string;
  text: string;
  img: string;
  answers: answer[];
}

export interface answer {
  text: string;
  cost: number;
  // TODO: Update when impact has been determined
  impact?: { ssp: SSP; weighting: number }[];
}

export enum SSP {
  "1-1.9" = "SSP 1-1.9",
  "1-2.6" = "SSP 1-2.6",
  "2-4.5" = "SSP 2-4.5",
  "3-7.0" = "SSP 3-7.0",
  "4-3.4" = "SSP 4-3.4",
  "4-6.0" = "SSP 4-6.0",
  "5-3.4OS" = "SSP 5-3.4OS",
  "5-8.5" = "SSP 5-8.5",
}

export const AtlasMeanTemperatureLinks = {
  [SSP["1-2.6"]]: "https://interactive-atlas.ipcc.ch/permalink/kb5pXfjf",
  [SSP["2-4.5"]]: "https://interactive-atlas.ipcc.ch/permalink/DknmXOcr",
  [SSP["3-7.0"]]: "https://interactive-atlas.ipcc.ch/permalink/l9ZvwmMd",
  [SSP["5-8.5"]]: "https://interactive-atlas.ipcc.ch/permalink/TKJP21BH",
};
