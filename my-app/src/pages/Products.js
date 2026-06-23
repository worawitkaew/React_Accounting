import { useEffect, useState } from "react";
import "./Products.css";
import API_URL from "../api";
import { useNavigate } from "react-router-dom";

function Products() {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {

    fetch(`${API_URL}/products`)
      .then((response) => response.json())
      .then((data) => {

        setProducts(data);

      });

  }, []);

  const filteredProducts =
    products.filter((item) =>
      item.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (

    <div className="product-page">

      <h1>
        ⭐ สินค้าทั้งหมด
      </h1>

      <p className="product-count">
        พบสินค้า {filteredProducts.length} รายการ
      </p>

      <input
        type="text"
        placeholder="ค้นหาสินค้า..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="search-box"
      />

      <div className="product-grid">

        {filteredProducts.map((item) => (

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

            <div className="product-info">

              <h3>
                {item.name}
              </h3>

              <div className="price">
                ⭐ {item.sell_price} บาท
              </div>

              <div className="stock">
                📦 คงเหลือ {item.stock} ชิ้น
              </div>

              <button
                  className="detail-btn"
                  onClick={() =>
                    navigate(`/products/${item.id}`)
                  }
                >
                  ดูรายละเอียด
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

export default Products;