import { useState, useEffect } from "react";
import "./Dashboard.css";
import API_URL from "../api";
function Dashboard() {

  const [summary, setSummary] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {

    fetch(`${API_URL}/dashboard`)
      .then((response) => response.json())
      .then((data) => {

        setSummary(data);

      });

    fetch(`${API_URL}/transactions`)
      .then((response) => response.json())
      .then((data) => {

        setTransactions(data);

      });

  }, []);

  if (!summary) {

    return (
      <div className="dashboard-page">
        <h1>Loading...</h1>
      </div>
    );

  }

  return (

    <div className="dashboard-page">

      <h1 className="dashboard-title">
        ⭐ Dashboard ร้านดาวตก
      </h1>

      <div className="summary-grid">

        <div className="summary-card">

          <h3>จำนวนบิล</h3>

          <p>
            {summary.total_transactions}
          </p>

        </div>

        <div className="summary-card">

          <h3>ยอดขายรวม</h3>

          <p>
            {summary.total_sell} บาท
          </p>

        </div>

        <div className="summary-card">

          <h3>ต้นทุนรวม</h3>

          <p>
            {summary.total_cost} บาท
          </p>

        </div>

        <div className="summary-card">

          <h3>กำไรรวม</h3>

          <p>
            {summary.total_profit} บาท
          </p>

        </div>

      </div>

      <h2 className="history-title">
        ประวัติบิล
      </h2>

      {transactions.map((item) => (

        <div
          key={item.id}
          className="transaction-card"
        >

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