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
        title: "Action required",
        description: "Please describe the act of kindness you performed.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate saving delay for better UX
    setTimeout(() => {
      onActionLogged(action.trim());
      setAction('');
      setIsSubmitting(false);
      
      toast({
        title: "Action saved!",
        description: "Your act of kindness has been added to your history.",
      });
    }, 500);
  };

  return (
    <div className="slide-up">
      <Card className="kindness-card">
        <div className="flex items-center gap-3 mb-4">
          <PlusCircle className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-semibold text-foreground">
            Log a Kindness Action
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="action" className="text-base font-medium text-foreground">
              Describe your act of kindness
            </Label>
            <Textarea
              id="action"
              value={action}
              onChange={(e) => setAction(e.target.value)}
              placeholder="Example: I helped my neighbor carry her groceries..."
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
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Action
              </>
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ActionLogger;
