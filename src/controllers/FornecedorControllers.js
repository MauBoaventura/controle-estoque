const connection = require('../database/connection');
const models = require("../database/models/init-models");
const conexao = models(connection);
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
    async index(req, res) {
        if (!(Object.keys(req.query).length === 0)) {
            const nome = req.query.nome ?? "";
            try {
                let data = await conexao.fornecedor.findAll({
                    where: {
                        nome: {
                            [Op.like]: `%${nome}%`
                        }
                    }
                });
                if ((data))
                    return res.status(200).json(data)
                else
                    return res.status(401).json({
                        msg: "Fornecedor não cadastrado!"
                    })

            } catch (error) {
                return res.status(401).json({
                    msg: "Ocoreu um erro!",
                    error
                })
            }
        } else {
            try {
                let data = await conexao.fornecedor.findAll();
                if ((data))
                    return res.status(200).json(data)
                else
                    return res.status(401).json({
                        msg: "Fornecedor não cadastrado!"
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
            let data = await conexao.fornecedor.findOne({ where: { id } });
            if ((data))
                return res.status(200).json(data)
            else
                return res.status(401).json({
                    msg: "Fornecedor não cadastrado!"
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
            let data = await conexao.fornecedor.findAll({ where: { nome: req.body.nome } });
            if (!(data.length > 0)) {
                await conexao.fornecedor.create(req.body);
            }
            else
                return res.status(401).json({
                    msg: "Fornecedor já cadastrado!"
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
            let data = await conexao.fornecedor.findOne({ where: { id } });
            if ((data)) {
                data = await conexao.fornecedor.update(req.body, { where: { id } });
                return res.status(200).json(data)
            }
            else
                return res.status(401).json({
                    msg: "Fornecedor não cadastrado!"
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
            let data = await conexao.fornecedor.findOne({ where: { id } });
            if ((data)) {
                data = await conexao.fornecedor.destroy({ where: { id } });
                return res.status(200).json(data)
            }
            else
                return res.status(401).json({
                    msg: "Fornecedor não cadastrado!"
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