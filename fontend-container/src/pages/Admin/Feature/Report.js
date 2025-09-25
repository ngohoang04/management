import React, { useState, useEffect } from 'react';
import { 
  FiBarChart2, // Corrected: Replaced FiBarChart3 with FiBarChart2
  FiDownload, 
  FiPrinter,
  FiCalendar,
  FiTrendingUp,
  FiTrendingDown,
  FiPackage,
  FiTruck,
  FiArchive, // FiWarehouse was already replaced with FiArchive
  FiUsers
} from 'react-icons/fi';

const Reports = ({ currentUser, addToast }) => {
  const [reportType, setReportType] = useState('inventory');
  const [dateRange, setDateRange] = useState({
    startDate: '2024-01-01',
    endDate: '2024-01-31'
  });
  const [reportData, setReportData] = useState({});

  useEffect(() => {
    // Mock report data
    const mockData = {
      inventory: {
        totalContainers: 1250,
        inbound: 145,
        outbound: 132,
        inStock: 973,
        trends: {
          inboundChange: 12,
          outboundChange: -5,
          stockChange: 8
        },
        byType: [
          { type: '20ft', count: 650, percentage: 52 },
          { type: '40ft', count: 400, percentage: 32 },
          { type: '40ft HC', count: 150, percentage: 12 },
          { type: '45ft', count: 50, percentage: 4 }
        ],
        byZone: [
          { zone: 'Khu A', count: 350, capacity: 400, utilization: 87.5 },
          { zone: 'Khu B', count: 320, capacity: 400, utilization: 80 },
          { zone: 'Khu C', count: 303, capacity: 400, utilization: 75.8 }
        ]
      },
      quality: {
        totalInspected: 145,
        passed: 138,
        failed: 7,
        passRate: 95.2,
        gradeDistribution: [
          { grade: 'A', count: 85, percentage: 58.6 },
          { grade: 'B', count: 53, percentage: 36.6 },
          { grade: 'C', count: 5, percentage: 3.4 },
          { grade: 'D', count: 2, percentage: 1.4 }
        ],
        commonIssues: [
          { issue: 'Niêm phong bị hỏng', count: 3 },
          { issue: 'Container bẩn', count: 2 },
          { issue: 'Giấy tờ thiếu', count: 2 }
        ]
      },
      transport: {
        totalTrips: 45,
        completed: 42,
        inProgress: 3,
        onTimeRate: 93.3,
        averageDeliveryTime: 2.3,
        byRoute: [
          { route: 'Hà Nội - TP.HCM', trips: 15, onTime: 14 },
          { route: 'Hà Nội - Đà Nẵng', trips: 12, onTime: 11 },
          { route: 'Hà Nội - Hải Phòng', trips: 18, onTime: 17 }
        ]
      }
    };
    
    setReportData(mockData);
  }, [reportType, dateRange]);

  const handleDateChange = (field, value) => {
    setDateRange(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleExport = (format) => {
    addToast(`Đang xuất báo cáo định dạng ${format.toUpperCase()}...`, 'info');
    // Simulate export
    setTimeout(() => {
      addToast(`Báo cáo đã được xuất thành công`, 'success');
    }, 2000);
  };

  const handlePrint = () => {
    addToast('Đang chuẩn bị in báo cáo...', 'info');
    window.print();
  };

  const renderInventoryReport = () => {
    const data = reportData.inventory;
    if (!data) return null;

    return (
      <div className="report-content">
        <div className="report-summary">
          <div className="summary-cards">
            <div className="summary-card">
              <div className="card-icon">
                <FiPackage />
              </div>
              <div className="card-content">
                <h3>{data.totalContainers}</h3>
                <p>Tổng container</p>
                <span className={`trend ${data.trends.stockChange >= 0 ? 'positive' : 'negative'}`}>
                  {data.trends.stockChange >= 0 ? <FiTrendingUp /> : <FiTrendingDown />}
                  {Math.abs(data.trends.stockChange)}%
                </span>
              </div>
            </div>

            <div className="summary-card">
              <div className="card-icon">
                <FiTruck />
              </div>
              <div className="card-content">
                <h3>{data.inbound}</h3>
                <p>Nhập trong tháng</p>
                <span className={`trend ${data.trends.inboundChange >= 0 ? 'positive' : 'negative'}`}>
                  {data.trends.inboundChange >= 0 ? <FiTrendingUp /> : <FiTrendingDown />}
                  {Math.abs(data.trends.inboundChange)}%
                </span>
              </div>
            </div>

            <div className="summary-card">
              <div className="card-icon">
                <FiArchive /> {/* Corrected: Changed from FiWarehouse */}
              </div>
              <div className="card-content">
                <h3>{data.outbound}</h3>
                <p>Xuất trong tháng</p>
                <span className={`trend ${data.trends.outboundChange >= 0 ? 'positive' : 'negative'}`}>
                  {data.trends.outboundChange >= 0 ? <FiTrendingUp /> : <FiTrendingDown />}
                  {Math.abs(data.trends.outboundChange)}%
                </span>
              </div>
            </div>

            <div className="summary-card">
              <div className="card-icon">
                <FiBarChart2 /> {/* Corrected: Changed from FiBarChart3 */}
              </div>
              <div className="card-content">
                <h3>{data.inStock}</h3>
                <p>Tồn kho hiện tại</p>
                <span className="trend positive">
                  <FiTrendingUp />
                  Ổn định
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="report-charts">
          <div className="chart-section">
            <h4>Phân bố theo loại container</h4>
            <div className="chart-placeholder">
              <div className="bar-chart">
                {data.byType.map((item, index) => (
                  <div key={index} className="bar-item">
                    <div className="bar-label">{item.type}</div>
                    <div className="bar-container">
                      <div 
                        className="bar-fill"
                        style={{ height: `${item.percentage * 2}px` }}
                      ></div>
                    </div>
                    <div className="bar-value">{item.count}</div>
                  </div>
                ))}
              </div>
              </div>
              </div>

          <div className="chart-section">
            <h4>Tình trạng kho bãi</h4>
            <div className="zone-utilization">
              {data.byZone.map((zone, index) => (
                <div key={index} className="zone-item">
                  <div className="zone-info">
                    <span className="zone-name">{zone.zone}</span>
                    <span className="zone-stats">{zone.count}/{zone.capacity}</span>
                  </div>
                  <div className="utilization-bar">
                    <div 
                      className="utilization-fill"
                      style={{ width: `${zone.utilization}%` }}
                    ></div>
                  </div>
                  <span className="utilization-percent">{zone.utilization}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderQualityReport = () => {
    const data = reportData.quality;
    if (!data) return null;

    return (
      <div className="report-content">
        <div className="report-summary">
          <div className="summary-cards">
            <div className="summary-card">
              <div className="card-content">
                <h3>{data.totalInspected}</h3>
                <p>Tổng số kiểm tra</p>
              </div>
            </div>

            <div className="summary-card">
              <div className="card-content">
                <h3>{data.passed}</h3>
                <p>Đạt yêu cầu</p>
              </div>
            </div>

            <div className="summary-card">
              <div className="card-content">
                <h3>{data.failed}</h3>
                <p>Không đạt</p>
              </div>
            </div>

            <div className="summary-card">
              <div className="card-content">
                <h3>{data.passRate}%</h3>
                <p>Tỷ lệ đạt</p>
              </div>
            </div>
          </div>
        </div>

        <div className="report-charts">
          <div className="chart-section">
            <h4>Phân bố xếp loại chất lượng</h4>
            <div className="grade-distribution">
              {data.gradeDistribution.map((grade, index) => (
                <div key={index} className="grade-item">
                  <div className="grade-label">Loại {grade.grade}</div>
                  <div className="grade-bar">
                    <div 
                      className="grade-fill"
                      style={{ width: `${grade.percentage}%` }}
                    ></div>
                  </div>
                  <div className="grade-stats">
                    <span>{grade.count}</span>
                    <span>({grade.percentage}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="chart-section">
            <h4>Vấn đề thường gặp</h4>
            <div className="issues-list">
              {data.commonIssues.map((issue, index) => (
                <div key={index} className="issue-item">
                  <span className="issue-name">{issue.issue}</span>
                  <span className="issue-count">{issue.count} lần</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderTransportReport = () => {
    const data = reportData.transport;
    if (!data) return null;

    return (
      <div className="report-content">
        <div className="report-summary">
          <div className="summary-cards">
            <div className="summary-card">
              <div className="card-content">
                <h3>{data.totalTrips}</h3>
                <p>Tổng chuyến</p>
              </div>
              </div>

            <div className="summary-card">
              <div className="card-content">
                <h3>{data.completed}</h3>
                <p>Hoàn thành</p>
              </div>
            </div>

            <div className="summary-card">
              <div className="card-content">
                <h3>{data.onTimeRate}%</h3>
                <p>Tỷ lệ đúng hạn</p>
              </div>
            </div>

            <div className="summary-card">
              <div className="card-content">
                <h3>{data.averageDeliveryTime}</h3>
                <p>Thời gian TB (ngày)</p>
              </div>
            </div>
          </div>
        </div>

        <div className="report-charts">
          <div className="chart-section">
            <h4>Hiệu suất theo tuyến đường</h4>
            <div className="route-performance">
              {data.byRoute.map((route, index) => (
                <div key={index} className="route-item">
                  <div className="route-info">
                    <span className="route-name">{route.route}</span>
                    <span className="route-stats">{route.onTime}/{route.trips} chuyến</span>
                  </div>
                  <div className="performance-bar">
                    <div 
                      className="performance-fill"
                      style={{ width: `${(route.onTime / route.trips) * 100}%` }}
                    ></div>
                  </div>
                  <span className="performance-percent">
                    {Math.round((route.onTime / route.trips) * 100)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderReportContent = () => {
    switch (reportType) {
      case 'inventory':
        return renderInventoryReport();
      case 'quality':
        return renderQualityReport();
      case 'transport':
        return renderTransportReport();
      default:
        return renderInventoryReport();
    }
  };

  return (
    <div className="reports">
      <div className="page-header">
        <div className="page-title">
          <h2>Báo cáo & Thống kê</h2>
          <span className="page-subtitle">Phân tích dữ liệu hoạt động</span>
        </div>
        <div className="report-actions">
          <button 
            className="btn btn-secondary"
            onClick={handlePrint}
          >
            <FiPrinter />
            In báo cáo
          </button>
          <button 
            className="btn btn-success"
            onClick={() => handleExport('excel')}
          >
            <FiDownload />
            Xuất Excel
          </button>
          <button 
            className="btn btn-danger"
            onClick={() => handleExport('pdf')}
          >
            <FiDownload />
            Xuất PDF
          </button>
        </div>
        </div>

      <div className="report-controls">
        <div className="report-type-selector">
          <button 
            className={`type-btn ${reportType === 'inventory' ? 'active' : ''}`}
            onClick={() => setReportType('inventory')}
          >
            <FiPackage />
            Nhập-Xuất-Tồn
          </button>
          <button 
            className={`type-btn ${reportType === 'quality' ? 'active' : ''}`}
            onClick={() => setReportType('quality')}
          >
            <FiBarChart2 /> {/* Corrected: Changed from FiBarChart3 */}
            Chất lượng
          </button>
          <button 
            className={`type-btn ${reportType === 'transport' ? 'active' : ''}`}
            onClick={() => setReportType('transport')}
          >
            <FiTruck />
            Vận chuyển
          </button>
        </div>

        <div className="date-range-selector">
          <div className="date-input">
            <FiCalendar />
            <input
              type="date"
              value={dateRange.startDate}
              onChange={(e) => handleDateChange('startDate', e.target.value)}
            />
          </div>
          <span>đến</span>
          <div className="date-input">
            <FiCalendar />
            <input
              type="date"
              value={dateRange.endDate}
              onChange={(e) => handleDateChange('endDate', e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="report-container">
        {renderReportContent()}
      </div>
    </div>
  );
};

export default Reports;