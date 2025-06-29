import type { Funcionario } from '../../Types/funcionario';
import FuncionarioItem from './FuncionarioItem';
import React from 'react';

interface FuncionarioListProps {
  funcionarios: Funcionario[];
  selectedId: number | null;
  onSelect: (funcionario: Funcionario) => void;
  onAtribuir: (funcionario: Funcionario) => void;
  onEditar: (funcionario: Funcionario) => void;
  onExcluir: (funcionario: Funcionario) => void;
  renderRanking?: (id: number) => number | null;
}


const FuncionarioList: React.FC<FuncionarioListProps> = ({ funcionarios, selectedId, onSelect, onAtribuir, onEditar, onExcluir }) => {
  const handleSelect = React.useCallback((funcionario: Funcionario) => () => onSelect(funcionario), [onSelect]);
  const handleAtribuir = React.useCallback((funcionario: Funcionario) => () => onAtribuir(funcionario), [onAtribuir]);
  const handleEditar = React.useCallback((funcionario: Funcionario) => () => onEditar(funcionario), [onEditar]);
  const handleExcluir = React.useCallback((funcionario: Funcionario) => () => onExcluir(funcionario), [onExcluir]);

  return (
    <div className="space-y-4">
      {funcionarios.map((funcionario, idx) => (
        <FuncionarioItem
          key={funcionario.id || funcionario.nome}
          funcionario={funcionario}
          isSelected={selectedId === funcionario.id}
          onSelect={handleSelect(funcionario)}
          onAtribuir={handleAtribuir(funcionario)}
          onEditar={handleEditar(funcionario)}
          onExcluir={handleExcluir(funcionario)}
          ranking={idx + 1}
        />
      ))}
    </div>
  );
};

export default FuncionarioList;
