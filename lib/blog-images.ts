const DEFAULT_COVER =
  'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?w=800&q=80';

const ALLOWED_IMAGE_HOSTS = new Set([
  'images.unsplash.com',
  'picsum.photos',
]);

/** Returns a cover image URL, falling back to default if URL host is not allowed */
export function getCoverImage(coverImage: string | undefined): string {
  if (!coverImage) return DEFAULT_COVER;
  try {
    const host = new URL(coverImage).hostname;
    return ALLOWED_IMAGE_HOSTS.has(host) ? coverImage : DEFAULT_COVER;
  } catch {
    return DEFAULT_COVER;
  }
}
