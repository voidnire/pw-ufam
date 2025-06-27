import { Router } from 'express';
import mainController from '../controllers/main';
import majorController from '../controllers/major';

const router = Router();

router.get('/', mainController.index);
router.get('/lorem/:num', mainController.lorem);
router.get('/bemvindo/:nome', mainController.bemvindo);
router.get('/hb1', mainController.hb1);
router.get('/hb2', mainController.hb2);
router.get('/hb3', mainController.hb3);
router.get('/hb4', mainController.hb4);
//router.get('/hb5', mainController.hb5);
router.get('/about', mainController.sobre);
router.get('/sobre', mainController.sobre);
router.get('/produto', mainController.produto);

// rotas de MajorController
router.get('/major', majorController.index);
router.all('/major/create', majorController.create);
router.get('/major/read/:id', majorController.read);
router.all('/major/update/:id', majorController.update);
router.post('/major/remove/:code', majorController.remove);

// Controlador Product
///router.get('/product', productController.index);
///router.all('/product/create', productController.create);
//router.all('/product/update/:id', productController.update);
//router.get('/product/:id', productController.read);/
//router.post('/product/:id', productController.remove);

//router.get('/product', productController.index);
//router
//  .route('/product/create')
//  .get(productController.create) // GET para exibir formulário
//  .post(productController.create); // POST para processar formulário

//router
//  .route('/product/update/:id')
//  .get(productController.update) // GET para exibir formulário de edição
//  .post(productController.update); // POST para processar atualização

//router.get('/product/:id', productController.read);
//router.delete('/product/:id', productController.remove); // <-- Esta é a linha importante

export default router;
