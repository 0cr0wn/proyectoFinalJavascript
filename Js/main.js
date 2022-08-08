

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
        botonP.className = "btn btn-warning"
        botonP.innerText = "Agregar"

        cardContainer.append(cardP)
        cardP.append(botonP)


    })

    listenerbotones()


}
const carritoContainer = document.querySelector("#carrito")

const renderizadoCarrito = () => {

    carrito.forEach((producto) => {

        const cardP = document.createElement("div")
        cardP.className = "card col-xs-12 col-lg-3 col-sm-3"
        cardP.innerHTML = `  <p class="card-text">${producto.nombre}</p>
     <img src=${producto.img}  class="p-2 card-img-top" alt="...">
    <div class="card-body">
      <p class="card-text">Ingredientes: ${producto.descripcion}</p>
      <p class="card-text">$${producto.precio}</p>`

        carritoContainer.append(cardP)


    })
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
                    text: "Producto Agregado", className: "info",
                    style: {
                        background: "linear-gradient(to right, #22D619, #52D84B)",
                    },
                }).showToast()
                carrito.push(productoElegido)
                localStorage.setItem('carrito', JSON.stringify(carrito))

                console.log(carrito);
            } else if (result.isDenied) {
                Toastify({
                    text: "no se ha agregado el producto",
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



const listenerbotones = () => {
    const botonesDeAgregar = document.querySelectorAll(".btn")
    botonesDeAgregar.forEach((botonCompra) => {

        botonCompra.addEventListener("click", botonAgregar)
    })


}

const busqueda = document.querySelector("#inputSearch")

const search = (productos) => {

    productos.find(productos ? console.log(productoElegido) : productos.nombre)
}

fetch('../productos.json')
    .then((res) => res.json())
    .then((data) => {
        productos = data
        renderizadoDeProductos(data)

    })

