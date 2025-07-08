import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = (props) => {
  // Placeholder pagination buttons. 
  // This will need to be updated to handle active state, total pages, etc.
  return (
    <div className="flex justify-center items-center space-x-2 mt-12">
      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600">
        Previous
      </button>
      {/* Example pagination item - replace with dynamic generation based on totalPages */}
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">1</button>
      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600">2</button>
      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600">3</button>
      {/* End example pagination items */}
      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600">
        Next
      </button>
    </div>
  );
};

export default Pagination;
