// ==========================================
// src/components/CompetenceCard.jsx
// ==========================================
import React from "react";
import { Competence } from "../types";

interface CompetenceCardProps {
  competence: Competence;
  onClick: (competence: Competence) => void;
  isUltime: boolean;
}

export const CompetenceCard: React.FC<CompetenceCardProps> = ({
  competence,
  onClick,
  isUltime,
}) => {
  const baseClasses =
    "w-full p-4 rounded-lg shadow hover:shadow-md transition-all border-2 text-left";
  const classes = isUltime
    ? `${baseClasses} bg-gradient-to-r from-amber-50 to-orange-50 border-amber-300 hover:border-amber-500`
    : `${baseClasses} bg-white border-transparent hover:border-blue-400`;

  return (
    <button onClick={() => onClick(competence)} className={classes}>
      <h3 className="text-lg font-semibold text-gray-800 mb-1">
        {competence.nom}
      </h3>
      <p className="text-gray-600 text-sm">{competence.description}</p>
    </button>
  );
};
