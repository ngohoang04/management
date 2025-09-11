import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Inbound from "./pages/Inbound";
import Outbound from "./pages/Outbound";
import ContainerDetail from "./pages/ContainerDetail";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import "./App.css";

function App() {
  const [isAuth, setAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setAuth(true);
  }, []);

  return (
    <Router>
      <div className="app">
        {isAuth && <Navbar />}
        <main className="p-4">
          <Routes>
            {!isAuth ? (
              <>
                <Route path="/login" element={<Login setAuth={setAuth} />} />
                <Route path="/signup" element={<Signup setAuth={setAuth} />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </>
            ) : (
              <>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/inbound" element={<Inbound />} />
                <Route path="/outbound" element={<Outbound />} />
                <Route path="/inventory/:id" element={<ContainerDetail />} />
                <Route path="*" element={<Navigate to="/dashboard" />} />
              </>
            )}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
