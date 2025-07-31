import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useNostrPublish } from '@/hooks/useNostrPublish';
import { useToast } from '@/hooks/useToast';
import { useNavigate } from 'react-router-dom';
import { X, Plus } from 'lucide-react';

const submitPaperSchema = z.object({
  title: z.string().min(10, 'Title must be at least 10 characters').max(200, 'Title too long'),
  abstract: z.string().min(100, 'Abstract must be at least 100 characters').max(2000, 'Abstract too long'),
  content: z.string().min(500, 'Paper content must be at least 500 characters'),
  authors: z.string().min(1, 'At least one author is required'),
  keywords: z.string().min(1, 'At least one keyword is required'),
  doi: z.string().optional(),
  funding: z.string().optional(),
  institution: z.string().optional(),
});

type SubmitPaperForm = z.infer<typeof submitPaperSchema>;

const researchTopics = [
  'physics', 'biology', 'chemistry', 'mathematics', 'computer-science',
  'medicine', 'engineering', 'economics', 'psychology', 'neuroscience',
  'astronomy', 'geology', 'environmental-science', 'materials-science',
  'artificial-intelligence', 'quantum-computing', 'biotechnology'
];

export function SubmitPaperForm() {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [customTopic, setCustomTopic] = useState('');
  const { mutate: createEvent, isPending } = useNostrPublish();
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<SubmitPaperForm>({
    resolver: zodResolver(submitPaperSchema),
    defaultValues: {
      title: '',
      abstract: '',
      content: '',
      authors: '',
      keywords: '',
      doi: '',
      funding: '',
      institution: '',
    },
  });

  const addTopic = (topic: string) => {
    if (!selectedTopics.includes(topic)) {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const removeTopic = (topic: string) => {
    setSelectedTopics(selectedTopics.filter(t => t !== topic));
  };

  const addCustomTopic = () => {
    if (customTopic.trim() && !selectedTopics.includes(customTopic.trim().toLowerCase())) {
      setSelectedTopics([...selectedTopics, customTopic.trim().toLowerCase()]);
      setCustomTopic('');
    }
  };

  const onSubmit = (data: SubmitPaperForm) => {
    if (selectedTopics.length === 0) {
      toast({
        title: 'Topics Required',
        description: 'Please select at least one research topic.',
        variant: 'destructive',
      });
      return;
    }

    // Generate a unique identifier for the paper
    const dTag = `paper-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Create tags for the research paper (NIP-23 + research extensions)
    const tags = [
      ['d', dTag],
      ['title', data.title],
      ['summary', data.abstract], // NIP-23 uses 'summary' instead of 'abstract'
      ['published_at', Math.floor(Date.now() / 1000).toString()],
      ['t', 'research'], // Mark as research content
      ['t', 'science'], // Mark as scientific content
      ['t', 'academic'], // Mark as academic content
      ...selectedTopics.map(topic => ['t', topic] as [string, string]),
      // Research-specific metadata (custom tags)
      ['authors', data.authors],
      ['keywords', data.keywords],
      ['zap_limit', '10'], // Research platform specific
      ['price', '1000'], // Research platform specific
    ];

    // Add optional fields
    if (data.doi) tags.push(['doi', data.doi]);
    if (data.funding) tags.push(['funding', data.funding]);
    if (data.institution) tags.push(['institution', data.institution]);

    createEvent({
      kind: 30023, // NIP-23 long-form content
      content: data.content,
      tags,
    }, {
      onSuccess: (event) => {
        toast({
          title: 'Paper Submitted!',
          description: 'Your research paper has been published to the network.',
        });

        // Navigate to the paper page
        navigate(`/paper/${event.pubkey}/${dTag}`);
      },
      onError: (error) => {
        toast({
          title: 'Submission Failed',
          description: 'Failed to publish your paper. Please try again.',
          variant: 'destructive',
        });
        console.error('Paper submission error:', error);
      },
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Research Paper Details</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Paper Title *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your research paper title" {...field} />
                  </FormControl>
                  <FormDescription>
                    A clear, descriptive title for your research paper.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Authors */}
            <FormField
              control={form.control}
              name="authors"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Authors *</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe, Jane Smith" {...field} />
                  </FormControl>
                  <FormDescription>
                    Comma-separated list of author names. Will be anonymized for 3 months.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Institution */}
            <FormField
              control={form.control}
              name="institution"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Institution</FormLabel>
                  <FormControl>
                    <Input placeholder="University or research institution" {...field} />
                  </FormControl>
                  <FormDescription>
                    Your research institution (optional, will be anonymized for 3 months).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Abstract */}
            <FormField
              control={form.control}
              name="abstract"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Abstract *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide a comprehensive abstract of your research..."
                      className="min-h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    A concise summary of your research (100-2000 characters).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Research Topics */}
            <div className="space-y-3">
              <Label>Research Topics *</Label>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {researchTopics.map((topic) => (
                    <Button
                      key={topic}
                      type="button"
                      variant={selectedTopics.includes(topic) ? "default" : "outline"}
                      size="sm"
                      onClick={() => selectedTopics.includes(topic) ? removeTopic(topic) : addTopic(topic)}
                    >
                      {topic.replace('-', ' ')}
                    </Button>
                  ))}
                </div>

                <div className="flex space-x-2">
                  <Input
                    placeholder="Add custom topic"
                    value={customTopic}
                    onChange={(e) => setCustomTopic(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomTopic())}
                  />
                  <Button type="button" variant="outline" onClick={addCustomTopic}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {selectedTopics.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedTopics.map((topic) => (
                      <Badge key={topic} variant="secondary" className="flex items-center space-x-1">
                        <span>{topic}</span>
                        <button
                          type="button"
                          onClick={() => removeTopic(topic)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                Select research areas that best describe your paper.
              </p>
            </div>

            {/* Keywords */}
            <FormField
              control={form.control}
              name="keywords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Keywords *</FormLabel>
                  <FormControl>
                    <Input placeholder="quantum computing, cryptography, security" {...field} />
                  </FormControl>
                  <FormDescription>
                    Comma-separated keywords for better discoverability.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            {/* Optional Fields */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Optional Information</h3>

              <FormField
                control={form.control}
                name="doi"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>DOI</FormLabel>
                    <FormControl>
                      <Input placeholder="10.1000/182" {...field} />
                    </FormControl>
                    <FormDescription>
                      Digital Object Identifier if your paper has one.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="funding"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Funding Source</FormLabel>
                    <FormControl>
                      <Input placeholder="NSF Grant #12345, NIH, etc." {...field} />
                    </FormControl>
                    <FormDescription>
                      Funding sources for this research (will be anonymized for 3 months).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            {/* Paper Content */}
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Paper Content *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="# Introduction

Your research paper content in Markdown format...

## Methodology

Describe your research methodology...

## Results

Present your findings...

## Conclusion

Summarize your conclusions..."
                      className="min-h-96 font-mono text-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Write your full paper in Markdown format. Include sections like Introduction, Methodology, Results, and Conclusion.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => navigate('/')}>
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? 'Publishing...' : 'Publish Paper'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}