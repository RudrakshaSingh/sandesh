import React from 'react';
import { Search, Filter } from 'lucide-react';

const DesignLibrary = () => {
  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Design Library</h1>
          <p className="text-gray-600">Browse our collection of beautiful templates</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search templates..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-4">
            <select className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500">
              <option>All Events</option>
              <option>Weddings</option>
              <option>Birthdays</option>
              <option>Festivals</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
              <Filter className="h-5 w-5" />
              Filters
            </button>
          </div>
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
              <img
                src={`https://images.unsplash.com/photo-${item === 1 ? '1600948836101-f9ffda59d250' : 
                      item === 2 ? '1544161515-4ab6ce6db874' : 
                      item === 3 ? '1561731216-c3a4d99437d5' :
                      item === 4 ? '1604600111728-5914c8aea6ae' :
                      item === 5 ? '1600948836101-f9ffda59d250' :
                      '1544161515-4ab6ce6db874'}`}
                alt={`Template ${item}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Template {item}</h3>
                <p className="text-gray-600 text-sm mb-4">Perfect for traditional celebrations</p>
                <button className="w-full bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition">
                  Use Template
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DesignLibrary;