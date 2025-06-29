export interface Tarefa {
  id?: number;
  descricao: string;
  pontos: number;
  status: 'completo' | 'pendente';
}

export interface Funcionario {
  id: number;
  nome: string;
  posicao: string;
  pontos: number;
  avatar: string;
  conquistas: string[];
  tarefas: Tarefa[];
}
