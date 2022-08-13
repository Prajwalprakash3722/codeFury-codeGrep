import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
const data = [{ name: 'Page A', uv: 400, pv: 2400, amt: 2400 }, { name: 'Page A', uv: 90, pv: 4542, amt: 200 }, { name: 'Page A', uv: 153, pv: 786, amt: 2400 }, { name: 'Page A', uv: 4570, pv: 248, amt: 777 }, { name: 'Page A', uv: 90, pv: 4542, amt: 200 }];

const RenderLineChart = () => {
  return (
    // <ResponsiveContainer width={700} height="80%">
      <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <Line type="monotone" dataKey="pv" stroke="#985162" />
        <Line type="monotone" dataKey="amt" stroke="#789624" />
        <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      </LineChart>
    // </ResponsiveContainer>
  );
}

export default RenderLineChart;
