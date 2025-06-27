import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';

export default function SearchBar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('Project');
  const [searchQuery, setSearchQuery] = useState('');

  const searchOptions = ['Project', 'Portfolio', 'Campaign'];

  return (
    <div className="relative w-full">
      <div className="flex items-center bg-slate-800/50 rounded-lg border border-slate-600/50 focus-within:border-emerald-500/50 transition-colors duration-200">
        {/* Search Filter Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="flex items-center space-x-2 px-3 py-2 text-sm text-slate-300 hover:text-white border-r border-slate-600/50 rounded-l-lg hover:bg-slate-700/50 transition-colors duration-200"
          >
            <span className="font-medium whitespace-nowrap">{selectedFilter}</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isSearchOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Search Input */}
        <div className="flex items-center flex-1 min-w-0">
          <Search className="w-4 h-4 text-slate-400 ml-3 flex-shrink-0" />
          <input
            type="text"
            placeholder={`Search ${selectedFilter.toLowerCase()}s...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 bg-transparent text-white placeholder-slate-400 focus:outline-none text-sm min-w-0"
          />
        </div>
      </div>

      {/* Dropdown Menu - Positioned using Portal-like approach */}
      {isSearchOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[100]"
            onClick={() => setIsSearchOpen(false)}
          />
          {/* Dropdown Menu */}
          <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-2xl z-[9999] max-h-80 overflow-y-auto">
            {searchOptions.map((option) => (
              <button
                key={option}
                onClick={() => {
                  setSelectedFilter(option);
                  setIsSearchOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-sm transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg ${
                  selectedFilter === option
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}