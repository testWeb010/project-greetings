import React from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle, Building, MapPin } from 'lucide-react';
import { Testimonial } from '../../types'; // Corrected import path

interface TestimonialCarouselProps {
  filteredTestimonials: Testimonial[];
  currentTestimonial: number;
  onNext: () => void;
  onPrev: () => void;
  onIndicatorClick: (index: number) => void;
}

const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  filteredTestimonials,
  currentTestimonial,
  onNext,
  onPrev,
  onIndicatorClick,
}) => {
  const testimonial = filteredTestimonials[currentTestimonial];

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${
              i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  if (!testimonial) {
    return null; // Or a loading/empty state
  }

  return (
    <div className="mb-16">
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/50 shadow-2xl relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        {/* Quote Icon */}
        <div className="absolute top-8 right-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
            <Quote className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={onPrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-blue-600 p-4 rounded-full transition-all duration-200 hover:scale-110 shadow-lg border border-blue-100"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-blue-600 p-4 rounded-full transition-all duration-200 hover:scale-110 shadow-lg border border-blue-100"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        <div className="text-center max-w-5xl mx-auto relative z-10">
          {/* Rating */}
          <div className="mb-8">
            {renderStars(testimonial?.rating || 5)}
          </div>

          {/* Content */}
          <blockquote className="text-xl sm:text-2xl md:text-3xl text-gray-700 mb-10 leading-relaxed font-medium">
            "{testimonial?.content}"
          </blockquote>

          {/* Author Info */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-8">
            <div className="relative">
              <img
                src={testimonial?.avatar}
                alt={testimonial?.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-blue-100 shadow-lg"
              />
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 rounded-full p-2">
                <CheckCircle className="h-4 w-4 text-white" />
              </div>
            </div>
            <div className="text-center sm:text-left">
              <h4 className="text-2xl font-bold text-gray-900 mb-1">
                {testimonial?.name}
              </h4>
              <p className="text-blue-600 font-semibold text-lg mb-2">
                {testimonial?.role}
              </p>
              <div className="flex items-center justify-center sm:justify-start space-x-4 text-gray-600">
                <div className="flex items-center space-x-1">
                  <Building className="h-4 w-4" />
                  <span className="text-sm font-medium">{testimonial?.propertyType}</span>
                </div>
                <span className="text-gray-300">•</span>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm font-medium">{testimonial?.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Indicators */}
        <div className="flex justify-center mt-10 space-x-2">
          {filteredTestimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => onIndicatorClick(index)}
              className={`h-3 rounded-full transition-all duration-200 ${
                index === currentTestimonial ? 'bg-blue-600 w-8' : 'bg-gray-300 w-3'
              }`}
               aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
