// utils/api.js

const BASE_URL = "http://localhost/RA4_AEE_Tienda_Online_API_REST_Y_Cliente_HTML/backend/api";

export async function post(endpoint, data, token = null) {
    const headers = { "Content-Type": "application/json" };
    if (token) headers.Authorization = `Bearer ${token}`;

    try {
        const response = await fetch(`${BASE_URL}/${endpoint}`, {
            method: "POST",
            headers,
            body: JSON.stringify(data),
        });

        const responseData = await response.json();

        if (!response.ok) {
            return {
                status: "error",
                message: responseData.message || "Ocurrió un error.",
                errores: responseData.errores || [],
            };
        }

        return responseData;
    } catch (error) {
        console.error("Error en la solicitud POST:", error);
        return {
            status: "error",
            message: "No se pudo conectar con el servidor.",
        };
    }
}


export async function get(endpoint, token = null) {
    const headers = {};
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await fetch(`${BASE_URL}/${endpoint}`, { headers });
    return response.json();
}
