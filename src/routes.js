const express = require('express');
const routes = express.Router();

const EstacionamentoController = require("./controllers/EstacionamentoController");
const EstacionamentoMiddleware = require('./middlewares/EstacionamentoMiddleware');

// GET = BUSCAR INFORMACAO
// POST = CRIAR INFORMACAO
// PUT = EDITAR UMA INFORMACAO POR COMPLETO
// PATCH = MODIFICAR APENAS UMA PARTE DA INFORMACAO
// DELETE = DELETAR INFORMACAO

routes.get("/carros", EstacionamentoController.index )
routes.post("/carros", EstacionamentoController.parking)
routes.put("/carros/:id", EstacionamentoMiddleware.validateId, EstacionamentoController.update)
routes.delete("/carros/:id", EstacionamentoMiddleware.validateId, EstacionamentoController.delete)

module.exports = routes;
