import React, { useState } from 'react';
import './Login.css';

const Login = () => {
   
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e) ; 
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <h2>Đăng nhập</h2>
            <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    // id="email
                    // value={email}"
                    // onChange={(e) => setEmail(e.target.value)}
                    // required

                    placeholder='Nhập email'
                />
            </div>
            <div className="input-group">
                <label htmlFor="password">Mật khẩu</label>
                <input
                    type="password"
                    // id="password"
                    // value={password}
                    // onChange={(e) => setPassword(e.target.value)}
                    // required 

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