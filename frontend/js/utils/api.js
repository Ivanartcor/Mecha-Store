// utils/api.js

const BASE_URL = "http://localhost/RA4_AEE_Tienda_Online_API_REST_Y_Cliente_HTML/backend/api";

export async function post(endpoint, data, token = null) {
    const headers = { "Content-Type": "application/json" };
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
    });
    return response.json();
}

export async function get(endpoint, token = null) {
    const headers = {};
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await fetch(`${BASE_URL}/${endpoint}`, { headers });
    return response.json();
}
