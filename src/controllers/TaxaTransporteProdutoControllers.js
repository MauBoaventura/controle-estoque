const connection = require('../database/connection');
const models = require("../database/models/init-models");
const conexao = models(connection);
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
    async index(req, res) {
        if (!(Object.keys(req.query).length === 0)) {
            const freteiro_id = req.query.freteiro_id ?? "";
            const produto_id = req.query.produto_id ?? "";
            try {
                let data = await conexao.taxa_transporte_produto.findOne({
                    where: {
                        freteiro_id,
                        produto_id
                    }
                });
                if ((data))
                    return res.status(200).json(data)
                else
                    return res.status(401).json({
                        msg: "Taxa não cadastrada!"
                    })

            } catch (error) {
                return res.status(401).json({
                    msg: "Ocoreu um erro!",
                    error
                })
            }
        } else {
            try {
                const data = await conexao.taxa_transporte_produto.findAll();
                if ((data))
                    return res.status(200).json(data)
                else
                    return res.status(401).json({
                        msg: "Taxa não cadastrada!"
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
            let data = await conexao.taxa_transporte_produto.findOne({ where: { id } });
            if ((data))
                return res.status(200).json(data)
            else
                return res.status(401).json({
                    msg: "Taxa não cadastrada!"
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
            // remove taxa ao pesquisar, deixando apenas id do freteiro e produto
            const taxa = req.body['taxa']
            delete req.body['taxa'];

            let data = await conexao.taxa_transporte_produto.findAll({ where: req.body });
            if (!(data.length > 0))
                await conexao.taxa_transporte_produto.create({ ...req.body, taxa });
            else
                return res.status(401).json({
                    msg: "Taxa já cadastrada!"
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
            let data = await conexao.taxa_transporte_produto.findOne({ where: { id } });
            if ((data)) {
                data = await conexao.taxa_transporte_produto.update(req.body, { where: { id } });
                return res.status(200).json(data)
            }
            else
                return res.status(401).json({
                    msg: "Taxa não cadastrada!"
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
            let data = await conexao.taxa_transporte_produto.findOne({ where: { id } });
            if ((data)) {
                data = await conexao.taxa_transporte_produto.destroy({ where: { id } });
                return res.status(200).json(data)
            }
            else
                return res.status(401).json({
                    msg: "Taxa não cadastrada!"
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