import { Router } from 'express';
import { atribuir, editar, deletar } from '../controllers/Pontuacao.controller';


const router = Router();

/**
 * @swagger
 * tags:
 *   name: Pontuacao
 *   description: Gerenciamento de pontuação dos funcionários
 */

/**
 * @swagger
 * /pontuacao/{funcionarioId}:
 *   post:
 *     summary: Atribui pontos a um funcionário
 *     tags: [Pontuacao]
 *     parameters:
 *       - in: path
 *         name: funcionarioId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descricao:
 *                 type: string
 *               pontos:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Pontuação atribuída
 *       400:
 *         description: Dados inválidos
 */
router.post('/:funcionarioId', atribuir);
/**
 * @swagger
 * /pontuacao/{id}:
 *   put:
 *     summary: Edita uma pontuação
 *     tags: [Pontuacao]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descricao:
 *                 type: string
 *               pontos:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Pontuação editada
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Pontuação não encontrada
 */
router.put('/:id', editar);
/**
 * @swagger
 * /pontuacao/{id}:
 *   delete:
 *     summary: Remove uma pontuação
 *     tags: [Pontuacao]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Pontuação removida
 *       404:
 *         description: Pontuação não encontrada
 */
router.delete('/:id', deletar);

export default router;