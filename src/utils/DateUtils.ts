function formatoFecha(fecha: Date): string {
    return  require('moment')(fecha)
        .format("YYYY-M-D");
}

function formatoHora(fecha: Date): string {
    return  require('moment')(fecha)
    .format("HH:mm:ss");
}

module.exports = {
    formatoFecha,
    formatoHora
}