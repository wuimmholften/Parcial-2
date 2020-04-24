let controller = {};

const { Post } = require('./../models/post');
const { Photo } = require('./../models/photo');

controller.post = (req, res, next) => {

    

    // Consultar todos los productos
    Post.findAll()
        // Manejar resultado de consulta
        .then((posts) => {
            // (3)

            //Renderizar una vista (HTML / EJS)
            //- Nombre de la vista (se omite "views/" al inicio, y se omite ".ejs" al final)
            //- Variables para la vista
            res.render('publicaciones/inicio', {
                titulo: 'Feed',
                posts: posts,
            });
        })
        //En caso de error en la consulta
        .catch((err) => {
            console.error('Error en la consulta', err);

            res.render('publicaciones/inicio', {
                titulo: 'Feed',
                posts: [],
            });
        });

   
};

controller.nuevoPost = (req, res, next) => {
    res.render('publicaciones/newpost');
};


controller.nuevoPublicacionPost = (req, res, next) => {
    (async() => {
        try {

            let nombre = req.body.nombre;
            let texto = req.body.texto;
            let usuario = req.body.usuario;

            //Revisar errores
            let errors = {};

            if (!nombre || nombre === '') {
                errors.nombre = 'Por favor introduce un titulo';
            }

             if (!texto || texto === '') {
                errors.texto = 'Por favor introduce una descripcion';
            }

            if (!usuario || usuario === '') {
                errors.usuario = 'Por favor introduce un usuario';
            }

            //En caso de error, renderizar vista nuevamente con mensajes de error
            if (errors.nombre || errors.texto || errors.usuario) {
                return res.render('publicaciones/newpost', {
                    errors: errors,
                    nombre: nombre,
                    texto: texto,
                    usuario: usuario,
                });
            }
            

            // Crear un objeto con estructura del modelo
            let postACrear = {
                nombre: nombre,
                texto: texto,
                usuario: usuario,
            };

            // Guardar (crear registro) en base de datos
            let postCreado = await Post.create(postACrear);
            res.redirect('/');
        } catch (err) {
            console.error('Error en la consulta', err);
            res.render('publicaciones/newpost');
        }
    })();
};

controller.editarPost = (req, res, next) => {
    (async() => {
        try {
            console.log('req.params', req.params);
            let id = req.params.id;
            let post = await Post.findByPk(id);

            res.render('publicaciones/newpost', {
                id: id,
                nombre: post.nombre,
                texto: post.texto,
                usuario: post.usuario,
            });
        } catch (err) {
        }
    })();
};

controller.editarPostPost = (req, res, next) => {
    (async () => {
        try {
            //Información desde formulario viene desde req.body

            //Extraer campos desde req.body
            let id = req.body.id;
            let nombre = req.body.nombre;
            let texto = req.body.texto;
            let usuario = req.body.usuario;

            //Revisar errores
            let errors = {};

            if (!nombre || nombre === '') {
                errors.nombre = 'Introduce un titulo';
            }


            if (!texto || texto === '') {
                errors.texto = 'Escribe algo';
            }

            if (!usuario || usuario === '') {
                errors.texto = 'Escribe un usuario';
            }

            //En caso de error, renderizar vista nuevamente con mensajes de error
            if (errors.nombre || errors.texto || errors.usuario) {
                return res.render('publicaciones/newpost', {
                    errors: errors,
                    id: id,
                    nombre: nombre,
                    texto: texto,
                    usuario: usuario,
                });
            }

            //Consultar registro existente en base de datos
            let postAModificar = await Post.findByPk(id);

            //Actualizar campos
            postAModificar.nombre = nombre;
            postAModificar.texto = texto;
            postAModificar.usuario = usuario;

            //Guardar cambios en base de datos
            await postAModificar.save();

            //Redireccionar a una URL
            res.redirect('/');

        } catch (err) {
            
        }
    })();
};

controller.borrarPost = (req, res, next) => {
    (async () => {
        try {
            let id = req.params.id;
            
            await Post.destroy({
                where: {
                    id: id
                }
            });

            res.redirect('/');
        } catch (err) {
            
        }
    })();
};

controller.detallePost = (req, res, next) => {
    (async () => {
        try {
            let id = req.params.id;

            let post = await Post.findByPk(id);

            let photos = await post.getPhotos();

            res.render('publicaciones/detalle', {
                post: post,
                photos: photos,
            });
            
        } catch (err) {
            console.error('Error en consulta de detalle', err);

            res.render('publicaciones/detalle', {
                post: {},
                photos: []
            });
        }
    })();
};

controller.agregarPhoto = (req, res, next) => {
    (async () => {
        try {
            let id = req.body.id;
            let url = req.body.url;
            let descripcion = req.body.descripcion;
            let usuarioA = req.body.usuarioA

            //Crear objeto con estructura de modelo
            let photo = {
                url: url,
                descripcion: descripcion,
                usuarioA: usuarioA,

                //Relación con el producto al que corresponde
                postId: id
            }

            await Photo.create(photo);

            res.redirect('/detalle/' + id);
        } catch (err) {
            
        }
    })();
};

module.exports = controller;