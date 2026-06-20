import { useState, useEffect } from "react";

function Dashboard() {

  const [summary, setSummary] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {

    fetch("http://localhost:8000/dashboard")
      .then((response) => response.json())
      .then((data) => {

        setSummary(data);

      });

    fetch("http://localhost:8000/transactions")
      .then((response) => response.json())
      .then((data) => {

        setTransactions(data);

      });

  }, []);

  if (!summary) {

    return <h1>Loading...</h1>;

  }

  return (
    <div>

      <h1>Dashboard ร้านดาวตก</h1>

      <hr />

      <h2>
        จำนวนบิล : {summary.total_transactions}
      </h2>

      <h2>
        ยอดขายรวม : {summary.total_sell} บาท
      </h2>

      <h2>
        ต้นทุนรวม : {summary.total_cost} บาท
      </h2>

      <h2>
        กำไรรวม : {summary.total_profit} บาท
      </h2>

      <hr />

      <h2>ประวัติบิล</h2>

      {transactions.map((item) => (

        <div key={item.id}>

          <p>

            บิล #{item.id}

            {" | "}

            {item.created_at}

            {" | ขาย "}

            {item.total_sell}

            {" บาท | กำไร "}

            {item.profit}

            {" บาท"}

          </p>

        </div>

      ))}

    </div>
  );
}

export default Dashboard;