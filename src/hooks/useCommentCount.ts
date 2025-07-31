import { useQuery } from '@tanstack/react-query';
import { useNostr } from '@nostrify/react';

export function useCommentCount(eventId: string) {
  const { nostr } = useNostr();

  return useQuery({
    queryKey: ['comment-count', eventId],
    queryFn: async (c) => {
      const signal = AbortSignal.any([c.signal, AbortSignal.timeout(3000)]);
      
      // Query for comments (kind 1111) that reference this event
      const comments = await nostr.query([
        {
          kinds: [1111],
          '#e': [eventId],
          limit: 1000
        }
      ], { signal });

      return comments.length;
    },
    enabled: !!eventId,
    staleTime: 30000, // 30 seconds
  });
}