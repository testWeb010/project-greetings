import React from 'react';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import Navigation from '../../pages/Navigation';
import Footer from '../../pages/Footer';

const PublicLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine the current page based on the location pathname
  const currentPage = (() => {
    if (location.pathname === '/') return 'home';
    if (location.pathname.startsWith('/properties')) return 'properties';
    if (location.pathname === '/add-property') return 'add-property';
    if (location.pathname.startsWith('/blog')) return 'blog';
    if (location.pathname.startsWith('/membership')) return 'membership';
    if (location.pathname.startsWith('/chat')) return 'chat';
    // Add more mappings if needed for other routes
    return ''; // Default or fallback value
  })();

  // Handle page changes by navigating to the corresponding route
  const handlePageChange = (page: 'home' | 'properties' | 'add-property' | 'blog' | 'membership' | 'chat') => {
    switch (page) {
      case 'home':
        navigate('/');
        break;
      case 'properties':
        navigate('/properties');
        break;
      case 'add-property':
        navigate('/add-property');
        break;
      case 'blog':
        navigate('/blog');
        break;
      case 'membership':
        navigate('/membership');
        break;
      case 'chat':
        navigate('/chat');
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Navigation currentPage={currentPage} />
      <Outlet /> {/* This is where the nested routes will be rendered */}
      <Footer />
    </>
  );
};

export default PublicLayout;
