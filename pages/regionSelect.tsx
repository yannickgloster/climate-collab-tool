import Head from "next/head";
import Layout from "../components/layout";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Regions } from "../utils/types/game";

import { useEffect, useState } from "react";
import { userState } from "../utils/types/game";
import { useRouter } from "next/router";

import { socket } from "./_app";
import { socketEvent } from "../utils/socketHandler";

export default function RegionSelect({ user, setUser }: userState) {
  const [selectedRegion, setSelectedRegion] = useState("");
  const router = useRouter();

  const onRegionSelect = (region: Regions) => {
    setSelectedRegion(region);
    setUser({ ...user, region: region });
  };

  useEffect(() => {
    if (!user?.gameCode) {
      // TODO: Add error handling for going to a page without a gamecode
      router.push("/");
    }
  });

  const testRoom = () => {
    socket.emit(
      socketEvent.test_room,
      user,
      user.gameCode,
      "TEST MESSAGE WOOO"
    );
  };

  return (
    <>
      <Head>
        <title>Thesis</title>
        <meta name="description" content="TODO: Write Description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Typography variant="overline">Game Code: {user.gameCode}</Typography>
        <Button
          variant="contained"
          size="large"
          onClick={testRoom}
          data-cy="testRoomButton"
        >
          Test Room
        </Button>
        <Typography variant="h3" textAlign="center">
          Select Region
        </Typography>
        <Typography variant="subtitle1" textAlign="center">
          This is the description.
        </Typography>
        <Stack spacing={2}>
          {Object.keys(Regions).map((r) => {
            const region = Regions[r];
            return (
              <Stack direction="row" spacing={2} key={r}>
                <Typography variant="h6" textAlign="center">
                  {region}
                </Typography>
                {/* disabled={true} for when others select the country*/}
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => onRegionSelect(region)}
                  color={selectedRegion == region ? "success" : "primary"}
                >
                  Select{selectedRegion == region ? "ed" : ""} Region
                </Button>
              </Stack>
            );
          })}
        </Stack>
      </Layout>
    </>
  );
}
