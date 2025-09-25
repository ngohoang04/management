// src/contexts/AuthContext.js

import React, { createContext, useState, useEffect } from 'react';

// 1. Tạo Context
export const AuthContext = createContext();

// 2. Tạo Provider
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    // Kiểm tra trạng thái đăng nhập khi ứng dụng khởi động
    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        const userToken = localStorage.getItem('userToken');

        if (userInfo && userToken) {
            setIsAuthenticated(true);
            setUser(JSON.parse(userInfo));
        }
    }, []);

    // Hàm đăng nhập
    const login = (userData) => {
        localStorage.setItem('userToken', 'fake-token'); // Lưu token giả lập
        localStorage.setItem('userInfo', JSON.stringify(userData));
        setIsAuthenticated(true);
        setUser(userData);
    };

    // Hàm đăng xuất
    const logout = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userInfo');
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};