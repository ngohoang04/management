import React, { useState, useEffect } from "react";
// Import file CSS chung (giả sử nó tồn tại)
import "./Styles/Inbound.css"; 

const API_CONTAINER = "http://localhost:3001/api/containers";

const ContainerStatusManagement = () => {
    const [containers, setContainers] = useState([]);
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState({
        status: "",
    });

    // --- STATE MỚI ĐỂ QUẢN LÝ MODAL ---
    const [isModalOpen, setIsModalOpen] = useState(false);
    // State để lưu trữ thông tin đầy đủ của container đang sửa
    const [currentContainer, setCurrentContainer] = useState(null);

    // --------- FETCH CONTAINERS ---------
    const fetchContainers = async () => {
        try {
            const res = await fetch(API_CONTAINER);
            const data = await res.json();
            // SỬA LỖI: Luôn đảm bảo setContainers là một array
            setContainers(Array.isArray(data.data) ? data.data : []);
        } catch (err) {
            console.error(err);
            setContainers([]);
        }
    };

    useEffect(() => {
        fetchContainers();
    }, []);

    // --------- HANDLE INPUT CHANGE ---------
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // --- CÁC HÀM QUẢN LÝ MODAL ---
    const resetForm = () => {
        setEditId(null);
        setForm({ status: "" });
        setCurrentContainer(null);
    };

    const closeModal = () => {
        resetForm();
        setIsModalOpen(false);
    };

    // --------- EDIT CONTAINER ---------
    const handleEdit = (container) => {
        setEditId(container.id);
        setForm({ status: container.status || "" });
        setCurrentContainer(container); // Lưu lại toàn bộ thông tin container
        setIsModalOpen(true); // Mở modal
    };

    // --------- UPDATE CONTAINER ---------
    const handleUpdate = async () => {
        if (!currentContainer) return;

        try {
            // Trộn thông tin cũ với status mới để gửi đi
            const updatedData = { ...currentContainer, status: form.status };

            const res = await fetch(`${API_CONTAINER}/${editId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData), // Gửi toàn bộ object đã cập nhật
            });
            
            const data = await res.json();
            if (!data.success) {
                 throw new Error(data.message || "Cập nhật thất bại");
            }
            
            fetchContainers();
            closeModal(); // Đóng modal
        } catch (err) {
            console.error(err);
            alert("Lỗi: " + err.message);
        }
    };


    // --------- RENDER ---------
    return (
        <div className="container-crud-wrapper">
            {/* --- THANH CÔNG CỤ (KHÔNG CÓ NÚT ADD) --- */}
            <div className="toolbar">
                <h2>Quản lý trạng thái Container</h2>
            </div>
            
            {/* --- BẢNG DỮ LIỆU --- */}
            <table className="container-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Container Code</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {containers.map((c) => (
                        <tr key={c.id}>
                            <td data-label="ID" className="text-center">{c.id}</td>
                            <td data-label="Container Code">{c.container_code}</td>
                            <td data-label="Type">{c.type}</td>
                            <td data-label="Status">{c.status}</td>
                            <td data-label="Hành động" className="text-center">
                                {/* Nút Sửa sẽ mở Modal */}
                                <button className="btn-warning" onClick={() => handleEdit(c)}>
                                    Sửa trạng thái
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* --- MODAL FORM --- */}
            {isModalOpen && (
                <Modal onClose={closeModal} title={`Cập nhật Container: ${currentContainer?.container_code || ''}`}>
                    
                    <div className="container-form-modal">
                        <input
                            type="text"
                            name="status"
                            placeholder="Trạng thái"
                            value={form.status}
                            onChange={handleChange}
                            className="form-input"
                            autoFocus
                        />

                        <div className="form-actions-modal">
                            <button className="btn-primary" onClick={handleUpdate}>
                                Cập nhật
                            </button>
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

export default ContainerStatusManagement;