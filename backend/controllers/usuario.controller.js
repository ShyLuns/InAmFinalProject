import { pool } from '../database/conexion.js';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

//para listar los usuarios

export const obtenerUsuarios = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM usuario');
        res.status(200).json({
            status: '200',
            mensaje: 'Usuarios listados con éxito',
            usuarios: rows
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: '500',
            mensaje: 'Error al obtener usuarios'
        });
    }
};

// Obtener un usuario por ID
export const obtenerUsuarioPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const [usuario] = await pool.query('SELECT * FROM usuario WHERE id_usuario = ?', [id]);

        if (usuario.length > 0) {
            res.status(200).json({
                mensaje: 'Usuario encontrado con éxito',
                usuario: usuario[0]
            });
        } else {
            res.status(404).json({
                mensaje: 'Usuario no encontrado'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'Error al obtener usuario'
        });
    }
};

// Crear un nuevo usuario
export const crearUsuario = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    

    const nuevoUsuario = req.body;
  
    try {

        const [usuarios] = await pool.query('SELECT * FROM usuario WHERE correo = ?', [nuevoUsuario.correo]);
        if (usuarios.length > 0) {
            return res.status(400).json({ mensaje: 'El correo electrónico ya está registrado' });
        }

        const [usuariosIdentificacion] = await pool.query('SELECT * FROM usuario WHERE identificacion = ?', [nuevoUsuario.identificacion]);
        if (usuariosIdentificacion.length > 0) {
            return res.status(400).json({ mensaje: 'La identificación ya está registrada' });
        }

        const estadoUsuario = nuevoUsuario.estado_usuario || 'activo';

      const query = `
        INSERT INTO usuario 
        (tipo_usuario, nombre, correo, telefono, identificacion, contraseña, estado_usuario) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`;
  
      const [result] = await pool.query(query, [
        nuevoUsuario.tipo_usuario,
        nuevoUsuario.nombre,
        nuevoUsuario.correo,
        nuevoUsuario.telefono,
        nuevoUsuario.identificacion,
        nuevoUsuario.contraseña,
        nuevoUsuario.estado_usuario || 'activo',
      ]);
  
      const usuarioCreado = {
        id: result.insertId,
        ...nuevoUsuario,
      };
  
      res.status(201).json({
        mensaje: 'Usuario creado con éxito',
        usuario: usuarioCreado,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al crear usuario' });
    }
  };

// Actualizar un usuario
export const actualizarUsuario = async (req, res) => {
    const { id } = req.params;
    const datosUsuario = req.body;

    try {
        const query = `
            UPDATE usuario 
            SET tipo_usuario = ?, nombre = ?, correo = ?, telefono = ?, identificacion = ?, contraseña = ? 
            WHERE id_usuario = ?`;

        await pool.query(query, [
            datosUsuario.tipo_usuario,
            datosUsuario.nombre,
            datosUsuario.correo,
            datosUsuario.telefono,
            datosUsuario.identificacion,
            datosUsuario.contraseña,
            id,
        ]);

        // Obtener los datos actualizados del usuario
        const [usuarioActualizado] = await pool.query('SELECT * FROM usuario WHERE id_usuario = ?', [id]);

        res.status(200).json({
            mensaje: 'Usuario actualizado exitosamente',
            usuario: usuarioActualizado[0],
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al actualizar usuario' });
    }
};

// Eliminar un usuario
export const eliminarUsuario = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('DELETE FROM usuario WHERE id_usuario = ?', [id]);

        if (result.affectedRows > 0) {
            res.status(200).json({ mensaje: 'Usuario eliminado exitosamente' });
        } else {
            res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al eliminar usuario' });
    }
};

// Validar credenciales del usuario
export const validarCredenciales = async (req, res) => {
    const { identificacion, contraseña } = req.body;

    try {
        const [usuario] = await pool.query('SELECT id_usuario, nombre, correo FROM usuario WHERE identificacion = ? AND contraseña = ?', [identificacion, contraseña]);

        if (usuario.length > 0) {
            // Credenciales válidas, generar token JWT
            const token = jwt.sign({ userId: usuario[0].id_usuario }, 'tu_clave_secreta');
            res.status(200).json({
                mensaje: 'Credenciales válidas',
                usuario: {
                    id_usuario: usuario[0].id_usuario,
                    nombre: usuario[0].nombre,
                    correo: usuario[0].correo
                },
                token
            });
        } else {
            // Credenciales inválidas
            res.status(401).json({ mensaje: 'Credenciales inválidas' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al validar las credenciales' });
    }
};

export const simularLogout = (req, res) => {

    res.json({ mensaje: 'Sesión cerrada exitosamente' });
};

export const cambiarEstadoUsuario = async (req, res) => {
    const { identificacion } = req.params;
    const { nuevoEstado } = req.body;

    try {
        // Verificar si el usuario existe
        const [usuario] = await pool.query('SELECT * FROM usuario WHERE identificacion = ?', [identificacion]);

        if (usuario.length === 0) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        // Actualizar el estado del usuario
        await pool.query('UPDATE usuario SET estado_usuario = ? WHERE identificacion = ?', [nuevoEstado, identificacion]);

        // Obtener los datos actualizados del usuario
        const [usuarioActualizado] = await pool.query('SELECT * FROM usuario WHERE identificacion = ?', [identificacion]);

        res.status(200).json({
            mensaje: 'Estado del usuario actualizado exitosamente',
            usuario: usuarioActualizado[0],
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al cambiar el estado del usuario' });
    }
};