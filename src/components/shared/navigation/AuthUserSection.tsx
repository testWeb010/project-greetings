
import React from 'react';
import { LogIn, UserPlus, MessageCircle, Heart, User, ChevronDown } from 'lucide-react';

interface AuthUserSectionProps {
  user: any;
  chatCredits: number;
  onPageChange: (page: 'home' | 'properties' | 'add-property' | 'blog' | 'membership' | 'chat') => void;
  handleAuthClick: (mode: 'signin' | 'signup') => void;
}

const AuthUserSection: React.FC<AuthUserSectionProps> = ({
  user,
  chatCredits,
  onPageChange,
  handleAuthClick,
}) => {
  return (
    <div className="flex items-center space-x-4">
      {user ? (
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-2 rounded-lg border border-green-200 dark:border-green-700">
            <MessageCircle className="h-4 w-4" />
            <span className="text-sm font-medium">{chatCredits} chats left</span>
          </div>

          <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors">
            <Heart className="h-5 w-5" />
          </button>

          <button
            onClick={() => onPageChange('chat')}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors relative"
          >
            <MessageCircle className="h-5 w-5" />
          </button>

          <div className="flex items-center space-x-2 cursor-pointer group">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
          </div>
        </div>
      ) : (
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 text-green-700 dark:text-green-400 px-3 py-2 rounded-lg border border-green-200 dark:border-green-700">
            <MessageCircle className="h-4 w-4" />
            <span className="text-sm font-medium">6 Free Chats</span>
          </div>

          <button
            onClick={() => onPageChange('add-property')}
            className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 min-w-[140px] justify-center"
          >
            <span>+ List Property</span>
          </button>

          <button
            onClick={() => handleAuthClick('signin')}
            className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-4 py-2 text-sm font-medium transition-colors duration-200 border border-gray-300 dark:border-gray-600 rounded-xl hover:border-blue-300 dark:hover:border-blue-500 min-w-[100px] justify-center"
          >
            <LogIn className="h-4 w-4" />
            <span>Sign In</span>
          </button>

          <button
            onClick={() => handleAuthClick('signup')}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 min-w-[110px] justify-center"
          >
            <UserPlus className="h-4 w-4" />
            <span>Sign Up</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default AuthUserSection;
