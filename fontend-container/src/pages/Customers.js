import React, { useState, useEffect } from "react";
// Import file CSS chung
import "./Styles/Inbound.css"; 

const API_URL = "http://localhost:3001/api/customers"; // URL backend của bạn

const CustomerCRUD = () => {
    const [customers, setCustomers] = useState([]);
    const [form, setForm] = useState({
        name: "",
        contact_person: "",
        phone: "",
        email: "",
        address: "",
    });
    const [editId, setEditId] = useState(null);

    // --- STATE MỚI ĐỂ QUẢN LÝ MODAL ---
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Lấy danh sách khách hàng
    const fetchCustomers = async () => {
        try {
            const res = await fetch(API_URL);
            const data = await res.json();
            
            if (data.success && Array.isArray(data.data)) {
                setCustomers(data.data);
            } else if (Array.isArray(data)) {
                setCustomers(data);
            } else {
                setCustomers([]);
            }
        } catch (err) {
            console.error("Fetch customers error:", err);
            setCustomers([]);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    // Xử lý input thay đổi
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Reset form
    const resetForm = () => {
        setEditId(null);
        setForm({ name: "", contact_person: "", phone: "", email: "", address: "" });
    };

    // --- CÁC HÀM QUẢN LÝ MODAL ---
    const openAddModal = () => {
        resetForm();
        setIsModalOpen(true);
    };

    const closeModal = () => {
        resetForm();
        setIsModalOpen(false);
    };

    // Thêm khách hàng
    const handleAdd = async () => {
        try {
            const res = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (data.success) {
                alert("Thêm khách hàng thành công!");
                fetchCustomers();
                closeModal(); // Đóng modal sau khi thêm
            } else {
                alert(data.message || "Thêm thất bại!");
            }
        } catch (err) {
            console.error("Add error:", err);
        }
    };

    // Sửa khách hàng (hiển thị lên form)
    const handleEdit = (customer) => {
        setEditId(customer.id);
        setForm({
            name: customer.name || "",
            contact_person: customer.contact_person || "",
            phone: customer.phone || "",
            email: customer.email || "",
            address: customer.address || "",
        });
        setIsModalOpen(true); // Mở modal để sửa
    };

    // Cập nhật khách hàng
    const handleUpdate = async () => {
        try {
            const res = await fetch(`${API_URL}/${editId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (data.success) {
                alert("Cập nhật thành công!");
                fetchCustomers();
                closeModal(); // Đóng modal sau khi cập nhật
            } else {
                alert(data.message || "Cập nhật thất bại!");
            }
        } catch (err) {
            console.error("Update error:", err);
        }
    };

    // Xóa khách hàng
    const handleDelete = async (id) => {
        if (!window.confirm("Bạn có chắc muốn xóa khách hàng này không?")) return;
        try {
            const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
            const data = await res.json();
            if (data.success) {
                alert("Đã xóa khách hàng!");
                fetchCustomers();
            } else {
                alert(data.message || "Xóa thất bại!");
            }
        } catch (err) {
            console.error("Delete error:", err);
        }
    };

    return (
        <div className="container-crud-wrapper">
            {/* --- THANH CÔNG CỤ VỚI NÚT ADD --- */}
            <div className="toolbar">
                <h2>Quản lý khách hàng</h2>
                <button className="btn-success" onClick={openAddModal}>
                    Thêm khách hàng mới
                </button>
            </div>

            {/* --- BẢNG DỮ LIỆU --- */}
            <table className="container-table">
                <thead className="text-center">
                    <tr>
                        <th>ID</th>
                        <th>Tên khách hàng</th>
                        <th>Người liên hệ</th>
                        <th>Điện thoại</th>
                        <th>Email</th>
                        <th>Địa chỉ</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {(customers || []).map((c) => (
                        <tr key={c.id}>
                            <td data-label="ID" className="text-center">{c.id}</td>
                            <td data-label="Tên khách hàng">{c.name}</td>
                            <td data-label="Người liên hệ">{c.contact_person}</td>
                            <td data-label="Điện thoại">{c.phone}</td>
                            <td data-label="Email">{c.email}</td>
                            <td data-label="Địa chỉ">{c.address}</td>
                            <td data-label="Hành động" className="text-center" style={{ whiteSpace: 'nowrap' }}>
                                <button
                                    className="btn-warning me-2"
                                    onClick={() => handleEdit(c)}
                                >
                                    Sửa
                                </button>
                                <button
                                    className="btn-danger"
                                    onClick={() => handleDelete(c.id)}
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* --- MODAL FORM --- */}
            {isModalOpen && (
                <Modal onClose={closeModal} title={editId ? "Cập nhật khách hàng" : "Thêm khách hàng mới"}>
                    
                    {/* Form được chuyển vào đây */}
                    <div className="container-form-modal">
                        {["name", "contact_person", "phone", "email", "address"].map((field) => (
                            <input
                                key={field}
                                type={field === "email" ? "email" : "text"}
                                name={field}
                                placeholder={
                                    field === "name" ? "Tên khách hàng"
                                    : field === "contact_person" ? "Người liên hệ"
                                    : field === "phone" ? "Số điện thoại"
                                    : field === "email" ? "Email"
                                    : "Địa chỉ"
                                }
                                value={form[field]}
                                onChange={handleChange}
                                className="form-input"
                            />
                        ))}

                        {/* Nút bấm của Form */}
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
// (Component này giống hệt component ở file ContainerCRUD.js)
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

export default CustomerCRUD;