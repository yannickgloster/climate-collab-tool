import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";

export interface VisualizeProps {
  data: { line: [] }; // TODO: Make more typed
}

export default function Visualize(props: VisualizeProps) {
  return (
    <>
      <LineChart width={600} height={300} data={props.data.line}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        {/* <CartesianGrid stroke="#ccc" /> */}
        <XAxis dataKey="name" />
        <YAxis />
      </LineChart>
    </>
  );
}
