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
    if (producto) {
        document.getElementById("productoDetalle").innerHTML = productoDetalleHTML(producto);
        mostrarDescripcion(producto);
        mostrarCaracteristicas(producto);
    } else {
        document.getElementById("productoDetalle").innerHTML = "<p>Producto no encontrado.</p>";
    }
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



function mostrarTab(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    const buttons = document.querySelectorAll('.tab-link');

    tabs.forEach(tab => tab.classList.remove('active'));
    buttons.forEach(btn => btn.classList.remove('active'));

    document.getElementById(tabId).classList.add('active');
    document.querySelector(`.tab-link[onclick="mostrarTab('${tabId}')"]`).classList.add('active');
}

function mostrarDescripcion(producto) {
    document.getElementById("descripcion").innerHTML = `<p class="descripcion-larga">${producto.descripcion_larga}</p>`;
}

function mostrarCaracteristicas(producto) {
    const caracteristicas = Object.entries(producto.caracteristicas)
        .map(([clave, valor]) => `<p><strong>${clave}:</strong> ${valor}</p>`)
        .join('');
    document.getElementById("caracteristicas").innerHTML = caracteristicas;
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
            <img src="${imagenProducto}" alt="${producto.nombre}" onerror="this.src='../assets/images/default-product.jpg'">
            <h3>${producto.nombre}</h3>
            <p><strong>Precio:</strong> $${producto.precio.toFixed(2)}</p>
            <div class="acciones-producto" onclick="event.stopPropagation();">
                ${botonCarrito}
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



// Plantilla para Categoría
function categoriaHTML(categoria) {
    return `
        <div class="categoria" onclick="mostrarProductos(${categoria.id})">
            <h3>${categoria.nombre}</h3>
            <p>${categoria.descripcion}</p>
        </div>
    `;
}

