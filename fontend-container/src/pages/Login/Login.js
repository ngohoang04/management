// src/components/Login.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Auth/Auth';
import "./Login.css"; // <-- IMPORT FILE CSS

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/auth/login', formData);
            login(res.data.token);
            navigate('/profile'); // Chuyển hướng đến trang profile sau khi đăng nhập
        } catch (err) {
            console.error(err.response.data);
            // Thêm logic hiển thị lỗi cho người dùng ở đây
        }
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <h2>{isRegister ? "Đăng ký" : "Đăng nhập"}</h2>

            {isRegister && (
                <div className="input-group">
                    <label htmlFor="name">Họ và tên</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nhập họ và tên"
                        required
                    />
                </div>
            )}

            <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder='Nhập email'
                />
            </div>

            <div className="input-group">
                <label htmlFor="password">Mật khẩu</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder='Nhập mật khẩu'
                />
            </div>

            <button type="submit" className="login-button">
                {isRegister ? "Đăng ký" : "Đăng nhập"}
            </button>

            <p className="toggle-text">
                {isRegister ? "Bạn đã có tài khoản?" : "Chưa có tài khoản?"}
                <span className="toggle-link" onClick={() => setIsRegister(!isRegister)}>
                    {isRegister ? " Đăng nhập" : " Đăng ký"}
                </span>
            </p>

            {message && <p className="message">{message}</p>}
        </form>
    );
};

export default AuthForm;
