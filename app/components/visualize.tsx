import { Region, TempMaxMapRow } from "@prisma/client";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import Stack from "@mui/material/Stack";
import StepLabel from "@mui/material/StepLabel";
import Map from "./map";
import { motion, AnimatePresence } from "framer-motion";
import Typography from "@mui/material/Typography";
import { SSP } from "@prisma/client";

import { ReactNode } from "react";

import { LineProps } from "./lineChart";
import { SSPDetails } from "../utils/details";

import LineChart from "./lineChart";
import IrelandUK from "../utils/ireland_uk.json";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation,
} from "react-simple-maps";

export interface VisualizeProps {
  data: {
    line: LineProps["data"];
    mapData: TempMaxMapRow[];
  };
  ssp: SSP;
  region: Region;
}

// TODO: Refactor this mess
enum VisualizeState {
  Context,
  SSP,
  Map,
  Line,
  Other,
}

export interface stepContentProps extends VisualizeProps {
  selectedSSP: SSP;
  handleSSPChange: (event: SelectChangeEvent) => void;
  selectedData: VisualizeProps["data"];
}

type steps = {
  [key in VisualizeState]: {
    label: string;
    content: (props: stepContentProps) => ReactNode;
  };
};

const steps: steps = {
  [VisualizeState.Context]: {
    label: "Ireland's Future",
    content: (props) => {
      return (
        <>
          <Typography variant="h3" textAlign="center" fontWeight={800}>
            Ireland's Future
          </Typography>
          <Typography variant="body1" textAlign="center">
            Based off all the policy decisions made by all the players in the
            world, this is what Ireland's future might look like.
          </Typography>
          <ComposableMap
            projectionConfig={{
              rotate: [-10, 0, 0],
              center: [-18, 55],
              scale: 2400,
            }}
            height={500}
          >
            <Geographies geography={IrelandUK}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      default: {
                        fill: "#DDD",
                        outline: "none",
                      },
                      hover: {
                        fill: "#DDD",
                        outline: "none",
                      },
                      pressed: {
                        fill: "#DDD",
                        outline: "none",
                      },
                    }}
                  />
                ))
              }
            </Geographies>
            <Annotation
              subject={[-7.5029786, 53.4494762]}
              dx={-90}
              dy={-30}
              connectorProps={{
                stroke: "#FF5533",
                strokeWidth: 3,
                strokeLinecap: "round",
              }}
            >
              <text
                x="-10"
                textAnchor="end"
                alignmentBaseline="middle"
                fill="#000"
                fontFamily="Roboto"
                fontWeight={500}
                fontSize={27}
              >
                <tspan x="-10" dy="-5">
                  Temperature in Ireland
                </tspan>
                <tspan x="-10" dy="1.2em">
                  [TEMP]
                </tspan>
              </text>
            </Annotation>
            <Marker coordinates={[-7.5029786, 53.4494762]}>
              <circle r={8} fill="#F53" />
            </Marker>
          </ComposableMap>
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
            Pathway: {SSPDetails[props.ssp].name}
          </Typography>
          <Typography variant="body1" textAlign="center">
            The decisions that each region made were used to calculate what the
            world may be based off of the 8 world pathways determined by the
            IPCC.
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
        <Box margin="0 auto" width="700px" border="1px dashed grey">
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
    label: "Other pathways?",
    content: (props) => {
      return (
        <Stack
          spacing={2}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h3" textAlign="center" fontWeight={800}>
            What other pathways could occur?
          </Typography>
          <Typography variant="body1" textAlign="center">
            This wasn't the only option. Depending on how regions and countries
            collaborate to tackle climate change, there are other pathways that
            could deteriorate or improve our global outlook. You can select the
            different modelled options from the dropdown below.
          </Typography>
          <FormControl fullWidth>
            <InputLabel id="ssp-select">Pathway</InputLabel>
            <Select
              labelId="ssp-select"
              id="ssp-select"
              defaultValue={props.ssp}
              value={props.selectedSSP}
              label="Socioeconomic Pathway"
              onChange={props.handleSSPChange}
            >
              {Object.keys(SSP).map((ssp, i) => {
                return (
                  <MenuItem
                    key={ssp}
                    value={ssp}
                    divider={i != Object.keys(SSP).length - 1}
                  >
                    {SSPDetails[ssp].name} | Short Description
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Box>
            {steps[VisualizeState.Line].content({
              ...props,
              data: props.selectedData,
            })}
          </Box>
          <Box>
            {steps[VisualizeState.Map].content({
              ...props,
              data: props.selectedData,
            })}
          </Box>
          <Box>
            <Typography variant="body1" textAlign="center">
              {SSPDetails[props.selectedSSP].description}
            </Typography>
          </Box>
        </Stack>
      );
    },
  },
};

export default function Visualize(props: VisualizeProps) {
  const [visState, setVisState] = useState<VisualizeState>(
    VisualizeState.Context
  );
  const [selectedSSP, setSelectedSSP] = useState<SSP>(props.ssp);
  const [selectedData, setSelectedData] = useState<VisualizeProps["data"]>(
    props.data
  );

  const handleNext = () => {
    setVisState((prevVisState) => prevVisState + 1);
  };

  const handleBack = () => {
    setVisState((prevVisState) => prevVisState - 1);
  };

  const handleSSPChange = (event: SelectChangeEvent) => {
    const ssp = event.target.value as SSP;
    fetch(`/api/data?ssp=${ssp}&region=${props.region}`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedSSP(ssp);
        setSelectedData(data);
      })
      .catch((_error) => {});
    console.log("here");
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

      <Box sx={{ display: "flex" }}>
        <IconButton
          disabled={visState === 0}
          onClick={handleBack}
          sx={{ borderRadius: 0 }}
          size="large"
        >
          <ArrowBackIcon />
        </IconButton>
        <Box flex="90%">
          <AnimatePresence mode="wait">
            <motion.div
              initial={{
                y: 10,
                opacity: 0,
              }}
              key={visState}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {steps[visState].content({
                ...props,
                selectedSSP,
                handleSSPChange,
                selectedData,
              })}
            </motion.div>
          </AnimatePresence>
        </Box>
        <IconButton
          disabled={visState === VisualizeState.Other}
          onClick={handleNext}
          sx={{ borderRadius: 0 }}
          size="large"
        >
          <ArrowForwardIcon />
        </IconButton>
      </Box>
    </>
  );
}
