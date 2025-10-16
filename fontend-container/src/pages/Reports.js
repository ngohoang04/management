import React, { useState, useEffect } from "react";
// Import file CSS chung
import "./Styles/Inbound.css"; 

const API_URL = "http://localhost:3001/api/reports";

const ReportCRUD = () => {
    const [reports, setReports] = useState([]);
    const [form, setForm] = useState({
        report_type: "",
        content: "",
        created_by: "",
    });
    const [editId, setEditId] = useState(null);

    // --- STATE MỚI ĐỂ QUẢN LÝ MODAL ---
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ----- FETCH DATA -----
    const fetchReports = async () => {
        try {
            const res = await fetch(API_URL);
            const data = await res.json();
            if (data.success && Array.isArray(data.data)) {
                setReports(data.data);
            } else {
                setReports([]);
            }
        } catch (err) {
            console.error("Fetch error:", err);
            setReports([]);
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    // ----- HANDLE INPUT -----
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const resetForm = () => {
        setEditId(null);
        setForm({ report_type: "", content: "", created_by: "" });
    };

    // --- CÁC HÀM QUẢN LÝ MODAL ---
    const openAddModal = () => {
        resetForm();
        // Giả sử created_by là ID user đang đăng nhập (bạn cần lấy từ AuthContext)
        // Tạm thời hardcode là 1 nếu bạn chưa có context
        setForm(prev => ({ ...prev, created_by: 1 })); 
        setIsModalOpen(true);
    };

    const closeModal = () => {
        resetForm();
        setIsModalOpen(false);
    };

    // ----- ADD -----
    const handleAdd = async () => {
        try {
            const res = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (data.success) {
                alert(data.message);
                fetchReports();
                closeModal(); // Đóng modal
            } else {
                alert(data.message || "Thêm thất bại!");
            }
        } catch (err) {
            console.error("Add error:", err);
        }
    };

    // ----- EDIT -----
    const handleEdit = (report) => {
        setEditId(report.id);
        setForm({
            report_type: report.report_type || "",
            content: report.content || "",
            created_by: report.created_by || "",
        });
        setIsModalOpen(true); // Mở modal
    };

    // ----- UPDATE -----
    const handleUpdate = async () => {
        try {
            const res = await fetch(`${API_URL}/${editId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (data.success) {
                alert(data.message);
                fetchReports();
                closeModal(); // Đóng modal
            } else {
                alert(data.message || "Cập nhật thất bại!");
            }
        } catch (err) {
            console.error("Update error:", err);
        }
    };

    // ----- DELETE -----
    const handleDelete = async (id) => {
        if (!window.confirm("Bạn có chắc muốn xóa báo cáo này không?")) return;
        try {
            const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
            const data = await res.json();
            if (data.success) {
                alert(data.message);
                fetchReports();
            } else {
                alert(data.message || "Xóa thất bại!");
            }
        } catch (err) {
            console.error("Delete error:", err);
        }
    };

    // ----- EXPORT EXCEL -----
    const handleExport = async () => {
        try {
            const res = await fetch(`${API_URL}/export`, { method: "GET" });
            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "reports.xlsx";
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error("Export error:", err);
        }
    };

    return (
        <div className="container-crud-wrapper">
            {/* --- THANH CÔNG CỤ VỚI NÚT ADD & EXPORT --- */}
            <div className="toolbar">
                <h2>Quản lý Báo Cáo</h2>
                <div>
                    <button className="btn-info me-2" onClick={handleExport}>
                        Xuất Excel
                    </button>
                    <button className="btn-success" onClick={openAddModal}>
                        Thêm báo cáo mới
                    </button>
                </div>
            </div>

            {/* --- BẢNG DỮ LIỆU --- */}
            <table className="container-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Loại báo cáo</th>
                        <th>Nội dung</th>
                        <th>Tác giả</th>
                        <th>Email tác giả</th>
                        <th>Ngày tạo</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {(reports || []).map((r) => (
                        <tr key={r.id}>
                            <td data-label="ID" className="text-center">{r.id}</td>
                            <td data-label="Loại báo cáo">{r.report_type}</td>
                            <td data-label="Nội dung" style={{ minWidth: '200px', whiteSpace: 'pre-wrap' }}>{r.content}</td>
                            <td data-label="Tác giả">{r.author?.username || "N/A"}</td>
                            <td data-label="Email tác giả">{r.author?.email || "N/A"}</td>
                            <td data-label="Ngày tạo">{new Date(r.createdAt).toLocaleString("vi-VN")}</td>
                            <td data-label="Hành động" className="text-center" style={{ whiteSpace: 'nowrap' }}>
                                <button className="btn-warning me-2" onClick={() => handleEdit(r)}>
                                    Sửa
                                </button>
                               
                                <button className="btn-danger" onClick={() => handleDelete(r.id)}>
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* --- MODAL FORM --- */}
            {isModalOpen && (
                <Modal onClose={closeModal} title={editId ? "Cập nhật báo cáo" : "Thêm báo cáo mới"}>
                    
                    <div className="container-form-modal">
                        <input
                            type="text"
                            name="report_type"
                            placeholder="Loại báo cáo (vd: Hàng ngày, Hàng tuần...)"
                            value={form.report_type}
                            onChange={handleChange}
                            className="form-input"
                        />
                        {/* Đổi input 'content' thành textarea cho dễ nhập */}
                        <textarea
                            name="content"
                            placeholder="Nội dung báo cáo..."
                            value={form.content}
                            onChange={handleChange}
                            className="form-input" // Dùng chung class với input
                            rows="5" // Thêm số hàng
                        />
                        
                        {/* Tạm thời ẩn trường created_by (vì đã set tự động) */}
                        {/* <input
                            type="number"
                            name="created_by"
                            placeholder="ID tác giả"
                            value={form.created_by}
                            onChange={handleChange}
                            className="form-input"
                            disabled // Nên disable trường này
                        /> */}

                        <div className="form-actions-modal">
                            {editId ? (
                                <button className="btn-primary" onClick={handleUpdate}>
                                    Cập nhật
                                </button>
                            ) : (
                                <button className="btn-success" onClick={handleAdd}>
                                    Thêm mới
                                </button>
                            )}
                            <button className="btn-secondary" onClick={closeModal}>
                                Hủy
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};


// --- COMPONENT MODAL (ĐẶT Ở CUỐI FILE) ---
const Modal = ({ children, onClose, title }) => {
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        };
    }, [onClose]);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>{title}</h3>
                    <button className="modal-close-btn" onClick={onClose}>&times;</button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default ReportCRUD;