import type { Funcionario } from '../../Types/funcionario';
import React from 'react';

interface FuncionarioItemProps {
  funcionario: Funcionario;
  isSelected: boolean;
  onSelect: () => void;
  onAtribuir: () => void;
  onEditar: () => void;
  onExcluir: () => void;
  ranking?: number;
}

const FuncionarioItem: React.FC<FuncionarioItemProps> = ({
  funcionario,
  isSelected,
  onSelect,
  onAtribuir,
  onEditar,
  onExcluir,
  ranking,
}) => (
  <div
    className={`flex flex-col sm:flex-row items-start sm:items-center p-5 rounded-xl transition-all hover:shadow-2xl cursor-pointer border-2 ${
      isSelected
        ? 'bg-gradient-to-r from-yellow-200 via-amber-100 to-yellow-50 border-amber-400 scale-[1.04] ring-4 ring-amber-300/60 shadow-amber-200/80 z-10'
        : 'bg-white/80 hover:bg-yellow-100 border-slate-200'
    }`}
    onClick={onSelect}
    style={ isSelected? { boxShadow: '0 0 0 4px #fbbf24, 0 8px 32px 0 rgba(251,191,36,0.15)', }: {}}>
    <div className="flex items-center w-full sm:flex-1">
      {ranking && (
        <div
          className={`flex items-center justify-center w-8 h-8 rounded-full font-extrabold text-lg mr-4 ${
            ranking === 1
              ? 'bg-amber-400 text-white'
              : ranking === 2
              ? 'bg-slate-300 text-slate-800'
              : ranking === 3
              ? 'bg-amber-700 text-white'
              : 'bg-slate-200 text-slate-700'
          }`}>{ranking}
        </div>
      )}
      <img src={funcionario.avatar} alt={funcionario.nome} className="w-14 h-14 rounded-full object-cover border-4 border-amber-300 shadow-md mr-6"/>
      <div className="flex-1">
        <h3 className="font-bold text-lg text-slate-800">{funcionario.nome}</h3>
        <p className="text-sm text-slate-600 font-medium">{funcionario.posicao}</p>
        <div className="flex gap-1 mt-1 flex-wrap">
          {(funcionario.conquistas ?? []).map((emblemas, idx) => (
            <span key={idx} className="text-xs bg-amber-100 px-2 py-1 rounded-full text-amber-700 font-semibold shadow-sm"> 
              {emblemas}
            </span>
          ))}
        </div>
      </div>
      <div className="text-right mr-4 hidden sm:block">
        <div className="text-3xl font-extrabold text-amber-500 drop-shadow">
          {funcionario.pontos}
        </div>
        <div className="text-xs text-slate-500 font-semibold">pontos</div>
      </div>
    </div>
    <div className="block sm:hidden text-center mt-4 w-full">
      <div className="text-3xl font-extrabold text-amber-500">{funcionario.pontos}</div>
      <div className="text-xs text-slate-500 font-semibold">pontos</div>
    </div>

    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto mt-4 sm:mt-0 sm:ml-auto sm:items-center">
      <button
        className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow transition-all"
        onClick={React.useCallback(
          (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            onAtribuir();},
          [onAtribuir]
        )}>Atribuir Pontos
      </button>
      <button
        className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow transition-all"
        onClick={React.useCallback(
          (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            onEditar();
          },
          [onEditar]
        )}>
        Editar
      </button>
      <button
        className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow transition-all"
        onClick={React.useCallback(
          (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            onExcluir();
          },
          [onExcluir]
        )}>
        Excluir
      </button>
    </div>
  </div>
);
export default FuncionarioItem;