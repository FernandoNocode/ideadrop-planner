import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Channel {
  id?: string;
  name: string;
  description: string;
  language: string;
  niche: string;
  subNiche: string;
  microNiche: string;
  frequency: string;
  scheduleTime: string;
}

interface ChannelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (channel: Channel) => void;
  channel?: Channel | null;
  title: string;
}

const frequencyOptions = [
  { value: "daily", label: "Diário" },
  { value: "3x-week", label: "3x por semana" },
  { value: "2x-week", label: "2x por semana" },
  { value: "weekly", label: "Semanal" },
  { value: "biweekly", label: "Quinzenal" },
];

const languageOptions = [
  { value: "pt", label: "Português" },
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
];

export function ChannelModal({ isOpen, onClose, onSave, channel, title }: ChannelModalProps) {
  const [formData, setFormData] = useState<Channel>({
    name: "",
    description: "",
    language: "pt",
    niche: "",
    subNiche: "",
    microNiche: "",
    frequency: "daily",
    scheduleTime: "09:00",
  });

  useEffect(() => {
    if (channel) {
      setFormData(channel);
    } else {
      setFormData({
        name: "",
        description: "",
        language: "pt",
        niche: "",
        subNiche: "",
        microNiche: "",
        frequency: "daily",
        scheduleTime: "09:00",
      });
    }
  }, [channel, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleInputChange = (field: keyof Channel, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-xl">{title}</CardTitle>
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
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informações Básicas */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Informações Básicas</h3>
              
              <div>
                <Label htmlFor="name">Nome do Canal *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Ex: Tech Tutorials BR"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Descreva brevemente o conteúdo do canal"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="language">Idioma</Label>
                <Select
                  value={formData.language}
                  onValueChange={(value) => handleInputChange("language", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languageOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Categorização */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Categorização</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="niche">Nicho *</Label>
                  <Input
                    id="niche"
                    value={formData.niche}
                    onChange={(e) => handleInputChange("niche", e.target.value)}
                    placeholder="Ex: Tecnologia"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="subNiche">Sub-nicho</Label>
                  <Input
                    id="subNiche"
                    value={formData.subNiche}
                    onChange={(e) => handleInputChange("subNiche", e.target.value)}
                    placeholder="Ex: Programação"
                  />
                </div>

                <div>
                  <Label htmlFor="microNiche">Micro-nicho</Label>
                  <Input
                    id="microNiche"
                    value={formData.microNiche}
                    onChange={(e) => handleInputChange("microNiche", e.target.value)}
                    placeholder="Ex: React"
                  />
                </div>
              </div>
            </div>

            {/* Agenda de Postagem */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Agenda de Postagem</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="frequency">Frequência</Label>
                  <Select
                    value={formData.frequency}
                    onValueChange={(value) => handleInputChange("frequency", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {frequencyOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="scheduleTime">Horário de Postagem</Label>
                  <Input
                    id="scheduleTime"
                    type="time"
                    value={formData.scheduleTime}
                    onChange={(e) => handleInputChange("scheduleTime", e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Botões */}
            <div className="flex justify-end space-x-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" className="btn-primary">
                {channel ? "Atualizar Canal" : "Criar Canal"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}