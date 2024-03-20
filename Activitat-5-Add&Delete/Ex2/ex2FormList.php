<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulari</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
</head>

<?php 

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "a5";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

//Eliminación
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['action'])&& $_POST['action']=='delete') {
    $id = $_POST['id'];
    $delete = "DELETE FROM productes WHERE id = $id";
    if ($conn->query($delete)===TRUE) {
        echo "Eliminación realizida exitosamente";
    }else{
        echo "La eliminación no se ha realizado: " . $conn->error;
    }
}

//Parte encargada de obtener los datos de la tabla productos
$sql = "SELECT * FROM productes";

$result = $conn->query($sql);

$array = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        array_push($array, array("id" =>$row["id"], "nom"=>$row["nom"]));            
    }
} else {
    echo "0 results";
}


$conn->close();
?>
<body class="container mt-5 w-80">
    <div class="row">
        <div class="col">
            <h2 class="mb-3">Formulari</h2>

            <form action="ex2AddEdit.php" method="POST">
                <div class="form-group mb-2">
                    <input type="text" class="form-control" id="nomProducte" name="nomProducte" placeholder="Nom" value="">
                </div>
                
                <input type="hidden" name="addEdit" id="addEdit" value="0"/>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form> 
        </div>
        <div class="col">
            <h2 class="mb-3">Llistat</h2>

            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nom</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Remove</th>
                    </tr>
                </thead>
                
                <tbody>
                    <?php
                        for($i=0; $i<sizeof($array); $i++){
                            echo '<tr>
                                        <th scope="row">' . $array[$i]["id"] . '</th>
                                        <td>' . $array[$i]["nom"] . '</td>
                                        <td><p idProd="' . $array[$i]["id"] . '" class="btnEdit btn btn-outline-info">Edit</p></td>
                                        <td><a idProd="' . $array[$i]["id"] . '" href="" class="btnRemove btn btn-outline-danger">Remove</a></td>
                                    </tr>';
                        }  
                    ?>
                </tbody>
            </table>
        </div>
    </div>


    <script>
        let btnEdit = document.querySelectorAll(".btnEdit");
        btnEdit.forEach(el=>{
            el.addEventListener("click", function(){

                let formData = new FormData();
                formData.append("id", this.getAttribute("idProd"));

                let options = {
                        method: 'POST',
                        body: formData
                    }

                fetch("getProducte.php", options)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    document.getElementById("nomProducte").value = data.nom;
                    document.getElementById("addEdit").value = data.addEdit;
                })
                .catch((error) => {});

            })
        })

        document.addEventListener("DOMContentLoaded", function() {
        let btnRemove = document.querySelectorAll(".btnRemove");
        btnRemove.forEach(el => {
            el.addEventListener("click", function(e) {
                e.preventDefault(); // Evitar el comportamiento predeterminado del enlace
                
                // Obtener el ID del producto que se va a eliminar
                let productId = this.getAttribute("idProd");
                
                // Crear un formulario y añadir los datos necesarios para la eliminación
                let formData = new FormData();
                formData.append("id", productId);
                formData.append("action", "delete");

                // Configurar la solicitud fetch para enviar los datos al archivo PHP
                let options = {
                    method: 'POST',
                    body: formData
                };

                // Realizar la solicitud fetch para eliminar el producto
                fetch(window.location.href, options)
                    .then(response => response.text())
                    .then(data => {
                        console.log(data); // Puedes manejar la respuesta del servidor aquí
                        // Recargar la página para reflejar los cambios
                        location.reload();
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            });
        });
    });

    </script>
</body>
</html>