import { useEffect } from "react";

// Protected panel (User/Admin/Transporter) ke andar Back button ko
// disable karne ke liye — jab tak user khud Logout nahi karta,
// back button dabane pe wahi page pe wapas push kar diya jayega.
function useBlockBackNavigation() {
  useEffect(() => {
    // Current page ko history mein ek extra baar push kar do
    window.history.pushState(null, "", window.location.href);

    const handlePopState = () => {
      window.history.pushState(null, "", window.location.href);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);
}

export default useBlockBackNavigation;