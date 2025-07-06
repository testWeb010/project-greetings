import React, { useState, useEffect } from 'react';
import { Menu, X, Home, LogIn, UserPlus, MessageCircle, Phone, Mail, MapPin, ChevronDown, Crown, Search, Heart, User } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: 'home' | 'properties' | 'add-property' | 'blog' | 'membership' | 'chat') => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onPageChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.key) {
      onPageChange(item.key);
    }
    setIsOpen(false);
    setShowServicesDropdown(false);
  };

  // Mock user data - in real app this would come from auth context
  const user = null; // Set to null for logged out state
  const chatCredits = 6; // Free chat credits

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>support@homedaze.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Serving 500+ Cities across India</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span>Follow us:</span>
              <div className="flex space-x-2">
                <a href="#" className="hover:text-blue-300 transition-colors">Facebook</a>
                <a href="#" className="hover:text-blue-300 transition-colors">Twitter</a>
                <a href="#" className="hover:text-blue-300 transition-colors">Instagram</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-white shadow-md'
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
                <div className="text-xs text-gray-500 -mt-1">Student Rentals</div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <div key={item.name} className="relative group">
                  <button
                    onClick={() => handleNavClick(item)}
                    onMouseEnter={() => {
                      if (item.name === 'Services') setShowServicesDropdown(true);
                    }}
                    onMouseLeave={() => {
                      if (item.name === 'Services') setShowServicesDropdown(false);
                    }}
                    className={`flex items-center space-x-1 px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${
                      currentPage === item.key
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    <span>{item.name}</span>
                    {item.dropdown && <ChevronDown className="h-4 w-4" />}
                  </button>

                  {/* Dropdown Menu */}
                  {item.dropdown && (
                    <div 
                      className={`absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 transition-all duration-200 ${
                        item.name === 'Services' && showServicesDropdown
                          ? 'opacity-100 visible transform translate-y-0'
                          : 'opacity-0 invisible transform -translate-y-2'
                      }`}
                      onMouseEnter={() => {
                        if (item.name === 'Services') setShowServicesDropdown(true);
                      }}
                      onMouseLeave={() => {
                        if (item.name === 'Services') setShowServicesDropdown(false);
                      }}
                    >
                      {item.dropdown.map((dropdownItem) => (
                        <a
                          key={dropdownItem.name}
                          href="#"
                          className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          <dropdownItem.icon className="h-5 w-5" />
                          <span>{dropdownItem.name}</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop Auth/User Section */}
            <div className="hidden lg:flex items-center space-x-4">
              {user ? (
                // Logged in user
                <div className="flex items-center space-x-4">
                  {/* Chat Credits */}
                  <div className="flex items-center space-x-2 bg-green-50 text-green-700 px-3 py-2 rounded-lg border border-green-200">
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">{chatCredits} chats left</span>
                  </div>

                  {/* Favorites */}
                  <button className="p-2 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <Heart className="h-5 w-5" />
                  </button>

                  {/* Messages */}
                  <button 
                    onClick={() => onPageChange('chat')}
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors relative"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                  </button>

                  {/* User Menu */}
                  <div className="flex items-center space-x-2 cursor-pointer group">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-600 group-hover:text-blue-600" />
                  </div>
                </div>
              ) : (
                // Logged out state
                <div className="flex items-center space-x-4">
                  {/* Free Chat Credits Badge */}
                  <div className="flex items-center space-x-2 bg-gradient-to-r from-green-50 to-blue-50 text-green-700 px-3 py-2 rounded-lg border border-green-200">
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">6 Free Chats</span>
                  </div>

                  <button 
                    onClick={() => onPageChange('add-property')}
                    className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <span>+ List Property</span>
                  </button>
                  
                  <button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 px-4 py-2 text-sm font-medium transition-colors duration-200 border border-gray-300 rounded-xl hover:border-blue-300">
                    <LogIn className="h-4 w-4" />
                    <span>Sign In</span>
                  </button>
                  
                  <button className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                    <UserPlus className="h-4 w-4" />
                    <span>Sign Up</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 hover:text-blue-600 p-2 rounded-lg hover:bg-blue-50 transition-colors"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="lg:hidden border-t border-gray-200 bg-white">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                  <div key={item.name}>
                    <button
                      onClick={() => handleNavClick(item)}
                      className={`block w-full text-left px-3 py-3 rounded-md text-base font-medium transition-colors duration-200 ${
                        currentPage === item.key
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                      }`}
                    >
                      {item.name}
                    </button>
                    {item.dropdown && (
                      <div className="ml-4 space-y-1">
                        {item.dropdown.map((dropdownItem) => (
                          <a
                            key={dropdownItem.name}
                            href="#"
                            className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                          >
                            <dropdownItem.icon className="h-4 w-4" />
                            <span>{dropdownItem.name}</span>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                <div className="pt-4 space-y-3 border-t border-gray-200 mt-4">
                  {/* Free Chat Credits */}
                  <div className="flex items-center justify-center space-x-2 bg-gradient-to-r from-green-50 to-blue-50 text-green-700 px-4 py-3 rounded-lg border border-green-200 mx-3">
                    <MessageCircle className="h-5 w-5" />
                    <span className="font-medium">6 Free Chats Available</span>
                  </div>

                  <button 
                    onClick={() => {
                      onPageChange('add-property');
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-3 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 font-semibold mx-3"
                  >
                    <span>+ List Property</span>
                  </button>
                  
                  <button className="w-full flex items-center justify-center space-x-2 text-gray-700 hover:text-blue-600 px-3 py-3 text-base font-medium transition-colors duration-200 border border-gray-300 rounded-xl mx-3">
                    <LogIn className="h-4 w-4" />
                    <span>Sign In</span>
                  </button>
                  
                  <button className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold mx-3">
                    <UserPlus className="h-4 w-4" />
                    <span>Sign Up</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navigation;