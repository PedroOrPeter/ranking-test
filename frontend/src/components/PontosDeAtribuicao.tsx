import { X, Target, Plus, Minus } from 'lucide-react';
import React, { useState } from 'react';
interface Funcionario {
  id: number;
  nome: string;
  pontos: number;
  avatar: string;
  role: string;
  emblemas: string[];
}

interface PontosDeAtribuicaoModalProps {
  isOpen: boolean;
  onClose: () => void;
  funcionario: Funcionario;
}

const AtribuicaoDePontosModal = ({ isOpen, onClose, funcionario }: PontosDeAtribuicaoModalProps) => {
  const [pontos, setPontos] = useState(10);
  const [razao, setRazao] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
    setPontos(10);
    setRazao('');
  };

  const ajustarPontos = (increment: number) => {
    const novosPontos = pontos + increment;
    if (novosPontos >= -100 && novosPontos <= 100) {
      setPontos(novosPontos);
    }
  };

  const presetRazao = [
    'Tarefa concluída no prazo',
    'Ajuda a colegas de equipe',
    'Inovação e criatividade',
    'Qualidade excepcional',
    'Mentoria efetiva',
    'Atraso na entrega'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-slate-800">Atribuir Pontos</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex items-center gap-3 mb-6 p-3 bg-slate-50 rounded-lg">
          <img
            src={funcionario.avatar}
            alt={funcionario.nome}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h4 className="font-semibold text-slate-800">{funcionario.nome}</h4>
            <p className="text-sm text-slate-600">{funcionario.role}</p>
            <p className="text-sm text-amber-600">{funcionario.pontos} pontos atuais</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <Target className="w-4 h-4 inline mr-2" />
              Pontos a atribuir
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => ajustarPontos(-5)}
                className="p-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <div className="flex-1 text-center">
                <input
                  type="number"
                  value={pontos}
                  onChange={(e) => setPontos(parseInt(e.target.value) || 0)}
                  className="w-full text-center text-2xl font-bold py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  min="-100"
                  max="100"
                />
                <p className="text-xs text-slate-500 mt-1">-100 a +100 pontos</p>
              </div>
              <button
                type="button"
                onClick={() => ajustarPontos(5)}
                className="p-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Motivo
            </label>
            <textarea
              value={razao}
              onChange={(e) => setRazao(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
              rows={3}
              placeholder="Descreva o motivo da pontuação..."
              required
            />
          </div>

          <div>
            <p className="text-sm font-medium text-slate-700 mb-2">Motivos comuns:</p>
            <div className="flex flex-wrap gap-2">
              {presetRazao.map((presetRazao, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setRazao(presetRazao)}
                  className="text-xs px-3 py-1 bg-slate-100 text-slate-700 rounded-full hover:bg-slate-200 transition-colors"
                >
                  {presetRazao}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={`flex-1 px-4 py-2 rounded-lg transition-colors text-white ${
                pontos >= 0 
                  ? 'bg-green-500 hover:bg-green-600' 
                  : 'bg-red-500 hover:bg-red-600'
              }`}
            >
              {pontos >= 0 ? `+${pontos}` : pontos} pontos
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AtribuicaoDePontosModal;