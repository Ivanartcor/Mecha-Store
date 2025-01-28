<?php
//jwt.php
// Clave secreta para la firma del JWT
$secret = "clave_super_secreta";

// Función para generar un token JWT
function generateJWT($nombre, $email, $secret) {
    // Encabezado
    $header = base64_encode(json_encode([
        'alg' => 'HS256',
        'typ' => 'JWT'
    ]));

    // Carga útil
    $payload = base64_encode(json_encode([
        'nombre' => $nombre,
        'email' => $email,
        'iat' => time(),
        'exp' => time() + 3600 // Expira en 1 hora
    ]));

    // Firma
    $signature = hash_hmac('sha256', "$header.$payload", $secret, true);
    $signature = base64_encode($signature);

    return "$header.$payload.$signature";
}

// Función para verificar un token JWT
function verifyJWT($jwt, $secret) {
    list($header, $payload, $signature) = explode('.', $jwt);

    $validSignature = base64_encode(hash_hmac('sha256', "$header.$payload", $secret, true));

    if ($signature === $validSignature) {
        $decodedPayload = json_decode(base64_decode($payload), true);
        if ($decodedPayload['exp'] > time()) {
            return $decodedPayload; // Token válido
        } else {
            return "Token expirado.";
        }
    }
    return "Firma inválida.";
}
?>
