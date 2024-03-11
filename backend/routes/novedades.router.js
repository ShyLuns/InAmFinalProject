import { Router } from 'express';
import { listarNovedad, consultarNovedad, registrarNovedad, actualizarNovedad, eliminarNovedad } from '../controllers/novedades.controller.js';

const router = Router();

router.get('/novedades/listar', listarNovedad);
router.post('/novedades/registrar', registrarNovedad);
router.delete('/novedades/eliminar/:id', eliminarNovedad);
router.put('/novedades/actualizar/:id', actualizarNovedad);
router.get('/novedades/buscar/:id', consultarNovedad)

export default router;