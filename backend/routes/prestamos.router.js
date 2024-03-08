import { Router } from "express";
import { listarPrestamo, registrarPrestamos, eliminarPrestamos, actualizarPrestamos, consultarPrestamos } from "../controllers/prestamos.controller.js";

const router = Router();

router.get('/prestamos/listar', listarPrestamo);
router.post('/prestamos/registrar', registrarPrestamos);
router.delete('/prestamos/eliminar/:id', eliminarPrestamos);
router.put('/prestamos/actualizar/:id', actualizarPrestamos);
router.get('/prestamos/buscar/:id', consultarPrestamos);

export default router;