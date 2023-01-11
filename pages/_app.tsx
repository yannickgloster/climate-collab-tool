import type { AppProps } from "next/app";

import { user as userType } from "../utils/types/game";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<userType>({ userId: uuidv4() });

  return <Component {...pageProps} user={user} setUser={setUser} />;
}
