
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
              className={`py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors flex items-center space-x-2 ${currentPage === item.key ? 'text-blue-600' : ''}`}
              onClick={() => setShowServicesDropdown(!showServicesDropdown)}
            >
              <span>{item.name}</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            {showServicesDropdown && (
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                {item.dropdown.map((dropdownItem) => (
                  <a
                    key={dropdownItem.name}
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
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
            className={`py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors ${currentPage === item.key ? 'text-blue-600' : ''}`}
          >
            {item.name}
          </button>
        )
      ))}
    </div>
  );
};

export default DesktopNavItems;
