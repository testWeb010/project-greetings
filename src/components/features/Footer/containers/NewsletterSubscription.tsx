import React, { useState } from 'react';
import { Mail, Send } from 'lucide-react';

const NewsletterSubscription: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Replace with API call to subscribe user
    console.log('Subscribing email:', email);
    setIsSubscribed(true);
    setEmail('');
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  // TODO: Newsletter title and description could be fetched from an API
  const newsletterTitle = "Stay Updated with";
  const newsletterHighlight = "Latest Properties";
  const newsletterDescription = "Get instant notifications about new properties, exclusive deals, and student housing tips";

  return (
    <div className="border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {newsletterTitle}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              {newsletterHighlight}
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {newsletterDescription}
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubscribe} className="flex space-x-3">
            <div className="flex-1 relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-300 transition-all"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center space-x-2"
            >
              <Send className="h-5 w-5" />
              <span>Subscribe</span>
            </button>
          </form>

          {isSubscribed && (
            // TODO: Success message content could be from API response
            <div className="mt-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg text-green-300 text-center animate-fade-in">
              ✅ Successfully subscribed! Welcome to HomeDaze family.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsletterSubscription;