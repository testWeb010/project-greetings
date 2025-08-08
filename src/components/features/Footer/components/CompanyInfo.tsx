import React from 'react';
import { Home, Mail, Phone, MapPin } from 'lucide-react';
import SocialLinks from './SocialLinks';

// Define a type for contact info
interface ContactInfo {
  icon: React.ElementType;
  text: string;
  detail: string;
  gradient: string;
}

// TODO: Company info (name, description) and contact details could be fetched from an API
const companyName = "HomeDaze";
const companyTagline = "Student Rentals";
const companyDescription = "India's most trusted student rental platform connecting students with verified property owners. Find your perfect home with zero brokerage and direct communication.";

const contactDetails: ContactInfo[] = [
  { icon: Phone, text: '+91 98765 43210', detail: '24/7 Student Support', gradient: 'from-green-500 to-emerald-500' },
  { icon: Mail, text: 'support@homedaze.com', detail: 'Quick Response Guaranteed', gradient: 'from-blue-500 to-cyan-500' },
  { icon: MapPin, text: 'Mumbai, Delhi, Bangalore', detail: '500+ Cities Covered', gradient: 'from-purple-500 to-pink-500' },
];

const CompanyInfo: React.FC = () => {
  return (
    <div className="lg:col-span-2">
      <div className="flex items-center space-x-3 mb-6">
        <div className="relative">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
            <Home className="h-7 w-7 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full"></div>
        </div>
        <div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {companyName}
          </span>
          <div className="text-xs text-gray-400 -mt-1">{companyTagline}</div>
        </div>
      </div>

      <p className="text-gray-300 mb-6 leading-relaxed">
        {companyDescription}
      </p>

      <div className="space-y-4">
        {contactDetails.map((item, index) => (
          <div key={index} className="flex items-center space-x-3 group cursor-pointer">
            <div className={`w-10 h-10 bg-gradient-to-r ${item.gradient} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
              <item.icon className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-white font-medium">{item.text}</p>
              <p className="text-gray-400 text-sm">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Social Links */}
      <SocialLinks />
    </div>
  );
};

export default CompanyInfo;