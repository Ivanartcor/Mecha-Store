//auth.js

// URL del servidor para login
const API_URL_LOGIN = "http://localhost/RA4_AEE_Tienda_Online_API_REST_Y_Cliente_HTML/backend/api/login.php";
//const API_URL_LOGIN = "../../backend/api/login.php";

//manejar el inicio de sesión
document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Obtener los datos del formulario
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        // Enviar la solicitud POST al servidor
        const response = await fetch(API_URL_LOGIN, {
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



// Función para cerrar sesión
function cerrarSesion() {
    localStorage.clear(); 
    window.location.href = "login.html"; 
}


// Función para verificar el token al cargar una página
function verificarAutenticacion() {
    //Actualmente solo comprobamos que exista en el localStorage
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "login.html"; // Redirige si no hay token
    }
    //Se puede añadir lógica para verificas si ha expirado,
    //o enviarlo al servidor para comprobar si es válido decodificándolo
}

// Registrar el evento de cierre de sesión en todas las páginas
function registrarCierreSesion() {
    const logoutButton = document.getElementById("logoutBtn");
    if (logoutButton) {
        logoutButton.removeEventListener("click", cerrarSesion); // Evitar duplicados
        logoutButton.addEventListener("click", cerrarSesion);
    } else {
        console.error("Botón de cierre de sesión no encontrado.");
    }
}

// Mostrar mensajes de error
function mostrarError(mensaje) {
    document.getElementById("error-message").innerText = mensaje;
}




