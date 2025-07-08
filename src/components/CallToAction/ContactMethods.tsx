import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react'; // Import necessary icons

// Define a type for a contact method item
interface ContactMethodItem {
  icon: React.ElementType;
  title: string;
  description: string;
  action: string;
  color: string;
  bgColor: string;
}

// TODO: Contact methods data should be fetched from an API
const contactMethods: ContactMethodItem[] = [
  {
    icon: Phone,
    title: 'Call Us',
    description: '+91 98765 43210',
    action: 'Call Now',
    color: 'from-emerald-500 to-green-600',
    bgColor: 'from-emerald-50 to-green-50'
  },
  {
    icon: Mail,
    title: 'Email Us',
    description: 'support@homedaze.com',
    action: 'Send Email',
    color: 'from-blue-500 to-cyan-600',
    bgColor: 'from-blue-50 to-cyan-50'
  }, {
    icon: MapPin,
    title: 'Visit Us',
    description: 'Mumbai, Delhi, Bangalore',
    action: 'Find Office',
    color: 'from-purple-500 to-pink-600',
    bgColor: 'from-purple-50 to-pink-50'
  }
];

// TODO: Section title and description could be from an API
const sectionTitle = "Need Help? We're Here for You";
const sectionDescription = "Get in touch with our property experts for personalized assistance";

const ContactMethods: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl p-12 border border-gray-100 shadow-xl mb-20">
      <div className="text-center mb-12">
        <h3 className="text-4xl font-bold text-gray-900 mb-4">
          {sectionTitle}
        </h3>
        <p className="text-xl text-gray-600">
          {sectionDescription}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {contactMethods.map((method, index) => (
          <div key={index} className="group">
            <div className={`bg-gradient-to-br ${method.bgColor} rounded-2xl p-8 border border-white/50 hover:shadow-lg transition-all duration-300 text-center`}>
              <div className={`mx-auto w-16 h-16 bg-gradient-to-r ${method.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                <method.icon className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">{method.title}</h4>
              <p className="text-gray-600 mb-4">{method.description}</p>
              <button className={`bg-gradient-to-r ${method.color} text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all font-semibold transform hover:scale-105`}>
                {method.action}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactMethods;