import { Region, SSP as PrismaSSP } from "@prisma/client";
import type { Dispatch, SetStateAction } from "react";

export enum Regions {
  EU = "European Union",
  US = "United States",
  China = "China",
  SA = "South American Amazonian Countries", //  (Brazil, Columbia, Bolivia, Peru, Ecuador, Venezuela, Suriname, Guyana)
  India = "India",
  Island = "Alliance of Small Island States", // https://en.wikipedia.org/wiki/Alliance_of_Small_Island_States
}

// TODO: Remove this translation layer between prisa enums and ts enums
export const RegionsToPrisma = {
  [Regions.EU]: Region.EU,
  [Regions.US]: Region.US,
  [Regions.China]: Region.China,
  [Regions.SA]: Region.SA,
  [Regions.India]: Region.India,
  [Regions.Island]: Region.Island,
};

export const EmisionUnits = {
  [Regions.EU]: 12,
  [Regions.US]: 22,
  [Regions.China]: 47,
  [Regions.India]: 13,
  [Regions.Island]: 1,
  [Regions.SA]: 5,
};

export const DescriptiveTooltips = {
  [Regions.SA]:
    "Brazil, Columbia, Bolivia, Peru, Ecuador, Venezuela, Suriname, and Guyana",
  [Regions.Island]:
    "Alliance of Small Island States (AOSIS) is an intergovernmental organization of 39 low-lying coastal and small island countries.",
  IPCC: "The Intergovernmental Panel on Climate Change (IPCC) is an intergovernmental body of the United Nations who's job is to advance scientific knowledge about climate change caused by human activities.",
};

export interface user {
  readonly userId: string;
  power: number; // TODO: Think about renaming this
  region?: Regions;
  gameCode?: string;
  completedQuestions?: boolean;
  emission?: number;
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

  addEmission(emission: number) {
    this._timestamp = Date.now();
    this._emission += emission;
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

// TODO: is there a way to get this directly from Prisma
export interface question {
  id: number;
  imgUrl?: string;
  topic: string;
  text: string;
  answers: answer[];
  regionWeights: regionWeights[];
}

export interface answer {
  id: number;
  text: string;
  weight: number;
  cost: number;
  questionId: number;
}

export interface regionWeights {
  region: Region;
  questionId: number;
  weight: number;
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

export const SSPToPrisma = {
  [SSP["1-1.9"]]: PrismaSSP.SSP119,
  [SSP["1-2.6"]]: PrismaSSP.SSP126,
  [SSP["2-4.5"]]: PrismaSSP.SSP245,
  [SSP["3-7.0"]]: PrismaSSP.SSP370,
  [SSP["4-3.4"]]: PrismaSSP.SSP434,
  [SSP["4-6.0"]]: PrismaSSP.SSP460,
  [SSP["5-3.4OS"]]: PrismaSSP.SSP534OS,
  [SSP["5-8.5"]]: PrismaSSP.SSP585,
};

export interface SSP_Emission {
  ssp: SSP;
  emission: number;
}

// TODO: Consider moving to DB
export const SPP_Emissions: SSP_Emission[] = [
  {
    ssp: SSP["1-1.9"],
    emission: 10,
  },
  {
    ssp: SSP["1-2.6"],
    emission: 30,
  },
  {
    ssp: SSP["2-4.5"],
    emission: 45,
  },
  {
    ssp: SSP["3-7.0"],
    emission: 60,
  },
  {
    ssp: SSP["4-3.4"],
    emission: 5,
  },
  {
    ssp: SSP["4-6.0"],
    emission: 50,
  },
  {
    ssp: SSP["5-3.4OS"],
    emission: 55,
  },
  {
    ssp: SSP["5-8.5"],
    emission: 100,
  },
];

export const AtlasMeanTemperatureLinks = {
  [SSP["1-2.6"]]: "https://interactive-atlas.ipcc.ch/permalink/kb5pXfjf",
  [SSP["2-4.5"]]: "https://interactive-atlas.ipcc.ch/permalink/DknmXOcr",
  [SSP["3-7.0"]]: "https://interactive-atlas.ipcc.ch/permalink/l9ZvwmMd",
  [SSP["5-8.5"]]: "https://interactive-atlas.ipcc.ch/permalink/TKJP21BH",
};
