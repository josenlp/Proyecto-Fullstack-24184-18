
<?php
// variables para una base de datos en MySql
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "culturasmdelosandes";

// Crea la conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// realiza la consulta
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
// cierra la conexión
$conn->close();
?>
