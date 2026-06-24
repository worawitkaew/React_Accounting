import { useState, useEffect } from "react";
import API_URL from "../api";

function ProductEditModal({
  product,
  onClose,
  onSuccess,
  owners,
  categories
}) {

  const [formData, setFormData] =
    useState(product);

  useEffect(() => {

    setFormData(product);

  }, [product]);

  if (!product) return null;

  const handleSave = async () => {

    try {

      const response =
        await fetch(
          `${API_URL}/products/${product.id}`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify(
              formData
            )
          }
        );

      if (!response.ok) {

        const error =
          await response.json();

        alert(error.detail);

        return;

      }

      alert("บันทึกสำเร็จ");

      onSuccess();

      onClose();

    } catch (error) {

      console.error(error);

      alert(
        "เชื่อมต่อ Server ไม่สำเร็จ"
      );

    }

  };

  return (

    <div className="modal-overlay">

      <div className="modal-box">

        <h2>
          แก้ไขสินค้า
        </h2>

        <input
          value={formData.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value
            })
          }
        />

        <input
          type="number"
          value={formData.cost_price}
          onChange={(e) =>
            setFormData({
              ...formData,
              cost_price:
                Number(e.target.value)
            })
          }
        />

        <input
          type="number"
          value={formData.sell_price}
          onChange={(e) =>
            setFormData({
              ...formData,
              sell_price:
                Number(e.target.value)
            })
          }
        />

        <input
          type="number"
          value={formData.stock}
          onChange={(e) =>
            setFormData({
              ...formData,
              stock:
                Number(e.target.value)
            })
          }
        />

        <select
          value={formData.owner}
          onChange={(e) =>
            setFormData({
              ...formData,
              owner: e.target.value
            })
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
          value={formData.category}
          onChange={(e) =>
            setFormData({
              ...formData,
              category:
                e.target.value
            })
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
          value={formData.description}
          onChange={(e) =>
            setFormData({
              ...formData,
              description:
                e.target.value
            })
          }
        />

        <div className="modal-buttons">

          <button
            className="gold-button"
            onClick={handleSave}
          >
            บันทึก
          </button>

          <button
            className="delete-button"
            onClick={onClose}
          >
            ยกเลิก
          </button>

        </div>

      </div>

    </div>

  );

}

export default ProductEditModal;