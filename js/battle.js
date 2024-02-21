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

const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

//variable global
let avatares = [] // esto es un array 
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeAvatares
let inputtiburon 
let inputarbol
let inputdragon
let avatarJugador
let avatarJugadorObjeto
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
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image() 
mapaBackground.src = "../img/batte.map.png"


//esto es una clase, con sus propiedades, atributos 
class Avatar {
    constructor(nombre,foto,vida, fotomapa, x = 210, y = 90 ){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.x = x
        this.y = y
        this.ancho = 40
        this.alto = 40
        this.mapaFotos = new Image()
        this.mapaFotos.src = foto
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarAvatar(){
        lienzo.drawImage(
            this.mapaFotos,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }

}

let tiburon = new Avatar('Tiburon','./img/tiburon.png',3,'./img/tiburon.png')
let arbol = new Avatar('Arbol','./img/arbol.png',3 , './img/arbol.png')
let dragon = new Avatar('Dragon','./img/dragon.png',3,'./img/dragon.png')

let tiburonEnemigo = new Avatar('Tiburon','./img/tiburon.png',3,'./img/tiburon.png',60,180)
let arbolEnemigo = new Avatar('Arbol','./img/arbol.png',3 , './img/arbol.png',35,30)
let dragonEnemigo = new Avatar('Dragon','./img/dragon.png',3,'./img/dragon.png',195,145)

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
    sectionVerMapa.style.display = 'none'
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
    //sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'flex'
    iniciarMapa()
        
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
    sectionVerMapa.style.display = 'flex'
    iniciarMapa()
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
function pintarCanvas(){

    avatarJugadorObjeto.x = avatarJugadorObjeto.x + avatarJugadorObjeto.velocidadX
    avatarJugadorObjeto.y = avatarJugadorObjeto.y + avatarJugadorObjeto.velocidadY
    lienzo.clearRect(0,0,mapa.width, mapa.height )
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    avatarJugadorObjeto.pintarAvatar()
    tiburonEnemigo.pintarAvatar()
    arbolEnemigo.pintarAvatar()
    dragonEnemigo.pintarAvatar()
    if(avatarJugadorObjeto.velocidadX !== 0 || avatarJugadorObjeto.velocidadY !== 0){
        revisarColision(tiburonEnemigo)
        revisarColision(arbolEnemigo)
        revisarColision(dragonEnemigo)
    }
}

function moverDerecha(){
    avatarJugadorObjeto.velocidadX = 5
}
function moverIzquierda(){
    avatarJugadorObjeto.velocidadX = -5
}
function moverAbajo(){
    avatarJugadorObjeto.velocidadY = 5
}
function moverArriba(){
    avatarJugadorObjeto.velocidadY = -5
}

function detenermovimiento(){
    avatarJugadorObjeto.velocidadX = 0
    avatarJugadorObjeto.velocidadY = 0
}
// funcion reiniciar 
function reiniciarJuego(){
    location.reload()
}

function sePresionoUnaTecla(event){
    switch (event.key) {
        case "ArrowUp":
            moverArriba()
            break;
        case "ArrowDown":
            moverAbajo()
            break;    
        case "ArrowLeft":
            moverIzquierda()
            break;
        case "ArrowRight":
            moverDerecha()
            break;    
        default:
            break;
    }
}
function iniciarMapa(){
    mapa.width = 320
    mapa.height = 240
    avatarJugadorObjeto = obtenerObjetoAvatar(avatarJugador)
    intervalo = setInterval(pintarCanvas,50)
    window.addEventListener("keydown",sePresionoUnaTecla)
    window.addEventListener("keyup",detenermovimiento)
   
}

function obtenerObjetoAvatar() {
    for (let i = 0; i < avatares.length; i++) {
        if (avatarJugador === avatares[i].nombre){
            return avatares[i]
        }
    }
}
function revisarColision(enemigo){
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaAvatar = avatarJugadorObjeto.y
    const abajoAvatar = avatarJugadorObjeto.y + avatarJugadorObjeto.alto
    const derechaAvatar = avatarJugadorObjeto.x + avatarJugadorObjeto.ancho
    const izquierdaAvatar = avatarJugadorObjeto.x

    if (
        abajoAvatar < arribaEnemigo || 
        arribaAvatar > abajoEnemigo ||
        derechaAvatar < izquierdaEnemigo ||
        izquierdaAvatar > derechaEnemigo
    ) {
        return
    }
    detenermovimiento()
    alert("Hay colision con: " + enemigo.nombre + " !" )
}

//escucha los eventos desde el html 
window.addEventListener("load", iniciarJuego )