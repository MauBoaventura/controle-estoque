const connection = require('../database/connection');
const models = require("../database/models/init-models");
const conexao = models(connection);
const Sequelize = require('sequelize');
const { where } = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
    async index(req, res) {
        if (!(Object.keys(req.query).length === 0)) {
            const data_pedido = req.query.data_pedido ?? "";
            const nota = req.query.nota ?? "";
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
                        nota: {
                            [Op.like]: `%${nota}%`
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
                    include: [{ all: true }]
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
                    include: [{ all: true }]
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
            req.body.produtos.map(async (produto) => {
                const resp = await conexao.taxa_transporte_produto.findOne({
                    where: {
                        freteiro_id: produto.freteiro_id,
                        produto_id: produto.produto_id
                    }
                })
                produto.taxa_transporte_produto_id = resp?.id ?? undefined;

                produto.data_pedido = req.body.data_pedido;
                produto.dolar_compra = req.body.dolar_compra;
                produto.fornecedor_id = req.body.fornecedor_id;
                produto.nota = req.body.nota;

                await conexao.pedidos_fornecedor.create(produto);
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
                const quantidade_solicitada = data?.quantidade_solicitada;//5
                const quantidade_ja_recebida = data?.quantidade_recebida;//0
                const quantidade_recebida_da_vez = data?.quantidade_solicitada - req.body.quantidade_recebida;//5-2=3

                const quantidade_que_falta_receber = quantidade_solicitada - quantidade_ja_recebida;//5-0

                if (quantidade_recebida_da_vez > quantidade_que_falta_receber) {// 3 maior q 5
                    return res.status(401).json({
                        msg: "Quantidade de produtos maior que a permitida!"
                    })
                }
                else {
                    if (quantidade_recebida_da_vez < 0) {
                        return res.status(401).json({
                            msg: "Quantidade negativa!"
                        })
                    }
                    // cadastra 
                    const quantidade_de_produtos_a_ser_adicionado = req.body.quantidade_recebida - quantidade_ja_recebida

                    for (let index = 0; index < quantidade_de_produtos_a_ser_adicionado; index++) {
                        conexao.estoque.create({
                            data_recebimento:  new Date().toJSON().slice(0, 10),
                            pedidos_fornecedor_id: data.id,
                        }) 
                    }   
                }

                await conexao.pedidos_fornecedor.update(req.body, { where: { id } });
                data = await conexao.pedidos_fornecedor.findOne({ where: { id } });

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
    },

    async last_nota_of_pedidos(req, res) {
        const id = req.params.id;

        try {
            let data = await conexao.pedidos_fornecedor.max('nota')
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
    }

};