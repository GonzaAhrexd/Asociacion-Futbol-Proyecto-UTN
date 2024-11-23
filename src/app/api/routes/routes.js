// import {Express} from 'express'
// import { Router } from 'express';

const router = express.Router();
import{
    crearCategoria,
    obtenerCategorias,
    obtenerCategoriaConNombre,
    eliminarCategoriaConNombre,
    actualizarCategoriaConNombre,
} from '../controllers/categoriasControllers';


// Rutas CRUD para categorias
router.post('/categorias', crearCategoria);
router.get('/categorias', obtenerCategorias);
router.get('/categorias/:nombre', obtenerCategoriaConNombre);
router.put('/categorias/:nombre', actualizarCategoriaConNombre);
router.delete('/categorias/:nombre', eliminarCategoriaConNombre);

router.get('/example', (req, res) => {
    res.send('Hello from API');
});

module.exports = router;
