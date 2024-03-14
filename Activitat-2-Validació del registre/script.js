//1. Fes que quan surtis del camp d’usuari es mostri l’input en verd o vermell en funció de si el camp està ple o buit
document.getElementById("username").addEventListener("focusout", function () {
    let userNom = document.getElementById("username");
    if (userNom.value.trim() === "") {
        userNom.style.backgroundColor = "red";
        console.log("El campo usuario esta vacio")
    } else {
        userNom.style.backgroundColor = "green";
    }
});

//2. Fes que quan surtis del camp del correu electrònic validi el correu
document.getElementById("gmail").addEventListener("focusout", function () {
    let txtEmail = document.getElementById("gmail");
    let gmail = txtEmail.value.trim();
    let validGmail = validateEmail(gmail);
    if (validGmail) {
        txtEmail.style.backgroundColor = "green";
    } else {
        txtEmail.style.backgroundColor = "red"
        console.log(`El Gmail ${gmail} no es valido`)
    }
});

function validateEmail(gmail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(gmail)) {
        return true;
    } else {
        return false;
    }
}

//3. Fes que a mida que vas escrivint dins el camp de la contrasenya vagi calculant si la contrasenya està bé o no.
document.getElementById("password").addEventListener("input", function () {
    let password = document.getElementById("password");
    let pass = password.value;
    let txtInfo = document.getElementById("passwordMessage");
    // console.log(pass)

    let longpass = pass.length >= 8 && pass.length <= 15;
    let lowCas = /[a-z]/.test(pass);
    let upCas = /[A-Z]/.test(pass);
    let num = /[0-9]/.test(pass);
    let specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(pass);

    let message = "";

    if (!longpass) {
        message += "La contrasena ha de tener entre 8 i 15 caràcters.\n";
    }
    if (!lowCas) {
        message += "La contraseña ha de tener una letra minuscula.\n";
    }
    if (!upCas) {
        message += "La contraseña ha de tener una letra mayuscula,\n";
    }
    if (!num) {
        message += "La contraseña ha de tener un numero.\n";
    }
    if (!specialChars) {
        message += "La contraseña ha de tener un caracter special.";
    }

    if (longpass && lowCas && upCas && num && specialChars) {
        password.style.backgroundColor = "green";
        txtInfo.innerText = "La contrasena ha de tener entre 8 i 15 caràcters.\n La contraseña ha de tener una letra minuscula.\nLa contraseña ha de tener una letra mayuscula,\nLa contraseña ha de tener un numero.\nLa contraseña ha de tener un caracter special.\n";
        txtInfo.style.color = "green"
    } else {
        password.style.backgroundColor = "red";
        txtInfo.innerText = message;
        txtInfo.style.color = "red"
    }

});

//4. Fes que el camp de confirmar la contrasenya es posi en verd si coincideix exactament amb el de la
//contrasenya. Fes que es posi en vermell sinó i mostra un missatge d’error.
document.getElementById("checkPassword").addEventListener("input", function(){
    let inputPass = document.getElementById("checkPassword");
    let passCheck = inputPass.value;
    let password = document.getElementById("password").value;

    if (passCheck === password && password !== "") {
        inputPass.style.backgroundColor = "green";
        console.log("Las contraseñas son iguales");
    } else {
        inputPass.style.backgroundColor = "red";
        console.log("Las contraseñas no son iguales");
    }
})

//5. Fes que el camp adreça postal sigui obligatori, i comprova que no estigui buid. En cas d’estar buid
//en el moment de l’enviament s’ha de mostrar un error
document.getElementById("postCode").addEventListener("focusout",function(){
    let inputPostCode = document.getElementById("postCode");
    let valPostCode = inputPostCode.value.trim();

    if (valPostCode === "") {
        alert("El codigo postal es obligatorio");
        inputPostCode.style.backgroundColor = "red";
    } else if (!/^\d+$/.test(valPostCode)) {
        alert("El codigo postal solo puede ser numerico");
        inputPostCode.style.backgroundColor = "red";

    }else{
        inputPostCode.style.backgroundColor = "green";
    }

} )


function validateForm() {
    
    let inputUserName = document.getElementById("username");
    let inputGmail = document.getElementById("gmail");
    let inputPass = document.getElementById("password");
    let inputCheckPass = document.getElementById("checkPassword");
    let inputPostCode = document.getElementById("postCode");
    
    if (inputUserName.value.trim() === "") {
        console.log("Es obligatorio poner un nombre de usuario")
    }
    let gmail = inputGmail.value.trim();
    if (!validateEmail(gmail)) {
        console.log("El gmail es obligatorio");
    }
    let pass =  inputPass.value;
    if (!(pass.length >= 8 && pass.length <= 15 && /[a-z]/.test(pass) && /[A-Z]/.test(pass) && /[0-9]/.test(pass) && /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(pass))) {
        
    }
    if (inputCheckPass !==pass ) {
        console.log("Las contraseñas no son las mismas")
    }
    if (inputPostCode.value.trim() === "") {
        console.log("El codigo postal es obligatorio")
    }

    return true;
}