import { pool } from "../database/conexion.js"

//para listar todos los elementos

export const listarElementos = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM elementos');

        if (result.length > 0) {
            return res.status(200).json({
                mensaje: 'Elementos listados con éxito',
                elementos: result
            });
        } else {
            return res.status(404).json({ mensaje: 'No se encontraron elementos' });
        }
    } catch (error) {
        console.error('Error al listar elementos:', error);
        return res.status(500).json({ mensaje: 'Error al listar elementos' });
    }
};

//para registrar un elemento

export const registrarElemento = async (req, res) => {
    try {
        const { codigo_sena, estado, nombre_elemento, tipo_elemento, fk_ambiente } = req.body;
        const sql = 'INSERT INTO elementos (codigo_sena, estado, nombre_elemento, tipo_elemento, fk_ambiente) VALUES (?, ?, ?, ?, ?)';

        const [rows] = await pool.query(sql, [codigo_sena, estado, nombre_elemento, tipo_elemento, fk_ambiente]);

        if (rows.affectedRows > 0) {

            const [elementoRegistrado] = await pool.query('SELECT * FROM elementos WHERE id_elementos = ?', [rows.insertId]);

            return res.status(200).json({
                mensaje: 'Elemento registrado con éxito',
                elemento: elementoRegistrado[0]
            });
        } else {
            return res.status(403).json({ mensaje: 'Elemento no registrado' });
        }
    } catch (error) {
        console.error('Error al registrar elemento:', error);
        return res.status(500).json({ mensaje: 'Error al registrar elemento' });
    }
};

//para eliminar un elemento

export const eliminarElemento = async (req, res) => {
    try {
        const id = req.params.id;
        const sql = 'DELETE FROM elementos WHERE codigo_sena = ?';
        const [rows] = await pool.query(sql, [id]);

        if (rows.affectedRows > 0) {
            return res.status(200).json({ mensaje: `Elemento con código SENA ${id} eliminado con éxito` });
        } else {
            return res.status(403).json({ mensaje: 'Elemento no eliminado' });
        }
    } catch (error) {
        console.error('Error al eliminar elemento:', error);
        return res.status(500).json({ mensaje: 'Error al eliminar elemento' });
    }
};

//para actualizar un elemento

export const actualizarElemento = async (req, res) => {
    try {
        const id = req.params.id;
        const { codigo_sena, estado, nombre_elemento, tipo_elemento, nota_cambio, cambios, fk_ambiente } = req.body;
        const sql = 'UPDATE elementos SET codigo_sena = ?, estado = ?, nombre_elemento = ?, tipo_elemento = ?, nota_cambio = ?, cambios = ?, fk_ambiente = ? WHERE codigo_sena = ?';

        const [rows] = await pool.query(sql, [codigo_sena, estado, nombre_elemento, tipo_elemento, nota_cambio, cambios, fk_ambiente, id]);

        if (rows.affectedRows > 0) {

            const [elementoActualizado] = await pool.query('SELECT * FROM elementos WHERE id_elementos = ?', [id]);

            return res.status(200).json({
                mensaje: 'Elemento actualizado con éxito',
                elemento: elementoActualizado[0]
            });
        } else {
            return res.status(403).json({ mensaje: 'Elemento no actualizado' });
        }
    } catch (error) {
        console.error('Error al actualizar elemento:', error);
        return res.status(500).json({ mensaje: 'Error al actualizar elemento' });
    }
};

//para buscar un elemento

export const consultarElemento = async (req, res) => {
    try {
        const id = req.params.id;
        const sql = 'SELECT * FROM elementos WHERE codigo_sena = ?';
        const [rows] = await pool.query(sql, [id]);

        if (rows.length > 0) {
            return res.status(200).json(rows[0]);
        } else {
            return res.status(404).json({ mensaje: 'Elemento no encontrado' });
        }
    } catch (error) {
        console.error('Error al consultar elemento:', error);
        return res.status(500).json({ mensaje: 'Error al consultar elemento' });
    }
};


