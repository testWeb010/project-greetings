import React from 'react';
import { Menu, X, Home } from 'lucide-react';
import DesktopNavItems from './DesktopNavItems';
import AuthUserSection from './AuthUserSection';
import DarkModeToggle from './DarkModeToggle';
import MobileNavMenu from './MobileNavMenu';

interface MainNavbarProps {
  isScrolled: boolean;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isDarkMode: boolean;
  setIsDarkMode: (isDarkMode: boolean) => void;
  currentPage: string;
  onPageChange: (page: 'home' | 'properties' | 'add-property' | 'blog' | 'membership' | 'chat') => void;
  handleAuthClick: (mode: 'signin' | 'signup') => void;
  user: any; // Replace 'any' with actual user type
  chatCredits: number; // Replace with actual type
  navItems: { name: string; key?: 'home' | 'properties' | 'add-property' | 'blog' | 'membership' | 'chat'; dropdown?: { name: string; icon: any }[]; }[];
  showServicesDropdown: boolean;
  setShowServicesDropdown: (show: boolean) => void;
}

const MainNavbar: React.FC<MainNavbarProps> = ({
  isScrolled,
  isOpen,
  setIsOpen,
  isDarkMode,
  setIsDarkMode,
  currentPage,
  onPageChange,
  handleAuthClick,
  user,
  chatCredits,
  navItems,
  showServicesDropdown,
  setShowServicesDropdown,
}) => {
  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled
        ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg'
        : 'bg-white dark:bg-gray-900 shadow-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => onPageChange('home')}
          >
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Home className="h-7 w-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full"></div>
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-blue-600 transition-all">
                HomeDaze
              </span>
              <div className="text-xs text-gray-500 dark:text-gray-400 -mt-1">Student Rentals</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <DesktopNavItems
            navItems={navItems}
            currentPage={currentPage}
            onPageChange={onPageChange}
            showServicesDropdown={showServicesDropdown}
            setShowServicesDropdown={setShowServicesDropdown}
          />

          {/* Desktop Auth/User Section */}
          <div className="hidden lg:flex items-center space-x-4">
             {/* Dark Mode Toggle */}
            <DarkModeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
            <AuthUserSection
               user={user}
               chatCredits={chatCredits}
               onPageChange={onPageChange}
               handleAuthClick={handleAuthClick}
            />
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
             {/* Dark Mode Toggle for Mobile */}
            <DarkModeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
            <button
              onClick={() => setIsOpen(!isOpen)}             
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <MobileNavMenu
            navItems={navItems}
            currentPage={currentPage}
            onPageChange={onPageChange}
            handleAuthClick={handleAuthClick}
            setIsOpen={setIsOpen}
          />
        )}
      </div>
    </nav>
  );
};

export default MainNavbar;