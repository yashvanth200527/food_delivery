export default function OrderStatus({ order }) {
  if (!order) return null;

  return (
    <div className="order-status">
      <h3>📦 Order Confirmed</h3>
      <p><b>Order ID:</b> {order._id}</p>
      <p><b>Status:</b> {order.status}</p>
    </div>
  );
}
