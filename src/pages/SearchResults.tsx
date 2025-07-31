import { useSearchParams } from 'react-router-dom';
import { useSeoMeta } from '@unhead/react';
import { useSearchResearchPapers } from '@/hooks/useResearchPapers';
import { ResearchPaperCard } from '@/components/research/ResearchPaperCard';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { RelaySelector } from '@/components/RelaySelector';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Search, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchInput, setSearchInput] = useState(query);
  
  const { data: papers, isLoading, error } = useSearchResearchPapers(query);

  useSeoMeta({
    title: `Search: ${query} - NostrResearch`,
    description: `Search results for "${query}" on the decentralized research platform.`,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchParams({ q: searchInput.trim() });
    }
  };

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

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search papers, authors, topics..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-10"
              />
            </form>

            {query && (
              <div>
                <h1 className="text-2xl font-bold">Search Results</h1>
                <p className="text-muted-foreground">
                  Results for "{query}"
                </p>
              </div>
            )}
          </div>

          {/* Results */}
          {!query ? (
            <Card>
              <CardContent className="py-12 px-8 text-center">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Search Research Papers</h3>
                <p className="text-muted-foreground">
                  Enter keywords, topics, or author names to find relevant research papers.
                </p>
              </CardContent>
            </Card>
          ) : isLoading ? (
            <div className="space-y-6">
              {Array.from({ length: 3 }).map((_, i) => (
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
          ) : error ? (
            <Card className="border-destructive">
              <CardContent className="py-12 px-8 text-center">
                <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Search Failed</h3>
                <p className="text-muted-foreground mb-4">
                  There was an error searching for research papers.
                </p>
                <RelaySelector className="w-full max-w-sm mx-auto" />
              </CardContent>
            </Card>
          ) : !papers || papers.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="py-12 px-8 text-center">
                <div className="max-w-sm mx-auto space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">No Results Found</h3>
                    <p className="text-muted-foreground">
                      No research papers found for "{query}". Try different keywords or check another relay.
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
                  Found {papers.length} paper{papers.length !== 1 ? 's' : ''} matching "{query}"
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