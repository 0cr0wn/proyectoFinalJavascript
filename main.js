

class Hamburguesa {
    constructor(id, nombre, descripcion, precio) {
        this.id = id
        this.nombre = nombre
        this.descripcion = descripcion
        this.precio = precio
    }
}

const hamburguesa1 = new Hamburguesa(101, "hamburguesa de carne", "pan, carne, tomate, lechuga, salsas", 7990)
const hamburguesa2 = new Hamburguesa(102, "hamburguesa de pollo", "pan, pollo, tomate, lechuga, salsas", 6990)
const hamburguesa3 = new Hamburguesa(103, "hamburguesa de chuleta", "pan, chuleta, tomate, lechuga, salsas", 8990)
const hamburguesa4 = new Hamburguesa(104, "hamburguesa mixta", "pan, carne, pollo y/o chuleta, tomate, lechuga, salsas", 10990)

const carrito = []

const productos = [hamburguesa1, hamburguesa2, hamburguesa3, hamburguesa4]

const mostrarMensaje = (hamburguesa) => {
    const confirmacionUsuario2 = Swal.fire({
        title: 'Desea Llevarla?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Quiero llevarla',
        denyButtonText: `Mejor no`,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {

            Swal.fire('¡Se ha agregado a tu carrito!', '', 'success')
            agregarProducto(e)

        } else if (result.isDenied) {
            Swal.fire('Se ha descartado el producto', '', 'info')
        }
    })

}

const totalCarrito = () => {
    let sumaTotal = 0
    carrito.forEach((hamburguesa) => {
        sumaTotal += hamburguesa.precio
    })
    return sumaTotal
}

const cardContainer = document.querySelector("#cajonContenedor")

productos.forEach((producto) => {
    const cardP = document.createElement("div")
    cardP.className = "card col-xs-12 col-lg-3 col-sm-3"
    cardP.innerHTML = `  <p class="card-text">${producto.nombre}</p>
     <img src="../media/burguer.jpg" class="p-2 card-img-top" alt="...">
    <div class="card-body">
      <p class="card-text">Ingredientes: ${producto.descripcion}</p>
      <p class="card-text">$${producto.precio}</p>
      <button data-id=${producto.id} class="btn btn-warning">Agregar</button>`

    cardContainer.append(cardP)

})

//

const agregarProducto = (e) => {
    const productoElegido = e.target.getAttribute("data-id")
    const producto = productos.find((producto) => producto.id == productoElegido)
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito))
    Toastify({
        text: "Producto Agregado",
        className: "info",
        style: {
            background: "linear-gradient(to right, #22D619, #52D84B)",
        }
    }).showToast();
}


const botonesDeAgregar = document.querySelectorAll(".btn")
botonesDeAgregar.forEach((botonCompra) => {
    botonCompra.addEventListener("click", mostrarMensaje)
})




