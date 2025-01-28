# Mecha Store

## **1. Introducción**

**Mecha Store** es una tienda online ficticia diseñada para ofrecer mechas de combate, armas especializadas, módulos de defensa y otros componentes avanzados. Este proyecto combina un frontend interactivo y dinámico con un backend funcional basado en API REST. La tienda se centra en proporcionar una experiencia de usuario fluida, con diseño responsivo, funcionalidades de carrito de compras y autenticación segura mediante tokens JWT.

El propósito del proyecto es mostrar el desarrollo de una aplicación web completa que utiliza **HTML**, **CSS**, **JavaScript** y **PHP**, junto con conceptos avanzados como autenticación, validación de datos y comunicación cliente-servidor. **Mecha Store** permite explorar una amplia gama de productos organizados por categorías, administrar un carrito de compras y realizar simulaciones de compras con validaciones en tiempo real.

---

## **2. Características Principales**

### **Frontend**
- **Interfaz moderna y visualmente atractiva**:
  - Diseño inspirado en la temática de ciencia ficción y mechas.
- **Gestión de productos**:
  - Visualización de productos destacados.
  - Organización por categorías.
  - Funcionalidad para registrar productos vistos recientemente.
- **Carrito de compras interactivo**:
  - Agregar, eliminar y actualizar cantidades de productos.
  - Visualización de subtotal y total en tiempo real.
- **Autenticación de usuarios**:
  - Página de inicio de sesión con validación.
  - Persistencia de sesión mediante LocalStorage.
- **Diseño responsivo**:
  - Compatible con dispositivos móviles, tabletas y computadoras.

### **Backend**
- **API REST**:
  - Desarrollo de endpoints funcionales para gestionar autenticación, productos y compras.
- **Autenticación segura**:
  - Uso de JWT (JSON Web Tokens) para validar usuarios.
  - Tokens con tiempo de expiración para mayor seguridad.
- **Validación de datos**:
  - Confirmación de precios y stock antes de completar una compra.
  - Gestión de errores claros en respuestas JSON.
- **Persistencia de datos**:
  - Archivos JSON para almacenar información de usuarios, productos y tienda.

### **Funcionalidades Generales**
- Diseño modular del frontend, con manejo centralizado de eventos.
- Backend que implementa principios de seguridad y validación.
- Simulación completa de compra con validaciones en cliente y servidor.

---

## **3. Tecnologías Utilizadas**

### **Frontend**
- **HTML**: Estructura principal de las páginas web.
- **CSS**: Estilización avanzada mediante hojas de estilo organizadas:
  - Estilos para cada sección de la tienda: login, categorías, productos, carrito.
  - Uso de diseños modernos como gradientes, sombras y transiciones.
- **JavaScript**: Lógica del cliente:
  - Modularización en archivos separados (eventos, utilidades).
  - Manejo de la interacción con el DOM y almacenamiento local.
- **LocalStorage**: Almacenamiento de datos temporales del usuario (sesión, carrito, productos vistos).

### **Backend**
- **PHP**: Desarrollo de la API REST para manejar datos, autenticación y compras.
- **JWT**: Seguridad mediante autenticación basada en tokens.
- **JSON**: Almacenamiento de datos de usuarios, productos y tienda.
- **Fetch API**: Comunicación cliente-servidor mediante solicitudes HTTP.

---

## **4. Diseño y Experiencia de Usuario**

- **Temática**: Inspirada en ciencia ficción y mechas.
- **Responsividad**:
  - Compatible con dispositivos móviles y pantallas grandes.
- **Accesibilidad**:
  - Diseño centrado en una experiencia visual inmersiva.
  - Contraste de colores optimizado y tipografía clara para mejorar la legibilidad.


## **4. Arquitectura del Proyecto**

La estructura del proyecto se divide en dos componentes principales: el **frontend** y el **backend**, organizados de forma lógica para separar las responsabilidades y garantizar un flujo claro entre las capas de cliente y servidor.

### **4.1. Frontend**
Ubicado en la carpeta `frontend`, el frontend utiliza **HTML**, **CSS** y **JavaScript** para gestionar la interfaz de usuario y las interacciones. Está dividido en:

- **`assets/`**: Contiene recursos multimedia.
  - **`icons/`**: Íconos usados en la interfaz, como navegación y botones.
  - **`images/`**: Fondos e imágenes genéricas para productos.
  - **`videos/`**: Videos utilizados para mejorar la experiencia visual.
- **`css/`**: Archivos de estilo organizados por secciones.
  - Ejemplo: `login.css`, `categories.css`, `cart.css`.
