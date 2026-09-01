import "./App.css";
import { Routes, Route } from "react-router-dom";
import AIChatBot from "./Components/AIChatBot/AIChatBot.jsx";
// Public Pages
import Home from "./Components/Home/Home";
import About from "./Components/About/about";
import ServicesC from "./Components/Services/ServicesC";
import Contact from "./Components/Contact/Contact";
import Login from "./login/login";
import Register from "./Components/Register/Register";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import RedirectIfAuth from "./Components/RedirectIfAuth.jsx";
import NotFound from "./Components/NotFound.jsx";

// User Panel
import UserPanel from "./pages/User/UserPanel";
import Dashboard from "./pages/User/Dashboard";
import Addproduct from "./pages/User/AddProduct";

// Future Pages
import CreateBid from "./pages/User/Charity.jsx";
// import SearchProduct from "./pages/User/SearchProduct";
// import TrackShipment from "./pages/User/TrackShipment";
// import MyAddress from "./pages/User/MyAddress";
// import Document from "./pages/User/Document";
// import ProfileSettings from "./pages/User/ProfileSettings";

// Admin
import AdminPannel from "./pages/Adminpannel/AdminPannel.jsx";
import DashboardAdmin from "./pages/Adminpannel/DashboardAdmin.jsx";
import ManageUsers from "./pages/Adminpannel/ManageUsers.jsx";
import ManageTransporters from "./pages/Adminpannel/ManageTransporters.jsx";
import AddCategory from "./pages/Adminpannel/AddCategory.jsx";
import AddSubCategory from "./pages/Adminpannel/AddSubCategory.jsx";
import EPAdmin from "./pages/Adminpannel/EPAdmin.jsx";
import TransporterLayout from "./pages/TransporterPanel/TransporterLayout.jsx";
import TransporterDashboard from "./pages/TransporterPanel/Pages/Dashboard.jsx";
import AvailableJobs from "./pages/TransporterPanel/Pages/AvailableJobs.jsx";
import ActiveDeliveries from "./pages/TransporterPanel/Pages/ActiveDeliveries.jsx";
import MyBookings from "./pages/TransporterPanel/Pages/MyBookings.jsx";
import TPProfile from "./pages/TransporterPanel/Pages/TPProfile.jsx";
import SearchProduct from "./pages/User/SearchProduct.jsx";
import ProfileSettings from "./pages/User/ProfileSettings.jsx";
import UserQuotes from "./pages/User/UserQuotes.jsx";
import PaymentSuccess from "./pages/User/PaymentSuccess.jsx";
import TrackShipment from "./pages/User/TrackShipment.jsx";
import MyAddress from "./pages/User/MyAddress.jsx";
import Document from "./pages/User/Document.jsx";
import Earnings from "./pages/TransporterPanel/Pages/Earnings.jsx";
import VehicleManagement from "./pages/TransporterPanel/Pages/VehicleManagement.jsx";
import TransporterDocuments from "./pages/TransporterPanel/Pages/Documents.jsx";
import Reviews from "./pages/TransporterPanel/Pages/Reviews.jsx";
import Settings from "./pages/Adminpannel/Settings.jsx";

function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}

        <Route
          path="/"
          element={
            <RedirectIfAuth>
              <Home />
            </RedirectIfAuth>
          }
        />
        <Route
          path="/about"
          element={
            <RedirectIfAuth>
              <About />
            </RedirectIfAuth>
          }
        />
        <Route
          path="/services"
          element={
            <RedirectIfAuth>
              <ServicesC />
            </RedirectIfAuth>
          }
        />
        <Route
          path="/contact"
          element={
            <RedirectIfAuth>
              <Contact />
            </RedirectIfAuth>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectIfAuth>
              <Login />
            </RedirectIfAuth>
          }
        />

        <Route
          path="/register"
          element={
            <RedirectIfAuth>
              <Register />
            </RedirectIfAuth>
          }
        />

        {/* User Panel */}

        <Route
          path="/user"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <UserPanel />
            </ProtectedRoute>
          }
        >
          <Route path="add-product" element={<Addproduct />} />

          {/* Default */}

          <Route index element={<Dashboard />} />

          <Route path="dashboard" element={<Dashboard />} />

          <Route path="create-bid" element={<CreateBid />} />

          <Route path="search-product" element={<SearchProduct />} />
          <Route path="profile-settings" element={<ProfileSettings />} />
          <Route path="Quotetion" element={<UserQuotes />} />

          <Route path="/user/payment-success" element={<PaymentSuccess />} />
          <Route path="track-shipment" element={<TrackShipment />} />
          <Route path="my-address" element={<MyAddress />} />
          <Route path="document" element={<Document />} />
        </Route>

        {/* Admin */}

        {/* Admin */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminPannel />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardAdmin />} />

          <Route path="dashboard" element={<DashboardAdmin />} />

          <Route path="manage-users" element={<ManageUsers />} />
          <Route path="manage-transporters" element={<ManageTransporters />} />
          <Route path="add-category" element={<AddCategory />} />
          <Route path="add-sub-category" element={<AddSubCategory />} />
          <Route path="edit-profile" element={<EPAdmin />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route
          path="/transporter"
          element={
            <ProtectedRoute allowedRoles={["transporter"]}>
              <TransporterLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<TransporterDashboard />} />

          <Route path="available-jobs" element={<AvailableJobs />} />

          <Route path="active-deliveries" element={<ActiveDeliveries />} />

          <Route path="my-bookings" element={<MyBookings />} />

          <Route path="earnings" element={<Earnings />} />
          <Route path="vehicle-management" element={<VehicleManagement />} />
          <Route path="documents" element={<TransporterDocuments />} />
          <Route path="reviews" element={<Reviews />} />

          <Route path="profile" element={<TPProfile />} />
        </Route>

        {/* Catch-all — koi bhi galat/unknown URL yahin aayega */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <AIChatBot />
    </>
  );
}

export default App;