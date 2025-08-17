import { useState } from "react";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// Mock data - será substituído pelo Supabase
const mockChannels = [
  {
    id: "1",
    name: "Tech Tutorials BR",
    niche: "Tecnologia › Programação › React",
  },
  {
    id: "2",
    name: "Culinária Fácil",
    niche: "Lifestyle › Culinária › Receitas Rápidas",
  },
  {
    id: "3",
    name: "Fitness com Ana",
    niche: "Saúde › Exercícios › Treino em Casa",
  },
];

const mockIdeas = {
  "1": [
    "Como criar componentes reutilizáveis em React",
    "useState vs useReducer: Quando usar cada um?",
    "React Hooks: Guia completo para iniciantes",
    "Otimização de performance em aplicações React",
    "Context API: Gerenciamento de estado global",
  ],
  "2": [
    "5 Receitas de 15 minutos que vão salvar seu almoço",
    "Meal prep: Como organizar suas refeições da semana",
    "Sobremesas saudáveis em menos de 10 minutos",
    "Pratos únicos: Uma panela, mil sabores",
    "Lanches nutritivos para levar ao trabalho",
  ],
  "3": [
    "Treino HIIT de 20 minutos - Queime gordura em casa",
    "Exercícios para fortalecer o core sem equipamentos",
    "Yoga matinal: 15 minutos para despertar o corpo",
    "Treino de força com peso corporal",
    "Alongamentos essenciais pós-treino",
  ],
};

export default function Ideias() {
  const [selectedChannelId, setSelectedChannelId] = useState("1");
  const [newIdeaText, setNewIdeaText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const selectedChannel = mockChannels.find(c => c.id === selectedChannelId);
  const channelIdeas = mockIdeas[selectedChannelId as keyof typeof mockIdeas] || [];

  const filteredIdeas = channelIdeas.filter(idea =>
    idea.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddIdea = () => {
    if (newIdeaText.trim()) {
      console.log("Adicionar ideia:", newIdeaText, "para canal:", selectedChannelId);
      setNewIdeaText("");
      // TODO: Implementar adição no Supabase
    }
  };

  const handleEditIdea = (idea: string) => {
    console.log("Editar ideia:", idea);
    // TODO: Implementar edição inline ou modal
  };

  const handleDeleteIdea = (idea: string) => {
    console.log("Excluir ideia:", idea);
    // TODO: Implementar confirmação e exclusão
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddIdea();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Sua Mina de Ouro</h1>
          <p className="text-muted-foreground">
            Organize e gerencie suas ideias de conteúdo por canal
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna Esquerda - Lista de Canais */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Seus Canais</h2>
            <div className="space-y-2">
              {mockChannels.map((channel) => (
                <Card
                  key={channel.id}
                  className={`cursor-pointer transition-all duration-200 border ${
                    selectedChannelId === channel.id
                      ? "border-primary bg-primary/5 shadow-lg"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => setSelectedChannelId(channel.id)}
                >
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-1">{channel.name}</h3>
                    <p className="text-sm text-muted-foreground">{channel.niche}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {mockIdeas[channel.id as keyof typeof mockIdeas]?.length || 0} ideias
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Coluna Direita - Lista de Ideias */}
          <div className="lg:col-span-2 space-y-4">
            {selectedChannel && (
              <>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">{selectedChannel.name}</h2>
                    <p className="text-sm text-muted-foreground">{selectedChannel.niche}</p>
                  </div>
                  <Badge className="bg-primary text-primary-foreground">
                    {filteredIdeas.length} ideias
                  </Badge>
                </div>

                {/* Adicionar Nova Ideia */}
                <Card className="border-dashed border-2 border-muted-foreground/25">
                  <CardContent className="p-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Adicionar novo título..."
                        value={newIdeaText}
                        onChange={(e) => setNewIdeaText(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="flex-1"
                      />
                      <Button
                        onClick={handleAddIdea}
                        disabled={!newIdeaText.trim()}
                        className="btn-hero"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Busca */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Buscar ideias..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Lista de Ideias */}
                <div className="space-y-2">
                  {filteredIdeas.length === 0 ? (
                    <Card className="border-dashed">
                      <CardContent className="p-8 text-center">
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-2xl">💡</span>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">
                          {searchTerm ? "Nenhuma ideia encontrada" : "Nenhuma ideia ainda"}
                        </h3>
                        <p className="text-muted-foreground">
                          {searchTerm
                            ? "Tente buscar por outros termos"
                            : "Adicione sua primeira ideia de conteúdo acima"}
                        </p>
                      </CardContent>
                    </Card>
                  ) : (
                    filteredIdeas.map((idea, index) => (
                      <Card key={index} className="group hover:shadow-md transition-all duration-200">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <p className="text-sm flex-1 pr-4">{idea}</p>
                            <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditIdea(idea)}
                                className="h-8 w-8 p-0 hover:bg-accent"
                              >
                                <Edit className="w-3 h-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteIdea(idea)}
                                className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>

                {/* Estatísticas do Canal */}
                <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-0">
                  <CardContent className="p-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-primary">
                          {channelIdeas.length}
                        </div>
                        <div className="text-xs text-muted-foreground">Total de Ideias</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-success">
                          {Math.round(channelIdeas.length / 4)}
                        </div>
                        <div className="text-xs text-muted-foreground">Semanas de Conteúdo</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-warning">
                          {channelIdeas.length > 20 ? "Alta" : channelIdeas.length > 10 ? "Média" : "Baixa"}
                        </div>
                        <div className="text-xs text-muted-foreground">Produtividade</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}