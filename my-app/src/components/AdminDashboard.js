function AdminDashboard({
products,
owners,
categories
}) {

const totalProducts =
products.length;

const inventoryValue =
products.reduce(
(sum, item) =>
sum +
(
Number(item.cost_price)
*
Number(item.stock)
),
0
);

const expectedProfit =
products.reduce(
(sum, item) =>
sum +
(
(
Number(item.sell_price)
-
Number(item.cost_price)
)
*
Number(item.stock)
),
0
);

return (


<div className="dashboard-grid">

  <div className="dashboard-card">
    <h3>📦 สินค้า</h3>
    <p>
      {totalProducts}
      {" "}
      รายการ
    </p>
  </div>

  <div className="dashboard-card">
    <h3>💰 มูลค่าคลัง</h3>
    <p>
      {inventoryValue.toFixed(2)}
      {" "}
      บาท
    </p>
  </div>

  <div className="dashboard-card">
    <h3>📈 กำไรคาดการณ์</h3>
    <p>
      {expectedProfit.toFixed(2)}
      {" "}
      บาท
    </p>
  </div>

  <div className="dashboard-card">
    <h3>👤 Owner</h3>
    <p>
      {owners.length}
      {" "}
      คน
    </p>
  </div>

  <div className="dashboard-card">
    <h3>📂 Category</h3>
    <p>
      {categories.length}
      {" "}
      หมวด
    </p>
  </div>

</div>


);

}

export default AdminDashboard;
