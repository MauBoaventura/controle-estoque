const express = require('express')
const {FreteiroControllers, FornecedorControllers, ProdutoControllers,TaxaTransporteProdutoControllers,PedidoControllers}   = require('../controllers')

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

// Produto
routes.get('/api/produto', ProdutoControllers.index)
routes.get('/api/produto/:id', ProdutoControllers.getOne)
routes.post('/api/produto', ProdutoControllers.create)
routes.put('/api/produto/:id', ProdutoControllers.update)
routes.delete('/api/produto/:id', ProdutoControllers.delete)

// Taxa
routes.get('/api/taxa', TaxaTransporteProdutoControllers.index)
routes.get('/api/taxa/:id', TaxaTransporteProdutoControllers.getOne)
routes.post('/api/taxa', TaxaTransporteProdutoControllers.create)
routes.put('/api/taxa/:id', TaxaTransporteProdutoControllers.update)
routes.delete('/api/taxa/:id', TaxaTransporteProdutoControllers.delete)

// Pedido
routes.get('/api/pedido', PedidoControllers.index)
routes.get('/api/pedido/:id', PedidoControllers.getOne)
routes.post('/api/pedido', PedidoControllers.create)
routes.put('/api/pedido/:id', PedidoControllers.update)
routes.delete('/api/pedido/:id', PedidoControllers.delete)


module.exports = routes
