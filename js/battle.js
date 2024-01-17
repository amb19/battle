//variable global
let ataqueJugador
let ataqueEnemigo
let vidasAvatar = 3
let vidasEnemigo = 3


//funcion que se carga una vez que carga el html
function iniciarJuego(){
    let sectionReiniciar = document.getElementById("reiniciar")
    sectionReiniciar.style.display = 'none'

    let sectionSeleccionarAtaque = document.getElementById("seleccionar_ataque")
    sectionSeleccionarAtaque.style.display = 'none'

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
// se crea la variables con los avatares
function seleccionarAvatar(){
    let sectionSeleccionarAvatar = document.getElementById("seleccionar_avatar")
    sectionSeleccionarAvatar.style.display = 'none'

    let sectionSeleccionarAtaque = document.getElementById("seleccionar_ataque")
    sectionSeleccionarAtaque.style.display = 'block'

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
// seleccionar avatar enemigo
function seleccionarAvatarEnemigo(){
    let mascotaAleatorio = aleatoria(1,6)
    let spanAvatarEnemigo = document.getElementById("avatar_enemigo")

    if (mascotaAleatorio == 1){
        spanAvatarEnemigo.innerHTML = "pez"
    }else if (mascotaAleatorio == 2 ){
        spanAvatarEnemigo.innerHTML = "arbol"
    }else if (mascotaAleatorio == 3 ){
        spanAvatarEnemigo.innerHTML = "fosforo"
    }else if (mascotaAleatorio == 4 ){
        spanAvatarEnemigo.innerHTML = "tiburon"
    }else if (mascotaAleatorio == 5 ){
        spanAvatarEnemigo.innerHTML = "tortuga"
    }else if (mascotaAleatorio == 6 ){
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
    let sectionMensajes = document.getElementById('mensajes')

    let parrafo = document.createElement('p')
    parrafo.innerHTML = 'Tu avatar ataco con: '+ataqueJugador+'; la mascota del enemigo ataco con: '+ ataqueEnemigo +' - '+ resultado

    sectionMensajes.appendChild(parrafo)
}
// funcion mensaje final
function mensajeFinal(resultadoFinal){
    let sectionMensajes = document.getElementById('mensajes')

    let parrafo = document.createElement('p')
    parrafo.innerHTML = resultadoFinal

    sectionMensajes.appendChild(parrafo)

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