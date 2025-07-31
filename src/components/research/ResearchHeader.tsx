import { Search, Plus, BookOpen, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LoginArea } from '@/components/auth/LoginArea';
import { ThemeToggle } from '@/components/ThemeToggle';
import { RelaySelector } from '@/components/RelaySelector';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export function ResearchHeader() {
  const { user } = useCurrentUser();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold">NostrResearch</h1>
                <p className="text-xs text-muted-foreground">Decentralized Science</p>
              </div>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-4">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search papers, authors, topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </form>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <RelaySelector className="hidden md:flex" />

            {user && (
              <Button asChild size="sm">
                <Link to="/submit">
                  <Plus className="h-4 w-4 mr-2" />
                  Submit Paper
                </Link>
              </Button>
            )}

            <Button variant="outline" size="sm" asChild>
              <Link to="/stats">
                <Zap className="h-4 w-4 mr-2" />
                Stats
              </Link>
            </Button>

            <Button variant="outline" size="sm" asChild>
              <Link to="/test">
                Test
              </Link>
            </Button>

            <Button variant="outline" size="sm" asChild>
              <Link to="/debug">
                Debug
              </Link>
            </Button>

            <ThemeToggle />
            <LoginArea className="max-w-40" />
          </div>
        </div>
      </div>
    </header>
  );
}