import { Region, SSP, Model } from "@prisma/client";
import type { Dispatch, SetStateAction } from "react";

type RegionDetails = {
  [key in Region]: {
    name: string;
    description: string;
  };
};

export const RegionDetails: RegionDetails = {
  [Region.EU]: {
    name: "European Union",
    description:
      "The European Union (EU) is a political and economic union of 27 member states that are located primarily in Europe.",
  },
  [Region.US]: {
    name: "United States of America",
    description:
      "A country primarily located in North America consisting of 50 states.",
  },
  [Region.China]: {
    name: "China",
    description:
      "A country in East Asia with a population exceeding 1.4 billion, the most in the world.",
  },
  [Region.SA]: {
    name: "South American Amazonian Countries",
    description:
      "The following group of countries: Brazil, Columbia, Bolivia, Peru, Ecuador, Venezuela, Suriname, and Guyana.",
  },
  [Region.India]: {
    name: "India",
    description:
      "A country in South Asia where it is the seventh-largest country by area, the second-most populous country, and the most populous democracy in the world.",
  },
  [Region.Island]: {
    name: "Alliance of Small Island States",
    description:
      "Alliance of Small Island States (AOSIS) is an intergovernmental organization of 39 low-lying coastal and small island countries.",
  },
};

type SSPDetails = {
  [key in SSP]: {
    name: string;
    description: string;
  };
};

