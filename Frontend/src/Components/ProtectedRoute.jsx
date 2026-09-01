import { Navigate } from "react-router-dom";

// allowedRoles = ["admin"] ya ["transporter"] ya ["user"]
function ProtectedRoute({ allowedRoles, children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Token hi nahi hai -> login pe bhejo
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Token hai lekin role match nahi karta
  // -> matlab user kisi aur role se already login hai
  // -> use uske apne panel pe wapas bhejo, login pe nahi
  if (allowedRoles && !allowedRoles.includes(role)) {
    alert("Ye page aapke liye nahi hai. Pehle Logout karein, phir sahi account se Login karein.");

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

export default ProtectedRoute;