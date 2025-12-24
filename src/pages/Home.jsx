import Login from "../components/Login";
import { useAuth } from "../context/AuthContext";
import UserHome from "./UserHome";
import AdminDashboard from "./AdminDashboard";

export default function Home() {
  const { user } = useAuth();

  if (!user) return <Login />;

  return user.role === "admin" ? <AdminDashboard /> : <UserHome />;
}
