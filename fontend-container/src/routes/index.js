// src/routes/index.js (hoặc file routes của bạn)

import React from 'react';
// import { Routes, Route } from 'react-router-dom'; // Không cần 2 dòng này nữa
// vì chúng ta sẽ dùng useRoutes

import LayoutDefault from '../Layout/LayoutDefaut';
import Home from '../pages/Home/Home';
import Client from '../pages/Client/Client';
import Introduction from '../pages/Introduction/Introduction';
import Service from '../pages/Service/Service';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register'; // Thêm trang Register
import Error404 from '../pages/Error404/Error404';
import PrivateRoutes from '../components/PrivateRoutes';

const routes = [
    {
        // Layout chính sẽ bao bọc tất cả các route con bên trong nó
        element: <LayoutDefault />,
        children: [
            // --- Các route công khai (Public) ---
            {
                path: '/',
                element: <Home />
            },
            {
                path: 'introduction',
                element: <Introduction />
            },
            {
                path: 'service',
                element: <Service />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'register', // Thêm route cho trang Register
                element: <Register />
            },

            // --- Nhóm các route cần bảo vệ (Private) ---
            {
                element: <PrivateRoutes />,
                children: [
                    {
                        path: 'client', // Ví dụ: trang Khách hàng cần đăng nhập
                        element: <Client />
                    },
                    // Thêm các trang private khác ở đây, ví dụ: /dashboard, /profile...
                ]
            },

            // --- Route cho trang không tồn tại ---
            {
                path: '*',
                element: <Error404 />
            }

        
        ]
    },
    // Không cần route cho Logout, vì logout là một hành động, không phải một trang
];

export default routes;