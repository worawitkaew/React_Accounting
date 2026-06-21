import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Admin.css";
import API_URL from "../api";
function Admin() {

  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const [name, setName] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState(null);
  const [products, setProducts] = useState([]);

  const handleChangeImage = async (id) => {

  const input =
    document.createElement("input");

  input.type = "file";

  input.accept = "image/*";

  input.onchange = async (e) => {

    const file =
      e.target.files[0];

    if (!file) return;

    const formData =
      new FormData();

    formData.append(
      "file",
      file
    );

    try {

      const response =
        await fetch(
          `${API_URL}/products/${id}/image`,
          {
            method: "PUT",
            body: formData
          }
        );

      await response.json();

      alert(
        "เปลี่ยนรูปสำเร็จ"
      );

      loadProducts();

    } catch (error) {

      console.error(error);

      alert(
        "เปลี่ยนรูปไม่สำเร็จ"
      );

    }

  };

  input.click();

};
  const loadProducts = () => {

    fetch(`http://localhost:8000/products`)
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

      <div className="admin-page">

        <h1>ไม่มีสิทธิ์เข้าใช้งาน</h1>

        <button
          className="gold-button"
          onClick={() => navigate("/")}
        >
          กลับหน้าแรก
        </button>

      </div>

    );

  }

  const handleLogout = () => {

    localStorage.removeItem("role");

    navigate("/");

  };

  const handleAddProduct = async () => {
    
  try {

    let imageName = "";

    if (image) {

      const formData = new FormData();

      formData.append(
        "file",
        image
      );

      const uploadResponse =
        await fetch(
          `${API_URL}/upload`,
          {
            method: "POST",
            body: formData
          }
        );

      const uploadData =
        await uploadResponse.json();

      imageName =
        uploadData.filename;

    }

    const response =
      await fetch(
        `${API_URL}/products`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json"
          },
          body: JSON.stringify({
            name: name,
            image: imageName,

            cost_price:
              Number(costPrice),

            sell_price:
              Number(sellPrice),

            stock:
              Number(stock)
          })
        }
      );

    await response.json();
      
    alert(
      "เพิ่มสินค้าสำเร็จ"
    );

    setName("");
    setCostPrice("");
    setSellPrice("");
    setStock("");
    setImage(null);

    loadProducts();

  } catch (error) {

    console.error(error);

    alert(
      "อัปโหลดไม่สำเร็จ"
    );

  }

};

  const handleDeleteProduct = (id) => {

    fetch(`${API_URL}/products/${id}`, {
      method: "DELETE"
    })
      .then((response) => response.json())
      .then(() => {

        alert("ลบสินค้าสำเร็จ");

        loadProducts();

      });

  };

  const handleUpdateProduct = (item) => {

  const newName =
    prompt(
      "ชื่อสินค้า",
      item.name
    );

  if (!newName) return;

  const newCost =
    prompt(
      "ต้นทุน",
      item.cost_price
    );

  if (!newCost) return;

  const newSell =
    prompt(
      "ราคาขาย",
      item.sell_price
    );

  if (!newSell) return;

  const newStock =
    prompt(
      "สต๊อก",
      item.stock
    );

  if (!newStock) return;

  fetch(
    `${API_URL}/products/${item.id}`,
    {
      method: "PUT",

      headers: {
        "Content-Type":
          "application/json"
      },

      body: JSON.stringify({

        name: newName,

        image: item.image,

        cost_price:
          Number(newCost),

        sell_price:
          Number(newSell),

        stock:
          Number(newStock)

      })
    }
  )
    .then((response) =>
      response.json()
    )
    .then(() => {

      alert(
        "แก้ไขสำเร็จ"
      );

      loadProducts();

    });

};

  return (

    <div className="admin-page">

      <h1 className="admin-title">
        ⭐ ระบบจัดการร้านดาวตก
      </h1>

      <div className="admin-card">

        <h2>
          เพิ่มสินค้า
        </h2>

        <input
          type="text"
          placeholder="ชื่อสินค้า"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="ต้นทุน"
          value={costPrice}
          onChange={(e) =>
            setCostPrice(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="ราคาขาย"
          value={sellPrice}
          onChange={(e) =>
            setSellPrice(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="สต๊อก"
          value={stock}
          onChange={(e) =>
            setStock(e.target.value)
          }
        />
        <input
  type="file"
  onChange={(e) =>
    setImage(e.target.files[0])
  }
/>

        <button
          className="gold-button"
          onClick={handleAddProduct}
        >
          เพิ่มสินค้า
        </button>

      </div>

      <h2 className="section-title">
        รายการสินค้า
      </h2>

      {products.map((item) => (

        <div
          key={item.id}
          className="product-card"
        >
          <img
            src={
              `${API_URL}/uploads/` +
              item.image
            }
            alt={item.name}
            className="admin-product-image"
          />
          <h3>
            {item.name}
          </h3>

          <p>
            ต้นทุน : {item.cost_price} บาท
          </p>

          <p>
            ราคาขาย : {item.sell_price} บาท
          </p>

          <p>
            คงเหลือ : {item.stock} ชิ้น
          </p>

          <button
            className="edit-button"
            onClick={() =>
              handleUpdateProduct(item)
            }
          >
            แก้ไข
          </button>
          <button
            className="edit-button"
            onClick={() =>
              handleChangeImage(item.id)
            }
          >
            เปลี่ยนรูป
          </button>

          <button
            className="delete-button"
            onClick={() =>
              handleDeleteProduct(item.id)
            }
          >
            ลบ
          </button>

        </div>

      ))}

      <button
        className="logout-button"
        onClick={handleLogout}
      >
        Logout
      </button>

    </div>

  );

}

export default Admin;