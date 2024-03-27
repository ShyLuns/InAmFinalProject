import { Router } from "express";
import { obtenerUsuarios, obtenerUsuarioPorId, crearUsuario, actualizarUsuario, eliminarUsuario, validarCredenciales, simularLogout, cambiarEstadoUsuario, obtenerUsuariosPorEstado } from '../controllers/usuario.controller.js';
import { body } from 'express-validator';

const router = Router();

router.get('/usuarios/listar', obtenerUsuarios);
router.get('/usuarios/buscar/:id', obtenerUsuarioPorId);
router.post(
    '/usuarios/registrar',

    [
        body('nombre')
            .not().isEmpty().withMessage('El nombre es obligatorio')
            .isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener entre 3 y 50 caracteres'),
            
        body('identificacion').isLength({ min: 6 }).withMessage('La identificación debe tener al menos 6 caracteres'),
        body('telefono').isLength({ min: 10 }).withMessage('El teléfono debe tener al menos 10 caracteres'),
        body('correo').isEmail().withMessage('Ingrese un correo electrónico válido'),
        body('contraseña').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
        body('tipo_usuario').not().isEmpty().withMessage('El tipo de usuario es obligatorio'),
    ],

    crearUsuario
);

router.put('/usuarios/actualizar/:id', actualizarUsuario);
router.delete('/usuarios/eliminar/:id', eliminarUsuario);

router.post('/usuarios/validar', validarCredenciales);
router.post('/usuarios/logout', simularLogout);
router.put('/usuarios/cambiar-estado/:identificacion', cambiarEstadoUsuario);

router.get('/usuarios/estado/:estado', obtenerUsuariosPorEstado);

export default router;
