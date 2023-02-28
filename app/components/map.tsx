import WorldCountries from "../utils/world_countries.json";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Graticule,
} from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import { extent } from "d3-array";
import Tooltip from "@mui/material/Tooltip";
import { VisualizeProps } from "./visualize";
import { Fragment } from "react";
import Typography from "@mui/material/Typography";
import Legend from "./colorLegend";

export interface MapProps {
  data: VisualizeProps["data"]["mapData"];
}

// Could be used for the Geographies
const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

const KELVIN_CELSIUS_DIFF = 273.15;

export default function Map({ data }: MapProps) {
  const domain = extent(
    data.map((d) => {
      if (d.tasmax != -1) {
        return d.tasmax;
      }
    })
  );

  const colorScale = scaleLinear()
    .domain(domain)
    // @ts-ignore: You can do colors actually
    .range(["#ffedea", "#ff5233"]);

  return (
    <Fragment>
      <ComposableMap
        projectionConfig={{
          rotate: [-10, 0, 0],
          scale: 147,
        }}
      >
        <ZoomableGroup center={[0, 0]} zoom={1}>
          <Graticule stroke="#88898a" strokeWidth={0.5} />
          <Geographies geography={WorldCountries.features}>
            {({ geographies }) =>
              geographies.map((geo, i) => {
                // TODO: instead of maping an array, use a hashmap that is generated on the serverside
                // TODO: this data is buggy af figure where the hell the bug is
                const countryData = data.filter(
                  (row) => row.ISO3 === geo.id
                )[0];

                const tasmax = countryData ? countryData.tasmax : -1;

                // TODO: move to serverside
                const tasmax_c =
                  Math.round(
                    (tasmax - KELVIN_CELSIUS_DIFF + Number.EPSILON) * 10000
                  ) / 10000;

                return (
                  <Tooltip
                    title={
                      <Fragment>
                        <Typography variant="inherit">
                          {geo.properties.name}
                        </Typography>
                        <Typography variant="inherit">{tasmax_c} °C</Typography>
                        <Typography variant="inherit">{geo.id}</Typography>
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
                            tasmax != -1
                              ? colorScale(tasmax).toString()
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
      <svg
        dangerouslySetInnerHTML={{
          __html: Legend(colorScale, {
            title: "Temperature (°K)",
          }).innerHTML,
        }}
        height={50}
      />
    </Fragment>
  );
}
