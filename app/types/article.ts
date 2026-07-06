export interface ArticleMeta {
  path: string;
  title: string;
  description: string;
  date: string;
  updatedAt?: string;
  category?: string;
  tags?: string[];
  image?: string;
  status: 'draft' | 'published';
}

export interface ArticleNeighbors {
  prev: ArticleMeta | null;
  next: ArticleMeta | null;
}

export type ContentNode =
  | string
  | [string, Record<string, unknown>, ...ContentNode[]];

export interface ContentBody {
  value?: ContentNode[];
}
