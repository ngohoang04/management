// src/components/Login.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Auth/Auth';
import "./Login.css"; // file CSS

const Login = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [isRegister, setIsRegister] = useState(false);
    const [message, setMessage] = useState("");

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const { name, email, password } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            if (isRegister) {
                // Gọi API đăng ký
                await axios.post('/api/auth/register', formData);
                setMessage("Đăng ký thành công!");
            } else {
                // Gọi API đăng nhập
                const res = await axios.post('/api/auth/login', { email, password });
                login(res.data.token);
                navigate('/profile');
            }
        } catch (err) {
            console.error(err.response?.data || err.message);
            setMessage("Có lỗi xảy ra!");
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
                        name="name"
                        value={name}
                        onChange={onChange}
                        placeholder="Nhập họ và tên"
                        required
                    />
                </div>
            )}

            <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    required
                    placeholder="Nhập email"
                />
            </div>

            <div className="input-group">
                <label htmlFor="password">Mật khẩu</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    required
                    placeholder="Nhập mật khẩu"
                />
            </div>

            <button type="submit" className="login-button">
                {isRegister ? "Đăng ký" : "Đăng nhập"}
            </button>

            <p className="toggle-text">
                {isRegister ? "Bạn đã có tài khoản?" : "Chưa có tài khoản?"}
                <span
                    className="toggle-link"
                    onClick={() => setIsRegister(!isRegister)}
                >
                    {isRegister ? " Đăng nhập" : " Đăng ký"}
                </span>
            </p>

            {message && <p className="message">{message}</p>}
        </form>
    );
};

export default Login;
