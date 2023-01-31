import Layout from "../components/layout";
import Visualize, { VisualizeProps } from "../components/visualize";

import { useEffect, useState } from "react";
import axios from "axios";

import { userState } from "../utils/types/game";

export default function Test({ user, setUser }: userState) {
  const [lineData, setLineData] = useState<VisualizeProps["data"]["line"]>();

  useEffect(() => {
    const ssp = 119;

    axios.get(`/api/data/${ssp}`).then((resp) => {
      setLineData(resp.data.line);
      console.log(resp.data.line);
    });
  }, []);

  return (
    <Layout>
      <Visualize data={{ line: lineData }} />
    </Layout>
  );
}
