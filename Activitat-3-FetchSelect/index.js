
document.addEventListener("DOMContentLoaded",function(){
    fetch("getSubCats.php")
    .then((response) => response.json())
    .then((data)=>{
        let cat1  = document.getElementById("cat1");
        cat1.innerHTML = "";
        // console.table(data)

        data.forEach(function(cat){
            let option = document.createElement("option");
            option.value = cat.id;
            option.text = cat.nombre;
            cat1.appendChild(option);
        });
        cat1.dispatchEvent(new Event("change"));
    })
    .catch((error)=>{
        console.log(error);
    })
})

document.getElementById("cat1").addEventListener("change",function(){
    let select = this.value;
    console.log(`Categoria seleccionada: ${select}`);

    let formData = new FormData();
    formData.append("cat1", select);

    let options = {
        method: 'POST',
        body: formData
    };

    fetch("getSubCats.php",options)
    .then((response)=>response.json())
    .then((data)=>{
        let cat2 = document.getElementById("cat2");
        cat2.innerHTML= "";
        console.table(data)
        if (data.length > 0) {
            data.forEach(function(element){
                let opt = document.createElement("option");
                opt.value = element.id;
                opt.text = element.nombre;
                // console.log(data)
                cat2.appendChild(opt);
            });
        } else {
            let opt = document.createElement("option");
            opt.text = "No tiene subcategorias";
        cat2.appendChild(opt);
        }
    })
    .catch((error)=>{
        console.log(error)
    })
})
