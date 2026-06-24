import API_URL from "../api";

function ProductCard({
item,
onEdit,
onDelete,
handleChangeImage
}) {

const profitPerUnit =
Number(item.sell_price)
-
Number(item.cost_price);

const inventoryValue =
Number(item.cost_price)
*
Number(item.stock);

const expectedProfit =
profitPerUnit
*
Number(item.stock);

let profitClass =
"profit-zero";

if (profitPerUnit > 0) {


profitClass =
  "profit-positive";


}

if (profitPerUnit < 0) {


profitClass =
  "profit-negative";


}

return (


<div className="product-card">

  {item.image && (

    <img
      src={
        `${API_URL}/uploads/`
        +
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

  <p
    className={
      profitClass
    }
  >
    กำไรต่อชิ้น :
    {" "}
    {profitPerUnit.toFixed(2)}
    {" "}
    บาท
  </p>

  <p>
    คงเหลือ :
    {" "}
    {item.stock}
  </p>

  <p>
    มูลค่าคลัง :
    {" "}
    {inventoryValue.toFixed(2)}
    {" "}
    บาท
  </p>

  <p>
    กำไรคาดการณ์ :
    {" "}
    {expectedProfit.toFixed(2)}
    {" "}
    บาท
  </p>

  <button
    className="edit-button"
    onClick={() =>
      onEdit(item)
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
      onDelete(item.id)
    }
  >
    ลบสินค้า
  </button>

</div>


);

}

export default ProductCard;
