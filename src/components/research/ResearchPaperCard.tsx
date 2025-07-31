import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  MessageCircle,
  Zap,
  Eye,
  User,
  ExternalLink,
  ThumbsUp
} from 'lucide-react';
import { safeFormatDistanceToNow, isValidTimestamp, safeCreateDate } from '@/lib/dateUtils';
import { Link } from 'react-router-dom';
import type { NostrEvent } from '@nostrify/nostrify';
import { useZapStats } from '@/hooks/useZapStats';
import { useCommentCount } from '@/hooks/useCommentCount';
import { ZapButton } from '@/components/research/ZapButton';

interface ResearchPaperCardProps {
  paper: NostrEvent;
}

export function ResearchPaperCard({ paper }: ResearchPaperCardProps) {
  const title = paper.tags.find(([name]) => name === 'title')?.[1] || 'Untitled Paper';
  const abstract = paper.tags.find(([name]) => name === 'summary')?.[1] ||
                   paper.tags.find(([name]) => name === 'abstract')?.[1] || '';
  const authors = paper.tags.find(([name]) => name === 'authors')?.[1] || 'Anonymous';
  const publishedAt = paper.tags.find(([name]) => name === 'published_at')?.[1];
  const topics = paper.tags.filter(([name]) => name === 't').map(([, topic]) => topic);
  const keywords = paper.tags.find(([name]) => name === 'keywords')?.[1]?.split(',') || [];
  const dTag = paper.tags.find(([name]) => name === 'd')?.[1] || '';

  const { data: zapStats } = useZapStats(paper.id);
  const { data: commentCount } = useCommentCount(paper.id);

  // Check if paper is in anonymous period (3 months = 90 days)
  const publishTimestamp = publishedAt ? publishedAt : paper.created_at.toString();
  const publishDate = safeCreateDate(publishTimestamp);
  const isValidDate = isValidTimestamp(publishTimestamp);
  const isAnonymous = isValidDate ? Date.now() - publishDate.getTime() < 90 * 24 * 60 * 60 * 1000 : false;

  const paperUrl = `/paper/${paper.pubkey}/${dTag}`;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3 flex-1">
            <Avatar className="h-10 w-10">
              <AvatarFallback>
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium text-muted-foreground">
                  {isAnonymous ? 'Anonymous Researcher' : authors}
                </p>
                {isAnonymous && (
                  <Badge variant="outline" className="text-xs">
                    Anonymous Period
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Published {safeFormatDistanceToNow(publishTimestamp)}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <ZapButton paper={paper} />
            <Button variant="outline" size="sm" asChild>
              <Link to={paperUrl}>
                <Eye className="h-4 w-4 mr-2" />
                Read
              </Link>
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Title and Abstract */}
        <div>
          <Link to={paperUrl}>
            <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors line-clamp-2">
              {title}
            </h3>
          </Link>
          <p className="text-muted-foreground text-sm line-clamp-3">
            {abstract}
          </p>
        </div>

        {/* Topics and Keywords */}
        <div className="space-y-2">
          {topics.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {topics.slice(0, 4).map((topic) => (
                <Badge key={topic} variant="secondary" className="text-xs">
                  {topic}
                </Badge>
              ))}
              {topics.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{topics.length - 4} more
                </Badge>
              )}
            </div>
          )}

          {keywords.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {keywords.slice(0, 6).map((keyword) => (
                <Badge key={keyword.trim()} variant="outline" className="text-xs">
                  {keyword.trim()}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <Separator />

        {/* Stats and Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Zap className="h-4 w-4" />
              <span>{zapStats?.totalZaps || 0}</span>
              <span className="text-xs">
                ({zapStats?.averageSats || 0} avg)
              </span>
            </div>

            <div className="flex items-center space-x-1">
              <MessageCircle className="h-4 w-4" />
              <span>{commentCount || 0}</span>
            </div>

            <div className="flex items-center space-x-1">
              <ThumbsUp className="h-4 w-4" />
              <span>{zapStats?.uniqueZappers || 0}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" asChild>
              <Link to={`${paperUrl}#comments`}>
                <MessageCircle className="h-4 w-4 mr-2" />
                Discuss
              </Link>
            </Button>

            <Button variant="ghost" size="sm">
              <ExternalLink className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}