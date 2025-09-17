import { useState } from 'react'; 
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { History, Calendar, Heart, ChevronDown, ChevronUp } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale'; // switched from `fr` to `enUS`

interface KindnessAction {
  id: string;
  action: string;
  date: string;
  completed: boolean;
}

interface ActionHistoryProps {
  actions: KindnessAction[];
}

const ActionHistory = ({ actions }: ActionHistoryProps) => {
  const [showAll, setShowAll] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<string>('all');

  const sortedActions = [...actions].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const displayedActions = showAll ? sortedActions : sortedActions.slice(0, 5);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { 
      addSuffix: true, 
      locale: enUS 
    });
  };

  const getMonths = () => {
    const months = new Set(
      actions.map(action => {
        const date = new Date(action.date);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      })
    );
    return Array.from(months).sort().reverse();
  };

  const filteredActions = selectedMonth === 'all' 
    ? displayedActions 
    : displayedActions.filter(action => {
        const date = new Date(action.date);
        const actionMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        return actionMonth === selectedMonth;
      });

  const getMonthName = (monthString: string) => {
    const [year, month] = monthString.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  if (actions.length === 0) {
    return (
      <Card className="kindness-card text-center">
        <History className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Your Kindness History
        </h3>
        <p className="text-muted-foreground">
          Your kindness actions will appear here once you start recording them.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4 slide-up">
      <Card className="kindness-card">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <History className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-semibold text-foreground">
              History ({actions.length} actions)
            </h3>
          </div>

          {getMonths().length > 1 && (
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-3 py-1 border border-border rounded-md text-sm bg-background"
            >
              <option value="all">All months</option>
              {getMonths().map(month => (
                <option key={month} value={month}>
                  {getMonthName(month)}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="space-y-3">
          {filteredActions.map((action, index) => (
            <div
              key={action.id}
              className="flex items-start gap-4 p-4 bg-secondary/50 rounded-lg hover:bg-secondary/80 transition-colors"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex-shrink-0 mt-1">
                <Heart className="w-5 h-5 text-kindness" />
              </div>
              
              <div className="flex-1">
                <p className="text-foreground leading-relaxed mb-2">
                  {action.action}
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(action.date)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!showAll && sortedActions.length > 5 && (
          <div className="mt-4 text-center">
            <Button
              variant="ghost"
              onClick={() => setShowAll(true)}
              className="text-primary hover:text-primary/80"
            >
              <ChevronDown className="w-4 h-4 mr-2" />
              Show more ({sortedActions.length - 5} more)
            </Button>
          </div>
        )}

        {showAll && sortedActions.length > 5 && (
          <div className="mt-4 text-center">
            <Button
              variant="ghost"
              onClick={() => setShowAll(false)}
              className="text-primary hover:text-primary/80"
            >
              <ChevronUp className="w-4 h-4 mr-2" />
              Show less
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ActionHistory;
