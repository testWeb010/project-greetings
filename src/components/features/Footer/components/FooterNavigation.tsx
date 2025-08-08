import React from 'react';
import { ArrowRight } from 'lucide-react';

// Define a type for a footer link
interface FooterLink {
  name: string;
  href: string;
}

// Define a type for the footer links structure
interface FooterLinksData {
  [category: string]: FooterLink[];
}

// TODO: Footer links data should be fetched from an API
const footerLinks: FooterLinksData = {
  'For Students': [
    { name: 'Find PG/Rooms', href: '#' },
    { name: 'Find Roommates', href: '#' },
    { name: 'Student Resources', href: '#' },
    { name: 'Safety Guide', href: '#' },
    { name: 'Budget Calculator', href: '#' }
  ],
  'For Property Owners': [
    { name: 'List Your Property', href: '#' },
    { name: 'Owner Dashboard', href: '#' },
    { name: 'Pricing Plans', href: '#' },
    { name: 'Property Management', href: '#' },
    { name: 'Owner Support', href: '#' }
  ],
  'Company': [
    { name: 'About HomeDaze', href: '#' },
    { name: 'How It Works', href: '#' },
    { name: 'Success Stories', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Press & Media', href: '#' }
  ],
  'Support': [
    { name: 'Help Center', href: '#' },
    { name: 'Contact Us', href: '#' },
    { name: 'Live Chat', href: '#' },
    { name: 'Report Issue', href: '#' },
    { name: 'Community Forum', href: '#' }
  ]
};

const FooterNavigation: React.FC = () => {
  return (
    <>
      {Object.entries(footerLinks).map(([category, links]) => (
        <div key={category}>
          <h3 className="text-lg font-bold mb-6 text-white">{category}</h3>
          <ul className="space-y-3">
            {links.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="text-gray-300 hover:text-white transition-all duration-200 flex items-center space-x-2 group"
                >
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
                  <span>{link.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};

export default FooterNavigation;