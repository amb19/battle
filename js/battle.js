//constantes de las funciones, son variables que no van a cambiar
const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque") // para ocultar la parte de los ataques al principio del juego 
const sectionReiniciar = document.getElementById("reiniciar") // para habilitar la limpieza del html. 
const botonAvatar = document.getElementById("boton-avatar")
const botonReiniar = document.getElementById("boton-reiniciar")
sectionReiniciar.style.display = 'none'

const sectionSeleccionarAvatar = document.getElementById("seleccionar-avatar")
const spanAvatarJugador = document.getElementById("avatar-jugador")
const spanAvatarEnemigo = document.getElementById("avatar-enemigo")

const spanVidasAvatar = document.getElementById("vidas-avatar")
const spanVidasEnemigo = document.getElementById("vidas-enemigo")

const sectionMensajes = document.getElementById("resultado")
const ataquedelJugador = document.getElementById("ataque-jugador")
const ataquedelEnemigo = document.getElementById("ataque-enemigo")
const contenedorTarjetas = document.getElementById("contenedorTarjetas")
const contenedorAtaques = document.getElementById("contenedorAtaques")

//variable global
let avatares = [] // esto es un array 
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeAvatares
let inputtiburon 
let inputarbol
let inputdragon
let avatarJugador
let ataquesavatar
let ataquesAvatarEnemigo
let botonFuego
let botonAgua
let botonTierra
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasAvatar = 3
let vidasEnemigo = 3

//esto es una clase, con sus propiedades, atributos 
class Avatar {
    constructor(nombre,foto,vida){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
}

let tiburon = new Avatar('Tiburon','./img/tiburon.png',3)
let arbol = new Avatar('Arbol','./img/arbol.png',3)
let dragon = new Avatar('Dragon','./img/dragon.png',3)

//objeto literal se contruyen de 0, no tienen una clase, solo guardan informacion 
tiburon.ataques.push(
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🌱', id: 'boton-tierra'},
)

arbol.ataques.push(
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '💧', id: 'boton-agua'},
    
)

dragon.ataques.push(
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🌱', id: 'boton-tierra'},
)

avatares.push(tiburon,arbol,dragon)

//funcion que se carga una vez que carga el html
function iniciarJuego(){
    sectionSeleccionarAtaque.style.display = 'none'
    //fucion para recorrer el arreglo, con una funcion fecha y creacin con ` templay literarios 
    avatares.forEach((avatar) => { 
        opcionDeAvatares = `
        <input type="radio" name="mascota" id=${avatar.nombre} />
        <label class="tarjeta-de-avatar" for=${avatar.nombre}>
        <p>${avatar.nombre}</p>
        <img src=${avatar.foto} alt=${avatar.nombre}>
        </label>  
        `
        contenedorTarjetas.innerHTML += opcionDeAvatares // para inyectar el valor de opcionesDeAvatares en el html
        
        inputtiburon = document.getElementById("Tiburon")
        inputarbol = document.getElementById("Arbol")
        inputdragon = document.getElementById("Dragon")
    } )
   
    botonAvatar.addEventListener("click", seleccionarAvatarJugador)
    
    botonReiniar.addEventListener('click', reiniciarJuego)
}
// se crea la variables con los avatares y se selecciona 
function seleccionarAvatarJugador(){
    sectionSeleccionarAvatar.style.display = 'none'
    sectionSeleccionarAtaque.style.display = 'flex'
    // alertas segun la seleccion del avatar    
    if (inputtiburon.checked) {
        spanAvatarJugador.innerHTML = inputtiburon.id // devuelte el valor del objeto inputtiburon.id
        avatarJugador = inputtiburon.id  // extraer el id, lo guarde en la variable, para luego buscarlo en los objetos y asi extraer los ataques. 
    }else if (inputarbol.checked) {
        spanAvatarJugador.innerHTML = inputarbol.id
        avatarJugador = inputarbol.id
    }else if (inputdragon.checked){
        spanAvatarJugador.innerHTML = inputdragon.id
        avatarJugador = inputdragon.id
    }else{
        alert ("selecciona un avatar")
    }
    extraerAtaques(avatarJugador)
    seleccionarAvatarEnemigo()
}
// funcion extraer ataques 
function extraerAtaques(avatarJugador){
    let ataques
    for (let i = 0; i < avatares.length; i++) {
        if (avatarJugador === avatares[i].nombre){
            ataques = avatares[i].ataques
        }
    }
    mostrarAtaques(ataques)
}
//funcion de ataques 

