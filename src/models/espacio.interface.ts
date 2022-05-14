export interface Reserva {
    reserva_id?: number,
    fecha: Date,
    hora_inicio: Date,
    hora_fin: Date,
    espacio_id: number,
    usuario_id: number
}