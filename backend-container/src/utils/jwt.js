const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET || "mysecretkey"; // đặt trong .env

// Tạo token khi user đăng nhập thành công
function generateToken(user) {
    return jwt.sign(
        { id: user.id, email: user.email }, // payload
        SECRET_KEY,
        { expiresIn: "1h" } // token sống trong 1h
    );
}

// Middleware kiểm tra token
function verifyToken(req, res, next) {
    const token = req.headers["authorization"]?.split(" ")[1]; // Bearer <token>
    if (!token) return res.status(403).json({ message: "Token required" });

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).json({ message: "Invalid token" });
        req.user = decoded; // lưu thông tin user vào request
        next();
    });
}

module.exports = { generateToken, verifyToken };
