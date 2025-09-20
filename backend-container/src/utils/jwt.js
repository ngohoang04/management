const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET || "mysecretkey"; // Nên đặt trong .env

// Tạo token khi user đăng nhập thành công
function generateToken(user) {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role || "user", // thêm role nếu cần phân quyền
        },
        SECRET_KEY,
        { expiresIn: "1h" } // token hết hạn sau 1h
    );
}

// Middleware kiểm tra token
function verifyToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // "Bearer <token>"

    if (!token) {
        return res.status(403).json({ success: false, message: "Access token required" });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ success: false, message: "Invalid or expired token" });
        }
        req.user = decoded; // lưu payload (id, email, role) vào req.user
        next();
    });
}

module.exports = { generateToken, verifyToken };
