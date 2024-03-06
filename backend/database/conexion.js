import {createPool} from 'mysql2/promise';
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