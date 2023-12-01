const { response } = require("express");
const {v4: uuid} = require("uuid")
const Estacionamento = require("../models/Estacionamento")

module.exports = {
    async index(request, response) {
        try {
            const carros = await Estacionamento.find();
            return response.status(200).json({ carros })
        } catch (err) {
            response.status(500).json({ error: err.message });
        }
    },

    async parking(request, response) {
        const { cliente, placa, modelo } = request.body;

        if(!cliente || !placa || !modelo) {
            return response.status(400).json({error: "Faltando informações"})
        }

        const client = new Estacionamento ({
            _id: uuid(),
            cliente,
            placa,
            modelo
        })

        try {
            await client.save();

            return response.status(201).json({message:"Cliente adicionado com sucesso"})
        } catch (err) {
            response.status(400).json({ error: err.message });
        }
    },

    async update(request, response) {
        const { cliente, placa, modelo } = request.body;

        if(!cliente && !placa && !modelo) {
            return response
                .status(400)
                .json({ error: "Necessário informar cliente, placa ou modelo"})
        }
        
        if (cliente) response.clientP.cliente = cliente;
        if (placa) response.clientP.placa = placa;
        if (modelo) response.clientP.modelo = modelo;

        try {
            await response.clientP.save()
            return response.status(200).json({ message: "Atualizado com sucesso."})
        } catch(err) {
            response.status(500).json({ error: err.message })
        }
    },

    async delete(request, response) {
        try {
            console.log(response.clientP)
            console.log(response)
            await response.clientP.deleteOne()
            return response.status(200).json({message:"Cliente deletado"})
        } catch(err) {
            return response.status(500).json({ error: err.message })
        }
    }

}