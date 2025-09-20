const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
// const cors = require("cors"); // cho frontend call API
// const morgan = require("morgan"); // log request ra console
const webRoutes = require("./route/web.js");
const configViewEngine = require("./config/viewEngine");

// Load .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// app.use(cors()); // cho phép frontend khác domain call API
// app.use(morgan("dev")); // log method + url + status
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// View engine (nếu bạn dùng ejs/pug/handlebars cho giao diện)
configViewEngine(app);

// Routes
app.use("/api", webRoutes);

// Global error handler (bắt các lỗi ngoài try/catch)
app.use((err, req, res, next) => {
    console.error("🔥 Error:", err.stack);
    res.status(500).json({ success: false, message: "Internal server error" });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
