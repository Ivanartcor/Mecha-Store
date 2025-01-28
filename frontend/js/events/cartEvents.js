// events/cartEvents.js

import { getItem, setItem, removeItem } from "../utils/storage.js";
import { setInnerHTML, showError } from "../utils/ui.js";
import { post } from "../utils/api.js";
import { productoHTML } from "./productEvents.js";
import { showMessage, clearMessage } from "../utils/ui.js";

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
    mostrarProductosVistosCart(); // Cargar productos vistos recientemente
}

// Actualizar total del carrito
export function updateTotal() {
    const carrito = getItem("carrito") || [];
    const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
    setInnerHTML("totalCompra", `Total a Pagar: $${total.toFixed(2)}`);
}

// Agregar Producto al Carrito
export function addToCart(idProducto, cantidad = 1) {
    console.log(`Intentando agregar ${cantidad} unidades del producto ${idProducto} al carrito.`);
    const tienda = getItem("tienda");

    if (!tienda) {
        showError("No hay productos disponibles.", "error-message");
        return;
    }

    const producto = tienda.productos.find(p => p.id === idProducto);
    if (!producto) {
        showError("Producto no encontrado.", "error-message");
        return;
    }

    let carrito = getItem("carrito") || [];
    const existe = carrito.find(p => p.id === idProducto);

    if (existe) {
        // Asegurar que la cantidad no exceda el stock disponible
        const nuevaCantidad = existe.cantidad + cantidad;
        if (nuevaCantidad <= producto.stock) {
            existe.cantidad = nuevaCantidad;
            console.log(`Nueva cantidad en carrito: ${nuevaCantidad}`);
        } else {
            //vamos a agregar ue si la cantidad que se puede agregar en el carrito es 0, que el mensaje sea que ya no se puedan agregar más
            alert(`Solo puedes agregar ${producto.stock - existe.cantidad} más de este producto`);
            return;
        }
    } else {
        if (cantidad <= producto.stock) {
            carrito.push({ ...producto, cantidad });
            console.log(`Producto añadido al carrito con cantidad: ${cantidad}`);
        } else {
            alert("No puedes agregar más productos de los disponibles en stock.");
            return;
        }
    }

    setItem("carrito", carrito);
    loadCart();
    alert(`Se añadieron ${cantidad} unidades al carrito.`);
    
    
    
    
}


// Actualizar la cantidad de productos en el carrito
export function updateCartQuantity(idProducto, nuevaCantidad) {
    let carrito = getItem("carrito") || [];
    const producto = carrito.find(p => p.id === idProducto);

    if (producto && nuevaCantidad > 0) {
        producto.cantidad = parseInt(nuevaCantidad, 10);
        setItem("carrito", carrito);
        console.log(`Cantidad actualizada para el producto ${idProducto}: ${nuevaCantidad}`);
    } else if (producto && nuevaCantidad <= 0) {
        removeFromCart(idProducto); // Si la cantidad es 0 o menor, eliminar el producto
    }
    loadCart(); // Recargar el carrito después de la actualización
}

// Eliminar producto del carrito
export function removeFromCart(idProducto) {
    let carrito = getItem("carrito") || [];
    carrito = carrito.filter(p => p.id !== idProducto);

    setItem("carrito", carrito);
    console.log(`Producto ${idProducto} eliminado del carrito.`);
    loadCart(); // Recargar el carrito después de eliminar
}

// Vaciar el carrito completamente
export function clearCart() {
    removeItem("carrito");
    loadCart();
}

export async function checkoutCart() {
    const carrito = getItem("carrito") || [];

    if (carrito.length === 0) {
        showMessage("El carrito está vacío.", "messageContainer", "error");
        return;
    }

    try {
        const token = getItem("token");
        const response = await post("carrito.php", { carrito }, token);

        if (response.status === "success") {
            showMessage(response.message || "Compra realizada con éxito.", "messageContainer", "success");
            clearCart();
        } else {
            if (response.errores && Array.isArray(response.errores)) {
                showMessage(
                    `Errores: ${response.errores.join(", ")}`,
                    "messageContainer",
                    "error"
                );
            } else {
                showMessage(response.message || "Error en la compra.", "messageContainer", "error");
            }
        }
    } catch (error) {
        console.error("Error al finalizar la compra:", error);
        showMessage("Error del servidor. Inténtelo de nuevo.", "messageContainer", "error");
    }
}

