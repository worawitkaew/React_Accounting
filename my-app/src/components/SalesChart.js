import {
ResponsiveContainer,
BarChart,
Bar,
XAxis,
YAxis,
Tooltip
}
from "recharts";

import {
useEffect,
useState
}
from "react";

import API_URL
from "../api";

function SalesChart() {

const [data,
setData] =
useState([]);

useEffect(() => {

fetch(
`${API_URL}/sales-chart`
)
.then((res) =>
res.json()
)
.then((data) =>
setData(data)
);

}, []);

return (

<div className="admin-card">

<h2>

📈 ยอดขาย 7 วันล่าสุด

</h2>

<ResponsiveContainer
width="100%"
height={300}
>

<BarChart
data={data}
>

<XAxis
dataKey="date"
/>

<YAxis />

<Tooltip />

<Bar
dataKey="total"
/>

</BarChart>

</ResponsiveContainer>

</div>

);

}

export default SalesChart;