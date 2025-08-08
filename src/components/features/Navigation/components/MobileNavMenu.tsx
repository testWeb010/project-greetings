import React from 'react';
import { MessageCircle, LogIn, UserPlus } from 'lucide-react';

interface NavItem {
  name: string;
  key?: 'home' | 'properties' | 'add-property' | 'blog' | 'membership' | 'chat';
  dropdown?: { name: string; icon: any }[];
}

interface MobileNavMenuProps {
  navItems: NavItem[];
  currentPage: string;
  onPageChange: (page: 'home' | 'properties' | 'add-property' | 'blog' | 'membership' | 'chat') => void;
  handleAuthClick: (mode: 'signin' | 'signup') => void;
  setIsOpen: (isOpen: boolean) => void; // To close the menu after a click
}

const MobileNavMenu: React.FC<MobileNavMenuProps> = ({
  navItems,
  currentPage,
  onPageChange,
  handleAuthClick,
  setIsOpen,
}) => {

  const handleNavClick = (item: NavItem) => {
    if (item.key) {
      onPageChange(item.key);
    }
    setIsOpen(false); // Close menu on item click
  };

  return (
    <div className="lg:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <div className="px-4 pt-2 pb-3 space-y-1">
        {navItems.map((item) => (
          <div key={item.name}>
            <button
              onClick={() => handleNavClick(item)}
              className={`block w-full text-left px-4 py-3 h-12 rounded-md text-sm font-medium transition-colors duration-200 ${currentPage === item.key ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30' : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
            >
              {item.name}
            </button>
            {item.dropdown && (
              <div className="ml-4 space-y-1">
                {item.dropdown.map((dropdownItem) => (
                  // TODO: Implement actual links/actions for mobile dropdown items
                  <a
                    key={dropdownItem.name}
                    href="#"
                    className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-md transition-colors"
                  >
                    <dropdownItem.icon className="h-4 w-4" />
                    <span>{dropdownItem.name}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}

        <div className="pt-4 space-y-2 border-t border-gray-200 dark:border-gray-700 mt-4">
          {/* Free Chat Credits Badge - TODO: Fetch from API/user data */}
          <div className="flex items-center justify-center space-x-2 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 text-green-700 dark:text-green-400 px-4 py-3 h-12 rounded-lg border border-green-200 dark:border-green-700 mx-4">
            <MessageCircle className="h-5 w-5" />
            <span className="text-xs font-medium">6 Free Chats Available</span>
          </div>

          {/* List Property Button */}
          <button
            onClick={() => {
              onPageChange('add-property');
              setIsOpen(false);
            }}
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 h-12 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 text-sm font-semibold mx-4"
          >
            <span>+ List Property</span>
          </button>

          {/* Auth Buttons */}
          <button
            onClick={() => {
              handleAuthClick('signin');
              setIsOpen(false);
            }}
            className="w-full flex items-center justify-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-4 py-3 h-12 text-sm font-medium transition-colors duration-200 border border-gray-300 dark:border-gray-600 rounded-xl mx-4"
          >
            <LogIn className="h-4 w-4" />
            <span>Sign In</span>
          </button>

          <button
            onClick={() => {
              handleAuthClick('signup');
              setIsOpen(false);
            }}
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 h-12 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 text-sm font-semibold mx-4"
          >
            <UserPlus className="h-4 w-4" />
            <span>Sign Up</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileNavMenu;