// events/cartEvents.js

import { getItem, setItem } from "../utils/storage.js";
import { setInnerHTML } from "../utils/ui.js";

export function loadCart() {
    const carrito = getItem("carrito") || [];
    const carritoContainer = document.getElementById("carritoContainer");
    const totalCompra = document.getElementById("totalCompra");

    if (!carritoContainer || !totalCompra) {
        console.error("Error: Elementos del carrito no encontrados.");
        return;
    }

    const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
    totalCompra.innerText = `Total a Pagar: $${total.toFixed(2)}`;

    setInnerHTML(
        "carritoContainer",
        carrito.length
            ? carrito.map(producto => productoCarritoHTML(producto)).join("")
            : "<p>El carrito está vacío.</p>"
    );
}
