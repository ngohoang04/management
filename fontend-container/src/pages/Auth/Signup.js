import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../services/api";
import AuthForm from "../../components/AuthForm";

export default function Login({ setAuth }) {
  const navigate = useNavigate();

  const handleLogin = async (creds) => {
    const res = await loginUser(creds);
    if (res.success) {
      localStorage.setItem("token", res.token);
      setAuth(true);
      navigate("/dashboard");
    }
  };

  return (
    <div>
      <AuthForm mode="login" onSubmit={handleLogin} />
      <p className="text-center mt-4">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-blue-600">
          Sign Up
        </Link>
      </p>
    </div>
  );
}