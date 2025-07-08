
import React from 'react';

interface Category {
  key: string;
  label: string;
  count: number;
}

interface TestimonialFiltersProps {
  categories: Category[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  selectedRating: number;
  setSelectedRating: (rating: number) => void;
}

const TestimonialFilters: React.FC<TestimonialFiltersProps> = ({
  categories,
  activeCategory,
  setActiveCategory,
  selectedRating,
  setSelectedRating,
}) => {
  return (
    <div className="flex justify-center mb-12">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/50">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => {
                setActiveCategory(category.key);
              }}
              className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                activeCategory === category.key
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <div className="flex items-center space-x-2">
                <span>{category.label}</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  activeCategory === category.key
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {category.count}
                </span>
              </div>
            </button>
          ))}
        </div>
        <div className="mt-4 flex justify-center">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Rating:</span>
            {[0, 1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => setSelectedRating(rating)}
                className={`px-3 py-1 rounded-lg text-sm ${
                  selectedRating === rating
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {rating === 0 ? 'All' : `${rating}+`}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialFilters;
