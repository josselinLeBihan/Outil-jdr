// components/sections/EquipementSection.jsx
import React, { useState } from "react";
import { Plus, Search, Trash2 } from "lucide-react";
import { Character, Equipement } from "../../types";
import EquipementSearchModal from "../EquipementsSearchModal";

interface EquipementSectionProps {
  character: Character;
  editMode: boolean;
  onUpdate: (index: number, field: string, value: string) => void;
  onAdd: (equipement?: Equipement) => void;
  onRemove: (index: number) => void;
  equipements: Equipement[];
}

const EquipementSection: React.FC<EquipementSectionProps> = ({
  equipements,
  character,
  editMode,
  onUpdate,
  onAdd,
  onRemove,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleEquipementsSelect = (equipement: Equipement) => {
    console.log("Selected equipement from modal:", equipement);
    onAdd({
      nom: equipement.nom,
      usage: equipement.usage,
      type: equipement.type,
      disponibilite: equipement.disponibilite,
      encombrement: equipement.encombrement,
    });
  };
  return (
    <div className="bg-gray-800 p-6 rounded-lg mb-6 border border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-wrap gap-4 items-center">
          <h2 className="text-2xl font-bold text-red-400">Équipement</h2>
          <div>
            {"Encombrement : "}
            {character.equipements
              ? character.equipements.reduce(
                  (total, eq) => total + Number(eq.encombrement || 0),
                  0,
                )
              : 0}
          </div>
          <div>
            {"Valeurs totales des equipements : "}
            {character.equipements
              ? character.equipements.reduce(
                  (total, eq) => total + Number(eq.disponibilite || 0),
                  0,
                )
              : 0}
          </div>
        </div>

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
              onClick={onAdd}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm flex items-center gap-1"
            >
              <Plus size={16} />
              Ajouter
            </button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {character.equipements?.map((item, idx) => (
          <div
            key={idx}
            className="bg-gray-700 p-4 rounded border border-gray-600"
          >
            <div className="flex flex-wrap gap-4">
              <div className="mb-3 max-w-1/2 w-full">
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
              <div className="mb-3">
                <label className="block text-xs font-medium mb-1 text-gray-400">
                  Valeur de disponibilité
                </label>
                <select
                  value={item.disponibilite}
                  onChange={(e) =>
                    onUpdate(idx, "disponibilite", e.target.value)
                  }
                  disabled={!editMode}
                  className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2 disabled:opacity-50"
                >
                  <option value={0}>0 - Ordinaire</option>
                  <option value={1}>1 - Commun</option>
                  <option value={2}>2 - Peu commun</option>
                  <option value={3}>3 - Rare</option>
                  <option value={4}>4 - Très rare</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="block text-xs font-medium mb-1 text-gray-400">
                  Encombrement
                </label>
                <select
                  value={item.encombrement}
                  onChange={(e) =>
                    onUpdate(idx, "encombrement", e.target.value)
                  }
                  disabled={!editMode}
                  className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2 disabled:opacity-50"
                >
                  <option value={0}>0</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                </select>
              </div>
            </div>

            <div className="mb-2">
              <label className="block text-xs font-medium mb-1 text-gray-400">
                Usage
              </label>
              <textarea
                placeholder="Usage de l'équipement"
                value={item.usage}
                onChange={(e) => onUpdate(idx, "usage", e.target.value)}
                disabled={!editMode}
                rows={2}
                className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2 disabled:opacity-50 resize-none"
              />
            </div>
            <div className="mb-2">
              <label className="block text-xs font-medium mb-1 text-gray-400">
                Description
              </label>
              <textarea
                placeholder="Description de l'équipement"
                value={item.descriptif}
                onChange={(e) => onUpdate(idx, "descriptif", e.target.value)}
                disabled={!editMode}
                rows={2}
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
      <EquipementSearchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleEquipementsSelect}
        equipements={equipements}
      />
    </div>
  );
};

export default EquipementSection;
