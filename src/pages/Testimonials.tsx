import React, { useState, useEffect } from 'react';
import { Testimonial } from '../types'; // Keep the type import
import { Users, Building, MapPin, Star, Calendar, Award, Shield, CheckCircle, MessageCircle, Heart } from 'lucide-react'; // Import icons used in this file

// Import all the new components
import TestimonialHeader from '../components/Testimonials/TestimonialHeader';
import TestimonialFilters from '../components/Testimonials/TestimonialFilters';
import TestimonialCarousel from '../components/Testimonials/TestimonialCarousel';
import SuccessMetrics from '../components/Testimonials/SuccessMetrics';
import AchievementStats from '../components/Testimonials/AchievementStats';
import VideoTestimonials from '../components/Testimonials/VideoTestimonials';
import TrustIndicators from '../components/Testimonials/TrustIndicators';
import TestimonialsCTA from '../components/Testimonials/TestimonialsCTA';

// Define types for other data structures used in this component
interface Achievement {
  number: string;
  label: string;
  icon: React.ElementType; // Use React.ElementType for icon component
  color: string;
  bgColor: string;
}

interface SuccessMetric {
  metric: string;
  label: string;
  icon: React.ElementType; // Use React.ElementType for icon component
}

interface VideoTestimonial {
  id: number;
  title: string;
  student: string;
  image: string;
}

interface TrustIndicator {
  icon: React.ElementType; // Use React.ElementType for icon component
  title: string;
  description: string;
}

