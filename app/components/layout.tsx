import { ReactNode, Children, useState, useEffect } from "react";
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
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Trans, t } from "@lingui/macro";
import Flag from "react-world-flags";
import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
import Grow from "@mui/material/Grow";
import Head from "next/head";

export interface LayoutProps {
  children: ReactNode;
  region?: Region;
  gameCode?: string;
  img?: string;
  imgs?: string[];
  progress?: number;
  index?: number;
  length?: number;
}

type LOCALES = "en" | "fr" | "pseudo";

export default function Layout(props: LayoutProps) {
  const router = useRouter();

  const copy = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  const [openLocaleSelect, setOpenLocaleSelect] = useState(false);

  const [locale, setLocale] = useState<LOCALES>(
    router.locale!.split("-")[0] as LOCALES
  );

  const languages: { [key: string]: { name: string; code: string } } = {
    en: { name: t`English`, code: "us" },
    fr: { name: t`French`, code: "fr" },
  };

  // enable 'pseudo' locale only for development environment
  if (process.env.NEXT_PUBLIC_NODE_ENV !== "production") {
    languages["pseudo"] = { name: t`Pseudo`, code: "AQ" };
  }

  return (
    <>
      <Head>
        {props.imgs &&
          props.imgs.map((img: string, i) => (
            <link key={i} rel="preload" as="image" href={img} />
          ))}
      </Head>
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
            <Trans>
              Region: <strong>{RegionDetails[props.region].name}</strong>
            </Trans>
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
              <Trans>
                Simulation Code: <strong>{props.gameCode}</strong>
              </Trans>
            </Typography>
            {router.pathname === "/lobby" && (
              <Tooltip
                title="Click to copy to clipboard!"
                placement={"bottom"}
                TransitionComponent={Grow}
                arrow
                describeChild
              >
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
              </Tooltip>
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
            {props.progress && props.index < props.length && (
              <Box
                height="8px"
                mb="4px"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Box sx={{ width: "100%", mr: 1 }}>
                  <LinearProgress
                    sx={{ borderRadius: "2px", height: "8px" }}
                    variant="determinate"
                    value={props.progress}
                  />
                </Box>
                <Box
                  sx={{ minWidth: 60 }}
                  component={Paper}
                  elevation={3}
                  pl={1}
                  pr={1}
                >
                  <Typography variant="overline">
                    {props.index + 1} of {props.length}{" "}
                  </Typography>
                </Box>
              </Box>
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
          <Box
            position="absolute"
            sx={{
              position: "fixed",
              bottom: (theme) => theme.spacing(2),
              right: (theme) => theme.spacing(2),
            }}
          >
            <Fab
              variant="extended"
              size="medium"
              color="primary"
              onClick={() => {
                setOpenLocaleSelect(true);
              }}
            >
              <Flag
                code={languages[locale as unknown as LOCALES].code}
                height="18"
              />
            </Fab>
          </Box>
          <Dialog
            onClose={() => setOpenLocaleSelect(false)}
            open={openLocaleSelect}
          >
            <DialogTitle>
              <Trans>Select Language</Trans>
            </DialogTitle>
            <List sx={{ pt: 0 }}>
              {Object.keys(languages).map((locale) => {
                const lang = languages[locale as unknown as LOCALES];
                return (
                  <ListItem disableGutters key={locale}>
                    <ListItemButton
                      onClick={() => {
                        setLocale(locale as LOCALES);
                        setOpenLocaleSelect(false);
                        router.push(router.pathname, router.pathname, {
                          locale,
                        });
                      }}
                    >
                      <ListItemAvatar>
                        <Flag code={lang.code} height="24" />
                      </ListItemAvatar>
                      <ListItemText primary={lang.name} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Dialog>
          <footer>
            <Box width="100%">
              <Typography
                variant="overline"
                textAlign="center"
                fontSize={15}
                display="block"
              >
                <Trans id={"footer"}>
                  Built by{" "}
                  <Link
                    href="https://yannickgloster.com"
                    target="_blank"
                    rel="noopener noreffer"
                  >
                    Yannick Gloster
                  </Link>{" "}
                  |{" "}
                  <Link component={NextLink} href="/sources" target="_blank">
                    Sources
                  </Link>
                </Trans>
              </Typography>
            </Box>
          </footer>
        </Stack>
      </Box>
    </>
  );
}
