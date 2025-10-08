import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export function excerpt(text: string, maxLength: number = 160): string {
  // First decode HTML entities
  const decodedText = decodeHtmlEntities(text);
  
  // Then strip HTML tags
  const strippedText = decodedText.replace(/<\/?[^>]+(>|$)/g, "");
  
  if (strippedText.length <= maxLength) {
    return strippedText;
  }
  
  return strippedText.substr(0, maxLength) + '...';
}

export function calculateReadTime(content: string): string {
  // First decode HTML entities
  const decodedText = decodeHtmlEntities(content);
  
  // Then strip HTML tags
  const strippedText = decodedText.replace(/<\/?[^>]+(>|$)/g, "");
  
  // Average reading speed: 225 words per minute
  const words = strippedText.split(/\s+/).length;
  const minutes = Math.ceil(words / 225);
  
  return `${minutes} min read`;
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/&/g, '-and-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

export function getGradientClassName(type: string): string {
  const gradients = {
    'ai': 'from-primary to-secondary',
    'data': 'from-accent to-primary',
    'marketing': 'from-secondary to-primary',
    'integration': 'from-secondary to-accent',
    'default': 'from-primary to-accent'
  };
  
  return gradients[type as keyof typeof gradients] || gradients.default;
}

/**
 * Decodes HTML entities in a string (e.g., &amp; -> &, &#8217; -> ', &#8211; -> –)
 * Safe to use in both client and server environments
 */
export function decodeHtmlEntities(text: string): string {
  if (!text) return '';
  
  // Server-side handling
  if (typeof window === 'undefined') {
    // Common HTML entities
    return text
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&#39;/g, "'")
      // Typographic entities
      .replace(/&#8211;/g, '-') // en dash
      .replace(/&#8212;/g, '--') // em dash
      .replace(/&#8216;/g, "'") // left single quote
      .replace(/&#8217;/g, "'") // right single quote/apostrophe
      .replace(/&#8220;/g, '"') // left double quote
      .replace(/&#8221;/g, '"') // right double quote
      .replace(/&#8230;/g, '...') // ellipsis
      .replace(/&ndash;/g, '-')
      .replace(/&mdash;/g, '--')
      .replace(/&lsquo;/g, "'")
      .replace(/&rsquo;/g, "'")
      .replace(/&ldquo;/g, '"')
      .replace(/&rdquo;/g, '"')
      .replace(/&hellip;/g, '...')
      // Other common entities
      .replace(/&nbsp;/g, ' ')
      .replace(/&copy;/g, '(c)')
      .replace(/&reg;/g, '(r)')
      .replace(/&trade;/g, '(tm)');
  }
  
  // Client-side handling
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
}
