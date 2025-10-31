// components/sections/EquipementSection.jsx
import React from "react";
import { Plus, Trash2 } from "lucide-react";
import { Character } from "../../types";

interface EquipementSectionProps {
  character: Character;
  editMode: boolean;
  onUpdate: (index: number, field: string, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}

const EquipementSection: React.FC<EquipementSectionProps> = ({
  character,
  editMode,
  onUpdate,
  onAdd,
  onRemove,
}) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg mb-6 border border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-red-400">Équipement</h2>
        {editMode && (
          <button
            onClick={onAdd}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm flex items-center gap-1"
          >
            <Plus size={16} />
            Ajouter
          </button>
        )}
      </div>

      <div className="space-y-4">
        {character.equipement.map((item, idx) => (
          <div
            key={idx}
            className="bg-gray-700 p-4 rounded border border-gray-600"
          >
            <div className="mb-3">
              <label className="block text-xs font-medium mb-1 text-gray-400">
                Nom
              </label>
              <input
                type="text"
                placeholder="Nom de l'équipement"
                value={item.nom}
                onChange={(e) => onUpdate(idx, "nom", e.target.value)}
                disabled={!editMode}
                className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2 disabled:opacity-50"
              />
            </div>
            <div className="mb-2">
              <label className="block text-xs font-medium mb-1 text-gray-400">
                Descriptif
              </label>
              <textarea
                placeholder="Description de l'équipement"
                value={item.descriptif}
                onChange={(e) => onUpdate(idx, "descriptif", e.target.value)}
                disabled={!editMode}
                rows={3}
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
    </div>
  );
};

export default EquipementSection;