- **`js/`**:
  - **`events/`**: Manejo de lógica y eventos específicos como autenticación, carrito, categorías y productos.
  - **`utils/`**: Funciones utilitarias como almacenamiento, interacción con la API y manipulación del DOM.
  - Archivos principales para páginas específicas (`auth.js`, `dashboard.js`,`cart.js`,`cstegories.js`,`products.js`,`header.js`).
- **`pages/`**: Contiene las páginas HTML principales.
  - `login.html`: Página de acceso.
  - `dashboard.html`: Página principal con productos destacados y recientes.
  - `categories.html`: Visualización por categorías.
  - `cart.html`: Carrito de compras.
  - `product.html`: Página de detalles de productos.

### **4.2. Backend**
Ubicado en la carpeta `backend`, el backend utiliza **PHP** para gestionar la API REST. Está organizado en:

- **`api/`**:
  - `login.php`: Autenticación y generación de tokens JWT.
  - `carrito.php`: Validación y simulación de la compra.
  - `jwt.php`: Generación y validación de tokens JWT.
- **`data/`**:
  - `usuarios.json`: Información de usuarios para autenticación.
  - `tienda.json`: Datos de categorías y productos.
  - **`images/`**: Imágenes de productos.

### **4.3. Flujo de Datos**
- **Inicio de sesión**:
  1. El usuario envía credenciales al endpoint `login.php`.
  2. Si las credenciales son correctas, se devuelve un token JWT y datos del usuario.
  3. El frontend almacena estos datos en LocalStorage.
- **Carga de productos**:
  - El frontend utiliza datos de `tienda.json` cargados al inicio de sesión.
- **Carrito de compras**:
  1. Los productos se agregan, eliminan o actualizan en el carrito utilizando LocalStorage.
  2. Al finalizar la compra, los datos se envían al endpoint `carrito.php` para validación.
- **Navegación por web**:
  Cada vez que se cambia de página, se verifica el token.
  
---

### **4.3. Previsualización**

