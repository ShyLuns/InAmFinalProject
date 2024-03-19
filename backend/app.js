//library

import express from 'express'
import bodyParser from "body-parser";

//controllers

import usuarioRouter from './routes/usuario.router.js';
import prestamosRouter from './routes/prestamos.router.js';
import ambientesRouter from './routes/ambientes.router.js';
import novedadesRouter from './routes/novedades.router.js';
import elementosRouter from './routes/elementos.router.js';
import areasRouter from './routes/areas.router.js';

//documentation

import ejs from 'ejs';

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
app.use(elementosRouter);
app.use(areasRouter);

//documentation

app.set('view engine','ejs');
app.set('views','./views');
app.use(express.static('./views'));

app.get('/documents',(req, res)=> {
    res.render('documentation.ejs');
});

//start server

app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});