import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {

    fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
      .then((response) => response.json())
      .then((data) => {

        if (data.success) {

          localStorage.setItem("role", data.role);
          localStorage.setItem("username", data.username);

          if (data.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/dashboard");
          }

        } else {

          alert(data.message);

        }

      });

  };

  return (
    <div className="login-page">

      <div className="login-card">

        <h1>
          ⭐ ร้านดาวตก
        </h1>

        <h2>
          เข้าสู่ระบบ
        </h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>
          Login
        </button>

      </div>

    </div>
  );
}

export default Login;