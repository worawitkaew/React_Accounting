import {
  useParams
} from "react-router-dom";

import {
  useEffect,
  useState
} from "react";

import API_URL from "../api";

import "./ProductDetail.css";

function ProductDetail() {

  const { id } = useParams();

  const [product, setProduct] =
    useState(null);

  useEffect(() => {

    fetch(`${API_URL}/products`)
      .then((response) =>
        response.json()
      )
      .then((data) => {

        const found =
          data.find(
            (item) =>
              item.id === Number(id)
          );

        setProduct(found);

      });

  }, [id]);

  if (!product) {

    return (
      <h1>
        กำลังโหลด...
      </h1>
    );

  }

  return (

    <div className="detail-page">

      <div className="detail-card">

        <img
          src={
            `${API_URL}/uploads/` +
            product.image
          }
          alt={product.name}
          className="detail-image"
        />

        <div className="detail-info">

          <h1>
            {product.name}
          </h1>

          <h2>
            ⭐ {product.sell_price} บาท
          </h2>

          <p>
            📦 คงเหลือ {product.stock}
            ชิ้น
          </p>

          <button
            className="buy-btn"
          >
            สนใจสินค้า
          </button>

        </div>

      </div>

    </div>

  );

}

export default ProductDetail;