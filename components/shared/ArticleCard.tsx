import React from 'react';
import { ArticlePreview } from '../../lib/types';
import { formatDate } from '../../lib/utils';

interface ArticleCardProps {
  article: ArticlePreview;
  className?: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, className = '' }) => {
  return (
    <a 
      href={`/blog/${article.slug}`} 
      className={`block rounded-xl overflow-hidden bg-white/10 border border-white/10 shadow-md hover:bg-white/15 transition-colors ${className}`}
    >
      <div className="relative h-48 overflow-hidden">
        {article.image && (
          <img 
            src={article.image} 
            alt={article.title} 
            className="w-full h-full object-cover"
            loading="lazy"
          />
        )}
      </div>
      
      <div className="p-6">
        <div className="flex mb-4">
          {article.categories[0] && (
            <span className="px-2 py-1 text-sm rounded-full bg-accent/20 text-accent">
              {article.categories[0].name}
            </span>
          )}
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
          {article.title}
        </h3>
        
        <p className="text-gray-300 mb-4 line-clamp-3">
          {article.excerpt}
        </p>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm">
            {formatDate(article.date)} • {article.readTime}
          </span>
          <span className="text-accent hover:text-white transition-colors">
            Read more
          </span>
        </div>
      </div>
    </a>
  );
};

export default ArticleCard;