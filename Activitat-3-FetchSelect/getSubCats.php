<?php
$nameServer = "localhost";
$username = "root";
$password = "";
$database = "act3";
$conn = new mysqli($nameServer, $username, $password, $database);

if ($conn->connect_error) {
    die("No se ha podido conectar con la base de datos: ". $conn->connect_error);
}

if (isset($_POST['cat1'])) {
    $cat = $_POST['cat1'];
    $subCats = "SELECT * FROM subcategorias WHERE id_categoria = $cat";
    $response = $conn->query($subCats);
    $subCategorias = array();

    if ($response->num_rows>0) {
        while ($row = $response->fetch_assoc()) {
            $subCategoria = array(
                'id'=>$row['id'],
                'nombre'=>$row['nombre']
            );
            array_push($subCategorias, $subCategoria);
        }
    }
    echo json_encode($subCategorias);
} else {
    $sql = "SELECT * FROM categorias";
    $result = $conn->query($sql);
    $categorias = array();

    if ($result->num_rows > 0) {
        while ($row= $result->fetch_assoc()) {
            $categoria = array(
                'id'=>$row['id'],
                'nombre'=>$row['nombre']
            );
            array_push($categorias,$categoria);
        }
    }
    echo json_encode($categorias);
}

$conn->close();
?>