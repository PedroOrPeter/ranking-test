import { Trophy, Target, Award } from 'lucide-react';

interface FuncionarioCardProps {
  nome: string;
  posicao: string;
  pontos: number;
  avatar: string;
  conquistas: string[];
  tarefas: { nome: string; pontos: number; status: 'completo' | 'pendente' }[];
}

const CardFuncionario = ({ nome, posicao, pontos, avatar, conquistas, tarefas }: FuncionarioCardProps) => {
  return (
    <div className="p-6 bg-gradient-to-br from-slate-50 to-slate-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 rounded-lg border border-slate-200 shadow-sm">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="relative">
          <img 
            src={avatar} 
            alt={nome}
            className="w-20 h-20 rounded-full object-cover border-4 border-amber-200"
          />
          <div className="absolute -top-2 -right-2 bg-amber-500 text-white rounded-full p-2">
            <Trophy className="w-4 h-4" />
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-bold text-slate-800">{nome}</h3>
          <p className="text-slate-600 text-sm">{posicao}</p>
        </div>

        <div className="bg-amber-100 px-4 py-2 rounded-full">
          <span className="text-amber-800 font-bold text-lg">{pontos}pts</span>
        </div>

        <div className="w-full space-y-3">
          <h4 className="font-semibold text-slate-700 flex items-center gap-2">
            <Target className="w-4 h-4" />
            Tarefas Recentes
          </h4>
          {tarefas.map((tarefa, index) => (
            <div key={index} className="flex justify-between items-center bg-white p-2 rounded-md">
              <span className="text-sm text-slate-700">{tarefa.nome}</span>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  tarefa.status === 'completo' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {tarefa.status === 'completo' ? '+' : ''}{tarefa.pontos}pts
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full">
          <h4 className="font-semibold text-slate-700 mb-2 flex items-center gap-2">
            <Award className="w-4 h-4" />
            Conquistas
          </h4>
          <div className="flex flex-wrap gap-1">
            {conquistas.map((conquista, index) => (
                <span key={index} className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-slate-100 text-slate-800 hover:bg-slate-200">
                {conquista}
                </span>
            ))}
          </div>
        </div>
      </div>
    </div>
);
};

export default CardFuncionario;