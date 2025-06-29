import { useState, useEffect, useCallback } from 'react';
import type { Funcionario } from '../Types/funcionario';
import {
  getFuncionarios,
  createFuncionario,
  updateFuncionario,
  deleteFuncionario
} from '../api/funcionarios';

export function useFuncionarios() {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFuncionarios = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getFuncionarios();
      setFuncionarios(data);
    } catch (err: any) {
      setError(err.message || 'Erro ao buscar funcionários');
    } finally {
      setLoading(false);
    }
  }, []);

  const addFuncionario = async (funcionario: Omit<Funcionario, 'id' | 'pontos' | 'conquistas' | 'tarefas'>) => {
    await createFuncionario(funcionario);
    await fetchFuncionarios();
  };

  const editFuncionario = async (id: number, funcionario: Partial<Funcionario>) => {
    await updateFuncionario(id, funcionario);
    await fetchFuncionarios();
  };

  const removeFuncionario = async (id: number) => {
    await deleteFuncionario(id);
    await fetchFuncionarios();
  };

  useEffect(() => {
    fetchFuncionarios();
  }, [fetchFuncionarios]);

  return {
    funcionarios,
    loading,
    error,
    fetchFuncionarios,
    addFuncionario,
    editFuncionario,
    removeFuncionario,
    setFuncionarios,
  };
}
