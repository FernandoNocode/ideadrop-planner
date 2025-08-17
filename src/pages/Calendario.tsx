export default function Calendario() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">📅</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Calendário Avançado</h1>
          <p className="text-muted-foreground mb-8">
            Visão completa do seu planejamento de conteúdo
          </p>
          <div className="bg-card p-8 rounded-xl border">
            <h3 className="text-lg font-semibold mb-2">Em Desenvolvimento</h3>
            <p className="text-muted-foreground">
              Esta funcionalidade avançada será implementada na próxima fase do projeto.
              Aqui você poderá visualizar todos os seus vídeos agendados em uma interface
              de calendário interativa com drag & drop.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}