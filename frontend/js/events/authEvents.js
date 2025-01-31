// events/authEvents.js

import { setItem, getItem, clearStorage } from "../utils/storage.js";
import { post } from "../utils/api.js";
import { showError, clearError } from "../utils/ui.js";


// URL del endpoint de autenticación
const LOGIN_ENDPOINT = "login.php";

export function handleLogin(event) {
    event.preventDefault();

    clearError("error-message");

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
        showError("Por favor, completa todos los campos.", "error-message");
        return;
    }

    post(LOGIN_ENDPOINT, { email, password })
        .then(data => {
            if (data.token) {
                setItem("token", data.token);
                setItem("user", { nombre: data.nombre, email: data.email });
                setItem("tienda", data.tienda);
                window.location.href = "dashboard.html";
            } else {
                showError(data.message|| "Credenciales incorrectas.", "error-message");
            }
        })
        .catch(() => showError("Error del servidor.", "error-message"));
}

export function handleLogout() {
    clearStorage();
    window.location.href = "login.html";
}

//De momento lo unico que se comprueba es si existe, para una mejor validación modificar este método (ej: caducidad)
export function verifyAuthentication() {
    const token = getItem("token");
    if (!token) window.location.href = "login.html";
}


// Registrar evento de cierre de sesión en el botón correspondiente
export function registerLogoutEvent() {
    const logoutButton = document.getElementById("logoutBtn");
    if (logoutButton) {
        logoutButton.removeEventListener("click", handleLogout); // Evitar duplicados
        logoutButton.addEventListener("click", handleLogout);
    } else {
        console.error("Botón de cierre de sesión no encontrado.");
    }
}

// Obtener datos del usuario autenticado
export function getUserData() {
    return getItem("user");
}

// Mostrar nombre del usuario en la interfaz
export function displayUserName(elementId) {
    const user = getUserData();
    if (user && user.nombre) {
        document.getElementById(elementId).innerText = user.nombre;
    }
}

// Inicializar la autenticación en la página
export function initAuthPage() {
    verifyAuthentication();
    registerLogoutEvent();
    displayUserName("nombre");
}