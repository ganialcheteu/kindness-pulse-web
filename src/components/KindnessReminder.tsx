import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Sparkles } from 'lucide-react';

const kindnessIdeas = [
  "Send an encouraging message to a friend",
  "Give someone a sincere compliment today",
  "Help a colleague with a difficult task",
  "Listen attentively to someone who needs to talk",
  "Leave a positive note for someone you care about",
  "Offer your seat on public transport",
  "Share a smile with a stranger",
  "Thank someone who's working hard",
  "Offer your help without being asked",
  "Forgive a small mistake with kindness",
  "Bring a coffee to a colleague",
  "Call a loved one to check in",
  "Leave a generous tip",
  "Let someone go ahead of you in line",
  "Publicly compliment someone’s work"
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
            reminder daily
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
              Done today !
            </>
          ) : (
            'Marquer comme fait'
          )}
        </Button>

        {isCompleted && (
          <p className="text-kindness text-sm mt-3 font-medium">
            Thank you for your kindness ! 💚
          </p>
        )}
      </Card>
    </div>
  );
};

export default KindnessReminder;