import { useState } from "react";
import API from "../api/api";

export default function AdminDashboard({ onAdded }) {
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");

  const addRestaurant = async () => {
    if (!name) return;

    await API.post("/restaurants", {
      name,
      location: "City Center"
    });

    setMsg("✅ Restaurant Added");
    setName("");
    onAdded(); // 🔥 refresh user list
  };

  return (
    <div className="container">
      <h2>🛠 Admin Dashboard</h2>

      <div className="card">
        <input
          placeholder="Restaurant name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <button onClick={addRestaurant}>Add</button>
        {msg && <p>{msg}</p>}
      </div>
    </div>
  );
}
