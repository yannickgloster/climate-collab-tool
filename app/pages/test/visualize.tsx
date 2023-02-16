import Layout from "../../components/layout";
import Visualize, { VisualizeProps } from "../../components/visualize";

import {
  userState,
  Regions,
  SSP,
  SSPToPrisma,
  RegionsToPrisma,
} from "../../utils/types/game";
import useSWR from "swr";
import Typography from "@mui/material/Typography";

import { fetcher } from "../../utils/fetcher";

const ssp = SSP["1-1.9"];
const region = Regions.EU;

export default function VisualizeTest({ user, setUser }: userState) {
  const { data, error } = useSWR<VisualizeProps["data"]>(
    `/api/data?ssp=${SSPToPrisma[ssp]}&region=${RegionsToPrisma[region]}`,
    fetcher
  );

  if (error) return "An error has occurred.";
  if (!data) return "Loading...";

  return (
    <Layout gameCode={"TEST"} region={region}>
      <Typography variant="h3" textAlign="center" fontWeight={800}>
        Visualize Data: {ssp}
      </Typography>
      <Typography variant="body1" textAlign="center">
        SSP Description
      </Typography>
      <Visualize data={data} />
    </Layout>
  );
}
