import React from 'react';
import { ChevronDown, Home, UserPlus, Search, MessageCircle } from 'lucide-react';

interface NavItem {
  name: string;
  key?: 'home' | 'properties' | 'add-property' | 'blog' | 'membership' | 'chat';
  dropdown?: { name: string; icon: any }[];
}

interface DesktopNavItemsProps {
  navItems: NavItem[];
  currentPage: string;
  onPageChange: (page: 'home' | 'properties' | 'add-property' | 'blog' | 'membership' | 'chat') => void;
  showServicesDropdown: boolean;
  setShowServicesDropdown: (show: boolean) => void;
}

const DesktopNavItems: React.FC<DesktopNavItemsProps> = ({
  navItems,
  currentPage,
  onPageChange,
  showServicesDropdown,
  setShowServicesDropdown,
}) => {
  const handleNavClick = (item: NavItem) => {
    if (item.key) {
      onPageChange(item.key);
    }
    // Keep dropdown open if it's a services click, otherwise close
    if (item.name !== 'Services') {
      setShowServicesDropdown(false);
    }
  };

  return (
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
            className={`flex items-center space-x-1 px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${currentPage === item.key ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30'}`}
          >
            <span>{item.name}</span>
            {item.dropdown && <ChevronDown className="h-4 w-4" />}
          </button>

          {/* Dropdown Menu */}
          {item.dropdown && (
            <div
              className={`absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 py-2 transition-all duration-200 ${
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
                // TODO: Implement actual links/actions for dropdown items
                <a
                  key={dropdownItem.name}
                  href="#"
                  className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
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
  );
};

export default DesktopNavItems;