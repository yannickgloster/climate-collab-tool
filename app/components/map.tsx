import WorldCountries from "../utils/world_countries.json";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Graticule,
} from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import Tooltip from "@mui/material/Tooltip";

const colorScale = scaleLinear()
  .domain([0, 400])
  // @ts-ignore: You can do colors actually
  .range(["#ffedea", "#ff5233"]);

// Could be used for the Geographies
const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

export default function Map() {
  return (
    <ComposableMap
      projectionConfig={{
        rotate: [-10, 0, 0],
        scale: 147,
      }}
    >
      <ZoomableGroup center={[0, 0]} zoom={1}>
        <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
        <Geographies geography={WorldCountries.features}>
          {({ geographies }) =>
            geographies.map((geo, i) => {
              return (
                <Tooltip
                  title={geo.properties.name}
                  followCursor
                  key={geo.rsmKey}
                >
                  <Geography
                    geography={geo}
                    style={{
                      default: {
                        fill: colorScale(i).toString(),
                        outline: "none",
                      },
                      hover: {
                        fill: colorScale(i + 75).toString(),
                        outline: "none",
                      },
                      pressed: {
                        fill: colorScale(i + 75).toString(),
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
  );
}
