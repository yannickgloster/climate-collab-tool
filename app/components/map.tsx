import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Graticule,
  GeographyProps,
  Sphere,
} from "react-simple-maps";

import { scaleLinear } from "d3-scale";
import { extent } from "d3-array";
import Tooltip from "@mui/material/Tooltip";
import { VisualizeProps } from "./visualize";
import { Fragment, useState } from "react";
import Typography from "@mui/material/Typography";
import Legend from "./colorLegend";
import { Trans, t, plural } from "@lingui/macro";

import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";

// https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json
import world from "../utils/world_countries.json";
import { round } from "../utils/math";

export interface MapProps {
  data: VisualizeProps["data"]["mapData"];
}

type DATATYPES = "temp_map_rows" | "temp_max_map_rows";

// TODO: Bad practiice, refactor
const selectOptions = {
  temp_map_rows: t`Mean Temperature`,
  temp_max_map_rows: t`Max Temperature over 100 years`,
};

export default function Map({ data }: MapProps) {
  const [selectedData, setSelectedData] = useState<any[]>(data.temp_map_rows);
  const [selectedDataMenu, setSelectedDataMenu] =
    useState<DATATYPES>("temp_map_rows");

  const domain = [8, 60];

  const colorScale = scaleLinear()
    .domain(domain)
    // @ts-ignore: You can do colors actually
    .range(["#ffff00", "#be0000"]);

  const handleDataSelect = (event: SelectChangeEvent) => {
    setSelectedData(data[event.target.value as string]);
    setSelectedDataMenu(event.target.value as DATATYPES);
  };

  return (
    <Fragment>
      <Box
        pb={2}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FormControl>
          <InputLabel id="select-data-label">
            <Trans>Variable</Trans>
          </InputLabel>
          <Select
            labelId="select-data-label"
            id="select-data"
            value={selectedDataMenu}
            label="Variable"
            onChange={handleDataSelect}
          >
            {Object.keys(selectOptions).map((option) => (
              <MenuItem key={option} value={option}>
                {selectOptions[option]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <svg
        dangerouslySetInnerHTML={{
          __html: Legend(colorScale, {
            title: t`Temperature (°C)`,
          }).innerHTML,
        }}
        height={50}
        display="block"
        style={{ margin: "0 auto" }}
      />

      <ComposableMap
        projectionConfig={{
          rotate: [-10, 0, 0],
          scale: 147,
        }}
      >
        <ZoomableGroup center={[0, 0]} zoom={1}>
          <Sphere stroke="#88898a" strokeWidth={2} id="outline" fill="#fff" />
          <Graticule stroke="#88898a" strokeWidth={0.5} />
          <Geographies geography={world.features}>
            {({ geographies }) =>
              geographies.map((geo, i) => {
                // TODO: instead of maping an array, use a hashmap that is generated on the serverside
                const countryData = selectedData.filter(
                  (row) => row.ISO3 === geo.id || geo.properties.ISO3
                )[0];

                let temp = -1;
                if (countryData && countryData?.tasmax) {
                  temp = countryData.tasmax;
                }
                if (countryData && countryData?.tas) {
                  temp = countryData.tas;
                }

                return (
                  <Tooltip
                    title={
                      <Fragment>
                        <Typography variant="inherit">
                          {geo.properties.name}
                        </Typography>
                        <Typography variant="inherit">
                          {temp != -1
                            ? `~ ${round(temp, 1)}`
                            : t`Data precision too low`}{" "}
                          °C
                        </Typography>
                      </Fragment>
                    }
                    followCursor
                    key={geo.rsmKey}
                  >
                    <Geography
                      geography={geo}
                      style={{
                        default: {
                          fill:
                            temp != -1
                              ? colorScale(temp).toString()
                              : "#808080",
                          outline: "none",
                        },
                        hover: {
                          // fill: colorScale(i + 75).toString(),
                          outline: "none",
                        },
                        pressed: {
                          // fill: colorScale(i + 75).toString(),
                          outline: "none",
                        },
                      }}
                    />
                  </Tooltip>
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </Fragment>
  );
}
