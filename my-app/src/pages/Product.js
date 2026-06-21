import { useEffect, useState } from "react";
import "./Product.css";
import API_URL from "../api";
function Product() {

  const [products, setProducts] = useState([]);

  useEffect(() => {

    fetch(`${API_URL}/products`)
      .then((response) => response.json())
      .then((data) => {
        
        setProducts(data);

      });

  }, []);

  return (

    <div className="product-page">

      <h1>
        ⭐ สินค้าในร้านดาวตก
      </h1>

      <div className="product-grid">

        {products.map((item) => (

          <div
            key={item.id}
            className="product-card"
          >

            {item.image ? (

  <img
    src={
      `${API_URL}/uploads/` +
      item.image
    }
    alt={item.name}
    className="product-image"
  />

) : (

  <div className="no-image">
    ไม่มีรูปภาพ
  </div>

)}

            <h3>
              {item.name}
            </h3>

            <p>
              ราคา {item.sell_price} บาท
            </p>

            <p>
              คงเหลือ {item.stock} ชิ้น
            </p>

          </div>

        ))}

      </div>

    </div>

  );

}

export default Product;