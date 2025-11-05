// components/sections/CompetencesSection.jsx
import React from "react";
import { useState } from "react";
import CompetenceSearchModal from "../CompetenceSearchModal";
import { Search, Plus, Trash2 } from "lucide-react";
import { Character, Arbre, Competence } from "../../types";

interface CompetencesSectionProps {
  character: Character;
  editMode: boolean;
  onUpdate: (index: number, field: string, value: any) => void;
  onAdd: (competence?: Competence) => void;
  onRemove: (index: number) => void;
  arbres: Arbre[];
}

const CompetencesSection: React.FC<CompetencesSectionProps> = ({
  character,
  editMode,
  onUpdate,
  onAdd,
  onRemove,
  arbres,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCompetenceSelect = (competence: Competence) => {
    console.log("Selected competence from modal:", competence);

    let fonctionementComplet = competence.fonctionnement + "\n";

    if (competence.niveau === 2) {
      fonctionementComplet += competence.niveau2;
    } else {
      fonctionementComplet += competence.niveau1;
    }

    onAdd({
      nom: competence.nom,
      description: competence.description,
      modificationPhysique: competence.modificationPhysique || "",
      niveau: competence.niveau || 1,
      fonctionnement: fonctionementComplet || "",
    });
  };
  return (
    <div className="bg-gray-800 p-6 rounded-lg mb-6 border border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-red-400">Compétences</h2>
        {editMode && (
          <div className="flex gap-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm flex items-center gap-1"
            >
              <Search size={16} />
              Chercher
            </button>
            <button
              onClick={() => onAdd()}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm flex items-center gap-1"
            >
              <Plus size={16} />
              Ajouter
            </button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {character.competences.map((comp, idx) => (
          <div
            key={idx}
            className="bg-gray-700 p-4 rounded border border-gray-600"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-xs font-medium mb-1 text-gray-400">
                  Nom
                </label>
                <input
                  type="text"
                  placeholder="Nom de la compétence"
                  value={comp.nom}
                  onChange={(e) => onUpdate(idx, "nom", e.target.value)}
                  disabled={!editMode}
                  className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2 disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1 text-gray-400">
                  Niveau
                </label>
                <select
                  value={comp.niveau}
                  onChange={(e) =>
                    onUpdate(idx, "niveau", parseInt(e.target.value))
                  }
                  disabled={!editMode}
                  className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2 disabled:opacity-50"
                >
                  <option value={1}>Niveau 1</option>
                  <option value={2}>Niveau 2</option>
                </select>
              </div>
            </div>

            <div className="mb-2">
              <label className="block text-xs font-medium mb-1 text-gray-400">
                Description
              </label>
              <textarea
                placeholder="Description de la compétence"
                value={comp.description}
                onChange={(e) => onUpdate(idx, "description", e.target.value)}
                disabled={!editMode}
                rows={3}
                className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2 disabled:opacity-50 resize-none"
              />
            </div>
            <div className="mb-2">
              <label className="block text-xs font-medium mb-1 text-gray-400">
                Fonctionnement
              </label>
              <textarea
                placeholder="Fonctionnement de la compétence"
                value={comp.fonctionnement}
                onChange={(e) =>
                  onUpdate(idx, "fonctionnement", e.target.value)
                }
                disabled={!editMode}
                rows={5}
                className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2 disabled:opacity-50 resize-none"
              />
            </div>
            {editMode && (
              <button
                onClick={() => onRemove(idx)}
                className="text-red-400 hover:text-red-300 text-sm flex items-center gap-1"
              >
                <Trash2 size={14} />
                Supprimer
              </button>
            )}
          </div>
        ))}
      </div>
      <CompetenceSearchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleCompetenceSelect}
        arbres={arbres}
      />
    </div>
  );
};

export default CompetencesSection;
