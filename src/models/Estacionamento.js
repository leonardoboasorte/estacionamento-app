const mongoose = require("mongoose")

const estacionamentoSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,

    },
    cliente: {
        type: String,
        required: true,
    },
    placa: {
        type: String,
        required: true,
    },
    modelo: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model("Estacionamento", estacionamentoSchema);