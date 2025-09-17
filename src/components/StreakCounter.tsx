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
  if (currentStreak === 0) return "Start your kindness streak today!";
  if (currentStreak === 1) return "Great start! Keep it going tomorrow.";
  if (currentStreak < 7) return `${currentStreak} days in a row! Awesome job!`;
  if (currentStreak < 30) return `${currentStreak} consecutive days! Incredible!`;
  return `${currentStreak} days! You're a kindness champion!`;
};


  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 fade-in">
      <Card className="kindness-card text-center">
        <Flame className={`w-8 h-8 mx-auto mb-3 ${currentStreak > 0 ? 'text-accent-warm' : 'text-muted-foreground'}`} />
        <h3 className="text-2xl font-bold text-foreground">{currentStreak}</h3>
        <p className="text-sm text-muted-foreground">Current series</p>
      </Card>

      <Card className="kindness-card text-center">
        <Trophy className="w-8 h-8 mx-auto mb-3 text-kindness" />
        <h3 className="text-2xl font-bold text-foreground">{longestStreak}</h3>
        <p className="text-sm text-muted-foreground">Personal record</p>
      </Card>

      <Card className="kindness-card text-center">
        <Calendar className="w-8 h-8 mx-auto mb-3 text-primary" />
        <h3 className="text-2xl font-bold text-foreground">{totalActions}</h3>
        <p className="text-sm text-muted-foreground">Total shares</p>
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