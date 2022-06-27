const express = require('express')
const routes = express.Router()

// const { UserControllers, SyncControllers, ServidoresControllers, UsuariosControllers } = require('../controllers')

routes.get('/', (req, res) => {
    res.send('Controle-estoque online!');
})

// // Sync
// routes.get('/sync/:database', SyncControllers.get)

// // Servidores
// routes.get('/api/:database/servidores', ServidoresControllers.get)

// // Usuarios
// routes.get('/api/:database/usuarios', UsuariosControllers.index)
// routes.get('/api/:database/usuarios/:id', UsuariosControllers.getOne)

// routes.get('/api/:database/util', UsuariosControllers.util)

// // Users
// routes.get('/user', UserControllers.index)
// routes.get('/user/:id', UserControllers.get)
// routes.post('/user', UserControllers.create)
// routes.put('/user/:id', UserControllers.update)
// routes.delete('/user/:id', UserControllers.delete)


module.exports = routes
