// events/categoryEvents.js
import { getItem } from "../utils/storage.js";
import { setInnerHTML } from "../utils/ui.js";
import { productoHTML } from "./productEvents.js";
import { addToCart } from "./cartEvents.js";

// Cargar las categorías en el menú desplegable
export function cargarCategorias() {
    const tienda = getItem("tienda");
    const categorySelect = document.getElementById("categorySelect");

    // Limpiar el menú antes de llenarlo para evitar duplicados
    categorySelect.innerHTML = '<option value="">Seleccione una Categoría</option>';

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

// Mostrar productos de una categoría y la información de la categoría
export function mostrarProductosCategoria(idCategoria) {
    const tienda = getItem("tienda");
    const productosContainer = document.getElementById("productosContainer");
    const categoryInfo = document.getElementById("categoryInfo");
    const categoryName = document.getElementById("categoryName");
    const categoryDescription = document.getElementById("categoryDescription");

    // Buscar la categoría seleccionada
    const categoria = tienda.categorias.find(cat => cat.id === idCategoria);
    if (!categoria) {
        categoryInfo.classList.add("hidden");
        productosContainer.innerHTML = "<p>Selecciona una categoría para ver productos.</p>";
        return;
    }

    // Mostrar la información de la categoría
    categoryName.textContent = categoria.nombre;
    categoryDescription.textContent = categoria.descripcion;
    categoryInfo.classList.remove("hidden");

    // Mostrar productos de la categoría seleccionada
    const productos = tienda.productos.filter(p => p.id_categoria === idCategoria);
    setInnerHTML(
        "productosContainer",
        productos.length
            ? productos.map(productoHTML).join("")
            : "<p>No hay productos disponibles en esta categoría.</p>"
    );

    // Registrar eventos de productos después de cargar la categoría
    registrarEventosProductosCategoria();
}


// Registrar eventos para los productos de la categoría
export function registrarEventosProductosCategoria() {
    const productosContainer = document.getElementById("productosContainer");

    // Limpiar eventos previos
    const nuevoContainer = productosContainer.cloneNode(true);
    productosContainer.parentNode.replaceChild(nuevoContainer, productosContainer);

    // Agregar eventos de click al nuevo contenedor
    nuevoContainer.addEventListener("click", (event) => {
        const addCartButton = event.target.closest(".btn-add-cart");
        const productoCard = event.target.closest(".card-producto");

        // Manejar clic en el botón de agregar al carrito
        if (addCartButton) {
            const idProducto = parseInt(addCartButton.dataset.id, 10);
            if (!isNaN(idProducto)) {
                addToCart(idProducto);
                event.stopPropagation();
                console.log(`Producto ${idProducto} agregado al carrito desde categorías.`);
            } else {
                console.error("ID del producto no válido.");
            }
        }

        // Manejar clic en la tarjeta del producto para ver detalles
        if (productoCard && !addCartButton) {
            const idProducto = parseInt(productoCard.dataset.id, 10);
            if (!isNaN(idProducto)) {
                window.location.href = `./product.html?id=${idProducto}`;
            } else {
                console.error("ID del producto no válido.");
            }
        }
    });
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
