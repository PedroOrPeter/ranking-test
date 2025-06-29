import type { Funcionario } from '../Types/funcionario';

const API_URL = `${import.meta.env.VITE_API_URL ?? 'http://localhost:3000'}/funcionarios`;

export async function getFuncionarios(): Promise<Funcionario[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Erro ao buscar funcionários');
  const data = await res.json();
  return data.map((f: any) => ({
    ...f,
    conquistas: f.conquistas ?? [],
    tarefas: (f.pontuacoes ?? []).map((p: any) => ({
      id: p.id,
      descricao: p.descricao,
      pontos: p.pontos,
      status: 'completo',
    })),
  }));
}

export async function createFuncionario(funcionario: Omit<Funcionario, 'id' | 'pontos' | 'conquistas' | 'tarefas'>) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(funcionario),
  });
  if (!res.ok) throw new Error('Erro ao criar funcionário');
  return res.json();
}

export async function updateFuncionario(id: number, funcionario: Partial<Funcionario>) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(funcionario),
  });
  if (!res.ok) throw new Error('Erro ao atualizar funcionário');
  return res.json();
}

export async function deleteFuncionario(id: number) {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Erro ao deletar funcionário');
  return;
}