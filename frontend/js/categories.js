// categories.js

import { cargarCategorias, mostrarProductosCategoria } from "./events/categoryEvents.js";
import { initAuthPage } from "./events/authEvents.js";

document.addEventListener("DOMContentLoaded", () => {
    // Inicializar autenticación
    initAuthPage();

    // Cargar categorías en el menú desplegable
    cargarCategorias();

    // Asignar evento para mostrar productos al seleccionar una categoría
    const categorySelect = document.getElementById("categorySelect");
    if (categorySelect) {
        categorySelect.addEventListener("change", (e) => {
            mostrarProductosCategoria(parseInt(e.target.value));
        });
    }
});
