import { useState, useEffect } from 'react';
import { Heart, Sparkles, Menu, X } from 'lucide-react';
import KindnessReminder from './KindnessReminder';
import ActionLogger from './ActionLogger';
import StreakCounter from './StreakCounter';
import ActionHistory from './ActionHistory';
import heroImage from '../assets/hero-tanzanian-woman.jpg';

interface KindnessAction {
  id: string;
  action: string;
  date: string;
  completed: boolean;
}

const KindnessApp = () => {
  const [actions, setActions] = useState<KindnessAction[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/80">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="text-kindness font-righteous text-2xl md:text-3xl font-bold tracking-tight hover:text-kindness/90 transition-colors cursor-pointer">
                goodness
              </div>
            </div>

            {/* Navigation Desktop */}
            <div className="hidden md:flex items-center gap-6">
              <button 
                onClick={() => scrollToSection('reminder')}
                className="text-foreground hover:text-kindness transition-colors font-medium"
              >
                Rappel
              </button>
              <button 
                onClick={() => scrollToSection('stats')}
                className="text-foreground hover:text-kindness transition-colors font-medium"
              >
                Statistiques
              </button>
              <button 
                onClick={() => scrollToSection('logger')}
                className="text-foreground hover:text-kindness transition-colors font-medium"
              >
                Ajouter
              </button>
              <button 
                onClick={() => scrollToSection('history')}
                className="text-foreground hover:text-kindness transition-colors font-medium"
              >
                Historique
              </button>
            </div>

            {/* Menu Mobile Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Menu Mobile */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-border bg-card">
              <div className="py-2 space-y-1">
                <button 
                  onClick={() => scrollToSection('reminder')}
                  className="w-full text-left px-4 py-2 text-foreground hover:bg-accent transition-colors"
                >
                  Rappel du jour
                </button>
                <button 
                  onClick={() => scrollToSection('stats')}
                  className="w-full text-left px-4 py-2 text-foreground hover:bg-accent transition-colors"
                >
                  Statistiques
                </button>
                <button 
                  onClick={() => scrollToSection('logger')}
                  className="w-full text-left px-4 py-2 text-foreground hover:bg-accent transition-colors"
                >
                  Ajouter une action
                </button>
                <button 
                  onClick={() => scrollToSection('history')}
                  className="w-full text-left px-4 py-2 text-foreground hover:bg-accent transition-colors"
                >
                  Historique
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        className="relative min-h-[70vh] bg-cover bg-center bg-no-repeat flex items-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
            Cultivez la <span className="text-kindness-light">Bienveillance</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            Transformez votre quotidien avec des gestes simples de gentillesse. 
            Chaque action compte pour construire un monde plus bienveillant.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => scrollToSection('reminder')}
              className="bg-kindness text-kindness-foreground px-8 py-3 rounded-lg font-semibold hover:bg-kindness/90 transition-all transform hover:scale-105 shadow-lg"
            >
              Découvrir mon rappel du jour
            </button>
            <button 
              onClick={() => scrollToSection('logger')}
              className="bg-white/20 backdrop-blur-sm text-white border border-white/30 px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition-all transform hover:scale-105"
            >
              Partager une action
            </button>
          </div>
        </div>
      </section>

      {/* En-tête de contenu */}
      <header className="bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="relative">
                <Heart className="w-8 h-8 text-kindness" />
                <Sparkles className="w-4 h-4 text-accent-warm absolute -top-1 -right-1" />
              </div>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Suivez vos actions positives et construisez des habitudes durables pour un impact positif dans votre communauté.
            </p>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-16">
          {/* Section Rappel du jour */}
          <section id="reminder" className="scroll-mt-20">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-3">Votre rappel quotidien</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Chaque jour, découvrez une nouvelle suggestion d'action bienveillante adaptée à votre quotidien. 
                Ces petits gestes peuvent transformer votre journée et celle des autres.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <KindnessReminder onActionCompleted={handleActionCompleted} />
            </div>
          </section>

          {/* Section Statistiques */}
          <section id="stats" className="scroll-mt-20">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-3">Vos accomplissements</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Suivez votre progression et célébrez chaque action positive. 
                Construisez votre série d'actions bienveillantes jour après jour.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <StreakCounter totalActions={actions.length} />
            </div>
          </section>

          {/* Section Enregistrement */}
          <section id="logger" className="scroll-mt-20">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-3">Partagez vos actions</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Ajoutez vos propres actions de bienveillance à votre journal personnel. 
                Chaque geste compte et mérite d'être célébré et mémorisé.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <ActionLogger onActionLogged={handleActionLogged} />
            </div>
          </section>

          {/* Section Historique */}
          <section id="history" className="scroll-mt-20">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-3">Votre journal de bienveillance</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Relisez toutes vos actions passées et voyez le chemin parcouru. 
                Votre historique est une source d'inspiration et de motivation.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <ActionHistory actions={actions} />
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-20">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="text-kindness font-righteous text-lg font-bold tracking-tight">
                goodness
              </div>
            </div>
            <p className="text-muted-foreground mb-6">
              Petits gestes, grands impacts. Rendez le monde un peu plus bienveillant chaque jour.
            </p>
            <div className="flex justify-center gap-6 text-sm text-muted-foreground">
              <button 
                onClick={() => scrollToSection('reminder')}
                className="hover:text-kindness transition-colors"
              >
                Rappels
              </button>
              <button 
                onClick={() => scrollToSection('stats')}
                className="hover:text-kindness transition-colors"
              >
                Stats
              </button>
              <button 
                onClick={() => scrollToSection('logger')}
                className="hover:text-kindness transition-colors"
              >
                Ajouter
              </button>
              <button 
                onClick={() => scrollToSection('history')}
                className="hover:text-kindness transition-colors"
              >
                Historique
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default KindnessApp;