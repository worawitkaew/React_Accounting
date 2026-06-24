function OwnerSummary({
products
}) {

const ownerData = {};

products.forEach((item) => {


if (
  !ownerData[item.owner]
) {

  ownerData[item.owner] = {

    count: 0,

    inventory: 0,

    profit: 0

  };

}

ownerData[item.owner].count += 1;

ownerData[item.owner].inventory +=

  Number(item.cost_price)
  *
  Number(item.stock);

ownerData[item.owner].profit +=

  (
    Number(item.sell_price)
    -
    Number(item.cost_price)
  )
  *
  Number(item.stock);


});

return (


<div className="owner-summary">

  <h2>
    👤 สรุป Owner
  </h2>

  {

    Object.entries(
      ownerData
    ).map(

      ([name, data]) => (

        <div
          key={name}
          className="owner-card"
        >

          <h3>
            {name}
          </h3>

          <p>
            สินค้า :
            {" "}
            {data.count}
          </p>

          <p>
            มูลค่าคลัง :
            {" "}
            {
              data.inventory
              .toFixed(2)
            }
            {" "}
            บาท
          </p>

          <p>
            กำไรคาดการณ์ :
            {" "}
            {
              data.profit
              .toFixed(2)
            }
            {" "}
            บาท
          </p>

        </div>

      )

    )

  }

</div>


);

}

export default OwnerSummary;
