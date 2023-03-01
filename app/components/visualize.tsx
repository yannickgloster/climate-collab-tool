import { TempMaxMapRow } from "@prisma/client";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Map from "./map";
import { motion, AnimatePresence } from "framer-motion";
import Typography from "@mui/material/Typography";
import { SSP } from "@prisma/client";

import { ReactNode } from "react";

import { LineProps } from "./lineChart";
import { SSPDetails } from "../utils/details";

import LineChart from "./lineChart";

export interface VisualizeProps {
  data: {
    line: LineProps["data"];
    mapData: TempMaxMapRow[];
  };
  ssp: SSP;
}

// TODO: Refactor this mess
enum VisualizeState {
  Context,
  SSP,
  Map,
  Line,
  Other,
}

type steps = {
  [key in VisualizeState]: {
    label: string;
    content: (props: VisualizeProps) => ReactNode;
  };
};

const steps: steps = {
  [VisualizeState.Context]: {
    label: "Ireland in 100 Years",
    content: (props) => {
      return (
        <>
          <Typography variant="h3" textAlign="center" fontWeight={800}>
            100 Years from now, Ireland will look like this.
          </Typography>
        </>
      );
    },
  },
  [VisualizeState.SSP]: {
    label: "World Pathway",
    content: (props) => {
      return (
        <>
          <Typography variant="h3" textAlign="center" fontWeight={800}>
            Visualize Data: {SSPDetails[props.ssp].name}
          </Typography>
          <Typography variant="body1" textAlign="center">
            {SSPDetails[props.ssp].description}
          </Typography>
          {SSPDetails[props.ssp]?.atlasLink && (
            <Button
              variant="contained"
              size="large"
              href={SSPDetails[props.ssp]?.atlasLink}
              target="_blank"
              rel="noopener noreffer"
            >
              View Interactive Atlas
            </Button>
          )}
        </>
      );
    },
  },
  [VisualizeState.Map]: {
    label: "World Map",
    content: (props) => {
      // TODO: Make Responsive
      return (
        <Box width="1000px" border="1px dashed grey">
          <Map data={props.data.mapData} />
        </Box>
      );
    },
  },
  [VisualizeState.Line]: {
    label: "How did we get here?",
    content: (props) => {
      return <LineChart data={props.data.line} />;
    },
  },
  [VisualizeState.Other]: {
    label: "What other options were there?",
    content: (props) => {
      return (
        <>
          <Typography variant="h3" textAlign="center" fontWeight={800}>
            Here is what could have happened?
          </Typography>
        </>
      );
    },
  },
};

export default function Visualize(props: VisualizeProps) {
  const [visState, setVisState] = useState<VisualizeState>(
    VisualizeState.Context
  );

  const handleNext = () => {
    setVisState((prevVisState) => prevVisState + 1);
  };

  const handleBack = () => {
    setVisState((prevVisState) => prevVisState - 1);
  };

  const handleStep = (step) => () => {
    setVisState(step);
  };

  return (
    <>
      <Stepper activeStep={visState} alternativeLabel>
        {Object.keys(steps).map((stepKey) => {
          const step = steps[stepKey];
          return (
            <Step key={stepKey}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <IconButton disabled={visState === 0} onClick={handleBack}>
        <ArrowBackIcon />
      </IconButton>
      <IconButton
        disabled={visState === VisualizeState.Other}
        onClick={handleNext}
      >
        <ArrowForwardIcon />
      </IconButton>
      <AnimatePresence mode="wait">
        <motion.div
          key={visState}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {steps[visState].content(props)}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
