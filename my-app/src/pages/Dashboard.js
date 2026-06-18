import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  if (!role) {
    return (
      <div>
        <h1>กรุณา Login ก่อน</h1>

        <button onClick={() => navigate("/login")}>
          ไปหน้า Login
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
      <h1>User Dashboard</h1>

      <p>Role : {role}</p>

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;