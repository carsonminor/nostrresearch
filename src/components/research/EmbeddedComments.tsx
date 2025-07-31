import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  MessageCircle,
  User,
  Quote,
  Send,
  X
} from 'lucide-react';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useNostrPublish } from '@/hooks/useNostrPublish';
import { useToast } from '@/hooks/useToast';
import { safeFormatDistanceToNow } from '@/lib/dateUtils';
import type { NostrEvent } from '@nostrify/nostrify';

interface EmbeddedComment {
  id: string;
  content: string;
  author: string;
  timestamp: number;
  startChar: number;
  endChar: number;
  selectedText: string;
}

interface EmbeddedCommentsProps {
  paper: NostrEvent;
  content: string;
}

export function EmbeddedComments({ paper, content }: EmbeddedCommentsProps) {
  const [selectedText, setSelectedText] = useState('');
  const [selectionRange, setSelectionRange] = useState<{ start: number; end: number } | null>(null);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [embeddedComments, setEmbeddedComments] = useState<EmbeddedComment[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  const { user } = useCurrentUser();
  const { mutate: createEvent, isPending } = useNostrPublish();
  const { toast } = useToast();

  // Handle text selection
  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;

      const range = selection.getRangeAt(0);
      const selectedText = selection.toString().trim();

      if (selectedText.length > 0 && contentRef.current?.contains(range.commonAncestorContainer)) {
        // Calculate character positions relative to the content
        const preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(contentRef.current);
        preCaretRange.setEnd(range.startContainer, range.startOffset);
        const startChar = preCaretRange.toString().length;
        const endChar = startChar + selectedText.length;

        setSelectedText(selectedText);
        setSelectionRange({ start: startChar, end: endChar });
        setShowCommentForm(true);
      }
    };

    document.addEventListener('mouseup', handleSelection);
    return () => document.removeEventListener('mouseup', handleSelection);
  }, []);

  const handleSubmitComment = () => {
    if (!user || !commentText.trim() || !selectionRange) {
      toast({
        title: 'Error',
        description: 'Please select text and enter a comment.',
        variant: 'destructive',
      });
      return;
    }

    // Create embedded comment event
    const dTag = paper.tags.find(([name]) => name === 'd')?.[1] || '';

    createEvent({
      kind: 1111, // NIP-22 comment kind
      content: commentText,
      tags: [
        ['A', `30023:${paper.pubkey}:${dTag}`], // Root addressable event
        ['K', '30023'], // Root kind
        ['P', paper.pubkey], // Root author
        ['a', `30023:${paper.pubkey}:${dTag}`], // Parent (same as root for top-level)
        ['k', '30023'], // Parent kind
        ['p', paper.pubkey], // Parent author
        ['selection', selectionRange.start.toString(), selectionRange.end.toString(), selectedText],
      ],
    }, {
      onSuccess: () => {
        // Add to local state (in real app, this would come from a query)
        const newComment: EmbeddedComment = {
          id: Date.now().toString(),
          content: commentText,
          author: user.pubkey,
          timestamp: Date.now() / 1000,
          startChar: selectionRange.start,
          endChar: selectionRange.end,
          selectedText,
        };

        setEmbeddedComments(prev => [...prev, newComment]);
        setCommentText('');
        setShowCommentForm(false);
        setSelectedText('');
        setSelectionRange(null);

        toast({
          title: 'Comment Added',
          description: 'Your comment has been attached to the selected text.',
        });
      },
      onError: () => {
        toast({
          title: 'Failed to Add Comment',
          description: 'Please try again.',
          variant: 'destructive',
        });
      },
    });
  };

  const renderContentWithComments = () => {
    if (embeddedComments.length === 0) {
      return <div dangerouslySetInnerHTML={{ __html: content }} />;
    }

    // Sort comments by start position
    const sortedComments = [...embeddedComments].sort((a, b) => a.startChar - b.startChar);

    let result = content;
    let offset = 0;

    sortedComments.forEach((comment) => {
      const adjustedStart = comment.startChar + offset;
      const adjustedEnd = comment.endChar + offset;

      const beforeText = result.slice(0, adjustedStart);
      const selectedText = result.slice(adjustedStart, adjustedEnd);
      const afterText = result.slice(adjustedEnd);

      const commentMarker = `<span class="bg-yellow-100 dark:bg-yellow-900 relative cursor-pointer" data-comment-id="${comment.id}" title="Click to view comment">${selectedText}</span>`;

      result = beforeText + commentMarker + afterText;
      offset += commentMarker.length - selectedText.length;
    });

    return <div dangerouslySetInnerHTML={{ __html: result }} />;
  };

  return (
    <div className="space-y-4">
      {/* Content with embedded comment highlights */}
      <div ref={contentRef} className="prose prose-research">
        {renderContentWithComments()}
      </div>

      {/* Comment Form */}
      {showCommentForm && (
        <Card className="border-primary">
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <Quote className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium mb-1">Selected text:</p>
                  <p className="text-sm text-muted-foreground bg-muted p-2 rounded italic">
                    "{selectedText}"
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowCommentForm(false);
                    setSelectedText('');
                    setSelectionRange(null);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div>
                <Textarea
                  placeholder="Add your comment on this selection..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="min-h-20"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setShowCommentForm(false);
                    setSelectedText('');
                    setSelectionRange(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleSubmitComment}
                  disabled={!commentText.trim() || isPending}
                >
                  <Send className="h-4 w-4 mr-2" />
                  {isPending ? 'Adding...' : 'Add Comment'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Embedded Comments List */}
      {embeddedComments.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center">
            <MessageCircle className="h-5 w-5 mr-2" />
            Embedded Comments ({embeddedComments.length})
          </h3>

          <div className="space-y-3">
            {embeddedComments.map((comment) => (
              <Card key={comment.id} className="border-l-4 border-l-primary">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-medium">Anonymous Reviewer</p>
                          <Badge variant="outline" className="text-xs">
                            Embedded
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {safeFormatDistanceToNow(comment.timestamp)}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="bg-muted p-2 rounded text-sm">
                        <Quote className="h-3 w-3 inline mr-1" />
                        <span className="italic">"{comment.selectedText}"</span>
                      </div>
                      <p className="text-sm">{comment.content}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Instructions */}
      {embeddedComments.length === 0 && !showCommentForm && (
        <Card className="border-dashed">
          <CardContent className="py-8 px-6 text-center">
            <MessageCircle className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
            <h3 className="font-medium mb-2">Add Embedded Comments</h3>
            <p className="text-sm text-muted-foreground">
              Select any text in the paper above to add a comment directly to that section.
              This helps provide specific feedback and clarification.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}