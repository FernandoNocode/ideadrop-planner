import { useState } from "react";
import { X, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Idea {
  id: string;
  title: string;
  channelName: string;
}

interface TitleSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTitle: (title: string) => void;
  channelName: string;
}

// Mock data - será substituído pelo Supabase
const mockIdeas: Idea[] = [
  {
    id: "1",
    title: "Como Criar um Hook Customizado em React - Tutorial Completo",
    channelName: "Tech Tutorials BR",
  },
  {
    id: "2", 
    title: "useState vs useReducer: Qual Usar e Quando?",
    channelName: "Tech Tutorials BR",
  },
  {
    id: "3",
    title: "Otimização de Performance no React - 5 Dicas Essenciais",
    channelName: "Tech Tutorials BR",
  },
  {
    id: "4",
    title: "Context API vs Redux: Batalha dos Gerenciadores de Estado",
    channelName: "Tech Tutorials BR",
  },
  {
    id: "5",
    title: "React Server Components: O Futuro do React?",
    channelName: "Tech Tutorials BR",
  },
];

export function TitleSelectionModal({ 
  isOpen, 
  onClose, 
  onSelectTitle, 
  channelName 
}: TitleSelectionModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredIdeas, setFilteredIdeas] = useState(mockIdeas);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filtered = mockIdeas.filter(idea => 
      idea.title.toLowerCase().includes(term.toLowerCase()) &&
      idea.channelName === channelName
    );
    setFilteredIdeas(filtered);
  };

  const handleSelectTitle = (title: string) => {
    onSelectTitle(title);
    onClose();
  };

  if (!isOpen) return null;

  const channelIdeas = filteredIdeas.filter(idea => idea.channelName === channelName);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[80vh] flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between pb-4 flex-shrink-0">
          <div>
            <CardTitle className="text-xl">Selecionar Título</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Canal: {channelName}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="flex-1 overflow-hidden flex flex-col">
          {/* Busca */}
          <div className="relative mb-4 flex-shrink-0">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Buscar títulos..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Lista de Títulos */}
          <div className="flex-1 overflow-y-auto space-y-3">
            {channelIdeas.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💡</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Nenhuma ideia encontrada</h3>
                <p className="text-sm text-muted-foreground">
                  {searchTerm ? "Tente uma busca diferente" : "Adicione algumas ideias para este canal"}
                </p>
              </div>
            ) : (
              channelIdeas.map((idea) => (
                <div
                  key={idea.id}
                  className="p-4 border border-border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors"
                  onClick={() => handleSelectTitle(idea.title)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium leading-relaxed">
                        {idea.title}
                      </p>
                    </div>
                    <Badge variant="secondary" className="ml-3 text-xs">
                      Selecionar
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Botão para adicionar nova ideia */}
          <div className="pt-4 border-t border-border flex-shrink-0">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                // TODO: Abrir modal de adicionar ideia
                console.log("Abrir modal de adicionar ideia");
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Nova Ideia
            </Button>
          </div>

          {/* Botões de ação */}
          <div className="flex justify-end space-x-3 pt-4 flex-shrink-0">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}