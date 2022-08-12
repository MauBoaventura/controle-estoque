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
                    include:[{ all: true }]
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
            let data = await conexao.venda.findAll({ where: { cliente_final_id: req.body.cliente_final_id } });
            if (!(data.length > 0)) {
                await conexao.venda.create(req.body);
            }
            else
                return res.status(401).json({
                    msg: "Venda já cadastrada!"
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
    }

};