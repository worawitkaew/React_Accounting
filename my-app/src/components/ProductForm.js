import { useState, useEffect } from "react";
import API_URL from "../api";
import "./ProductForm.css";

function ProductForm({ onSuccess ,onClose}) {

const [name, setName] = useState("");
const [costPrice, setCostPrice] = useState("");
const [sellPrice, setSellPrice] = useState("");
const [stock, setStock] = useState("");
const [image, setImage] = useState(null);

const [owners, setOwners] = useState([]);
const [categories, setCategories] = useState([]);

const [owner, setOwner] = useState("");
const [category, setCategory] = useState("");
const [description, setDescription] = useState("");

useEffect(() => {


fetch(`${API_URL}/owners`)
  .then((response) => response.json())
  .then((data) => {

    setOwners(data);

    if (data.length > 0) {
      setOwner(data[0].name);
    }

  });

fetch(`${API_URL}/categories`)
  .then((response) => response.json())
  .then((data) => {

    setCategories(data);

    if (data.length > 0) {
      setCategory(data[0].name);
    }

  });


}, []);

const handleAddProduct = async () => {


if (!name.trim()) {
  alert("กรุณาใส่ชื่อสินค้า");
  return;
}

if (!costPrice) {
  alert("กรุณาใส่ต้นทุน");
  return;
}

if (!sellPrice) {
  alert("กรุณาใส่ราคาขาย");
  return;
}

if (!stock) {
  alert("กรุณาใส่สต๊อก");
  return;
}

if (!image) {
  alert("กรุณาเลือกรูปภาพ");
  return;
}

try {

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

  await fetch(
    `${API_URL}/products`,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json"
      },

      body: JSON.stringify({

        name: name.trim(),

        image:
          uploadData.filename,

        cost_price:
          Number(costPrice),

        sell_price:
          Number(sellPrice),

        stock:
          Number(stock),

        owner:
          owner,

        category:
          category,

        description:
          description

      })
    }
  );

  alert("เพิ่มสินค้าสำเร็จ");

  setName("");
  setCostPrice("");
  setSellPrice("");
  setStock("");
  setImage(null);
  setDescription("");

  if (onSuccess) {
    onSuccess();
  }

} catch (error) {

  console.error(error);

  alert("เพิ่มสินค้าไม่สำเร็จ");

}


};

return (

// {/* <div className="admin-card">  */}
<div className="modal-overlay">

  <div className="modal-box">
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
        setImage(
          e.target.files[0]
        )
      }
    />

    <select
      value={owner}
      onChange={(e) =>
        setOwner(e.target.value)
      }
    >

      {owners.map((item) => (

        <option
          key={item.id}
          value={item.name}
        >
          {item.name}
        </option>

      ))}

    </select>

    <select
      value={category}
      onChange={(e) =>
        setCategory(e.target.value)
      }
    >

      {categories.map((item) => (

        <option
          key={item.id}
          value={item.name}
        >
          {item.name}
        </option>

      ))}

    </select>

    <textarea
      rows="4"
      placeholder="รายละเอียดสินค้า"
      value={description}
      onChange={(e) =>
        setDescription(
          e.target.value
        )
      }
    />

    <button
      className="gold-button"
      onClick={handleAddProduct}
    >
      เพิ่มสินค้า
    </button>
    <button
      className="delete-button"
      onClick={onClose}
    >
      ยกเลิก
    </button>

    </div>
  </div>
  


);

}

export default ProductForm;
