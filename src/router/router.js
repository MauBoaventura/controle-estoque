const express = require('express')
const {FreteiroControllers, FornecedorControllers}   = require('../controllers')

const routes = express.Router()

routes.get('/', (req, res) => {
    res.send('Controle-estoque online!');
})

// Freteiro
routes.get('/api/freteiro', FreteiroControllers.index)
routes.get('/api/freteiro/:id', FreteiroControllers.getOne)
routes.post('/api/freteiro', FreteiroControllers.create)
routes.put('/api/freteiro/:id', FreteiroControllers.update)
routes.delete('/api/freteiro/:id', FreteiroControllers.delete)

// Fornecedor
routes.get('/api/fornecedor', FornecedorControllers.index)
routes.get('/api/fornecedor/:id', FornecedorControllers.getOne)
routes.post('/api/fornecedor', FornecedorControllers.create)
routes.put('/api/fornecedor/:id', FornecedorControllers.update)
routes.delete('/api/fornecedor/:id', FornecedorControllers.delete)

// // Users
// routes.get('/user', UserControllers.index)
// routes.get('/user/:id', UserControllers.get)
// routes.post('/user', UserControllers.create)
// routes.put('/user/:id', UserControllers.update)
// routes.delete('/user/:id', UserControllers.delete)


module.exports = routes
