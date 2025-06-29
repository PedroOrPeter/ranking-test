const API_URL = `${import.meta.env.VITE_API_URL ?? 'http://localhost:3000'}/funcionarios`;

export async function deletePontuacao(id: number) {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Erro ao deletar pontuação');
}

export async function updatePontuacao(id: number, data: { descricao: string; pontos: number }) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Erro ao editar pontuação');
  return res.json();
}