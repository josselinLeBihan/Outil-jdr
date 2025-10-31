// src/components/Breadcrumb.jsx
// ==========================================
import React from "react";
import { ChevronRight, Home } from "lucide-react";
import { Arbre, SousArbre, Competence } from "../types";

interface BreadcrumbProps {
  selectedArbre: Arbre | null;
  selectedSousArbre: SousArbre | null;
  selectedCompetence: Competence | null;
  onNavigateHome: () => void;
  onNavigateToArbre: (arbre: Arbre) => void;
  onNavigateToSousArbre: (sousArbre: SousArbre) => void;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  selectedArbre,
  selectedSousArbre,
  selectedCompetence,
  onNavigateHome,
  onNavigateToArbre,
  onNavigateToSousArbre,
}) => {
  return (
    <div className="flex items-center gap-2 mb-6 text-sm">
      <button
        onClick={onNavigateHome}
        className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
      >
        <Home size={16} />
        <span>Accueil</span>
      </button>
      {selectedArbre && (
        <>
          <ChevronRight size={16} className="text-gray-400" />
          <button
            onClick={() => onNavigateToArbre(selectedArbre)}
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            {selectedArbre.nom}
          </button>
        </>
      )}
      {selectedSousArbre && (
        <>
          <ChevronRight size={16} className="text-gray-400" />
          <button
            onClick={() => onNavigateToSousArbre(selectedSousArbre)}
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            {selectedSousArbre.nom}
          </button>
        </>
      )}
      {selectedCompetence && (
        <>
          <ChevronRight size={16} className="text-gray-400" />
          <span className="text-gray-700">{selectedCompetence.nom}</span>
        </>
      )}
    </div>
  );
};
