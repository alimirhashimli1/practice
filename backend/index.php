<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$method = $_SERVER['REQUEST_METHOD'];

if($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$users = [
   [ "id" => 1, "name" => "John Doe", "email" => "john@example.com" ],
   [ "id" => 2, "name" => "Jane Doe", "email" => "jane@example.com" ]
];

if($method === "GET") {
    echo json_encode($users);
} elseif($method === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    $newUser = ["id" => count($users) + 1, "name" => $data['name'], "email" => $data['email']];
    $users[] = $newUser;

    echo json_encode(["message" => "User added", "user" => $newUser]);
} else {
    http_response_code(405);
    echo json_encode(["message" => "Method not allowed"]);
}
?>
