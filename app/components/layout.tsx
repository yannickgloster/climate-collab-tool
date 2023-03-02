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
import { motion } from "framer-motion";
import LinearProgress from "@mui/material/LinearProgress";

export interface LayoutProps {
  children: ReactNode;
  region?: Region;
  gameCode?: string;
  img?: string;
  progress?: number;
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
        <motion.div
          layout
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {props.progress && props.progress < 100 && (
            <LinearProgress
              sx={{ mb: "4px", borderRadius: "2px", height: "8px" }}
              variant="determinate"
              value={props.progress}
            />
          )}
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            component={Paper}
            sx={{ p: 2 }}
            elevation={3}
          >
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
          </Grid>
        </motion.div>
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
