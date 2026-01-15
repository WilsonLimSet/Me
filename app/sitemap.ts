import { promises as fs } from 'fs';
import path from 'path';
import { MetadataRoute } from 'next';

async function getNoteSlugs(dir: string) {
  const entries = await fs.readdir(dir, {
    recursive: true,
    withFileTypes: true,
  });
  return entries
    .filter((entry) => entry.isFile() && entry.name === 'page.mdx')
    .map((entry) => {
      const relativePath = path.relative(
        dir,
        path.join(entry.parentPath, entry.name)
      );
      return path.dirname(relativePath);
    })
    .map((slug) => slug.replace(/\\/g, '/'));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const notesDirectory = path.join(process.cwd(), 'app');
  const slugs = await getNoteSlugs(notesDirectory);

  // Use relative URLs for notes
  const notes = slugs.map((slug) => ({
    url: `/${slug}`,
    lastModified: new Date().toISOString(),
  }));

  // Use relative URLs for routes
  const routes = ['', '/favlinks'].map((route) => ({
    url: route,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...notes];
}