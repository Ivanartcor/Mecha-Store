// events/productEvents.js

import { getItem, setItem } from "../utils/storage.js";
import { setInnerHTML } from "../utils/ui.js";
import { addToCart } from "./cartEvents.js";

// Mostrar productos destacados en el dashboard
export function mostrarProductosDestacados() {
    const tienda = getItem("tienda");
    if (!tienda || !tienda.productos) return;

    const productosDestacados = tienda.productos.filter(p => p.destacado);
    const contenedor = document.getElementById("productosDestacados");

    if (productosDestacados.length === 0) {
        setInnerHTML("productosDestacados", "<p>No hay productos destacados disponibles.</p>");
        return;
    }

    setInnerHTML(
        "productosDestacados",
        productosDestacados.map(productoHTML).join("")
    );


}

// Mostrar productos vistos recientemente en dashboard
export function mostrarProductosVistos() {
    const productosVistos = getItem("productosVistos") || [];
    setInnerHTML(
        "productosVistos",
        productosVistos.length
            ? productosVistos.map(productoHTML).join("")
            : "<p>No has visto productos recientemente.</p>"
    );
}

// Registrar el producto como visto
export function registrarProductoVisto(idProducto) {
    let productosVistos = getItem("productosVistos") || [];
    const tienda = getItem("tienda");
    const producto = tienda.productos.find(p => p.id === idProducto);

    if (!productosVistos.find(p => p.id === idProducto)) {
        productosVistos.push(producto);
        if (productosVistos.length > 5) productosVistos.shift();
        setItem("productosVistos", productosVistos);
    }
}


// Mostrar detalles del producto
export function mostrarDetallesProducto(idProducto) {
    const tienda = getItem("tienda");
    const producto = tienda.productos.find(p => p.id === idProducto);

    if (!producto) {
        setInnerHTML("productoDetalle", "<p>Producto no encontrado.</p>");
        return;
    }

    registrarProductoVisto(idProducto);
    setInnerHTML("productoDetalle", productoDetalleHTML(producto));

    mostrarDescripcion(producto);
    mostrarCaracteristicas(producto);

}

// Redirigir a la página de producto
export function verProducto(idProducto) {
    //registrarProductoVisto(idProducto);
    window.location.href = `./product.html?id=${idProducto}`;
}


export function registrarEventosProductos() {
    document.querySelector(".productos-grid")?.addEventListener("click", (event) => {
        const productoCard = event.target.closest(".card-producto");
        const addCartButton = event.target.closest(".btn-add-cart");

        // Manejar clic en la tarjeta del producto para redirigir a los detalles
        if (productoCard && !addCartButton) {
            const idProducto = parseInt(productoCard.dataset.id, 10);
            if (!isNaN(idProducto)) {
                verProducto(idProducto);
            } else {
                console.error("ID del producto no válido.");
            }
        }

        // Manejar clic en el botón de agregar al carrito
        if (addCartButton) {
            const idProducto = parseInt(addCartButton.dataset.id, 10);
            if (!isNaN(idProducto)) {
                addToCart(idProducto);
                console.log(`Producto ${idProducto} agregado al carrito`);
            } else {
                console.error("ID del producto no válido.");
            }
        }
    });

    // Delegación de eventos para productos vistos recientemente
    document.querySelector("#productosVistos")?.addEventListener("click", (event) => {
        const productoCard = event.target.closest(".card-producto");
        const addCartButton = event.target.closest(".btn-add-cart");

        // Manejar clic en el botón de agregar al carrito
        if (addCartButton) {
            const idProducto = parseInt(addCartButton.dataset.id, 10);
            if (!isNaN(idProducto)) {
                addToCart(idProducto);
                console.log(`Producto ${idProducto} agregado al carrito desde productos vistos.`);
                // Evitar que el evento se propague al clic en la tarjeta del producto
                event.stopPropagation();
                return;
            } else {
                console.error("ID del producto no válido.");
            }
        }

        // Manejar clic en la tarjeta del producto para redirigir a los detalles
        if (productoCard) {
            const idProducto = parseInt(productoCard.dataset.id, 10);
            if (!isNaN(idProducto)) {
                verProducto(idProducto);
            } else {
                console.error("ID del producto no válido.");
            }
        }
    });
}

