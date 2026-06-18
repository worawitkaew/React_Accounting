import { useEffect, useState } from "react";

function Product() {

  const [products, setProducts] = useState([]);

  useEffect(() => {

    fetch("http://localhost:8000/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      });

  }, []);

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