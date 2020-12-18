// Comando para establecer la conexion
const socket = io();
const etiquetaNuevoTicket = $("#lblNuevoTicket");

socket.on("connect", function () {
    console.log("Conectado al servidor");
});

socket.on("disconnect", function () {
    console.log("Desconectado del servidor");
});

socket.on("estadoActual", function (resp) {
    etiquetaNuevoTicket.text(resp.actual);
});

$("#nuevoTicket").on("click", function () {
    socket.emit("siguienteTicket", null, function (mostrarSiguienteTicket) {
        etiquetaNuevoTicket.text(mostrarSiguienteTicket);
    });
});
