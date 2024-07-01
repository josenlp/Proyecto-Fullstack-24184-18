<?php
// para el post en la base de datos desde el formlario
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

// Recibe los datos del formulario
$nombre = $_POST['nombre'];
$apellido = $_POST['apellido'];
$email = $_POST['email'];
$genero = $_POST['genero'];
$pais = $_POST['pais'];
$comentario = $_POST['comentario'];

// post de los datos en la base de datos
$sql = "INSERT INTO usuarios (nombre, apellido, email, genero, pais, comentario)
        VALUES ('$nombre', '$apellido', '$email', '$genero', '$pais', '$comentario')";

if ($conn->query($sql) === TRUE) {
    echo "Datos guardados correctamente";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Cierra la conexión
$conn->close();
?>
