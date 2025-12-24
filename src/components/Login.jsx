import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("user");

  return (
    <div className="login-box">
      <h2>🍔 Food Delivery Login</h2>

      <input
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />

      <select value={role} onChange={e => setRole(e.target.value)}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <button disabled={!username} onClick={() => login(username, role)}>
        Login
      </button>
    </div>
  );
}
