// 1) generar un elemento en html que me sirva de contenedor de la información que voy a plasmar desde js
// 2) guardar estos contenedores en variables 

const home = document.querySelector("h2")
const containerCards = document.querySelector(".container")
const infoCarta = document.querySelector(".info-carta")
const atras = document.querySelector("#atras")
const siguiente = document.querySelector("#siguiente")
const botonesPaginado = document.querySelector(".paginado")

console.log(atras, siguiente)

home.onclick = () => {
    containerCards.style.display = "flex"
    infoCarta.style.display = "none"
    botonesPaginado.style.display = "flex"
}

const resultadoApi = () => {

    fetch("https://rickandmortyapi.com/api/character")
    .then( respuesta => respuesta.json())
    .then( data => {
        console.log(data)
        containerCards.innerHTML = cardsAHtml(data.results) 
        onClickCartaIndividual()
    })
    .catch( () => console.log("malio sal"))
}

resultadoApi()

const cardsAHtml = (array) => {
    const arrayReducido = array.reduce((acc, element) => {
        return acc + `
            <div class="card" id=${element.id}>
                <img src=${element.image} alt=${element.name}>            
            </div>          
        `
    },"")

    return arrayReducido
}

const onClickCartaIndividual = () => {

    // esto es una colección de nodos
    // no es un array
    // no puede pasar por métodos de arrays
    // si quiero iterar sobre estos elementos, lo tendré que hacer con un for
    const cartasEnDom = document.querySelectorAll(".card")
    console.log(cartasEnDom)

    for(let i = 0; i < cartasEnDom.length; i++){

        cartasEnDom[i].onclick = () => {
            console.log("click")
            const id = cartasEnDom[i].id
            console.log(id)
            infoPersonaje(id)
            navegacion()
        }
    }
}

const infoPersonaje = async (id) => {
    const respuesta = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
    const data = await respuesta.json()
    infoCarta.innerHTML = infoCard(data)
}

const infoCard = (data) => {
    return `
        <article class="card-personaje">
            <div class="container-img">
                <img src=${data.image} alt=${data.name}>
            </div>  
            <h3>
                Nombre: ${data.name}
            </h3>       
            <h3>
                Genero: ${data.gender}
            </h3>    
            <h3>
                Especie: ${data.species}
            </h3>  
            <h3>
                Estado: ${data.status}
            </h3>  
            <h3>
                Origen: ${data.origin.name}
            </h3>  
            <h3>
                Origen: ${data.location.name}
            </h3>  
        </article>
    `
}

const navegacion = () => {
    containerCards.style.display = "none"
    infoCarta.style.display = "flex"
    botonesPaginado.style.display = "none"
}

// PAGINADO

let paginado = 1

atras.onclick = () => {
    
    if ( paginado === 1 ){
        atras.disabled = true
    }
    else if ( paginado !== 1) {
        paginado--
        console.log(paginado)        
    }
   
    fetch( `https://rickandmortyapi.com/api/character/?page=${paginado}`)
    .then( respuesta => respuesta.json())
    .then( data => {
        containerCards.innerHTML = cardsAHtml(data.results)
        onClickCartaIndividual()
    })
}

siguiente.onclick = () => {
    if (paginado === 42 ) {
        siguiente.disabled = true
    } 
    else if ( paginado !== 42) {
        paginado++
        console.log(paginado)
    }

    fetch( `https://rickandmortyapi.com/api/character/?page=${paginado}`)
    .then( respuesta => respuesta.json())
    .then( data => {
        containerCards.innerHTML = cardsAHtml(data.results)
        onClickCartaIndividual()
    })
}