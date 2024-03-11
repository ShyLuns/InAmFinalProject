import express from 'express'
import bodyParser from "body-parser";
import usuarioRouter from './routes/usuario.router.js';
import prestamosRouter from './routes/prestamos.router.js';
import ambientesRouter from './routes/ambientes.router.js';
import novedadesRouter from './routes/novedades.router.js';

const app = express();
const PORT = 3000;

app.use(express.json());

//setting

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes

app.use(usuarioRouter);
app.use(prestamosRouter);
app.use(ambientesRouter);
app.use(novedadesRouter);

//start server

app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});