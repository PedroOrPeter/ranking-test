import { Router } from 'express';
import { criar, editar, listar, detalhar, deletar } from '../controllers/Funcionario.controller';

const router = Router();

router.get('/', listar);
router.get('/:id', detalhar);
router.post('/', criar);
router.put('/:id', editar);
router.delete('/:id', deletar);

export default router;