import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Flame, Trophy, Calendar } from 'lucide-react';

interface StreakCounterProps {
  totalActions: number;
}

const StreakCounter = ({ totalActions }: StreakCounterProps) => {
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  useEffect(() => {
    calculateStreaks();
  }, [totalActions]);

  const calculateStreaks = () => {
    const actions = JSON.parse(localStorage.getItem('kindnessActions') || '[]');
    if (actions.length === 0) {
      setCurrentStreak(0);
      setLongestStreak(0);
      return;
    }

    // Calculer la série actuelle
    let streak = 0;
    let maxStreak = 0;
    const today = new Date();
    
    // Compter les jours consécutifs récents
    for (let i = 0; i < 30; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() - i);
      const dateString = checkDate.toDateString();
      
      const hasActionToday = actions.some((action: any) => {
        const actionDate = new Date(action.date);
        return actionDate.toDateString() === dateString;
      });

      if (hasActionToday) {
        streak++;
        maxStreak = Math.max(maxStreak, streak);
      } else if (i === 0) {
        // Si pas d'action aujourd'hui, vérifier hier
        continue;
      } else {
        break;
      }
    }

    setCurrentStreak(streak);
    
    // Calculer la plus longue série historique
    const saved = localStorage.getItem('longestStreak');
    const savedLongest = saved ? parseInt(saved) : 0;
    const newLongest = Math.max(savedLongest, maxStreak);
    setLongestStreak(newLongest);
    localStorage.setItem('longestStreak', newLongest.toString());
  };

  const getStreakMessage = () => {
    if (currentStreak === 0) return "Commencez votre série dès aujourd'hui !";
    if (currentStreak === 1) return "Excellent début ! Continuez demain.";
    if (currentStreak < 7) return `${currentStreak} jours de suite ! Formidable !`;
    if (currentStreak < 30) return `${currentStreak} jours consécutifs ! Incroyable !`;
    return `${currentStreak} jours ! Vous êtes un champion de la bienveillance !`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 fade-in">
      <Card className="kindness-card text-center">
        <Flame className={`w-8 h-8 mx-auto mb-3 ${currentStreak > 0 ? 'text-accent-warm' : 'text-muted-foreground'}`} />
        <h3 className="text-2xl font-bold text-foreground">{currentStreak}</h3>
        <p className="text-sm text-muted-foreground">Série actuelle</p>
      </Card>

      <Card className="kindness-card text-center">
        <Trophy className="w-8 h-8 mx-auto mb-3 text-kindness" />
        <h3 className="text-2xl font-bold text-foreground">{longestStreak}</h3>
        <p className="text-sm text-muted-foreground">Record personnel</p>
      </Card>

      <Card className="kindness-card text-center">
        <Calendar className="w-8 h-8 mx-auto mb-3 text-primary" />
        <h3 className="text-2xl font-bold text-foreground">{totalActions}</h3>
        <p className="text-sm text-muted-foreground">Total d'actions</p>
      </Card>

      <div className="md:col-span-3 mt-2">
        <p className="text-center text-muted-foreground text-sm">
          {getStreakMessage()}
        </p>
      </div>
    </div>
  );
};

export default StreakCounter;