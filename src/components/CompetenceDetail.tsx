// ==========================================
// src/components/CompetenceDetail.jsx
// ==========================================
import React from "react";
import { Zap } from "lucide-react";
import { Competence } from "../types";

interface CompetenceDetailProps {
  competence: Competence;
  isCreationMode?: boolean;
  onSelect?: (competence: Competence) => void;
  onBack?: () => void;
}

export const CompetenceDetail: React.FC<CompetenceDetailProps> = ({
  competence,
  isCreationMode = false,
  onSelect,
  onBack,
}) => {
  return (
    <div className="max-w-3xl">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-start gap-3 mb-4">
          <h1 className="text-3xl font-bold text-gray-800">{competence.nom}</h1>
          {competence.ultime && (
            <span className="px-3 py-1 bg-amber-500 text-white text-sm font-semibold rounded-full flex items-center gap-1">
              <Zap size={14} />
              Ultime
            </span>
          )}
        </div>

        {competence.modificationPhysique && (
          <div className="mb-4 p-3 bg-purple-50 border-l-4 border-purple-500 rounded">
            <h3 className="text-base font-semibold text-purple-900 mb-1">
              Modification Physique
            </h3>
            <p className="text-purple-800">{competence.modificationPhysique}</p>
          </div>
        )}

        <div className="mb-6">
          <p className="text-gray-600 text-lg">{competence.description}</p>
        </div>

        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Fonctionnement
          </h2>
          <p className="text-gray-700 whitespace-pre-line">
            {competence.fonctionnement}
          </p>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded">
            <h3 className="text-lg font-semibold text-green-900 mb-2">
              Niveau 1
            </h3>
            {isCreationMode && (
              <button
                onClick={() =>
                  onSelect && onSelect({ ...competence, niveau: 1 })
                }
                className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Sélectionner Niveau 1
              </button>
            )}
            <p className="text-gray-700 whitespace-pre-line">
              {competence.niveau1}
            </p>
          </div>

          <div className="p-4 bg-emerald-50 border-l-4 border-emerald-600 rounded">
            <h3 className="text-lg font-semibold text-emerald-900 mb-2">
              Niveau 2
            </h3>
            {isCreationMode && (
              <button
                onClick={() =>
                  onSelect && onSelect({ ...competence, niveau: 2 })
                }
                className="px-4 py-1 bg-emerald-600 text-white rounded hover:bg-emerald-700"
              >
                Sélectionner Niveau 2
              </button>
            )}
            <p className="text-gray-700 whitespace-pre-line">
              {competence.niveau2}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
