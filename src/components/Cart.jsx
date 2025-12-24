import { useCart } from "../context/CartContext";

export default function Cart({ onPlaceOrder }) {
  const {
    cartItems,
    updateQty,
    removeFromCart,
    total
  } = useCart();

  return (
    <div className="cart">
      <h3>🛒 Cart</h3>

      {cartItems.length === 0 && <p>No items added</p>}

      {cartItems.map(item => (
        <div
          key={item.name}
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 10
          }}
        >
          <span>
            {item.name} (₹{item.price})
          </span>

          <div>
            <button onClick={() => updateQty(item.name, item.qty - 1)}>
              −
            </button>
            <span style={{ margin: "0 8px" }}>{item.qty}</span>
            <button onClick={() => updateQty(item.name, item.qty + 1)}>
              +
            </button>
            <button
              style={{ marginLeft: 8 }}
              onClick={() => removeFromCart(item.name)}
            >
              ✕
            </button>
          </div>
        </div>
      ))}

      <hr />

      <h4>Total: ₹{total}</h4>

      <button
        disabled={cartItems.length === 0}
        onClick={onPlaceOrder}
      >
        Place Order
      </button>
    </div>
  );
}
