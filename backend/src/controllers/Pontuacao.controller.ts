import { RequestHandler } from 'express';
import { PontuacaoService } from '../services/Pontuacao.service';

export const atribuir: RequestHandler = async (req, res, next): Promise<void> => {
    const { funcionarioId } = req.params;
    const { descricao, pontos } = req.body;
    try {
        const pontuacao = await PontuacaoService.atribuir(Number(funcionarioId), { descricao, pontos });
        res.status(201).json(pontuacao);
    } catch (error) {
        next(error);
    }
};

export const editar: RequestHandler = async (req, res, next): Promise<void> => {
    const { id } = req.params;
    const { descricao, pontos } = req.body;
    try {
        const pontuacaoAtualizada = await PontuacaoService.editar(Number(id), { descricao, pontos });
        if (!pontuacaoAtualizada) {
            res.status(404).json({ error: 'Pontuação não encontrada' });
            return;
        }
        res.status(200).json(pontuacaoAtualizada);
    } catch (error) {
        next(error);
    }
};

export const deletar: RequestHandler = async (req, res, next): Promise<void> => {
    const { id } = req.params;
    try {
        const resultado = await PontuacaoService.deletar(Number(id));
        if (!resultado) {
            res.status(404).json({ error: 'Pontuação não encontrada' });
            return;
        }
        res.status(204).send();
        return;
    } catch (error) {
        next(error);
    }
};