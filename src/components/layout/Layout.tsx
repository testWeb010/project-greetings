
import React from 'react';
import Navigation from '../../pages/Navigation';
import Footer from '../../pages/Footer';

interface LayoutProps {
  children: React.ReactNode;
  currentPage?: string;
  showNavigation?: boolean;
  showFooter?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  currentPage = 'home',
  showNavigation = true,
  showFooter = true
}) => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {showNavigation && (
        <Navigation currentPage={currentPage} onPageChange={() => {}} />
      )}
      <main className="flex-1">
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

export default Layout;
