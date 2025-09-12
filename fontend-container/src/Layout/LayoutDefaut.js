
import { Link, Outlet } from 'react-router-dom';
import React from 'react';
import './LayoutDefaut.css'; 
function LayoutDefault() {
  return (
    <>
            <header className="header">
      <div className="header-container">
        <div className="logo">
       
          <span className="logo-text">Quản Lý Container</span>
        </div>
        <nav className="navigation">
          <ul>
            <li>
            <Link to="/">Trang chủ</Link>
          </li>
          {/* <li>
            <Link to="/auth">Đăng nhập</Link>
          </li> */}
          <li>
            <Link to="/client">Khách hàng</Link>
          </li>
          <li>
            <Link to="/introduction">Giới thiệu</Link>
          </li>
          <li>
            <Link to="/service">Dịch vụ</Link>
          </li>
          </ul>
        </nav>

       
        <div className="contact-info">
          <a href="tel:1900636648" className="phone-number"></a>
        </div>
      </div>
    </header>

    <main  className="main-content">

    <Outlet />
    </main>



    <footer className="footer-container">
            <div className="footer-main">
                <div className="footer-logo-col">
                    
                    <p>High Technology, Great Success</p>
                </div>
                <div className="footer-link-col">
                    <h4>Điều khoản sử dụng</h4>
                    <ul>
                        <li><a href="#">Chính sách bảo mật</a></li>
                        <li><a href="#">Lược đồ Website</a></li>
                    </ul>
                </div>
                <div className="footer-link-col">
                    <h4>Tuyển dụng</h4>
                    <ul>
                        <li><a href="#">Hỗ trợ</a></li>
                        <li><a href="#">Liên hệ</a></li>
                    </ul>
                </div>
                <div className="footer-newsletter-col">
                    <h4>Bản tin Công nghệ</h4>
                    <div className="newsletter-form">
                        <input type="email" placeholder="Đăng ký email" />
                        <button type="submit">Gửi</button>
                    </div>
                </div>
                <div className="footer-back-to-top">
                    <a href="#top">
                        Back To Top
                    </a>
                   
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; Nhóm 7</p>
            </div>
        </footer>
    </>
     
  );
}

export default LayoutDefault;