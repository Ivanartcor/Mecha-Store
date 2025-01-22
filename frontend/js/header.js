import { registerLogoutEvent } from "./events/authEvents.js";

export function loadHeader() {
    return fetch("./header.html")
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al cargar el header");
            }
            return response.text();
        })
        .then(html => {
            document.body.insertAdjacentHTML("afterbegin", html);
            registerLogoutEvent(); // Asegurarse de que los eventos se registren después de la carga
        })
        .catch(error => console.error("Error al insertar el header:", error));
}
