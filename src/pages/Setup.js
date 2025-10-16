import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../components/AuthContext";
// Import file CSS chung
import "./Styles/Inbound.css"; 

const API_USER = "http://localhost:3001/api/users";

const SetupUser = () => {
    const { user } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (user && user.role === "admin") {
            fetchUsers();
        } else {
            setLoading(false);
        }
    }, [user]);

    const fetchUsers = async () => {
        try {
            const res = await fetch(API_USER);
            const data = await res.json();
            // Đảm bảo users luôn là một array
            if (data.success && Array.isArray(data.data)) {
                 setUsers(data.data);
            } else if (Array.isArray(data)) {
                setUsers(data); // Đề phòng API chỉ trả về mảng
            } else {
                setUsers([]);
            }
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError("Không thể tải danh sách người dùng");
            setLoading(false);
        }
    };

    const handleRoleChange = async (userId, newRole) => {
        try {
            // Lấy user đầy đủ từ state để gửi đi
            const userToUpdate = users.find(u => u.id === userId);
            if (!userToUpdate) return;

            const updatedData = { ...userToUpdate, role: newRole };

            const res = await fetch(`${API_USER}/${userId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData), // Gửi cả object
            });
            const data = await res.json();
            if (res.ok && data.success) {
                // Cập nhật lại state local cho mượt
                setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
            } else {
                alert(data.message || "Cập nhật role thất bại");
                fetchUsers(); // Tải lại state từ server nếu lỗi
            }
        } catch (err) {
            console.error(err);
            alert("Có lỗi xảy ra khi cập nhật role");
        }
    };

    // Sử dụng class CSS từ Inbound.css
    const renderContent = () => {
        if (!user || user.role !== "admin") {
            return <p className="loading-text">Bạn không có quyền truy cập trang này.</p>;
        }
        if (loading) return <p className="loading-text">Đang tải...</p>;
        if (error) return <p className="loading-text error">{error}</p>;

        return (
            <>
                <div className="toolbar">
                    <h2>Setup User - Quản lý Role</h2>
                </div>
                <table className="container-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u => (
                            <tr key={u.id}>
                                <td data-label="ID" className="text-center">{u.id}</td>
                                <td data-label="Username">{u.username}</td>
                                <td data-label="Full Name">{u.full_name}</td>
                                <td data-label="Email">{u.email}</td>
                                <td data-label="Phone">{u.phone}</td>
                                <td data-label="Role">
                                    <select
                                        value={u.role}
                                        onChange={(e) => handleRoleChange(u.id, e.target.value)}
                                        className="form-select" // Dùng class chung
                                        style={{ minWidth: "150px" }} // Thêm style để select dễ nhìn hơn
                                    >
                                        <option value="admin">Admin</option>
                                        <option value="Customer">Customer</option>
                                        <option value="Supplier">Supplier</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>
        );
    }

    return (
        <div className="container-crud-wrapper">
            {renderContent()}
        </div>
    );
};

export default SetupUser;