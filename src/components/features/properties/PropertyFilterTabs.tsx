
import React, { useState } from 'react';

const PropertyFilterTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'All Properties', count: 150 },
    { id: 'pg', label: 'PG/Hostels', count: 85 },
    { id: 'rooms', label: 'Shared Rooms', count: 45 },
    { id: 'apartments', label: 'Apartments', count: 20 }
  ];

  return (
    <div className="mb-12">
      <div className="flex flex-wrap justify-center gap-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {tab.label}
            <span className="ml-2 px-2 py-1 text-xs rounded-full bg-white/20">
              {tab.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PropertyFilterTabs;
