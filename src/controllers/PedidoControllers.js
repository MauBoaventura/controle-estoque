const connection = require('../database/connection');
const models = require("../database/models/init-models");
const conexao = models(connection);
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
    async index(req, res) {
        if (!Object.keys(req.query).length === 0) {
            const data_pedido = req.query.data_pedido ?? "";
            const lote = req.query.lote ?? "";
            const fornecedor_id = req.query.fornecedor_id ?? "";
            const dolar_compra = req.query.dolar_compra ?? "";
            const quantidade_solicitada = req.query.quantidade_solicitada ?? "";
            const valor_produto = req.query.valor_produto ?? "";
            const quantidade_recebida = req.query.quantidade_recebida ?? "";
            const produto_id = req.query.produto_id ?? "";
            const freteiro_id = req.query.freteiro_id ?? "";
            const total_nota = req.query.total_nota ?? "";
            const total_recebido = req.query.total_recebido ?? "";
            try {
                let data = await conexao.pedidos_fornecedor.findAll({
                    where: {
                        data_pedido: {
                            [Op.like]: `%${data_pedido}%`
                        },
                        lote: {
                            [Op.like]: `%${lote}%`
                        },
                        fornecedor_id: {
                            [Op.like]: `%${fornecedor_id}%`
                        },
                        dolar_compra: {
                            [Op.like]: `%${dolar_compra}%`
                        },
                        quantidade_solicitada: {
                            [Op.like]: `%${quantidade_solicitada}%`
                        },
                        valor_produto: {
                            [Op.like]: `%${valor_produto}%`
                        },
                        quantidade_recebida: {
                            [Op.like]: `%${quantidade_recebida}%`
                        },
                        produto_id: {
                            [Op.like]: `%${produto_id}%`
                        },
                        freteiro_id: {
                            [Op.like]: `%${freteiro_id}%`
                        },
                        total_nota: {
                            [Op.like]: `%${total_nota}%`
                        },
                        total_recebido: {
                            [Op.like]: `%${total_recebido}%`
                        },
                    },
                    include: [{
                        association: "fornecedor",
                        attributes: ['id', 'nome'],
                        required: true
                    }]
                });
                if ((data))
                    return res.status(200).json(data)
                else
                    return res.status(401).json({
                        msg: "Pedido não cadastrado!"
                    })

            } catch (error) {
                return res.status(401).json({
                    msg: "Ocoreu um erro!",
                    error
                })
            }
        } else {
            try {
                const data = await conexao.pedidos_fornecedor.findAll({
                    include: [{
                        association: "fornecedor",
                        attributes: ['id', 'nome'],
                        required: true
                    }]
                });
                return res.json(data);
            } catch (error) {
                return res.status(401).json({
                    msg: "Ocoreu um erro!",
                    error
                })
            }
        }
    },

    async getOne(req, res) {
        const id = req.params.id;

        try {
            let data = await conexao.pedidos_fornecedor.findOne({ where: { id } });
            if ((data))
                return res.status(200).json(data)
            else
                return res.status(401).json({
                    msg: "Pedido não cadastrado!"
                })

        } catch (error) {
            return res.status(401).json({
                msg: "Ocoreu um erro!",
                error
            })
        }
    },

    async create(req, res) {
        try {
            let data = await conexao.pedidos_fornecedor.findAll({ where: req.body });
            if (!(data.length > 0))
                await conexao.pedidos_fornecedor.create(req.body);
            else
                return res.status(401).json({
                    msg: "Pedido já cadastrado!"
                })

        } catch (error) {
            return res.status(401).json({
                msg: "Ocoreu um erro!",
                error
            })
        }
        res.status(201).send()
    },

    async update(req, res) {
        const id = req.params.id;
        try {
            let data = await conexao.pedidos_fornecedor.findOne({ where: { id } });
            if ((data)) {
                data = await conexao.pedidos_fornecedor.update(req.body, { where: { id } });
                return res.status(200).json(data)
            }
            else
                return res.status(401).json({
                    msg: "Pedido não cadastrado!"
                })
        } catch (error) {
            console.log(error)
            return res.status(401).json({
                msg: "Ocoreu um erro!",
                error
            })
        }
    },

    async delete(req, res) {
        const id = req.params.id;
        try {
            let data = await conexao.pedidos_fornecedor.findOne({ where: { id } });
            if ((data)) {
                data = await conexao.pedidos_fornecedor.destroy({ where: { id } });
                return res.status(200).json(data)
            }
            else
                return res.status(401).json({
                    msg: "Pedido não cadastrado!"
                })
        } catch (error) {
            console.log(error)
            return res.status(401).json({
                msg: "Ocoreu um erro!",
                error
            })
        }
    }

};