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
}

const FuncionarioList: React.FC<FuncionarioListProps> = ({ funcionarios, selectedId, onSelect, onAtribuir, onEditar, onExcluir }) => (
  <div className="space-y-4">
    {funcionarios.map(funcionario => (
      <FuncionarioItem
        key={funcionario.id || funcionario.nome}
        funcionario={funcionario}
        isSelected={selectedId === funcionario.id}
        onSelect={() => onSelect(funcionario)}
        onAtribuir={() => onAtribuir(funcionario)}
        onEditar={() => onEditar(funcionario)}
        onExcluir={() => onExcluir(funcionario)}
      />
    ))}
  </div>
);

export default FuncionarioList;
