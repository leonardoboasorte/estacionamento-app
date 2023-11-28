const express = require('express');
const routes = express.Router();

// GET = BUSCAR INFORMACAO
// POST = CRIAR INFORMACAO
// PUT = EDITAR UMA INFORMACAO POR COMPLETO
// PATCH = MODIFICAR APENAS UMA PARTE DA INFORMACAO
// DELETE = DELETAR INFORMACAO

routes.get('/', (request, response) => response.send('hello word'));

module.exports = routes;
