import React, { useState } from 'react';
import Navigation from './components/Navigation';
import LandingPage from './components/LandingPage';
import AllPropertiesPage from './components/AllPropertiesPage';
import AddPropertyForm from './components/AddPropertyForm';
import PropertyDetailPage from './components/PropertyDetailPage';
import BlogPage from './components/BlogPage';
import MembershipPage from './components/MembershipPage';

type Page = 'home' | 'properties' | 'add-property' | 'property-detail' | 'blog' | 'membership' | 'chat';

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

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      {renderPage()}
    </div>
  );
}

export default App;