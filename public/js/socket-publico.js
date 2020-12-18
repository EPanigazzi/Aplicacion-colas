const socket = io();

const infoTicketUno = $("#lblTicket1");
const infoTicketDos = $("#lblTicket2");
const infoTicketTres = $("#lblTicket3");
const infoTicketCuatro = $("#lblTicket4");

const infoEscritorioUno = $("#lblEscritorio1");
const infoEscritorioDos = $("#lblEscritorio2");
const infoEscritorioTres = $("#lblEscritorio3");
const infoEscritorioCuatro = $("#lblEscritorio4");

const infoTickets = [
    infoTicketUno,
    infoTicketDos,
    infoTicketTres,
    infoTicketCuatro,
];
const infoEscritorios = [
    infoEscritorioUno,
    infoEscritorioDos,
    infoEscritorioTres,
    infoEscritorioCuatro,
];

socket.on("connect", function () {
    console.log("Conectado socket-publico");
});
socket.on("disconnect", function () {
    console.log("Desconectado de socket-publico");
});

socket.on("estadoActual", function (data) {
    actualizaHTML(data.ultimosCuatro);
});

socket.on("ultimosCuatro", function (data) {
    const audio = new Audio("audio/new-ticket.mp3");
    audio.play();

    actualizaHTML(data.ultimosCuatro);
});

function actualizaHTML(ultimosCuatro) {
    for (let i = 0; i <= ultimosCuatro.length - 1; i++) {
        infoTickets[i].text("Ticket " + ultimosCuatro[i].numero);
        infoEscritorios[i].text("Escritorio " + ultimosCuatro[i].escritorio);
    }
}
