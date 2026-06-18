import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Admin() {

  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  if (role !== "admin") {
    return (
      <div>
        <h1>ไม่มีสิทธิ์เข้าใช้งาน</h1>

        <button onClick={() => navigate("/")}>
          กลับหน้าแรก
        </button>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/");
  };

  const handleAddProduct = () => {

    fetch("http://localhost:8000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        price: Number(price)
      })
    })
      .then((response) => response.json())
      .then((data) => {

        alert("เพิ่มสินค้าสำเร็จ");

        setName("");
        setPrice("");

        console.log(data);

      });

  };

  return (
    <div>

      <h1>Admin Panel</h1>

      <h2>เพิ่มสินค้า</h2>

      <input
        type="text"
        placeholder="ชื่อสินค้า"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="ราคา"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleAddProduct}>
        เพิ่มสินค้า
      </button>

      <br />
      <br />

      <button onClick={handleLogout}>
        Logout
      </button>

    </div>
  );
}

export default Admin;