import { Link, NavLink, Outlet } from 'react-router-dom';
import React from 'react';
import './LayoutDefaut.css';

function LayoutDefault() {
    return (
        <>
            <header className="header">
                <div className="header-container">
                    <div className="logo">
                        {/* The logo text is now a clickable link to the home page */}
                        <Link to="/">
                            <span className="logo-text">Quản Lý Container</span>
                        </Link>
                    </div>
                    <nav className="navigation">
                        <ul>
                            <li>
                                <NavLink to="/" exact="true">Trang chủ</NavLink>
                            </li>
                            <li>
                                <NavLink to="/client">Khách hàng</NavLink>
                            </li>
                            <li>
                                <NavLink to="/introduction">Giới thiệu</NavLink>
                            </li>
                            <li>
                                <NavLink to="/service">Dịch vụ</NavLink>
                            </li>
                        </ul>
                    </nav>

                    <div className="Login">
                        <Link to="/Login">Đăng nhập</Link>
                    </div>
                </div>
            </header>

            <main className="main-content">
                <Outlet />
            </main>

            
        </>
    );
}

export default LayoutDefault;