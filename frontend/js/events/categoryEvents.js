// events/categoryEvents.js

import { getItem } from "../utils/storage.js";
import { setInnerHTML } from "../utils/ui.js";

// Cargar las categorías en el menú desplegable
export function cargarCategorias() {
    const tienda = getItem("tienda");
    const categorySelect = document.getElementById("categorySelect");

    if (!tienda || !tienda.categorias.length) {
        alert("No hay categorías disponibles.");
        return;
    }

    tienda.categorias.forEach(categoria => {
        const option = document.createElement("option");
        option.value = categoria.id;
        option.textContent = categoria.nombre;
        categorySelect.appendChild(option);
    });
}

export function mostrarProductosCategoria(idCategoria) {
    const tienda = getItem("tienda");
    const productosContainer = document.getElementById("productosContainer");

    const productos = tienda.productos.filter(p => p.id_categoria === idCategoria);
    setInnerHTML(
        "productosContainer",
        productos.length
            ? productos.map(productoHTML).join("")
            : "<p>No hay productos disponibles en esta categoría.</p>"
    );
}

// Plantilla HTML para una categoría
function categoriaHTML(categoria) {
    return `
        <div class="categoria" onclick="mostrarProductosCategoria(${categoria.id})">
            <h3>${categoria.nombre}</h3>
            <p>${categoria.descripcion}</p>
        </div>
    `;
}
