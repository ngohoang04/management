import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Styles/register.css";
function Register() {
    const [formData, setFormData] = useState({
        username: "",
        full_name: "",
        email: "",
        phone: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    // Xử lý thay đổi input
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Gửi form đăng ký
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const res = await fetch("http://localhost:3001/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Đăng ký thất bại!");
            }

            setSuccess("🎉 Đăng ký thành công! Chuyển đến trang đăng nhập...");
            setTimeout(() => navigate("/"), 1500);
        } catch (err) {
            setError(err.message || "Đăng ký thất bại!");
        }
    };

    return (
    <div className="login-page-wrapper">
        <div className="register-container">
            <h2>Đăng ký tài khoản</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Tên đăng nhập..."
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="full_name"
                    placeholder="Họ và tên..."
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email..."
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="tel"
                    name="phone"
                    placeholder="Số điện thoại..."
                    value={formData.phone}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Mật khẩu..."
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}

                <button type="submit">Đăng ký</button>
            </form>

            <p>
                Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
            </p>
        </div>
        </div>
    );
}

export default Register;
