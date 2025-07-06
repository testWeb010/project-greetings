import React, { useState } from 'react';
import { Search, Calendar, Clock, User, Tag, TrendingUp, BookOpen, ArrowRight, Eye, Heart, Share2, Filter } from 'lucide-react';
import { BlogPost } from '../types';

const BlogPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Complete Guide to Finding PG Accommodation in Bangalore',
      slug: 'complete-guide-pg-accommodation-bangalore',
      excerpt: 'Everything you need to know about finding the perfect PG in Bangalore, from budget considerations to safety tips.',
      content: '',
      author: {
        name: 'Priya Sharma',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
        role: 'Real Estate Expert'
      },
      category: 'Student Guide',
      tags: ['PG', 'Bangalore', 'Student Life', 'Accommodation'],
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
      publishedAt: '2024-01-15',
      readTime: 8,
      featured: true
    },
    {
      id: '2',
      title: '10 Questions to Ask Before Renting a Room',
      slug: '10-questions-ask-before-renting-room',
      excerpt: 'Essential questions every student should ask property owners before finalizing their rental agreement.',
      content: '',
      author: {
        name: 'Rahul Gupta',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
        role: 'Property Consultant'
      },
      category: 'Tips & Tricks',
      tags: ['Rental', 'Tips', 'Student Housing'],
      image: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg',
      publishedAt: '2024-01-12',
      readTime: 6,
      featured: false
    },
    {
      id: '3',
      title: 'Safety Tips for Students Living Away from Home',
      slug: 'safety-tips-students-living-away-home',
      excerpt: 'Comprehensive safety guidelines for students moving to new cities for education.',
      content: '',
      author: {
        name: 'Anjali Reddy',
        avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg',
        role: 'Student Counselor'
      },
      category: 'Safety',
      tags: ['Safety', 'Student Life', 'Tips'],
      image: 'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg',
      publishedAt: '2024-01-10',
      readTime: 10,
      featured: true
    },
    {
      id: '4',
      title: 'Budget-Friendly Student Accommodation in Delhi',
      slug: 'budget-friendly-student-accommodation-delhi',
      excerpt: 'Discover affordable housing options in Delhi that won\'t break your student budget.',
      content: '',
      author: {
        name: 'Vikram Singh',
        avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg',
        role: 'Budget Advisor'
      },
      category: 'Budget Guide',
      tags: ['Delhi', 'Budget', 'Student Housing'],
      image: 'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg',
      publishedAt: '2024-01-08',
      readTime: 7,
      featured: false
    },
    {
      id: '5',
      title: 'How to Build Good Relationships with Roommates',
      slug: 'build-good-relationships-roommates',
      excerpt: 'Tips for creating a harmonious living environment with your roommates.',
      content: '',
      author: {
        name: 'Sneha Patel',
        avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg',
        role: 'Lifestyle Coach'
      },
      category: 'Lifestyle',
      tags: ['Roommates', 'Relationships', 'Student Life'],
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      publishedAt: '2024-01-05',
      readTime: 5,
      featured: false
    },
    {
      id: '6',
      title: 'Understanding Rental Agreements: A Student\'s Guide',
      slug: 'understanding-rental-agreements-student-guide',
      excerpt: 'Decode rental agreements and understand your rights and responsibilities as a tenant.',
      content: '',
      author: {
        name: 'Amit Kumar',
        avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg',
        role: 'Legal Advisor'
      },
      category: 'Legal Guide',
      tags: ['Legal', 'Rental Agreement', 'Rights'],
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
      publishedAt: '2024-01-03',
      readTime: 12,
      featured: true
    }
  ];

  const categories = [
    { key: 'all', label: 'All Posts', count: blogPosts.length },
    { key: 'Student Guide', label: 'Student Guide', count: blogPosts.filter(p => p.category === 'Student Guide').length },
    { key: 'Tips & Tricks', label: 'Tips & Tricks', count: blogPosts.filter(p => p.category === 'Tips & Tricks').length },
    { key: 'Safety', label: 'Safety', count: blogPosts.filter(p => p.category === 'Safety').length },
    { key: 'Budget Guide', label: 'Budget Guide', count: blogPosts.filter(p => p.category === 'Budget Guide').length },
    { key: 'Lifestyle', label: 'Lifestyle', count: blogPosts.filter(p => p.category === 'Lifestyle').length },
    { key: 'Legal Guide', label: 'Legal Guide', count: blogPosts.filter(p => p.category === 'Legal Guide').length },
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPosts = blogPosts.filter(post => post.featured);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500 rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-purple-500 rounded-full opacity-10 animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <BookOpen className="h-4 w-4" />
              <span>HomeDaze Blog</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Student Living
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400">
                Made Simple
              </span>
            </h1>
            
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Expert advice, tips, and guides to help students find the perfect accommodation and make the most of their living experience
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-4 h-6 w-6 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg border-0 rounded-2xl focus:ring-2 focus:ring-blue-500 shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Posts */}
        <section className="mb-16">
          <div className="flex items-center space-x-2 mb-8">
            <TrendingUp className="h-6 w-6 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">Featured Articles</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredPosts.slice(0, 3).map((post, index) => (
              <div key={post.id} className={`group ${index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}`}>
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full">
                  <div className="relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className={`w-full object-cover group-hover:scale-105 transition-transform duration-500 ${
                        index === 0 ? 'h-80' : 'h-48'
                      }`}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Featured
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                        <Heart className="h-4 w-4 text-gray-600" />
                      </button>
                      <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                        <Share2 className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {post.category}
                      </span>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{post.readTime} min read</span>
                      </div>
                    </div>
                    
                    <h3 className={`font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors ${
                      index === 0 ? 'text-2xl' : 'text-lg'
                    }`}>
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
                          <p className="text-xs text-gray-500">{formatDate(post.publishedAt)}</p>
                        </div>
                      </div>
                      
                      <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium">
                        <span>Read More</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
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
                  {['Student Life', 'PG', 'Safety', 'Budget', 'Tips', 'Bangalore', 'Delhi', 'Mumbai'].map((tag) => (
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
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedCategory === 'all' ? 'All Articles' : selectedCategory}
              </h2>
              <div className="text-gray-600">
                {filteredPosts.length} articles found
              </div>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {filteredPosts.map((post) => (
                <div key={post.id} className="group">
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                    <div className="relative">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                          {post.category}
                        </span>
                      </div>
                      <div className="absolute bottom-4 right-4 flex items-center space-x-1 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
                        <Eye className="h-3 w-3" />
                        <span>{Math.floor(Math.random() * 1000) + 100}</span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="flex items-center text-gray-500 text-sm">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{formatDate(post.publishedAt)}</span>
                        </div>
                        <div className="flex items-center text-gray-500 text-sm">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{post.readTime} min read</span>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <img
                            src={post.author.avatar}
                            alt={post.author.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
                            <p className="text-xs text-gray-500">{post.author.role}</p>
                          </div>
                        </div>
                        
                        <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium">
                          <span>Read More</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center space-x-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600">
                Previous
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">1</button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600">2</button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600">3</button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;