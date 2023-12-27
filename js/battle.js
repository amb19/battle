//funcion que se carga una vez que carga el html
function iniciarJuego(){
    let botonAvatar = document.getElementById("boton-avatar")
botonAvatar.addEventListener("click", seleccionarAvatar)
}

// se crea la variables con los avatares
function seleccionarAvatar(){
    let inputpez = document.getElementById("pez")
    let inputarbol = document.getElementById("arbol")
    let inputfosforo = document.getElementById("fosforo")
    let inputtiburon = document.getElementById("tiburon")
    let inputtortuga = document.getElementById("tortuga")
    let inputdragon = document.getElementById("dragon")
    let spanAvatarJugador = document.getElementById("avatar_jugador")

// alertas segun la seleccion del avatar    
    if (inputpez.checked) {
        spanAvatarJugador.innerHTML = "pez"
    }else if (inputarbol.checked) {
        spanAvatarJugador.innerHTML = "arbol"
    }else if (inputfosforo.checked){
        spanAvatarJugador.innerHTML = "fosforo"
    }else if (inputtiburon.checked){
        spanAvatarJugador.innerHTML = "tiburon"
    }else if (inputtortuga.checked){
        spanAvatarJugador.innerHTML = "tortuga"
    }else if (inputdragon.checked){
        spanAvatarJugador.innerHTML = "dragon"
    }else{
        alert ("selecciona un avatar")
    }
}

//manupulando el DOM

//escucha los eventos desde el html 
window.addEventListener("load", iniciarJuego )