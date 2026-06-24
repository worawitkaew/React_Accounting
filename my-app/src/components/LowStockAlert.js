function LowStockAlert({
products
}) {

const lowStockProducts =
products.filter(
(item) =>
Number(item.stock) <= 1
);

if (
lowStockProducts.length === 0
) {


return (

  <div className="low-stock-ok">

    ✅ ไม่มีสินค้าใกล้หมด

  </div>

);


}

return (


<div className="low-stock-box">

  <h2>
    ⚠️ สินค้าใกล้หมด
  </h2>

  {

    lowStockProducts.map(
      (item) => (

        <div
          key={item.id}
          className="low-stock-item"
        >

          <strong>
            {item.name}
          </strong>

          <span>

            คงเหลือ

            {" "}

            {item.stock}

            {" "}

            ชิ้น

          </span>

        </div>

      )
    )

  }

</div>


);

}

export default LowStockAlert;
