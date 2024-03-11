import { pool } from "../database/conexion.js";

//para listar un ambiente

export const listarAmbientes = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM ambientes');

        if (result.length > 0) {
            return res.status(200).json({
                mensaje: 'Ambientes listados con éxito',
                ambientes: result
            });
        } else {
            return res.status(404).json({ mensaje: 'No se encontraron ambientes' });
        }
    } catch (error) {
        console.error('Error al listar ambientes:', error);
        return res.status(500).json({ mensaje: 'Error al obtener la lista de ambientes' });
    }
};

//para registrar un ambiente

export const registrarAmbiente = async (req, res) => {
    try {
        const { nombre_ambiente, estado_ambiente, fk_area } = req.body;
        const sql = 'INSERT INTO ambientes (nombre_ambiente, estado_ambiente, fk_area) VALUES (?, ?, ?)';
        const [result] = await pool.query(sql, [nombre_ambiente, estado_ambiente, fk_area]);

        if (result.affectedRows > 0) {
            return res.status(200).json({ mensaje: 'Ambiente registrado con éxito', id: result.insertId });
        } else {
            return res.status(403).json({ mensaje: 'Ambiente no registrado' });
        }
    } catch (error) {
        console.error('Error al registrar ambiente:', error);
        return res.status(500).json({ mensaje: 'Error al registrar ambiente' });
    }
};

//para eliminar un ambiente

export const eliminarAmbiente = async (req, res) => {
    try {
        const id = req.params.id;
        const sql = 'DELETE FROM ambientes WHERE id_ambiente = ?';
        const [result] = await pool.query(sql, [id]);

        if (result.affectedRows > 0) {
            return res.status(200).json({ mensaje: `Ambiente eliminado con éxito: ${id}` });
        } else {
            return res.status(403).json({ mensaje: 'Ambiente no eliminado' });
        }
    } catch (error) {
        console.error('Error al eliminar ambiente:', error);
        return res.status(500).json({ mensaje: 'Error al eliminar ambiente' });
    }
};

//para actualizar un ambiente

export const actualizarAmbiente = async (req, res) => {
    try {
        const id = req.params.id;
        const { nombre_ambiente, estado_ambiente, fk_area } = req.body;
        const sql = 'UPDATE ambientes SET nombre_ambiente = ?, estado_ambiente = ?, fk_area = ? WHERE id_ambiente = ?';
        const [result] = await pool.query(sql, [nombre_ambiente, estado_ambiente, fk_area, id]);

        if (result.affectedRows > 0) {

            const [ambienteActualizado] = await pool.query('SELECT * FROM ambientes WHERE id_ambiente = ?', [id]);

            return res.status(200).json({
                mensaje: 'Ambiente actualizado con éxito',
                ambiente: ambienteActualizado[0]
            });
        } else {
            return res.status(403).json({ mensaje: 'Ambiente no actualizado' });
        }
    } catch (error) {
        console.error('Error al actualizar ambiente:', error);
        return res.status(500).json({ mensaje: 'Error al actualizar ambiente' });
    }
};

// para buscar un ambiente

export const consultarAmbiente = async (req, res) => {
    try {
        const id = req.params.id;
        const sql = 'SELECT * FROM ambientes WHERE id_ambiente = ?';
        const [rows] = await pool.query(sql, [id]);

        if (rows.length > 0) {
            return res.status(200).json({
                mensaje: 'Ambiente consultado con éxito',
                ambiente: rows[0]
            });
        } else {
            return res.status(404).json({ mensaje: 'Ambiente no encontrado' });
        }
    } catch (error) {
        console.error('Error al consultar ambiente:', error);
        return res.status(500).json({ mensaje: 'Error al consultar ambiente' });
    }
};

