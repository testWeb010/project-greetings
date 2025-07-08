import React, { useState, useEffect } from 'react';
import AuthModal from './AuthModel';
import TopBar from '../components/Navigation/TopBar';
import MainNavbar from '../components/Navigation/MainNavbar';
import { Home, UserPlus, Search, MessageCircle } from 'lucide-react'; // Import icons used in navItems

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: 'home' | 'properties' | 'add-property' | 'blog' | 'membership' | 'chat') => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onPageChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // Consider managing dark mode globally
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup' | 'forgot'>('signin');

  // TODO: Fetch user data and chat credits from your authentication context or an API endpoint
  // Example: const { user, chatCredits } = useAuth();
  const user = null; // Placeholder: Set to actual user object when logged in, null when logged out
  const chatCredits = 6; // Placeholder: Fetch dynamically

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

  // Define navigation items - TODO: Consider fetching these dynamically from an API if they change frequently
  const navItems = [
    { name: 'Home', key: 'home' as const },
    { name: 'Properties', key: 'properties' as const },
    {
      name: 'Services',
      dropdown: [
        { name: 'Find PG/Rooms', icon: Home }, // Use imported icons
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
      <TopBar /> {/* Use the new TopBar component */}

      <MainNavbar
        isScrolled={isScrolled}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isDarkMode={isDarkMode} // Pass dark mode state and handler
        setIsDarkMode={setIsDarkMode}
        currentPage={currentPage}
        onPageChange={onPageChange}
        handleAuthClick={handleAuthClick} // Pass auth handler
        user={user} // Pass user data
        chatCredits={chatCredits} // Pass chat credits
        navItems={navItems} // Pass navigation items
        showServicesDropdown={showServicesDropdown} // Pass dropdown state and handler
        setShowServicesDropdown={setShowServicesDropdown}
      /> {/* Use the new MainNavbar component */}

      {/* Auth Modal */}
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