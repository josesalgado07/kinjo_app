import { Router } from "express";
const router: Router = Router();

const reservaController = require('../controllers/reserva.controller');

router.get('/lista/:usuarioId', reservaController.obtenerListaReservas);
router.get('/estados', reservaController.obtenerEstados);
router.delete('/cancelar/:id', reservaController.cancelar);

export default router;