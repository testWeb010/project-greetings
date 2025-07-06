import React from 'react';
import Hero from './Hero';
import FeaturedProperties from './FeaturedProperties';
import Testimonials from './Testimonials';
import CallToAction from './CallToAction';
import Footer from './Footer';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedProperties />
      <Testimonials />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default LandingPage;