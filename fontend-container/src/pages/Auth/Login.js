import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Xử lý thay đổi input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Xử lý đăng nhập
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // ---- TEST LOCAL (Fake users lưu trong localStorage) ----
      const localUsers = JSON.parse(localStorage.getItem("localUsers")) || [];
      const found = localUsers.find(
        (u) => u.username === form.username && u.password === form.password
      );

      if (found) {
        localStorage.setItem("accessToken", `fake-access-${found.id}`);
        localStorage.setItem("refreshToken", `fake-refresh-${found.id}`);
        localStorage.setItem("userInfo", JSON.stringify(found));
        navigate("/admin");
        return;
      }

      // ---- GỌI API (chỉnh lại URL khi dùng thật) ----
      const res = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Đăng nhập thất bại");

      // ---- LƯU TOKEN + USER INFO ----
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("userInfo", JSON.stringify(data.user));

      navigate("/admin");
    } catch (err) {
      console.error("Lỗi đăng nhập:", err);
      setError(err.message || "Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Đăng Nhập</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Tên đăng nhập</label>
            <input
              id="username"
              name="username"
              type="text"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mật khẩu</label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Đang xử lý..." : "Đăng Nhập"}
          </button>
        </form>

        <div className="switch-link">
          <p>
            Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
