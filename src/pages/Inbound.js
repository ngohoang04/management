import React, { useEffect, useState } from "react";
import "./Styles/Inbound.css"; // Import file CSS

const API_CONTAINER = "http://localhost:3001/api/containers";
const API_WAREHOUSE = "http://localhost:3001/api/warehouses";
const API_SUPPLIER = "http://localhost:3001/api/suppliers";
const API_CUSTOMER = "http://localhost:3001/api/customers";
const API_CARGO = "http://localhost:3001/api/cargoes";

const ContainerCRUD = () => {
    const [containers, setContainers] = useState([]);
    const [warehouses, setWarehouses] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [cargos, setCargos] = useState([]);
    const [form, setForm] = useState({
        container_code: "",
        type: "",
        size: "",
        status: "",
        warehouse_id: "",
        supplier_id: "",
        customer_id: "",
    });
    const [editId, setEditId] = useState(null);
    const [showCargos, setShowCargos] = useState(null);
    const [cargoForm, setCargoForm] = useState({
        description: "",
        weight: "",
        volume: "",
    });

    // --- STATE MỚI ĐỂ QUẢN LÝ MODAL ---
    const [isModalOpen, setIsModalOpen] = useState(false);

    // --------- FETCH DATA ---------
    const fetchContainers = async () => {
        try {
            const res = await fetch(API_CONTAINER);
            const result = await res.json();
            setContainers(result.success ? result.data : []);
        } catch (err) {
            console.error("Error fetching containers:", err);
        }
    };
    const fetchWarehouses = async () => {
        try {
            const res = await fetch(API_WAREHOUSE);
            const result = await res.json();
            setWarehouses(result.data || []);
        } catch (err) {
            console.error("Error fetching warehouses:", err);
        }
    };
    const fetchSuppliers = async () => {
        try {
            const res = await fetch(API_SUPPLIER);
            const result = await res.json();
            setSuppliers(result.data || []);
        } catch (err) {
            console.error("Error fetching suppliers:", err);
        }
    };
    const fetchCustomers = async () => {
        try {
            const res = await fetch(API_CUSTOMER);
            const result = await res.json();
            setCustomers(result.data || []);
        } catch (err) {
            console.error("Error fetching customers:", err);
        }
    };
    const fetchCargos = async () => {
        try {
            const res = await fetch(API_CARGO);
            const result = await res.json();
            setCargos(result.data || []);
        } catch (err) {
            console.error("Error fetching cargos:", err);
        }
    };

    useEffect(() => {
        fetchContainers();
        fetchWarehouses();
        fetchSuppliers();
        fetchCustomers();
        fetchCargos();
    }, []);

    // --------- HANDLE INPUT CHANGE ---------
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleCargoChange = (e) => {
        setCargoForm({ ...cargoForm, [e.target.name]: e.target.value });
    };

    const resetForm = () => {
        setForm({
            container_code: "", type: "", size: "", status: "",
            warehouse_id: "", supplier_id: "", customer_id: "",
        });
        setEditId(null);
    };
    const resetCargoForm = () => {
        setCargoForm({ description: "", weight: "", volume: "" });
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

    // --------- CẬP NHẬT CÁC HÀM CRUD ĐỂ DÙNG MODAL ---------
    const handleAdd = async () => {
        try {
            await fetch(API_CONTAINER, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            fetchContainers();
            closeModal(); // Đóng modal sau khi thêm
        } catch (err) {
            console.error("Error adding container:", err);
        }
    };

    const handleEdit = (container) => {
        setEditId(container.id);
        setForm({ ...container });
        setIsModalOpen(true); // Mở modal để sửa
    };

    const handleUpdate = async () => {
        try {
            await fetch(`${API_CONTAINER}/${editId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            fetchContainers();
            closeModal(); // Đóng modal sau khi cập nhật
        } catch (err) {
            console.error("Error updating container:", err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`${API_CONTAINER}/${id}`, { method: "DELETE" });
            fetchContainers();
        } catch (err) {
            console.error("Error deleting container:", err);
        }
    };
    
    const handleAddCargo = async (containerId) => {
        if (!cargoForm.description) {
            alert("Description is required!");
            return;
        }
        try {
            await fetch(API_CARGO, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ container_id: containerId, ...cargoForm }),
            });
            resetCargoForm();
            fetchCargos();
        } catch (err) {
            console.error("Error adding cargo:", err);
        }
    };


    // --------- RENDER ---------
    return (
        <div className="container-crud-wrapper">
            {/* --- THANH CÔNG CỤ VỚI NÚT ADD --- */}
            <div className="toolbar">
                <h2>Container Management</h2>
                <button className="btn-success" onClick={openAddModal}>
                    Add New Container
                </button>
            </div>

            {/* --- BẢNG DỮ LIỆU --- */}
            <table className="container-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Container Code</th>
                        <th>Type</th>
                        <th>Size</th>
                        <th>Status</th>
                        <th>Warehouse</th>
                        <th>Supplier</th>
                        <th>Customer</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {containers.map((c) => {
                        const warehouse = warehouses.find((w) => w.id === c.warehouse_id);
                        const supplier = suppliers.find((s) => s.id === c.supplier_id);
                        const customer = customers.find((cst) => cst.id === c.customer_id);
                        const containerCargos = cargos.filter((cg) => cg.container_id === c.id);

                        return (
                            <React.Fragment key={c.id}>
                                <tr>
                                    <td data-label="ID">{c.id}</td>
                                    <td data-label="Container Code">{c.container_code}</td>
                                    <td data-label="Type">{c.type}</td>
                                    <td data-label="Size">{c.size}</td>
                                    <td data-label="Status">{c.status}</td>
                                    <td data-label="Warehouse">{warehouse ? `${warehouse.name} (${warehouse.location})` : "N/A"}</td>
                                    <td data-label="Supplier">{supplier ? supplier.name : "N/A"}</td>
                                    <td data-label="Customer">{customer ? customer.name : "N/A"}</td>
                                    <td data-label="Actions" style={{ whiteSpace: 'nowrap' }}>
                                        <button className="btn-warning me-2" onClick={() => handleEdit(c)}>
                                            Edit
                                        </button>
                                        <button className="btn-danger me-2" onClick={() => handleDelete(c.id)}>
                                            Delete
                                        </button>
                                        <button
                                            className="btn-info"
                                            onClick={() =>
                                                setShowCargos(showCargos === c.id ? null : c.id)
                                            }
                                        >
                                            {showCargos === c.id ? "Hide Items" : "Show Items"}
                                        </button>
                                    </td>
                                </tr>

                                {showCargos === c.id && (
                                    <tr className="cargo-details-row">
                                        <td colSpan="9">
                                            <strong>Items in Container ({containerCargos.length}):</strong>
                                            <ul>
                                                {containerCargos.length > 0 ? (
                                                    containerCargos.map((cg) => (
                                                        <li key={cg.id}>
                                                            <span>{cg.description}</span>
                                                            <span>Weight: {cg.weight || 0} kg | Volume: {cg.volume || 0} m³</span>
                                                        </li>
                                                    ))
                                                ) : (
                                                    <li>No items in this container</li>
                                                )}
                                            </ul>

                                            <div className="cargo-add-form">
                                                <input
                                                    type="text"
                                                    name="description"
                                                    placeholder="Description"
                                                    value={cargoForm.description}
                                                    onChange={handleCargoChange}
                                                    className="form-input"
                                                />
                                                <input
                                                    type="number"
                                                    name="weight"
                                                    placeholder="Weight (kg)"
                                                    value={cargoForm.weight}
                                                    onChange={handleCargoChange}
                                                    className="form-input"
                                                />
                                                <input
                                                    type="number"
                                                    name="volume"
                                                    placeholder="Volume (m³)"
                                                    value={cargoForm.volume}
                                                    onChange={handleCargoChange}
                                                    className="form-input"
                                                />
                                                <button
                                                    className="btn-success btn-sm"
                                                    onClick={() => handleAddCargo(c.id)}
                                                >
                                                    Add Cargo
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        );
                    })}
                </tbody>
            </table>

            {/* --- MODAL --- */}
            {isModalOpen && (
                <Modal onClose={closeModal} title={editId ? "Edit Container" : "Add New Container"}>
                    
                    <div className="container-form-modal">
                        {["container_code", "type", "size", "status"].map((field) => (
                            <input
                                key={field}
                                type="text"
                                name={field}
                                placeholder={field.replace("_", " ").charAt(0).toUpperCase() + field.replace("_", " ").slice(1)}
                                value={form[field]}
                                onChange={handleChange}
                                className="form-input"
                            />
                        ))}

                        <select
                            name="warehouse_id"
                            value={form.warehouse_id}
                            onChange={handleChange}
                            className="form-select"
                        >
                            <option value="">-- Select Warehouse --</option>
                            {warehouses.map((w) => (
                                <option key={w.id} value={w.id}>
                                    {w.name} ({w.location})
                                </option>
                            ))}
                        </select>

                        <select
                            name="supplier_id"
                            value={form.supplier_id}
                            onChange={handleChange}
                            className="form-select"
                        >
                            <option value="">-- Select Supplier --</option>
                            {suppliers.map((s) => (
                                <option key={s.id} value={s.id}>
                                    {s.name}
                                </option>
                            ))}
                        </select>

                        <select
                            name="customer_id"
                            value={form.customer_id}
                            onChange={handleChange}
                            className="form-select"
                        >
                            <option value="">-- Select Customer --</option>
                            {customers.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>

                        <div className="form-actions-modal">
                            {editId ? (
                                <button className="btn-primary" onClick={handleUpdate}>
                                    Update Container
                                </button>
                            ) : (
                                <button className="btn-success" onClick={handleAdd}>
                                    Add Container
                                </button>
                            )}
                            <button className="btn-secondary" onClick={closeModal}>
                                Cancel
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


export default ContainerCRUD;