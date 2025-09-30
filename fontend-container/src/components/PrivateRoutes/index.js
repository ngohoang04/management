// src/components/PrivateRoutes/index.js (hoặc PrivateRoutes.js)

import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
// src/components/PrivateRoutes/index.js

import { AuthContext } from '../../helper/AuthContext'; 
import Admin from '../../pages/Admin/Admin';
// The path goes up two levels from PrivateRoutes and then into the helper folder.

const PrivateRoutes = () => {
    // Lấy trạng thái xác thực từ AuthContext
    const { isAuthenticated } = useContext(AuthContext);

    // Nếu người dùng đã đăng nhập, cho phép họ truy cập trang con (<Outlet />)
    // Ngược lại, chuyển hướng họ đến trang đăng nhập (<Navigate />)
    return isAuthenticated ? <Admin /> : <Navigate to="/login" />;
};

export default PrivateRoutes;