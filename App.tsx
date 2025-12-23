import React, { useState, useEffect, useCallback } from 'react';
import { Article } from './types';
import { generateBlogPosts } from './services/geminiService';
import { ArticleCard } from './components/ArticleCard';
import { ArticleSkeleton } from './components/ArticleSkeleton';
import { ArticleModal } from './components/ArticleModal';
import { RefreshCw, LayoutGrid, Github } from 'lucide-react';

export default function App() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const fetchArticles = useCallback(async (isRefresh = false) => {
    setLoading(true);
    // If refreshing, clear current, otherwise we could append, but for this demo we replace content
    if (isRefresh) setArticles([]);
    
    const newArticles = await generateBlogPosts(9);
    setArticles(newArticles);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gray-900 text-white p-2 rounded-lg">
                <LayoutGrid size={24} />
              </div>
              <span className="text-xl font-bold text-gray-900 tracking-tight font-serif">
                WP Grid<span className="text-blue-600">.Theme</span>
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => fetchArticles(true)}
                disabled={loading}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all shadow-sm"
              >
                <RefreshCw size={16} className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
                {loading ? 'Generating...' : 'Regenerate Content'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight font-serif">
              Creative Vertical Grid
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A responsive WordPress-inspired template designed for readability. 
              Powered by Google Gemini to demonstrate dynamic content generation.
            </p>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading && articles.length === 0 ? (
              // Skeleton Loading State
              Array.from({ length: 6 }).map((_, i) => (
                <ArticleSkeleton key={i} />
              ))
            ) : (
              // Article Cards
              articles.map((article, index) => (
                <ArticleCard 
                  key={article.id} 
                  article={article} 
                  index={index}
                  onClick={setSelectedArticle}
                />
              ))
            )}
          </div>

          {!loading && articles.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500">No articles found. Try regenerating.</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-center md:justify-start">
               <span className="text-gray-400 text-sm">
                &copy; 2024 WP Grid Theme. Built with React & Gemini.
               </span>
            </div>
            <div className="mt-8 md:mt-0 flex justify-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">GitHub</span>
                <Github size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Article Modal */}
      <ArticleModal 
        article={selectedArticle} 
        onClose={() => setSelectedArticle(null)} 
      />
    </div>
  );
}