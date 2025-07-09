
import React from 'react';

const FooterNavigation: React.FC = () => {
  const quickLinks = [
    { name: 'About Us', href: '#' },
    { name: 'Properties', href: '/properties' },
    { name: 'List Property', href: '/add-property' },
    { name: 'Blog', href: '/blog' },
    { name: 'Membership', href: '/membership' },
    { name: 'Contact', href: '#' }
  ];

  const services = [
    { name: 'Find PG/Rooms', href: '#' },
    { name: 'Find Roommates', href: '#' },
    { name: 'Property Verification', href: '#' },
    { name: 'Chat Support', href: '/chat' },
    { name: 'Virtual Tours', href: '#' }
  ];

  return (
    <>
      <div>
        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
        <ul className="space-y-2">
          {quickLinks.map((link) => (
            <li key={link.name}>
              <a 
                href={link.href} 
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Services</h3>
        <ul className="space-y-2">
          {services.map((service) => (
            <li key={service.name}>
              <a 
                href={service.href} 
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                {service.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default FooterNavigation;
