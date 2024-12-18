//products.js

// Verificar autenticación antes de cargar el dashboard
function cargarDashboard() {
    verificarAutenticacion(); // Desde auth.js

    // Mostrar nombre del usuario
    const user = JSON.parse(localStorage.getItem("user"));
    document.getElementById("nombre").innerText = user.nombre;

    // Obtener la tienda desde el LocalStorage
    const tienda = JSON.parse(localStorage.getItem("tienda"));

    // Filtrar productos destacados
    const productosDestacados = tienda.productos.filter(p => p.destacado);

    // Mostrar productos destacados
    mostrarProductosDestacados(productosDestacados);

    // Mostrar productos vistos
    mostrarProductosVistos();

    // Registrar el evento de clic en el botón de cerrar sesión
    registrarCierreSesion();
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
        contenedor.innerHTML += productoHTML(producto);
    });
}

// Mostrar Productos Vistos Recientemente en Dashboard
function mostrarProductosVistos() {
    const productosVistos = JSON.parse(localStorage.getItem("productosVistos")) || [];
    const contenedor = document.getElementById("productosVistos");

    contenedor.innerHTML = productosVistos.length
        ? productosVistos.map(productoHTML).join('')
        : "<p>No has visto productos recientemente.</p>";
}

// Mostrar Productos Vistos Recientemente en cart
function mostrarProductosVistosCart() {
    const productosVistos = JSON.parse(localStorage.getItem("productosVistos")) || [];
    const contenedor = document.getElementById("productosVistosCart");

    contenedor.innerHTML = productosVistos.length
        ? productosVistos.map(productoHTML).join('')
        : "<p>No has visto productos recientemente.</p>";
}


// Cargar Categorías y Población del Menú Desplegable
function cargarCategorias() {
    verificarAutenticacion();

    const tienda = JSON.parse(localStorage.getItem("tienda"));
    const categorySelect = document.getElementById("categorySelect");

    if (!tienda.categorias.length) {
        alert("No hay categorías disponibles.");
        return;
    }

    // Agregar opciones al menú desplegable
    tienda.categorias.forEach(categoria => {
        const option = document.createElement("option");
        option.value = categoria.id;
        option.textContent = categoria.nombre;
        categorySelect.appendChild(option);
    });

    registrarCierreSesion();
}

// Mostrar productos relacionados a una categoría
function mostrarProductos(idCategoria) {
    const tienda = JSON.parse(localStorage.getItem("tienda"));
    const productosContainer = document.getElementById("productosContainer");

    const productos = tienda.productos.filter(p => p.id_categoria === idCategoria);
    productosContainer.innerHTML = productos.length
        ? productos.map(productoHTML).join('')
        : "<p>No hay productos disponibles en esta categoría.</p>";
}



// Mostrar Información de la Categoría Seleccionada
function mostrarCategoriaSeleccionada() {
    const tienda = JSON.parse(localStorage.getItem("tienda"));
    const categoriaId = parseInt(document.getElementById("categorySelect").value);

    const categoryInfo = document.getElementById("categoryInfo");
    const categoryName = document.getElementById("categoryName");
    const categoryDescription = document.getElementById("categoryDescription");
    const productosContainer = document.getElementById("productosContainer");

    if (isNaN(categoriaId) || categoriaId === 0) {
        categoryInfo.classList.add("hidden");
        productosContainer.innerHTML = "<p>Selecciona una categoría para ver productos.</p>";
        return;
    }

    const categoria = tienda.categorias.find(cat => cat.id === categoriaId);
    const productos = tienda.productos.filter(p => p.id_categoria === categoriaId);

    // Mostrar la información de la categoría
    categoryName.textContent = categoria.nombre;
    categoryDescription.textContent = categoria.descripcion;
    categoryInfo.classList.remove("hidden");

    // Mostrar productos asociados
    productosContainer.innerHTML = productos.length
        ? productos.map(productoHTML).join('')
        : "<p>No hay productos disponibles en esta categoría.</p>";
}


// Agregar producto al carrito
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


// Cargar la ficha del producto
function cargarProducto() {
    verificarAutenticacion();

    const params = new URLSearchParams(window.location.search);
    const idProducto = parseInt(params.get("id"));

    const tienda = JSON.parse(localStorage.getItem("tienda"));
    const producto = tienda.productos.find(p => p.id === idProducto);
    const productoDetalle = document.getElementById("productoDetalle");

    productoDetalle.innerHTML = producto
        ? productoDetalleHTML(producto)
        : "<p>Producto no encontrado.</p>";

    registrarCierreSesion();
}


// Redirigir a la Ficha del Producto y Registrar Producto Visto
function verProducto(idProducto) {
    registrarProductoVisto(idProducto);
    window.location.href = `./product.html?id=${idProducto}`;
}

// Registrar el Producto como Visto
function registrarProductoVisto(idProducto) {
    const tienda = JSON.parse(localStorage.getItem("tienda"));
    const producto = tienda.productos.find(p => p.id === idProducto);

    if (producto) {
        let productosVistos = JSON.parse(localStorage.getItem("productosVistos")) || [];

        // Evitar duplicados
        if (!productosVistos.find(p => p.id === idProducto)) {
            productosVistos.push(producto);
            if (productosVistos.length > 5) { // Limitar a 5 productos
                productosVistos.shift();
            }
        }
        localStorage.setItem("productosVistos", JSON.stringify(productosVistos));
    }
}

// Plantilla HTML para una tarjeta de producto
function productoHTML(producto) {
    return `
        <div class="producto" onclick="verProducto(${producto.id})">
            <img src="../assets/images/${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p><strong>Precio:</strong> $${producto.precio}</p>
        </div>
    `;
}

// Plantilla HTML para el detalle del producto
function productoDetalleHTML(producto) {
    return `
        <div class="producto-detalle-card">
            <img src="../assets/images/${producto.imagen}" alt="${producto.nombre}">
            <h2>${producto.nombre}</h2>
            <p><strong>Descripción:</strong> ${producto.descripcion}</p>
            <p><strong>Precio:</strong> $${producto.precio}</p>
            <p><strong>Stock Disponible:</strong> ${producto.stock}</p>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
        </div>
    `;
}


// Plantilla para Categoría
function categoriaHTML(categoria) {
    return `
        <div class="categoria" onclick="mostrarProductos(${categoria.id})">
            <h3>${categoria.nombre}</h3>
            <p>${categoria.descripcion}</p>
        </div>
    `;
}

