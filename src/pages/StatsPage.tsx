import { useSeoMeta } from '@unhead/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, TrendingUp, Users, Zap, MessageCircle, BookOpen, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function StatsPage() {
  useSeoMeta({
    title: 'Platform Statistics - NostrResearch',
    description: 'View statistics and analytics for the decentralized research platform.',
  });

  // Platform is new - stats will be populated as users join
  const stats = {
    totalPapers: 0,
    totalAuthors: 0,
    totalZaps: 0,
    totalComments: 0,
    totalSats: 0,
    averageZapsPerPaper: 0,
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-6 space-y-4">
            <Button variant="outline" asChild>
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Research
              </Link>
            </Button>

            <div>
              <h1 className="text-3xl font-bold mb-2">Platform Statistics</h1>
              <p className="text-muted-foreground">
                Analytics and insights from the decentralized research community.
              </p>
            </div>
          </div>

          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Papers</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalPapers.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  Platform just launched
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Researchers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalAuthors.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  Be the first to join!
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Zaps</CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalZaps.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.totalSats.toLocaleString()} sats total
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Comments</CardTitle>
                <MessageCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalComments.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  Peer review discussions
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Zaps/Paper</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.averageZapsPerPaper}</div>
                <p className="text-xs text-muted-foreground">
                  Quality validation metric
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Anonymous Papers</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">
                  Currently in review period
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Getting Started */}
          <Card>
            <CardHeader>
              <CardTitle>Welcome to NostrResearch</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  NostrResearch is a brand new platform for decentralized scientific publishing.
                  Statistics will appear here as researchers join and start publishing papers.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">For Researchers</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Publish without gatekeepers</li>
                      <li>• Anonymous peer review</li>
                      <li>• Lightning-powered validation</li>
                      <li>• Permanent, censorship-resistant storage</li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Platform Features</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Built on Nostr protocol</li>
                      <li>• Compatible with existing clients</li>
                      <li>• Free access to all papers</li>
                      <li>• Community-driven quality control</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Platform Features */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Platform Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Decentralized Publishing</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• No central authority or gatekeepers</li>
                    <li>• Censorship-resistant research sharing</li>
                    <li>• Global accessibility via Nostr protocol</li>
                    <li>• Permanent archival on distributed relays</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Anonymous Peer Review</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• 3-month anonymous evaluation period</li>
                    <li>• Prevents prestige and reputation bias</li>
                    <li>• Merit-based research validation</li>
                    <li>• Democratic zap-based quality assessment</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Economic Incentives</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Pay-to-post spam prevention</li>
                    <li>• Zap limits ensure democratic validation</li>
                    <li>• Lightning Network micropayments</li>
                    <li>• Direct author support via zaps</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Open Science</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Free access to all research papers</li>
                    <li>• Public peer review discussions</li>
                    <li>• Transparent validation process</li>
                    <li>• Community-driven quality control</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}