// Plantilla HTML para Productos en el Carrito
function productoCarritoHTML(producto) {
    const imagenProducto = producto.imagen?.trim()
        ? `../assets/images/${producto.imagen}`
        : "../assets/images/default-product.jpg";

        return `
        <li class="producto-carrito-item" data-id="${producto.id}">
            <!-- Imagen del Producto -->
            <div class="producto-carrito-imagen">
                <img src="${imagenProducto}" alt="${producto.nombre}" onerror="this.src='../assets/images/default-product.jpg'">
            </div>
            <!-- Información del Producto -->
            <div class="producto-carrito-info">
                <h3>${producto.nombre}</h3>
                <p><strong>Precio:</strong> $${producto.precio.toFixed(2)}</p>
            </div>
            <!-- Cantidad -->
            <div class="producto-carrito-cantidad">
                <label for="cantidad-${producto.id}">Cantidad:</label>
                <input 
                    id="cantidad-${producto.id}" 
                    type="number" 
                    value="${producto.cantidad}" 
                    min="0" 
                    max="${producto.stock}" 
                    data-id="${producto.id}"
                    class="cantidad-producto"
                >
            </div>
            <!-- Subtotal -->
            <div class="producto-carrito-subtotal">
                <p>$${(producto.precio * producto.cantidad).toFixed(2)}</p>
            </div>
            <!-- Botón de Eliminar -->
            <div class="producto-carrito-accion">
                <button class="btn-delete" data-id="${producto.id}">Eliminar</button>
            </div>
        </li>
    `;
}



// Mostrar productos vistos recientemente en la sección de carrito
function mostrarProductosVistosCart() {
    const productosVistos = getItem("productosVistos") || [];
    setInnerHTML(
        "productosVistosCart",
        productosVistos.length
            ? productosVistos.map(productoHTML).join("")
            : "<p>No has visto productos recientemente.</p>"
    );
    if (!mostrarProductosVistosCart.eventsRegistered) {
        registrarEventosProductosVistos();
        mostrarProductosVistosCart.eventsRegistered = true;
    }
}


// Registrar eventos para los productos vistos recientemente
function registrarEventosProductosVistos() {
    const productosVistosCart = document.getElementById("productosVistosCart");

    productosVistosCart?.addEventListener("click", (event) => {
        const addCartButton = event.target.closest(".btn-add-cart");
        const productoCard = event.target.closest(".card-producto");

        if (addCartButton) {
            const idProducto = parseInt(addCartButton.dataset.id, 10);
            if (!isNaN(idProducto)) {
                addToCart(idProducto);
                event.stopPropagation();
            }
        }

        if (productoCard && !addCartButton) {
            const idProducto = parseInt(productoCard.dataset.id, 10);
            if (!isNaN(idProducto)) {
                window.location.href = `./product.html?id=${idProducto}`;
            }
        }
    });
}


// Delegar eventos de acciones en el carrito
export function registerCartEvents() {
    const carritoContainer = document.getElementById("carritoContainer");

    carritoContainer?.addEventListener("input", (event) => {
        const quantityInput = event.target.closest("input[type='number']");
        if (quantityInput) {
            const idProducto = parseInt(quantityInput.dataset.id, 10);
            const nuevaCantidad = parseInt(quantityInput.value, 10);
            if (!isNaN(idProducto) && !isNaN(nuevaCantidad)) {
                updateCartQuantity(idProducto, nuevaCantidad);
            }
        }
    });

    carritoContainer?.addEventListener("click", (event) => {
        const removeButton = event.target.closest(".btn-delete");
        if (removeButton) {
            const idProducto = parseInt(removeButton.dataset.id, 10);
            if (!isNaN(idProducto)) {
                removeFromCart(idProducto);
            }
            event.stopPropagation(); // Evitar que la acción de eliminar redirija
            return;
        }

        const productItem = event.target.closest(".producto-carrito-item");
        if (productItem && !event.target.closest("input, button")) {
            const idProducto = parseInt(productItem.dataset.id, 10);
            if (!isNaN(idProducto)) {
                window.location.href = `./product.html?id=${idProducto}`;
            }
        }
    });

    
    document.getElementById("finalizarCompraBtn")?.addEventListener("click", checkoutCart);
    document.getElementById("clearCartBtn")?.addEventListener("click", clearCart);
}