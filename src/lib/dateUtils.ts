import { format, formatDistanceToNow } from 'date-fns';

/**
 * Safely formats a timestamp, handling invalid dates gracefully
 */
export function safeFormatDate(timestamp: number | string | undefined, formatStr: string = 'MMM d, yyyy'): string {
  if (!timestamp) return 'Unknown date';
  
  const numericTimestamp = typeof timestamp === 'string' ? parseInt(timestamp) : timestamp;
  
  // Handle both seconds and milliseconds timestamps
  const date = new Date(numericTimestamp > 1e10 ? numericTimestamp : numericTimestamp * 1000);
  
  if (isNaN(date.getTime())) {
    return 'Invalid date';
  }
  
  try {
    return format(date, formatStr);
  } catch (error) {
    console.warn('Date formatting error:', error);
    return 'Invalid date';
  }
}

/**
 * Safely formats a relative time distance, handling invalid dates gracefully
 */
export function safeFormatDistanceToNow(timestamp: number | string | undefined): string {
  if (!timestamp) return 'recently';
  
  const numericTimestamp = typeof timestamp === 'string' ? parseInt(timestamp) : timestamp;
  
  // Handle both seconds and milliseconds timestamps
  const date = new Date(numericTimestamp > 1e10 ? numericTimestamp : numericTimestamp * 1000);
  
  if (isNaN(date.getTime())) {
    return 'recently';
  }
  
  try {
    return formatDistanceToNow(date, { addSuffix: true });
  } catch (error) {
    console.warn('Distance formatting error:', error);
    return 'recently';
  }
}

/**
 * Checks if a timestamp represents a valid date
 */
export function isValidTimestamp(timestamp: number | string | undefined): boolean {
  if (!timestamp) return false;
  
  const numericTimestamp = typeof timestamp === 'string' ? parseInt(timestamp) : timestamp;
  const date = new Date(numericTimestamp > 1e10 ? numericTimestamp : numericTimestamp * 1000);
  
  return !isNaN(date.getTime());
}

/**
 * Safely creates a Date object from a timestamp
 */
export function safeCreateDate(timestamp: number | string | undefined): Date {
  if (!timestamp) return new Date();
  
  const numericTimestamp = typeof timestamp === 'string' ? parseInt(timestamp) : timestamp;
  const date = new Date(numericTimestamp > 1e10 ? numericTimestamp : numericTimestamp * 1000);
  
  return isNaN(date.getTime()) ? new Date() : date;
}