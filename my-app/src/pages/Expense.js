import { useState, useEffect } from "react";
import API_URL from "../api";
function Expense() {

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [expenses, setExpenses] = useState([]);

  const loadExpenses = () => {

    fetch(`${API_URL}/expenses`)
      .then((response) => response.json())
      .then((data) => {
        setExpenses(data);
      });

  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const handleAddExpense = () => {

    const today = new Date().toISOString().split("T")[0];

    fetch(`${API_URL}/expenses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        description: description,
        amount: Number(amount),
        created_at: today
      })
    })
      .then((response) => response.json())
      .then((data) => {

        alert("เพิ่มรายจ่ายสำเร็จ");

        setDescription("");
        setAmount("");

        loadExpenses();

        console.log(data);

      });

  };
const handleDeleteExpense = (id) => {

  fetch(`${API_URL}/expenses/${id}`, {
    method: "DELETE"
  })
    .then((response) => response.json())
    .then((data) => {

      alert("ลบรายจ่ายสำเร็จ");

      loadExpenses();

      console.log(data);

        });
    };
    const handleUpdateExpense = (item) => {

  const newDescription = prompt(
    "รายละเอียดใหม่",
    item.description
  );

  if (!newDescription) {
    return;
  }

  const newAmount = prompt(
    "จำนวนเงินใหม่",
    item.amount
  );

  if (!newAmount) {
    return;
  }

  fetch(`${API_URL}/expenses/${item.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      description: newDescription,
      amount: Number(newAmount),
      created_at: item.created_at
    })
  })
    .then((response) => response.json())
    .then((data) => {

      alert("แก้ไขรายจ่ายสำเร็จ");

      loadExpenses();

      console.log(data);

        });
    }

  return (
    <div>

      <h1>รายจ่ายร้านดาวตก</h1>

      <input
        type="text"
        placeholder="รายละเอียด"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br /><br />

      <input
        type="number"
        placeholder="จำนวนเงิน"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <br /><br />

      <button onClick={handleAddExpense}>
        เพิ่มรายจ่าย
      </button>

      <hr />

      <h2>รายการรายจ่าย</h2>

      {expenses.map((item) => (

  <div key={item.id}>

    <p>
      {item.created_at}
      {" | "}
      {item.description}
      {" | "}
      {item.amount} บาท
    </p>

    <button
  onClick={() => handleUpdateExpense(item)}
>
  แก้ไขรายจ่าย
</button>

{" "}

<button
  onClick={() => handleDeleteExpense(item.id)}
>
  ลบรายจ่าย
</button>

    <hr />

  </div>

))}

    </div>
  );
}

export default Expense;