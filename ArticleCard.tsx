import React from 'react';
import { Article } from '../types';
import { Calendar, User } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  onClick: (article: Article) => void;
  index: number;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, onClick, index }) => {
  // Generate a deterministic random image based on the article ID or index
  const imageUrl = `https://picsum.photos/seed/${article.id}/800/600`;

  return (
    <div 
      className="group flex flex-col bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer h-full"
      onClick={() => onClick(article)}
    >
      <div className="relative overflow-hidden h-52 w-full">
        <img 
          src={imageUrl} 
          alt={article.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-blue-800 shadow-sm">
          {article.category}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center text-xs text-gray-500 mb-3 space-x-4">
          <div className="flex items-center">
            <Calendar size={14} className="mr-1" />
            {article.date}
          </div>
          <div className="flex items-center">
            <User size={14} className="mr-1" />
            {article.author}
          </div>
        </div>
        
        <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-700 transition-colors">
          {article.title}
        </h2>
        
        <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow leading-relaxed">
          {article.excerpt}
        </p>
        
        <div className="mt-auto pt-4 border-t border-gray-100">
          <span className="text-blue-600 font-medium text-sm inline-flex items-center group-hover:underline">
            Read Article &rarr;
          </span>
        </div>
      </div>
    </div>
  );
};