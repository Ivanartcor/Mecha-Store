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

// Mostrar detalles de un producto seleccionado
export function mostrarDetallesProducto(idProducto) {
    const tienda = getItem("tienda");
    const producto = tienda.productos.find(p => p.id === idProducto);

    if (!producto) {
        setInnerHTML("productoDetalle", "<p>Producto no encontrado.</p>");
        return;
    }

    setInnerHTML("productoDetalle", productoDetalleHTML(producto));
}

// Plantilla HTML para una tarjeta de producto
function productoHTML(producto) {
    const imagenProducto = producto.imagen ? `../assets/images/${producto.imagen}` : "../assets/images/default-product.jpg";

    return `
        <div class="producto" onclick="verProducto(${producto.id})">
            <div class="producto-imagen">
                <img src="${imagenProducto}" alt="${producto.nombre}" onerror="this.src='../assets/images/default-product.jpg'">
            </div>
            <div class="producto-info">
                <h3>${producto.nombre}</h3>
                <p class="texto-precio"><strong>Precio:</strong> $${producto.precio.toFixed(2)}</p>
            </div>
        </div>
    `;
}

// Redirigir a la página de producto
export function verProducto(idProducto) {
    registrarProductoVisto(idProducto);
    window.location.href = `./product.html?id=${idProducto}`;
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
