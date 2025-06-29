import React, { useState } from 'react';
import { X, User, Briefcase } from 'lucide-react';

const Feedback: React.FC<{ message: string; type?: 'success' | 'error' }> = ({ message, type = 'success' }) => (
  <div className={`mb-4 px-4 py-2 rounded text-sm font-bold ${type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{message}</div>
);

interface AddModalDeFuncionarioProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddFuncionarioModal: React.FC<AddModalDeFuncionarioProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    nome: '',
    avatar: '',
    posicao: ''
  });
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    try {
        const resp = await fetch(`${import.meta.env.VITE_API_URL}/funcionarios`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nome: formData.nome,
          avatar: formData.avatar || 'https://static.vecteezy.com/system/resources/thumbnails/019/879/198/small/user-icon-on-transparent-background-free-png.png',
          posicao: formData.posicao
        })
      });
      if (!resp.ok) {
        throw new Error('Erro ao adicionar funcionário.');
      }
      setFeedback({ message: 'Funcionário adicionado com sucesso!', type: 'success' });
      setTimeout(() => {
        setFeedback(null);
        onClose();
        setFormData({ nome: '', avatar: '', posicao: '' });
      }, 1200);
    } catch (error) {
      setFeedback({ message: 'Erro ao adicionar funcionário. Tente novamente.', type: 'error' });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto pointer-events-auto">
      <div className="absolute inset-0 backdrop-blur-[3px] backdrop-brightness-75" style={{ zIndex: 1 }} aria-hidden="true"></div>
      <div className="relative z-10 bg-gradient-to-br from-yellow-50 via-white to-amber-100 rounded-2xl p-8 w-full max-w-lg mx-4 shadow-2xl border-2 border-amber-200 animate-fadeIn max-h-[90vh] overflow-y-auto flex flex-col scrollbar-none">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-extrabold text-amber-500 tracking-tight flex items-center gap-2">
            <User className="w-6 h-6 text-amber-400" /> Novo Colaborador
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-amber-500 transition-colors rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-amber-400"
            title="Fechar">
            <X className="w-7 h-7" />
          </button>
        </div>

        {feedback && <Feedback message={feedback.message} type={feedback.type} />}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              <User className="w-4 h-4 inline mr-2 text-amber-400" /> Nome completo
            </label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent font-semibold bg-white/80 text-slate-800 placeholder:italic placeholder:text-slate-400 shadow-sm"
              placeholder="Digite o nome do colaborador"
              required
              autoFocus/>
          </div>

            <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              <User className="w-4 h-4 inline mr-2 text-amber-400" /> Avatar (URL da imagem)
            </label>
            <input
              type="text"
              name="avatar"
              value={formData.avatar}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent font-semibold bg-white/80 text-slate-800 placeholder:italic placeholder:text-slate-400 shadow-sm"
              placeholder="https://exemplo.com/avatar.jpg"
            />
            </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              <Briefcase className="w-4 h-4 inline mr-2 text-amber-400" /> Cargo
            </label>
            <input
              type="text"
              name="posicao"
              value={formData.posicao}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent font-semibold bg-white/80 text-slate-800 placeholder:italic placeholder:text-slate-400 shadow-sm"
              placeholder="Ex: Desenvolvedor, Designer, etc."
              required/>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border-2 border-amber-200 text-amber-600 rounded-lg hover:bg-amber-50 transition-colors font-bold shadow-sm">
              Cancelar
            </button>
            <button
              type="submit" className="flex-1 px-4 py-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-white rounded-lg hover:from-yellow-500 hover:to-amber-400 transition-colors font-bold shadow-md">
              Adicionar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFuncionarioModal;