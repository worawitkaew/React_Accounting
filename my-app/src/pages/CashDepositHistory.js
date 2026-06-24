import {
useEffect,
useState
}
from "react";

import API_URL
from "../api";

function CashDepositHistory() {

const [deposits,
setDeposits] =
useState([]);

const [selectedSlip,
setSelectedSlip] =
useState(null);

useEffect(() => {

fetch(
`${API_URL}/cash-deposits`
)
.then((res) =>
res.json()
)
.then((data) =>
setDeposits(data)
);

}, []);

return (

<div className="admin-page">

<h1>
📜 ประวัติการฝากเงิน
</h1>

{

deposits.map(
(item) => (

<div
key={item.id}
className="product-card"
>

<h3>

รายการ
#{item.id}

</h3>

<p>

วันที่

{item.created_at}

</p>

<p>

ยอดฝาก

{item.amount}
บาท

</p>

<p>

หมายเหตุ

{item.note}

</p>

<button

className="gold-button"

onClick={() =>
setSelectedSlip(
item.slip_image
)
}

>

ดูสลิป

</button>

</div>

))

}

{

selectedSlip && (

<div
className="modal-overlay"
>

<div
className="modal-box"
>

<h2>

สลิปฝากเงิน

</h2>

<img

src={
`${API_URL}/uploads/slips/`
+
selectedSlip
}

alt="slip"

className="slip-preview"

/>

<button

className="delete-button"

onClick={() =>
setSelectedSlip(
null
)
}

>

ปิด

</button>

</div>

</div>

)

}

</div>

);

}

export default
CashDepositHistory;