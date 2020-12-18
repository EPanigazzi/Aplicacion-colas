const socket = io();

socket.on("connect", function () {
    console.log("Conectado a socket-escritorio.js");
});
socket.on("disconnect", function () {
    console.log("Desconectado de socket-escritorio.js");
});

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has("escritorio")) {
    window.location = "index.html";
    throw new Error("El escritorio es necesario");
}
//Levantamos los el valor de escritorio que esta en la query
const escritorio = searchParams.get("escritorio");
const numeroAtendiendo = $("small");

console.log(escritorio);

$("#escritorio").text("Escritorio " + escritorio);

$("button").on("click", function () {
    socket.emit(
        "atenderTicket",
        {
            escritorio: escritorio,
        },
        function (resp) {
            console.log(resp);
            if (resp.numero === undefined) {
                $("small").text(resp);
                alert(resp);
                return;
            } else {
                $("small").text("Ticket " + resp.numero);
            }
        }
    );
});
