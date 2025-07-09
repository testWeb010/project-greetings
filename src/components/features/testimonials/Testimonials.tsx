
import React from 'react';
import TestimonialHeader from './TestimonialHeader';
import TestimonialCarousel from './TestimonialCarousel';
import TrustIndicators from './TrustIndicators';
import AchievementStats from './AchievementStats';
import TestimonialsCTA from './TestimonialsCTA';

const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TestimonialHeader />
        <TestimonialCarousel />
        <TrustIndicators />
        <AchievementStats />
        <TestimonialsCTA />
      </div>
    </section>
  );
};

export default Testimonials;
