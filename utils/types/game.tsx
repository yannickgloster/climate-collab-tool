import type { Dispatch, SetStateAction } from "react";

export enum Regions {
  EU = "European Union",
  US = "United States",
  China = "China",
  SA = "South American Amazonian Countries", //  (Brazil, Columbia, Bolivia, Peru, Ecuador, Venezuela, Suriname, Guyana)
  India = "India",
  Island = "Alliance of Small Island States", // https://en.wikipedia.org/wiki/Alliance_of_Small_Island_States
}

export interface user {
  readonly userId: string;
  region?: Regions;
  gameCode?: string;
}

export interface userState {
  user: user;
  setUser: Dispatch<SetStateAction<user>>;
}
