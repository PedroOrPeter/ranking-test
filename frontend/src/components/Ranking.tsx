import { useState } from 'react';
import { Trophy, Medal, Award, Plus, Target } from 'lucide-react';
import AddCollaboratorModal from './AddFuncionario';
import AttributePointsModal from './PontosDeAtribuicao';

interface Funcionario {
  id: number;
  nome: string;
  pontos: number;
  avatar: string;
  role: string;
  emblemas: string[];
}

const QuadroDePontos = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPontosModal, setShowPontosModal] = useState(false);
  const [selectedFuncionario, setSelectedFuncionario] = useState<Funcionario | null>(null);

  const funcionario: Funcionario[] = [
    {
        id: 1,
        nome: 'Pedro Silva',
        pontos: 150,
        avatar: 'https://google.com/',
        role: 'Desenvolvedor Frontend',
        emblemas: ['Inovador', 'Colaborador']
    }
  ];

  const iconDeRank = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 1:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 2:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-slate-600 font-bold">{index + 1}</span>;
    }
  };

  const handlePoints = (funcionario: Funcionario) => {
    setSelectedFuncionario(funcionario);
    setShowPontosModal(true);
  };

  return (
    <div className="min-h-screen min-w-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-3xl w-full flex flex-col justify-center min-h-[70vh]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Trophy className="w-7 h-7 text-amber-500" />
            Ranking de Funcionarios
          </h2>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Adicionar
          </button>
        </div>

        <div className="space-y-3">
          {funcionario.map((funcionario, index) => (
            <div
              key={funcionario.id}
              className={`flex items-center p-4 rounded-lg transition-all hover:shadow-md ${
                index === 0
                  ? 'bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-200'
                  : 'bg-slate-50 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="flex items-center justify-center w-8 h-8">
                  {iconDeRank(index)}
                </div>
                <img
                  src={funcionario.avatar}
                  alt={funcionario.nome}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800">{funcionario.nome}</h3>
                  <p className="text-sm text-slate-600">{funcionario.role}</p>
                  <div className="flex gap-1 mt-1">
                    {funcionario.emblemas.map((badge, idx) => (
                      <span key={idx} className="text-xs bg-white px-2 py-1 rounded-full text-slate-700 shadow-sm">
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-amber-600">{funcionario.pontos}</div>
                  <div className="text-sm text-slate-500">pontos</div>
                </div>
                <button
                  onClick={() => handlePoints(funcionario)}
                  className="ml-4 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors"
                  title="Atribuir pontos"
                >
                  <Target className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg">
          <div className="flex items-center justify-between text-sm text-slate-600">
            <span>Total de funcionarios: {funcionario.length}</span>
            <span>Pontuação média: {Math.round(funcionario.reduce((sum, emp) => sum + emp.pontos, 0) / funcionario.length)}</span>
          </div>
        </div>
      </div>

      {showAddModal && (
        <AddCollaboratorModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
        />
      )}

      {showPontosModal && selectedFuncionario && (
        <AttributePointsModal
          isOpen={showPontosModal}
          onClose={() => {
            setShowPontosModal(false);
            setSelectedFuncionario(null);
          }}
          funcionario={selectedFuncionario}
        />
      )}
    </div>
  );
};

export default QuadroDePontos;