import React from 'react';
import './HeaderSection.css';
import { FaRegLightbulb, FaRegHeart, FaRegGem } from 'react-icons/fa';
import { FiUploadCloud } from 'react-icons/fi';

const valuesData = [
  {
    icon: <FaRegGem />,
    title: 'TÍN',
    description: 'Chữ Tín đặt lên hàng đầu, lấy chữ Tín làm trái tim của doanh nghiệp. Tất cả công việc đều phải lấy chữ Tín làm mục tiêu, xây dựng và bảo vệ chữ Tín như cuộc sống của từng thành viên trong công ty.'
  },
  {
    icon: <FaRegLightbulb />,
    title: 'TRÍ',
    description: 'Vận dụng Trí tuệ đỉnh cao, luôn không ngừng nghiên cứu, học hỏi để đưa vào các sản phẩm, dịch vụ với hàm lượng chất xám cao nhất, kế thừa và phát huy những tinh hoa trí tuệ của Việt Nam và Thế giới.'
  },
  {
    icon: <FaRegHeart />,
    title: 'TÂM',
    description: 'Mọi công việc và các mối quan hệ xã hội (đồng nghiệp, đối tác, khách hàng, gia đình) đều phải được người thực hiện bằng cái Tâm, coi sản phẩm dịch vụ công ty cung cấp như sản phẩm mà mỗi cá nhân được hưởng.'
  },
  {
    icon: <FiUploadCloud />,
    title: 'TIẾN',
    description: 'Luôn tự chủ và dũng cảm đương đầu với những khó khăn, thử thách, tiếp nhận và làm chủ những công nghệ mới nhất, tiến đến những sản phẩm hiện đại và hoàn thiện nhất.'
  }
];
const HeroSection = () => {
  return (
    <>

    <div class="about-us-section">
    <div class="about-us-content">
        <p class="section-subtitle">VỀ CHÚNG TÔI</p>
        <h2 class="section-title">Tin cậy, chuyên nghiệp</h2>
        <p class="section-description"> Heloooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo</p>
            
    </div>
</div>

    <div className="hero-section">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1>30 Năm Tiên Phong Cung Cấp Giải Pháp Và Dịch Vụ CNTT</h1>
        <p>Đồng hành cùng chính phủ và doanh nghiệp trên con đường chuyển đổi số</p>
        <button className="hero-btn">Tìm hiểu thêm</button>
      </div>
    </div>
        

    <section className="core-values-section">
      <div className="container">
        <p className="section-subtitle">GIÁ TRỊ CỐT LÕI</p>
        <h2 className="section-title">TÍN - TRÍ - TÂM - TIẾN</h2>
        <div className="values-grid">
          {valuesData.map((value, index) => (
            <div className="value-card" key={index}>
              <div className="value-icon">{value.icon}</div>
              <h3 className="value-title">{value.title}</h3>
              <p className="value-description">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>



    


    <footer className="footer-container">
            <div className="footer-main">
                <div className="footer-logo-col">
                    <img src="logo-intecom.png" alt="intecom logo" />
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
                        <button type="submit">
                            {/* Icon SVG */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send-fill" viewBox="0 0 16 16">
                                <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.768A.5.5 0 0 0 .152 6.51L8.74 10.377a.5.5 0 0 0 .58.58l3.867 8.588a.5.5 0 0 0 .753-.153z" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="footer-back-to-top">
                    <a href="#top">
                        {/* Icon SVG */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-short" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V3.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 3.707V11.5a.5.5 0 0 0 .5.5z" />
                        </svg>
                        Back To Top
                    </a>
                    <img src="dmca-protected.png" alt="DMCA protected" />
                </div>
            </div>
            <div className="footer-bottom">
                
            </div>
        </footer>
    );
    
    </>
    


    
  );
};

export default HeroSection;