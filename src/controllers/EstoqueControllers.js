const connection = require('../database/connection');
const models = require("../database/models/init-models");
const conexao = models(connection);
const Sequelize = require('sequelize');
const Op = Sequelize.Op

module.exports = {
    async index(req, res) {
        if (!(Object.keys(req.query).length === 0)) {
            const pedidos_fornecedor_id = req.query.pedidos_fornecedor_id ?? "";
            if (req.query?.group) {
                const byNota = req.query.by_nota ?? "";
                if (byNota) {
                    try {
                        let data = await conexao.estoque.findAll({
                            attributes: [
                                '*',
                                'id',
                                'pedidos_fornecedor_id',
                                'valor_venda',
                                [Sequelize.fn("COUNT", Sequelize.col("pedidos_fornecedor.produto_id")), "total_produtos_em_estoque"],
                            ],
                            include: [{
                                association: "pedidos_fornecedor",
                                include: [{
                                    association: "produto"
                                }]
                            },
                            {
                                association: "pedidos_fornecedor",
                                include: [{
                                    association: "taxa_transporte_produto"
                                }]
                            }],
                            group: ['pedidos_fornecedor.produto_id', 'pedidos_fornecedor.nota']
                        });
                        if ((data))
                            return res.status(200).json(data)
                        else
                            return res.status(205).json({
                                msg: "Estoque não cadastrado!"
                            })
    
                    } catch (error) {
                        return res.status(401).json({
                            msg: "Ocoreu um erro!",
                            error
                        })
                    }
                } else {
                    try {
                        let data = await conexao.estoque.findAll({
                            attributes: [
                                '*',
                                'id',
                                'pedidos_fornecedor_id',
                                'valor_venda',
                                [Sequelize.fn("COUNT", Sequelize.col("pedidos_fornecedor.produto_id")), "total_produtos_em_estoque"],
                            ],
                            include: [{
                                association: "pedidos_fornecedor",
                                include: [{
                                    association: "produto"
                                }]
                            },
                            {
                                association: "pedidos_fornecedor",
                                include: [{
                                    association: "taxa_transporte_produto"
                                }]
                            }],
                            group: ['pedidos_fornecedor.produto_id']
                        });
                        if ((data))
                            return res.status(200).json(data)
                        else
                            return res.status(205).json({
                                msg: "Estoque não cadastrado!"
                            })

                    } catch (error) {
                        return res.status(401).json({
                            msg: "Ocoreu um erro!",
                            error
                        })
                    }
                }

            } else
                try {
                    let data = await conexao.estoque.findAll({
                        where: {
                            pedidos_fornecedor_id,
                        },
                        include: [{
                            all: true,
                            include: [{
                                all: true
                            }]
                        }],

                    });
                    if ((data))
                        return res.status(200).json(data)
                    else
                        return res.status(205).json({
                            msg: "Estoque não cadastrado!"
                        })

                } catch (error) {
                    return res.status(401).json({
                        msg: "Ocoreu um erro!",
                        error
                    })
                }
        } else {
            try {
                const data = await conexao.estoque.findAll(
                    {
                        include: [{
                            all: true,
                            include: [{
                                all: true
                            }],
                            // paranoid: false
                        }],
                    }
                );
                if ((data))
                    return res.status(200).json(data)
                else
                    return res.status(401).json({
                        msg: "Estoque não cadastrado!"
                    })
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
            let data = await conexao.estoque.findOne({ where: { id } });
            if ((data))
                return res.status(200).json(data)
            else
                return res.status(401).json({
                    msg: "Estoque não cadastrado!"
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
            await conexao.estoque.create(req.body);
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
        if (!(Object.keys(req.query).length === 0)) {
            const pedidos_fornecedor_id = req.query.pedidos_fornecedor_id ?? "";
            try {
                let data = await conexao.estoque.update(req.body, { where: { pedidos_fornecedor_id } });
                return res.status(200).json(data)
            } catch (error) {
                console.log(error)
                return res.status(401).json({
                    msg: "Ocoreu um erro!",
                    error
                })
            }
        }

        try {
            let data = await conexao.estoque.findOne({ where: { id } });
            if ((data)) {
                data = await conexao.estoque.update(req.body, { where: { id } });
                return res.status(200).json(data)
            }
            else
                return res.status(401).json({
                    msg: "Estoque não cadastrado!"
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
            let data = await conexao.estoque.findOne({ where: { id } });
            if ((data)) {
                let pedido = await conexao.pedidos_fornecedor.findByPk(data.pedidos_fornecedor_id, { paranoid: false });
                await conexao.pedidos_fornecedor.update({ quantidade_recebida: pedido.quantidade_recebida - 1 }, { where: { id: data.pedidos_fornecedor_id } });
                data = await conexao.estoque.destroy({ where: { id } });
                return res.status(200).json(data)
            }
            else
                return res.status(401).json({
                    msg: "Estoque não cadastrado!"
                })
        } catch (error) {
            console.log(error)
            return res.status(401).json({
                msg: "Ocoreu um erro!",
                error
            })
        }
    },

    async groupbyproduto(req, res) {
        try {
            let data = await conexao.estoque.findAll({
                attributes: [
                    'id',
                    'pedidos_fornecedor_id',
                    'valor_venda',
                ],
                include: [{
                    association: "pedidos_fornecedor",
                    include: [{
                        association: "produto"
                    }]

                }],
                group: ['pedidos_fornecedor.nota']
            });
            if ((data))
                return res.status(200).json(data)
            else
                return res.status(205).json({
                    msg: "Estoque não cadastrado!"
                })

        } catch (error) {
            return res.status(401).json({
                msg: "Ocoreu um erro!",
                error
            })
        }

    },

};