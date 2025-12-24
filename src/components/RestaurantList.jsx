import { useEffect, useState } from "react";
import API from "../api/api";
import Loader from "./Loader";
import Error from "./Error";

export default function RestaurantList({ onSelect }) {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get("/restaurants")
      .then(res => setRestaurants(res.data))
      .catch(() => setError("Failed to load restaurants"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;
  if (error) return <Error message={error} />;

  return (
    <>
      <h2>🍽️ Restaurants Near You</h2>

      <div className="card-grid">
        {restaurants.map(r => (
          <div key={r._id} className="card" onClick={() => onSelect(r)}>
            <img
              src={`https://source.unsplash.com/400x300/?restaurant,food&sig=${r._id}`}
              alt={r.name}
            />
            <h3>{r.name}</h3>
            <p>{r.location || "City Center"}</p>
          </div>
        ))}
      </div>
    </>
  );
}
