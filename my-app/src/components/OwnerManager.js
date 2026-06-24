import { useState } from "react";
import API_URL from "../api";

function OwnerManager({
    onClose,
  owners,
  reloadOwners
}) {

  const [newOwner,
  setNewOwner] =
  useState("");

  const handleAddOwner =
    async () => {

      if (!newOwner.trim())
        return;

      await fetch(
        `${API_URL}/owners`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({
            name: newOwner
          })
        }
      );

      setNewOwner("");

      reloadOwners();

    };

  return (

    <div className="modal-overlay">

      <div className="modal-box">

        <h2>
            👤 จัดการเจ้าของสินค้า
        </h2>

        <input
            value={newOwner}
            onChange={(e) =>
            setNewOwner(
                e.target.value
            )
            }
            placeholder="ชื่อเจ้าของ"
        />

        <button
            className="gold-button"
            onClick={
            handleAddOwner
            }
        >
            เพิ่ม
        </button>
        
        <button
            className="delete-button"
            onClick={onClose}
          >
            ยกเลิก
        </button>
        
        {owners.map((item) => (

            <p key={item.id}>
            {item.name}
            </p>

        ))}

        </div>
    </div>
  );

}

export default OwnerManager;