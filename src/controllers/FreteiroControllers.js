const connection = require('../database/connection');
const models = require("../database/models/init-models");
const conexao = models(connection);
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
    async index(req, res) {
        if (req.query) {
            const nome = req.query.nome??"";
            try {
                let data = await conexao.freteiro.findAll({
                    where: {
                        nome: {
                            [Op.like]: `%${nome}%`
                        }
                    }
                });
                if ((data))
                    return res.status(200).json({
                        data
                    })
                else
                    return res.status(401).json({
                        msg: "Freteiro não cadastrado!"
                    })

            } catch (error) {
                return res.status(401).json({
                    msg: "Ocoreu um erro!"
                })
            }
        } else {
            try {
                let data = await conexao.freteiro.findAll();
            } catch (error) {
                return res.status(401).json({
                    msg: "Ocoreu um erro!"
                })
            }
        }


        res.json([
            data
        ]
        )
    },

    async getOne(req, res) {
        const id = req.params.id;

        try {
            let data = await conexao.freteiro.findOne({ where: { id } });
            if ((data))
                return res.status(200).json({
                    data
                })
            else
                return res.status(401).json({
                    msg: "Freteiro não cadastrado!"
                })

        } catch (error) {
            return res.status(401).json({
                msg: "Ocoreu um erro!"
            })
        }
    },

    async create(req, res) {
        try {
            let data = await conexao.freteiro.findAll({ where: { nome: req.body.nome } });
            if (!(data.length > 0))
                await conexao.freteiro.create(req.body);
            else
                return res.status(401).json({
                    msg: "Freteiro já cadastrado!"
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
            let data = await conexao.freteiro.findOne({ where: { id } });
            if ((data)) {
                data= await conexao.freteiro.update({
                    nome: req.body.nome
                }, { where: { id } });
                return res.status(200).json({
                    data
                })
            }
            else
                return res.status(401).json({
                    msg: "Freteiro não cadastrado!"
                })
        } catch (error) {
            console.log(error)
            return res.status(404).send(error)
        }
    },

    async delete(req, res) {
        const id = req.params.id;
        try {
            let data = await conexao.freteiro.findOne({ where: { id } });
            if ((data)) {
                data = await conexao.freteiro.destroy({ where: { id } });
                return res.status(200).json({
                    data
                })
            }
            else
                return res.status(401).json({
                    msg: "Freteiro não cadastrado!"
                })
        } catch (error) {
            console.log(error)
            return res.status(404).send(error)
        }
    }

};