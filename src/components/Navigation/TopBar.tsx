import React from 'react';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const TopBar: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-900 to-purple-900 dark:from-gray-900 dark:to-gray-800 text-white py-2 hidden md:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            {/* TODO: Replace static data with data from an API endpoint if available */}
            <div className="flex items-center space-x-2 hover:text-blue-300 transition-colors cursor-pointer">
              <Phone className="h-4 w-4" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center space-x-2 hover:text-blue-300 transition-colors cursor-pointer">
              <Mail className="h-4 w-4" />
              <span>support@homedaze.com</span>
            </div>
            <div className="flex items-center space-x-2 hover:text-blue-300 transition-colors cursor-pointer">
              <MapPin className="h-4 w-4" />
              <span>Serving 500+ Cities across India</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span>Follow us:</span>
            {/* TODO: Fetch social media links from an API endpoint if available */}
            <div className="flex space-x-3">
              <a href="#" className="hover:text-blue-300 transition-all duration-300 transform hover:scale-110">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="hover:text-blue-300 transition-all duration-300 transform hover:scale-110">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="hover:text-blue-300 transition-all duration-300 transform hover:scale-110">
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;