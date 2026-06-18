import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {

    if (username === "admin" && password === "admin") {

        localStorage.setItem("role", "admin");

        navigate("/admin");
        return;
    }

    if (username === "user" && password === "user") {

        localStorage.setItem("role", "user");

        navigate("/dashboard");
        return;
    }

    alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
  };

  return (
    <div>
      <h1>Login</h1>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default Login;