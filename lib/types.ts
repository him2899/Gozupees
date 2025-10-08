// WordPress Content Types
export interface WPPost {
  id: number;
  date: string;
  slug: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  featured_media: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text?: string;
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
    }>>;
    author?: Array<{
      id: number;
      name: string;
      avatar_urls?: {
        [key: string]: string;
      };
    }>;
  };
  categories: number[];
  tags: number[];
  acf?: {
    [key: string]: any;
  };
}

export interface WPCategory {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  parent: number;
}

export interface WPTag {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
}

export interface WPMedia {
  id: number;
  date: string;
  slug: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  source_url: string;
  alt_text?: string;
  media_details: {
    width: number;
    height: number;
    sizes: {
      [key: string]: {
        width: number;
        height: number;
        source_url: string;
      };
    };
  };
}

export interface WPAuthor {
  id: number;
  name: string;
  url: string;
  description: string;
  link: string;
  slug: string;
  avatar_urls: {
    [key: string]: string;
  };
}

// Custom Types
export interface ArticlePreview {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  categories: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  author: {
    name: string;
    avatar: string;
  };
}

// Database Post Type (from PostgreSQL)
export interface DatabasePost {
  id: number;
  slug: string;
  title_rendered: string;
  excerpt_rendered: string;
  content_rendered: string;
  date: string;
  featured_media_url: string | null;
  featured_media_alt: string | null;
  author_name: string | null;
  author_avatar: string | null;
  categories: number[];
  tags: number[];
  status: string;
  type: string;
}

export interface Resource {
  id: number;
  slug: string;
  title: string;
  description: string;
  type: 'WHITE_PAPER' | 'CASE_STUDY' | 'RESEARCH';
  icon: string;
  details: string;
  url: string;
}

export interface Webinar {
  id: number;
  slug: string;
  title: string;
  description: string;
  date: string;
  time: string;
  image: string;
  status: 'LIVE' | 'ON-DEMAND';
  duration: string;
  speakers: Array<{
    name: string;
    title: string;
    avatar: string;
  }>;
  registrationUrl: string;
}

export interface Topic {
  id: number;
  slug: string;
  title: string;
  description: string;
  icon: string;
  articleCount: number;
  gradientFrom: string;
  gradientTo: string;
}
