const store = new Map<string, number[]>();
const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 5;

export function rateLimit(key: string): { success: boolean; remaining: number } {
  const now = Date.now();
  const windowStart = now - WINDOW_MS;
  let timestamps = store.get(key) ?? [];
  timestamps = timestamps.filter((t) => t > windowStart);

  if (timestamps.length >= MAX_REQUESTS) {
    return { success: false, remaining: 0 };
  }

  timestamps.push(now);
  store.set(key, timestamps);
  return { success: true, remaining: MAX_REQUESTS - timestamps.length };
}
