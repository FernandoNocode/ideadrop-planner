import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type TaskStatus = "pendente" | "roteirizando" | "editando" | "agendado";

interface StatusBadgeProps {
  status: TaskStatus;
  className?: string;
}

const statusConfig = {
  pendente: {
    label: "Pendente",
    emoji: "⚪",
    className: "status-pending",
  },
  roteirizando: {
    label: "Roteirizando",
    emoji: "🟡",
    className: "status-roteirizando",
  },
  editando: {
    label: "Editando",
    emoji: "🔵",
    className: "status-editando",
  },
  agendado: {
    label: "Agendado",
    emoji: "✅",
    className: "status-agendado",
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <Badge
      className={cn(
        "font-medium text-xs px-3 py-1 rounded-full border-0",
        config.className,
        className
      )}
    >
      <span className="mr-1">{config.emoji}</span>
      {config.label}
    </Badge>
  );
}