login.
![image](https://github.com/user-attachments/assets/b0d87401-b8e5-4159-82f0-cc996d25faa0)

dashboard.
![image](https://github.com/user-attachments/assets/fd9a538a-2be3-4766-989e-42db95d97381)

product.
![image](https://github.com/user-attachments/assets/d566078c-1d4e-4011-9fb0-657490491202)

categories.
![image](https://github.com/user-attachments/assets/63c517b6-0e89-4e4c-8f50-7f48e91c24c3)

cart.
![image](https://github.com/user-attachments/assets/0e6927aa-5c15-45d3-ae31-ee462f7ff3f3)



## **5. Flujo de Trabajo**

El proyecto fue desarrollado siguiendo buenas prácticas de programación, dividiendo las tareas en fases claras para mantener un desarrollo modular y escalable.

### **5.1. Fases del Proyecto**
1. **Diseño inicial**:
   - Creación del diseño temático inspirado en ciencia ficción.
   - Estructuración básica de las páginas HTML y los estilos CSS.
2. **Desarrollo del backend**:
   - Implementación de la API REST para autenticación y gestión de compras.
   - Validación de datos mediante JWT y verificación de productos.
3. **Interacción del frontend**:
   - Conexión entre el frontend y el backend utilizando la Fetch API.
   - Desarrollo modular de eventos para manejo de productos y carrito.
4. **Pruebas y depuración**:
   - Pruebas funcionales de todas las páginas y acciones del usuario.
   - Validación de errores en autenticación, carrito y compras.
5. **Optimización**:
   - Mejoras en la responsividad del diseño.
   - Optimización y refactorización del código JavaScript y CSS.

### **5.2. Herramientas utilizadas**

  - **Visual Studio Code**: Editor de código.
  - **Postman**: Pruebas de endpoints.
  - **Google Chrome**: Depuración del frontend.
  - **Git**: Control de versiones.

---

## **6. Funcionalidades Implementadas**

### **6.1. Frontend**
- **Autenticación**:
  - Inicio de sesión mediante email y contraseña.
  - Validación de usuario utilizando tokens JWT.
  - Persistencia de sesión con LocalStorage.
- **Productos y Categorías**:
  - Visualización de productos destacados en el dashboard.
  - Registro de productos vistos recientemente.
  - Navegación y filtrado por categorías.
- **Carrito de compras**:
  - Agregar, eliminar y actualizar cantidades de productos.
  - Visualización de subtotal y total en tiempo real.
- **Páginas interactivas**:
  - Uso de animaciones y transiciones para mejorar la experiencia del usuario.
- **Diseño responsivo**:
  - Interfaz adaptable a diferentes tamaños de pantalla.

### **6.2. Backend**
- **Endpoints principales**:
  - `login.php`: Autenticación y generación de tokens JWT.
  - `carrito.php`: Validación y simulación de compras.
- **Validaciones robustas**:
  - Verificación de precios y stock antes de confirmar una compra.
  - Respuestas claras con mensajes de error detallados.
- **Seguridad**:
  - Uso de JWT con tiempo de expiración.
  - Protección de rutas del backend mediante validación de tokens.


## **8. Pruebas Realizadas**

Se realizaron pruebas exhaustivas para garantizar la funcionalidad, estabilidad y usabilidad del sistema. A continuación, se detalla el proceso de pruebas:

### **8.1. Pruebas Funcionales**
#### **Autenticación:**
- **Caso exitoso:**
  - Usuario con credenciales correctas recibe un token JWT y accede al dashboard.
- **Caso fallido:**
  - Usuario con credenciales incorrectas ve un mensaje de error apropiado.
  - Intentos sin email o contraseña muestran mensajes de validación.

#### **Carga de Productos y Categorías:**
- Visualización correcta de categorías y productos desde el archivo `tienda.json`.
- Filtrado funcional al seleccionar categorías.
- Los productos destacados se muestran correctamente en el dashboard.

#### **Carrito de Compras:**
- **Agregar productos:**
  - Productos se añaden al carrito, actualizando las cantidades si ya existen.
  - Validación de límites de stock.
- **Eliminar productos:**
  - Productos se eliminan correctamente del carrito.
- **Actualizar cantidades:**
  - Cambios en las cantidades reflejan el subtotal y total correctamente.
- **Finalizar compra:**
  - Carrito validado contra el backend para verificar precios y stock.
  - Mensajes claros en caso de éxito o error.

#### **Visualización de Productos:**
- Visualización detallada del producto con descripción, características e imagen.
- Registro funcional de productos vistos recientemente.

### **8.2. Pruebas de Backend**
#### **Autenticación:**
- Tokens generados correctamente con tiempo de expiración.
- Verificación de tokens válida y robusta.

#### **Gestión del Carrito:**
- Validación de precios y stock en `carrito.php` con respuestas claras.
- Manejo adecuado de errores: productos no encontrados, stock insuficiente, etc.

#### **Respuesta de Endpoints:**
- `login.php` y `carrito.php` probados con datos válidos e inválidos mediante Postman.
- Respuestas con códigos HTTP apropiados (`200`, `400`, `401`, `405`).

### **8.3. Pruebas de Interfaz de Usuario**
#### **Diseño responsivo:**
- Pruebas en distintos tamaños de pantalla (desktop, tablet, móvil).

#### **Interactividad:**
- Validación de efectos visuales (hover, transiciones, animaciones).

#### **Accesibilidad:**
- Contraste de colores optimizado.
- Elementos interactivos accesibles con teclado.

---

## **9. Conclusiones**

El proyecto logró cumplir con los objetivos planteados, proporcionando una tienda online funcional, interactiva y escalable. Se destacan los siguientes puntos:

### **9.1. Logros**
#### **Integración Completa:**
- Comunicación efectiva entre frontend y backend mediante una API REST.
- Uso de JWT para garantizar seguridad en la autenticación y validación de acciones.

#### **Diseño Temático:**
- La interfaz refleja una estética consistente de ciencia ficción y mechas, mejorando la experiencia del usuario.

#### **Funcionalidades Clave:**
- Gestión eficiente del carrito de compras.
- Filtrado y visualización de productos por categorías.
- Experiencia personalizada con productos destacados y recientes.

#### **Seguridad y Validación:**
- Validación robusta de datos en el backend para evitar inconsistencias en precios y stock.
- Protección mediante tokens JWT.

### **9.2. Retos y Soluciones**
#### **Sincronización de Frontend y Backend:**
- **Reto:** Asegurar que los datos entre cliente y servidor sean consistentes.
- **Solución:** Implementación de validaciones exhaustivas en el backend antes de procesar las compras.

#### **Diseño Responsivo:**
- **Reto:** Adaptar la interfaz a diferentes tamaños de pantalla.
- **Solución:** Uso de CSS flexible con grid y flexbox.

#### **Carga de Recursos:**
- **Reto:** Optimizar la carga de imágenes y videos en el frontend.
- **Solución:** Uso de imágenes de tamaño adecuado y carga diferida donde fue posible.

---



## **Iván Arteaga Cordero**



