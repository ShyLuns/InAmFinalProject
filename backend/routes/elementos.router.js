import { Router } from "express";

import { listarElementos, registrarElemento, actualizarElemento, consultarElemento, eliminarElemento } from "../controllers/elementos.controller.js";

const router = Router();

router.get('/elementos/listar',listarElementos);
router.post('/elementos/registrar',registrarElemento);
router.delete('/elementos/eliminar/:id',eliminarElemento);
router.put('/elementos/actualizar/:id',actualizarElemento);
router.get('/elementos/buscar/:id',consultarElemento);


export default router