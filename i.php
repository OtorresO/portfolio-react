<?php

require __DIR__ . '/vendor/autoload.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

// Manejar solicitudes OPTIONS
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}
use Dotenv\Dotenv;
$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();
$data = json_decode(file_get_contents("php://input"), true);
$htmlContent = file_get_contents('./templates/email.html');

if (!$data) {
    http_response_code(400); // Bad Request
    echo json_encode(array("message" => "No se recibieron datos válidos"));
    exit();
}

if (empty($data['nombres']) || empty($data['correo']) || empty($data['mensaje'])) {
    http_response_code(400); // Bad Request
    echo json_encode(array("message" => "Datos incompletos"));
    exit();
}

$nombre = $data['nombres'];
$correo = $data['correo'];
$mensaje = $data['mensaje'];
$htmlContent = str_replace('{{nombre}}', htmlspecialchars($nombre), $htmlContent);
$htmlContent = str_replace('{{correo}}', htmlspecialchars($correo), $htmlContent);
$htmlContent = str_replace('{{mensaje}}', nl2br(htmlspecialchars($mensaje)), $htmlContent);
try {
    $resend = Resend::client($_ENV['API_KEY_SEND_EMAIL']);
    
    $result = $resend->emails->send([
        'from' => 'Acme <onboarding@resend.dev>',
        'to' => ['asantic59@gmail.com'],
        'subject' => 'Posible contratador o cliente desde pagina Web anticdev.com',
        'html' => $htmlContent,
    ]);
    $response = array(
    "receivedData" => $data,
    "message" => "Datos recibidos correctamente");
	http_response_code(200);
	echo json_encode(array("message" => "Mensaje Enviado"));
    exit();


} catch (\Exception $e) {
	http_response_code(500);
    echo json_encode(array("message" => $e->getMessage()));
    exit();

}
