import React from 'react';

// NewsAPI headline categories (India)
const CATEGORIES = [
  { key: 'business', label: 'Business' },
  { key: 'sports', label: 'Sports' },
  { key: 'politics', label: 'Politics' },
  { key: 'technology', label: 'Technology' },
  { key: 'entertainment', label: 'Entertainment' },
];

function FilterBar({ activeCategory, onSelectCategory }) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => onSelectCategory(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
          activeCategory === null
            ? 'bg-blue-500 border-blue-400 text-white'
            : 'border-white/20 text-gray-300 hover:bg-white/10'
        }`}
      >
        Top 10
      </button>
      {CATEGORIES.map((c) => (
        <button
          key={c.key}
          type="button"
          onClick={() => onSelectCategory(c.key)}
          className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
            activeCategory === c.key
              ? 'bg-indigo-500 border-indigo-400 text-white'
              : 'border-white/20 text-gray-300 hover:bg-white/10'
          }`}
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
