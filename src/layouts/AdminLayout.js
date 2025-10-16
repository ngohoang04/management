import React, { useContext, useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";
import "./AdminLayout.css";

const AdminLayout = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    if (!user) {
        return null;
    }

    const handleLogout = () => {
        logout();
        navigate("/login");
    };
    
    const getNavLinkClass = ({ isActive }) => {
        return isActive ? "navLink active" : "navLink";
    };

    return (
        <div className="adminLayout">
            <aside className="sidebar">
                <h3>QUẢN LÝ CONTAINER</h3>
                <nav className="sidebarNav">
                    <ul>
                        <li><NavLink to="/admin/dashboard" className={getNavLinkClass}>🏠 Dashboard</NavLink></li>
                        <li><NavLink to="/admin/inbound" className={getNavLinkClass}>📦 Nhập Container</NavLink></li>
                        <li><NavLink to="/admin/transport" className={getNavLinkClass}>🚚 Vận chuyển</NavLink></li>
                        <li><NavLink to="/admin/warehouse" className={getNavLinkClass}>🏭 Quản lý kho</NavLink></li>


                        {user.role === "admin" && (
                            <>
                                <li><NavLink to="/admin/customers" className={getNavLinkClass}>👥 Khách hàng</NavLink></li>
                                <li><NavLink to="/admin/suppliers" className={getNavLinkClass}>🏢 Nhà cung cấp</NavLink></li>
                                <li><NavLink to="/admin/setup-users" className={getNavLinkClass}>⚙️ Setup Users</NavLink></li>
                            </>
                        )}

                        <li><NavLink to="/admin/reports" className={getNavLinkClass}>📊 Báo cáo</NavLink></li>
                        <li><NavLink to="/admin/account" className={getNavLinkClass}>👤 Tài khoản</NavLink></li>
                    </ul>
                </nav>

                <button onClick={handleLogout} className="logoutButton">
                    Đăng xuất
                </button>
            </aside>

            <main className="mainContent">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;