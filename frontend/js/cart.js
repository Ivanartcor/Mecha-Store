// cart.js

import { initAuthPage } from "./events/authEvents.js";
import { registerCartEvents, loadCart } from "./events/cartEvents.js";
import { loadHeader } from "./header.js";

document.addEventListener("DOMContentLoaded", () => {

    loadHeader().then(() => {
        initAuthPage();

        // Cargar el carrito de inmediato
        loadCart();

        //Registrar eventos
        registerCartEvents();
    }).catch(error => console.error("Error al inicializar la página:", error));

});
