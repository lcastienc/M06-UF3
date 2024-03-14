<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recoge los datos del formulario
    $username = $_POST["username"];
    $email = $_POST["gmail"];
    $password = $_POST["password"];
    $confirmPassword = $_POST["checkPassword"];
    $postalAddress = $_POST["postCode"];

    echo "Nombre de usuario: $username <br>";
    echo "Gmail: $email <br>";
    echo "Contraseña: $password <br>";
    echo "Contraseña confirmada: $confirmPassword <br>";
    echo "Codigo Postal: $postalAddress <br>";

    $errors = array();

    if (empty($username)) {
        $errors[] = "El campo de usuario es obligatorio.";
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "El correo electrónico no es válido.";
    }

    if (strlen($password) < 8 || strlen($password) > 15 ||
        !preg_match("/[a-z]/", $password) ||
        !preg_match("/[A-Z]/", $password) ||
        !preg_match("/[0-9]/", $password) ||
        !preg_match("/[`!@#$%^&*()_+\-=\[\]{};':\"\\|,.<>\/?~]/", $password)) {
        $errors[] = "La contraseña no cumple los requisitos.";
    }

    if ($confirmPassword !== $password) {
        $errors[] = "Las contraseñas no coinciden.";
    }

    if (empty($postalAddress)) {
        $errors[] = "El campo de dirección postal es obligatorio.";
    }


    if (empty($errors)) {

        echo "Formulario enviado correctamente.";
    } else {
        foreach ($errors as $error) {
            echo $error . "<br>";
        }
    }

}
?>
