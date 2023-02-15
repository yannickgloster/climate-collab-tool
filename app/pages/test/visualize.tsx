import Layout from "../../components/layout";
import Visualize, { VisualizeProps } from "../../components/visualize";

import { userState } from "../../utils/types/game";
import useSWR from "swr";

import { fetcher } from "../../utils/fetcher";

const ssp = 126;
const region = "US";

export default function VisualizeTest({ user, setUser }: userState) {
  const { data, error } = useSWR<VisualizeProps["data"]>(
    `/api/data?ssp=SSP${ssp}&region=${region}`,
    fetcher
  );

  if (error) return "An error has occurred.";
  if (!data) return "Loading...";

  return (
    <Layout>
      <p>SSP: {ssp}</p>
      <p>Region: {region}</p>
      <Visualize data={data} />
    </Layout>
  );
}
