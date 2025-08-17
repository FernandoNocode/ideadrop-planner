import { useState } from "react";
import { Plus, Edit, Trash2, Globe, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock data - será substituído pelo Supabase
const mockChannels = [
  {
    id: "1",
    name: "Tech Tutorials BR",
    description: "Tutoriais de programação e tecnologia",
    language: "Português",
    niche: "Tecnologia",
    subNiche: "Programação",
    microNiche: "React",
    frequency: "3x por semana",
    scheduleTime: "09:00",
  },
  {
    id: "2",
    name: "Culinária Fácil",
    description: "Receitas práticas para o dia a dia",
    language: "Português",
    niche: "Lifestyle",
    subNiche: "Culinária",
    microNiche: "Receitas Rápidas",
    frequency: "Diário",
    scheduleTime: "12:00",
  },
  {
    id: "3",
    name: "Fitness com Ana",
    description: "Exercícios e dicas de saúde",
    language: "Português",
    niche: "Saúde",
    subNiche: "Exercícios",
    microNiche: "Treino em Casa",
    frequency: "2x por semana",
    scheduleTime: "18:00",
  },
];

export default function Portfolio() {
  const [channels] = useState(mockChannels);

  const handleEditChannel = (channelId: string) => {
    console.log("Editar canal:", channelId);
    // TODO: Implementar modal de edição
  };

  const handleDeleteChannel = (channelId: string) => {
    console.log("Excluir canal:", channelId);
    // TODO: Implementar confirmação e exclusão
  };

  const handleAddChannel = () => {
    console.log("Adicionar novo canal");
    // TODO: Implementar modal de criação
  };

  const getNicheHierarchy = (channel: any) => {
    const parts = [channel.niche, channel.subNiche, channel.microNiche].filter(Boolean);
    return parts.join(" › ");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Seu Portfólio</h1>
            <p className="text-muted-foreground">
              Gerencie todos os seus canais do YouTube
            </p>
          </div>
          <Button onClick={handleAddChannel} className="btn-hero">
            <Plus className="w-4 h-4 mr-2" />
            Novo Canal
          </Button>
        </div>

        {/* Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {channels.map((channel) => (
            <Card key={channel.id} className="card-elevated transition-all duration-200 hover:scale-[1.02] border-0">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Header do Canal */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-1">
                        {channel.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {channel.description}
                      </p>
                    </div>
                    <div className="flex space-x-1 ml-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditChannel(channel.id)}
                        className="h-8 w-8 p-0 hover:bg-accent"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteChannel(channel.id)}
                        className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Hierarquia de Nichos */}
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Categorização
                    </p>
                    <p className="text-sm bg-accent px-3 py-2 rounded-lg">
                      {getNicheHierarchy(channel)}
                    </p>
                  </div>

                  {/* Informações */}
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Globe className="w-4 h-4 mr-2" />
                      <span>{channel.language}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{channel.frequency} - {channel.scheduleTime}</span>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    <Badge variant="secondary" className="text-xs">
                      {channel.niche}
                    </Badge>
                    {channel.subNiche && (
                      <Badge variant="outline" className="text-xs">
                        {channel.subNiche}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Add Channel Card */}
          <Card 
            className="border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 transition-colors cursor-pointer"
            onClick={handleAddChannel}
          >
            <CardContent className="p-6 flex flex-col items-center justify-center h-full min-h-[300px] text-center">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
                <Plus className="w-6 h-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Adicionar Canal</h3>
              <p className="text-sm text-muted-foreground">
                Crie um novo canal para organizar sua produção de conteúdo
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Summary Stats */}
        <div className="mt-12 bg-card rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Resumo do Portfólio</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{channels.length}</div>
              <div className="text-sm text-muted-foreground">Canais Ativos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">
                {new Set(channels.map(c => c.niche)).size}
              </div>
              <div className="text-sm text-muted-foreground">Nichos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">
                {channels.filter(c => c.frequency.includes("Diário")).length}
              </div>
              <div className="text-sm text-muted-foreground">Postagem Diária</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">
                {channels.filter(c => c.frequency.includes("semana")).length}
              </div>
              <div className="text-sm text-muted-foreground">Postagem Semanal</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}