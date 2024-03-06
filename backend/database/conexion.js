import { createPool } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

console.log(process.env.DB_HOST)

export const pool = createPool(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        database: process.env.DB_DATABASE
    }
);

// Manejar errores durante la creación del pool
pool.getConnection()
    .then(connection => {
        console.log('Conectado al pool de MySQL');
        connection.release(); // Liberar la conexión después de la prueba exitosa
    })
    .catch(error => {
        console.error('Error al conectar al pool de MySQL:', error);
    });

export default pool;