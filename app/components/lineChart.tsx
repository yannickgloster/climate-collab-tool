import {
  LineChart as RechartsLineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
  TooltipProps,
  Brush,
} from "recharts";
import { styled, alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box, { BoxProps } from "@mui/material/Box";

import { useTheme } from "@mui/material/styles";
import { Trans, t, plural } from "@lingui/macro";

const TooltipBox = styled(Box)<BoxProps>(({ theme }) => ({
  backgroundColor: alpha(theme.palette.grey[700], 0.92),
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.common.white,
  padding: "4px 8px",
  fontFamily: theme.typography.pxToRem(11),
  maxWidth: 300,
  margin: 2,
  wordWrap: "break-word",
  fontWeight: theme.typography.fontWeightMedium,
}));

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, number>) => {
  if (active && payload && payload.length) {
    return (
      <TooltipBox>
        <Typography variant="body2">{t`Predicted Max Temperature in ${label}`}</Typography>
        <Typography variant="body2">{`${payload[1].value}°C`}</Typography>
      </TooltipBox>
    );
  }

  return null;
};

export interface LineProps {
  data: { date: Number; temp: Number }[];
}

// TODO: make chart more responsive
// https://recharts.org/en-US/examples/HighlightAndZoomLineChart
// Add zoom on mouse wheel event: https://codesandbox.io/s/highlight-zomm-line-chart-forked-j560ov?file=/src/index.tsx

export default function LineChart(props: LineProps) {
  const theme = useTheme();

  const temps = props.data.map<Number>((point) => point.temp);

  // TODO: Replace with d3 function
  const minDomainTemp = 35; //Math.floor(Math.min.apply(Math, temps));
  const maxDomainTemp = 60; // Math.ceil(Math.max.apply(Math, temps));

  return (
    <>
      <Typography variant="h6" textAlign="center">
        <Trans id="visualize.line.title">
          Predicted Max Temperature in Celcius
        </Trans>
      </Typography>
      <Typography variant="body1" textAlign="center">
        <Trans id="visualize.line.description">
          Based on a large amount of data modeling, this is the predicted
          maximum yearly temperature for your region. On top of the data points,
          a linear line of best fit has been included to show what trends are
          occurring.
        </Trans>
      </Typography>
      <div onWheel={(e) => console.log(e)}>
        <ResponsiveContainer width={theme.breakpoints.values.md} height={300}>
          <RechartsLineChart
            data={props.data}
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
              name={t`Best Fit Line`}
            />
            <Line
              type="monotone"
              dataKey="temp"
              stroke={theme.palette.primary.main}
              name={t`Max Temperature (°C)`}
            />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="date" />
            <Tooltip
              wrapperStyle={{ outline: "none" }}
              content={<CustomTooltip />}
            />
            <Legend iconType="plainline" />
            <YAxis domain={[minDomainTemp, maxDomainTemp]} unit="°C" />
            <Brush dataKey="date" height={20} />
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
