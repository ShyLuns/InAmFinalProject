import { Router } from "express";
import { listarAreas, consultarArea, registrarArea, actualizarArea, eliminarArea } from "../controllers/areas.controller.js";

const router = Router();

router.get('/areas/listar', listarAreas);
router.post('/areas/registrar', registrarArea);
router.put('/areas/actualizar/:id', actualizarArea);
router.delete('/areas/eliminar/:id', eliminarArea);
router.get('/areas/buscar/:id', consultarArea);

export default router;