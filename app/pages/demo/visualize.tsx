import Layout from "../../components/layout";
import { userState } from "../../utils/game";
import { useEffect, useState } from "react";
import Loading from "../../components/loading";
import LoadingError from "../../components/loadingError";
import { Region, SSP } from "@prisma/client";
import { RegionDetails } from "../../utils/details";
import Visualize, { VisualizeProps } from "../../components/visualize";

// TODO: replace with game
const ssp = SSP.SSP460;

export default function VisualizeTest({ user, setUser }: userState) {
  const [data, setData] = useState<VisualizeProps["data"]>();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const region = Region.EU;
    setUser({
      userId: "TEST",
      points: 100,
      gameCode: "TEST",
      region: region,
      emission: RegionDetails[region].emissionUnits,
    });
    fetch(`/api/data?ssp=${ssp}&region=${region}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((_error) => {
        setLoading(false);
      });
  }, []);

  if (isLoading) return <Loading />;
  if (!data) return <LoadingError href="/demo/question" />;

  return (
    <Layout gameCode={user.gameCode} region={user.region}>
      <Visualize data={data} ssp={ssp} region={user.region} />
    </Layout>
  );
}
