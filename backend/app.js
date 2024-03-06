import express from 'express'
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

app.use(express.json());

//setting

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes

app.get('/', (req, res) => {
    res.send('¡Hola, esta es tu API!');
});


//start server

app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});