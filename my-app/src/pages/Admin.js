import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Admin.css";
import API_URL from "../api";

import ProductForm from "../components/ProductForm";

function Admin() {

  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const [products, setProducts] = useState([]);

  const [editingProduct,
  setEditingProduct] =
  useState(null);

  const loadProducts = () => {

    fetch(`${API_URL}/products`)
      .then((response) => response.json())
      .then((data) => {

        setProducts(data);

      });

  };

  useEffect(() => {

    loadProducts();

  }, []);

  const handleDeleteProduct = async (id) => {

    const confirmDelete =
      window.confirm(
        "ยืนยันการลบสินค้า ?"
      );

    if (!confirmDelete) return;

    try {

      await fetch(
        `${API_URL}/products/${id}`,
        {
          method: "DELETE"
        }
      );

      loadProducts();

    } catch (error) {

      console.error(error);

      alert("ลบสินค้าไม่สำเร็จ");

    }

  };
  const handleChangeImage = async (
    productId
  ) => {

    const input =
      document.createElement(
        "input"
      );

    input.type = "file";

    input.accept =
      "image/*";

    input.onchange =
      async (event) => {

        const file =
          event.target.files[0];

        if (!file) return;

        try {

          const formData =
            new FormData();

          formData.append(
            "file",
            file
          );

          const response =
            await fetch(
              `${API_URL}/products/${productId}/image`,
              {
                method: "PUT",
                body: formData
              }
            );

          if (!response.ok) {

            const error =
              await response.json();

            alert(
              error.detail
            );

            return;

          }

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
  const handleLogout = () => {

    localStorage.removeItem("role");

    navigate("/");

  };
  const handleSaveEdit =
  async () => {

    try {

      const response =
        await fetch(
          `${API_URL}/products/${editingProduct.id}`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify(
              editingProduct
            )
          }
        );

      if (!response.ok) {

        const errorData =
          await response.json();

        alert(
          "บันทึกไม่สำเร็จ\n\n" +
          errorData.detail
        );

        return;

      }

      alert("บันทึกสำเร็จ");

      setEditingProduct(null);

      loadProducts();

    } catch (error) {

      console.error(error);

      alert(
        "เชื่อมต่อ Server ไม่สำเร็จ"
      );

    }

  };

  if (role !== "admin") {

    return (

      <div className="admin-page">

        <h1>
          ไม่มีสิทธิ์เข้าใช้งาน
        </h1>

      </div>

    );

  }

  return (

    <div className="admin-page">

      <h1 className="admin-title">
        ⭐ ระบบจัดการร้านดาวตก
      </h1>

      <ProductForm
        onSuccess={loadProducts}
      />

      <h2 className="section-title">
        รายการสินค้า
      </h2>

      <h2>
        📦 สินค้าทั้งหมด
        {products.length}
        รายการ
      </h2>
      {editingProduct && (

        <div
          className="admin-card"
        >

          <input
            value={editingProduct.name}
            onChange={(e) =>
              setEditingProduct({
                ...editingProduct,
                name: e.target.value
              })
            }
          />

          <input
            value={editingProduct.sell_price}
            onChange={(e) =>
              setEditingProduct({
                ...editingProduct,
                sell_price:
                  e.target.value
              })
            }
          />
        <button
          className="gold-button"
          onClick={handleSaveEdit}
        >
          บันทึก
        </button>
        <button
          onClick={() =>
            setEditingProduct(null)
          }
        >
          ยกเลิก
        </button>
        </div>
        
      )}
      <div className="admin-product-grid">

        {products.map((item) => (

          <div
            key={item.id}
            className="product-card"
          >

            {item.image && (

              <img
                src={
                  `${API_URL}/uploads/` +
                  item.image
                }
                alt={item.name}
                className="admin-product-image"
              />

            )}
            
            <h3>
              {item.name}
            </h3>

            <p>
              เจ้าของ :
              {" "}
              {item.owner}
            </p>

            <p>
              หมวดหมู่ :
              {" "}
              {item.category}
            </p>

            <p>
              ต้นทุน :
              {" "}
              {item.cost_price}
              {" "}
              บาท
            </p>

            <p>
              ราคาขาย :
              {" "}
              {item.sell_price}
              {" "}
              บาท
            </p>

            <p>
              คงเหลือ :
              {" "}
              {item.stock}
            </p>

            <button
              className="edit-button"
              onClick={() =>
                setEditingProduct(item)
              }
            >
              แก้ไขสินค้า
            </button>
            <button
              className="image-button"
              onClick={() =>
                handleChangeImage(
                  item.id
                )
              }
            >
              เปลี่ยนรูป
            </button>
            <button
              className="delete-button"
              onClick={() =>
                handleDeleteProduct(
                  item.id
                )
              }
            >
              ลบสินค้า
            </button>

          </div>

        ))}

      </div>

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