var express = require('express');
var router = express.Router();
var controllerIndex = require('../controller/controllerIndex.js') // importar o controlerIndex.js


/* GET home page. */
router.get('/', controllerIndex.get_tela_principal);

/* POST home page. */
router.post('/', controllerIndex.post_tela_principal);

/* GET página sobre */
router.get('/sobre', controllerIndex.sobre);

// /* GET página criaNota */
// router.get('/nota/cria', controllerIndex.notaCria);


module.exports = router;
