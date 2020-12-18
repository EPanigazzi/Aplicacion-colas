const fs = require("fs");

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {
    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimosCuatro = [];

        const data = require("../data/data.json");
        //Ver el JSON
        //console.log(data);
        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimosCuatro = data.ultimosCuatro;
        } else {
            this.reiniciarConteo();
        }
    }
    grabarArchivo() {
        const jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimosCuatro: this.ultimosCuatro,
        };
        const jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync("./server/data/data.json", jsonDataString);
    }

    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.ultimosCuatro = [];

        console.log("Se ha inicializado el sistema");
        this.grabarArchivo();
    }

    maxTicketsDisponibles() {
        if (this.ultimo === 100) {
            this.ultimo = 1;
        }
    }

    siguienteTicket() {
        this.ultimo += 1;

        const ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.grabarArchivo();
        this.maxTicketsDisponibles();

        return `Ticket ${this.ultimo}`;
    }

    getUltimoTicket() {
        return `Ticket ${this.ultimo}`;
    }

    getUltimosCuatro() {
        return this.ultimosCuatro;
    }

    getEscritorio() {
        return this.escritorio;
    }

    atenderTicket(escritorio) {
        if (this.tickets.length === 0) {
            return "No hay tickets";
        }

        const numeroTicket = this.tickets[0].numero;
        //Borra el primero
        this.tickets.shift();

        const atenderTicket = new Ticket(numeroTicket, escritorio);
        //Agrega en el inicio
        this.ultimosCuatro.unshift(atenderTicket);

        if (this.ultimosCuatro.length > 4) {
            //Borra el ultimo elemento
            this.ultimosCuatro.splice(-1, 1);
        }
        console.log("Ultimos cuatro");
        console.log(this.ultimosCuatro);

        this.grabarArchivo();

        return atenderTicket;
    }
}

module.exports = {
    TicketControl,
};
