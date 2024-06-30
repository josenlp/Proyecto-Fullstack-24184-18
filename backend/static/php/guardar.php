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

// Recibir datos del formulario
$nombre = $_POST['nombre'];
$apellido = $_POST['apellido'];
$email = $_POST['email'];
$genero = $_POST['genero'];
$pais = $_POST['pais'];
$comentario = $_POST['comentario'];

// Insertar datos en la base de datos
$sql = "INSERT INTO usuarios (nombre, apellido, email, genero, pais, comentario)
        VALUES ('$nombre', '$apellido', '$email', '$genero', '$pais', '$comentario')";

if ($conn->query($sql) === TRUE) {
    echo "Datos guardados correctamente";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Cerrar conexión
$conn->close();
?>
