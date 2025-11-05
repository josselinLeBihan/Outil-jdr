// components/DotRating.tsx
import React from "react";
import { Circle } from "lucide-react";

interface DotRatingProps {
  value: number;
  maxValue: number;
  onChange: (value: number) => void;
  disabled: boolean;
  label: string;
}

const DotRating: React.FC<DotRatingProps> = ({
  value,
  maxValue,
  onChange,
  disabled,
  label,
}) => {
  const handleClick = (index: number) => {
    if (disabled) return;

    // Si on clique sur le premier point et que la valeur est 1, on passe à 0
    if (index === 0 && value === 1) {
      onChange(0);
      return;
    }

    // Comportement normal: définir la valeur au nombre de points cliqué + 1
    onChange(index + 1);
  };

  return (
    <div className="flex items-center justify-between mb-3">
      <span className="text-sm w-32">{label}</span>
      <div className="flex gap-1">
        {[...Array(maxValue)].map((_, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            disabled={disabled}
            className="focus:outline-none disabled:cursor-default"
          >
            <Circle
              size={20}
              className={`transition-all ${
                i < value
                  ? "fill-red-500 stroke-red-500"
                  : "fill-none stroke-gray-600 hover:stroke-red-400"
              } ${disabled ? "" : "cursor-pointer"}`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default DotRating;
