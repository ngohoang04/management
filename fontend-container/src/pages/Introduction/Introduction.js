// src/components/Introduction.js
import React from 'react';
import './Introduction.css'; // File CSS cho styling

const Introduction = () => {
  return (
    <div className="gioi-thieu-container">
      <div className="gioi-thieu-header">
        <h1>Giới thiệu về Quản Lý Container</h1>
      </div>

      <section className="gioi-thieu-section">
        <h2>Tầm Nhìn Và Sứ Mệnh Của Chúng Tôi</h2>
        <p>Chào mừng bạn đến với Quản Lý Container - giải pháp toàn diện và hiệu quả cho mọi nhu cầu về quản lý và vận hành container của bạn. Chúng tôi được thành lập với tầm nhìn trở thành đối tác tin cậy hàng đầu, cung cấp các dịch vụ chất lượng cao, chuyên nghiệp và tối ưu hóa quy trình logistics cho khách hàng.</p>
        <p>Sứ mệnh của chúng tôi là **đơn giản hóa sự phức tạp**. Trong một thế giới logistics luôn thay đổi, chúng tôi cam kết cung cấp một nền tảng trực quan và mạnh mẽ, giúp bạn dễ dàng theo dõi, điều phối và quản lý container mọi lúc, mọi nơi. Chúng tôi không chỉ cung cấp một sản phẩm, mà còn mang đến một giải pháp toàn diện, giúp bạn tiết kiệm thời gian, chi phí và tối đa hóa hiệu suất kinh doanh.</p>
      </section>

      <section className="gioi-thieu-section">
        <h2>Tại Sao Lại Chọn Quản Lý Container?</h2>
        <ul className="list-features">
          <li>**Công Nghệ Tiên Tiến:** Chúng tôi sử dụng các công nghệ hiện đại nhất để đảm bảo độ chính xác và tính bảo mật cao cho dữ liệu của bạn. Hệ thống của chúng tôi được thiết kế để xử lý hàng nghìn giao dịch mỗi ngày, mang lại hiệu suất vượt trội.</li>
          <li>**Giao Diện Thân Thiện:** Giao diện người dùng được thiết kế tỉ mỉ, giúp ngay cả những người không chuyên cũng có thể dễ dàng sử dụng và nắm bắt thông tin.</li>
          <li>**Hỗ Trợ Khách Hàng Chuyên Nghiệp:** Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng lắng nghe và giải đáp mọi thắc mắc của bạn. Chúng tôi cam kết phản hồi nhanh chóng và cung cấp sự hỗ trợ tận tình, kịp thời.</li>
          <li>**Linh Hoạt và Tùy Chỉnh:** Mỗi doanh nghiệp đều có những nhu cầu riêng. Hệ thống của chúng tôi cho phép tùy chỉnh các chức năng và báo cáo, phù hợp với mô hình hoạt động và yêu cầu cụ thể của bạn.</li>
          <li>**Báo Cáo Toàn Diện:** Dễ dàng tạo các báo cáo chi tiết về tình trạng container, chi phí, lịch trình và nhiều hơn nữa.</li>
        </ul>
      </section>

      <section className="gioi-thieu-section">
        <h2>Hành Trình Phát Triển Của Chúng Tôi</h2>
        <p>Chúng tôi bắt đầu hành trình của mình với một mục tiêu đơn giản: tạo ra một công cụ quản lý container hiệu quả hơn. Từ những ngày đầu tiên, chúng tôi đã không ngừng lắng nghe ý kiến của khách hàng, cải tiến sản phẩm và mở rộng các tính năng.</p>
        <p>Chúng tôi tự hào đã trở thành đối tác của nhiều doanh nghiệp lớn nhỏ trong ngành logistics và vận tải, giúp họ vượt qua các thách thức và đạt được những thành công mới.</p>
      </section>
      
      <section className="gioi-thieu-cta">
        <h2>Hãy Tham Gia Cùng Chúng Tôi!</h2>
        <p>Nếu bạn đang tìm kiếm một giải pháp để nâng cao hiệu quả quản lý container, đừng ngần ngại **đăng ký** hoặc **liên hệ** với chúng tôi ngay hôm nay. Hãy để Quản Lý Container trở thành công cụ đắc lực, đưa doanh nghiệp của bạn tiến xa hơn!</p>
        <button className="cta-button" onClick={() => window.location.href='/dang-ky'}>Đăng ký ngay</button>
      </section>
    </div>
  );
};

export default Introduction;