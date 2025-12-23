import React, { useEffect } from 'react';
import { Article } from '../types';
import { X, Calendar, User, Tag } from 'lucide-react';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose }) => {
  useEffect(() => {
    if (article) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [article]);

  if (!article) return null;

  const imageUrl = `https://picsum.photos/seed/${article.id}/1200/600`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl overflow-y-auto flex flex-col animate-in fade-in zoom-in duration-300">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
        >
          <X size={20} />
        </button>

        <div className="relative h-64 sm:h-80 lg:h-96 w-full flex-shrink-0">
          <img 
            src={imageUrl} 
            alt={article.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 sm:p-8 w-full">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-white uppercase bg-blue-600 rounded-full">
              {article.category}
            </span>
            <h1 className="text-2xl sm:text-4xl font-bold text-white mb-2 leading-tight">
              {article.title}
            </h1>
          </div>
        </div>

        <div className="p-6 sm:p-10 lg:p-12">
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-100">
            <div className="flex items-center">
              <User size={16} className="mr-2 text-blue-600" />
              <span className="font-medium text-gray-900">{article.author}</span>
            </div>
            <div className="flex items-center">
              <Calendar size={16} className="mr-2 text-blue-600" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center">
              <Tag size={16} className="mr-2 text-blue-600" />
              <span>{article.category}</span>
            </div>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 font-serif leading-loose">
            {article.content.split('\n').map((paragraph, i) => (
              paragraph.trim() && <p key={i} className="mb-6">{paragraph}</p>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-100 flex justify-center">
            <button 
              onClick={onClose}
              className="px-8 py-3 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Close Article
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};