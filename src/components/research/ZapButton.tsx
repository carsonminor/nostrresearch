import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { Zap } from 'lucide-react';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useToast } from '@/hooks/useToast';
import type { NostrEvent } from '@nostrify/nostrify';

interface ZapButtonProps {
  paper: NostrEvent;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
}

export function ZapButton({ paper, variant = 'outline', size = 'sm' }: ZapButtonProps) {
  const { user } = useCurrentUser();
  const { toast } = useToast();
  const [zapAmount, setZapAmount] = useState([5]);
  const [isOpen, setIsOpen] = useState(false);
  const [isZapping, setIsZapping] = useState(false);

  // Get zap limit from paper tags (default 10 sats)
  const zapLimit = parseInt(paper.tags.find(([name]) => name === 'zap_limit')?.[1] || '10');

  const handleZap = async () => {
    if (!user) {
      toast({
        title: 'Login Required',
        description: 'Please log in to zap research papers.',
        variant: 'destructive',
      });
      return;
    }

    setIsZapping(true);
    try {
      // Simulate zap for demo purposes
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: 'Zap Sent!',
        description: `Successfully zapped ${zapAmount[0]} sats to support this research.`,
      });

      setIsOpen(false);
    } catch {
      toast({
        title: 'Zap Failed',
        description: 'Failed to send zap. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsZapping(false);
    }
  };

  if (!user) {
    return (
      <Button
        variant={variant}
        size={size}
        onClick={() => toast({
          title: 'Login Required',
          description: 'Please log in to zap research papers.',
          variant: 'destructive',
        })}
      >
        <Zap className="h-4 w-4 mr-2" />
        Zap
      </Button>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} size={size}>
          <Zap className="h-4 w-4 mr-2" />
          Zap
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Zap Research Paper</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground mb-4">
              Support quality research by zapping this paper. Your zap helps validate valuable contributions to science.
            </p>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium">Amount (sats)</label>
                  <span className="text-sm text-muted-foreground">
                    Max: {zapLimit} sats
                  </span>
                </div>

                <Slider
                  value={zapAmount}
                  onValueChange={setZapAmount}
                  max={zapLimit}
                  min={1}
                  step={1}
                  className="w-full"
                />

                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>1</span>
                  <span className="font-medium text-foreground">
                    {zapAmount[0]} sats
                  </span>
                  <span>{zapLimit}</span>
                </div>
              </div>

              <div className="bg-muted p-3 rounded-lg">
                <p className="text-xs text-muted-foreground">
                  <strong>Why zap limits?</strong> The {zapLimit} sat limit ensures democratic validation
                  where research quality matters more than individual wealth.
                </p>
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button
              onClick={handleZap}
              disabled={isZapping}
              className="flex-1"
            >
              <Zap className="h-4 w-4 mr-2" />
              {isZapping ? 'Zapping...' : `Zap ${zapAmount[0]} sats`}
            </Button>

            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isZapping}
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}