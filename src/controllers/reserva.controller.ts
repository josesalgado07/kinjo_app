import { query, Request, Response } from "express";
import { connect } from "../config/database";

export async function obtenerListaReservas(req: Request, res: Response) {
    const conn = await connect();
    let { usuarioId } = req.params;

    if (!usuarioId) {
        return res.status(400).send({ message: 'Se debe enviar el id del usuario' });
    }

    let query = `SELECT
        reserva_id AS id,
        fecha,
        hora_inicio AS horaInicio,
        hora_fin AS horaFin,
        espacio_id AS espacioId,
        usuario_id AS usuarioId,
        estado_reserva_id AS estado
    FROM
        reservas
    WHERE
        usuario_id = ${usuarioId}`;

    let lista = await conn.query(query);
    return res.json(lista[0]);
}

export async function actualizar(req: Request, res: Response) {

}

export async function cancelar(req: Request, res: Response) {
    const conn = await connect();
    let { id } = req.params;

    if (!id) {
        return res.status(400).send({
            message: 'No se puede cancelar la reserva'
        });
    }

    let query = `UPDATE
        reservas
    SET estado_reserva_id = 5
    WHERE reserva_id = ${id}`;

    let response: any = await conn.query(query);

    if (response[0].affectedRows) {
        res.send({ message: 'Se cancelo la reserva' });
        return res.end();
    } else {
        res.status(400).send({ message: 'Ocurrio un error al cancelar la reserva' });
        return res.end();
    }
}

export async function obtenerEstados(req: Request, res: Response) {
    const conn = await connect();

    let lista = await conn.query('SELECT * FROM estados_reserva');
    return res.json(lista[0]);
}