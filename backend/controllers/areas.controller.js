import { pool } from "../database/conexion.js";

//para listar todas las areas

export const listarAreas = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM areas');

        if (result.length > 0) {
            return res.status(200).json(result);
        } else {
            return res.status(404).json({ mensaje: 'No se encontraron áreas' });
        }
    } catch (error) {
        console.error('Error al listar áreas:', error);
        return res.status(500).json({ mensaje: 'Error al obtener la lista de áreas' });
    }
};

//para registrar un area

export const registrarArea = async (req, res) => {
    try {
        const { nombre_area, estado } = req.body;
        const sql = 'INSERT INTO areas (nombre_area, estado) VALUES (?, ?)';
        const [result] = await pool.query(sql, [nombre_area, estado]);

        if (result.affectedRows > 0) {
            const idAreaRegistrada = result.insertId;
            const areaRegistrada = { id: idAreaRegistrada, nombre_area, estado };
            return res.status(200).json({ mensaje: 'Área registrada con éxito', areaRegistrada });
        } else {
            return res.status(403).json({ mensaje: 'No se registró el área' });
        }
    } catch (error) {
        console.error('Error al registrar área:', error);
        return res.status(500).json({ mensaje: 'Error al registrar área' });
    }
};

//para actualizar un area

export const actualizarArea = async (req, res) => {
    try {
        const id = req.params.id;
        const { nombre_area, estado } = req.body;
        const sql = 'UPDATE areas SET nombre_area = ?, estado = ? WHERE id_area = ?';
        const [rows] = await pool.query(sql, [nombre_area, estado, id]);

        if (rows.affectedRows > 0) {
            const areaActualizada = { id: Number(id), nombre_area, estado };
            return res.status(200).json({ mensaje: 'Área actualizada con éxito', areaActualizada });
        } else {
            return res.status(403).json({ mensaje: 'No se actualizó el área' });
        }
    } catch (error) {
        console.error('Error al actualizar área:', error);
        return res.status(500).json({ mensaje: 'Error al actualizar área' });
    }
};

//para eliminar un area

export const eliminarArea = async (req, res) => {
    try {
        const id = req.params.id;
        const sql = 'DELETE FROM areas WHERE id_area = ?';
        const [rows] = await pool.query(sql, [id]);

        if (rows.affectedRows > 0) {
            return res.status(200).json({ mensaje: 'Área eliminada con éxito', id_area: Number(id) });
        } else {
            return res.status(403).json({ mensaje: 'El área no se eliminó', id_area: Number(id) });
        }
    } catch (error) {
        console.error('Error al eliminar área:', error);
        return res.status(500).json({ mensaje: 'Error al eliminar área' });
    }
};

//para buscar un area

export const consultarArea = async (req, res) => {
    try {
        const id = req.params.id;
        const sql = 'SELECT * FROM areas WHERE id_area = ?';

        const [rows] = await pool.query(sql, [id]);
        if (rows.length > 0) {
            return res.status(200).json({ mensaje: 'Área encontrada con éxito', area: rows[0] });
        } else {
            return res.status(404).json({ mensaje: 'No se encontró el área', id_area: Number(id) });
        }
    } catch (error) {
        console.error('Error al consultar área:', error);
        return res.status(500).json({ mensaje: 'Error al consultar área' });
    }
};