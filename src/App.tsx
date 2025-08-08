import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './pages/Navigation';
import LandingPage from './pages/LandingPage';
import AllPropertiesPage from './components/features/Properties/containers/AllPropertiesPage';
import AddPropertyForm from './components/features/AddProperty/containers/AddPropertyForm';
import PropertyDetailPage from './pages/PropertyDetailPage';
import BlogPage from './components/features/Blog/containers/BlogPage';
import MembershipPage from './pages/MembershipPage';
import AdminPanel from './components/features/AdminPannel/components';
import CheckoutPage from './pages/Checkoutpage';

type Page = 'home' | 'properties' | 'add-property' | 'property-detail' | 'blog' | 'membership' | 'chat' | 'admin' | 'checkout';

function NavigationWrapper({ onPageChange }: { onPageChange: (page: Page) => void }) {
  const location = useLocation();
  useEffect(() => {
    const path = location.pathname.split('/')[1] || '';
    const pageMap: Record<string, Page> = {
      '': 'home',
      'properties': 'properties',
      'add-property': 'add-property',
      'property-detail': 'property-detail',
      'blog': 'blog',
      'membership': 'membership',
      'chat': 'chat',
      'admin': 'admin',
      'checkout': 'checkout'
    };
    onPageChange(pageMap[path] || 'home');
  }, [location, onPageChange]);
  return null;
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const location = useLocation();
  const showNavigation = location.pathname !== '/checkout';

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <NavigationWrapper onPageChange={setCurrentPage} />
      {showNavigation && <Navigation currentPage={currentPage} />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/properties" element={<AllPropertiesPage onPropertyClick={() => setCurrentPage('property-detail')} />} />
        <Route path="/add-property" element={<AddPropertyForm />} />
        <Route path="/property-detail" element={<PropertyDetailPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/membership" element={<MembershipPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/chat" element={
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Chat Feature Coming Soon</h2>
              <p className="text-gray-600">We're working on bringing you the best chat experience with property owners.</p>
            </div>
          </div>
        } />
      </Routes>
    </div>
  );
}

export default App;
