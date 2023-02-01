import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { TooltipProps } from "recharts";
import { DateTime } from "luxon";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";

export interface VisualizeProps {
  data: {
    line: { date: Number; temp: Number }[];
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
        <Typography variant="body2">{`${payload[0].value}°C`}</Typography>
      </Paper>
    );
  }

  return null;
};

// TODO: make chart more responsive
// https://recharts.org/en-US/examples/HighlightAndZoomLineChart

export default function Visualize(props: VisualizeProps) {
  const theme = useTheme();

  return (
    <ResponsiveContainer width={1200} height={300}>
      <LineChart
        data={props.data.line}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <Line
          type="monotone"
          dataKey="temp"
          stroke={theme.palette.primary.main}
        />
        <Line
          type="monotone"
          dataKey="linear_regression"
          stroke={theme.palette.secondary.main}
          dot={false}
          activeDot={false}
        />
        <CartesianGrid stroke="#ccc" />
        <XAxis
          dataKey="date"
          tickFormatter={(unixTime) =>
            DateTime.fromMillis(unixTime).toLocaleString({ year: "numeric" })
          }
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <YAxis />
      </LineChart>
    </ResponsiveContainer>
  );
}
