import React, { useState, useEffect } from 'react';
import { BlogPost } from '../../types'; // Correct path from src/components to src/types
import BlogHero from './BlogHero';
import FeaturedPosts from './FeaturedPosts';
import BlogSidebar from './BlogSidebar';
import ArticleGrid from './ArticleGrid';
import Pagination from './Pagination';

const BlogPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<{ key: string; label: string; count: number }[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  // Placeholder for fetching blog posts from API
  useEffect(() => {
    const fetchBlogPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        // Replace with your actual API endpoint for fetching blog posts
        // Example: const response = await fetch(`/api/blogposts?category=${selectedCategory}&search=${searchQuery}&page=${currentPage}`);
        // const data = await response.json();
        
        // Using dummy data for now
        const dummyData: BlogPost[] = [
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
        setBlogPosts(dummyData);
        
        // Placeholder for fetching categories from API
        // Example: const categoriesResponse = await fetch('/api/blogcategories');
        // const categoriesData = await categoriesResponse.json();
        
        // Using dummy categories data
        const dummyCategories = [
            { key: 'all', label: 'All Posts', count: dummyData.length },
            { key: 'Student Guide', label: 'Student Guide', count: dummyData.filter(p => p.category === 'Student Guide').length },
            { key: 'Tips & Tricks', label: 'Tips & Tricks', count: dummyData.filter(p => p.category === 'Tips & Tricks').length },
            { key: 'Safety', label: 'Safety', count: dummyData.filter(p => p.category === 'Safety').length },
            { key: 'Budget Guide', label: 'Budget Guide', count: dummyData.filter(p => p.category === 'Budget Guide').length },
            { key: 'Lifestyle', label: 'Lifestyle', count: dummyData.filter(p => p.category === 'Lifestyle').length },
            { key: 'Legal Guide', label: 'Legal Guide', count: dummyData.filter(p => p.category === 'Legal Guide').length },
          ];
        setCategories(dummyCategories);

        // Placeholder for fetching total pages from API
        // Example: setTotalPages(data.totalPages);
        setTotalPages(5); // Dummy total pages

      } catch (err) {
        setError('Failed to fetch blog posts.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, [selectedCategory, searchQuery, currentPage]); // Refetch when category, search query, or page changes

  const featuredPosts = blogPosts.filter(post => post.featured);

  const filteredAndSearchedPosts = blogPosts.filter(post => {
    const categoryMatch = selectedCategory === 'all' || post.category === selectedCategory;
    const searchMatch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  // Simple pagination logic (will be replaced by API pagination)
  const postsPerPage = 6; // Adjust as needed
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredAndSearchedPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page on category change
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-600">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <BlogHero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <FeaturedPosts featuredPosts={featuredPosts} formatDate={formatDate} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <BlogSidebar
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={handleCategorySelect}
          />

          <ArticleGrid
            posts={currentPosts}
            formatDate={formatDate}
            selectedCategory={selectedCategory} // Pass selected category for heading
          />
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />

      </div>
    </div>
  );
};

export default BlogPage;
