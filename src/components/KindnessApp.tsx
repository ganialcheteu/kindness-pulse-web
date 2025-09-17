import { useState, useEffect } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import KindnessReminder from './KindnessReminder';
import ActionLogger from './ActionLogger';
import StreakCounter from './StreakCounter';
import ActionHistory from './ActionHistory';

interface KindnessAction {
  id: string;
  action: string;
  date: string;
  completed: boolean;
}

const KindnessApp = () => {
  const [actions, setActions] = useState<KindnessAction[]>([]);

  useEffect(() => {
    // Charger les actions depuis le localStorage
    const savedActions = localStorage.getItem('kindnessActions');
    if (savedActions) {
      setActions(JSON.parse(savedActions));
    }
  }, []);

  const saveActions = (newActions: KindnessAction[]) => {
    setActions(newActions);
    localStorage.setItem('kindnessActions', JSON.stringify(newActions));
  };

  const handleActionCompleted = (action: string) => {
    const newAction: KindnessAction = {
      id: Date.now().toString(),
      action,
      date: new Date().toISOString(),
      completed: true,
    };

    const updatedActions = [...actions, newAction];
    saveActions(updatedActions);
  };

  const handleActionLogged = (action: string) => {
    const newAction: KindnessAction = {
      id: Date.now().toString(),
      action,
      date: new Date().toISOString(),
      completed: true,
    };

    const updatedActions = [...actions, newAction];
    saveActions(updatedActions);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* En-tête */}
      <header className="bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-3">
            <div className="relative">
              <Heart className="w-8 h-8 text-kindness" />
              <Sparkles className="w-4 h-4 text-accent-warm absolute -top-1 -right-1" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">
              Rappels de Bienveillance
            </h1>
          </div>
          <p className="text-center text-muted-foreground mt-2 max-w-2xl mx-auto">
            Cultivez l'habitude de la gentillesse avec des rappels quotidiens et suivez vos actions positives
          </p>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Rappel du jour */}
          <section>
            <KindnessReminder onActionCompleted={handleActionCompleted} />
          </section>

          {/* Statistiques */}
          <section>
            <StreakCounter totalActions={actions.length} />
          </section>

          {/* Formulaire d'enregistrement */}
          <section>
            <ActionLogger onActionLogged={handleActionLogged} />
          </section>

          {/* Historique */}
          <section>
            <ActionHistory actions={actions} />
          </section>
        </div>
      </main>

      {/* Pied de page */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-5 h-5 text-kindness" />
            <span className="text-foreground font-medium">Rappels de Bienveillance</span>
          </div>
          <p className="text-muted-foreground text-sm">
            Petits gestes, grands impacts. Rendez le monde un peu plus bienveillant chaque jour.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default KindnessApp;