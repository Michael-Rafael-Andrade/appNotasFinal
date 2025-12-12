var express = require('express');
var router = express.Router();
var controllerNota = require('../controller/controllerNota.js')

/* GET Cria Nota. */
router.get('/cria', controllerNota.cria_get);

/* POST Cria Nota. */
router.post('/cria', controllerNota.cria_post);

/* GET consulta Nota. */
router.get('/consulta/:chave_nota', controllerNota.consulta); // parte da roda é passada como parametro depois dos dois pontos

/* GET Altera Nota. */
router.get('/altera/:chave_nota', controllerNota.altera_get); 

/* POST Altera Nota. */
router.post('/altera/:chave_nota', controllerNota.altera_post);

/* GET Exclui Nota. */
router.get('/deleta/:chave_nota', controllerNota.deleta);

/* NOTA LIDA NÃO LIDA */
router.get('/nota/mudaStatus/:chave_nota', controllerNota.mudaStatus);

module.exports = router;