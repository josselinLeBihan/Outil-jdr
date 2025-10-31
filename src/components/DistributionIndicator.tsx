// components/DistributionIndicator.jsx
import React from "react";

interface StatusData {
  current: number;
  target: number;
  diff: number;
}

interface StatusObject {
  [key: string]: StatusData;
}

interface DistributionIndicatorProps {
  title: string;
  standard: string;
  status: StatusObject;
}

const DistributionIndicator: React.FC<DistributionIndicatorProps> = ({
  title,
  standard,
  status,
}) => {
  return (
    <div className="mb-4 p-4 bg-gray-700 rounded border border-gray-600">
      <h3 className="font-semibold mb-2 text-yellow-400">{title}</h3>
      <p className="text-sm text-gray-300 mb-3">
        Répartition standard : {standard}
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
        {Object.entries(status).map(([key, statusData]) => {
          const level = key.replace("at", "");
          const isOver = statusData.diff > 0;
          const isUnder = statusData.diff < 0;
          return (
            <div
              key={key}
              className={`p-2 rounded ${
                isOver
                  ? "bg-red-900/50 border border-red-600"
                  : isUnder
                    ? "bg-blue-900/50 border border-blue-600"
                    : "bg-green-900/50 border border-green-600"
              }`}
            >
              <div className="font-medium">Niveau {level}</div>
              <div className="text-xs">
                {statusData.current}/{statusData.target}
                {isOver && (
                  <span className="text-red-400 ml-1">
                    (+{statusData.diff})
                  </span>
                )}
                {isUnder && (
                  <span className="text-blue-400 ml-1">
                    ({statusData.diff})
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DistributionIndicator;