export function registrarEventosDetallesProducto() {
    document.querySelector("#productoDetalle")?.addEventListener("click", (event) => {
        const addCartButton = event.target.closest(".btn-add-cart-detail");

        if (addCartButton) {
            const idProducto = parseInt(addCartButton.dataset.id, 10);
            const cantidadInput = document.getElementById("cantidad");
            const cantidad = cantidadInput ? parseInt(cantidadInput.value, 10) : 1;

            if (!isNaN(idProducto) && !isNaN(cantidad) && cantidad > 0) {
                addToCart(idProducto, cantidad);
            } else {
                console.error("Cantidad inválida o ID de producto no válido.");
            }
        }
    });

    registrarEventosTabs();
}


export function registrarEventosTabs() {
    document.addEventListener("click", (event) => {
        const tabButton = event.target.closest(".tab-link");

        if (tabButton) {
            const tabId = tabButton.dataset.tab;
            if (tabId) {
                mostrarTab(tabId);
            } else {
                console.error("ID de pestaña no válido.");
            }
        }
    });
}

// Función para manejar el cambio de pestañas (descripción y características)
export function mostrarTab(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    const buttons = document.querySelectorAll('.tab-link');

    tabs.forEach(tab => tab.classList.remove('active'));
    buttons.forEach(btn => btn.classList.remove('active'));

    document.getElementById(tabId).classList.add('active');
    document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
}



// Mostrar la descripción del producto
export function mostrarDescripcion(producto) {
    setInnerHTML("descripcion", `<p class="descripcion-larga">${producto.descripcion_larga}</p>`);
}

// Mostrar las características del producto
export function mostrarCaracteristicas(producto) {
    const caracteristicas = Object.entries(producto.caracteristicas)
        .map(([clave, valor]) => `<p><strong>${clave}:</strong> ${valor}</p>`)
        .join('');
    setInnerHTML("caracteristicas", caracteristicas);
}



// Plantilla HTML para una tarjeta de producto
export function productoHTML(producto) {
    const imagenProducto = producto.imagen && producto.imagen.trim() !== ""
        ? `../assets/images/${producto.imagen}`
        : "../assets/images/default-product.jpg"; // Imagen genérica

    const botonCarrito = producto.stock > 0
        ? `<button class="btn-action btn-add-cart" data-id="${producto.id}">Añadir al Carrito</button>`
        : `<p class="sin-stock">Sin Stock</p>`;

    return `
        <div class="producto card-producto" data-id="${producto.id}">
            <div class="producto-imagen">
                <img src="${imagenProducto}" alt="${producto.nombre}" onerror="this.src='../assets/images/default-product.jpg'">
            </div>
            <div class="producto-info">
                <h3>${producto.nombre}</h3>
                <p class="texto-precio"><strong>Precio:</strong> $${producto.precio.toFixed(2)}</p>
                <div class="acciones-producto">
                    ${botonCarrito}
                </div>
            </div>
        </div>
    `;
}

function productoDetalleHTML(producto) {
    const imagenProducto = producto.imagen && producto.imagen.trim() !== ""
        ? `../assets/images/${producto.imagen}`
        : "../assets/images/default-product.jpg";

    const botonCarrito = producto.stock > 0
        ? `<button class="btn-action btn-add-cart-detail" data-id="${producto.id}">Añadir al Carrito</button>`
        : `<p class="sin-stock">Sin Stock</p>`;

    return `
        <div class="detalle-grid">
            <div class="detalle-imagen">
                <img src="${imagenProducto}" alt="${producto.nombre}" onerror="this.src='../assets/images/default-product.jpg'">
            </div>

            <div class="detalle-info">
                <h2>${producto.nombre}</h2>
                <p class="texto-precio"><strong>Precio:</strong> $${producto.precio.toFixed(2)}</p>
                <p>${producto.descripcion_corta}</p>
                <p>Stock disponible: ${producto.stock}</p>
                <label for="cantidad">Cantidad:</label>
                <input type="number" id="cantidad" name="cantidad" min="1" max="${producto.stock}" value="1">
                <div class="boton-carrito">
                    ${botonCarrito}
                </div>
            </div>
        </div>
    `;
}