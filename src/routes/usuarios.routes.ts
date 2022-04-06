import { Router } from "express";
const router: Router = Router();

const usuarioController = require('../controllers/usuario.controller');

router.get('/', usuarioController.obtener);
router.post('/login', usuarioController.login);

export default router;