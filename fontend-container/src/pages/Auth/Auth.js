// src/context/AuthContext.js

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios'; // Dùng để lấy thông tin người dùng

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            if (token) {
                try {
                    // Giả sử API của bạn có một endpoint /api/auth/me để lấy thông tin user từ token
                    const res = await axios.get('/api/auth/me', {
                        headers: { 'x-auth-token': token }
                    });
                    setUser(res.data);
                    setIsAuthenticated(true);
                } catch (err) {
                    // Token không hợp lệ -> Đăng xuất
                    localStorage.removeItem('token');
                    setToken(null);
                    setUser(null);
                    setIsAuthenticated(false);
                }
            }
        };
        fetchUser();
    }, [token]);

    const login = (newToken) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};


