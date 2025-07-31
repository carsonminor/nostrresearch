import { useSeoMeta } from '@unhead/react';
import { SubmitPaperForm } from '@/components/research/SubmitPaperForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { LoginArea } from '@/components/auth/LoginArea';

export default function SubmitPaper() {
  const { user } = useCurrentUser();

  useSeoMeta({
    title: 'Submit Research Paper - NostrResearch',
    description: 'Submit your research paper to the decentralized scientific publishing platform.',
  });

  if (!user) {
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
                <CardTitle>Login Required</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  You need to be logged in to submit research papers to the platform.
                </p>
                <LoginArea className="w-full" />
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
          <div className="mb-6">
            <Button variant="outline" asChild>
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Research
              </Link>
            </Button>
          </div>

          <div className="space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold mb-2">Submit Research Paper</h1>
              <p className="text-muted-foreground">
                Publish your research to the decentralized scientific community for peer review and validation.
              </p>
            </div>

            {/* Guidelines */}
            <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-800 dark:text-blue-200">
                  <Info className="h-5 w-5 mr-2" />
                  Submission Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-blue-700 dark:text-blue-300">
                <div>
                  <strong>Anonymous Period:</strong> Your identity will remain anonymous for 3 months to prevent bias during peer evaluation.
                </div>
                <div>
                  <strong>Pay-to-Post:</strong> A small fee is required to prevent spam and ensure quality submissions.
                </div>
                <div>
                  <strong>Zap Validation:</strong> The community validates research quality through zaps (limited to 10 sats per user).
                </div>
                <div>
                  <strong>Open Review:</strong> All peer review comments are public and can be zapped for quality.
                </div>
                <div>
                  <strong>Format:</strong> Papers should be written in Markdown format with proper citations and references.
                </div>
              </CardContent>
            </Card>

            {/* Submit Form */}
            <SubmitPaperForm />
          </div>
        </div>
      </div>
    </div>
  );
}