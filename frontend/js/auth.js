// URL del servidor
const API_URL = "http://localhost/RA4_AEE_Tienda_Online_API_REST_Y_Cliente_HTML/backend/api/login.php";
//const API_URL = "../../backend/api/login.php";

//manejar el inicio de sesión
document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Obtener los datos del formulario
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        // Enviar la solicitud POST al servidor
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.status === 200) {
            // Guardar el token y datos en localStorage
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify({
                nombre: data.nombre,
                email: data.email,
            }));

            localStorage.setItem("tienda", JSON.stringify(data.tienda));

            // Redirigir al Dashboard
            window.location.href = "dashboard.html";
        } else {
            mostrarError(data.message);
        }
    } catch (error) {
        console.error("Error en la autenticación:", error);
        mostrarError("Error del servidor.");
    }
});


// Mostrar mensajes de error
function mostrarError(mensaje) {
    document.getElementById("error-message").innerText = mensaje;
}


// Cerrar sesión
document.getElementById("logoutBtn")?.addEventListener("click", () => {
    localStorage.clear(); // Limpia el almacenamiento
    window.location.href = "login.html"; // Redirige al login
});


// Función para verificar el token al cargar una página
function verificarAutenticacion() {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "login.html"; // Redirige si no hay token
    }
}


