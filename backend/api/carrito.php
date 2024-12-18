<?php
// Configuración de encabezados
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Incluir el archivo de JWT
require_once "jwt.php";

// Ruta del archivo JSON de la tienda
$data_file = "../data/tienda.json";

// Leer el archivo JSON de productos
$productos_data = json_decode(file_get_contents($data_file), true);

// Obtener el token del encabezado Authorization
$headers = getallheaders();
$authHeader = isset($headers['Authorization']) ? $headers['Authorization'] : '';

// Verificar que se proporcionó el token
if (!$authHeader) {
    http_response_code(401);
    echo json_encode([
        "status" => "error",
        "message" => "Token no proporcionado"
    ]);
    exit;
}

// Extraer el token de la cabecera
$jwt = str_replace('Bearer ', '', $authHeader);

// Verificar el token
$verification = verifyJWT($jwt, $secret);
if (!is_array($verification)) {
    http_response_code(401);
    echo json_encode([
        "status" => "error",
        "message" => "Token inválido o expirado"
    ]);
    exit;
}

// Verificar que se envió un cuerpo POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents("php://input"), true);

    if (!isset($input['carrito']) || !is_array($input['carrito'])) {
        http_response_code(400); // Solicitud mal formada
        echo json_encode([
            "status" => "error",
            "message" => "Datos del carrito faltantes o inválidos"
        ]);
        exit;
    }

    // Validar productos y precios
    $errores = [];
    foreach ($input['carrito'] as $producto_enviado) {
        $producto_original = null;

        // Buscar el producto original
        foreach ($productos_data['productos'] as $producto) {
            if ($producto['id'] == $producto_enviado['id']) {
                $producto_original = $producto;
                break;
            }
        }

        // Validar el producto
        if (!$producto_original) {
            $errores[] = "Producto ID {$producto_enviado['id']} no encontrado";
            continue;
        }

        if ($producto_enviado['precio'] != $producto_original['precio']) {
            $errores[] = "El precio del producto '{$producto_original['nombre']}' es incorrecto";
        }

        if ($producto_enviado['cantidad'] > $producto_original['stock']) {
            $errores[] = "Stock insuficiente para '{$producto_original['nombre']}'";
        }
    }

    // Comprobar si hubo errores
    if (!empty($errores)) {
        http_response_code(400); // Solicitud mal formada
        echo json_encode([
            "status" => "error",
            "message" => "Errores en la validación del carrito",
            "errores" => $errores
        ]);
        exit;
    }

    // Compra exitosa
    http_response_code(200); // Todo correcto
    echo json_encode([
        "status" => "success",
        "message" => "Compra validada correctamente"
    ]);
    exit;
} else {
    http_response_code(405); // Método no permitido
    echo json_encode([
        "status" => "error",
        "message" => "Método no permitido"
    ]);
}
?>
