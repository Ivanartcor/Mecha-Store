// categories.js

import { cargarCategorias, mostrarProductosCategoria } from "./events/categoryEvents.js";
import { initAuthPage } from "./events/authEvents.js";
import { loadHeader } from "./header.js";

document.addEventListener("DOMContentLoaded", () => {

    loadHeader().then(() => {
        // Inicializar autenticación
        initAuthPage();

        // Cargar categorías en el menú desplegable
        cargarCategorias();

        // Asignar evento para mostrar productos al seleccionar una categoría
        const categorySelect = document.getElementById("categorySelect");
        if (categorySelect) {
            categorySelect.addEventListener("change", (e) => {
                const selectedCategory = parseInt(e.target.value);
                if (!isNaN(selectedCategory)) {
                    mostrarProductosCategoria(selectedCategory);
                }
            });

            // Seleccionar automáticamente la primera categoría si está disponible
            if (categorySelect.options.length > 1) {
                categorySelect.selectedIndex = 1; // Seleccionar la primera opción después del placeholder
                categorySelect.dispatchEvent(new Event("change")); // Simular selección
            }
        }
    }).catch(error => console.error("Error al inicializar la página:", error));
});
