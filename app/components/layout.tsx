import { ReactNode, Children } from "react";
import { useRouter } from "next/router";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { default as NextLink } from "next/link";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { Region } from "@prisma/client";
import { RegionDetails } from "../utils/details";
import { motion, LayoutGroup } from "framer-motion";

export interface LayoutProps {
  children: ReactNode;
  region?: Region;
  gameCode?: string;
  img?: string;
}

export default function Layout(props: LayoutProps) {
  const router = useRouter();

  const copy = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  return (
    <Box
      style={{
        backgroundImage: `url(${
          props.img ??
          "/images/eberhard-grossgasteiger-jCL98LGaeoE-unsplash.jpg"
        })`,
        backgroundPosition: "center",
        backgroundRepeat: "repeat",
        backgroundSize: "cover",
      }}
    >
      {props.region && (
        <Typography
          variant="overline"
          textAlign="left"
          position="absolute"
          top={0}
          left={0}
          fontSize={15}
          padding={1}
        >
          Region: <strong>{RegionDetails[props.region].name}</strong>
        </Typography>
      )}
      {props.gameCode && (
        <Box position="absolute" top={0} right={0} padding={1}>
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

      <Stack
        component={Container}
        justifyContent="center"
        minHeight="100vh"
        paddingTop={7.5}
        maxWidth="lg"
      >
        <Grid container alignItems="center" justifyContent="center">
          {/* TODO: Fix animation here */}
          <motion.div
            layout
            transition={{
              layout: { duration: 0.3, ease: "linear" },
            }}
          >
            <Paper sx={{ p: 2 }} elevation={3}>
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                {Children.map(props.children, (child) => {
                  return (
                    <Grid item p={1}>
                      {child}
                    </Grid>
                  );
                })}
              </Grid>
            </Paper>
          </motion.div>
        </Grid>
        <Box width="100%">
          <Typography
            variant="overline"
            textAlign="center"
            fontSize={15}
            display="block"
          >
            Built by{" "}
            <Link
              href="https://yannickgloster.com"
              target="_blank"
              rel="noopener noreffer"
            >
              Yannick Gloster
            </Link>{" "}
            |{" "}
            <Link component={NextLink} href="/sources">
              Sources
            </Link>
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}
