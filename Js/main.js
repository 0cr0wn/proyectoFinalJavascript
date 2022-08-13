

let carrito = []

let productos = []


const totalCarrito = () => {

    let sumaTotal = 0
    carrito.forEach((producto) => {
        sumaTotal += producto.precio
    })

    return sumaTotal

}


const cardContainer = document.querySelector("#cajonContenedor")

const renderizadoDeProductos = () => {

    productos.forEach((producto) => {

        const cardP = document.createElement("div")
        cardP.className = "card col-xs-12 col-lg-3 col-sm-3"
        cardP.innerHTML = `  <p class="card-text">${producto.nombre}</p>
     <img src=${producto.img}  class="p-2 card-img-top" alt="...">
    <div class="card-body">
      <p class="card-text">Ingredientes: ${producto.descripcion}</p>
      <p class="card-text">$${producto.precio}</p>`
        const botonP = document.createElement("button")
        botonP.setAttribute("data-id", producto.id)
        botonP.className = "btn btnn btn-warning"
        botonP.innerText = "Agregar"

        cardContainer.append(cardP)
        cardP.append(botonP)


    })

    listenerbotones()


}



const botonAgregar = (e) => {
    const productoIdElegido = e.target.getAttribute("data-id")
    const productoElegido = productos.find((producto) => productoIdElegido == producto.id)

    const mostrarMensaje = () => {
        Swal.fire({
            title: 'Desea Llevarla?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Quiero llevarla',
            confirmButtonColor: "#22D619",
            denyButtonText: `Mejor no`,
            denyButtonColor: "#EA1818"
        }).then((result) => {
            if (result.isConfirmed) {
                Toastify({
                    text: "Producto agregado", className: "info",
                    style: {
                        background: "linear-gradient(to right, #22D619, #52D84B)",
                    },
                }).showToast()
                carrito.push(productoElegido)
                localStorage.setItem('carrito', JSON.stringify(carrito))
                renderizadoCarrito()
                totalCarrito()

            } else if (result.isDenied) {
                Toastify({
                    text: "No se ha agregado el producto",
                    className: "info",
                    style: {
                        background: "linear-gradient(to right, #EA1818, #C83939)",
                    }
                }).showToast();
            }

        })
    }
    mostrarMensaje()


}
const carritoContainer = document.querySelector("#carrito")

const renderizadoCarrito = () => {

    carritoContainer.innerHTML = `<h4 class= "m-0-auto">Total: $${totalCarrito()}</h4>
    <button 
     class=" btnFinish btn-success m-0-auto" id='botonDeFinalizar'>finalizar compra</button>`

    carrito.forEach(producto => {
        const cardC = document.createElement("div")
        cardC.className = "card col-xs-12 col-lg-3 col-sm-3 justify-content-center renderCarrito"
        cardC.innerHTML = `<p class="card-text"> ${producto.nombre}</p>
        <img src=${producto.img} class="p-2 card-img-top" alt="...">
            <div class="card-body">
                <p class="card-text">Ingredientes: ${producto.descripcion}</p>
                <p class="card-text">$${producto.precio}</p>`
        const botonE = document.createElement("button")
        botonE.setAttribute("data-id", producto.id)
        botonE.className = "btn btnn btn-danger p-15 delete"
        botonE.innerText = "eliminar"
        carritoContainer.append(cardC)
        cardC.append(botonE)


    })
    document.querySelectorAll(".delete").forEach((producto) => {
        producto.addEventListener("click", delProducto)

    })
    const fin = document.querySelector('#botonDeFinalizar')
    fin.addEventListener("click", finalizarCompra)

}

const finalizarCompra = (e) => {
    const botonFinalizar = e.target
    Swal.fire(
        `Tu compra ha finalizado! su total es: $${totalCarrito()}`,
        'gracias por preferirnos',
        'success'
    )
    botonFinalizar
    carrito.pop()
    renderizadoCarrito()

}



renderizadoCarrito()

const delProducto = (e) => {
    const deleteProducto = e.target.getAttribute('data-id')
    carrito = carrito.filter((producto) => producto.id !=
        deleteProducto)
    renderizadoCarrito()
}




const listenerbotones = () => {
    const botonesDeAgregar = document.querySelectorAll(".btnn")
    botonesDeAgregar.forEach((botonCompra) => {

        botonCompra.addEventListener("click", botonAgregar)
    })


}

fetch('productos.json')
    .then((res) => res.json())
    .then((data) => {
        productos = data
        renderizadoDeProductos(data)

    })
