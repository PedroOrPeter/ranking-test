import { z } from "zod";

export const funcionarioSchema = z.object({
  nome: z.string().min(1, "O Nome é obrigatório"),
  posicao: z.string().min(1, "A Posição é obrigatória"),
  avatar: z.string().url("O Avatar deve ser uma URL"),
  pontos: z.number().int().optional(),
  conquistas: z.array(z.string()).optional(),
});
