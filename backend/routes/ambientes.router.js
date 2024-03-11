import Route from "express";
import { listarAmbientes, registrarAmbiente, eliminarAmbiente, actualizarAmbiente, consultarAmbiente } from "../controllers/ambientes.controller.js";

const router = Route();

router.get('/ambientes/listar',listarAmbientes);
router.post('/ambientes/registrar',registrarAmbiente);
router.delete('/ambientes/eliminar/:id',eliminarAmbiente);
router.put('/ambientes/actualizar/:id',actualizarAmbiente);
router.get('/ambientes/buscar/:id',consultarAmbiente);

export default router;