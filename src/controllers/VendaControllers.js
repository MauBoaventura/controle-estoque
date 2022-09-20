const connection = require('../database/connection');
const models = require("../database/models/init-models");
const conexao = models(connection);
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
    async index(req, res) {
        if (!(Object.keys(req.query).length === 0)) {
            const cliente_final_id = req.query.cliente_final_id ?? "";
            try {
                let data = await conexao.venda.findAll({
                    where: {
                        cliente_final_id
                    },
                    include: [{ all: true }]
                });
                if ((data))
                    return res.status(200).json(data)
                else
                    return res.status(401).json({
                        msg: "Venda não cadastrada!"
                    })

            } catch (error) {
                return res.status(401).json({
                    msg: "Ocoreu um erro!",
                    error
                })
            }
        } else {
            try {
                let data = await conexao.venda.findAll({
                    include: [{ all: true }]
                }
                );
                if ((data))
                    return res.status(200).json(data)
                else
                    return res.status(401).json({
                        msg: "Venda não cadastrada!"
                    })
            } catch (error) {
                return res.status(401).json({
                    msg: "Ocoreu um erro!",
                    error
                })
            }
        }


        res.json(data)
    },

    async getOne(req, res) {
        const id = req.params.id;

        try {
            let data = await conexao.venda.findOne({ where: { id } });
            if ((data))
                return res.status(200).json(data)
            else
                return res.status(401).json({
                    msg: "Venda não cadastrada!"
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
            req.body.produtos.map(async (venda) => {
                let venda1={}
                venda1.data_venda = req.body.data_pedido;
                venda1.cliente_final_id = req.body.cliente_final_id;
                venda1.estoque_id = venda.id;
                venda1.produto_id = venda.pedidos_fornecedor.produto.id;
                venda1.valor_desconto = venda.desconto;
                venda1.valor_venda_final = venda.valor_venda - venda.desconto;

                const resp = await conexao.taxa_transporte_produto.findOne({
                    where: {
                        produto_id: venda.pedidos_fornecedor.produto.id
                    }
                })
                let taxa = resp?.taxa ?? 0.05;

                venda1.valor_lucro_da_peca_final = venda.valor_venda - venda.desconto - (venda.pedidos_fornecedor.dolar_compra * venda.pedidos_fornecedor.valor_produto * taxa) - venda.pedidos_fornecedor.produto.valor_transporte
                // console.log(venda1)
                await conexao.venda.create(venda1);
                await conexao.estoque.update({ status_venda: true }, { where: { id: venda.id } });

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
            let data = await conexao.venda.findOne({ where: { id } });
            if ((data)) {
                data = await conexao.venda.update(req.body, { where: { id } });
                return res.status(200).json(data)
            }
            else
                return res.status(401).json({
                    msg: "Venda não cadastrada!"
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
            let data = await conexao.venda.findOne({ where: { id } });
            if ((data)) {
                data = await conexao.venda.destroy({ where: { id } });
                return res.status(200).json(data)
            }
            else
                return res.status(401).json({
                    msg: "Venda não cadastrada!"
                })
        } catch (error) {
            console.log(error)
            return res.status(401).json({
                msg: "Ocoreu um erro!",
                error
            })
        }
    },

    async searchCodBar(req, res) {
        const cod = req.query.cod;
        try {
            let data = await conexao.estoque.findOne(
                {
                    where: {
                        status_consulta: false,
                        status_venda: false
                    },
                    include: [{
                        association: "pedidos_fornecedor",
                        include: [{
                            association: "produto",
                            include: [{
                                association: "produto_codigo_barras",
                                where: {
                                    'codigo_barras': cod
                                },
                                required: true
                            }],
                            required: true
                        }],
                        required: true
                    },
                    ],
                });
            if (data?.id) {
                await conexao.estoque.update({ ...data, status_consulta: true }, { where: { id: data.id } });
            }
            return res.status(200).json(data ?? {})
        } catch (error) {
            console.log(error)
            return res.status(401).json({
                msg: "Ocoreu um erro!",
                error
            })
        }
    },

    async estoqueLimpaConsulta(req, res) {
        const cod = req.query.cod;
        try {
            await conexao.estoque.update({ status_consulta: false }, {
                where: {
                    deletedAt: {
                        [Op.is]: null
                    },
                }
            });

            return res.status(200).json({ msg: 'DB consulta limpo com sucesso' })
        } catch (error) {
            console.log(error)
            return res.status(401).json({
                msg: "Ocoreu um erro!",
                error
            })
        }
    },
};