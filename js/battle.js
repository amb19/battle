function iniciarJuego(){
    let botonAvatar = document.getElementById("boton-avatar")
botonAvatar.addEventListener("click", seleccionarAvatar)
}

function seleccionarAvatar(){
    let inputpez = document.getElementById("pez")
    let inputarbol = document.getElementById("arbol")
    let inputfosforo = document.getElementById("fosforo")
    let inputtiburon = document.getElementById("tiburon")
    let inputtortuga = document.getElementById("tortuga")
    let inputdragon = document.getElementById("dragon")

    if (inputpez.checked) {
        alert("seleccionaste pez")
    }else if (inputarbol.checked) {
        alert ("seleccionaste arbol")
    }else if (inputfosforo.checked){
        alert ("seleccionaste fosforo")
    }else if (inputtiburon.checked){
        alert ("seleccionaste tiburon")
    }else if (inputtortuga.checked){
        alert ("seleccionaste tortuga")
    }else if (inputdragon.checked){
        alert ("seleccionaste dragon")
    }else{
        alert ("selecciona un avatar")
    }
}


window.addEventListener("load", iniciarJuego )