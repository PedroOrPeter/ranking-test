import { Router } from 'express';
import funcionariosRoutes from './funcionarios.routes';
import pontuacaoRoutes from './pontuacao.routes';

const router = Router();

router.use('/funcionarios', funcionariosRoutes);
router.use('/pontuacao', pontuacaoRoutes);

export default router;