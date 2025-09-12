import React, { useState } from 'react';
import './Login.css';
import { Login as performLogin } from '../../service/UserService';
import { useNavigate } from 'react-router-dom';
// import { setCookie, getCookie } from '../../helpers/cookie';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const response = await performLogin(email, password);
        console.log(response);
    

        if (response.length > 0) {
            alert('Đăng nhập thành công!');
            navigate('/');
        } else {
            alert('Đăng nhập thất bại. Vui lòng kiểm tra lại email và mật khẩu.');
        } 
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <h2>Đăng nhập</h2>
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
                Đăng nhập
            </button>
        </form>
    );
};

export default Login;