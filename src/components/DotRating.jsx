// components/DotRating.jsx
import React from 'react';
import { Circle } from 'lucide-react';

const DotRating = ({ value, maxValue, onChange, disabled, label }) => {
  return (
    <div className="flex items-center justify-between mb-3">
      <span className="text-sm w-32">{label}</span>
      <div className="flex gap-1">
        {[...Array(maxValue)].map((_, i) => (
          <button
            key={i}
            onClick={() => !disabled && onChange(i + 1)}
            disabled={disabled}
            className="focus:outline-none disabled:cursor-default"
          >
            <Circle
              size={20}
              className={`transition-all ${
                i < value
                  ? 'fill-red-500 stroke-red-500'
                  : 'fill-none stroke-gray-600 hover:stroke-red-400'
              } ${disabled ? '' : 'cursor-pointer'}`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default DotRating;