// ==========================================
// src/components/CompetenceDetail.jsx
// ==========================================
import React from "react";
import { Zap } from "lucide-react";
import { Competence } from "../types";
// Ajoutez ces imports en haut du fichier
import { Edit } from "lucide-react";
import { useState } from "react";
import { EditCompetenceModal } from "./EditCompetenceModal";

interface CompetenceDetailProps {
  competence: Competence;
  isCreationMode?: boolean;
  onSelect?: (competence: Competence) => void;
  onBack?: () => void;
  onEditCompetence?: (updatedCompetence: Competence) => void;
}

export const CompetenceDetail: React.FC<CompetenceDetailProps> = ({
  competence,
  isCreationMode = false,
  onSelect,
  onBack,
  onEditCompetence,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleSaveEdit = (updatedFields: {
    description: string;
    fonctionnement: string;
    niveau1: string;
    niveau2: string;
  }) => {
    if (onEditCompetence) {
      onEditCompetence({
        ...competence,
        ...updatedFields,
      });
    }
  };
  return (
    <div className="max-w-3xl">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3">
            <h1 className="text-3xl font-bold text-gray-800">
              {competence.nom}
            </h1>
            {competence.ultime && (
              <span className="px-3 py-1 bg-amber-500 text-white text-sm font-semibold rounded-full flex items-center gap-1">
                <Zap size={14} />
                Ultime
              </span>
            )}
          </div>
          {!isCreationMode && onEditCompetence && (
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-2"
            >
              <Edit size={18} />
              Éditer
            </button>
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
          <div className="p-4 bg-emerald-50 border-l-4 border-emerald-600 rounded">
            <h3 className="text-lg font-semibold text-emerald-900 mb-2">
              Amélioration
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
      <EditCompetenceModal
        competence={competence}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveEdit}
      />
    </div>
  );
};
