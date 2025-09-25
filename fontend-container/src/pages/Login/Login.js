import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        setError("");
        setLoading(true);

        try {
            // --- Bước 1: Kiểm tra user trong localStorage (giả lập) ---
            const localUsers = JSON.parse(localStorage.getItem("localUsers")) || [];
            const localUser = localUsers.find(
                (u) => u.username === username && u.password === password
            );

            if (localUser) {
                alert("Đăng nhập thành công (localStorage)!");
                localStorage.setItem("userToken", `fake-token-${localUser.id}`);
                localStorage.setItem("userInfo", JSON.stringify(localUser));
                navigate("/");
                return;
            }

            // --- Bước 2: Gọi API login ---
            const response = await fetch("http://localhost:3000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Đăng nhập thất bại!");
            }

            // Giả sử backend trả về: { token, user }
            alert("Đăng nhập thành công (API)!");
            localStorage.setItem("userToken", data.token);
            localStorage.setItem("userInfo", JSON.stringify(data.user));
            navigate("/");
        } catch (err) {
            setError(err.message);
            console.error("Lỗi đăng nhập:", err);
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
                        <label htmlFor="login-username">Tên đăng nhập</label>
                        <input
                            type="text"
                            id="login-username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="login-password">Mật khẩu</label>
                        <input
                            type="password"
                            id="login-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Nhập mật khẩu"
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
