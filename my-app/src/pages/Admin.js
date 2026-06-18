import { useNavigate } from "react-router-dom";

function Admin() {

  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  if (role !== "admin") {
    return (
      <div>
        <h1>ไม่มีสิทธิ์เข้าใช้งาน</h1>

        <button onClick={() => navigate("/")}>
          กลับหน้าแรก
        </button>
      </div>
    );
  }

  const handleLogout = () => {

    localStorage.removeItem("role");

    navigate("/");
  };

  return (
    <div>
      <h1>Admin Panel</h1>

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Admin;