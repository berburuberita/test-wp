import React from 'react';

export const ArticleSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-full animate-pulse">
      <div className="h-52 w-full bg-gray-200" />
      <div className="p-6">
        <div className="flex space-x-4 mb-4">
          <div className="h-3 w-20 bg-gray-200 rounded" />
          <div className="h-3 w-24 bg-gray-200 rounded" />
        </div>
        <div className="h-6 w-3/4 bg-gray-200 rounded mb-4" />
        <div className="h-4 w-full bg-gray-200 rounded mb-2" />
        <div className="h-4 w-full bg-gray-200 rounded mb-2" />
        <div className="h-4 w-2/3 bg-gray-200 rounded mb-6" />
        <div className="h-4 w-24 bg-gray-200 rounded mt-auto" />
      </div>
    </div>
  );
};