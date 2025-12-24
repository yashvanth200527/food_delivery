import { useState } from "react";

export default function Payment({ amount, onSuccess, onCancel }) {
  const [method, setMethod] = useState("card");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const payNow = () => {
    setLoading(true);
    setError("");

    setTimeout(() => {
      const success = Math.random() > 0.2; // 80% success rate

      if (!success) {
        setError("Payment failed. Try again.");
        setLoading(false);
        return;
      }

      setLoading(false);
      onSuccess();
    }, 1500);
  };

  return (
    <div className="card">
      <h3>Payment</h3>

      <p>Total Amount: ₹{amount}</p>

      <div className="payment-options">
        <label>
          <input
            type="radio"
            value="card"
            checked={method === "card"}
            onChange={(e) => setMethod(e.target.value)}
          />
          Card
        </label>

        <label>
          <input
            type="radio"
            value="upi"
            checked={method === "upi"}
            onChange={(e) => setMethod(e.target.value)}
          />
          UPI
        </label>

        <label>
          <input
            type="radio"
            value="cod"
            checked={method === "cod"}
            onChange={(e) => setMethod(e.target.value)}
          />
          Cash on Delivery
        </label>
      </div>

      <button onClick={payNow} disabled={loading}>
        {loading ? "Processing..." : "Pay Now"}
      </button>

      <button className="secondary" onClick={onCancel}>
        Cancel
      </button>

      {error && <p className="error">{error}</p>}
    </div>
  );
}
