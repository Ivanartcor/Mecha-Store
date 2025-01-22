// events/cartEvents.js

import { getItem, setItem, removeItem } from "../utils/storage.js";
import { setInnerHTML, showError } from "../utils/ui.js";
import { post } from "../utils/api.js";

// Cargar el carrito en la página
export function loadCart() {
    const carrito = getItem("carrito") || [];
    setInnerHTML(
        "carritoContainer",
        carrito.length
            ? carrito.map(productoCarritoHTML).join("")
            : "<p>El carrito está vacío.</p>"
    );

    updateTotal();
}

// Actualizar total del carrito
export function updateTotal() {
    const carrito = getItem("carrito") || [];
    const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
    setInnerHTML("totalCompra", `Total a Pagar: $${total.toFixed(2)}`);
}

// Agregar Producto al Carrito
export function addToCart(idProducto) {
    const tienda = getItem("tienda");

    if (!tienda) {
        showError("No hay productos disponibles.", "error-message");
        return;
    }

    const producto = tienda?.productos.find(p => p.id === idProducto);
    if (!producto) {
        showError("Producto no encontrado.", "error-message");
        return;
    }

    
        let carrito = getItem("carrito") || [];
        const existe = carrito.find(p => p.id === idProducto);

        if (existe) {
            existe.cantidad++;
        } else {
            carrito.push({ ...producto, cantidad: 1 });
        }

        setItem("carrito", carrito);
        alert("Producto agregado al carrito.");
        loadCart();
   
}

// Actualizar la cantidad de productos en el carrito
export function updateCartQuantity(idProducto, nuevaCantidad) {
    let carrito = getItem("carrito") || [];
    const producto = carrito.find(p => p.id === idProducto);

    if (producto && nuevaCantidad > 0) {
        producto.cantidad = parseInt(nuevaCantidad, 10);
        setItem("carrito", carrito);
        loadCart();
    }
}

// Eliminar producto del carrito
export function removeFromCart(idProducto) {
    let carrito = getItem("carrito") || [];
    carrito = carrito.filter(p => p.id !== idProducto);

    setItem("carrito", carrito);
    loadCart();
}


// Vaciar el carrito completamente
export function clearCart() {
    removeItem("carrito");
    loadCart();
}

// Finalizar compra enviando los datos al backend
export async function checkoutCart() {
    const carrito = getItem("carrito") || [];

    if (carrito.length === 0) {
        showError("El carrito está vacío.", "error-message");
        return;
    }

    try {
        const token = getItem("token");
        const response = await post("carrito.php", { carrito }, token);

        if (response.status === "success") {
            alert("Compra realizada con éxito.");
            clearCart();
        } else {
            showError(response.message || "Error en la compra.", "error-message");
        }
    } catch (error) {
        console.error("Error al finalizar la compra:", error);
        showError("Error del servidor. Inténtelo de nuevo.", "error-message");
    }
}

// Plantilla HTML para Productos en el Carrito
function productoCarritoHTML(producto) {
    const imagenProducto = producto.imagen?.trim()
        ? `../assets/images/${producto.imagen}`
        : "../assets/images/default-product.jpg";

    return `
        <div class="producto-carrito">
            <img src="${imagenProducto}" alt="${producto.nombre}" onerror="this.src='../assets/images/default-product.jpg'">
            <h3>${producto.nombre}</h3>
            <p><strong>Precio:</strong> $${producto.precio.toFixed(2)}</p>
            <p><strong>Cantidad:</strong> 
                <input type="number" value="${producto.cantidad}" min="1" 
                onchange="updateCartQuantity(${producto.id}, this.value)">
            </p>
            <p><strong>Subtotal:</strong> $${(producto.precio * producto.cantidad).toFixed(2)}</p>
            <button class="btn-delete" onclick="removeFromCart(${producto.id})">Eliminar</button>
        </div>
    `;
}

// Registrar eventos de carrito en la página
export function registerCartEvents() {
    document.addEventListener("DOMContentLoaded", loadCart);

    const checkoutButton = document.getElementById("checkoutBtn");
    if (checkoutButton) {
        checkoutButton.addEventListener("click", checkoutCart);
    }

    const clearButton = document.getElementById("clearCartBtn");
    if (clearButton) {
        clearButton.addEventListener("click", clearCart);
    }
}