function mostrarAtaques(ataques){
    ataques.forEach((ataque) => {
        ataquesavatar = `
        <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesavatar
    } )
    botonFuego = document.getElementById("boton-fuego")
    botonAgua = document.getElementById("boton-agua")
    botonTierra = document.getElementById("boton-tierra")
    botones = document.querySelectorAll(".BAtaque")
}

function secuenciaAtaque(){
    botones.forEach((boton) =>{
        boton.addEventListener("click",(e)=>{
            if (e.target.innerText === "🔥"){
                ataqueJugador.push("FUEGO")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            } else if (e.target.innerText === "💧"){
                ataqueJugador.push("AGUA")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            } else {(e.target.innerText === "🌱")
            ataqueJugador.push("TIERRA")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            }
            ataqueAleatorioEnemigo()   
        })
    })
   
}

// seleccionar avatar enemigo
function seleccionarAvatarEnemigo(){
    let mascotaAleatorio = aleatoria(0,avatares.length -1)

    spanAvatarEnemigo.innerHTML = avatares[mascotaAleatorio].nombre
    ataquesAvatarEnemigo = avatares[mascotaAleatorio].ataques
    secuenciaAtaque()
}

function ataqueAleatorioEnemigo(){
    let ataqueAleatorio = aleatoria(0,ataquesAvatarEnemigo.length -1)

    if (ataqueAleatorio == 0 ){
        ataqueEnemigo.push('FUEGO')
    }else if(ataqueAleatorio == 1){
        ataqueEnemigo.push('AGUA')
    }else {(ataqueAleatorio == 2)
        ataqueEnemigo.push('TIERRA')
    }
    console.log(ataqueEnemigo)
    iniciarPelea()
}

function iniciarPelea(){
    if(ataqueJugador.length === 3){
        combate()
    }
}
function indexAmbosoponente(jugador, enemigo){
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate(){ 
    for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index] === ataqueEnemigo[index]){
            indexAmbosoponente(index,index)
            crearMensaje("Empate 🤝")
            //victoriasJugador = victoriasEnemigo
        }else if (ataqueJugador[index] === 'FUEGO' && ataqueEnemigo[index] === 'TIERRA' ){
            indexAmbosoponente(index,index)
            crearMensaje("Ganaste 🏆")
            victoriasJugador++
            spanVidasAvatar.innerHTML = vidasAvatar
        } else if (ataqueJugador[index] === 'AGUA' && ataqueEnemigo[index] === 'FUEGO'){
            indexAmbosoponente(index,index)
            crearMensaje("Ganaste 🏆")
            victoriasJugador++
            spanVidasAvatar.innerHTML = vidasAvatar
        } else if (ataqueJugador[index] === 'TIERRA' && ataqueEnemigo[index] === 'AGUA'){
            indexAmbosoponente(index,index)
            crearMensaje("Ganaste 🏆")
            victoriasJugador++
            spanVidasAvatar.innerHTML = vidasAvatar
        } else {
            indexAmbosoponente(index,index)
            crearMensaje("Perdiste 💣")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
    }
    revisarvictorias()
}
// funcion para validar las vidas. 
function revisarvictorias() {
    if(victoriasJugador === victoriasEnemigo ){
        mensajeFinal("ESTO FUE UN EMPATE 🤝!")
    }else if(victoriasJugador > victoriasEnemigo){
        mensajeFinal("FELICITACIONES ! GANASTE ! 🏆")
    } else {
        mensajeFinal("OH LO SIENTO, PERDISTE 😭")
    }
}
// funcion mensaje
function crearMensaje(resultado){
    let nuevoataqueJugador = document.createElement('p')
    let nuevoataqueEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoataqueJugador.innerHTML = indexAtaqueJugador
    nuevoataqueEnemigo.innerHTML = indexAtaqueEnemigo

    ataquedelJugador.appendChild(nuevoataqueJugador)
    ataquedelEnemigo.appendChild(nuevoataqueEnemigo)
}
// funcion mensaje final
function mensajeFinal(resultadoFinal){
    sectionMensajes.innerHTML = resultadoFinal
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