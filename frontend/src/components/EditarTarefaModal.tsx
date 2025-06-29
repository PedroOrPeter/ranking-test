import React, { useState, useEffect } from 'react';

interface EditarTarefaModalProps {
  isOpen: boolean;
  tarefa: { id?: number; descricao: string; pontos: number } | null;
  onClose: () => void;
  onSave: (id: number, data: { descricao: string; pontos: number }) => void;
}

const EditarTarefaModal: React.FC<EditarTarefaModalProps> = ({ isOpen, tarefa, onClose, onSave }) => {
  const [descricao, setDescricao] = useState('');
  const [pontos, setPontos] = useState(0);

  useEffect(() => {
    if (tarefa) {
      setDescricao(tarefa.descricao);
      setPontos(tarefa.pontos);
    }
  }, [tarefa]);

  if (!isOpen || !tarefa) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto pointer-events-auto">
      <div className="absolute inset-0 backdrop-blur-[3px] backdrop-brightness-75" style={{ zIndex: 1 }} aria-hidden="true"></div>
      <div className="relative z-10 bg-white text-slate-900 rounded-xl p-8 w-full max-w-md mx-4 shadow-2xl border-2 border-amber-300 animate-fadeIn max-h-[90vh] overflow-y-auto flex flex-col scrollbar-none">
        <h3 className="text-2xl font-extrabold text-amber-500 mb-6 text-center">Editar Tarefa</h3>
        <form
        onSubmit={e => {
            e.preventDefault();
            if (tarefa.id !== undefined) {
              onSave(tarefa.id, { descricao, pontos });
            }
        }}
        className="space-y-6"
        >
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Descrição</label>
            <input
              type="text"
              value={descricao}
              onChange={e => setDescricao(e.target.value)}
              className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent font-semibold"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Pontos</label>
            <input
              type="number"
              value={pontos}
              onChange={e => setPontos(Number(e.target.value))}
              className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent font-semibold"
              required
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-bold"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-900 rounded-lg hover:from-yellow-500 hover:to-amber-400 transition-colors font-bold"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarTarefaModal;
