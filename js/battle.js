//variable global
let ataqueJugador
let ataqueEnemigo
let vidasAvatar = 3
let vidasEnemigo = 3


//funcion que se carga una vez que carga el html
function iniciarJuego(){
    let sectionSeleccionarAtaque = document.getElementById("seleccionar_ataque") // para ocultar la parte de los ataques al principio del juego 
    sectionSeleccionarAtaque.style.display = 'none'

    let sectionReiniciar = document.getElementById("reiniciar") // para habilitar la limpieza del html. 
    sectionReiniciar.style.display = 'none'

    let botonAvatar = document.getElementById("boton-avatar")
    botonAvatar.addEventListener("click", seleccionarAvatar)

    let botonFuego = document.getElementById("boton-fuego")
    botonFuego.addEventListener('click',ataqueFuego)
    let botonAgua = document.getElementById("boton-agua")
    botonAgua.addEventListener('click',ataqueAgua)
    let botonTierra = document.getElementById("boton-tierra")
    botonTierra.addEventListener('click',ataqueTierra)

    let botonReiniar = document.getElementById('boton-reiniciar')
    botonReiniar.addEventListener('click', reiniciarJuego)

}
// se crea la variables con los avatares y se selecciona 
function seleccionarAvatar(){
    let sectionSeleccionarAvatar = document.getElementById("seleccionar_avatar")
    sectionSeleccionarAvatar.style.display = 'none'

    let sectionSeleccionarAtaque = document.getElementById("seleccionar_ataque")
    sectionSeleccionarAtaque.style.display = 'flex'

    let inputtiburon = document.getElementById("tiburon")
    let inputarbol = document.getElementById("arbol")
    let inputdragon = document.getElementById("dragon")
    let spanAvatarJugador = document.getElementById("avatar_jugador")

// alertas segun la seleccion del avatar    
    if (inputtiburon.checked) {
        spanAvatarJugador.innerHTML = "tiburon"
    }else if (inputarbol.checked) {
        spanAvatarJugador.innerHTML = "arbol"
    }else if (inputdragon.checked){
        spanAvatarJugador.innerHTML = "dragon"
    }else{
        alert ("selecciona un avatar")
        let sectionSeleccionarAvatar = document.getElementById("seleccionar_avatar")
    }

    seleccionarAvatarEnemigo()
}
// seleccionar avatar enemigo
function seleccionarAvatarEnemigo(){
    let mascotaAleatorio = aleatoria(1,3)
    let spanAvatarEnemigo = document.getElementById("avatar_enemigo")

    if (mascotaAleatorio == 1){
        spanAvatarEnemigo.innerHTML = "tiburon"
    }else if (mascotaAleatorio == 2 ){
        spanAvatarEnemigo.innerHTML = "arbol"
    }else if (mascotaAleatorio == 3 ){
        spanAvatarEnemigo.innerHTML = "dragon"
    }  
}
//fuciones de ataques
function ataqueFuego(){
    ataqueJugador = 'Fuego'
    ataqueAleatorioEnemigo() 
}
function ataqueAgua(){
    ataqueJugador = 'Agua'
    ataqueAleatorioEnemigo() 
}
function ataqueTierra(){
    ataqueJugador = 'Tierra'
    ataqueAleatorioEnemigo()
}
function ataqueAleatorioEnemigo(){
    let ataqueAleatorio = aleatoria(1,3)
    if (ataqueAleatorio == 1){
        ataqueEnemigo = 'Fuego'
    }else if(ataqueAleatorio == 2){
        ataqueEnemigo = 'Agua'
    }else {(ataqueAleatorio == 3)
        ataqueEnemigo = 'Tierra'
    }

    combate()
}
// combate
function combate(){ 
    let spanVidasAvatar = document.getElementById('vidas-avatar')
    let spanVidasEnemigo = document.getElementById('vidas-enemigo')

    if (ataqueEnemigo == ataqueJugador){
        crearMensaje("Empate 🤝")
    } else if ( ataqueJugador == 'Fuego' && ataqueEnemigo == 'Tierra' ){
        crearMensaje("Ganaste 🏆")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else if (ataqueJugador == 'Agua' && ataqueEnemigo == 'Fuego'){
        crearMensaje("Ganaste 🏆")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else if (ataqueJugador == 'Tierra' && ataqueEnemigo == 'Agua'){
        crearMensaje("Ganaste 🏆")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else {
        crearMensaje("Perdiste 💣")
        vidasAvatar--
        spanVidasAvatar.innerHTML = vidasAvatar
    }
   // revisar las vidas
    revisarvidas()
}
// funcion para validar las vidas. 
function revisarvidas() {
    if(vidasEnemigo == 0){
        mensajeFinal("FELICITACIONES ! GANASTE ! 🏆")
    }else if(vidasAvatar == 0){
        mensajeFinal("OH LO SIENTO, PERDISTE 😭")
    }
}
// funcion mensaje
function crearMensaje(resultado){
    let sectionMensajes = document.getElementById('resultado')
    let ataqueJugador = document.getElementById('ataque-jugador')
    let ataqueEnemigo = document.getElementById('ataque-enemigo')

    let nuevoataqueJugador = document.createElement('p')
    let nuevoataqueEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoataqueJugador.innerHTML = ataqueJugador
    nuevoataqueEnemigo.innerHTML = ataqueEnemigo
    
    ataqueJugador.appendChild(nuevoataqueJugador)
    ataqueEnemigo.appendChild(nuevoataqueEnemigo)
}
// funcion mensaje final
function mensajeFinal(resultadoFinal){
    let sectionMensajes = document.getElementById('resultado')

    
    sectionMensajes.innerHTML = resultadoFinal

    

    let botonAvatar = document.getElementById("boton-avatar")
    botonAvatar.disabled = true
    let botonFuego = document.getElementById("boton-fuego")
    botonFuego.disabled = true
    let botonAgua = document.getElementById("boton-agua")
    botonAgua.disabled = true
    let botonTierra = document.getElementById("boton-tierra")
    botonTierra.disabled = true

    let sectionReiniciar = document.getElementById("reiniciar")
    sectionReiniciar.style.display = 'block'
}
// funcion aleatoria para jugada del enemigo
function aleatoria(min,max){
    return Math.floor(Math.random()*(max - min + 1) + min )
}
// funcion reiniciar 
function reiniciarJuego(){
    location.reload()
}



//escucha los eventos desde el html 
window.addEventListener("load", iniciarJuego )