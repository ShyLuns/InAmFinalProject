import express from 'express'
import bodyParser from "body-parser";
import usuarioRouter from './routes/usuario.router.js';

const app = express();
const PORT = 3000;

app.use(express.json());

//setting

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes

app.use(usuarioRouter);

//start server

app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});