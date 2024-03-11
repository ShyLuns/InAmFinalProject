import { pool } from "../database/conexion.js";

//para listar todas las novedades

export const listarNovedad = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM novedad');

        if (result.length > 0) {
            return res.status(200).json({
                mensaje: 'Novedades listadas con éxito',
                novedades: result
            });
        } else {
            return res.status(404).json({ mensaje: 'No se encontraron novedades' });
        }
    } catch (error) {
        console.error('Error al listar novedades:', error);
        return res.status(500).json({ mensaje: 'Error al listar novedades' });
    }
};

//para registrar una novedad

export const registrarNovedad = async (req, res) => {
    try {
        const { tipo_novedad, descripcion_novedad, responsable_registro, fecha_novedad, fk_id_prestamo } = req.body;
        const sql = 'INSERT INTO novedad (tipo_novedad, descripcion_novedad, responsable_registro, fecha_novedad, fk_id_prestamo) VALUES (?, ?, ?, ?, ?)';
        const [result] = await pool.query(sql, [tipo_novedad, descripcion_novedad, responsable_registro, fecha_novedad, fk_id_prestamo]);

        if (result.affectedRows > 0) {
            return res.status(200).json({ mensaje: 'Novedad registrada con éxito', id: result.insertId });
        } else {
            return res.status(403).json({ mensaje: 'Novedad no registrada' });
        }
    } catch (error) {
        console.error('Error al registrar novedad:', error);
        return res.status(500).json({ mensaje: 'Error al registrar novedad' });
    }
};

//para eliminar una novedad

export const eliminarNovedad = async (req, res) => {
    try {
        const id = req.params.id;
        const sql = 'DELETE FROM novedad WHERE id_novedad = ?';
        const [result] = await pool.query(sql, [id]);

        if (result.affectedRows > 0) {
            return res.status(200).json({ mensaje: `Novedad eliminada con éxito: ${id}` });
        } else {
            return res.status(403).json({ mensaje: 'Novedad no eliminada' });
        }
    } catch (error) {
        console.error('Error al eliminar novedad:', error);
        return res.status(500).json({ mensaje: 'Error al eliminar novedad' });
    }
};

//para actualizar una novedad

export const actualizarNovedad = async (req, res) => {
    try {
        const id = req.params.id;
        const { tipo_novedad, descripcion_novedad, responsable_registro, fecha_novedad, fk_id_prestamo } = req.body;
        const sql = 'UPDATE novedad SET tipo_novedad = ?, descripcion_novedad = ?, responsable_registro = ?, fecha_novedad = ?, fk_id_prestamo = ? WHERE id_novedad = ?';
        const [result] = await pool.query(sql, [tipo_novedad, descripcion_novedad, responsable_registro, fecha_novedad, fk_id_prestamo, id]);

        if (result.affectedRows > 0) {

            const [novedadActualizada] = await pool.query('SELECT * FROM novedad WHERE id_novedad = ?', [id]);

            return res.status(200).json({
                mensaje: 'Novedad actualizada con éxito',
                novedad: novedadActualizada[0]
            });
        } else {
            return res.status(403).json({ mensaje: 'Novedad no actualizada' });
        }
    } catch (error) {
        console.error('Error al actualizar novedad:', error);
        return res.status(500).json({ mensaje: 'Error al actualizar novedad' });
    }
};

//para buscar una novedad

export const consultarNovedad = async (req, res) => {
    try {
        const id = req.params.id;
        const sql = 'SELECT * FROM novedad WHERE id_novedad = ?';
        const [rows] = await pool.query(sql, [id]);

        if (rows.length > 0) {
            return res.status(200).json({
                mensaje: 'Novedad consultada con éxito',
                novedad: rows[0]
            });
        } else {
            return res.status(404).json({ mensaje: 'Novedad no encontrada' });
        }
    } catch (error) {
        console.error('Error al consultar novedad:', error);
        return res.status(500).json({ mensaje: 'Error al consultar novedad' });
    }
};

