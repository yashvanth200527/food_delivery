import { useCart } from "../context/CartContext";

const menuItems = [
  { name: "Burger", price: 150 },
  { name: "Pizza", price: 250 },
  { name: "Pasta", price: 200 },
  { name: "Fries", price: 100 }
];

export default function Menu() {
  const { addToCart } = useCart();

  return (
    <div className="card">
      <h3>🍽️ Menu</h3>

      {menuItems.map(item => (
        <div key={item.name} style={{ marginBottom: 10 }}>
          <strong>{item.name}</strong> — ₹{item.price}
          <button
            style={{ marginLeft: 10 }}
            onClick={() => addToCart(item)}
          >
            Add
          </button>
        </div>
      ))}
    </div>
  );
}
