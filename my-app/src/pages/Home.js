import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
        <h1>ร้านดาวตก</h1>

        <p>ยินดีต้อนรับ</p>
        <Link to="/product">
        <button>ดูสินค้า</button>
        </Link>
        <Link to="/login">
            <button>เข้าสู่ระบบ</button>
        </Link>
    </div>
  );
}

export default Home;