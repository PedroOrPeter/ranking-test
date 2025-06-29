import React, { useState, useEffect } from 'react';
import type { Funcionario } from '../Types/funcionario';

interface EditarFuncionarioModalProps {
  isOpen: boolean;
  funcionario: Funcionario | null;
  onClose: () => void;
  onSave?: () => void;
}

const EditarFuncionarioModal: React.FC<EditarFuncionarioModalProps> = ({ isOpen, funcionario, onClose, onSave }) => {
  const [nome, setNome] = useState('');
  const [posicao, setPosicao] = useState('');
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    if (funcionario) {
      setNome(funcionario.nome);
      setPosicao(funcionario.posicao);
      setAvatar(funcionario.avatar);
    }
  }, [funcionario]);

  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  if (!isOpen || !funcionario) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto pointer-events-auto">
      <div className="absolute inset-0 backdrop-blur-[3px] backdrop-brightness-75" style={{ zIndex: 1 }} aria-hidden="true"></div>
      <div className="relative z-10 bg-white text-slate-900 rounded-xl p-8 w-full max-w-lg mx-4 shadow-2xl border-2 border-amber-300 animate-fadeIn max-h-[90vh] overflow-y-auto flex flex-col scrollbar-none">
        <h3 className="text-2xl font-extrabold text-amber-500 mb-6 text-center">Editar Colaborador</h3>
        {feedback && (
          <div className={`mb-4 px-4 py-2 rounded text-sm font-bold ${feedback.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{feedback.message}</div>
        )}
        <form
          onSubmit={async e => {
            e.preventDefault();
            setFeedback(null);
            try {
              const resp = await fetch(`http://localhost:3000/funcionarios/${funcionario.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome, posicao, avatar })
              });
              if (!resp.ok) throw new Error('Erro ao editar colaborador.');
              setFeedback({ message: 'Colaborador editado com sucesso!', type: 'success' });
              setTimeout(() => {
                setFeedback(null);
                onClose();
                if (onSave) onSave();
              }, 1200);
            } catch (error) {
              setFeedback({ message: 'Erro ao editar colaborador. Tente novamente.', type: 'error' });
            }
          }}
          className="space-y-6"
        >
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Nome</label>
            <input
              type="text"
              value={nome}
              onChange={e => setNome(e.target.value)}
              className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent font-semibold"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Cargo</label>
            <input
              type="text"
              value={posicao}
              onChange={e => setPosicao(e.target.value)}
              className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent font-semibold"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Avatar (URL)</label>
            <input
              type="text"
              value={avatar}
              onChange={e => setAvatar(e.target.value)}
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

export default EditarFuncionarioModal;
