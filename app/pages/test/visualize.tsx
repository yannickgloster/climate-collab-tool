import Layout from "../../components/layout";
import Visualize, { VisualizeProps } from "../../components/visualize";

import { userState, SSPDetails } from "../../utils/types/game";
import useSWR from "swr";
import Typography from "@mui/material/Typography";

import { fetcher } from "../../utils/fetcher";

import { Region, SSP } from "@prisma/client";

const ssp = SSP.SSP119;
const region = Region.EU;

export default function VisualizeTest({ user, setUser }: userState) {
  const { data, error } = useSWR<VisualizeProps["data"]>(
    `/api/data?ssp=${ssp}&region=${region}`,
    fetcher
  );

  if (error) return "An error has occurred.";
  if (!data) return "Loading...";

  return (
    <Layout gameCode={"TEST"} region={region}>
      <Typography variant="h3" textAlign="center" fontWeight={800}>
        Visualize Data: {SSPDetails[ssp].name}
      </Typography>
      <Typography variant="body1" textAlign="center">
        {SSPDetails[ssp].description}
      </Typography>
      <Visualize data={data} />
    </Layout>
  );
}
