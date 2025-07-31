import { useResearchPapers } from '@/hooks/useResearchPapers';
import { ResearchPaperCard } from './ResearchPaperCard';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { RelaySelector } from '@/components/RelaySelector';
import { AlertCircle } from 'lucide-react';

export function ResearchFeed() {
  const { data: papers, isLoading, error } = useResearchPapers();

  if (isLoading) {
    return (
      <div className="space-y-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
                <div className="flex space-x-2">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-18" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-destructive">
        <CardContent className="py-12 px-8 text-center">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Failed to load research papers</h3>
          <p className="text-muted-foreground mb-4">
            There was an error connecting to the research relay.
          </p>
          <RelaySelector className="w-full max-w-sm mx-auto" />
        </CardContent>
      </Card>
    );
  }

  if (!papers || papers.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="py-12 px-8 text-center">
          <div className="max-w-sm mx-auto space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">No research papers yet</h3>
              <p className="text-muted-foreground">
                Be the first to publish research on this decentralized platform! Your papers will be visible across the entire Nostr ecosystem.
              </p>
            </div>
            <RelaySelector className="w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Research Papers</h2>
        <div className="text-sm text-muted-foreground">
          {papers.length} paper{papers.length !== 1 ? 's' : ''} found
        </div>
      </div>

      <div className="space-y-6">
        {papers.map((paper) => (
          <ResearchPaperCard key={paper.id} paper={paper} />
        ))}
      </div>
    </div>
  );
}