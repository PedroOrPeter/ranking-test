
import { useState, useEffect } from 'react';
import type { Funcionario } from '../Types/funcionario';
import CardFuncionario from '../Components/CardFuncionario';

const Index = () => {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [selectedFuncionario, setSelectedFuncionario] = useState<Funcionario | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/funcionarios');
        if (!response.ok) throw new Error('Erro ao buscar funcionarios');
        const data = await response.json();
        setFuncionarios(data);
        setSelectedFuncionario(data[0] || null);
      }
        catch (err) {
            setError('Erro ao buscar funcionarios: ' + (err instanceof Error ? err.message : 'Erro desconhecido'));
        } finally {
            setLoading(false);
        }
    };
  }, []);

  if (loading) {
    return <div className="flex min-h-screen w-full items-center justify-center text-white text-xl">Carregando funcionarios...</div>;
  }
  if (error) {
    return <div className="flex min-h-screen w-full items-center justify-center text-red-400 text-xl">{error}</div>;
  }

  return (
    <div className="fixed inset-0 min-h-screen w-full bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 p-8 overflow-auto">
      <div className="w-full min-h-screen space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white mb-2">
            Melhores Funcionários!!!
          </h1>
          <p className="text-slate-300 text-lg">
            Acompanhe o desempenho de seu time
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center w-full">
          <div className="flex-shrink-0 w-full lg:w-1/3">
            {selectedFuncionario && <CardFuncionario {...selectedFuncionario} />}
          </div>
          <div className="flex-grow w-full lg:w-2/3">
            <div className="space-y-3">
              {funcionarios.map((funcionario) => (
                <div
                  key={funcionario.id || funcionario.nome}
                  className={`flex items-center p-4 rounded-lg transition-all hover:shadow-md cursor-pointer ${
                    selectedFuncionario && selectedFuncionario.id === funcionario.id
                      ? 'bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-200'
                      : 'bg-slate-50 hover:bg-slate-100'
                  }`}
                  onClick={() => setSelectedFuncionario(funcionario)}
                >
                  <img
                    src={funcionario.avatar}
                    alt={funcionario.nome}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm mr-4"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800">{funcionario.nome}</h3>
                    <p className="text-sm text-slate-600">{funcionario.role}</p>
                    <div className="flex gap-1 mt-1 flex-wrap">
                      {funcionario.conquistas.map((badge, idx) => (
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
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 text-white">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm">Sistema ativo e funcionando</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
