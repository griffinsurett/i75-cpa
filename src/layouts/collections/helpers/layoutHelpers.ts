// src/layouts/collections/helpers/layoutHelpers.ts
/**
 * Layout Helper Functions
 * 
 * Utility functions for extracting data from collection entries
 * in a consistent way across different layout components.
 * 
 * Handles various data formats and provides safe defaults.
 */

/**
 * Resolve author name from various author formats
 * 
 * Author can be:
 * - String: 'Jane Doe'
 * - Object with name: { name: 'Jane Doe' }
 * - Object with title: { title: 'Jane Doe' }
 * - Object with id: { id: 'jane-doe' }
 * 
 * @param author - Author in any supported format
 * @returns Author display name or empty string
 */
export function getAuthorName(author: any): string {
  if (!author) return '';
  if (typeof author === 'string') return author;
  if (author.name) return author.name;
  if (author.title) return author.title;
  if (author.id) return author.id;
  return '';
}

/**
 * Extract image URL from various image formats
 * 
 * Image can be:
 * - String: '/images/photo.jpg' or '@/assets/photo.jpg'
 * - Object with src: { src: '/images/photo.jpg' }
 * - Nested object: { src: { src: '/images/photo.jpg' } }
 * 
 * @param image - Image in any supported format
 * @returns Image URL string or empty string
 */
export function getImageSrc(image: any): string {
  if (!image) return '';
  
  // Direct string path
  if (typeof image === 'string') {
    // Convert Astro alias to relative path
    if (image.startsWith('@/')) {
      return image.replace('@/', '/src/');
    }
    return image;
  }
  
  // Object with src property
  if (image.src) {
    // String src
    if (typeof image.src === 'string') return image.src;
    // Nested src object
    if (image.src.src) return image.src.src;
    return image.src;
  }
  
  return '';
}

export interface BreadcrumbItem {
  label: string;
  url?: string;
}

export interface BreadcrumbOptions {
  entry: any;
  collection: string;
  collectionMeta: any;
  includeHome?: boolean;
  includeCollection?: boolean;
}

export interface HeroBreadcrumbOptions {
  breadcrumbs?: BreadcrumbItem[];
  path?: string;
}

function formatBreadcrumbLabel(value: string): string {
  return decodeURIComponent(value)
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function buildPathBreadcrumbs(path: string): BreadcrumbItem[] {
  const trimmed = path.replace(/\/+$/, '');
  if (!trimmed || trimmed === '/') return [];

  const segments = trimmed.split('/').filter(Boolean);
  const crumbs: BreadcrumbItem[] = [{ label: 'Home', url: '/' }];

  let currentPath = '';
  for (const segment of segments) {
    currentPath += `/${segment}`;
    crumbs.push({
      label: formatBreadcrumbLabel(segment),
      url: currentPath,
    });
  }

  return crumbs;
}

export async function buildBreadcrumbs({
  entry,
  collection,
  collectionMeta,
  includeHome = true,
  includeCollection = true,
}: BreadcrumbOptions): Promise<BreadcrumbItem[]> {
  if (!entry || !collection) return [];

  const items: BreadcrumbItem[] = [];

  if (includeHome) {
    items.push({ label: 'Home', url: '/' });
  }

  const { shouldCollectionHavePage } = await import('@/utils/pages');
  if (includeCollection && shouldCollectionHavePage(collectionMeta)) {
    items.push({
      label: formatBreadcrumbLabel(collection),
      url: `/${collection}`,
    });
  }

  const { getBreadcrumbs } = await import('@/utils/query');
  const { getCollectionMeta, getItemKey, prepareEntry } = await import(
    '@/utils/collections'
  );

  const entryId = getItemKey(entry);
  if (!entryId) return items;

  const crumbs = await getBreadcrumbs(collection as any, entryId, true);

  for (const crumb of crumbs) {
    const crumbEntry = crumb.entry;
    if (!crumbEntry) continue;

    const crumbCollection = crumbEntry.collection as any;
    const crumbMeta = getCollectionMeta(crumbCollection);
    const prepared = await prepareEntry(crumbEntry, crumbCollection, crumbMeta);
    const rawLabel =
      getItemKey(crumbEntry) || crumbEntry.id || crumbEntry.slug || '';
    const label = rawLabel ? formatBreadcrumbLabel(rawLabel) : '';

    items.push({
      label: label || crumbCollection,
      url: prepared.url,
    });
  }

  return items;
}

export async function buildHeroBreadcrumbs({
  breadcrumbs,
  path,
}: HeroBreadcrumbOptions): Promise<BreadcrumbItem[]> {
  if (breadcrumbs && breadcrumbs.length > 0) {
    return breadcrumbs;
  }

  if (path && path !== '/') {
    const trimmed = path.replace(/\/+$/, '');
    const segments = trimmed.split('/').filter(Boolean);
    if (segments.length === 0) return [];

    const { getCollectionMeta } = await import('@/utils/collections');
    const { shouldCollectionHavePage } = await import('@/utils/pages');
    const { safeGetEntry } = await import('@/utils/query');
    const { getPageCollections } = await import(
      '@/utils/pages/pageGeneration'
    );

    const collections = getPageCollections();

    // Collection-level path: /collection or /collection/slug
    const collectionSegment = segments[0];
    if (collections.includes(collectionSegment as any)) {
      const meta = getCollectionMeta(collectionSegment as any);
      const includeCollection = shouldCollectionHavePage(meta);

      if (segments.length === 1) {
        return includeCollection
          ? [
              { label: 'Home', url: '/' },
              { label: collectionSegment, url: `/${collectionSegment}` },
            ]
          : [{ label: 'Home', url: '/' }];
      }

      const entry = await safeGetEntry(
        collectionSegment as any,
        segments[1]
      );
      if (entry) {
        return buildBreadcrumbs({
          entry,
          collection: collectionSegment,
          collectionMeta: meta,
          includeCollection,
        });
      }
    }

    // Root path item: /slug (find collection with itemsRootPath)
    const slugSegment = segments[0];
    for (const coll of collections) {
      const meta = getCollectionMeta(coll);
      if (!meta?.itemsRootPath) continue;

      const entry = await safeGetEntry(coll as any, slugSegment);
      if (!entry) continue;

      const includeCollection = shouldCollectionHavePage(meta);
      return buildBreadcrumbs({
        entry,
        collection: coll,
        collectionMeta: meta,
        includeCollection,
      });
    }

    return buildPathBreadcrumbs(path);
  }

  return [];
}
