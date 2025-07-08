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
}

const TestimonialFilters: React.FC<TestimonialFiltersProps> = ({
  categories,
  activeCategory,
  setActiveCategory,
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
                // setCurrentTestimonial(0); // This state is in the parent, handle resetting in parent
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
      </div>
    </div>
  );
};

export default TestimonialFilters;
