import { useState } from "react";
import { TaskCard } from "@/components/cards/TaskCard";
import { TaskStatus } from "@/components/ui/status-badge";
import { TitleSelectionModal } from "@/components/modals/TitleSelectionModal";
import { useToast } from "@/hooks/use-toast";

// Mock data - será substituído pelo Supabase
const mockTasks = [
  {
    id: "1",
    channelName: "Tech Tutorials BR",
    niche: "Tecnologia",
    subNiche: "Programação",
    microNiche: "React",
    scheduleTime: "09:00",
    status: "pendente" as TaskStatus,
    title: undefined,
  },
  {
    id: "2",
    channelName: "Culinária Fácil",
    niche: "Lifestyle",
    subNiche: "Culinária",
    microNiche: "Receitas Rápidas",
    scheduleTime: "12:00",
    status: "roteirizando" as TaskStatus,
    title: "5 Receitas de 15 Minutos que Vão Salvar Seu Almoço",
  },
  {
    id: "3",
    channelName: "Fitness com Ana",
    niche: "Saúde",
    subNiche: "Exercícios",
    microNiche: "Treino em Casa",
    scheduleTime: "18:00",
    status: "editando" as TaskStatus,
    title: "Treino HIIT de 20 Minutos - Queime Gordura em Casa",
  },
];

export default function Dashboard() {
  const [tasks, setTasks] = useState(mockTasks);
  const [isTitleModalOpen, setIsTitleModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
    
    toast({
      title: "Status atualizado",
      description: `Status alterado para ${newStatus}`,
    });
  };

  const handleGetTitle = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      setSelectedTaskId(taskId);
      setIsTitleModalOpen(true);
    }
  };

  const handleSelectTitle = (title: string) => {
    if (selectedTaskId) {
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === selectedTaskId ? { ...task, title } : task
        )
      );
      
      toast({
        title: "Título selecionado",
        description: "O título foi adicionado à tarefa.",
      });
    }
  };

  const getCurrentDate = () => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return now.toLocaleDateString('pt-BR', options);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl mb-4">
            <span className="text-2xl">🎯</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Sua Missão de Hoje</h1>
          <p className="text-muted-foreground text-lg">
            {getCurrentDate()}
          </p>
        </div>

        {/* Tasks Grid */}
        <div className="space-y-6">
          {tasks.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">😴</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Nenhuma tarefa para hoje</h3>
              <p className="text-muted-foreground">
                Que tal planejar alguns vídeos para amanhã?
              </p>
            </div>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                id={task.id}
                channelName={task.channelName}
                niche={task.niche}
                subNiche={task.subNiche}
                microNiche={task.microNiche}
                scheduleTime={task.scheduleTime}
                status={task.status}
                title={task.title}
                onStatusChange={handleStatusChange}
                onGetTitle={handleGetTitle}
              />
            ))
          )}
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Pendente", count: tasks.filter(t => t.status === "pendente").length, emoji: "⚪" },
            { label: "Roteirizando", count: tasks.filter(t => t.status === "roteirizando").length, emoji: "🟡" },
            { label: "Editando", count: tasks.filter(t => t.status === "editando").length, emoji: "🔵" },
            { label: "Agendado", count: tasks.filter(t => t.status === "agendado").length, emoji: "✅" },
          ].map((stat) => (
            <div key={stat.label} className="bg-card p-4 rounded-lg text-center">
              <div className="text-2xl mb-1">{stat.emoji}</div>
              <div className="text-2xl font-bold">{stat.count}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de Seleção de Título */}
      <TitleSelectionModal
        isOpen={isTitleModalOpen}
        onClose={() => setIsTitleModalOpen(false)}
        onSelectTitle={handleSelectTitle}
        channelName={selectedTaskId ? tasks.find(t => t.id === selectedTaskId)?.channelName || "" : ""}
      />
    </div>
  );
}