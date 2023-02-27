import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
  ReferenceArea,
  TooltipProps,
  Brush,
} from "recharts";
import { DateTime } from "luxon";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import { TempMaxMapRow } from "@prisma/client";

export interface VisualizeProps {
  data: {
    line: { date: Number; temp: Number }[];
    mapData: TempMaxMapRow[];
  };
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, number>) => {
  if (active && payload && payload.length) {
    return (
      <Paper sx={{ p: 1 }}>
        <Typography variant="body2">{`Predicted Max Temperature in ${DateTime.fromMillis(
          label
        ).toLocaleString({ year: "numeric" })}`}</Typography>
        <Typography variant="body2">{`${payload[1].value}°C`}</Typography>
      </Paper>
    );
  }

  return null;
};

// TODO: make chart more responsive
// https://recharts.org/en-US/examples/HighlightAndZoomLineChart
// Add zoom on mouse wheel event: https://codesandbox.io/s/highlight-zomm-line-chart-forked-j560ov?file=/src/index.tsx

export default function Visualize(props: VisualizeProps) {
  const theme = useTheme();

  const temps = props.data.line.map<Number>((point) => point.temp);

  // TODO: Replace with d3 function
  const minDomainTemp = Math.floor(Math.min.apply(Math, temps));
  const maxDomainTemp = Math.ceil(Math.max.apply(Math, temps));

  return (
    <>
      <Typography variant="h6" textAlign="center">
        Predicted Max Temperature in Celcius
      </Typography>
      <Typography variant="body1" textAlign="center">
        Descriptive paragraph on the visualization.
      </Typography>
      <div onWheel={(e) => console.log(e)}>
        <ResponsiveContainer width={theme.breakpoints.values.md} height={300}>
          <LineChart
            data={props.data.line}
            margin={{
              top: 10,
              right: 45,
              left: 0,
              bottom: 0,
            }}
            // onMouseMove={(e) => console.log(e)}
          >
            <Line
              type="monotone"
              dataKey="linear_regression"
              stroke={theme.palette.secondary.main}
              dot={false}
              activeDot={false}
              name="Best Fit Line"
            />
            <Line
              type="monotone"
              dataKey="temp"
              stroke={theme.palette.primary.main}
              name="Max Temperature (°C)"
            />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="date" />
            <Tooltip content={<CustomTooltip />} />
            <Legend iconType="plainline" />
            <YAxis domain={[minDomainTemp, maxDomainTemp]} unit="°C" />
            <Brush
              dataKey="date"
              height={20}
              tickFormatter={(unixTime) =>
                DateTime.fromMillis(unixTime).toLocaleString({
                  year: "numeric",
                })
              }
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
