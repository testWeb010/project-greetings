
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface TestimonialUser {
  id: string;
  name: string;
  role: string;
  avatar: string;
  location: string;
  university?: string;
  propertyType?: string;
}

interface Testimonial {
  id: string;
  user: TestimonialUser;
  content: string;
  rating: number;
  date: string;
  category: string;
  verified: boolean;
  helpful: number;
  featured: boolean;
  tags: string[];
  propertyDetails?: {
    name: string;
    location: string;
    rent: number;
  };
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (!testimonials.length) {
    return <div>No testimonials available</div>;
  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <img
              src={currentTestimonial.user.avatar}
              alt={currentTestimonial.user.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h4 className="text-lg font-bold text-gray-900">{currentTestimonial.user.name}</h4>
              <p className="text-blue-600 font-semibold">{currentTestimonial.user.role}</p>
              <p className="text-gray-500 text-sm">{currentTestimonial.user.location}</p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < currentTestimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          "{currentTestimonial.content}"
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {currentTestimonial.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {currentTestimonial.propertyDetails && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h5 className="font-semibold text-gray-900 mb-2">Property Details</h5>
            <p className="text-gray-700">{currentTestimonial.propertyDetails.name}</p>
            <p className="text-gray-600 text-sm">{currentTestimonial.propertyDetails.location}</p>
            <p className="text-blue-600 font-semibold">₹{currentTestimonial.propertyDetails.rent}/month</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={prevTestimonial}
          className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <ChevronLeft className="h-6 w-6 text-gray-600" />
        </button>

        <div className="flex space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextTestimonial}
          className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <ChevronRight className="h-6 w-6 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
