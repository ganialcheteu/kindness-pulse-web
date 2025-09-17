import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Sparkles } from 'lucide-react';

const kindnessIdeas = [
  "Envoyez un message d'encouragement à un ami",
  "Complimentez sincèrement quelqu'un aujourd'hui",
  "Aidez un collègue avec une tâche difficile",
  "Écoutez attentivement quelqu'un qui a besoin de parler",
  "Laissez une note positive à un proche",
  "Offrez votre place dans les transports en commun",
  "Partagez un sourire avec un inconnu",
  "Remerciez quelqu'un qui travaille dur",
  "Proposez votre aide sans qu'on vous le demande",
  "Pardonnez une petite erreur avec bienveillance",
  "Apportez un café à un collègue",
  "Appelez un proche pour prendre de ses nouvelles",
  "Donnez un pourboire généreux",
  "Laissez passer quelqu'un devant vous dans la queue",
  "Complimentez le travail de quelqu'un publiquement"
];

interface KindnessReminderProps {
  onActionCompleted: (action: string) => void;
}

const KindnessReminder = ({ onActionCompleted }: KindnessReminderProps) => {
  const [todaysReminder, setTodaysReminder] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    // Sélectionner un rappel basé sur la date du jour pour la cohérence
    const today = new Date().toDateString();
    const savedReminder = localStorage.getItem(`todaysReminder-${today}`);
    const savedCompleted = localStorage.getItem(`completed-${today}`) === 'true';
    
    if (savedReminder) {
      setTodaysReminder(savedReminder);
    } else {
      const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
      const reminderIndex = dayOfYear % kindnessIdeas.length;
      const reminder = kindnessIdeas[reminderIndex];
      setTodaysReminder(reminder);
      localStorage.setItem(`todaysReminder-${today}`, reminder);
    }
    
    setIsCompleted(savedCompleted);
  }, []);

  const handleComplete = () => {
    if (!isCompleted) {
      const today = new Date().toDateString();
      localStorage.setItem(`completed-${today}`, 'true');
      setIsCompleted(true);
      onActionCompleted(todaysReminder);
    }
  };

  return (
    <div className="fade-in">
      <Card className="kindness-card text-center relative overflow-hidden">
        <div className="absolute top-4 right-4">
          <Sparkles className="w-6 h-6 text-primary opacity-20" />
        </div>
        
        <div className="mb-4">
          <Heart className="w-12 h-12 text-kindness mx-auto mb-3" />
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            Rappel du jour
          </h2>
        </div>

        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
          {todaysReminder}
        </p>

        <Button
          onClick={handleComplete}
          disabled={isCompleted}
          className={`px-8 py-3 text-base font-medium transition-all ${
            isCompleted 
              ? 'bg-kindness hover:bg-kindness text-kindness-foreground' 
              : 'bg-primary hover:bg-primary/90 text-primary-foreground'
          }`}
        >
          {isCompleted ? (
            <>
              <Heart className="w-4 h-4 mr-2" />
              Accompli aujourd'hui !
            </>
          ) : (
            'Marquer comme fait'
          )}
        </Button>

        {isCompleted && (
          <p className="text-kindness text-sm mt-3 font-medium">
            Merci pour votre bienveillance ! 💚
          </p>
        )}
      </Card>
    </div>
  );
};

export default KindnessReminder;