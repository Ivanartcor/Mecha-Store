// dashboard.js

import { mostrarProductosDestacados, mostrarProductosVistos, registrarEventosProductos } from "./events/productEvents.js";
import { initAuthPage } from "./events/authEvents.js";
import { loadHeader } from "./header.js";





document.addEventListener("DOMContentLoaded", () => {

    //Primero cargo siempre el header, una vez cargado inicio el resto
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
