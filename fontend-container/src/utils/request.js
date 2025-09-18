const APT_DOMAIN = "http://localhost:5000/" ;

export const post = async (path, body, token) => {
    const response = await fetch(API_DOMAIN + path, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` })
        },
        body: JSON.stringify(body),
    });
    return await response.json();
};

export const get = async (path, token) => {
    const response = await fetch(API_DOMAIN + path, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` })
        },
    });
    return await response.json();
};

export const put = async (path, body, token) => {
    const response = await fetch(API_DOMAIN + path, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` })
        },
        body: JSON.stringify(body),
    });
    return await response.json();
};

export const del = async (path, token) => {
    const response = await fetch(API_DOMAIN + path, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` })
        },
    });
    return await response.json();
};
