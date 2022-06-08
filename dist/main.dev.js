"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Hamburguesa = function Hamburguesa(nombre, descripcion, precio) {
  _classCallCheck(this, Hamburguesa);

  this.nombre = nombre;
  this.descripcion = descripcion;
  this.precio = precio;
};

var hamburguesa1 = new Hamburguesa("hamburguesa de carne", "pan, carne, tomate, lechuga, salsas", 7990);
var hamburguesa2 = new Hamburguesa("hamburguesa de pollo", "pan, pollo, tomate, lechuga, salsas", 6990);
var hamburguesa3 = new Hamburguesa("hamburguesa de chuleta", "pan, chuleta, tomate, lechuga, salsas", 8990);
var hamburguesa4 = new Hamburguesa("hamburguesa mixta", "pan, carne, pollo y/o chuleta, tomate, lechuga, salsas", 10990);
var carrito = [];
var productos = [hamburguesa1, hamburguesa2, hamburguesa3, hamburguesa4];

var mostrarMensaje = function mostrarMensaje(hamburguesa) {
  alert(hamburguesa.nombre + " lleva " + hamburguesa.descripcion + " y tiene el valor de $" + hamburguesa.precio);
  var confirmacionUsuario2 = confirm("desea llevarla?");

  if (confirmacionUsuario2) {} else {
    agregarProducto();
  }
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
  cardP.innerHTML = "  <p class=\"card-text\">".concat(producto.nombre, "</p>\n     <img src=\"../media/burguer.jpg\" class=\"p-2 card-img-top\" alt=\"...\">\n    <div class=\"card-body\">\n      <p class=\"card-text\">Ingredientes: ").concat(producto.descripcion, "</p>\n      <p class=\"card-text\">$").concat(producto.precio, "</p>\n      <a href=\"#\" class=\"btn btn-warning\">Agregar</a>");
  cardContainer.append(cardP);
});
console.log(productos);

var agregarProducto = function agregarProducto() {
  var productoAgregado = prompt("Elige tu hamburguesa! tenemos de carne, pollo, chuleta o mixta").toLowerCase();

  switch (productoAgregado) {
    case "carne":
      mostrarMensaje(hamburguesa1);
      carrito.push(hamburguesa1);
      break;

    case "pollo":
      mostrarMensaje(hamburguesa2);
      carrito.push(hamburguesa2);
      break;

    case "chuleta":
      mostrarMensaje(hamburguesa3);
      carrito.push(hamburguesa3);
      break;

    case "mixta":
      mostrarMensaje(hamburguesa4);
      carrito.push(hamburguesa4);
      break;

    default:
      alert("Lo sentimos, este producto no se encuentra disponible. Por favor elige uno de nuestro stock");
      break;
  }

  var confirmacionUsuario = confirm("desea agregar algo mas?");

  if (confirmacionUsuario) {
    agregarProducto();
  } else {
    alert("el total de su compra es $" + totalCarrito());
    console.log(totalCarrito());
  }
};