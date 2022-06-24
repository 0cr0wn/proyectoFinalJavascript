"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Hamburguesa = function Hamburguesa(id, nombre, descripcion, precio) {
  _classCallCheck(this, Hamburguesa);

  this.id = id;
  this.nombre = nombre;
  this.descripcion = descripcion;
  this.precio = precio;
};

var hamburguesa1 = new Hamburguesa(101, "hamburguesa de carne", "pan, carne, tomate, lechuga, salsas", 7990);
var hamburguesa2 = new Hamburguesa(102, "hamburguesa de pollo", "pan, pollo, tomate, lechuga, salsas", 6990);
var hamburguesa3 = new Hamburguesa(103, "hamburguesa de chuleta", "pan, chuleta, tomate, lechuga, salsas", 8990);
var hamburguesa4 = new Hamburguesa(104, "hamburguesa mixta", "pan, carne, pollo y/o chuleta, tomate, lechuga, salsas", 10990);
var carrito = [];
var productos = [hamburguesa1, hamburguesa2, hamburguesa3, hamburguesa4];

var mostrarMensaje = function mostrarMensaje(hamburguesa) {
  Swal.fire({
    title: 'Desea Llevarla?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Quiero llevarla',
    confirmButtonColor: "#22D619",
    denyButtonText: "Mejor no",
    denyButtonColor: "#EA1818"
  }).then(function (result) {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      Toastify({
        text: "Producto Agregado",
        className: "info",
        style: {
          background: "linear-gradient(to right, #22D619, #52D84B)"
        }
      }).showToast();
      agregarProducto(e);
    } else if (result.isDenied) {
      Toastify({
        text: "no se ha agregado el producto",
        className: "info",
        style: {
          background: "linear-gradient(to right, #EA1818, #C83939)"
        }
      }).showToast();
    }
  });
};

var totalCarrito = function totalCarrito() {
  var sumaTotal = 0;
  carrito.forEach(function (hamburguesa) {
    sumaTotal += hamburguesa.precio;
  });
  return sumaTotal;
};

var cardContainer = document.querySelector("#cajonContenedor");
productos.forEach(function (producto) {
  var cardP = document.createElement("div");
  cardP.className = "card col-xs-12 col-lg-3 col-sm-3";
  cardP.innerHTML = "  <p class=\"card-text\">".concat(producto.nombre, "</p>\n     <img src=\"../media/burguer.jpg\" class=\"p-2 card-img-top\" alt=\"...\">\n    <div class=\"card-body\">\n      <p class=\"card-text\">Ingredientes: ").concat(producto.descripcion, "</p>\n      <p class=\"card-text\">$").concat(producto.precio, "</p>\n      <button data-id=").concat(producto.id, " class=\"btn btn-warning\">Agregar</button>");
  cardContainer.append(cardP);
}); //

var agregarProducto = function agregarProducto(e) {
  var productoElegido = e.target.getAttribute("data-id");
  var producto = productos.find(function (producto) {
    return producto.id == productoElegido;
  });
  carrito.push(producto);
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

var botonesDeAgregar = document.querySelectorAll(".btn");
botonesDeAgregar.forEach(function (botonCompra) {
  botonCompra.addEventListener("click", mostrarMensaje);
});