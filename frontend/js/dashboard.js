// dashboard.js

import { mostrarProductosDestacados, mostrarProductosVistos, registrarEventosProductos } from "./events/productEvents.js";
import { initAuthPage } from "./events/authEvents.js";
import { loadHeader } from "./header.js";


// Exponer la función globalmente para que sea accesible en el HTML
//window.verProducto = verProducto;

document.addEventListener("DOMContentLoaded", () => {

    loadHeader().then(() => {
        // Inicializar autenticación y mostrar nombre del usuario
        initAuthPage();

        // Cargar productos destacados y productos vistos recientemente
        if (document.getElementById("productosDestacados")) {
            mostrarProductosDestacados();
        }

        if (document.getElementById("productosVistos")) {
            mostrarProductosVistos();
        }

        registrarEventosProductos();

    }).catch(error => console.error("Error al inicializar la página:", error));
});
