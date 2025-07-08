import React from 'react';
import { Building, User, PlusCircle, BookOpen } from 'lucide-react';

interface DesktopNavItemsProps {
  onPageChange: (page: string) => void;
  currentPage: string;
}

const DesktopNavItems: React.FC<DesktopNavItemsProps> = ({ onPageChange, currentPage }) => {
  const navItems = [
    {
      name: 'Home',
      page: 'home',
      icon: Building,
    },
    {
      name: 'Properties',
      page: 'properties',
      icon: BookOpen,
    },
    {
      name: 'Add Property',
      page: 'add-property',
      icon: PlusCircle,
    },
    {
      name: 'Membership',
      page: 'membership',
      icon: User,
    },
    {
      name: 'Blog',
      page: 'blog',
      icon: BookOpen,
    },
  ];

  return (
    <div className="hidden lg:flex items-center space-x-6">
      {navItems.map((item) => (
        <button
          key={item.name}
          onClick={() => onPageChange(item.page)}
          className={`text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 ${
            currentPage === item.page ? 'text-blue-600 dark:text-blue-400 font-semibold' : ''
          }`}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};

export default DesktopNavItems;
