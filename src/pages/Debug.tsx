import { useSeoMeta } from '@unhead/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useNostr } from '@nostrify/react';
import { useAppContext } from '@/hooks/useAppContext';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Debug() {
  useSeoMeta({
    title: 'Debug - NostrResearch',
    description: 'Debug page to check platform functionality.',
  });

  const { user } = useCurrentUser();
  const { nostr } = useNostr();
  const { config } = useAppContext();

  const checks = [
    {
      name: 'App Context',
      status: !!config,
      details: config ? `Theme: ${config.theme}, Relay: ${config.relayUrl}` : 'Not loaded'
    },
    {
      name: 'Nostr Connection',
      status: !!nostr,
      details: nostr ? 'Connected' : 'Not connected'
    },
    {
      name: 'User Authentication',
      status: !!user,
      details: user ? `Logged in as ${user.pubkey.slice(0, 8)}...` : 'Not logged in'
    },
    {
      name: 'React Router',
      status: true,
      details: 'Working (you can see this page)'
    },
    {
      name: 'UI Components',
      status: true,
      details: 'Cards, buttons, and icons rendering'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <Button variant="outline" asChild>
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Platform Debug Information</CardTitle>
              <p className="text-sm text-muted-foreground">
                This page helps identify any issues with the platform.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {checks.map((check) => (
                <div key={check.name} className="flex items-start space-x-3 p-3 border rounded-lg">
                  {check.status ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <h3 className="font-medium">{check.name}</h3>
                    <p className="text-sm text-muted-foreground">{check.details}</p>
                  </div>
                </div>
              ))}
              
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">Environment Info</h3>
                <div className="text-sm space-y-1">
                  <div>User Agent: {navigator.userAgent}</div>
                  <div>URL: {window.location.href}</div>
                  <div>Local Storage Available: {typeof Storage !== 'undefined' ? 'Yes' : 'No'}</div>
                  <div>WebSocket Support: {typeof WebSocket !== 'undefined' ? 'Yes' : 'No'}</div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <h3 className="font-medium mb-2 text-blue-800 dark:text-blue-200">
                  If you're seeing this page, the basic app is working!
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  React is rendering, routing is working, and components are loading.
                  If you're experiencing issues, they're likely related to specific features
                  rather than fundamental app problems.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}