import { useState } from 'react';
import { useSeoMeta } from '@unhead/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useNostrPublish } from '@/hooks/useNostrPublish';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useToast } from '@/hooks/useToast';
import { ArrowLeft, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TestPage() {
  const [title, setTitle] = useState('Test Research Paper');
  const [abstract, setAbstract] = useState('This is a test paper to verify our custom kind 38297 works correctly.');
  const [content, setContent] = useState('# Test Paper\n\nThis is test content for our research paper.\n\n## Introduction\n\nTesting the custom Nostr kind implementation.');

  const { user } = useCurrentUser();
  const { mutate: createEvent, isPending } = useNostrPublish();
  const { toast } = useToast();

  useSeoMeta({
    title: 'Test Research Paper - NostrResearch',
    description: 'Test page for publishing research papers to Nostr.',
  });

  const handlePublish = () => {
    if (!user) {
      toast({
        title: 'Login Required',
        description: 'Please log in to publish test papers.',
        variant: 'destructive',
      });
      return;
    }

    const dTag = `test-paper-${Date.now()}`;

    createEvent({
      kind: 30023, // NIP-23 long-form content
      content,
      tags: [
        ['d', dTag],
        ['title', title],
        ['summary', abstract], // NIP-23 uses 'summary'
        ['published_at', Math.floor(Date.now() / 1000).toString()],
        ['t', 'research'], // Mark as research
        ['t', 'science'], // Mark as science
        ['t', 'computer-science'],
        ['t', 'test'],
        // Research-specific extensions
        ['authors', 'Test Author'],
        ['keywords', 'test, nostr, research'],
        ['zap_limit', '10'],
        ['price', '1000'],
      ],
    }, {
      onSuccess: (event) => {
        toast({
          title: 'Test Paper Published!',
          description: `Event ID: ${event.id}`,
        });
        console.log('Published event:', event);
      },
      onError: (error) => {
        toast({
          title: 'Publication Failed',
          description: 'Failed to publish test paper.',
          variant: 'destructive',
        });
        console.error('Publication error:', error);
      },
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <Button variant="outline" asChild>
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Research
              </Link>
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Test Research Paper Publication</CardTitle>
              <p className="text-sm text-muted-foreground">
                Publish a test paper using kind 38297 to verify the implementation works.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Paper title"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Abstract</label>
                <Textarea
                  value={abstract}
                  onChange={(e) => setAbstract(e.target.value)}
                  placeholder="Paper abstract"
                  className="min-h-20"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Content (Markdown)</label>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Paper content in Markdown"
                  className="min-h-40 font-mono text-sm"
                />
              </div>

              <Button
                onClick={handlePublish}
                disabled={!user || isPending}
                className="w-full"
              >
                <Send className="h-4 w-4 mr-2" />
                {isPending ? 'Publishing...' : 'Publish Test Paper'}
              </Button>

              {!user && (
                <p className="text-sm text-muted-foreground text-center">
                  Please log in to publish test papers.
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Testing Instructions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <strong>1. Publish Test Paper:</strong> Use the form above to publish a test research paper.
              </div>
              <div>
                <strong>2. Check Event:</strong> Look in browser console for the published event details.
              </div>
              <div>
                <strong>3. View in Client:</strong> Go back to homepage to see if it appears in the feed.
              </div>
              <div>
                <strong>4. Check Raw Event:</strong> Use a Nostr explorer like{' '}
                <a href="https://nostr.guru" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  nostr.guru
                </a>{' '}
                to view the raw JSON.
              </div>
              <div>
                <strong>5. Verify Tags:</strong> Ensure all required tags (d, title, abstract) are present.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}