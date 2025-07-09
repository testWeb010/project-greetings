
import React from 'react';
import Hero from '../components/features/hero/Hero';
import FeaturedProperties from '../components/features/properties/FeaturedProperties';
import Testimonials from '../components/features/testimonials/Testimonials';
import CallToAction from './CallToAction';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedProperties />
      <Testimonials />
      <CallToAction />
    </div>
  );
};

export default LandingPage;
