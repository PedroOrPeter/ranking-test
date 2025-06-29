export interface Task {
  nome: string;
  pontos: number;
  status: 'completo' | 'pendente';
}

export interface Funcionario {
  id: number;
  nome: string;
  role: string;
  pontos: number;
  avatar: string;
  conquistas: string[];
  tasks: Task[];
}
