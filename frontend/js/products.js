// Verificar autenticación antes de cargar el dashboard
function cargarDashboard() {
    verificarAutenticacion(); // Desde auth.js

    // Mostrar nombre del usuario
    const user = JSON.parse(localStorage.getItem("user"));
    document.getElementById("nombre").innerText = user.nombre;

    // Obtener la tienda desde el localStorage
    const tienda = JSON.parse(localStorage.getItem("tienda"));

    // Filtrar productos destacados
    const productosDestacados = tienda.productos.filter(p => p.destacado);

    // Mostrar productos destacados
    mostrarProductosDestacados(productosDestacados);

     // Registrar el evento de clic en el botón de cerrar sesión
     const logoutButton = document.getElementById("logoutBtn");
     if (logoutButton) {
         logoutButton.addEventListener("click", cerrarSesion);
     }
}

// Mostrar los productos destacados en el dashboard
function mostrarProductosDestacados(productos) {
    const contenedor = document.getElementById("productosDestacados");
    contenedor.innerHTML = "";

    if (productos.length === 0) {
        contenedor.innerHTML = "<p>No hay productos destacados disponibles.</p>";
        return;
    }

    productos.forEach(producto => {
        const productoHTML = `
            <div class="producto">
                <img src="../assets/images/${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <p><strong>Precio:</strong> $${producto.precio}</p>
                <button onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
            </div>
        `;
        contenedor.innerHTML += productoHTML;
    });
}


// Cargar las categorías desde LocalStorage
function cargarCategorias() {
    verificarAutenticacion(); 

    // Registrar evento para cerrar sesión
    document.getElementById("logoutBtn").addEventListener("click", cerrarSesion);

    const tienda = JSON.parse(localStorage.getItem("tienda"));
    const categoriasContainer = document.getElementById("categoriasContainer");

    categoriasContainer.innerHTML = "";

    // Mostrar categorías
    tienda.categorias.forEach(categoria => {
        const categoriaHTML = `
            <div class="categoria" onclick="mostrarProductos(${categoria.id})">
                <h3>${categoria.nombre}</h3>
                <p>${categoria.descripcion}</p>
            </div>
        `;
        categoriasContainer.innerHTML += categoriaHTML;
    });
}

// Mostrar productos relacionados a una categoría
function mostrarProductos(idCategoria) {
    const tienda = JSON.parse(localStorage.getItem("tienda"));
    const productosContainer = document.getElementById("productosContainer");

    // Filtrar productos según la categoría seleccionada
    const productos = tienda.productos.filter(p => p.id_categoria === idCategoria);

    productosContainer.innerHTML = "";

    if (productos.length === 0) {
        productosContainer.innerHTML = "<p>No hay productos disponibles en esta categoría.</p>";
        return;
    }

    productos.forEach(producto => {
        const productoHTML = `
            <div class="producto">
                <img src="../assets/images/${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <p><strong>Precio:</strong> $${producto.precio}</p>
                <button onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
            </div>
        `;
        productosContainer.innerHTML += productoHTML;
    });
}




// Función básica para agregar productos al carrito
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
