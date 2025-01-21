// events/authEvents.js

import { setItem, getItem, clearStorage } from "../utils/storage.js";
import { post } from "../utils/api.js";
import { showError } from "../utils/ui.js";

export function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    post("login.php", { email, password })
        .then(data => {
            if (data.token) {
                setItem("token", data.token);
                setItem("user", { nombre: data.nombre, email: data.email });
                setItem("tienda", data.tienda);
                window.location.href = "dashboard.html";
            } else {
                showError(data.message, "error-message");
            }
        })
        .catch(() => showError("Error del servidor.", "error-message"));
}

export function handleLogout() {
    clearStorage();
    window.location.href = "login.html";
}

export function verifyAuthentication() {
    const token = getItem("token");
    if (!token) window.location.href = "login.html";
}
