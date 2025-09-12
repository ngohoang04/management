import React from 'react';
import './Header.css';
// import logo from '../../assets/logo.svg'; // Bạn có thể thêm logo của mình ở đây

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
       
          <span className="logo-text">Quản Lý Container</span>
        </div>
        <nav className="navigation">
          <ul>
            <li><a href="#gioi-thieu">Giới thiệu</a></li>
            <li><a href="#dich-vu">Dịch vụ</a></li>
            <li><a href="#du-an">Dự án</a></li>
            <li><a href="#khach-hang">Khách hàng</a></li>
            <li><a href="#blog">Blog</a></li>
          </ul>
        </nav>
        <div className="contact-info">
          <a href="tel:1900636648" className="phone-number"></a>
        </div>
      </div>
    </header>
  );
};

export default Header;