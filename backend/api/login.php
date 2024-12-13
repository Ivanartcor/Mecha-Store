<?php
// Configuración de encabezados
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Incluir el archivo de JWT
require_once "jwt.php";

// Rutas de los datos
$data_file = "../data/usuarios.json";
$store_file = "../data/tienda.json";

// Verifico si el método de la solicitud es POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Leo y decodifico el JSON de usuarios
    $usuarios = json_decode(file_get_contents($data_file), true);
    $tienda = json_decode(file_get_contents($store_file), true);

    // Obtengo datos del POST
    $input =  json_decode(file_get_contents("php://input"), true);

    if (isset($input['email'], $input['password'])) {
        $email = $input['email'];
        $password = $input['password'];

        foreach ($usuarios['usuarios'] as $usuario) {
            if ($usuario['email'] === $email && $usuario['password'] === $password) {
                
                // Genero el token
                $token = generateJWT($usuario['nombre'], $usuario['email'], $secret);

                // Envío el token
                http_response_code(200);
                echo json_encode([
                    "status" => "success",
                    "message" => "Login exitoso",
                    "token" => $token,
                    "nombre" => $usuario['nombre'],
                    "email" => $usuario['email'],
                    "tienda" => $tienda //también envio información de la tienda en el token según directrices del ejercicio
                ]);
                exit;
            }
        }

        // Si no se encuentra el usuario o la contraseña no coincide
        http_response_code(401); // No autorizado
        echo json_encode([
            "status" => "error",
            "message" => "Credenciales incorrectas"
        ]);
    } else {
        http_response_code(400); // Solicitud mal formada
        echo json_encode([
            "status" => "error",
            "message" => "Faltan datos de email o contraseña"
        ]);
    }
} else {
    http_response_code(405); // Método no permitido
    echo json_encode([
        "status" => "error",
        "message" => "Método no permitido"
    ]);
}
?>
