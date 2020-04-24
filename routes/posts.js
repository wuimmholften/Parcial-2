var express = require('express');
var router = express.Router();

let postController = require('./../controllers/posts');

router.get('/', postController.post);
router.get('/nuevo', postController.nuevoPost);
router.post('/nuevo', postController.nuevoPublicacionPost);

router.get('/editar/:id', postController.editarPost);
router.post('/editar', postController.editarPostPost);

router.get('/borrar/:id', postController.borrarPost);

router.get('/detalle/:id', postController.detallePost);

router.post('/agregarfoto', postController.agregarPhoto);

module.exports = router;