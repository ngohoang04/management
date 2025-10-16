import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login"
import Register from "./pages/register";
import Dashboard from "./pages/Dashboard";
import Inbound from "./pages/Inbound";
import Transport from "./pages/Transport";
import Warehouse from "./pages/Warehouse";
import Customers from "./pages/Customers";
import Suppliers from "./pages/Suppliers";
import Reports from "./pages/Reports";
import Account from "./pages/Account";
import Setup from "./pages/Setup";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./components/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Mặc định khi mở app sẽ chuyển đến /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="inbound" element={<Inbound />} />
          <Route path="transport" element={<Transport />} />
          <Route path="warehouse" element={<Warehouse />} />
          <Route path="customers" element={<Customers />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="reports" element={<Reports />} />
          <Route path="account" element={<Account />} />
          <Route path="setup-users" element={<Setup />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
