import { useQuery } from '@tanstack/react-query';
import { useNostr } from '@nostrify/react';

interface ZapStats {
  totalZaps: number;
  totalSats: number;
  averageSats: number;
  uniqueZappers: number;
  zapReceipts: Array<{
    id: string;
    amount: number;
    zapper: string;
    timestamp: number;
  }>;
}

export function useZapStats(eventId: string) {
  const { nostr } = useNostr();

  return useQuery({
    queryKey: ['zap-stats', eventId],
    queryFn: async (c) => {
      const signal = AbortSignal.any([c.signal, AbortSignal.timeout(3000)]);

      // Query for zap receipts (kind 9735) that reference this event
      const zapReceipts = await nostr.query([
        {
          kinds: [9735],
          '#e': [eventId],
          limit: 500
        }
      ], { signal });

      const stats: ZapStats = {
        totalZaps: 0,
        totalSats: 0,
        averageSats: 0,
        uniqueZappers: 0,
        zapReceipts: []
      };

      const zapperSet = new Set<string>();

      for (const receipt of zapReceipts) {
        try {
          // Extract bolt11 invoice from tags
          const bolt11Tag = receipt.tags.find(([name]) => name === 'bolt11');
          if (!bolt11Tag || !bolt11Tag[1]) continue;

          // Extract amount from bolt11 (simplified - in real implementation would decode properly)
          const bolt11 = bolt11Tag[1];
          const amountMatch = bolt11.match(/lnbc(\d+)[munp]/);
          if (!amountMatch) continue;

          let amount = parseInt(amountMatch[1]);
          const unit = bolt11.charAt(bolt11.indexOf(amountMatch[1]) + amountMatch[1].length);

          // Convert to sats
          switch (unit) {
            case 'm': // milli-bitcoin
              amount = amount * 100000;
              break;
            case 'u': // micro-bitcoin
              amount = amount * 100;
              break;
            case 'n': // nano-bitcoin
              amount = amount * 0.1;
              break;
            case 'p': // pico-bitcoin
              amount = amount * 0.0001;
              break;
            default:
              amount = amount * 100000000; // assume bitcoin
          }

          // Get zapper from P tag
          const zapperTag = receipt.tags.find(([name]) => name === 'P');
          const zapper = zapperTag?.[1] || receipt.pubkey;

          stats.totalZaps++;
          stats.totalSats += amount;
          zapperSet.add(zapper);

          stats.zapReceipts.push({
            id: receipt.id,
            amount,
            zapper,
            timestamp: receipt.created_at
          });
        } catch {
          // Skip invalid zap receipts
          continue;
        }
      }

      stats.uniqueZappers = zapperSet.size;
      stats.averageSats = stats.totalZaps > 0 ? Math.round(stats.totalSats / stats.totalZaps) : 0;

      // Sort zap receipts by timestamp (newest first)
      stats.zapReceipts.sort((a, b) => b.timestamp - a.timestamp);

      return stats;
    },
    enabled: !!eventId,
    staleTime: 30000, // 30 seconds
  });
}

export function useUserZapStats(pubkey: string) {
  const { nostr } = useNostr();

  return useQuery({
    queryKey: ['user-zap-stats', pubkey],
    queryFn: async (c) => {
      const signal = AbortSignal.any([c.signal, AbortSignal.timeout(3000)]);

      // Query for zap receipts sent by this user
      const sentZaps = await nostr.query([
        {
          kinds: [9735],
          '#P': [pubkey], // Zaps sent by this user
          limit: 1000
        }
      ], { signal });

      // Query for zap receipts received by this user
      const receivedZaps = await nostr.query([
        {
          kinds: [9735],
          '#p': [pubkey], // Zaps received by this user
          limit: 1000
        }
      ], { signal });

      return {
        sentCount: sentZaps.length,
        receivedCount: receivedZaps.length,
        sentZaps,
        receivedZaps
      };
    },
    enabled: !!pubkey,
    staleTime: 60000, // 1 minute
  });
}