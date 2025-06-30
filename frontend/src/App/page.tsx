import React, { useState} from 'react';

import CardFuncionario from '../Components/CardFuncionario';
import AddFuncionarioModal from '../Components/AddFuncionario';
import AtribuicaoDePontosModal from '../Components/PontosDeAtribuicao';
import FuncionarioList from '../Components/Ranking/FuncionarioList';
import EditarFuncionarioModal from '../Components/EditarFuncionarioModal';
import { useFuncionarios } from '../hooks/useFuncionarios';
import type { Funcionario } from '../Types/funcionario';

const Index = () => {
  const {funcionarios, loading,error, fetchFuncionarios: refetch, removeFuncionario,} = useFuncionarios();
  const [selectedFuncionario, setSelectedFuncionario] = useState<Funcionario | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAtribuirModal, setShowAtribuirModal] = useState(false);
  const [funcionarioParaAtribuir, setFuncionarioParaAtribuir] = useState<Funcionario | null>(null);
  const [editandoFuncionario, setEditandoFuncionario] = useState<Funcionario | null>(null);

  React.useEffect(() => {
    if (funcionarios.length > 0) {
      setSelectedFuncionario(funcionarios[0]);
    } else {
      setSelectedFuncionario(null);
    }
  }, [funcionarios]);

  if (loading) {
    return <div className="flex min-h-screen w-full items-center justify-center text-white text-xl">Carregando funcionarios...</div>;
  }
  if (error) {
    return <div className="flex min-h-screen w-full items-center justify-center text-red-400 text-xl">{error}</div>;
  }
  
  const funcionariosOrdenados = [...funcionarios].sort((a, b) => b.pontos - a.pontos);

  return (
    <div className="fixed inset-0 min-h-screen w-full bg-gradient-to-br from-[#6a4fb3] via-[#8f6fc2] to-[#b993d6] p-8 overflow-auto">
      <div className="w-full min-h-screen space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-extrabold text-amber-400 mb-2 tracking-tight drop-shadow-lg">
            U4HERO Ranking
          </h1>
          <p className="text-slate-200 text-lg italic">
            Reconhecer os colaboradores é o sucesso de um time
          </p>
        </div>

        <div className="flex justify-end mb-6">
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-yellow-500 hover:to-amber-400 text-slate-900 px-6 py-2 rounded-full font-bold shadow-lg transition-all duration-200 flex items-center gap-2">
            <span className="text-lg">+</span> Novo Colaborador
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center w-full">
          <div className="flex-shrink-0 w-full lg:w-1/3">
            {selectedFuncionario && (
              <CardFuncionario
                {...selectedFuncionario}
                tarefas={
                  (selectedFuncionario.tarefas ?? []).map(tarefa => ({
                    descricao: tarefa.descricao,
                    pontos: tarefa.pontos,
                    status: tarefa.status,
                    id: tarefa.id,
                  }))
                }
                refetchTarefas={refetch}
              />
            )}
          </div>
          <div className="flex-grow w-full lg:w-2/3">
            <FuncionarioList
              funcionarios={funcionariosOrdenados}
              selectedId={selectedFuncionario?.id ?? null}
              onSelect={setSelectedFuncionario}
              onAtribuir={funcionario => {
                setFuncionarioParaAtribuir(funcionario);
                setShowAtribuirModal(true);
              }}
              onEditar={funcionario => setEditandoFuncionario(funcionario)}
              onExcluir={async funcionario => {
                if (window.confirm(`Tem certeza que deseja excluir ${funcionario.nome}?`)) {
                  await removeFuncionario(funcionario.id);
                }
              }}
              renderRanking={(id: number) => {
                const idx = funcionariosOrdenados.findIndex(f => f.id === id);
                return idx > -1 ? idx + 1 : null;
              }}
            />
          </div>
        </div>
      </div>
      <AddFuncionarioModal isOpen={showAddModal} onClose={() => {
        setShowAddModal(false);
        refetch();
      }} />
      <EditarFuncionarioModal
        isOpen={!!editandoFuncionario}
        funcionario={editandoFuncionario}
        onClose={() => {
          setEditandoFuncionario(null);
          refetch();
        }}
      />
      {funcionarioParaAtribuir && (
        <AtribuicaoDePontosModal
          isOpen={showAtribuirModal}
          onClose={() => {
            setShowAtribuirModal(false);
            setFuncionarioParaAtribuir(null);
            refetch();
          }}
          funcionario={funcionarioParaAtribuir}
        />
      )}
    </div>
  );
};

export default Index;
