// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import "./Register.css"; // <-- IMPORT FILE CSS
const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    const { username, email, password } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            await axios.post('/api/auth/register', formData);
            navigate('/login'); // Chuyển hướng đến trang login sau khi đăng ký thành công
        } catch (err) {
            console.error(err.response.data);
            // Thêm logic hiển thị lỗi cho người dùng ở đây
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form-card">
                <h2 className="auth-title">Tạo tài khoản</h2>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="username">Tên người dùng</label>
                        <input
                            type="text"
                            id="username"
                            className="form-input"
                            placeholder="Nhập tên của bạn"
                            name="username"
                            value={username}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="form-input"
                            placeholder="Nhập email"
                            name="email"
                            value={email}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="password">Mật khẩu</label>
                        <input
                            type="password"
                            id="password"
                            className="form-input"
                            placeholder="Tối thiểu 6 ký tự"
                            name="password"
                            value={password}
                            onChange={onChange}
                            minLength="6"
                            required
                        />
                    </div>
                    <button type="submit" className="form-submit-btn">
                        Đăng ký
                    </button>
                </form>
                <p className="auth-switch-link">
                    Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;