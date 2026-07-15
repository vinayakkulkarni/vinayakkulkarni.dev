import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

export type DiskArticle = {
  title: string;
  description: string;
  date: string;
  tags: string[];
  status: string;
  path: string;
};

function frontmatterField(src: string, key: string): string {
  const m = src.match(new RegExp(`^${key}:\\s*'?([^'\\n]*)'?\\s*$`, 'm'));
  return m?.[1]?.trim() ?? '';
}

function frontmatterTags(src: string): string[] {
  const m = src.match(/^tags:\s*\[([^\]]*)\]\s*$/m);
  if (!m?.[1]) return [];
  return m[1]
    .split(',')
    .map((t) => t.trim().replace(/^'|'$/g, ''))
    .filter(Boolean);
}

// Only usable in prerendered routes: reads content/articles/ from disk at
// build time. Replaces @nuxt/content queryCollection, which cannot run on
// nitro v3 (bundled h3 v1 helpers; nuxt/content#3772).
export async function readArticlesFromDisk(): Promise<DiskArticle[]> {
  const dir = join(process.cwd(), 'content/articles');
  const files = await readdir(dir);
  const articles = await Promise.all(
    files
      .filter((f) => f.endsWith('.md'))
      .map(async (file) => {
        const src = await readFile(join(dir, file), 'utf-8');
        const fm = src.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
        const slug = file.replace(/^\d+\./, '').replace(/\.md$/, '');
        return {
          title: frontmatterField(fm, 'title'),
          description: frontmatterField(fm, 'description'),
          date: frontmatterField(fm, 'date'),
          tags: frontmatterTags(fm),
          status: frontmatterField(fm, 'status'),
          path: `/articles/${slug}`,
        };
      }),
  );
  return articles
    .filter((a) => a.status === 'published')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
