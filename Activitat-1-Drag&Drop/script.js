//1. Declarar una array buida on aniran tots els fitxers
let files = [];

//2. Declarar els objects que farem servir
const dropArea = document.querySelector('.drop-area');
const dragDropTex = document.querySelector('h2');
const button = document.querySelector('button');
const input = document.querySelector('#input-file');
const preview = document.querySelector('#preview');

//3. Invalidar l’acció per defecte del drag & drop
['dragover', 'dragleave', 'drop'].forEach(evt => {
    dropArea.addEventListener(evt, prevDefault);
});

function prevDefault(e) {
    e.preventDefault();
}

//4. Acció dragover
// Volem que en el moment d’arrossegar un fitxer al div aquest es modifiqui de la següent manera
dropArea.addEventListener('dragover', function () {
    dropArea.classList.add('active');
    // console.log('hola,dentro del div drag')
    dragDropTex.textContent = 'Drop to upload files';
});

//5. Acció dragleave
dropArea.addEventListener('dragleave', function () {
    dropArea.classList.remove('activate');
    // console.log('adios, fuera del div drag');
    dragDropTex.textContent = 'Drag & Drop files';
});

//6. Acció drop
dropArea.addEventListener('drop', (event) => {
    files = files.concat(Array.from(event.dataTransfer.files));
    showFiles();
    dropArea.classList.remove('active');
    dragDropTex.textContent = 'Drag & Drop files';
});

//7. Funció showFiles
function showFiles() {
    preview.innerHTML = '';
    if (files.length > 0) {
        files.forEach((file, index) => {
            processFile(file, index);
        });
        // console.log(files);
    }
}

//8. Funció processFile(file, index)
function processFile(file, index) {
    const validExtensions = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    const docType = file.type;
    if (!validExtensions.includes(docType)) {
        files.splice(index, 1);
        // console.log('formato de archivo no permitido')
        return;
    }

    let reader = new FileReader();

    //Modo 1
    // reader.addEventListener('load',function(){
    //     let fileurL = reader.result;
    //     let prev = `<div class="previewImage">
    // <img src="${fileurL}"/>
    // <span>${file.name}</span>
    // <span onclick="remove(${index})" class="material-symbols-outlined
    // removeBtn">c</span>
    // </div>`;
    // preview.innerHTML += prev;
    // });

    //Modo 2
    reader.onload = function () {
        let fileurL = reader.result;
        let prev = `<div class="previewImage">
                    <img src="${fileurL}"/>
                    <span>${file.name}</span>
                    <span onclick="remove(${index})" class="material-symbols-outlined removeBtn">c</span>
                </div>`;
        preview.innerHTML += prev;
    };

    reader.readAsDataURL(file);
}

//9. Funció removeBtn(i)
function remove(index) {
    files.splice(index, 1);
    showFiles();
}

//10.Click al botó Upload Files
button.addEventListener("click", function (e) {
    e.preventDefault();
    input.click();
});

//11. Gestiona els arxius seleccionats
input.addEventListener("change", function () {
    files = files.concat(Array.from(input.files));
    showFiles();
});


// Captura l'esdeveniment de l'enviament del formulari
const form = document.querySelector('form');
form.addEventListener("submit", function(e) {
    e.preventDefault();

    // Crea un nou objecte DataTransfer per emmagatzemar els arxius
    const dataTransfer = new DataTransfer();

    // Afegeix els arxius a l'objecte DataTransfer
    files.forEach(file => {
        dataTransfer.items.add(file);
    });

    // Assigna els arxius de l'objecte DataTransfer a l'input file
    input.files = dataTransfer.files;

    // Envia el formulari al servidor PHP
    form.submit();
});