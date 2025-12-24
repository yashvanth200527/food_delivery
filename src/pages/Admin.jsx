import { useEffect, useState } from "react";
import API from "../api/api";

export default function Admin() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await API.get("/orders");
      setOrders(res.data);
    } catch {
      setError("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.patch(`/orders/${id}/status`, { status });
      fetchOrders();
    } catch {
      alert("Failed to update status");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p className="loading">Loading orders...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>

      <button onClick={fetchOrders}>Refresh</button>

      {orders.length === 0 && <p>No orders yet</p>}

      {orders.map(order => (
        <div className="card" key={order._id}>
          <p><b>Order ID:</b> {order._id}</p>
          <p><b>User:</b> {order.userId}</p>
          <p><b>Status:</b> {order.status}</p>

          <select
            value={order.status}
            onChange={(e) => updateStatus(order._id, e.target.value)}
          >
            <option value="CREATED">CREATED</option>
            <option value="CONFIRMED">CONFIRMED</option>
            <option value="PREPARING">PREPARING</option>
            <option value="OUT_FOR_DELIVERY">OUT_FOR_DELIVERY</option>
            <option value="DELIVERED">DELIVERED</option>
            <option value="CANCELLED">CANCELLED</option>
          </select>
        </div>
      ))}
    </div>
  );
}
