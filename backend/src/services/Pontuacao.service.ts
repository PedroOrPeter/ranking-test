import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class PontuacaoService {
  static async atribuir(funcionarioId: number, data: { descricao: string; pontos: number }): Promise<any> {
    const pontuacao = await prisma.pontuacao.create({
      data: {
        funcionarioId,
        ...data,
      },
    });

    await prisma.funcionario.update({
      where: { id: funcionarioId },
      data: { pontos: { increment: data.pontos } },
    });

    return pontuacao;
  }

  static async editar(id: number, data: { descricao: string; pontos: number }) {
    const pontuacaoAntiga = await prisma.pontuacao.findUnique({ where: { id } });
    if (!pontuacaoAntiga) throw new Error('Pontuação não encontrada');

    await prisma.funcionario.update({
      where: { id: pontuacaoAntiga.funcionarioId },
      data: { pontos: { decrement: pontuacaoAntiga.pontos } },
    });

    const atualizada = await prisma.pontuacao.update({ where: { id }, data });

    await prisma.funcionario.update({
      where: { id: pontuacaoAntiga.funcionarioId },
      data: { pontos: { increment: data.pontos } },
    });

    return atualizada;
  }

  static async deletar(id: number) {
    const pontuacao = await prisma.pontuacao.findUnique({ where: { id } });
    if (!pontuacao) throw new Error('Pontuação não encontrada');

    await prisma.funcionario.update({
      where: { id: pontuacao.funcionarioId },
      data: { pontos: { decrement: pontuacao.pontos } },
    });

    return prisma.pontuacao.delete({ where: { id } });
  }
}