// events/productEvents.js

import { getItem, setItem } from "../utils/storage.js";
import { setInnerHTML } from "../utils/ui.js";

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
}

// Redirigir a la página de producto
export function verProducto(idProducto) {
    registrarProductoVisto(idProducto);
    window.location.href = `./product.html?id=${idProducto}`;
}


// Plantilla HTML para una tarjeta de producto
function productoHTML(producto) {
    const imagenProducto = producto.imagen && producto.imagen.trim() !== "" 
        ? `../assets/images/${producto.imagen}` 
        : "../assets/images/default-product.jpg"; // Imagen genérica
    
    const botonCarrito = producto.stock > 0 
        ? `<button class="btn-action" onclick="agregarAlCarrito(${producto.id}, event)">Añadir al Carrito</button>`
        : `<p class="sin-stock">Sin Stock</p>`;

    return `
        <div class="producto" onclick="verProducto(${producto.id})">
            <div class="producto-imagen">
                <img src="${imagenProducto}" alt="${producto.nombre}" onerror="this.src='../assets/images/default-product.jpg'">
            </div>
            <div class="producto-info">
                <h3>${producto.nombre}</h3>
                <p class="texto-precio"><strong>Precio:</strong> $${producto.precio.toFixed(2)}</p>
                <div class="acciones-producto" onclick="event.stopPropagation();">
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
        ? `<button class="btn-action" onclick="agregarAlCarrito(${producto.id})">Añadir al Carrito</button>`
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
                <input type="number" id="cantidad" min="1" max="${producto.stock}" value="1">
                <div class="boton-carrito">
                    ${botonCarrito}
                </div>
            </div>
        </div>
    `;
}