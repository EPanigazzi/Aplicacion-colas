const { io } = require("../server");
const { TicketControl } = require("../classes/ticket-control");

const ticketControl = new TicketControl();

io.on("connection", (client) => {
    client.on("siguienteTicket", (data, callback) => {
        //data es null segundo parametro FRONT
        const siguienteTicket = ticketControl.siguienteTicket();

        console.log(siguienteTicket);
        callback(siguienteTicket);
    });

    //emitir un evento del backend al front
    client.emit("estadoActual", {
        actual: ticketControl.getUltimoTicket(),
        ultimosCuatro: ticketControl.getUltimosCuatro(),
    });

    client.on("atenderTicket", (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: "El escritorio es necesario",
            });
        }

        const atenderTicket = ticketControl.atenderTicket(data.escritorio);

        // Retornamos el escritorio
        callback(atenderTicket);

        //Actualizar / notificar cambios en los ULTIMOS CUATRO
        client.broadcast.emit("ultimosCuatro", {
            ultimosCuatro: ticketControl.getUltimosCuatro(),
        });
    });
});
