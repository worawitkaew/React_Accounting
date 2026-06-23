import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Home.css";
import API_URL from "../api";

import meteorVideo from "../assets/videos/meteor.mp4";

function Home() {

  const [page, setPage] = useState("home");
  const [time, setTime] = useState(new Date());
  const [products, setProducts] = useState([]);

  useEffect(() => {

    const timer = setInterval(() => {

      setTime(new Date());

    }, 1000);

    return () => clearInterval(timer);

  }, []);

  useEffect(() => {

    fetch(`${API_URL}/products`)
      .then((response) => response.json())
      .then((data) => {

        setProducts(data);

      });

  }, []);

  return (

    <div className="home-page">

      {/* Header */}

      <div className="header">

        <h2 className="logo">
          ⭐ ร้านดาวตก
        </h2>

        <Link to="/login">
          <button className="login-btn">
            เข้าสู่ระบบ
          </button>
        </Link>

      </div>

      {/* Main */}

      <div className="main-layout">

        {/* Sidebar */}

        <div className="sidebar">

          <button
            className="menu-btn"
            onClick={() => setPage("home")}
          >
            🏠 หน้าแรก
          </button>

          <button
            className="menu-btn"
            onClick={() => setPage("product")}
          >
            🌟 สินค้าแนะนำ
          </button>

          <button
            className="menu-btn"
            onClick={() => setPage("contact")}
          >
            📞 ติดต่อ
          </button>

        </div>

        {/* Content */}

        <div className="content">

          <div className="shooting-star"></div>

          <div className="star">✦</div>

          <div className="star">✦</div>

          <div className="star">✦</div>

          <div className="star">✦</div>

          {/* HOME */}

          {page === "home" && (

            <>
              <video
                className="video-background"
                autoPlay
                muted
                loop
                playsInline
              >
                <source
                  src={meteorVideo}
                  type="video/mp4"
                />
              </video>

              <div className="video-overlay"></div>

              <div className="home-content">

                <h1>
                  ⭐ ร้านดาวตก
                </h1>

                <h2>
                  ยินดีต้อนรับ
                </h2>

                <p>
                  ร้านเล็ก ๆ ที่กำลังเติบโตด้วยเทคโนโลยี
                </p>

                <p>
                  เวลา : {time.toLocaleTimeString()}
                </p>

              </div>

            </>

          )}

          {/* PRODUCT */}

          {page === "product" && (
  <div className="product-section">

    <h1>🌟 สินค้าแนะนำ</h1>

    <p className="product-subtitle">
      สินค้าคัดสรรจากร้านดาวตก
    </p>

    <div className="featured-products">

      {products.slice(0, 8).map((item) => (

        <div
          key={item.id}
          className="featured-card"
        >

          {item.image && (
            <img
              src={`${API_URL}/uploads/${item.image}`}
              alt={item.name}
              className="featured-image"
            />
          )}

          <div className="featured-info">

            <h3>{item.name}</h3>

            <div className="price">
              ⭐ {item.sell_price.toLocaleString()} บาท
            </div>

            <div className="stock">
              📦 คงเหลือ {item.stock} ชิ้น
            </div>

            <button className="detail-btn">
              ดูสินค้า
            </button>

          </div>

        </div>

      ))}

    </div>

    <div className="view-all-container">

      <button
        className="view-all-btn"
        onClick={() => window.location.href = "/products"}
      >
        🛒 ดูสินค้าทั้งหมด
      </button>

    </div>

  </div>
)}

          {/* CONTACT */}

          {page === "contact" && (

            <div className="contact-section">

              <h1>
                ติดต่อร้านดาวตก
              </h1>

              <p>
                📞 096-6833535
              </p>

              <p>
                Facebook : ร้านดาวตก
              </p>

              <p>
                Gmail : mon23503516@gmail.com
              </p>

            </div>

          )}

        </div>

      </div>

      {/* Footer */}

      <div className="footer">

        <p>
          ☄️ ร้านดาวตก
        </p>

        <p>
          Powered by React + FastAPI
        </p>

      </div>

    </div>

  );

}

export default Home;