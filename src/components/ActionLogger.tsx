import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { PlusCircle, Save } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ActionLoggerProps {
  onActionLogged: (action: string) => void;
}

const ActionLogger = ({ onActionLogged }: ActionLoggerProps) => {
  const [action, setAction] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!action.trim()) {
      toast({
        title: "Action requise",
        description: "Veuillez décrire l'acte de bienveillance que vous avez accompli.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulation d'un délai de sauvegarde pour une meilleure UX
    setTimeout(() => {
      onActionLogged(action.trim());
      setAction('');
      setIsSubmitting(false);
      
      toast({
        title: "Action enregistrée !",
        description: "Votre acte de bienveillance a été ajouté à votre historique.",
      });
    }, 500);
  };

  return (
    <div className="slide-up">
      <Card className="kindness-card">
        <div className="flex items-center gap-3 mb-4">
          <PlusCircle className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-semibold text-foreground">
            Enregistrer une action
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="action" className="text-base font-medium text-foreground">
              Décrivez votre acte de bienveillance
            </Label>
            <Textarea
              id="action"
              value={action}
              onChange={(e) => setAction(e.target.value)}
              placeholder="Exemple : J'ai aidé ma voisine à porter ses courses..."
              className="mt-2 min-h-[100px] resize-none"
              disabled={isSubmitting}
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || !action.trim()}
            className="w-full bg-kindness hover:bg-kindness/90 text-kindness-foreground font-medium py-3"
          >
            {isSubmitting ? (
              <>
                <Save className="w-4 h-4 mr-2 animate-pulse" />
                Enregistrement...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Enregistrer l'action
              </>
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ActionLogger;