//cart.js

// cart.js

import { loadCart } from "./events/cartEvents.js";

document.addEventListener("DOMContentLoaded", loadCart);


/*
// URL del servidor para carrito
const API_URL_CART = "http://localhost/RA4_AEE_Tienda_Online_API_REST_Y_Cliente_HTML/backend/api/carrito.php";


// Cargar el carrito después de que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", cargarCarrito);


// Función para cargar el Carrito
function cargarCarrito() {
    verificarAutenticacion(); 

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const carritoContainer = document.getElementById("carritoContainer");
    const totalCompra = document.getElementById("totalCompra");

    if (!carritoContainer || !totalCompra) {
        console.error("Error: Elementos del carrito no encontrados.");
        return;
    }

    carritoContainer.innerHTML = carrito.length 
        ? carrito.map(productoCarritoHTML).join('')
        : "<p>El carrito está vacío.</p>";

    const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
    totalCompra.innerText = `Total a Pagar: $${total.toFixed(2)}`;

    mostrarProductosVistosCart();

    registrarCierreSesion();
}


// Agregar Producto al Carrito
function agregarAlCarrito(idProducto) {
    const tienda = JSON.parse(localStorage.getItem("tienda"));
    const producto = tienda.productos.find(p => p.id === idProducto);

    if (producto) {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        const existe = carrito.find(p => p.id === idProducto);

        if (existe) {
            existe.cantidad++;
        } else {
            carrito.push({ ...producto, cantidad: 1 });
        }

        localStorage.setItem("carrito", JSON.stringify(carrito));
        alert("Producto agregado al carrito.");
    }
}

// Actualizar Cantidad en el Carrito
function actualizarCantidad(idProducto, nuevaCantidad) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const producto = carrito.find(p => p.id === idProducto);

    if (producto && nuevaCantidad > 0) {
        producto.cantidad = parseInt(nuevaCantidad);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        cargarCarrito();
    }
}

// Eliminar Producto del Carrito
function eliminarDelCarrito(idProducto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito = carrito.filter(p => p.id !== idProducto);

    localStorage.setItem("carrito", JSON.stringify(carrito));
    cargarCarrito();
}

// Finalizar Compra
async function finalizarCompra() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    try {
        const token = localStorage.getItem("token");
        const response = await fetch(API_URL_CART, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ carrito })
        });

   
        const data = await response.json();
        if (response.status === 200 && data.status === "success") {
            alert("Compra realizada con éxito.");
            localStorage.removeItem("carrito");
            cargarCarrito();
        } else {
            mostrarErrores(data.errores || [data.message]);
        }
    } catch (error) {
        console.error("Error al finalizar la compra:", error);
        alert("Error del servidor.");
    }
}

// Plantilla HTML para Productos en el Carrito
function productoCarritoHTML(producto) {
    const imagenProducto = producto.imagen && producto.imagen.trim() !== "" 
        ? `../assets/images/${producto.imagen}` 
        : "../assets/images/default-product.jpg"; // Imagen genérica
    
    return `
        <div class="producto-carrito">
            <img src="${imagenProducto}" alt="${producto.nombre}" onerror="this.src='../assets/images/default-product.jpg'">
            <h3>${producto.nombre}</h3>
            <p><strong>Precio:</strong> $${producto.precio.toFixed(2)}</p>
            <p><strong>Cantidad:</strong> 
                <input type="number" value="${producto.cantidad}" min="1" onchange="actualizarCantidad(${producto.id}, this.value)">
            </p>
            <p><strong>Subtotal:</strong> $${(producto.precio * producto.cantidad).toFixed(2)}</p>
            <button class="btn-delete" onclick="eliminarDelCarrito(${producto.id})">Eliminar</button>
        </div>
    `;
}


// Mostrar Errores en la Compra
function mostrarErrores(errores) {
    const carritoContainer = document.getElementById("carritoContainer");
    carritoContainer.innerHTML = errores.map(err => `<p class="error">${err}</p>`).join('');
}

*/