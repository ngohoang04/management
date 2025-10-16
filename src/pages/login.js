    import React, { useState, useContext } from "react";
    import { useNavigate, Link } from "react-router-dom";
    import { AuthContext } from "../components/AuthContext";
    import "./Styles/Login.css"; // Import file CSS
    function Login() {
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [error, setError] = useState("");
        const navigate = useNavigate();
        const { setUser } = useContext(AuthContext); // ✅ lấy hàm setUser từ context

        const handleSubmit = async (e) => {
            e.preventDefault();
            setError("");

            try {
                const res = await fetch("http://localhost:3001/api/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                });

                const data = await res.json();
                console.log("✅ API trả về:", data);

                if (!res.ok || !data.success) throw new Error("Sai tài khoản hoặc mật khẩu!");

                // ✅ Nếu API chỉ trả token, ta cần decode token hoặc fetch lại user info
                const userData = data.user || parseJwt(data.token);

                // ✅ Lưu user vào localStorage và context
                localStorage.setItem("user", JSON.stringify(userData));
                setUser(userData);

                // ✅ Chuyển hướng sang Dashboard
                navigate("/admin/dashboard");
            } catch (err) {
                console.error("❌ Lỗi đăng nhập:", err);
                setError("Sai tài khoản hoặc mật khẩu!");
            }
        };

        // ✅ Hàm decode JWT để lấy role/email nếu API chỉ trả token
        function parseJwt(token) {
            try {
                return JSON.parse(atob(token.split(".")[1]));
            } catch (e) {
                return null;
            }
        }



        return (
  <div className="login-page-wrapper">
    <div className="login-container">
      <h2>Đăng nhập</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Đăng nhập</button>
      </form>

      <p>
        Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
      </p>
    </div>
  </div>
);

    }

    export default Login;
 