// src/components/Client.js
import React from 'react';
import './Client.css';

const Client = () => {
  const clients = [
    {
      name: "Tập đoàn Vận tải An Phát",
      logo: "fa-solid fa-truck-fast",
      testimonial: "Từ khi sử dụng Quản Lý Container, chúng tôi đã giảm 30% thời gian điều phối và tăng 20% hiệu suất vận hành. Đây là giải pháp không thể thiếu cho ngành logistics.",
      sector: "Logistics & Vận tải"
    },
    {
      name: "Công ty Xuất nhập khẩu Phương Nam",
      logo: "fa-solid fa-ship",
      testimonial: "Hệ thống theo dõi vị trí container thời gian thực đã giúp chúng tôi kiểm soát chuỗi cung ứng một cách chặt chẽ, mang lại sự an tâm tuyệt đối cho khách hàng.",
      sector: "Xuất nhập khẩu"
    },
    {
      name: "Tổng công ty Cảng biển Việt Nam",
      logo: "fa-solid fa-anchor",
      testimonial: "Giao diện trực quan và các báo cáo tùy chỉnh của Quản Lý Container đã hỗ trợ chúng tôi rất nhiều trong việc quản lý hàng ngàn container tại cảng mỗi ngày.",
      sector: "Cảng biển"
    },
    {
      name: "Thương mại Quốc tế Hùng Cường",
      logo: "fa-solid fa-globe",
      testimonial: "Đội ngũ hỗ trợ chuyên nghiệp của họ đã giúp chúng tôi giải quyết mọi vấn đề một cách nhanh chóng. Chúng tôi rất hài lòng với chất lượng dịch vụ.",
      sector: "Thương mại quốc tế"
    },
  ];

  return (
    <div className="client-container">
      <div className="client-header">
        <h1>Khách hàng của chúng tôi</h1>
        <p>Hàng ngàn doanh nghiệp tin tưởng và sử dụng Quản Lý Container để tối ưu hóa hoạt động logistics của họ.</p>
      </div>

      <div className="client-grid">
        {clients.map((client, index) => (
          <div className="client-card" key={index}>
            <i className={client.logo}></i>
            <h3 className="client-name">{client.name}</h3>
            <p className="client-sector">{client.sector}</p>
            <div className="client-quote">
              <i className="fa-solid fa-quote-left quote-icon"></i>
              <p className="testimonial-text">{client.testimonial}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Client;