import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Idea {
  id?: string;
  title: string;
  channelId: string;
  channelName?: string;
}

interface Channel {
  id: string;
  name: string;
}

interface IdeaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (idea: Idea) => void;
  idea?: Idea | null;
  channels: Channel[];
  preSelectedChannelId?: string;
}

export function IdeaModal({ 
  isOpen, 
  onClose, 
  onSave, 
  idea, 
  channels,
  preSelectedChannelId 
}: IdeaModalProps) {
  const [formData, setFormData] = useState<Idea>({
    title: "",
    channelId: preSelectedChannelId || "",
  });

  useEffect(() => {
    if (idea) {
      setFormData(idea);
    } else {
      setFormData({
        title: "",
        channelId: preSelectedChannelId || "",
      });
    }
  }, [idea, isOpen, preSelectedChannelId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.channelId) return;
    
    onSave(formData);
    onClose();
  };

  const handleInputChange = (field: keyof Idea, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-xl">
            {idea ? "Editar Ideia" : "Nova Ideia"}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="channel">Canal *</Label>
              <Select
                value={formData.channelId}
                onValueChange={(value) => handleInputChange("channelId", value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um canal" />
                </SelectTrigger>
                <SelectContent>
                  {channels.map((channel) => (
                    <SelectItem key={channel.id} value={channel.id}>
                      {channel.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="title">Título do Vídeo *</Label>
              <Textarea
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Ex: Como Criar um Hook Customizado em React - Tutorial Completo"
                required
                rows={4}
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Escreva um título atrativo e descritivo para o vídeo
              </p>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button 
                type="submit" 
                className="btn-primary"
                disabled={!formData.title.trim() || !formData.channelId}
              >
                {idea ? "Atualizar" : "Adicionar"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}