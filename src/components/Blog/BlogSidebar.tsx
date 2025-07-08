import React from 'react';
import { Filter, Tag } from 'lucide-react';
import { BlogPost } from '../../types';

interface BlogSidebarProps {
  categories: { key: string; label: string; count: number }[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  // Assuming popular tags might become dynamic later, add a prop for them
  // popularTags: string[]; 
}

const BlogSidebar: React.FC<BlogSidebarProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  // popularTags,
}) => {
  // Hardcoded popular tags for now, will be replaced with a prop/fetch later
  const popularTags = ['Student Life', 'PG', 'Safety', 'Budget', 'Tips', 'Bangalore', 'Delhi', 'Mumbai'];

  return (
    <div className="sticky top-8 space-y-8">
      {/* Categories */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <Filter className="h-5 w-5 mr-2 text-blue-600" />
          Categories
        </h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                selectedCategory === category.key
                  ? 'bg-blue-50 text-blue-600 border border-blue-200'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{category.label}</span>
                <span className={`text-sm px-2 py-1 rounded-full ${
                  selectedCategory === category.key
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {category.count}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Popular Tags */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <Tag className="h-5 w-5 mr-2 text-blue-600" />
          Popular Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag) => (
            <button
              key={tag}
              className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition-colors text-sm font-medium"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
        <h3 className="text-xl font-bold mb-4">Stay Updated</h3>
        <p className="text-blue-100 mb-4">
          Get the latest tips and guides delivered to your inbox.
        </p>
        <div className="space-y-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-300"
          />
          <button className="w-full bg-white text-blue-600 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogSidebar;