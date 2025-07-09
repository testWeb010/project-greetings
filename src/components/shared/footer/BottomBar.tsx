
import React from 'react';

const BottomBar: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="border-t border-gray-800 pt-6 pb-6">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="text-sm text-gray-400">
          © {currentYear} HomeDaze. All rights reserved.
        </div>
        <div className="flex space-x-6 text-sm text-gray-400">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
        </div>
      </div>
    </div>
  );
};

export default BottomBar;
