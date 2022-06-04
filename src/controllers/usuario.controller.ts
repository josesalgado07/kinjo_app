import { Request, Response } from "express";
import { connect } from "../config/database";

export async function obtener(req: Request, res: Response): Promise<Response> {
    const conn = await connect();

    let listaUsuarios = await conn.query('SELECT * FROM usuarios');
    conn.end();
    return res.json(listaUsuarios[0]);
}

export async function login(req: Request, res: Response) {
    let body = req.body;

    if (body) {
        let { usuario, password } = req.body;
        const conn = await connect();        

        let query = `SELECT
            usuario_id as id,
            usuario,
            email,
            rol_id as rolId
        FROM
            usuarios
        WHERE
            usuario = '${usuario}'
        AND
            password = '${password}'`;

        let listaUsuarios = await conn.query(query);
        conn.end();
        let usuarioEncontrado: any = listaUsuarios[0];
        
        if (usuarioEncontrado.length) {
            return res.status(200).json(usuarioEncontrado[0]);
        } else {
            return res.status(404).send('El usuario o contraseña son incorrectos');
        }
    } else {
        res.status(400).send('Faltan campos por enviar');
    }
}
