import { X, Target, Plus, Minus } from 'lucide-react';
import React, { useState } from 'react';
interface Funcionario {
  id: number;
  nome: string;
  pontos: number;
  avatar: string;
  posicao: string;
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:3000/pontuacao/${funcionario.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          descricao: razao,
          pontos: pontos
        })
      });
      onClose();
      setPontos(10);
      setRazao('');
    } catch (error) {
      alert('Erro ao atribuir pontos');
    }
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
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto pointer-events-auto">
      <div className="absolute inset-0 backdrop-blur-[3px] backdrop-brightness-75" style={{ zIndex: 1 }} aria-hidden="true"></div>
      <div className="relative z-10 bg-gradient-to-br from-yellow-50 via-white to-amber-100 rounded-2xl p-6 sm:p-8 w-full max-w-md sm:max-w-md mx-2 sm:mx-4 shadow-2xl border-2 border-amber-200 animate-fadeIn max-h-[90vh] overflow-y-auto flex flex-col scrollbar-none">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-extrabold text-amber-500 tracking-tight flex items-center gap-2">
            <Target className="w-6 h-6 text-amber-400" /> Atribuir Pontos
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-amber-500 transition-colors rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-amber-400"
            title="Fechar"
          >
            <X className="w-7 h-7" />
          </button>
        </div>

        <div className="flex items-center gap-4 mb-8 p-4 bg-gradient-to-r from-amber-100 to-yellow-50 rounded-xl border border-amber-200 shadow-sm">
          <img
            src={funcionario.avatar}
            alt={funcionario.nome}
            className="w-14 h-14 rounded-full object-cover border-2 border-amber-300 shadow"
          />
          <div>
            <h4 className="font-bold text-lg text-slate-800">{funcionario.nome}</h4>
            <p className="text-sm text-slate-600 font-medium">{funcionario.posicao}</p>
            <p className="text-sm text-amber-600 font-bold">{funcionario.pontos} pontos atuais</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              <Target className="w-4 h-4 inline mr-2 text-amber-400" /> Pontos a atribuir
            </label>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => ajustarPontos(-5)}
                className="p-2 border-2 border-amber-200 rounded-lg bg-white hover:bg-amber-50 transition-colors shadow-sm"
              >
                <Minus className="w-4 h-4 text-amber-500" />
              </button>
              <div className="flex-1 text-center">
                <input
                  type="number"
                  value={pontos}
                  onChange={(e) => setPontos(parseInt(e.target.value) || 0)}
                  className="w-full text-center text-2xl font-extrabold py-2 border-2 border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white/80 text-amber-700 shadow-sm"
                  min="-100"
                  max="100"
                />
                <p className="text-xs text-slate-500 mt-1">-100 a +100 pontos</p>
              </div>
              <button
                type="button"
                onClick={() => ajustarPontos(5)}
                className="p-2 border-2 border-amber-200 rounded-lg bg-white hover:bg-amber-50 transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4 text-amber-500" />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Motivo
            </label>
            <textarea
              value={razao}
              onChange={(e) => setRazao(e.target.value)}
              className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none font-semibold bg-white/80 text-slate-800 placeholder:italic placeholder:text-slate-400 shadow-sm"
              rows={3}
              placeholder="Descreva o motivo da pontuação..."
              required
            />
          </div>

          <div>
            <p className="text-sm font-bold text-slate-700 mb-2">Motivos comuns:</p>
            <div className="flex flex-wrap gap-2">
              {presetRazao.map((presetRazao, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setRazao(presetRazao)}
                  className="text-xs px-3 py-1 bg-gradient-to-r from-amber-100 to-yellow-50 text-amber-700 rounded-full hover:bg-amber-200 border border-amber-200 font-semibold shadow-sm transition-colors"
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
              className="flex-1 px-4 py-2 border-2 border-amber-200 text-amber-600 rounded-lg hover:bg-amber-50 transition-colors font-bold shadow-sm"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={`flex-1 px-4 py-2 rounded-lg transition-colors font-bold shadow-md text-white ${
                pontos >= 0 
                  ? 'bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-yellow-500 hover:to-amber-400' 
                  : 'bg-gradient-to-r from-red-500 to-amber-400 hover:from-red-600 hover:to-amber-500'
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