const connection = require('../database/connection');
const models = require("../database/models/init-models");
const conexao = models(connection);
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
    async index(req, res) {
        if (!Object.keys(req.query).length === 0) {
            const marca = req.query.marca??"";
            const modelo = req.query.modelo??"";
            const cor = req.query.cor??"";
            const capacidade = req.query.capacidade??"";
            const ram = req.query.ram??"";
            try {
                let data = await conexao.produto.findAll({
                    where: {
                        marca: {
                            [Op.like]: `%${marca}%`
                        },
                        modelo: {
                            [Op.like]: `%${modelo}%`
                        },
                        cor: {
                            [Op.like]: `%${cor}%`
                        },
                        capacidade: {
                            [Op.like]: `%${capacidade}%`
                        },
                        ram: {
                            [Op.like]: `%${ram}%`
                        }
                    }
                });
                if ((data))
                    return res.status(200).json({
                        data
                    })
                else
                    return res.status(401).json({
                        msg: "Produto não cadastrado!"
                    })

            } catch (error) {
                return res.status(401).json({
                    msg: "Ocoreu um erro!"
                })
            }
        } else {
            try {
                const data = await conexao.produto.findAll();
                return res.json([
                    data
                ]
                );
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
            let data = await conexao.produto.findOne({ where: { id } });
            if ((data))
                return res.status(200).json({
                    data
                })
            else
                return res.status(401).json({
                    msg: "Produto não cadastrado!"
                })

        } catch (error) {
            return res.status(401).json({
                msg: "Ocoreu um erro!"
            })
        }
    },

    async create(req, res) {
        try {
            let data = await conexao.produto.findAll({ where: req.body });
            if (!(data.length > 0))
                await conexao.produto.create(req.body);
            else
                return res.status(401).json({
                    msg: "Produto já cadastrado!"
                })

        } catch (error) {
            return res.status(401).json({
                msg: "Ocoreu um erro!"
            })
        }
        res.status(201).send()
    },

    async update(req, res) {
        const id = req.params.id;
        try {
            let data = await conexao.produto.findOne({ where: { id } });
            if ((data)) {
                data = await conexao.produto.update(req.body, { where: { id } });
                return res.status(200).json({
                    data
                })
            }
            else
                return res.status(401).json({
                    msg: "Produto não cadastrado!"
                })
        } catch (error) {
            console.log(error)
            return res.status(404).send(error)
        }
    },

    async delete(req, res) {
        const id = req.params.id;
        try {
            let data = await conexao.produto.findOne({ where: { id } });
            if ((data)) {
                data = await conexao.produto.destroy({ where: { id } });
                return res.status(200).json({
                    data
                })
            }
            else
                return res.status(401).json({
                    msg: "Produto não cadastrado!"
                })
        } catch (error) {
            console.log(error)
            return res.status(404).send(error)
        }
    }

};