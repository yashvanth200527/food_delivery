import { useState } from "react";
import API from "../api/api";

export default function OrderForm({ restaurant, onOrderCreated }) {
  const [item, setItem] = useState("");

  const placeOrder = async () => {
    if (!item) return alert("Enter item name");

    const res = await API.post("/orders", {
      userId: "frontend-user",
      restaurantId: restaurant._id,
      items: [{ name: item, price: 150 }]
    });

    onOrderCreated(res.data);
  };

  return (
    <div className="card">
      <h2>🧾 Order from {restaurant.name}</h2>
      <input
        placeholder="Item name"
        value={item}
        onChange={e => setItem(e.target.value)}
      />
      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
}
