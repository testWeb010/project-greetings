
import React from 'react';
import PropertyCarousel from './PropertyCarousel';
import PropertyFilterTabs from './PropertyFilterTabs';
import FeaturedPropertiesCTA from './FeaturedPropertiesCTA';

const FeaturedProperties: React.FC = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Properties
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Discover handpicked accommodations that offer the best value, location, and amenities for students
          </p>
        </div>

        <PropertyFilterTabs />
        <PropertyCarousel />
        <FeaturedPropertiesCTA />
      </div>
    </section>
  );
};

export default FeaturedProperties;
