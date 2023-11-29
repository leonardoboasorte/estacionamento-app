const { validate: isUuid } = require ("uuid");
const Estacionamento = require("../models/Estacionamento")

module.exports = {
    async validateId(request, response, next){
        const { id } = request.params;

        if(!isUuid(id)) {
            return response.status(400).json({ error: "ID inválido" })
        }

        try {
            const clientP = await Estacionamento.findById(id)
            response.clientP = clientP

            if (!clientP) {
                return response.status(404).json({ error: "Cliente não encontrado"})
            }
        } catch(err){
            return response.status(500).json({ error: err.message })
        }
        
        next();
    }
}