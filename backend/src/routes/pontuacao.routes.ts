import { Router } from 'express';
import { atribuir, editar, deletar } from '../controllers/Pontuacao.controller';

const router = Router();

router.post('/:funcionarioId', atribuir);
router.put('/:id', editar);
router.delete('/:id', deletar);

export default router;