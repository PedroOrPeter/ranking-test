import { Router } from 'express';
import { criar, editar, listar, detalhar, deletar } from '../controllers/Funcionario.controller';


const router = Router();

/**
 * @swagger
 * tags:
 *   name: Funcionarios
 *   description: Gerenciamento de funcionários
 */

/**
 * @swagger
 * /funcionarios:
 *   get:
 *     summary: Lista todos os funcionários
 *     tags: [Funcionarios]
 *     responses:
 *       200:
 *         description: Lista de funcionários
 */
router.get('/', listar);
/**
 * @swagger
 * /funcionarios/{id}:
 *   get:
 *     summary: Detalha um funcionário
 *     tags: [Funcionarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Funcionário detalhado
 *       404:
 *         description: Funcionário não encontrado
 */
router.get('/:id', detalhar);
/**
 * @swagger
 * /funcionarios:
 *   post:
 *     summary: Cria um novo funcionário
 *     tags: [Funcionarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               posicao:
 *                 type: string
 *               avatar:
 *                 type: string
 *     responses:
 *       201:
 *         description: Funcionário criado
 *       400:
 *         description: Dados inválidos
 */
router.post('/', criar);
/**
 * @swagger
 * /funcionarios/{id}:
 *   put:
 *     summary: Edita um funcionário
 *     tags: [Funcionarios]
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
 *               nome:
 *                 type: string
 *               posicao:
 *                 type: string
 *               avatar:
 *                 type: string
 *     responses:
 *       200:
 *         description: Funcionário atualizado
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Funcionário não encontrado
 */
router.put('/:id', editar);
/**
 * @swagger
 * /funcionarios/{id}:
 *   delete:
 *     summary: Remove um funcionário
 *     tags: [Funcionarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Funcionário removido
 *       404:
 *         description: Funcionário não encontrado
 */
router.delete('/:id', deletar);

export default router;