import { Request, Response } from "express";
import { connect } from "../config/database";

const { formatoFecha, formatoHora } = require('../utils/DateUtils');

export async function obtener(req: Request, res: Response): Promise<Response> {
    const conn = await connect();

    let lista = await conn.query('SELECT * FROM espacios');
    return res.json(lista[0]);
}

export async function reservar(req: Request, res: Response): Promise<Response> {
    const conn = await connect();
    let datos = req.body;

    if (!validarDatos(req.body)) {
        return res.status(400).send('Faltan campos por llenar');
    }

    let query = `INSERT INTO reservas VALUES(NULL,
        '${formatoFecha(datos.fecha)}',
        '${formatoHora(datos.horaInicio)}',
        '${formatoHora(datos.horaFin)}',
        ${datos.espacio},
        ${datos.usuarioId},
        1, NULL)`;
        
    try {
        let response: any = await conn.query(query);

        if (response[0].affectedRows) {
            res.send({ message: 'Se registro la reserva' });
            return res.end();
        } else {
            res.status(400).send({ message: 'Ocurrio un error al registrar la reserva' });
            return res.end();
        }
    } catch (error) {
        return res.status(500).send({message: 'Ocurrio un error al registrar la reserva' });
    }
}

function validarDatos(datos: any): boolean {
    if (datos) {
        if (datos.fecha && datos.horaInicio && datos.horaFin) {
            return true;
        }
    }
    return false;
}
