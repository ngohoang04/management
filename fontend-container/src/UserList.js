// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const UserList = () => {
//     const [users, setUsers] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 // Sử dụng axios để gọi API
//                 const res = await axios.get('htts://dummyjson.com/pusers');
                
//                 // Cập nhật trạng thái người dùng với dữ liệu đã lấy
//                 setUsers(res.data.users); 
//             } catch (err) {
//                 // Xử lý lỗi nếu có
//                 setError(err);
//             } finally {
//                 // Dù thành công hay thất bại, trạng thái loading sẽ chuyển về false
//                 setLoading(false);
//             }
//         };

//         fetchUsers();
//     }, []);

//     if (loading) {
//         return <div>Đang tải danh sách người dùng...</div>;
//     }

//     if (error) {
//         return <div>Lỗi: Không thể tải dữ liệu người dùng. Vui lòng thử lại.</div>;
//     }

//     return (
//         <div style={{ padding: '20px' }}>
//             <h2>Danh sách người dùng</h2>
//             <ul style={{ listStyleType: 'none', padding: 0 }}>
//                 {users.map(user => (
//                     <li key={user.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '5px 0' }}>
//                         <strong>ID:</strong> {user.id} <br/>
//                         <strong>Tên:</strong> {user.firstName} {user.lastName} <br/>
//                         <strong>Email:</strong> {user.email}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default UserList;