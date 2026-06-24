import { useEffect, useState } from "react";
import {
Link
}
from "react-router-dom";
import API_URL from "../api";

import "./CashDeposit.css";

function CashDeposit() {

const [pendingCash,
setPendingCash] =
useState(0);

const [note,
setNote] =
useState("");

const [slipImage,
setSlipImage] =
useState(null);

const loadPendingCash =
() => {

fetch(
`${API_URL}/cash-pending`
)
.then((res) =>
res.json()
)
.then((data) => {

setPendingCash(
data.pending_cash
);

});

};

useEffect(() => {

loadPendingCash();

}, []);

const handleDeposit =
async () => {

if (!slipImage) {

alert(
"กรุณาแนบสลิป"
);

return;

}

try {

const formData =
new FormData();

formData.append(
"file",
slipImage
);

const uploadResponse =
await fetch(
`${API_URL}/upload-slip`,
{
method:"POST",
body:formData
}
);

const uploadData =
await uploadResponse.json();

const response =
await fetch(
`${API_URL}/cash-deposit`,
{
method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:JSON.stringify({

amount:
pendingCash,

slip_image:
uploadData.filename,

note:
note

})
}
);

const result =
await response.json();

if (
result.success
) {

alert(
"ฝากเงินสำเร็จ"
);

setNote("");

setSlipImage(
null
);

loadPendingCash();

}

}
catch(error){

console.error(error);

alert(
"เกิดข้อผิดพลาด"
);

}

};

return (

<div className="admin-page">

<h1>
🏦 ฝากเงินเข้าธนาคาร
</h1>

<div className="admin-card">

<h2>
เงินสดค้างฝาก
</h2>

<h1>
{pendingCash}
บาท
</h1>

<textarea

rows="4"

placeholder="หมายเหตุ"

value={note}

onChange={(e)=>

setNote(
e.target.value
)

}

/>

<input

type="file"

onChange={(e)=>

setSlipImage(
e.target.files[0]
)

}

/>

<button

className="gold-button"

onClick={
handleDeposit
}

>

ยืนยันฝากเงิน

</button>
<Link
to="/cash-deposit-history"
>

<button
className="edit-button"
>

📜 ดูประวัติการฝาก

</button>

</Link>
</div>

</div>

);

}

export default CashDeposit;