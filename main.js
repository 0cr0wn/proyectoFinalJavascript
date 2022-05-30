

class Hamburguesa {
    constructor(nombre, descripcion, precio) {
        this.nombre = nombre
        this.descripcion = descripcion
        this.precio = precio
    }
}

const hamburguesa1 = new Hamburguesa("hamburguesa de carne", "pan, carne, tomate, lechuga, salsas", 7990)
const hamburguesa2 = new Hamburguesa("hamburguesa de pollo", "pan, pollo, tomate, lechuga, salsas", 6990)
const hamburguesa3 = new Hamburguesa("hamburguesa de chuleta", "pan, chuleta, tomate, lechuga, salsas", 8990)
const hamburguesa4 = new Hamburguesa("hamburguesa de mixta", "pan, carne, pollo y/o chuleta, tomate, lechuga, salsas", 10990)

const carrito = []

const productos = [hamburguesa1, hamburguesa2, hamburguesa3, hamburguesa4]

const mostrarMensaje = (hamburguesa) => {
    alert(hamburguesa.nombre + " lleva " + hamburguesa.descripcion + " y tiene el valor de $" + hamburguesa.precio)
    const confirmacionUsuario2 = confirm("desea llevarla?")
    if (confirmacionUsuario2) {
        carrito.push

    } else {
        agregarProducto()
    }
}

const totalCarrito = () => {
    let sumaTotal = 0
    carrito.forEach((hamburguesa) => {
        sumaTotal += hamburguesa.precio
    })
    return sumaTotal
}


console.log(productos);
const agregarProducto = () => {

    const productoAgregado = prompt("Elige tu hamburguesa! tenemos de carne, pollo, chuleta o mixta").toLowerCase()

    switch (productoAgregado) {
        case "carne":
            mostrarMensaje(hamburguesa1)
            carrito.push(hamburguesa1)
            break
        case "pollo":
            mostrarMensaje(hamburguesa2)
            carrito.push(hamburguesa2)
            break
        case "chuleta":
            mostrarMensaje(hamburguesa3)
            carrito.push(hamburguesa3)
            break
        case "mixta":
            mostrarMensaje(hamburguesa4)
            carrito.push(hamburguesa4)
            break
        default: alert("Lo sentimos, este producto no se encuentra disponible. Por favor elige uno de nuestro stock")
            break

    }
    const confirmacionUsuario = (confirm("desea agregar algo mas?"))

    if (confirmacionUsuario) {
        agregarProducto()

    } else {
        alert("el total de su compra es $" + totalCarrito())
        console.log(totalCarrito());
    }

}

agregarProducto()
