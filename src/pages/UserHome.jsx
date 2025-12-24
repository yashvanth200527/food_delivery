import { useState } from "react";
import API from "../api/api";
import RestaurantList from "../components/RestaurantList";
import Menu from "../components/Menu";
import Cart from "../components/Cart";
import OrderStatus from "../components/OrderStatus";
import Header from "../components/Header";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

<h1 style={{ color: "red" }}>USER HOME LOADED</h1>


export default function UserHome() {
  const { user } = useAuth();
  const { cartItems, clearCart } = useCart();

  const [restaurant, setRestaurant] = useState(null);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  const placeOrder = async () => {
    if (!restaurant || cartItems.length === 0) return;

    setLoading(true);
    const res = await API.post("/orders", {
      userId: user.id,
      restaurantId: restaurant._id,
      items: cartItems
    });
    setOrder(res.data);
    clearCart();
    setLoading(false);
  };

  return (
    <>
      <Header />

      <div className="container">
        <RestaurantList onSelect={setRestaurant} />

        {restaurant && (
          <div className="layout">
            <Menu />
            <Cart onPlaceOrder={placeOrder} />
          </div>
        )}

        {loading && <p>Placing order...</p>}
        <OrderStatus order={order} />
      </div>
    </>
  );
}
