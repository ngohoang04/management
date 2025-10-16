import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import "./Styles/Account.css"; // Import file CSS

const Profile = () => {
    const { user, setUser } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editPassword, setEditPassword] = useState(false);
    const [passwordForm, setPasswordForm] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    // State message tốt hơn
    const [message, setMessage] = useState({ text: "", type: "" });

    // Lấy thông tin user chi tiết khi component mount
    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }

        const token = user.token; 
        const userId = user.id;

        fetch(`http://localhost:3001/api/users/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => {
                setProfile(data.data || data); 
                setLoading(false);
            })
            .catch((err) => {
                console.error("❌ Lỗi khi fetch user:", err);
                setLoading(false);
            });
    }, [user]);

    const handleChangePassword = (e) => {
        setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
    };

    const handleSubmitPassword = async (e) => {
        e.preventDefault();
        setMessage({ text: "", type: "" });

        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            setMessage({ text: "Mật khẩu mới và xác nhận không khớp!", type: "error" });
            return;
        }

        try {
            const token = user.token;
            const res = await fetch(`http://localhost:3001/api/users/${user.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                    oldPassword: passwordForm.oldPassword, 
                    password: passwordForm.newPassword,
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Cập nhật mật khẩu thất bại");

            setMessage({ text: "✅ Đổi mật khẩu thành công!", type: "success" });
            setPasswordForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
            setEditPassword(false);
        } catch (err) {
            console.error(err);
            setMessage({ text: `❌ Lỗi: ${err.message}`, type: "error" });
        }
    };

    // Sử dụng class CSS
    if (loading) return (
        <div className="container-crud-wrapper">
            <p className="loading-text">Đang tải thông tin...</p>
        </div>
    );
    
    if (!profile) return (
        <div className="container-crud-wrapper">
            <p className="loading-text">Không có thông tin user</p>
        </div>
    );

    return (
        <div className="container-crud-wrapper">
            {/* Bọc nội dung trong thẻ card */}
            <div className="profile-card"> 
                <h2>Thông tin cá nhân</h2>
                <div className="profile-info">
                    <p><strong>Username:</strong> {profile.username}</p>
                    <p><strong>Họ và tên:</strong> {profile.full_name}</p>
                    <p><strong>Email:</strong> {profile.email}</p>
                    <p><strong>Phone:</strong> {profile.phone}</p>
                    <p><strong>Role:</strong> {profile.role}</p>
                </div>

                <hr className="divider" />

                {!editPassword ? (
                    <button className="btn-warning" onClick={() => setEditPassword(true)}>
                        Đổi mật khẩu
                    </button>
                ) : (
                    <form onSubmit={handleSubmitPassword} className="password-form">
                        <input
                            type="password"
                            name="oldPassword"
                            placeholder="Mật khẩu cũ"
                            value={passwordForm.oldPassword}
                            onChange={handleChangePassword}
                            className="form-input" // Dùng class chung
                            required
                        />
                        <input
                            type="password"
                            name="newPassword"
                            placeholder="Mật khẩu mới"
                            value={passwordForm.newPassword}
                            onChange={handleChangePassword}
                            className="form-input" // Dùng class chung
                            required
                        />
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Xác nhận mật khẩu mới"
                            value={passwordForm.confirmPassword}
                            onChange={handleChangePassword}
                            className="form-input" // Dùng class chung
                            required
                        />
                        <div className="form-actions-modal" style={{justifyContent: 'flex-start', paddingTop: '0.5rem', borderTop: 'none'}}>
                            <button className="btn-primary" type="submit"> 
                                Cập nhật
                            </button>
                            <button className="btn-secondary" type="button" onClick={() => setEditPassword(false)}>
                                Hủy
                            </button>
                        </div>
                    </form>
                )}

                {/* Thông báo lỗi/thành công */}
                {message.text && (
                    <p className={`message ${message.type}`}>
                        {message.text}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Profile;