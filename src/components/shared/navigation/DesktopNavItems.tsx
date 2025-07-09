
import React from 'react';
import { ChevronDown } from 'lucide-react';

interface NavItem {
  name: string;
  key?: 'home' | 'properties' | 'add-property' | 'membership' | 'blog' | 'chat';
  dropdown?: { name: string; icon: any }[];
}

interface DesktopNavItemsProps {
  navItems: NavItem[];
  currentPage: string;
  onPageChange: (page: 'home' | 'properties' | 'add-property' | 'membership' | 'blog' | 'chat') => void;
  showServicesDropdown: boolean;
  setShowServicesDropdown: (show: boolean) => void;
}

const DesktopNavItems: React.FC<DesktopNavItemsProps> = ({ 
  navItems, 
  currentPage, 
  onPageChange, 
  showServicesDropdown, 
  setShowServicesDropdown 
}) => {
  return (
    <div className="hidden lg:flex items-center space-x-6">
      {navItems.map((item) => (
        item.dropdown ? (
          <div key={item.name} className="relative group">
            <button 
              className={`py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors flex items-center space-x-2 ${currentPage === item.key ? 'text-blue-600 dark:text-blue-400' : ''}`}
              onClick={() => setShowServicesDropdown(!showServicesDropdown)}
            >
              <span>{item.name}</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            {showServicesDropdown && (
              <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-700">
                {item.dropdown.map((dropdownItem) => (
                  <a
                    key={dropdownItem.name}
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    {dropdownItem.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        ) : (
          <button
            key={item.name}
            onClick={() => {
              if (item.key) {
                onPageChange(item.key);
              }
            }}
            className={`py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors ${currentPage === item.key ? 'text-blue-600 dark:text-blue-400' : ''}`}
          >
            {item.name}
          </button>
        )
      ))}
    </div>
  );
};

export default DesktopNavItems;
