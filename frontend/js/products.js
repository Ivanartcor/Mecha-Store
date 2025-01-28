//products.js

import { initAuthPage } from "./events/authEvents.js";
import { mostrarDetallesProducto, registrarEventosDetallesProducto } from "./events/productEvents.js";
import { loadHeader } from "./header.js";



document.addEventListener("DOMContentLoaded", () => {

    loadHeader().then(() => {
        initAuthPage(); // Verifico token y inicializo eventos de usuario

        // Obtener el id del producto desde la URL y mostrar sus detalles
        const params = new URLSearchParams(window.location.search);
        const idProducto = parseInt(params.get("id"));

        if (idProducto) {
            mostrarDetallesProducto(idProducto);
            
        }

        //window.mostrarTab = mostrarTab;

        registrarEventosDetallesProducto();
        
    }).catch(error => console.error("Error al inicializar la página:", error));
});

