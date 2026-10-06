export interface MediaItem {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  createdAt: string;
}

export const DEFAULT_MEDIA_ASSETS: MediaItem[] = [
  {
    id: 'asset_team_banner',
    filename: 'team-banner.png',
    originalName: 'team-banner.png',
    mimeType: 'image/png',
    size: 1962309,
    url: '/assets/team-banner.png',
    createdAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'asset_about_banner',
    filename: 'about-us-banner.png',
    originalName: 'about-us-banner.png',
    mimeType: 'image/png',
    size: 1968898,
    url: '/assets/about-us-banner.png',
    createdAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'asset_hero_robot',
    filename: 'hero-ai-robot.png',
    originalName: 'hero-ai-robot.png',
    mimeType: 'image/png',
    size: 2032922,
    url: '/assets/hero-ai-robot.png',
    createdAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'asset_hero_team',
    filename: 'hero-team-work.png',
    originalName: 'hero-team-work.png',
    mimeType: 'image/png',
    size: 1942073,
    url: '/assets/hero-team-work.png',
    createdAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'asset_global_presence',
    filename: 'global-presence.png',
    originalName: 'global-presence.png',
    mimeType: 'image/png',
    size: 2244874,
    url: '/assets/global-presence.png',
    createdAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'asset_contact_banner',
    filename: 'contact-banner.png',
    originalName: 'contact-banner.png',
    mimeType: 'image/png',
    size: 1769200,
    url: '/assets/contact-banner.png',
    createdAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'asset_case_studies',
    filename: 'case-studies-banner.png',
    originalName: 'case-studies-banner.png',
    mimeType: 'image/png',
    size: 1977346,
    url: '/assets/case-studies-banner.png',
    createdAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'asset_testimonials_banner',
    filename: 'testimonials-banner.png',
    originalName: 'testimonials-banner.png',
    mimeType: 'image/png',
    size: 1951129,
    url: '/assets/testimonials-banner.png',
    createdAt: '2026-01-01T00:00:00.000Z',
  },
];

/**
 * Compresses an image client-side to fit nicely in storage and memory.
 */
export async function fileToCompressedDataUrl(
  file: File,
  maxWidth = 1000,
  maxHeight = 1000,
  quality = 0.85
): Promise<string> {
  if (file.type === 'image/svg+xml') {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const mime = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
        const dataUrl = canvas.toDataURL(mime, quality);
        resolve(dataUrl);
      };
      img.onerror = () => {
        resolve(e.target?.result as string);
      };
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const MEDIA_CACHE_KEY = 'infosbrain_cms_media';

export function getOfflineMedia(): MediaItem[] {
  try {
    const saved = localStorage.getItem(MEDIA_CACHE_KEY);
    const userMedia: MediaItem[] = saved ? JSON.parse(saved) : [];
    const existingIds = new Set(userMedia.map((m) => m.id));
    const defaultsToAdd = DEFAULT_MEDIA_ASSETS.filter((m) => !existingIds.has(m.id));
    return [...userMedia, ...defaultsToAdd];
  } catch {
    return [...DEFAULT_MEDIA_ASSETS];
  }
}

export function saveOfflineMedia(newItem: MediaItem): void {
  try {
    const saved = localStorage.getItem(MEDIA_CACHE_KEY);
    const currentList: MediaItem[] = saved ? JSON.parse(saved) : [];
    const updated = [newItem, ...currentList.filter((m) => m.id !== newItem.id)].slice(0, 30);
    localStorage.setItem(MEDIA_CACHE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('infosbrain_media_updated'));
  } catch {}
}
