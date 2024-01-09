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

    seleccionarAvatarEnemigo()
}
// funcion aleatoria para jugada del enemigo

function aleatoria(min,max){
    return Math.floor(Math.random()*(max - min + 1) + min )
}

function seleccionarAvatarEnemigo(){
    let ataqueAleatorio = aleatoria(1,6)
    let spanAvatarEnemigo = document.getElementById("avatar_enemigo")

    if (ataqueAleatorio == 1){
        spanAvatarEnemigo.innerHTML = "pez"
    }else if (ataqueAleatorio == 2 ){
        spanAvatarEnemigo.innerHTML = "arbol"
    }else if (ataqueAleatorio == 3 ){
        spanAvatarEnemigo.innerHTML = "fosforo"
    }else if (ataqueAleatorio == 4 ){
        spanAvatarEnemigo.innerHTML = "tiburon"
    }else if (ataqueAleatorio == 5 ){
        spanAvatarEnemigo.innerHTML = "tortuga"
    }else if (ataqueAleatorio == 6 ){
        spanAvatarEnemigo.innerHTML = "dragon"
    }  
}


//escucha los eventos desde el html 
window.addEventListener("load", iniciarJuego )