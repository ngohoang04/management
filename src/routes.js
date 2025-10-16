// src/routes.js
import { FiHome, FiTruck, FiPackage, FiMapPin, FiArchive, FiUsers, FiUserCheck, FiBarChart2 } from "react-icons/fi";

export const routes = [
    { path: '/admin/dashboard', icon: FiHome, label: 'Dashboard', roles: ['admin', 'staff', 'viewer'] },
    { path: '/admin/inbound', icon: FiTruck, label: 'Nhập Container', roles: ['admin', 'staff'] },
    { path: '/admin/outbound', icon: FiPackage, label: 'Xuất kho', roles: ['admin', 'staff'] },
    { path: '/admin/transport', icon: FiMapPin, label: 'Vận chuyển', roles: ['admin', 'staff'] },
    { path: '/admin/warehouse', icon: FiArchive, label: 'Quản lý kho', roles: ['admin', 'staff', 'viewer'] },
    { path: '/admin/customers', icon: FiUsers, label: 'Khách hàng', roles: ['admin', 'staff'] },
    { path: '/admin/suppliers', icon: FiUserCheck, label: 'Nhà cung cấp', roles: ['admin', 'staff'] },
    { path: '/admin/reports', icon: FiBarChart2, label: 'Báo cáo', roles: ['admin', 'staff', 'viewer'] },
];
