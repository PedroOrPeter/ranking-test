import { Router } from 'express';
import funcionariosRoutes from './funcionarios.routes';
import pontuacaoRoutes from './pontuacao.routes';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '../SwaggerDoc';

const router = Router();

router.use('/funcionarios', funcionariosRoutes);
router.use('/pontuacao', pontuacaoRoutes);
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
export default router;