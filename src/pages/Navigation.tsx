
import React, { useState, useEffect } from 'react';
import AuthModal from './AuthModel';
import TopBar from '../components/Navigation/TopBar';
import MainNavbar from '../components/Navigation/MainNavbar';
import { Home, UserPlus, Search, MessageCircle } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: 'home' | 'properties' | 'add-property' | 'blog' | 'membership' | 'chat') => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onPageChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  const user = null;
  const chatCredits = 6;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const navItems = [
    { name: 'Home', key: 'home' as const },
    { name: 'Properties', key: 'properties' as const },
    {
      name: 'Services',
      dropdown: [
        { name: 'Find PG/Rooms', icon: Home },
        { name: 'Find Roommates', icon: UserPlus },
        { name: 'Property Verification', icon: Search },
        { name: 'Chat Support', icon: MessageCircle }
      ]
    },
    { name: 'Blog', key: 'blog' as const },
    { name: 'Membership', key: 'membership' as const },
  ];

  const handleAuthClick = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  return (
    <>
      <TopBar />

      <MainNavbar
        isScrolled={isScrolled}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        currentPage={currentPage}
        onPageChange={onPageChange}
        handleAuthClick={handleAuthClick}
        user={user}
        chatCredits={chatCredits}
        navItems={navItems}
        showServicesDropdown={showServicesDropdown}
        setShowServicesDropdown={setShowServicesDropdown}
      />

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </>
  );
};

export default Navigation;
