
import React from 'react';
import Header from '../shared/navigation/Header';
import Footer from '../shared/footer/Footer';

interface LayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  showHeader = true,
  showFooter = true
}) => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {showHeader && <Header />}
      <main className="flex-1">
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

export default Layout;
