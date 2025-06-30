const API_URL = `${import.meta.env.VITE_API_URL ?? 'http://localhost:3000'}/pontuacao`;

export async function deletePontuacao(id: number) {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Erro ao deletar pontuação');
}

export async function atribuirPontuacao(id: number, data: { descricao: string; pontos: number }) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Erro ao atribuir pontuação');
  return res.json();
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