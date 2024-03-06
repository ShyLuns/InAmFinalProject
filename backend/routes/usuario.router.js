import { Router } from "express";
import {obtenerUsuarios, obtenerUsuarioPorId, crearUsuario, actualizarUsuario, eliminarUsuario, validarCredenciales, simularLogout, cambiarEstadoUsuario} from '../controllers/usuario.controller.js';

const router = Router();

router.get('/usuarios/listar', obtenerUsuarios);
router.get('/usuarios/buscar/:id', obtenerUsuarioPorId);
router.post('/usuarios/registrar', crearUsuario);
router.put('/usuarios/actualizar/:id', actualizarUsuario);
router.delete('/usuarios/eliminar/:id', eliminarUsuario);

router.post('/usuarios/validar', validarCredenciales);
router.post('/usuarios/logout', simularLogout);
router.put('/usuarios/cambiar-estado/:identificacion', cambiarEstadoUsuario);

export default router;
