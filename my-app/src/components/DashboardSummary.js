import { useEffect, useState }
from "react";

import API_URL from "../api";

function DashboardSummary() {

const [data,setData] =
useState(null);

useEffect(() => {

fetch(
`${API_URL}/dashboard`
)
.then((res) =>
res.json()
)
.then((data) =>
setData(data)
);

}, []);

if (!data)
return <p>Loading...</p>;

return (

<div className="summary-grid">

<div className="summary-card">

<h3>
ยอดขายวันนี้
</h3>

<p>
{data.total_sell}
บาท
</p>

</div>

<div className="summary-card">

<h3>
กำไรวันนี้
</h3>

<p>
{data.total_profit}
บาท
</p>

</div>

<div className="summary-card">

<h3>
เงินสด
</h3>

<p>
{data.cash_today}
บาท
</p>

</div>

<div className="summary-card">

<h3>
เงินโอน
</h3>

<p>
{data.transfer_today}
บาท
</p>

</div>

<div className="summary-card">

<h3>
จำนวนบิล
</h3>

<p>
{data.total_bill}
บิล
</p>

</div>

</div>

);

}

export default DashboardSummary;