var express = require('express');
var router = express.Router();
var controllerNota = require('../controller/controllerNota.js')

/* GET Cria Nota. */
router.get('/cria', controllerNota.cria_get);

/* POST Cria Nota. */
router.post('/cria', controllerNota.cria_post);

/* GET consulta Nota. */
router.get('/consulta/:id', controllerNota.consulta); // parte da roda é passada como parametro depois dos dois pontos

/* GET Altera Nota. */
router.get('/altera/:id', controllerNota.altera_get); 

/* POST Altera Nota. */
router.post('/altera/:id', controllerNota.altera_post);

/* GET Exclui Nota. */
router.get('/deleta/:id', controllerNota.deleta);

/* NOTA LIDA NÃO LIDA */
router.get('/mudaStatus/:id', controllerNota.mudaStatus);

module.exports = router;