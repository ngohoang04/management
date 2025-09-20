
// src/components/Service.js
import React from 'react';
import './Service.css';

const Service = () => {
  const services = [
    {
      title: "Quản lý Hợp đồng & Khách hàng",
      description: "Theo dõi mọi hợp đồng, thông tin khách hàng và lịch sử giao dịch một cách chi tiết và bảo mật. Tự động hóa các thông báo quan trọng và quản lý tài liệu.",
      icon: "fa-solid fa-file-contract"
    },
    {
      title: "Theo dõi Vị trí Container",
      description: "Cập nhật vị trí thời gian thực của container. Tích hợp bản đồ trực quan, giúp bạn biết chính xác container đang ở đâu, từ kho đến cảng.",
      icon: "fa-solid fa-map-location-dot"
    },
    {
      title: "Điều phối & Vận hành",
      description: "Tối ưu hóa lịch trình vận chuyển và phân bổ tài nguyên hiệu quả. Nền tảng của chúng tôi giúp bạn điều phối xe, tài xế và container một cách liền mạch.",
      icon: "fa-solid fa-route"
    },
    {
      title: "Báo cáo & Phân tích",
      description: "Tạo báo cáo tùy chỉnh về hiệu suất, chi phí và lợi nhuận. Phân tích dữ liệu chuyên sâu để đưa ra quyết định kinh doanh chính xác.",
      icon: "fa-solid fa-chart-line"
    },
    {
      title: "Quản lý Kho bãi",
      description: "Kiểm soát số lượng container tồn kho, tình trạng sẵn có và các hoạt động nhập/xuất kho. Tích hợp quản lý không gian và tối ưu hóa lưu trữ.",
      icon: "fa-solid fa-warehouse"
    },
    {
      title: "Hỗ trợ Kỹ thuật 24/7",
      description: "Đội ngũ chuyên gia của chúng tôi luôn sẵn sàng hỗ trợ bạn mọi lúc, mọi nơi. Đảm bảo hệ thống của bạn luôn hoạt động trơn tru và hiệu quả.",
      icon: "fa-solid fa-headset"
    }
  ];

  return (
    <div className="service-container">
      <div className="service-header">
        <h1>Dịch vụ của chúng tôi</h1>
        <p>Chúng tôi cung cấp một bộ giải pháp toàn diện để tối ưu hóa mọi khía cạnh trong quản lý container của bạn.</p>
      </div>
      
      <div className="service-grid">
        {services.map((service, index) => (
          <div className="service-card" key={index}>
            <i className={service.icon}></i>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Service;