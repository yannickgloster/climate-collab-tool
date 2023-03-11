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
import { Fragment } from "react";
import Typography from "@mui/material/Typography";
import Legend from "./colorLegend";
import { Trans, t, plural } from "@lingui/macro";

// https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json
import world from "../utils/world_countries.json";
import { round } from "../utils/math";

export interface MapProps {
  data: VisualizeProps["data"]["mapData"];
}

export default function Map({ data }: MapProps) {
  const domain = [8, 60];

  const colorScale = scaleLinear()
    .domain(domain)
    // @ts-ignore: You can do colors actually
    .range(["#ffff00", "#be0000"]);

  return (
    <Fragment>
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
                const countryData = data.filter(
                  (row) => row.ISO3 === geo.id || geo.properties.ISO3
                )[0];

                const tasmax = countryData ? countryData.tasmax : -1;

                return (
                  <Tooltip
                    title={
                      <Fragment>
                        <Typography variant="inherit">
                          {geo.properties.name}
                        </Typography>
                        <Typography variant="inherit">
                          {tasmax != -1
                            ? `~ ${round(tasmax, 1)}`
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
    </Fragment>
  );
}
