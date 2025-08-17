import { useState } from "react";
import { Clock, ChevronDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge, TaskStatus } from "@/components/ui/status-badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TaskCardProps {
  id: string;
  channelName: string;
  niche: string;
  subNiche?: string;
  microNiche?: string;
  scheduleTime: string;
  status: TaskStatus;
  title?: string;
  onStatusChange: (id: string, newStatus: TaskStatus) => void;
  onGetTitle: (id: string) => void;
}

const statusOptions: TaskStatus[] = ["pendente", "roteirizando", "editando", "agendado"];

export function TaskCard({
  id,
  channelName,
  niche,
  subNiche,
  microNiche,
  scheduleTime,
  status,
  title,
  onStatusChange,
  onGetTitle,
}: TaskCardProps) {
  const [currentStatus, setCurrentStatus] = useState<TaskStatus>(status);

  const handleStatusChange = (newStatus: TaskStatus) => {
    setCurrentStatus(newStatus);
    onStatusChange(id, newStatus);
  };

  const getNicheHierarchy = () => {
    const parts = [niche, subNiche, microNiche].filter(Boolean);
    return parts.join(" › ");
  };

  return (
    <Card className="card-elevated transition-all duration-200 hover:scale-[1.02] border-0">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Canal e Nicho */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">
              {channelName}
            </h3>
            <p className="text-sm text-muted-foreground">
              {getNicheHierarchy()}
            </p>
          </div>

          {/* Horário */}
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="w-4 h-4 mr-2" />
            <span>Postar às {scheduleTime}</span>
          </div>

          {/* Status Selector */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Status:</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8">
                    <StatusBadge status={currentStatus} />
                    <ChevronDown className="w-3 h-3 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {statusOptions.map((statusOption) => (
                    <DropdownMenuItem
                      key={statusOption}
                      onClick={() => handleStatusChange(statusOption)}
                      className="cursor-pointer"
                    >
                      <StatusBadge status={statusOption} />
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Título ou Botão para Pegar Título */}
          <div className="pt-2 border-t border-border">
            {title ? (
              <div>
                <p className="text-sm font-medium mb-1">Título:</p>
                <p className="text-sm text-muted-foreground bg-accent p-3 rounded-lg">
                  {title}
                </p>
              </div>
            ) : (
              <Button
                onClick={() => onGetTitle(id)}
                variant="outline"
                className="w-full btn-glass"
              >
                💡 Pegar Título do Banco de Ideias
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}