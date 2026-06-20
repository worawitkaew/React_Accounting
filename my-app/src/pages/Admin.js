import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Admin() {

  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const [name, setName] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [stock, setStock] = useState("");

  const [products, setProducts] = useState([]);
  

  const loadProducts = () => {

    fetch("http://localhost:8000/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      });

  };

  useEffect(() => {
    loadProducts();
  }, []);

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
        cost_price: Number(costPrice),
        sell_price: Number(sellPrice),
        stock: Number(stock)
      })
    })
      .then((response) => response.json())
      .then((data) => {

        alert("เพิ่มสินค้าสำเร็จ");

        setName("");

        setCostPrice("");

        setSellPrice("");

        setStock("");

        loadProducts();

        console.log(data);

      });

  };
  const handleDeleteProduct = (id) => {

  fetch(`http://localhost:8000/products/${id}`, {
    method: "DELETE"
  })
    .then((response) => response.json())
    .then((data) => {

      alert("ลบสินค้าสำเร็จ");

      loadProducts();

      console.log(data);

    });

};
const handleUpdateProduct = (item) => {

  const newName = prompt(
    "ชื่อสินค้าใหม่",
    item.name
  );

  if (!newName) {
    return;
  }

  const newPrice = prompt(
    "ราคาใหม่",
    item.price
  );

  if (!newPrice) {
    return;
  }

  fetch(`http://localhost:8000/products/${item.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: newName,
      price: Number(newPrice)
    })
  })
    .then((response) => response.json())
    .then((data) => {

      alert("แก้ไขสินค้าสำเร็จ");

      loadProducts();

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

      <br /><br />

      <input
  type="number"
  placeholder="ต้นทุน"
  value={costPrice}
  onChange={(e) => setCostPrice(e.target.value)}
/>

<br />
<br />

<input
  type="number"
  placeholder="ราคาขาย"
  value={sellPrice}
  onChange={(e) => setSellPrice(e.target.value)}
/>

<br />
<br />

<input
  type="number"
  placeholder="สต็อก"
  value={stock}
  onChange={(e) => setStock(e.target.value)}
/>

      <br /><br />

      <button onClick={handleAddProduct}>
        เพิ่มสินค้า
      </button>

      <hr />

      <h2>รายการสินค้า</h2>

      {products.map((item) => (

        <div key={item.id}>

          <p>
            {item.id}
            {" | "}
            {item.name}
            {" | ต้นทุน "}
            {item.cost_price}
            {" | ขาย "}
            {item.sell_price}
            {" | คงเหลือ "}
            {item.stock}
          </p>

          <button
            onClick={() => handleUpdateProduct(item)}
          >
            แก้ไขสินค้า
          </button>

          {" "}

          <button
            onClick={() => handleDeleteProduct(item.id)}
          >
            ลบสินค้า
          </button>

          <hr />

        </div>

      ))}

      <button onClick={handleLogout}>
        Logout
      </button>

    </div>
  );
}

export default Admin;