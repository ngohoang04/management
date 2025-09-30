import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    Tự động redirect nếu đã đăng nhập
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            navigate('/admin');
        }
    }, [navigate]);

    const handleLogin = async (event) => {
        event.preventDefault();
        setError('');
        setLoading(true);

        try {
            // 1. Kiểm tra localUsers (nếu muốn test nhanh)
            const localUsers = JSON.parse(localStorage.getItem('localUsers')) || [];
            const localUser = localUsers.find(u => u.username === username && u.password === password);

            if (localUser) {
                localStorage.setItem('accessToken', `fake-access-token-${localUser.id}`);
                localStorage.setItem('refreshToken', `fake-refresh-token-${localUser.id}`);
                localStorage.setItem('userInfo', JSON.stringify(localUser));
                navigate('/admin');
                return;
            }

            // 2. Kiểm tra API
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Đăng nhập thất bại.');
            }

            // Lưu accessToken, refreshToken và userInfo
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            localStorage.setItem('userInfo', JSON.stringify(data.user));

            navigate('/admin');

        } catch (err) {
            console.error('Lỗi đăng nhập:', err);
            setError(err.message || 'Có lỗi xảy ra. Vui lòng thử lại.');
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
                            onChange={e => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="login-password">Mật khẩu</label>
                        <input
                            type="password"
                            id="login-password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="btn" disabled={loading}>
                        {loading ? 'Đang xử lý...' : 'Đăng Nhập'}
                    </button>
                </form>
                <div className="switch-link">
                    <p>Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Login;
