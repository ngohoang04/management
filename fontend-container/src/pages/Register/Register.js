import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Login/Login.css"; // Dùng chung CSS

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    setError("");

    try {
      // --- Bước 1: Gọi API giả để tạo user ---
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, email }),
      });

      const newUser = await response.json();

      if (!response.ok) {
        throw new Error(newUser.message || "Đăng ký thất bại, vui lòng thử lại.");
      }

      // --- Bước 2: Lấy danh sách user cục bộ ---
      const localUsers = JSON.parse(localStorage.getItem("localUsers")) || [];

      // --- Bước 3: Kiểm tra trùng username/email ---
      const exists = localUsers.some(
        (u) => u.username === username || u.email === email
      );
      if (exists) {
        throw new Error("Tên đăng nhập hoặc email đã tồn tại!");
      }

      // --- Bước 4: Tạo user mới ---
      newUser.id = Date.now(); // Fake id để tránh trùng
      newUser.password = password; // DummyJSON không trả về password

      localUsers.push(newUser);

      // --- Bước 5: Lưu lại localStorage ---
      localStorage.setItem("localUsers", JSON.stringify(localUsers));

      alert("Đăng ký thành công! Giờ bạn có thể đăng nhập.");
      navigate("/login");
    } catch (err) {
      setError(err.message);
      console.error("Lỗi đăng ký:", err);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Đăng Ký</h2>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="register-username">Tên đăng nhập</label>
            <input
              type="text"
              id="register-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="register-email">Email</label>
            <input
              type="email"
              id="register-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="register-password">Mật khẩu</label>
            <input
              type="password"
              id="register-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="btn">Đăng Ký</button>
        </form>
        <div className="switch-link">
          <p>
            Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
