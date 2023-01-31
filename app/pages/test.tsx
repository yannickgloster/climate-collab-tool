import Layout from "../components/layout";
import Visualize, { VisualizeProps } from "../components/visualize";

import { userState } from "../utils/types/game";
import useSWR from "swr";

import { fetcher } from "../utils/fetcher";

const ssp = 119;

export default function Test({ user, setUser }: userState) {
  const { data, error } = useSWR<VisualizeProps["data"]>(
    `api/data/${ssp}`,
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
