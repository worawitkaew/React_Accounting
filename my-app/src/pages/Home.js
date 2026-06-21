import { Link } from "react-router-dom";
import {
  useState,
  useEffect
} from "react";
import "./Home.css";
import API_URL from "../api";
import meteorVideo from "../assets/videos/meteor.mp4";

function Home() {
  const [page, setPage] = useState("home");
  const [time, setTime] = useState(
    new Date()
  );
  useEffect(() => {

    const timer = setInterval(() => {

      setTime(new Date());

    }, 1000);

    return () => clearInterval(timer);

  }, []);

  const [products, setProducts] = useState([]);

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
        <div
  className="star"
  style={{
    top: "10%",
    left: "20%"
  }}
>
  ✦
</div>

<div
  className="star"
  style={{
    top: "25%",
    left: "75%"
  }}
>
  ✦
</div>

<div
  className="star"
  style={{
    top: "70%",
    left: "30%"
  }}
>
  ✦
</div>

<div
  className="star"
  style={{
    top: "80%",
    left: "80%"
  }}
>
  ✦
</div>
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

        เวลา :

        {" "}

        {time.toLocaleTimeString()}

      </p>
    </div>

  </>

)}

          {page === "product" && (

  <>

    <h1>
      🌟 สินค้าแนะนำ
    </h1>

    <div className="featured-products">

      {products.slice(0, 6).map((item) => (

        <div
          key={item.id}
          className="featured-card"
        >

          {item.image && (

            <img
              src={
                `${API_URL}/uploads/` +
                item.image
              }
              alt={item.name}
              className="featured-image"
            />

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

  </>

)}

          {page === "contact" && (

            <>

              <h1>ติดต่อร้านดาวตก</h1>

              <p>โทร : 096-6833535</p>

              <p>Facebook : ร้านดาวตก</p>

              <p>Gmail : mon23503516@gmail.com</p>

            </>

          )}

        </div>

      </div>

    </div>
  );
}

export default Home;