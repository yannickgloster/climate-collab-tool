import { ReactNode, Children } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Regions } from "../utils/types/game";

export interface LayoutProps {
  children: ReactNode;
  region?: Regions;
  gameCode?: string;
}

export default function Layout(props: LayoutProps) {
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
          <Typography
            variant="overline"
            textAlign="right"
            position="absolute"
            top={0}
            right={0}
            fontSize={15}
          >
            Game Code: <strong>{props.gameCode}</strong>
          </Typography>
        )}
      </div>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "95vh" }}
        component={Container}
        maxWidth="lg"
      >
        {Children.map(props.children, (child) => {
          return (
            <Grid item p={1}>
              {child}
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
