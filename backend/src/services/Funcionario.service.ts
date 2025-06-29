import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class FuncionarioService {
  static async listar() {
    return await prisma.funcionario.findMany({
      include: {
        pontuacoes: true,
        conquistas: true,
      },
    });
  }

  static async detalhar(id: number) {
    return await prisma.funcionario.findUnique({
      where: { id },
      include: {
        pontuacoes: true,
        conquistas: true,
      },
    });
  }
  
  static async criar(funcionarioData: any) {
    return await prisma.funcionario.create({
      data: funcionarioData,
    });
  }

  static async atualizar(id: number, funcionarioData: any) {
    return await prisma.funcionario.update({
      where: { id },
      data: funcionarioData,
    });
  }

  static async deletar(id: number) {
    return await prisma.funcionario.delete({
      where: { id },
    });
  }
}