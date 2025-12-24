import { useState } from "react";

export default function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState("");

  const login = () => {
    if (password === "admin123") onLogin();
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Admin Login</h2>
        <input
          type="password"
          placeholder="Admin password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button onClick={login}>Login</button>
      </div>
    </div>
  );
}
