import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import * as React from "react";

export interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout(props: LayoutProps) {
  return (
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
      <Grid item>{props.children}</Grid>
    </Grid>
  );
}
