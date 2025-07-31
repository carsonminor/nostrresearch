import { useParams } from 'react-router-dom';
import { useSeoMeta } from '@unhead/react';
import { useResearchPapersByTopic } from '@/hooks/useResearchPapers';
import { ResearchPaperCard } from '@/components/research/ResearchPaperCard';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { RelaySelector } from '@/components/RelaySelector';
import { Button } from '@/components/ui/button';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TopicPage() {
  const { topic } = useParams<{ topic: string }>();
  const topicName = topic?.replace('-', ' ') || '';
  const { data: papers, isLoading, error } = useResearchPapersByTopic(topic || '');

  useSeoMeta({
    title: `${topicName} Research Papers - NostrResearch`,
    description: `Browse research papers in ${topicName} on the decentralized scientific publishing platform.`,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-8 w-48" />
            </div>
            
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
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
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
                <h3 className="text-lg font-semibold mb-2">Failed to Load Papers</h3>
                <p className="text-muted-foreground mb-4">
                  There was an error loading papers for this topic.
                </p>
                <RelaySelector className="w-full max-w-sm mx-auto" />
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
          {/* Header */}
          <div className="mb-6 space-y-4">
            <Button variant="outline" asChild>
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Research
              </Link>
            </Button>

            <div>
              <h1 className="text-3xl font-bold mb-2 capitalize">{topicName} Research</h1>
              <p className="text-muted-foreground">
                Research papers in {topicName}
              </p>
            </div>
          </div>

          {/* Results */}
          {!papers || papers.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="py-12 px-8 text-center">
                <div className="max-w-sm mx-auto space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">No Papers Found</h3>
                    <p className="text-muted-foreground">
                      No research papers found in {topicName}. Try switching to a different relay or be the first to publish in this area!
                    </p>
                  </div>
                  <RelaySelector className="w-full" />
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">
                  Found {papers.length} paper{papers.length !== 1 ? 's' : ''} in {topicName}
                </p>
              </div>
              
              <div className="space-y-6">
                {papers.map((paper) => (
                  <ResearchPaperCard key={paper.id} paper={paper} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}