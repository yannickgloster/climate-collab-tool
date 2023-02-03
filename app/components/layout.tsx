import { ReactNode, Children } from "react";
import { useRouter } from "next/router";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { Regions } from "../utils/types/game";
import Paper from "@mui/material/Paper";

export interface LayoutProps {
  children: ReactNode;
  region?: Regions;
  gameCode?: string;
  img?: string;
}

export default function Layout(props: LayoutProps) {
  const router = useRouter();

  const copy = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  return (
    <>
      <div style={{ position: "relative" }}>
        {props.region && (
          <Typography
            variant="overline"
            textAlign="left"
            position="absolute"
            top={0}
            left={0}
            fontSize={15}
          >
            {/* TODO: Add Region Icon */}
            Region: <strong>{props.region}</strong>
          </Typography>
        )}
        {props.gameCode && (
          <Box position="absolute" top={0} right={0}>
            <Typography
              variant="overline"
              textAlign="right"
              fontSize={15}
              display="block"
              onClick={() => copy(props.gameCode)}
            >
              Game Code: <strong>{props.gameCode}</strong>
            </Typography>
            {router.pathname === "/lobby" && (
              <Typography
                component={Link}
                textAlign="right"
                fontSize={15}
                underline="hover"
                display="block"
                onClick={() =>
                  copy(`${window.location.origin}?join=${props.gameCode}`)
                }
              >
                {window.location.origin}?join={props.gameCode}
              </Typography>
            )}
          </Box>
        )}
      </div>
      <div
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          backgroundImage: `url(${
            props.img
              ? props.img
              : // Fallback image
                "/images/eberhard-grossgasteiger-jCL98LGaeoE-unsplash.jpg"
          })`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          top: 0,
          left: 0,
          zIndex: -99,
        }}
      />
      <Grid
        container
        style={{ minHeight: "95vh" }}
        component={Container}
        maxWidth="lg"
        alignItems="center"
        justifyContent="center"
      >
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          component={Paper}
          sx={{ p: 2 }}
          elevation={3}
        >
          {Children.map(props.children, (child) => {
            return (
              <Grid item p={1}>
                {child}
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </>
  );
}
