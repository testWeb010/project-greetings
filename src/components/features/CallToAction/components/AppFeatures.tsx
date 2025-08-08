import React from 'react';
import { Zap, Shield, Clock, Heart, Sparkles, CheckCircle } from 'lucide-react'; // Import necessary icons

// Define a type for an app feature item
interface AppFeatureItem {
  icon: React.ElementType;
  title: string;
  description: string;
}

// Define a type for a badge item
interface BadgeItem {
  icon: React.ElementType;
  text: string;
}

// TODO: App features data and badges data should be fetched from an API
const appFeatures: AppFeatureItem[] = [
  { icon: Zap, title: 'Lightning Fast', description: 'Find properties in seconds' },
  { icon: Shield, title: 'Secure & Safe', description: 'Your data is protected' },
  { icon: Clock, title: '24/7 Support', description: 'Always here to help' },
  { icon: Heart, title: 'Student Friendly', description: 'Built for students' }
];

const badges: BadgeItem[] = [
  { icon: CheckCircle, text: 'ISO Certified' },
  { icon: CheckCircle, text: 'RERA Approved' },
  { icon: CheckCircle, text: 'Secure Transactions' },
  { icon: CheckCircle, text: '24/7 Support' },
];

// TODO: Section title and description could be from an API
const sectionTitle = "Download Our App for Better Experience";
const sectionDescription = "Get instant notifications, faster search, and exclusive mobile-only features";
const sectionTagline = "Mobile App Features";

const AppFeatures: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-white mb-20">
      <div className="text-center mb-12">
        <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-semibold mb-6">
          <Sparkles className="h-4 w-4" />
          <span>{sectionTagline}</span>
        </div>
        <h3 className="text-4xl font-bold mb-4">
          {sectionTitle}
        </h3>
        <p className="text-xl text-blue-100">
          {sectionDescription}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        {appFeatures.map((feature, index) => (
          <div key={index} className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <feature.icon className="h-8 w-8 text-white" />
            </div>
            <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
            <p className="text-blue-100 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-center items-center gap-6 text-white">
        {badges.map((badge, index) => (
          <div key={index} className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-xl">
            <badge.icon className="h-5 w-5 text-green-400" />
            <span className="text-sm font-medium">{badge.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppFeatures;