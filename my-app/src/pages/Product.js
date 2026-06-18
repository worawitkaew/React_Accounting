function Product() {

  const products = [
    {
      id: 1,
      name: "น้ำสปอนเซอร์",
      price: 15
    },
    {
      id: 2,
      name: "น้ำเปล่า",
      price: 10
    },
    {
      id: 3,
      name: "มด",
      price: 300
    }
  ];

  return (
    <div>
      <h1>สินค้าในร้านดาวตก</h1>

      {products.map((item) => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>ราคา {item.price} บาท</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default Product;