// Descriptions from: https://confluence.ecmwf.int/display/CKB/CMIP6%253A+Global+climate+projections
export const SSPDetails: SSPDetails = {
  [SSP.SSP119]: {
    name: "SSP 1-1.9",
    description:
      "SSP1-1.9 is a scenario experiment extending into the near future from 2015 to 2100, it is performed with a coupled atmosphere-ocean general circulation model (AOGCM). The forcing for the CMIP6 SSP experiments is derived from shared socioeconomic pathways (SSPs), a set of emission scenarios driven by different socioeconomic assumptions, paired with representative concentration pathways (RCPs), global forcing pathways which lead to specific end of century radiative forcing targets. SSP1-1.9 is based on SSP1 with low climate change mitigation and adaptation challenges and RCP1.9, a future pathway with a radiative forcing of 1.9 W/m2 in the year 2100. The SSP1-1.9 scenario fills a gap at the very low end of the range of plausible future forcing pathways. SSP1-1.9 forcing will be substantially below SSP1-2.6 in 2100. There is policy interest in low-forcing scenarios that would inform a possible goal of limiting global mean warming to 1.5°C above pre-industrial levels based on the Paris COP21 agreement.",
  },
  [SSP.SSP126]: {
    name: "SSP 1-2.6",
    description:
      "SSP1-2.6 is a scenario experiment extending into the near future from 2015 to 2100, it is performed with a coupled atmosphere-ocean general circulation model (AOGCM). The forcing for the CMIP6 SSP experiments is derived from shared socioeconomic pathways (SSPs), a set of emission scenarios driven by different socioeconomic assumptions, paired with representative concentration pathways (RCPs), global forcing pathways which lead to specific end of century radiative forcing targets. SSP1-2.6 is based on SSP1 with low climate change mitigation and adaptation challenges and RCP2.6, a future pathway with a radiative forcing of 2.6 W/m2 in the year 2100. The SSP1-2.6 scenario represents the low end of plausible future forcing pathways. SSP1-2.6 depicts a 'best case' future from a sustainability perspective.",
  },
  [SSP.SSP245]: {
    name: "SSP 2-4.5",
    description:
      "SSP2-4.5 is a scenario experiment extending into the near future from 2015 to 2100, it is performed with a coupled atmosphere-ocean general circulation model (AOGCM). The forcing for the CMIP6 SSP experiments is derived from shared socioeconomic pathways (SSPs), a set of emission scenarios driven by different socioeconomic assumptions, paired with representative concentration pathways (RCPs), global forcing pathways which lead to specific end of century radiative forcing targets. SSP2-4.5 is based on SSP2 with intermediate climate change mitigation and adaptation challenges and RCP4.5, a future pathway with a radiative forcing of 4.5 W/m2 in the year 2100. The ssp245 scenario represents the medium part of plausible future forcing pathways. SSP2-4.5 is comparable to the CMIP5 experiment RCP4.5.",
  },
  [SSP.SSP370]: {
    name: "SSP 3-7.0",
    description:
      "SSP3-7.0 is a scenario experiment extending into the near future from 2015 to 2100, it is performed with a coupled atmosphere-ocean general circulation model (AOGCM). The forcing for the CMIP6 SSP experiments is derived from shared socioeconomic pathways (SSPs), a set of emission scenarios driven by different socioeconomic assumptions, paired with representative concentration pathways (RCPs), global forcing pathways which lead to specific end of century radiative forcing targets. SSP3-7.0 is based on SSP3 in which climate change mitigation and adaptation challenges are high and RCP7.0, a future pathway with a radiative forcing of 7.0 W/m2 in the year 2100. The SSP3-7.0 scenario represents the medium to high end of plausible future forcing pathways. SSP3-7.0 fills a gap in the CMIP5 forcing pathways that is particularly important because it represents a forcing level common to several (unmitigated) SSP baseline pathways.",
  },
  [SSP.SSP434]: {
    name: "SSP 4-3.4",
    description:
      "SSP4-3.4 is a scenario experiment extending into the near future from 2015 to 2100, it is performed with a coupled atmosphere-ocean general circulation model (AOGCM). The forcing for the CMIP6 SSP experiments is derived from shared socioeconomic pathways (SSPs), a set of emission scenarios driven by different socioeconomic assumptions, paired with representative concentration pathways (RCPs), global forcing pathways which lead to specific end of century radiative forcing targets. SSP4-3.4 is based on SSP4 in which climate change adaptation challenges dominate and RCP3.4, a future pathway with a radiative forcing of 3.4 W/m2 in the year 2100. The SSP4-3.4 scenario fills a gap at the low end of the range of plausible future forcing pathways. SSP4-3.4 is of interest to mitigation policy since mitigation costs differ substantially between forcing levels of 4.5 W/m2 and 2.6 W/m2.",
  },
  [SSP.SSP460]: {
    name: "SSP 4-6.0",
    description:
      "SSP4-6.0 is a scenario experiment extending into the near future from 2015 to 2100, it is performed with a coupled atmosphere-ocean general circulation model (AOGCM). The forcing for the CMIP6 SSP experiments is derived from shared socioeconomic pathways (SSPs), a set of emission scenarios driven by different socioeconomic assumptions, paired with representative concentration pathways (RCPs), global forcing pathways which lead to specific end of century radiative forcing targets. SSP4-6.0 is based on SSP4 in which climate change adaptation challenges dominate and RCP6.0, a future pathway with a radiative forcing of 6.0 W/m2 in the year 2100. The SSP4-6.0 scenario fills in the range of medium plausible future forcing pathways. SSP4-6.0 defines the low end of the forcing range for unmitigated SSP baseline scenarios.",
  },
  [SSP.SSP534OS]: {
    name: "SSP 5-3.4OS",
    description:
      "SSP5-3.4OS is a scenario experiment with simulations beginning in the mid-21st century running from 2040 to 2100, it is performed with a coupled atmosphere-ocean general circulation model (AOGCM). The forcing for the CMIP6 SSP experiments is derived from shared socioeconomic pathways (SSPs), a set of emission scenarios driven by different socioeconomic assumptions, paired with representative concentration pathways (RCPs), global forcing pathways which lead to specific end of century radiative forcing targets. SSP5-3.4OS is based on SSP5 in which climate change mitigation challenges dominate and RCP3.4-over, a future pathway with a peak and decline in forcing towards an eventual radiative forcing of 3.4 W/m2 in the year 2100. The SSP5-3.4OS scenario branches from SSP5-8.5 in the year 2040 whereupon it applies substantially negative net emissions. SSP5-3.4OS explores the climate science and policy implications of a peak and decline in forcing during the 21st century. SSP5-3.4OS fills a gap in existing climate simulations by investigating the implications of a substantial overshoot in radiative forcing relative to a longer-term target.",
  },
  [SSP.SSP585]: {
    name: "SSP 5-8.5",
    description:
      "SSP5-8.5 is a scenario experiment extending into the near future from 2015 to 2100, it is performed with a coupled atmosphere-ocean general circulation model (AOGCM). The forcing for the CMIP6 SSP experiments is derived from shared socioeconomic pathways (SSPs), a set of emission scenarios driven by different socioeconomic assumptions, paired with representative concentration pathways (RCPs), global forcing pathways which lead to specific end of century radiative forcing targets. SSP5-8.5 is based on SSP5 in which climate change mitigation challenges dominate and RCP8.5, a future pathway with a radiative forcing of 8.5 W/m2 in the year 2100. The ssp585 scenario represents the high end of plausible future forcing pathways.  SSP5-8.5 is comparable to the CMIP5 experiment RCP8.5.",
  },
};

