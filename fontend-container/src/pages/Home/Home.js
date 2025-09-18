// src/components/Home.js
import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <section className="hero-section">
        <p className="subtitle">VỀ CHÚNG TÔI</p>
        <h1 className="main-title">TIN CẬY, CHUYÊN NGHIỆP</h1>
        <p className="hero-description">
          Quản Lý Container là giải pháp hàng đầu, mang đến sự tiện lợi và hiệu quả tối đa cho mọi hoạt động quản lý logistics. Với kinh nghiệm lâu năm, chúng tôi cam kết mang lại giá trị bền vững cho doanh nghiệp của bạn.
        </p>
      </section>

      <section className="stats-section">
        <div className="stats-overlay">
          <p className="stats-text">30 NĂM TIÊN PHONG CUNG CẤP GIẢI PHÁP LOGISTICS HÀNG ĐẦU</p>
        </div>
      </section>

      <section className="features-section">
        <h2 className="features-title">GIẢI PHÁP TỐI ƯU CHO DOANH NGHIỆP CỦA BẠN</h2>
        <div className="features-grid">
          <div className="feature-card">
            <i className="fa-solid fa-circle-check"></i>
            <h3>Quản Lý Hiệu Quả</h3>
            <p>Tối ưu hóa quy trình với các công cụ quản lý thông minh, giúp bạn kiểm soát mọi hoạt động một cách dễ dàng.</p>
          </div>
          <div className="feature-card">
            <i className="fa-solid fa-bolt"></i>
            <h3>Tăng Tốc Vận Hành</h3>
            <p>Hệ thống tự động hóa giúp rút ngắn thời gian xử lý, giảm thiểu sai sót và tăng năng suất đáng kể.</p>
          </div>
          <div className="feature-card">
            <i className="fa-solid fa-shield-halved"></i>
            <h3>An Toàn Tuyệt Đối</h3>
            <p>Dữ liệu của bạn được bảo mật với các công nghệ tiên tiến nhất, đảm bảo an toàn cho mọi giao dịch.</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Sẵn sàng bắt đầu?</h2>
        <p>Tham gia cùng hàng ngàn doanh nghiệp tin dùng Quản Lý Container ngay hôm nay.</p>
        <button className="cta-button">Đăng ký ngay</button>
      </section>
    </div>
  );
};

export default Home;