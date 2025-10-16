import React, { useState, useEffect } from "react";
// Import file CSS chung
import "./Styles/Inbound.css"; 

const API_URL = "http://localhost:3001/api/warehouses"; // backend

const WarehouseCRUD = () => {
    const [warehouses, setWarehouses] = useState([]);
    const [form, setForm] = useState({
        name: "",
        location: "",
        capacity: "",
        current_occupancy: "",
    });
    const [editId, setEditId] = useState(null);
    const [showContainers, setShowContainers] = useState({});

    // --- STATE MỚI ĐỂ QUẢN LÝ MODAL ---
    const [isModalOpen, setIsModalOpen] = useState(false);

    // --------- FETCH WAREHOUSES ---------
    const fetchWarehouses = async () => {
        try {
            const res = await fetch(API_URL);
            const data = await res.json();

            if (data.success && Array.isArray(data.data)) {
                setWarehouses(data.data);
            } else if (Array.isArray(data)) {
                setWarehouses(data);
            } else {
                setWarehouses([]);
            }
        } catch (err) {
            console.error("Fetch error:", err);
            setWarehouses([]);
        }
    };

    useEffect(() => {
        fetchWarehouses();
    }, []);

    // --------- HANDLE INPUT CHANGE ---------
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const resetForm = () => {
        setEditId(null);
        setForm({ name: "", location: "", capacity: "", current_occupancy: "" });
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

    // --------- ADD WAREHOUSE ---------
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
                fetchWarehouses();
                closeModal(); // Đóng modal
            } else {
                alert(data.message || "Thêm thất bại!");
            }
        } catch (err) {
            console.error("Add error:", err);
        }
    };

    // --------- EDIT WAREHOUSE ---------
    const handleEdit = (warehouse) => {
        setEditId(warehouse.id);
        setForm({
            name: warehouse.name || "",
            location: warehouse.location || "",
            capacity: warehouse.capacity || "",
            current_occupancy: warehouse.current_occupancy || "",
        });
        setIsModalOpen(true); // Mở modal
    };

    // --------- UPDATE WAREHOUSE ---------
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
                fetchWarehouses();
                closeModal(); // Đóng modal
            } else {
                alert(data.message || "Cập nhật thất bại!");
            }
        } catch (err) {
            console.error("Update error:", err);
        }
    };

    // --------- DELETE WAREHOUSE ---------
    const handleDelete = async (id) => {
        if (!window.confirm("Bạn có chắc muốn xóa kho này không?")) return;
        try {
            const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
            const data = await res.json();
            if (data.success) {
                alert(data.message);
                fetchWarehouses();
            } else {
                alert(data.message || "Xóa thất bại!");
            }
        } catch (err) {
            console.error("Delete error:", err);
        }
    };

    // --------- TOGGLE SHOW CONTAINERS ---------
    const toggleContainers = (id) => {
        // Lật trạng thái true/false của id kho
        setShowContainers(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    return (
        <div className="container-crud-wrapper">
            {/* --- THANH CÔNG CỤ VỚI NÚT ADD --- */}
            <div className="toolbar">
                <h2>Quản lý Kho</h2>
                <button className="btn-success" onClick={openAddModal}>
                    Thêm kho mới
                </button>
            </div>

            {/* --- BẢNG DỮ LIỆU --- */}
            <table className="container-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên kho</th>
                        <th>Địa điểm</th>
                        <th>Sức chứa</th>
                        <th>Hiện tại</th>
                        <th>Container trong kho</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {(warehouses || []).map((w) => (
                        <React.Fragment key={w.id}>
                            <tr>
                                <td data-label="ID" className="text-center">{w.id}</td>
                                <td data-label="Tên kho">{w.name}</td>
                                <td data-label="Địa điểm">{w.location}</td>
                                <td data-label="Sức chứa">{w.capacity}</td>
                                <td data-label="Hiện tại">{w.current_occupancy}</td>
                                <td data-label="Container trong kho" className="text-center">
                                    {w.containers ? w.containers.length : 0} container
                                    {w.containers && w.containers.length > 0 && (
                                        <button
                                            className="btn-info" // Đổi sang btn-info cho đồng bộ
                                            style={{fontSize: '0.8rem', padding: '4px 8px', marginLeft: '8px'}}
                                            onClick={() => toggleContainers(w.id)}
                                        >
                                            {showContainers[w.id] ? "Ẩn" : "Xem"}
                                        </button>
                                    )}
                                </td>
                                <td data-label="Hành động" className="text-center" style={{ whiteSpace: 'nowrap' }}>
                                    <button className="btn-warning me-2" onClick={() => handleEdit(w)}>
                                        Sửa
                                    </button>
                                    <button className="btn-danger" onClick={() => handleDelete(w.id)}>
                                        Xóa
                                    </button>
                                </td>
                            </tr>

                            {/* --- HÀNG CON HIỂN THỊ CONTAINER --- */}
                            {w.containers && showContainers[w.id] && (
                                <tr className="cargo-details-row">
                                    <td colSpan="7">
                                        {/* Bạn có thể style bảng con này bằng class riêng hoặc class của Bootstrap */}
                                        <table className="table table-sm table-bordered mb-0" style={{background: 'var(--white)'}}>
                                            <thead className="table-light text-center">
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Mã container</th>
                                                    <th>Loại</th>
                                                    <th>Trạng thái</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {w.containers.map((c) => (
                                                    <tr key={c.id}>
                                                        <td className="text-center">{c.id}</td>
                                                        <td>{c.container_code}</td>
                                                        <td>{c.type}</td>
                                                        <td>{c.status}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>

            {/* --- MODAL FORM --- */}
            {isModalOpen && (
                <Modal onClose={closeModal} title={editId ? "Cập nhật kho" : "Thêm kho mới"}>
                    
                    <div className="container-form-modal">
                        {["name", "location", "capacity", "current_occupancy"].map((field) => (
                            <input
                                key={field}
                                type={field === "capacity" || field === "current_occupancy" ? "number" : "text"}
                                name={field}
                                placeholder={
                                    field === "name" ? "Tên kho"
                                    : field === "location" ? "Địa điểm"
                                    : field === "capacity" ? "Sức chứa (số)"
                                    : "Đã chiếm (số)"
                                }
                                value={form[field]}
                                onChange={handleChange}
                                className="form-input"
                            />
                        ))}

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

export default WarehouseCRUD;