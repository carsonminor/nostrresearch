import { useSeoMeta } from '@unhead/react';
import { ResearchFeed } from '@/components/research/ResearchFeed';
import { ResearchHeader } from '@/components/research/ResearchHeader';
import { ResearchSidebar } from '@/components/research/ResearchSidebar';

const Index = () => {
  useSeoMeta({
    title: 'NostrResearch - Decentralized Scientific Publishing',
    description: 'A decentralized platform for scientific research publishing with peer review, zap validation, and anonymous evaluation.',
  });

  return (
    <div className="min-h-screen bg-background">
      <ResearchHeader />
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <ResearchSidebar />
          </div>
          <div className="lg:col-span-3">
            <ResearchFeed />
          </div>
        </div>
      </div>

      {/* Footer with MKStack attribution */}
      <footer className="border-t mt-12 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            Vibed with{' '}
            <a
              href="https://soapbox.pub/mkstack"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              MKStack
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
