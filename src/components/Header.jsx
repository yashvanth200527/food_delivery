import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <div className="nav">
      <span>🍔 Food Delivery</span>
      <div>
        <span style={{ marginRight: "16px" }}>{user.id}</span>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
