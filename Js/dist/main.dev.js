"use strict";

var carrito = [];
var productos = [];

var totalCarrito = function totalCarrito() {
  var sumaTotal = 0;
  carrito.forEach(function (producto) {
    sumaTotal += producto.precio;
  });
  return sumaTotal;
};

var cardContainer = document.querySelector("#cajonContenedor");

var renderizadoDeProductos = function renderizadoDeProductos() {
  productos.forEach(function (producto) {
    var cardP = document.createElement("div");
    cardP.className = "card col-xs-12 col-lg-3 col-sm-3";
    cardP.innerHTML = "  <p class=\"card-text\">".concat(producto.nombre, "</p>\n     <img src=").concat(producto.img, "  class=\"p-2 card-img-top\" alt=\"...\">\n    <div class=\"card-body\">\n      <p class=\"card-text\">Ingredientes: ").concat(producto.descripcion, "</p>\n      <p class=\"card-text\">$").concat(producto.precio, "</p>");
    var botonP = document.createElement("button");
    botonP.setAttribute("data-id", producto.id);
    botonP.className = "btn btn-warning";
    botonP.innerText = "Agregar";
    cardContainer.append(cardP);
    cardP.append(botonP);
  });
  listenerbotones();
};

var carritoContainer = document.querySelector("#carrito");

var renderizadoCarrito = function renderizadoCarrito() {
  carrito.forEach(function (producto) {
    var cardP = document.createElement("div");
    cardP.className = "card col-xs-12 col-lg-3 col-sm-3";
    cardP.innerHTML = "  <p class=\"card-text\">".concat(producto.nombre, "</p>\n     <img src=").concat(producto.img, "  class=\"p-2 card-img-top\" alt=\"...\">\n    <div class=\"card-body\">\n      <p class=\"card-text\">Ingredientes: ").concat(producto.descripcion, "</p>\n      <p class=\"card-text\">$").concat(producto.precio, "</p>");
    carritoContainer.append(cardP);
  });
};

var botonAgregar = function botonAgregar(e) {
  var productoIdElegido = e.target.getAttribute("data-id");
  var productoElegido = productos.find(function (producto) {
    return productoIdElegido == producto.id;
  });

  var mostrarMensaje = function mostrarMensaje() {
    Swal.fire({
      title: 'Desea Llevarla?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Quiero llevarla',
      confirmButtonColor: "#22D619",
      denyButtonText: "Mejor no",
      denyButtonColor: "#EA1818"
    }).then(function (result) {
      if (result.isConfirmed) {
        Toastify({
          text: "Producto Agregado",
          className: "info",
          style: {
            background: "linear-gradient(to right, #22D619, #52D84B)"
          }
        }).showToast();
        carrito.push(productoElegido);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        console.log(carrito);
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

  mostrarMensaje();
};

var listenerbotones = function listenerbotones() {
  var botonesDeAgregar = document.querySelectorAll(".btn");
  botonesDeAgregar.forEach(function (botonCompra) {
    botonCompra.addEventListener("click", botonAgregar);
  });
};

var busqueda = document.querySelector("#inputSearch");

var search = function search(productos) {
  productos.find(productos ? console.log(productoElegido) : productos.nombre);
};

fetch('../productos.json').then(function (res) {
  return res.json();
}).then(function (data) {
  productos = data;
  renderizadoDeProductos(data);
});