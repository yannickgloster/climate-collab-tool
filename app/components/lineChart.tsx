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
import { round } from "../utils/math";

const TooltipBox = styled(Box)<BoxProps>(({ theme }) => ({
  backgroundColor: alpha(theme.palette.grey[700], 0.92),
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.common.white,
  padding: "4px 8px",
  fontFamily: theme.typography.pxToRem(12),
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
        <Typography
          variant="body2"
          sx={{ fontSize: (theme) => theme.typography.pxToRem(12) }}
        >{t`Predicted Max Temperature in ${label}`}</Typography>
        <Typography
          variant="body2"
          sx={{ fontSize: (theme) => theme.typography.pxToRem(12) }}
        >{`~ ${round(payload[1].value, 1)}°C`}</Typography>
      </TooltipBox>
    );
  }

  return null;
};

export interface LineProps {
  data: { date: Number; temp: Number }[];
  variableName: string;
  minDomainTemp?: number;
  maxDomainTemp?: number;
}

// TODO: make chart more responsive
// https://recharts.org/en-US/examples/HighlightAndZoomLineChart
// Add zoom on mouse wheel event: https://codesandbox.io/s/highlight-zomm-line-chart-forked-j560ov?file=/src/index.tsx

export default function LineChart(props: LineProps) {
  const theme = useTheme();

  const temps = props.data.map<Number>((point) => point.temp);

  // TODO: Replace with d3 function
  const minDomainTemp = props.minDomainTemp
    ? props.minDomainTemp
    : Math.floor(Math.min.apply(Math, temps));
  const maxDomainTemp = props.maxDomainTemp
    ? props.maxDomainTemp
    : Math.ceil(Math.max.apply(Math, temps));

  return (
    <>
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
              name={t`Trend Line`}
            />
            <Line
              type="monotone"
              dataKey="temp"
              stroke={theme.palette.primary.main}
              name={props.variableName}
            />
            <CartesianGrid stroke="#ccc" />
            <XAxis
              dataKey="date"
              fontFamily="Roboto"
              fontSize={theme.typography.pxToRem(14)}
            />
            <Tooltip
              wrapperStyle={{ outline: "none" }}
              content={<CustomTooltip />}
            />
            <Legend
              iconType="plainline"
              formatter={(value, entry, index) => (
                <span style={{ fontFamily: "Roboto" }}>{value}</span>
              )}
            />
            <YAxis
              domain={[minDomainTemp, maxDomainTemp]}
              unit="°C"
              fontFamily="Roboto"
              fontSize={theme.typography.pxToRem(14)}
            />
            <Brush dataKey="date" height={20} />
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
