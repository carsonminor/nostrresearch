import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  User,
  Calendar,
  Zap,
  MessageCircle,
  Share2,
  Download,
  ExternalLink,
  Clock
} from 'lucide-react';
import { safeFormatDate, isValidTimestamp, safeCreateDate } from '@/lib/dateUtils';
import type { NostrEvent } from '@nostrify/nostrify';
import { useZapStats } from '@/hooks/useZapStats';
import { ZapButton } from './ZapButton';
import { CommentsSection } from '@/components/comments/CommentsSection';
import { EmbeddedComments } from './EmbeddedComments';

interface ResearchPaperViewProps {
  paper: NostrEvent;
}

export function ResearchPaperView({ paper }: ResearchPaperViewProps) {
  const title = paper.tags.find(([name]) => name === 'title')?.[1] || 'Untitled Paper';
  const abstract = paper.tags.find(([name]) => name === 'summary')?.[1] ||
                   paper.tags.find(([name]) => name === 'abstract')?.[1] || '';
  const authors = paper.tags.find(([name]) => name === 'authors')?.[1] || 'Anonymous';
  const publishedAt = paper.tags.find(([name]) => name === 'published_at')?.[1];
  const topics = paper.tags.filter(([name]) => name === 't').map(([, topic]) => topic);
  const keywords = paper.tags.find(([name]) => name === 'keywords')?.[1]?.split(',') || [];
  const doi = paper.tags.find(([name]) => name === 'doi')?.[1];
  const institution = paper.tags.find(([name]) => name === 'institution')?.[1];
  const funding = paper.tags.find(([name]) => name === 'funding')?.[1];

  const { data: zapStats } = useZapStats(paper.id);

  // Check if paper is in anonymous period (3 months = 90 days)
  const publishTimestamp = publishedAt ? publishedAt : paper.created_at.toString();
  const publishDate = safeCreateDate(publishTimestamp);
  const isValidDate = isValidTimestamp(publishTimestamp);
  const isAnonymous = isValidDate ? Date.now() - publishDate.getTime() < 90 * 24 * 60 * 60 * 1000 : false;
  const anonymousEndDate = safeCreateDate(publishDate.getTime() + 90 * 24 * 60 * 60 * 1000);

  return (
    <div className="space-y-6">
      {/* Paper Header */}
      <Card>
        <CardHeader className="pb-6">
          <div className="space-y-4">
            {/* Author and Date Info */}
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback>
                    <User className="h-6 w-6" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">
                    {isAnonymous ? 'Anonymous Researcher' : authors}
                  </p>
                  {!isAnonymous && institution && (
                    <p className="text-sm text-muted-foreground">{institution}</p>
                  )}
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>Published {safeFormatDate(publishTimestamp)}</span>
                    </div>
                    {isAnonymous && isValidDate && (
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>Anonymous until {safeFormatDate(anonymousEndDate.getTime(), 'MMM d, yyyy')}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <ZapButton paper={paper} />
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            {/* Anonymous Period Notice */}
            {isAnonymous && isValidDate && (
              <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                      Anonymous Evaluation Period
                    </p>
                    <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                      Author identity will be revealed on {safeFormatDate(anonymousEndDate.getTime(), 'MMMM d, yyyy')} to prevent bias during peer evaluation.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Title */}
            <div>
              <h1 className="text-3xl font-bold mb-2">{title}</h1>
              {doi && (
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <span>DOI:</span>
                  <a
                    href={`https://doi.org/${doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline flex items-center"
                  >
                    {doi}
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </div>
              )}
            </div>

            {/* Topics and Keywords */}
            <div className="space-y-3">
              {topics.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">Research Areas</p>
                  <div className="flex flex-wrap gap-2">
                    {topics.map((topic) => (
                      <Badge key={topic} variant="secondary">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {keywords.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">Keywords</p>
                  <div className="flex flex-wrap gap-1">
                    {keywords.map((keyword) => (
                      <Badge key={keyword.trim()} variant="outline" className="text-xs">
                        {keyword.trim()}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-1">
                <Zap className="h-4 w-4 text-yellow-500" />
                <span className="font-medium">{zapStats?.totalZaps || 0}</span>
                <span className="text-muted-foreground">zaps</span>
                <span className="text-muted-foreground">
                  ({zapStats?.averageSats || 0} avg sats)
                </span>
              </div>

              <div className="flex items-center space-x-1">
                <MessageCircle className="h-4 w-4 text-blue-500" />
                <span className="font-medium">View comments below</span>
              </div>
            </div>

            {/* Funding */}
            {funding && !isAnonymous && (
              <div className="text-sm">
                <span className="font-medium">Funding:</span>
                <span className="text-muted-foreground ml-2">{funding}</span>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent>
          {/* Abstract */}
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold mb-3">Abstract</h2>
              <p className="text-muted-foreground leading-relaxed">{abstract}</p>
            </div>

            <Separator />

            {/* Paper Content with Embedded Comments */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Full Paper</h2>
              <EmbeddedComments paper={paper} content={paper.content} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comments Section */}
      <div id="comments">
        <CommentsSection
          root={paper}
          title="Peer Review & Discussion"
          emptyStateMessage="No comments yet"
          emptyStateSubtitle="Be the first to provide feedback on this research!"
        />
      </div>
    </div>
  );
}