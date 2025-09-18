// src/pages/Auth/Register/Register.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Login/Login.css'; // Dùng chung file CSS

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    setError('');

    try {
      // Bước 1: Vẫn gọi API để mô phỏng việc tạo user
      const response = await fetch('https://dummyjson.com/users/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email })
      });

      const newUser = await response.json();

      if (!response.ok) {
        throw new Error(newUser.message || 'Đăng ký thất bại, vui lòng thử lại.');
      }
      
      // -- PHẦN SỬA LỖI BẮT ĐẦU TỪ ĐÂY --

      // Bước 2: Lấy danh sách user đã đăng ký cục bộ (nếu có)
      const localUsers = JSON.parse(localStorage.getItem('localUsers')) || [];

      // Bước 3: Thêm người dùng mới vào danh sách này
      // Gán mật khẩu vào object user trả về từ API vì nó không chứa mật khẩu
      newUser.password = password; 
      localUsers.push(newUser);

      // Bước 4: Lưu lại danh sách đã cập nhật vào localStorage
      localStorage.setItem('localUsers', JSON.stringify(localUsers));
      
      // -- KẾT THÚC PHẦN SỬA LỖI --

      alert('Đăng ký thành công! Giờ bạn có thể đăng nhập bằng tài khoản này.');
      navigate('/login');

    } catch(err) {
      setError(err.message);
      console.error('Lỗi đăng ký:', err);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Đăng Ký</h2>
        <form onSubmit={handleRegister}>
          {/* Các trường input không thay đổi */}
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
          <p>Đã có tài khoản? <Link to="/login">Đăng nhập</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Register;