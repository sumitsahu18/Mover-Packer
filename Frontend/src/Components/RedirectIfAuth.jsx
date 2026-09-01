import { Navigate } from "react-router-dom";

// Agar user already login hai to usko login/register page dikhne hi nahi dena
// - seedha uske role wale panel pe bhej do
function RedirectIfAuth({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  if (token) {
    if (role === "admin") {
      return <Navigate to="/admin" replace />;
    }
    if (role === "transporter") {
      return <Navigate to="/transporter" replace />;
    }
    return <Navigate to="/user" replace />;
  }
  return children;
}
export default RedirectIfAuth;