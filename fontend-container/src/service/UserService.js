// Backend URL (đúng port Node.js chứ không phải MySQL)
const API_DOMAIN = "http://localhost:3001/api/";

// Helper POST
export const post = async (path, body) => {
    try {
        const response = await fetch(API_DOMAIN + path, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Lỗi server");
        }

        return data;
    } catch (err) {
        console.error("POST error:", err);
        return { success: false, message: err.message };
    }
};

// Helper GET
export const get = async (path, token) => {
    try {
        const response = await fetch(API_DOMAIN + path, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Lỗi server");
        }

        return data;
    } catch (err) {
        console.error("GET error:", err);
        return { success: false, message: err.message };
    }
};

// Auth API
export const Register = async (name, email, password) =>
    post("auth/register", { name, email, password });

export const Login = async (email, password) =>
    post("auth/login", { email, password });

// Example API that needs JWT
export const getUsers = async (token) => get("users", token);
