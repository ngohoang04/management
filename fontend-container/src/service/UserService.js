const API_DOMAIN = "http://localhost:3306/api/"; // backend URL

export const post = async (path, body) => {
    const response = await fetch(API_DOMAIN + path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
    return await response.json();
};

export const get = async (path, token) => {
    const response = await fetch(API_DOMAIN + path, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
        },
    });
    return await response.json();
};

// Auth API
export const Register = async (name, email, password) => post("auth/register", { name, email, password });
export const Login = async (email, password) => post("auth/login", { email, password });

// Example API that needs JWT
export const getUsers = async (token) => get("users", token);