const Testimonials: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [activeCategory, setActiveCategory] = useState('all');
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  // --- Data Fetching ---
  // TODO: Replace with API call to fetch testimonials on component mount
  useEffect(() => {
    // Example API call placeholder:
    // fetch('/api/testimonials')
    //   .then(response => response.json())
    //   .then(data => setTestimonials(data))
    //   .catch(error => console.error('Error fetching testimonials:', error));

    // Using static data for now
    const staticTestimonials: Testimonial[] = [
      {
        id: '1',
        name: 'Priya Sharma',
        role: 'Computer Science Student',
        content: 'HomeDaze completely transformed my accommodation search! The direct chat feature helped me connect with the owner instantly, and I found my perfect PG in Bangalore within just 2 days. The verification process gave me complete confidence in my choice.',
        rating: 5,
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
        propertyType: 'Girls PG',
        location: 'Koramangala, Bangalore'
      },
      {
        id: '2',
        name: 'Rajesh Kumar',
        role: 'MBA Student',
        content: 'As a student on a tight budget, I was worried about finding good accommodation. HomeDaze not only helped me find an affordable shared room but also connected me with amazing roommates who became lifelong friends. The platform is truly a game-changer!',
        rating: 5,
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
        propertyType: 'Shared Room',
        location: 'Hauz Khas, Delhi'
      },
      {
        id: '3',
        name: 'Sneha Patel',
        role: 'Engineering Student',
        content: 'The safety features and verified properties on HomeDaze gave my parents complete peace of mind. I found a secure PG near my college with all modern amenities. The 24/7 chat support was incredibly helpful throughout my entire journey.',
        rating: 5,
        avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg',
        propertyType: 'Co-ed PG',
        location: 'Andheri, Mumbai'
      },
      {
        id: '4',
        name: 'Amit Singh',
        role: 'Medical Student',
        content: 'Being new to the city, I was nervous about finding accommodation. HomeDaze\'s verified listings and direct owner contact made everything transparent and trustworthy. Found my single room near the hospital within a week!',
        rating: 5,
        avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg',
        propertyType: 'Single Room',
        location: 'Sector 62, Noida'
      },
      {
        id: '5',
        name: 'Kavya Reddy',
        role: 'Design Student',
        content: 'The free chat credits were a lifesaver! I could talk to multiple property owners before making my decision. The platform is so student-friendly, and the membership plans are very affordable for our budgets.',
        rating: 5,
        avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg',
        propertyType: 'Studio Apartment',
        location: 'Whitefield, Bangalore'
      },
      {
        id: '6',
        name: 'Arjun Mehta',
        role: 'Law Student',
        content: 'HomeDaze made my transition to a new city seamless. The detailed property descriptions and honest reviews helped me make an informed decision. The zero brokerage policy saved me thousands of rupees!',
        rating: 5,
        avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg',
        propertyType: 'Co-living',
        location: 'Powai, Mumbai'
      },
    ];
    setTestimonials(staticTestimonials);
  }, []); // Empty dependency array means this runs once on mount

  // TODO: Replace with API call to fetch achievement stats
  const achievements: Achievement[] = [
    { number: '50L+', label: 'Happy Students', icon: Users, color: 'from-blue-500 to-cyan-500', bgColor: 'from-blue-50 to-cyan-50' },
    { number: '10L+', label: 'Properties Listed', icon: Building, color: 'from-emerald-500 to-green-500', bgColor: 'from-emerald-50 to-green-50' },
    { number: '500+', label: 'Cities Covered', icon: MapPin, color: 'from-purple-500 to-pink-500', bgColor: 'from-purple-50 to-pink-50' },
    { number: '99%', label: 'Satisfaction Rate', icon: Star, color: 'from-orange-500 to-red-500', bgColor: 'from-orange-50 to-red-50' },
  ];

  // TODO: Replace with API call to fetch success metrics
  const successMetrics: SuccessMetric[] = [
    { metric: '2.5 Days', label: 'Average Time to Find Home', icon: Calendar },
    { metric: '₹15,000', label: 'Average Savings on Brokerage', icon: Award },
    { metric: '4.8/5', label: 'Average Property Rating', icon: Star },
    { metric: '24/7', label: 'Customer Support', icon: Shield }
  ];

  // TODO: Replace with API call to fetch video testimonials
  const videos: VideoTestimonial[] = [
    { id: 1, title: 'From Search to Home in 48 Hours', student: 'Priya\'s Journey', image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg' },
    { id: 2, title: 'Finding the Perfect Roommate', student: 'Rajesh\'s Story', image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg' },
    { id: 3, title: 'Safe & Secure Student Living', student: 'Sneha\'s Experience', image: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg' }
  ];

  // TODO: Replace with API call to fetch trust indicators if dynamic
   const trustIndicators: TrustIndicator[] = [
    { icon: CheckCircle, title: '100% Verified Properties', description: 'Every property and owner is thoroughly verified by our expert team for complete safety and authenticity' },
    { icon: MessageCircle, title: 'Direct Owner Chat', description: 'Chat directly with property owners instantly without any middleman or hidden charges' },
    { icon: Heart, title: 'Student-First Approach', description: 'Designed with students\' budgets, needs, and safety as our top priority' },
  ];
  // --- End Data Fetching ---

  // Derived state (can remain here or be moved to a custom hook if complex)
  const categories = [
    { key: 'all', label: 'All Stories', count: testimonials.length },
    { key: 'PG', label: 'PG Stories', count: testimonials.filter(t => t.propertyType.includes('PG')).length },
    { key: 'Shared', label: 'Shared Room', count: testimonials.filter(t => t.propertyType.includes('Shared')).length },
    { key: 'Single', label: 'Single Room', count: testimonials.filter(t => t.propertyType.includes('Single')).length },
  ];

  const filteredTestimonials = activeCategory === 'all'
    ? testimonials
    : testimonials.filter(t => t.propertyType.toLowerCase().includes(activeCategory.toLowerCase()));

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % filteredTestimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length);
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentTestimonial(0); // Reset to the first testimonial when category changes
  };

   const handleIndicatorClick = (index: number) => {
    setCurrentTestimonial(index);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Modern Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-[10%] w-80 h-80 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-[15%] w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-[20%] w-64 h-64 bg-gradient-to-br from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <TestimonialHeader />

        {/* Category Filters */}
        <TestimonialFilters
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={handleCategoryChange} // Pass the handler
        />

        {/* Main Testimonial Showcase */}
        {filteredTestimonials.length > 0 && (
          <TestimonialCarousel
            filteredTestimonials={filteredTestimonials}
            currentTestimonial={currentTestimonial}
            onNext={nextTestimonial}
            onPrev={prevTestimonial}
            onIndicatorClick={handleIndicatorClick} // Pass the handler
             // renderStars is now internal to TestimonialCarousel
          />
        )}


        {/* Success Metrics */}
        <SuccessMetrics metrics={successMetrics} />

        {/* Achievement Stats */}
        <AchievementStats achievements={achievements} />

        {/* Video Testimonials */}
        <VideoTestimonials videos={videos} />

        {/* Trust Indicators */}
        <TrustIndicators indicators={trustIndicators} />

        {/* Final CTA */}
        <TestimonialsCTA />
      </div>
    </section>
  );
};

export default Testimonials;
