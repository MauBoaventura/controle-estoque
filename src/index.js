require('dotenv').config()
const express = require('express')
const cors = require('cors')
const routes = require('./router/router')

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}

var port = normalizePort(process.env.PORT || '3000');

//Poe o servidor para rodar ma porta especificada
app.listen(port, function () {
    console.log("Servidor online rodando na porta: " + port);
});