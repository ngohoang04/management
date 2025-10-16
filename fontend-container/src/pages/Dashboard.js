import React, { useEffect, useState } from "react";
import "./Styles/Dashboard.css"; // Import file CSS

const API_CONTAINER = "http://localhost:3001/api/containers";
const API_WAREHOUSE = "http://localhost:3001/api/warehouses";

const Dashboard = () => {
  const [containers, setContainers] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resContainers, resWarehouses] = await Promise.all([
          fetch(API_CONTAINER),
          fetch(API_WAREHOUSE),
        ]);

        if (!resContainers.ok || !resWarehouses.ok)
          throw new Error("Lỗi khi lấy dữ liệu từ API");

        const containersData = await resContainers.json();
        const warehousesData = await resWarehouses.json();

        setContainers(Array.isArray(containersData.data) ? containersData.data : []);
        setWarehouses(Array.isArray(warehousesData.data) ? warehousesData.data : []);
      } catch (error) {
        console.error("❌ Lỗi:", error);
        setContainers([]);
        setWarehouses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="loading-message">Đang tải dữ liệu...</p>;

  // Tính toán các thông số
  const totalContainers = containers.length;
  const totalWarehouses = warehouses.length;
  const exportedCount = containers.filter((c) => c.status === "exported").length;

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-header">📦 Dashboard</h2>

      <div className="stats-container">
        <div className="stat-card">
          <h3>{totalContainers}</h3>
          <p>Tổng số Container</p>
        </div>
        <div className="stat-card">
          <h3>{totalWarehouses}</h3>
          <p>Tổng số Kho</p>
        </div>
        <div className="stat-card">
          <h3>{exportedCount}</h3>
          <p>Container đã xuất</p>
        </div>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Mã Container</th>
            <th>Loại</th>
            <th>Kích cỡ</th>
            <th>Trạng thái</th>
            <th>ID Kho</th>
            <th>ID Nhà cung cấp</th>
            <th>ID Khách hàng</th>
          </tr>
        </thead>
        <tbody>
          {containers.length === 0 ? (
            <tr>
              <td colSpan="7" className="no-data-cell">
                Không có dữ liệu để hiển thị
              </td>
            </tr>
          ) : (
            containers.map((item) => (
              <tr key={item.id}>
                <td>{item.container_code}</td>
                <td>{item.type}</td>
                <td>{item.size}</td>
                <td>{item.status}</td>
                <td>{item.warehouse_id || "N/A"}</td>
                <td>{item.supplier_id || "N/A"}</td>
                <td>{item.customer_id || "N/A"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;