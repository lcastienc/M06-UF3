<?php
    if(isset($_GET['id']) && !empty($_GET['id'])) {
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "a5";

        $conn = new mysqli($servername, $username, $password, $dbname);
        
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $sql = $conn->prepare("DELETE FROM productes WHERE id = ?");
        $sql->bind_param("i", $_GET['id']); 
        $sql->execute();

        if ($sql->affected_rows > 0) {
            echo "Registro eliminado correctamente.";
        } else {
            echo "Error al intentar eliminar el registro.";
        }

        $sql->close();
        $conn->close();
    } else {
        echo "ID de producto no válido.";
    }

    header('Location: ex1List.php');
    exit();
?>
