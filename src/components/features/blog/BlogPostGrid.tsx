
import React from 'react';
import { BlogPost } from '../../../types';

interface BlogPostGridProps {
  posts: BlogPost[];
  formatDate: (date: string) => string;
}

const BlogPostGrid: React.FC<BlogPostGridProps> = ({ posts, formatDate }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <div className="flex items-center mb-2">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                {post.category}
              </span>
              <span className="text-sm text-gray-500 ml-2">
                {post.readTime} min read
              </span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
              {post.title}
            </h3>
            <p className="text-gray-600 mb-4 line-clamp-3">
              {post.excerpt}
            </p>
            <div className="flex items-center">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-8 h-8 rounded-full mr-3"
              />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {post.author.name}
                </p>
                <p className="text-sm text-gray-500">
                  {formatDate(post.publishedAt)}
                </p>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default BlogPostGrid;
