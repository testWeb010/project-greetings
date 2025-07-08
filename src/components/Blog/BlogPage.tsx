
import React, { useState } from 'react';
import BlogHero from './BlogHero';
import FeaturedPosts from './FeaturedPosts';
import ArticleGrid from './ArticleGrid';
import BlogSidebarCategories from './BlogSidebarCategories';

const BlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <BlogHero />
      
      <div className="max-w-7xl mx-auto">
        <FeaturedPosts />
        
        <div className="flex">
          {/* Sidebar */}
          <BlogSidebarCategories 
            activeCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
          
          {/* Main Content */}
          <div className="flex-1">
            <ArticleGrid selectedCategory={selectedCategory} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
