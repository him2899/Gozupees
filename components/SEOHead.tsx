import React from 'react';
import Head from 'next/head';
import { SEOProps, generateSEOTags, generateOrganizationSchema } from '../lib/seo';

interface SEOHeadProps extends SEOProps {
  structuredData?: Record<string, any>[];
}

export default function SEOHead(props: SEOHeadProps) {
  const seoTags = generateSEOTags(props);
  const organizationSchema = generateOrganizationSchema();
  
  const allSchemas = [
    organizationSchema,
    ...(props.structuredData || []),
    ...(props.schema ? [props.schema] : [])
  ];

  return (
    <Head>
      <title>{seoTags.title}</title>
      <meta name="description" content={seoTags.description} />
      <meta name="robots" content={seoTags.robots} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={seoTags.canonical} />
      
      {/* Open Graph */}
      <meta property="og:title" content={seoTags['og:title']} />
      <meta property="og:description" content={seoTags['og:description']} />
      <meta property="og:image" content={seoTags['og:image']} />
      <meta property="og:type" content={seoTags['og:type']} />
      <meta property="og:url" content={seoTags['og:url']} />
      <meta property="og:site_name" content="GoZupees" />
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content={seoTags['twitter:card']} />
      <meta name="twitter:title" content={seoTags['twitter:title']} />
      <meta name="twitter:description" content={seoTags['twitter:description']} />
      <meta name="twitter:image" content={seoTags['twitter:image']} />
      <meta name="twitter:creator" content="@gozupees" />
      <meta name="twitter:site" content="@gozupees" />
      
      {/* Article specific meta tags */}
      {seoTags['article:published_time'] && (
        <meta property="article:published_time" content={seoTags['article:published_time']} />
      )}
      {seoTags['article:modified_time'] && (
        <meta property="article:modified_time" content={seoTags['article:modified_time']} />
      )}
      {seoTags['article:author'] && (
        <meta property="article:author" content={seoTags['article:author']} />
      )}
      
      {/* Keywords */}
      {props.tags && props.tags.length > 0 && (
        <meta name="keywords" content={props.tags.join(', ')} />
      )}
      
      {/* Structured Data */}
      {allSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      
      {/* Additional SEO meta tags */}
      <meta name="theme-color" content="#6366f1" />
      <meta name="msapplication-TileColor" content="#6366f1" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="format-detection" content="telephone=no" />
    </Head>
  );
}