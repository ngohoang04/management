const API_DOMAIN = "http://localhost:3003/api/"; // backend URL

const handleResponse = async (response) => {
    try {
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Lỗi server");
        }
        return { success: true, data };
    } catch (err) {
        return { success: false, message: err.message };
    }
};

export const post = async (path, body, token) => {
    try {
        const response = await fetch(API_DOMAIN + path, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            body: JSON.stringify(body),
        });
        return await handleResponse(response);
    } catch (err) {
        return { success: false, message: err.message };
    }
};

export const get = async (path, token) => {
    try {
        const response = await fetch(API_DOMAIN + path, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
            },
        });
        return await handleResponse(response);
    } catch (err) {
        return { success: false, message: err.message };
    }
};

export const put = async (path, body, token) => {
    try {
        const response = await fetch(API_DOMAIN + path, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            body: JSON.stringify(body),
        });
        return await handleResponse(response);
    } catch (err) {
        return { success: false, message: err.message };
    }
};

export const del = async (path, token) => {
    try {
        const response = await fetch(API_DOMAIN + path, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
            },
        });
        return await handleResponse(response);
    } catch (err) {
        return { success: false, message: err.message };
    }
};
