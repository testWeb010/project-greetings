import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

// Define a type for social links
interface SocialLink {
  icon: React.ElementType;
  href: string;
  label: string;
  color: string;
}

// TODO: Social links data should be fetched from an API
const socialLinks: SocialLink[] = [
  { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:text-blue-500' },
  { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:text-blue-400' },
  { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:text-pink-500' },
  { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:text-blue-600' },
  { icon: Youtube, href: '#', label: 'YouTube', color: 'hover:text-red-500' },
];

const SocialLinks: React.FC = () => {
  return (
    <div className="mt-8">
      <p className="text-gray-300 font-medium mb-4">Follow Us:</p>
      <div className="flex space-x-4">
        {socialLinks.map((social) => (
          <a
            key={social.label}
            href={social.href}
            className={`w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-gray-300 ${social.color} transition-all duration-300 hover:scale-110 hover:bg-white/20 border border-white/10 hover:border-white/30`}
            aria-label={social.label}
          >
            <social.icon className="h-5 w-5" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialLinks;