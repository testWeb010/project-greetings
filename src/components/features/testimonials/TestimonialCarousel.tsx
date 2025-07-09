
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const TestimonialCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Priya Sharma',
      role: 'Engineering Student',
      location: 'Bangalore',
      rating: 5,
      comment: 'Finding my PG through HomeDaze was incredibly easy. The verification process gave me confidence, and I found the perfect place within a week!',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg'
    },
    {
      id: 2,
      name: 'Rahul Gupta',
      role: 'MBA Student',
      location: 'Delhi',
      rating: 5,
      comment: 'Zero brokerage and direct communication with owners made the whole process transparent. Highly recommend HomeDaze to all students!',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
    },
    {
      id: 3,
      name: 'Sneha Patel',
      role: 'Medical Student',
      location: 'Mumbai',
      rating: 5,
      comment: 'The customer support was exceptional. They helped me throughout the process and ensured I found a safe and comfortable place to stay.',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="relative mb-16">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-12 border border-gray-200 dark:border-gray-700">
        <Quote className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-6 mx-auto" />
        
        <div className="text-center">
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed italic">
            "{testimonials[currentIndex].comment}"
          </p>
          
          <div className="flex justify-center mb-4">
            {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
              <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
            ))}
          </div>

          <div className="flex items-center justify-center space-x-4">
            <img
              src={testimonials[currentIndex].avatar}
              alt={testimonials[currentIndex].name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="text-left">
              <h4 className="font-semibold text-gray-900 dark:text-white">
                {testimonials[currentIndex].name}
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                {testimonials[currentIndex].role}
              </p>
              <p className="text-sm text-blue-600 dark:text-blue-400">
                {testimonials[currentIndex].location}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-center space-x-4 mt-8">
        <button
          onClick={prevTestimonial}
          className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 dark:border-gray-700"
        >
          <ChevronLeft className="h-6 w-6 text-gray-600 dark:text-gray-400" />
        </button>
        <button
          onClick={nextTestimonial}
          className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 dark:border-gray-700"
        >
          <ChevronRight className="h-6 w-6 text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center space-x-2 mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex
                ? 'bg-blue-600 dark:bg-blue-400'
                : 'bg-gray-300 dark:bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialCarousel;
