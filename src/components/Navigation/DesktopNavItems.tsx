
import React from 'react';

interface DesktopNavItemsProps {
  activePage: string;
  handleNavigation: (page: string) => void;
}

const DesktopNavItems: React.FC<DesktopNavItemsProps> = ({ activePage, handleNavigation }) => {
  const navItems = [
    { key: 'home', label: 'Home' },
    { key: 'properties', label: 'Properties' },
    { key: 'add-property', label: 'Add Property' },
    { key: 'membership', label: 'Membership' },
    { key: 'blog', label: 'Blog' },
    { key: 'chat', label: 'Chat' }
  ];

  return (
    <div className="hidden md:flex items-center space-x-8">
      {navItems.map((item) => (
        <button
          key={item.key}
          onClick={() => handleNavigation(item.key)}
          className={`text-sm font-medium transition-colors ${
            activePage === item.key
              ? 'text-blue-600'
              : 'text-gray-700 hover:text-blue-600'
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default DesktopNavItems;
