<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "culturasmdelosandes";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Consultar contactos
$sql = "SELECT * FROM usuarios";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $contactos = array();

    while ($row = $result->fetch_assoc()) {
        $contacto = array(
            'id' => $row['id'],
            'nombre' => $row['nombre'],
            'apellido' => $row['apellido'],
            'email' => $row['email'],
            'genero' => $row['genero'],
            'pais' => $row['pais'],
            'comentario' => $row['comentario']
        );
        $contactos[] = $contacto;
    }

    header('Content-Type: application/json');
    echo json_encode($contactos);
} else {
    echo "0 resultados";
}

$conn->close();
?>
