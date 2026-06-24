function BusinessSummary({
products
}) {

if (
!products ||
products.length === 0
) {


return null;


}

const bestProfitProduct =
[...products].sort(
(a, b) =>


    (
      b.sell_price -
      b.cost_price
    )

    -

    (
      a.sell_price -
      a.cost_price
    )

)[0];


const worstProfitProduct =
[...products].sort(
(a, b) =>


    (
      a.sell_price -
      a.cost_price
    )

    -

    (
      b.sell_price -
      b.cost_price
    )

)[0];


const ownerCount = {};

products.forEach((item) => {


ownerCount[
  item.owner
] =
  (
    ownerCount[
      item.owner
    ] || 0
  ) + 1;


});

const topOwner =


Object.entries(
  ownerCount
)

.sort(
  (a, b) =>
    b[1] - a[1]
)[0];


const categoryCount = {};

products.forEach((item) => {


categoryCount[
  item.category
] =
  (
    categoryCount[
      item.category
    ] || 0
  ) + 1;


});

const topCategory =


Object.entries(
  categoryCount
)

.sort(
  (a, b) =>
    b[1] - a[1]
)[0];


return (


<div className="summary-grid">

  <div className="summary-card">

    <h3>
      🏆 กำไรสูงสุด
    </h3>

    <p>
      {
        bestProfitProduct.name
      }
    </p>

  </div>

  <div className="summary-card">

    <h3>
      💸 กำไรต่ำสุด
    </h3>

    <p>
      {
        worstProfitProduct.name
      }
    </p>

  </div>

  <div className="summary-card">

    <h3>
      👤 Owner มากสุด
    </h3>

    <p>
      {topOwner?.[0]}
    </p>

  </div>

  <div className="summary-card">

    <h3>
      📂 Category มากสุด
    </h3>

    <p>
      {topCategory?.[0]}
    </p>

  </div>

</div>


);

}

export default BusinessSummary;
