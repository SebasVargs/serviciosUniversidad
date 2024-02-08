const express = require('express')
const app = express()
const path = require('path');
const cors = require('cors')
const port = 3000;
const mysql = require('mysql')

app.use(cors())
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'servicios'
  })
// Manejador de errores de conexión
connection.connect((error) => {
    if (error) {
        console.error('Error al conectar a la base de datos:', error);
        return;
    }
    console.log('Conexión exitosa a la base de datos MySQL');
});

// Ruta para obtener datos de la base de datos
app.get('/usuario/:id', (req, res) => {
    const idUsuario = req.params.id;

    connection.query('SELECT * FROM usuario WHERE id = ?', [idUsuario], (error, results) => {
        if (error) {
            console.error('Error al obtener datos del usuario:', error);
            res.status(500).send('Error al obtener datos del usuario');
            return;
        }

        if (results.length === 0) {
            res.status(404).send('Usuario no encontrado');
            return;
        }

        res.json(results[0]);
    });
});

// Inicia el servidor Express
app.listen(port, () => {
    console.log(`Servidor Express en ejecución en el puerto ${port}`);
});