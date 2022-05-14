import { Router } from "express";
const router: Router = Router();

const espacioController = require('../controllers/espacio.controller');

router.get('/consulta', espacioController.obtener);
router.post('/reservar', espacioController.reservar);

export default router;