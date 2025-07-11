import { Router } from 'express';
import mainController from '../controllers/main';
import majorController from '../controllers/major';
import userController from '../controllers/user';
import { requireAuth } from '../services/auth';

const router = Router();

router.get('/game', requireAuth, mainController.game);
router.get('/', mainController.index);

// rotas
router.get('/lorem/:num', mainController.lorem);
router.get('/bemvindo/:nome', mainController.bemvindo);
router.get('/hb1', mainController.hb1);
router.get('/hb2', mainController.hb2);
router.get('/hb3', mainController.hb3);
router.get('/hb4', mainController.hb4);
//router.get('/hb5', mainController.hb5);
router.get('/about', mainController.sobre);
router.get('/sobre', mainController.sobre);
router.get('/produto', requireAuth, mainController.produto);

// rotas de MajorController
router.get('/major', majorController.index);
router.all('/major/create', majorController.create);
router.get('/major/read/:id', majorController.read);
router.all('/major/update/:id', majorController.update);
router.post('/major/remove/:code', majorController.remove);

// rotas de COOKIE
router.get('/create-cookie', mainController.createCookie);
router.get('/clear-cookie', mainController.clearCookie);

// rotas de USER
router.get('/cadastro', mainController.cadastro);
router.post('/register', userController.create);
router.get('/user', userController.index);
router.get('/login', mainController.login);
router.post('/login', mainController.login);
router.get('/logout', mainController.logout);
router.post('/user/delete/:id', userController.remove);
// game
router.post('/save-user-score/:score', mainController.userScore);
router.get('/ranking', mainController.ranking);

// rotas de UUID
router.get('/uuid', mainController.uuid);

export default router;
