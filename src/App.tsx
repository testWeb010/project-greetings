import React, { useState } from 'react';
import Navigation from './pages/Navigation';
import LandingPage from './pages/LandingPage';
import AllPropertiesPage from './components/Properties/AllPropertiesPage';
import AddPropertyForm from './components/AddProperty/AddPropertyForm';
import PropertyDetailPage from './pages/PropertyDetailPage';
import BlogPage from './components/Blog/BlogPage';
import MembershipPage from './pages/MembershipPage';
import AdminPanel from './components/AdminPannel';

type Page = 'home' | 'properties' | 'add-property' | 'property-detail' | 'blog' | 'membership' | 'chat' | 'admin';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <LandingPage />;
      case 'properties':
        return <AllPropertiesPage onPropertyClick={() => setCurrentPage('property-detail')} />;
      case 'add-property':
        return <AddPropertyForm />;
      case 'property-detail':
        return <PropertyDetailPage />;
      case 'blog':
        return <BlogPage />;
      case 'membership':
        return <MembershipPage />;
      case 'admin':
        return <AdminPanel />;
      case 'chat':
        return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Chat Feature Coming Soon</h2>
            <p className="text-gray-600">We're working on bringing you the best chat experience with property owners.</p>
          </div>
        </div>;
      default:
        return <LandingPage />;
    }
  };

  // Show admin panel without navigation
  if (currentPage === 'admin') {
    return <AdminPanel />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      {renderPage()}
    </div>
  );
}

export default App;