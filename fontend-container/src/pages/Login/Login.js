// src/pages/Auth/Login/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      // -- PHẦN SỬA LỖI BẮT ĐẦU TỪ ĐÂY --

      // Bước 1: Kiểm tra người dùng trong danh sách cục bộ trước
      const localUsers = JSON.parse(localStorage.getItem('localUsers')) || [];
      const localUser = localUsers.find(
        (u) => u.username === username && u.password === password
      );
      
      if (localUser) {
        // Nếu tìm thấy trong localStorage, đăng nhập thành công ngay lập tức
        alert('Đăng nhập thành công (tài khoản cục bộ)!');
        localStorage.setItem('userToken', `fake-token-for-${localUser.id}`);
        localStorage.setItem('userInfo', JSON.stringify(localUser));
        navigate('/');
        return; // Dừng hàm tại đây
      }

      // -- KẾT THÚC PHẦN SỬA LỖI --

      // Bước 2: Nếu không có trong cục bộ, tiếp tục kiểm tra với API
      const response = await fetch('https://dummyjson.com/users');
      const data = await response.json();

      if (!response.ok) throw new Error('Không thể tải dữ liệu người dùng.');

      const apiUser = data.users.find(
        (u) => u.username === username && u.password === password
      );

      if (apiUser) {
        // Đăng nhập thành công với tài khoản từ API
        alert('Đăng nhập thành công (tài khoản API)!');
        localStorage.setItem('userToken', `fake-token-for-${apiUser.id}`);
        localStorage.setItem('userInfo', JSON.stringify(apiUser));
        navigate('/');
      } else {
        // Sai thông tin đăng nhập
        setError('Tên đăng nhập hoặc mật khẩu không đúng!');
      }

    } catch (err) {
      setError(err.message);
      console.error('Lỗi đăng nhập:', err);
    } finally {
      setLoading(false);
    }
  };

  // JSX của component không thay đổi nhiều
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