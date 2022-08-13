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
    botonP.className = "btn btnn btn-warning";
    botonP.innerText = "Agregar";
    cardContainer.append(cardP);
    cardP.append(botonP);
  });
  listenerbotones();
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
          text: "Producto agregado",
          className: "info",
          style: {
            background: "linear-gradient(to right, #22D619, #52D84B)"
          }
        }).showToast();
        carrito.push(productoElegido);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        renderizadoCarrito();
        totalCarrito();
      } else if (result.isDenied) {
        Toastify({
          text: "No se ha agregado el producto",
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

var carritoContainer = document.querySelector("#carrito");

var renderizadoCarrito = function renderizadoCarrito() {
  carritoContainer.innerHTML = "<h4 class= \"m-0-auto\">Total: $".concat(totalCarrito(), "</h4>\n    <button \n     class=\" btnFinish btn-success m-0-auto\" id='botonDeFinalizar'>finalizar compra</button>");
  carrito.forEach(function (producto) {
    var cardC = document.createElement("div");
    cardC.className = "card col-xs-12 col-lg-3 col-sm-3 justify-content-center renderCarrito";
    cardC.innerHTML = "<p class=\"card-text\"> ".concat(producto.nombre, "</p>\n        <img src=").concat(producto.img, " class=\"p-2 card-img-top\" alt=\"...\">\n            <div class=\"card-body\">\n                <p class=\"card-text\">Ingredientes: ").concat(producto.descripcion, "</p>\n                <p class=\"card-text\">$").concat(producto.precio, "</p>");
    var botonE = document.createElement("button");
    botonE.setAttribute("data-id", producto.id);
    botonE.className = "btn btnn btn-danger p-15 delete";
    botonE.innerText = "eliminar";
    carritoContainer.append(cardC);
    cardC.append(botonE);
  });
  document.querySelectorAll(".delete").forEach(function (producto) {
    producto.addEventListener("click", delProducto);
  });
  var fin = document.querySelector('#botonDeFinalizar');
  fin.addEventListener("click", finalizarCompra);
};

var finalizarCompra = function finalizarCompra(e) {
  var botonFinalizar = e.target;
  Swal.fire("Tu compra ha finalizado! su total es: $".concat(totalCarrito()), 'gracias por preferirnos', 'success');
  botonFinalizar;
  carrito.pop();
  renderizadoCarrito();
};

renderizadoCarrito();

var delProducto = function delProducto(e) {
  var deleteProducto = e.target.getAttribute('data-id');
  carrito = carrito.filter(function (producto) {
    return producto.id != deleteProducto;
  });
  renderizadoCarrito();
};

var listenerbotones = function listenerbotones() {
  var botonesDeAgregar = document.querySelectorAll(".btnn");
  botonesDeAgregar.forEach(function (botonCompra) {
    botonCompra.addEventListener("click", botonAgregar);
  });
};

fetch('productos.json').then(function (res) {
  return res.json();
}).then(function (data) {
  productos = data;
  renderizadoDeProductos(data);
});