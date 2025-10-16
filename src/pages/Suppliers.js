import React, { useState, useEffect } from "react";
// Giả sử bạn có file CSS chung cho các component CRUD
import "./Styles/Inbound.css"; 

const API_URL = "http://localhost:3001/api/suppliers"; // backend

const SupplierCRUD = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [form, setForm] = useState({
        name: "",
        contact_person: "",
        phone: "",
        email: "",
        address: "",
        user_id: 1, // mặc định hoặc lấy từ login
    });
    const [editId, setEditId] = useState(null);

    // --- STATE MỚI ĐỂ QUẢN LÝ MODAL ---
    const [isModalOpen, setIsModalOpen] = useState(false);

    // --------- FETCH SUPPLIERS ---------
    const fetchSuppliers = async () => {
        try {
            const res = await fetch(API_URL);
            const data = await res.json();
            if (data.success && Array.isArray(data.data)) {
                setSuppliers(data.data);
            } else {
                setSuppliers([]);
            }
        } catch (err) {
            console.error("Fetch error:", err);
            setSuppliers([]);
        }
    };

    useEffect(() => {
        fetchSuppliers();
    }, []);

    // --------- HANDLE INPUT CHANGE ---------
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const resetForm = () => {
        setEditId(null);
        setForm({ name: "", contact_person: "", phone: "", email: "", address: "", user_id: 1 });
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


    // --------- ADD SUPPLIER ---------
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
                fetchSuppliers();
                closeModal(); // Đóng modal sau khi thành công
            } else {
                alert(data.message || "Thêm thất bại!");
            }
        } catch (err) {
            console.error("Add error:", err);
        }
    };

    // --------- EDIT SUPPLIER ---------
    const handleEdit = (supplier) => {
        setEditId(supplier.id);
        setForm({
            name: supplier.name || "",
            contact_person: supplier.contact_person || "",
            phone: supplier.phone || "",
            email: supplier.email || "",
            address: supplier.address || "",
            user_id: supplier.user_id || 1,
        });
        setIsModalOpen(true); // Mở modal để sửa
    };

    // --------- UPDATE SUPPLIER ---------
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
                fetchSuppliers();
                closeModal(); // Đóng modal sau khi thành công
            } else {
                alert(data.message || "Cập nhật thất bại!");
            }
        } catch (err) {
            console.error("Update error:", err);
        }
    };

    // --------- DELETE SUPPLIER ---------
    const handleDelete = async (id) => {
        if (!window.confirm("Bạn có chắc muốn xóa nhà cung cấp này không?")) return;
        try {
            const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
            const data = await res.json();
            if (data.success) {
                alert(data.message);
                fetchSuppliers();
            } else {
                alert(data.message || "Xóa thất bại!");
            }
        } catch (err) {
            console.error("Delete error:", err);
        }
    };

    return (
        <div className="container-crud-wrapper"> {/* Sử dụng class wrapper chung */}
            {/* --- THANH CÔNG CỤ VỚI NÚT ADD --- */}
            <div className="toolbar">
                <h2>Quản lý Nhà Cung Cấp</h2>
                <button className="btn-success" onClick={openAddModal}>
                    Thêm nhà cung cấp mới
                </button>
            </div>

            {/* --- BẢNG DỮ LIỆU --- */}
            <table className="container-table"> {/* Sử dụng class table chung */}
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên nhà cung cấp</th>
                        <th>Người liên hệ</th>
                        <th>Điện thoại</th>
                        <th>Email</th>
                        <th>Địa chỉ</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {(suppliers || []).map((s) => (
                        <tr key={s.id}>
                            <td data-label="ID" className="text-center">{s.id}</td>
                            <td data-label="Tên nhà cung cấp">{s.name}</td>
                            <td data-label="Người liên hệ">{s.contact_person}</td>
                            <td data-label="Điện thoại">{s.phone}</td>
                            <td data-label="Email">{s.email}</td>
                            <td data-label="Địa chỉ">{s.address}</td>
                            <td data-label="Hành động" className="text-center" style={{ whiteSpace: 'nowrap' }}>
                                <button className="btn-warning me-2" onClick={() => handleEdit(s)}>
                                    Sửa
                                </button>
                                <button className="btn-danger" onClick={() => handleDelete(s.id)}>
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* --- MODAL FORM --- */}
            {isModalOpen && (
                <Modal onClose={closeModal} title={editId ? "Cập nhật thông tin" : "Thêm nhà cung cấp mới"}>
                    
                    {/* Form được chuyển vào đây */}
                    <div className="container-form-modal">
                        {["name", "contact_person", "phone", "email", "address"].map((field) => (
                            <input
                                key={field}
                                type={field === "email" ? "email" : "text"}
                                name={field}
                                placeholder={
                                    field === "name" ? "Tên nhà cung cấp"
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

export default SupplierCRUD;