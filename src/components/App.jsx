import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Landing Page/LandingPage";
import RegistrationPage from "./registration_page/RegistrationPage";
import ProjectPage from "./Project Page/ProjectPage";
import InputDesign from "./Dashboard/InputDesign";
import RFQPage from "./RFQ Management/RFQPage";
import SupplierComparison from "./Supplier Comparsion/SupplierComparison";
import PurchaseOrderPage from "./Share PO page/PurchaseOrderPage";
import POSummary from "./PO summary and status/POSummary";
import PurchaseOrder from "./Orders and Tracking/PurchaseOrder";
import DeliveryPage from "./DeliveryVerification and Feedback/DeliveryPage";
import OrderDetails from "./Order Overview Page/OrderDetails";
import OrderTrackingPage from "./Shipment Tracking/OrderTrackingPage";
import CreateRFQ from "./CreateRFQ/CreateRFQ";
import RFQManagement from "./RFQManagementV1.1/RFQManagement";
import Login from "./Login Page/Login";
import Register from "./Register Page/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/project" element={<ProjectPage />} />
        <Route path="/dashboard" element={<InputDesign />} />
        <Route path="/rfq" element={<RFQPage />} />
        <Route path="/compare" element={<SupplierComparison />} />
        <Route path="/purchaseOrder" element={<PurchaseOrderPage />} />
        <Route path="/orderSummary" element={<POSummary />} />
        <Route path="/orders" element={<PurchaseOrder />} />
        <Route path="/feedback" element={<DeliveryPage />} />
        <Route path="/overview" element={<OrderDetails />} />
        <Route path="/track" element={<OrderTrackingPage />} />
        <Route path="/rfqPage" element={<CreateRFQ />} />
        <Route path="/rfqManage" element={<RFQManagement />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userRegistration" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
