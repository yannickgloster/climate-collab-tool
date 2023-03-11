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
import Chip from "@mui/material/Chip";

import { ReactNode } from "react";

import { LineProps } from "./lineChart";
import { RegionDetails, SSPDetails } from "../utils/details";

import LineChart from "./lineChart";
import IrelandUK from "../utils/ireland_uk.json";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation,
} from "react-simple-maps";

import { Trans, t, plural } from "@lingui/macro";

export interface VisualizeProps {
  data: {
    line: LineProps["data"];
    mapData: TempMaxMapRow[];
  };
  ssp: SSP;
  region: Region;
}

// TODO: Refactor this mess
export enum VisualizeState {
  SSP,
  Context,
  Map,
  Line,
  Other,
}

export interface stepContentProps extends VisualizeProps {
  selectedSSP: SSP;
  handleSSPChange: (event: SelectChangeEvent) => void;
  selectedRegion: Region;
  handleRegionChange: (event: SelectChangeEvent) => void;
  selectedData: VisualizeProps["data"];
  disableTitle?: boolean;
  disableSubtitle?: boolean;
}

type steps = {
  [key in VisualizeState]: {
    label: string;
    content: (props: stepContentProps) => ReactNode;
  };
};

export const steps: steps = {
  // TODO: Localize this to be based on the region of the user
  [VisualizeState.SSP]: {
    label: t({
      id: "visualize.ssp.label",
      message: "World Scenario",
    }),
    content: (props) => {
      return (
        <>
          {!props?.disableTitle && (
            <>
              <Typography variant="h3" textAlign="center" fontWeight={800}>
                <Trans id="visualize.ssp.title">
                  {SSPDetails[props.ssp].name}
                </Trans>
                {"  "}
                <Chip
                  label={SSPDetails[props.ssp].icon}
                  sx={{ backgroundColor: "#696969" }}
                />
              </Typography>
            </>
          )}
          {!props?.disableSubtitle && (
            <Typography variant="subtitle2" textAlign="center">
              <Trans id="visualize.ssp.description">
                The decisions that each region made were used to calculate what
                the world may be based off of the 8 world pathways determined by
                the IPCC.
              </Trans>
            </Typography>
          )}
          {(!props?.disableTitle || !props?.disableSubtitle) && <br />}
          <Typography variant="body1" textAlign="center">
            {SSPDetails[props.ssp].shortDescription}
          </Typography>
          <br />
          <Typography variant="body1" textAlign="center">
            {SSPDetails[props.ssp].description}
          </Typography>
        </>
      );
    },
  },
  [VisualizeState.Context]: {
    label: t({
      id: "visualize.contextualize.label",
      message: "Ireland's Future",
    }),
    content: (props) => {
      return (
        <>
          {!props?.disableTitle && (
            <Typography variant="h3" textAlign="center" fontWeight={800}>
              <Trans id="visualize.contextualize.title">Ireland's Future</Trans>
            </Typography>
          )}
          {!props?.disableSubtitle && (
            <Typography variant="subtitle2" textAlign="center">
              <Trans id="visualize.contextualize.description">
                Based off all the policy decisions made by all the players in
                the world, this is what Ireland's future might look like.
              </Trans>
            </Typography>
          )}
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
                  <Trans>Temperature in Ireland</Trans>
                </tspan>
                <tspan x="-10" dy="1.2em">
                  [TEMP] °C
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
  [VisualizeState.Map]: {
    label: t({
      id: "visualize.map.label",
      message: "World Map",
    }),
    content: (props) => {
      // TODO: Make Responsive
      return (
        <>
          {!props?.disableTitle && (
            <Typography variant="h3" textAlign="center" fontWeight={800}>
              <Trans id="visualize.map.title">World Map</Trans>
            </Typography>
          )}
          {!props?.disableSubtitle && (
            <Typography variant="subtitle2" textAlign="center">
              <Trans id="visualize.map.description">
                Hover over each country to see additional information. <br />{" "}
                Zoom in with your scroll to find smaller countries. <br />
                Click and drag to move the map around.
              </Trans>
            </Typography>
          )}
          {(!props?.disableTitle || !props?.disableSubtitle) && <br />}
          <Box margin="0 auto" width="700px">
            <Map data={props.data.mapData} />
          </Box>
        </>
      );
    },
  },
  [VisualizeState.Line]: {
    label: t({
      id: "visualize.line.label",
      message: "How did we get here?",
    }),
    content: (props) => {
      return (
        <>
          {!props?.disableTitle && (
            <Typography variant="h3" textAlign="center" fontWeight={800}>
              <Trans id="visualize.line.title">
                Predicted Max Temperature in Celcius
              </Trans>
            </Typography>
          )}
          {!props?.disableSubtitle && (
            <Typography variant="subtitle2" textAlign="center">
              <Trans id="visualize.line.description">
                Based on a large amount of data modeling, this is the predicted
                maximum yearly temperature for your region. On top of the data
                points, a linear line of best fit has been included to show what
                trends are occurring.
              </Trans>
            </Typography>
          )}
          <LineChart data={props.data.line} />
        </>
      );
    },
  },
  [VisualizeState.Other]: {
    label: t({
      id: "visualize.other.label",
      message: "Other Scenarios?",
    }),
    content: (props) => {
      return (
        <Stack
          spacing={2}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          {!props?.disableTitle && (
            <Typography variant="h3" textAlign="center" fontWeight={800}>
              <Trans id="visualize.other.title">
                What other Scenarios could occur?
              </Trans>
            </Typography>
          )}
          {!props?.disableSubtitle && (
            <Typography variant="body1" textAlign="center">
              <Trans id="visualize.other.description">
                This wasn't the only option. Depending on how regions and
                countries collaborate to tackle climate change, there are other
                pathways that could deteriorate or improve our global outlook.
                You can select the different scenarios from the dropdown below.
              </Trans>
            </Typography>
          )}
          <FormControl>
            <InputLabel id="ssp-select">
              <Trans id="visualize.other.dropdown.scenarios.label">
                Scenario
              </Trans>
            </InputLabel>
            <Select
              labelId="ssp-select"
              id="ssp-select-id"
              defaultValue={props.ssp}
              value={props.selectedSSP}
              label={t({
                id: "visualize.other.dropdown.scenarios.label",
                message: "Scenario",
              })}
              onChange={props.handleSSPChange}
            >
              {Object.keys(SSP).map((ssp, i) => {
                return (
                  <MenuItem
                    key={ssp}
                    value={ssp}
                    divider={i != Object.keys(SSP).length - 1}
                  >
                    {SSPDetails[ssp].name} | {SSPDetails[ssp].oneLine}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="region-select">
              <Trans id="visualize.other.dropdown.regions.label">Region</Trans>
            </InputLabel>
            <Select
              labelId="region-select"
              id="region-select-id"
              defaultValue={props.region}
              value={props.selectedRegion}
              label={t({
                id: "visualize.other.dropdown.regions.label",
                message: "Region",
              })}
              onChange={props.handleRegionChange}
            >
              {Object.keys(Region).map((region, i) => {
                return (
                  <MenuItem
                    key={region}
                    value={region}
                    divider={i != Object.keys(Region).length - 1}
                  >
                    {RegionDetails[region].name}
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
              {SSPDetails[props.selectedSSP].shortDescription}
            </Typography>
          </Box>
          {/* TODO: Enable after testing with TY students */}
          {/* {SSPDetails[props.selectedSSP]?.atlasLink && (
            <Button
              variant="contained"
              size="large"
              href={SSPDetails[props.selectedSSP]?.atlasLink}
              target="_blank"
              rel="noopener noreffer"
            >
              <Trans>View Interactive Atlas</Trans>
            </Button>
          )} */}
        </Stack>
      );
    },
  },
};

export default function Visualize(props: VisualizeProps) {
  const [visState, setVisState] = useState<VisualizeState>(VisualizeState.SSP);
  const [selectedSSP, setSelectedSSP] = useState<SSP>(props.ssp);
  const [selectedRegion, setSelectedRegion] = useState<Region>(props.region);

  const [selectedData, setSelectedData] = useState<VisualizeProps["data"]>(
    props.data
  );

  const handleNext = () => {
    setVisState((prevVisState) => prevVisState + 1);
  };

  const handleBack = () => {
    setVisState((prevVisState) => prevVisState - 1);
  };

  const fetchData = (ssp: SSP, region: Region) => {
    fetch(`/api/data?ssp=${ssp}&region=${region}`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedSSP(ssp);
        setSelectedRegion(region);
        setSelectedData(data);
      })
      .catch((_error) => {});
  };

  const handleRegionChange = (event: SelectChangeEvent) => {
    const region = event.target.value as Region;
    fetchData(selectedSSP, region);
  };

  const handleSSPChange = (event: SelectChangeEvent) => {
    const ssp = event.target.value as SSP;
    fetchData(ssp, selectedRegion);
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
                selectedRegion,
                handleRegionChange,
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
