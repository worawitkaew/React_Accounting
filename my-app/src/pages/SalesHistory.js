import { useEffect, useState } from "react";
import API_URL from "../api";

import TransactionDetailModal
from "../components/TransactionDetailModal";

import "./SalesHistory.css";

function SalesHistory() {

const [transactions,
setTransactions] =
useState([]);

const [
  selectedTransaction,
  setSelectedTransaction
] = useState(null);

const [
  transactionDetails,
  setTransactionDetails
] = useState([]);

const [
  selectedSlip,
  setSelectedSlip
] = useState(null);

const loadDetail =
async (transaction) => {

  const response =
    await fetch(
      `${API_URL}/transactions/${transaction.id}`
    );

  const data =
    await response.json();

  setTransactionDetails(
    data
  );

  setSelectedTransaction(
    transaction
  );

};

useEffect(() => {


fetch(
  `${API_URL}/transactions`
)
  .then((res) =>
    res.json()
  )
  .then((data) =>
    setTransactions(data)
  );


}, []);

return (


<div className="admin-page">

  <h1>
    📜 ประวัติการขาย
  </h1>
  <TransactionDetailModal

    transaction={
      selectedTransaction
    }

    details={
      transactionDetails
    }

    onClose={() =>
      setSelectedTransaction(
        null
      )
    }

  />
  {

    transactions.map(
      (item) => (

      <div
        key={item.id}
        className="product-card"
      >

        <h2>
          บิล #{item.id}
        </h2>

        <p>
          วันที่ :
          {" "}
          {item.created_at}
        </p>

        <p>
          ยอดขาย :
          {" "}
          {item.total_sell}
          {" "}
          บาท
        </p>

        <p>
          กำไร :
          {" "}
          {item.profit}
          {" "}
          บาท
        </p>

        <p>
          วิธีชำระ :
          {" "}
          {item.payment_method}
        </p>

        <button
          className="edit-button"
          onClick={() =>
            loadDetail(item)
          }
        >
          ดูรายละเอียด
        </button>

        {
          item.slip_image && (
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
          )
        }

      </div>
    
    ))

  }
{
  selectedSlip && (

    <div
      className="modal-overlay"
    >

      <div
        className="slip-modal"
      >

        <h2>

          สลิปการโอน

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

export default SalesHistory;
