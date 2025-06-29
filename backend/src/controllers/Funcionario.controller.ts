import { Request, RequestHandler, Response } from 'express';
import { FuncionarioService } from '../services/Funcionario.service';
import { funcionarioSchema } from '../validators/funcionario.validator';

export const listar: RequestHandler = async (req, res, next) => {
    try {
      const funcionarios = await FuncionarioService.listar();
      res.status(200).json(funcionarios);
    } catch (error) {
      next(error);
    }
};

export const detalhar: RequestHandler = async (req, res, next) => {
    const { id } = req.params;
    try {
      const funcionario = await FuncionarioService.detalhar(Number(id));
      if (!funcionario) {
        res.status(404).json({ error: 'Funcionário não encontrado' });
        return;
      }
      res.status(200).json(funcionario);
    } catch (error) {
      next(error);
    }
};

export const criar: RequestHandler = async (req, res, next) => {
    const parse = funcionarioSchema.safeParse(req.body);
    if (!parse.success) {
      res.status(400).json({ error: parse.error.errors });
    }
    try {
      const novoFuncionario = await FuncionarioService.criar(parse.data);
      res.status(201).json(novoFuncionario);
    } catch (error) {
      next(error);
    }
};

export const editar: RequestHandler = async (req, res, next) => {
    const { id } = req.params;
    const parse = funcionarioSchema.safeParse(req.body);
    if (!parse.success) {
      res.status(400).json({ error: parse.error.errors });
    }

    try {
      const funcionarioAtualizado = await FuncionarioService.atualizar(Number(id), parse.data);
      if (!funcionarioAtualizado) {
        res.status(404).json({ error: 'Funcionário não encontrado' });
        return;
      }
      res.status(200).json(funcionarioAtualizado);
    } catch (error) {
      next(error);
    }
};

export const deletar: RequestHandler = async (req, res, next) => {
    const { id } = req.params;
    try {
      const resultado = await FuncionarioService.deletar(Number(id));
      if (!resultado) {
        res.status(404).json({ error: 'Funcionário não encontrado' });
        return;
      }
      res.status(204).send();
    } catch (error) {
      next(error);
    }
};
