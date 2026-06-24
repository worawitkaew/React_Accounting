import { useState } from "react";
import API_URL from "../api";

function CategoryManager({
    onClose,
  categories,
  reloadCategories
}) {

  const [
    newCategory,
    setNewCategory
  ] = useState("");

  const handleAddCategory =
    async () => {

      if (
        !newCategory.trim()
      ) {
        return;
      }

      try {

        await fetch(
          `${API_URL}/categories`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify({
              name: newCategory
            })
          }
        );

        setNewCategory("");

        reloadCategories();

      } catch (error) {

        console.error(error);

        alert(
          "เพิ่มหมวดหมู่ไม่สำเร็จ"
        );

      }

    };

  return (

    <div className="modal-overlay">

      <div className="modal-box">

        <h2>
            📂 จัดการหมวดหมู่
        </h2>

        <input
            type="text"
            placeholder="ชื่อหมวดหมู่"

            value={newCategory}

            onChange={(e) =>
            setNewCategory(
                e.target.value
            )
            }
        />

        <button
            className="gold-button"
            onClick={
            handleAddCategory
            }
        >
            เพิ่มหมวดหมู่
        
        </button>
        <button
            className="delete-button"
            onClick={onClose}
          >
            ยกเลิก
        </button>
        
        <div
            style={{
            marginTop: "15px"
            }}
        >

            {categories.map(
            (item) => (

                <p
                key={item.id}
                >
                📂 {item.name}
                </p>

            )
            )}

            </div>

        </div>
    </div>

  );

}

export default CategoryManager;