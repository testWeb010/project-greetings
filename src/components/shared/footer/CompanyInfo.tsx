
import React from 'react';
import { Home, Mail, Phone, MapPin } from 'lucide-react';

const CompanyInfo: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
          <Home className="h-6 w-6 text-white" />
        </div>
        <div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            HomeDaze
          </span>
          <div className="text-xs text-gray-400">Student Rentals</div>
        </div>
      </div>
      
      <p className="text-gray-400 text-sm leading-relaxed">
        India's most trusted student rental platform connecting students with verified property owners for hassle-free accommodation.
      </p>
      
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-gray-400 text-sm">
          <Mail className="h-4 w-4" />
          <span>support@homedaze.com</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-400 text-sm">
          <Phone className="h-4 w-4" />
          <span>+91-XXXXXXXXXX</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-400 text-sm">
          <MapPin className="h-4 w-4" />
          <span>Pan India Service</span>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;
