import { pool } from "../database/conexion.js";

//listar todos los prestamos

export const listarPrestamo = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM prestamo');
        res.status(200).json(result);
    } catch (error) {
        console.error('Error al listar préstamos:', error);
        res.status(500).json({ mensaje: 'Error al obtener la lista de préstamos' });
    }
};

//registrar prestamos

export const registrarPrestamos = async (req, res) => {
    try {
        const {
            id_prestamo,
            nombre_ambiente,
            fecha_prestamo,
            fecha_entrega,
            nombre_celador,
            observaciones,
            fk_usuario,
            fk_ambiente
        } = req.body;

        const sql = `
            INSERT INTO prestamo
            (id_prestamo, nombre_ambiente, fecha_prestamo, fecha_entrega, nombre_celador, observaciones, fk_usuario, fk_ambiente) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

        const [result] = await pool.query(sql, [
            id_prestamo,
            nombre_ambiente,
            fecha_prestamo,
            fecha_entrega,
            nombre_celador,
            observaciones,
            fk_usuario,
            fk_ambiente
        ]);

        if (result.affectedRows > 0) {
            return res.status(200).json({ message: 'Se registró con éxito el préstamo' });
        } else {
            return res.status(403).json({ message: 'Préstamo no registrado' });
        }
    } catch (error) {
        console.error('Error al registrar préstamo:', error);
        return res.status(500).json({ message: 'Error al registrar préstamo' });
    }
};

//actualizar un prestamo

export const actualizarPrestamos = async (req, res) => {
    try {
        const id = req.params.id;
        const {
            nombre_ambiente,
            fecha_prestamo,
            fecha_entrega,
            nombre_celador,
            observaciones,
            fk_usuario,
            fk_ambiente
        } = req.body;

        const sql = `
            UPDATE prestamo
            SET nombre_ambiente = ?, 
                fecha_prestamo = ?, 
                fecha_entrega = ?, 
                nombre_celador = ?, 
                observaciones = ?, 
                fk_usuario = ?, 
                fk_ambiente = ? 
            WHERE id_prestamo = ?`;

        const [result] = await pool.query(sql, [
            nombre_ambiente,
            fecha_prestamo,
            fecha_entrega,
            nombre_celador,
            observaciones,
            fk_usuario,
            fk_ambiente,
            id
        ]);

        if (result.affectedRows > 0) {
            return res.status(200).json({ message: 'Préstamo actualizado con éxito' });
        } else {
            return res.status(403).json({ message: 'Préstamo no actualizado' });
        }
    } catch (error) {
        console.error('Error al actualizar préstamo:', error);
        return res.status(500).json({ message: 'Error al actualizar préstamo' });
    }
};

//eliminar un prestamo

export const eliminarPrestamos = async (req, res) => {
    try {
        const id = req.params.id;

        const sql = 'DELETE FROM prestamo WHERE id_prestamo = ?';
        const [result] = await pool.query(sql, [id]);

        if (result.affectedRows > 0) {
            return res.status(200).json({ message: 'Préstamo eliminado con éxito' });
        } else {
            return res.status(403).json({ message: 'Préstamo no eliminado' });
        }
    } catch (error) {
        console.error('Error al eliminar préstamo:', error);
        return res.status(500).json({ message: 'Error al eliminar préstamo' });
    }
};

//buscar un prestamo

export const consultarPrestamos = async (req, res) => {
    try {
        const id = req.params.id;

        const sql = 'SELECT * FROM prestamo WHERE id_prestamo = ?';
        const [rows] = await pool.query(sql, [id]);

        if (rows.length > 0) {
            return res.status(200).json(rows);
        } else {
            return res.status(404).json({ message: 'Préstamo no encontrado' });
        }
    } catch (error) {
        console.error('Error al consultar préstamo:', error);
        return res.status(500).json({ message: 'Error al consultar préstamo' });
    }
};