type ModelDetails = {
  [key in Model]: {
    name: string;
    modelingCenter: string;
    description: string;
  };
};

// From https://confluence.ecmwf.int/display/CKB/CMIP6%253A+Global+climate+projections
export const ModelDetails: ModelDetails = {
  [Model.CNRM_CM6_1]: {
    name: "CNRM-CM6-1",
    modelingCenter:
      "CNRM-CERFACS (National Center for Meteorological Research, Météo-France and CNRS laboratory, Climate Modeling and Global change)",
    description:
      "The model includes the components: aerosol: prescribed monthly fields computed by TACTIC_v2 scheme, atmos: Arpege 6.3 (T127; Gaussian Reduced with 24572 grid points in total distributed over 128 latitude circles (with 256 grid points per latitude circle between 30degN and 30degS reducing to 20 grid points per latitude circle at 88.9degN and 88.9degS); 91 levels; top-level 78.4 km), atmosChem: OZL_v2, land: Surfex 8.0c, ocean: Nemo 3.6 (eORCA1, tripolar primarily 1deg; 362 x 294 longitude/latitude; 75 levels; top grid cell 0-1 m), seaIce: Gelato 6.1. The model was run in native nominal resolutions: aerosol: 250 km, atmos: 250 km, atmosChem: 250 km, land: 250 km, ocean: 100 km, seaIce: 100 km.",
  },
  [Model.CNRM_ESM2_1]: {
    name: "CNRM-ESM2-1",
    modelingCenter:
      "CNRM-CERFACS (National Center for Meteorological Research, Météo-France and CNRS laboratory, Climate Modeling and Global change)",
    description:
      "The model includes the components: aerosol: TACTIC_v2, atmos: Arpege 6.3 (T127; Gaussian Reduced with 24572 grid points in total distributed over 128 latitude circles (with 256 grid points per latitude circle between 30degN and 30degS reducing to 20 grid points per latitude circle at 88.9degN and 88.9degS); 91 levels; top-level 78.4 km), atmosChem: REPROBUS-C_v2, land: Surfex 8.0c, ocean: Nemo 3.6 (eORCA1, tripolar primarily 1deg; 362 x 294 longitude/latitude; 75 levels; top grid cell 0-1 m), ocnBgchem: Pisces 2.s, seaIce: Gelato 6.1. The model was run in native nominal resolutions: aerosol: 250 km, atmos: 250 km, atmosChem: 250 km, land: 250 km, ocean: 100 km, ocnBgchem: 100 km, seaIce: 100 km.",
  },
};

export const EmisionUnits = {
  [Region.EU]: 12,
  [Region.US]: 22,
  [Region.China]: 47,
  [Region.India]: 13,
  [Region.Island]: 1,
  [Region.SA]: 5,
};

export const DescriptiveTooltips = {
  [Region.SA]:
    "Brazil, Columbia, Bolivia, Peru, Ecuador, Venezuela, Suriname, and Guyana",
  [Region.Island]:
    "Alliance of Small Island States (AOSIS) is an intergovernmental organization of 39 low-lying coastal and small island countries.",
  IPCC: "The Intergovernmental Panel on Climate Change (IPCC) is an intergovernmental body of the United Nations who's job is to advance scientific knowledge about climate change caused by human activities.",
};

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

export interface SSP_Emission {
  ssp: SSP;
  emission: number;
}

// TODO: Consider moving to DB
export const SPP_Emissions: SSP_Emission[] = [
  {
    ssp: SSP.SSP119,
    emission: 10,
  },
  {
    ssp: SSP.SSP126,
    emission: 30,
  },
  {
    ssp: SSP.SSP245,
    emission: 45,
  },
  {
    ssp: SSP.SSP370,
    emission: 60,
  },
  {
    ssp: SSP.SSP434,
    emission: 5,
  },
  {
    ssp: SSP.SSP460,
    emission: 50,
  },
  {
    ssp: SSP.SSP534OS,
    emission: 55,
  },
  {
    ssp: SSP.SSP585,
    emission: 100,
  },
];

export const AtlasMeanTemperatureLinks = {
  [SSP.SSP126]: "https://interactive-atlas.ipcc.ch/permalink/kb5pXfjf",
  [SSP.SSP245]: "https://interactive-atlas.ipcc.ch/permalink/DknmXOcr",
  [SSP.SSP370]: "https://interactive-atlas.ipcc.ch/permalink/l9ZvwmMd",
  [SSP.SSP585]: "https://interactive-atlas.ipcc.ch/permalink/TKJP21BH",
};
