import { useQuery } from '@tanstack/react-query';
import { useNostr } from '@nostrify/react';
import type { NostrEvent } from '@nostrify/nostrify';

// Use NIP-23 long-form content for research papers
const RESEARCH_PAPER_KIND = 30023;

function validateResearchPaper(event: NostrEvent): boolean {
  // Check if it's a long-form content kind
  if (event.kind !== RESEARCH_PAPER_KIND) return false;

  // Check for required NIP-23 tags
  const d = event.tags.find(([name]) => name === 'd')?.[1];
  const title = event.tags.find(([name]) => name === 'title')?.[1];

  // Must have d and title tags (NIP-23 requirements)
  if (!d || !title) return false;

  // Check if it's marked as a research paper
  const isResearch = event.tags.some(([name, value]) =>
    name === 't' && (value === 'research' || value === 'science' || value === 'academic')
  );

  // Must have research-related topic tags to be considered a research paper
  return isResearch;
}

export function useResearchPapers(limit = 20) {
  const { nostr } = useNostr();

  return useQuery({
    queryKey: ['research-papers', limit],
    queryFn: async (c) => {
      const signal = AbortSignal.any([c.signal, AbortSignal.timeout(5000)]);

      const events = await nostr.query([
        {
          kinds: [RESEARCH_PAPER_KIND],
          limit,
          // Filter for research papers using topic tags
          '#t': ['research', 'science', 'academic', 'physics', 'biology', 'chemistry', 'mathematics', 'computer-science', 'medicine', 'engineering']
        }
      ], { signal });

      // Filter events through validator to ensure they meet our research paper requirements
      const validPapers = events.filter(validateResearchPaper);

      // Sort by creation date (newest first)
      return validPapers.sort((a, b) => b.created_at - a.created_at);
    },
    staleTime: 30000, // 30 seconds
    refetchInterval: 60000, // 1 minute
  });
}

export function useResearchPaper(pubkey: string, dTag: string) {
  const { nostr } = useNostr();

  return useQuery({
    queryKey: ['research-paper', pubkey, dTag],
    queryFn: async (c) => {
      const signal = AbortSignal.any([c.signal, AbortSignal.timeout(5000)]);

      const events = await nostr.query([
        {
          kinds: [RESEARCH_PAPER_KIND],
          authors: [pubkey],
          '#d': [dTag],
          limit: 1
        }
      ], { signal });

      const validPaper = events.find(validateResearchPaper);
      if (!validPaper) {
        throw new Error('Research paper not found');
      }

      return validPaper;
    },
    enabled: !!pubkey && !!dTag,
  });
}

export function useResearchPapersByTopic(topic: string, limit = 20) {
  const { nostr } = useNostr();

  return useQuery({
    queryKey: ['research-papers-by-topic', topic, limit],
    queryFn: async (c) => {
      const signal = AbortSignal.any([c.signal, AbortSignal.timeout(5000)]);

      const events = await nostr.query([
        {
          kinds: [RESEARCH_PAPER_KIND],
          '#t': [topic],
          limit
        }
      ], { signal });

      const validPapers = events.filter(validateResearchPaper);
      return validPapers.sort((a, b) => b.created_at - a.created_at);
    },
    enabled: !!topic,
  });
}

export function useSearchResearchPapers(query: string, limit = 20) {
  const { nostr } = useNostr();

  return useQuery({
    queryKey: ['search-research-papers', query, limit],
    queryFn: async (c) => {
      const signal = AbortSignal.any([c.signal, AbortSignal.timeout(5000)]);

      // Search in multiple ways: by topic tags, keywords, and content
      const events = await nostr.query([
        {
          kinds: [RESEARCH_PAPER_KIND],
          search: query,
          limit
        }
      ], { signal });

      const validPapers = events.filter(validateResearchPaper);

      // Filter by query in title, abstract, or keywords
      const filteredPapers = validPapers.filter(paper => {
        const title = paper.tags.find(([name]) => name === 'title')?.[1] || '';
        const abstract = paper.tags.find(([name]) => name === 'abstract')?.[1] || '';
        const keywords = paper.tags.find(([name]) => name === 'keywords')?.[1] || '';

        const searchText = `${title} ${abstract} ${keywords}`.toLowerCase();
        return searchText.includes(query.toLowerCase());
      });

      return filteredPapers.sort((a, b) => b.created_at - a.created_at);
    },
    enabled: !!query && query.length > 2,
  });
}