import { useParams } from 'react-router-dom';
import { useSeoMeta } from '@unhead/react';
import { useResearchPaper } from '@/hooks/useResearchPapers';
import { ResearchPaperView } from '@/components/research/ResearchPaperView';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function ResearchPaper() {
  const { pubkey, dTag } = useParams<{ pubkey: string; dTag: string }>();
  const { data: paper, isLoading, error } = useResearchPaper(pubkey!, dTag!);

  const title = paper?.tags.find(([name]) => name === 'title')?.[1] || 'Research Paper';
  const abstract = paper?.tags.find(([name]) => name === 'abstract')?.[1] || '';

  useSeoMeta({
    title: `${title} - NostrResearch`,
    description: abstract.slice(0, 160),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-6 w-32" />
            </div>
            
            <Card>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                  
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                  
                  <div className="space-y-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                        <Skeleton className="h-4 w-4/5" />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (error || !paper) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Button variant="outline" asChild>
                <Link to="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Research
                </Link>
              </Button>
            </div>
            
            <Card className="border-destructive">
              <CardContent className="py-12 px-8 text-center">
                <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Paper Not Found</h3>
                <p className="text-muted-foreground">
                  The research paper you're looking for could not be found or may have been removed.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Button variant="outline" asChild>
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Research
              </Link>
            </Button>
          </div>
          
          <ResearchPaperView paper={paper} />
        </div>
      </div>
    </div>
  );
}