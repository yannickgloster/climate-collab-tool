import Layout from "../components/layout";
import Visualize, { VisualizeProps } from "../components/visualize";

import { userState } from "../utils/types/game";
import useSWR from "swr";

import { fetcher } from "../utils/fetcher";

const ssp = 126;
const region = "US";

export default function Test({ user, setUser }: userState) {
  const { data, error } = useSWR<VisualizeProps["data"]>(
    `api/data?ssp=${ssp}&region=${region}`,
    fetcher
  );

  if (error) return "An error has occurred.";
  if (!data) return "Loading...";

  return (
    <Layout>
      <Visualize data={data} />
    </Layout>
  );
}
