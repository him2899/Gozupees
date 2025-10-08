export interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
  noindex?: boolean;
  schema?: Record<string, any>;
}

export const defaultSEO: SEOProps = {
  title: 'GoZupees - AI Voice Agents for Sales & Marketing | Transform Customer Communication',
  description: 'Deploy specialized AI voice agents that handle sales calls, lead qualification, and customer support 24/7. Increase conversions and reduce costs with GoZupees intelligent voice automation.',
  canonical: 'https://gozupees.com',
  ogImage: 'https://gozupees.com/og-image.jpg',
  ogType: 'website',
  author: 'GoZupees',
  tags: ['AI voice agents', 'sales automation', 'customer service AI', 'conversational AI', 'voice technology'],
};

export function generateSEOTags(seo: SEOProps = {}): Record<string, string> {
  const merged = { ...defaultSEO, ...seo };
  
  return {
    title: merged.title || defaultSEO.title!,
    description: merged.description || defaultSEO.description!,
    canonical: merged.canonical || defaultSEO.canonical!,
    'og:title': merged.title || defaultSEO.title!,
    'og:description': merged.description || defaultSEO.description!,
    'og:image': merged.ogImage || defaultSEO.ogImage!,
    'og:type': merged.ogType || defaultSEO.ogType!,
    'og:url': merged.canonical || defaultSEO.canonical!,
    'twitter:card': 'summary_large_image',
    'twitter:title': merged.title || defaultSEO.title!,
    'twitter:description': merged.description || defaultSEO.description!,
    'twitter:image': merged.ogImage || defaultSEO.ogImage!,
    'article:author': merged.author || defaultSEO.author!,
    'article:published_time': merged.publishedTime || '',
    'article:modified_time': merged.modifiedTime || '',
    'robots': merged.noindex ? 'noindex, nofollow' : 'index, follow',
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'GoZupees',
    url: 'https://gozupees.com',
    logo: 'https://gozupees.com/logo.png',
    description: 'AI voice agents platform for sales and marketing automation',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-555-GOZUPEES',
      contactType: 'customer service',
      availableLanguage: 'English',
    },
    sameAs: [
      'https://linkedin.com/company/gozupees',
      'https://twitter.com/gozupees',
    ],
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://gozupees.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateArticleSchema(article: {
  title: string;
  description: string;
  url: string;
  image: string;
  publishedDate: string;
  modifiedDate: string;
  author: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    url: article.url,
    image: article.image,
    datePublished: article.publishedDate,
    dateModified: article.modifiedDate,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'GoZupees',
      logo: {
        '@type': 'ImageObject',
        url: 'https://gozupees.com/logo.png',
      },
    },
  };
}

export function generateProductSchema(product: {
  name: string;
  description: string;
  image: string;
  price?: string;
  currency?: string;
  availability?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    brand: {
      '@type': 'Brand',
      name: 'GoZupees',
    },
    offers: product.price ? {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency || 'USD',
      availability: product.availability || 'https://schema.org/InStock',
    } : undefined,
  };
}