export const handleLogout = () => {

 
  localStorage.removeItem("token");
  localStorage.removeItem("_id");
  localStorage.removeItem("email");
  localStorage.removeItem("name");
  localStorage.removeItem("mobile");
  localStorage.removeItem("address");
  localStorage.removeItem("city");
  localStorage.removeItem("gender");
  localStorage.removeItem("role");
  localStorage.removeItem("info");

  window.location.href = "/login";
};