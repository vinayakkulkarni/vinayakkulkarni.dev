import type { ContentBody, ContentNode } from '~/types/article';

export function extractText(body: unknown): string {
  const root = (body as ContentBody | undefined)?.value;
  if (!Array.isArray(root)) return '';

  const walk = (node: ContentNode): string => {
    if (typeof node === 'string') return node;
    if (!Array.isArray(node)) return '';
    const [tag, , ...children] = node;
    if (tag === 'code' || tag === 'pre') return '';
    return children.map(walk).join(' ');
  };

  return root.map(walk).join(' ');
}
