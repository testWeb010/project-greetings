import React from 'react';
import { MessageCircle, Heart, ChevronUp } from 'lucide-react';

// Define a type for policy links
interface PolicyLink {
  name: string;
  href: string;
}

// TODO: Copyright text and policy links could be fetched from an API
const copyrightText = "© 2024 HomeDaze. All rights reserved.";
const policyLinks: PolicyLink[] = [
  { name: 'Privacy Policy', href: '#' },
  { name: 'Terms of Service', href: '#' },
  { name: 'Cookie Policy', href: '#' },
];

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const BottomBar: React.FC = () => {
  return (
    <div className="border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <p className="text-gray-300 text-sm">
              {copyrightText}
            </p>
            <div className="flex items-center space-x-6 text-sm">
              {policyLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-gray-300 hover:text-white transition-colors">
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* TODO: "Made with" message could be dynamic or from API */}
            <div className="flex items-center space-x-2 text-gray-300">
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm">Made with</span>
              <Heart className="h-4 w-4 text-red-500 animate-pulse" />
              <span className="text-sm">for Students</span>
            </div>

            <button
              onClick={scrollToTop}
              className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              aria-label="Scroll to top"
            >
              <ChevronUp className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomBar;