// components/sections/CombatSection.jsx
import React from "react";
import { Plus, Trash2 } from "lucide-react";
import {
  calculateVie,
  calculateInitiative,
  calculateValeurJet,
} from "../../utils/characterUtils";
import { Character } from "../../types";
import DotRating from "../DotRating";

interface CombatSectionProps {
  character: Character;
  editMode: boolean;
  onUpdate: (path: string, value: any) => void;
  onAddMaitriseGenerale: () => void;
  onRemoveMaitriseGenerale: (index: number) => void;
  onUpdateMaitriseGenerale: (
    index: number,
    field: string,
    value: string | number,
  ) => void;
  onAddMaitriseSpecifique: () => void;
  onRemoveMaitriseSpecifique: (index: number) => void;
  onUpdateMaitriseSpecifique: (
    index: number,
    field: string,
    value: string | number,
  ) => void;
  onAddArme: () => void;
  onRemoveArme: (index: number) => void;
  onUpdateArme: (index: number, field: string, value: string) => void;
}

const CombatSection: React.FC<CombatSectionProps> = ({
  character,
  editMode,
  onUpdate,
  onAddMaitriseGenerale,
  onRemoveMaitriseGenerale,
  onUpdateMaitriseGenerale,
  onAddMaitriseSpecifique,
  onRemoveMaitriseSpecifique,
  onUpdateMaitriseSpecifique,
  onAddArme,
  onRemoveArme,
  onUpdateArme,
}) => {
  interface Arme {
    nom: string;
    maitriseGenerale: string;
    maitriseSpecifique: string;
  }

  interface MaitriseGenerale {
    type: string;
    niveau: number;
  }

  interface MaitriseSpecifique {
    nom: string;
    niveau: number;
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg mb-6 border border-gray-700">
      <h2 className="text-2xl font-bold mb-4 text-red-400">Combat</h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">Vie</label>
          <div className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-center font-bold text-green-400">
            {calculateVie(character)}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Initiative</label>
          <div className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-center font-bold text-blue-400">
            {calculateInitiative(character)}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Armure</label>
        <select
          className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2 disabled:opacity-50"
          value={character.combat.armure}
          onChange={(e) => onUpdate("combat.armure", e.target.value)}
          disabled={!editMode}
        >
          <option value={"Aucune"}>Aucune</option>
          <option value={"Légère"}>Légère</option>
          <option value={"Moyenne"}>Moyenne</option>
          <option value={"Lourde"}>Lourde</option>
        </select>
      </div>

      {/* Armes */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium">Armes</label>
          {editMode && (
            <button
              onClick={onAddArme}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm flex items-center gap-1"
            >
              <Plus size={16} />
              Ajouter
            </button>
          )}
        </div>
        <div className="space-y-4">
          {character.combat.armes?.map((arme, idx) => (
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
                    placeholder="Ex: Épée longue"
                    value={arme.nom}
                    onChange={(e) => onUpdateArme(idx, "nom", e.target.value)}
                    disabled={!editMode}
                    className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2 disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1 text-gray-400">
                    Maîtrise Générale
                  </label>
                  <select
                    value={arme.maitriseGenerale}
                    onChange={(e) =>
                      onUpdateArme(idx, "maitriseGenerale", e.target.value)
                    }
                    disabled={!editMode}
                    className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2 disabled:opacity-50"
                  >
                    <option value="">Aucune</option>
                    <option value="armesCourantes">Armes courantes</option>
                    <option value="armesDeGuerre">Armes de guerre</option>
                    <option value="armesDeJet">Armes de jet</option>
                    <option value="armesGenantes">Armes gênantes</option>
                    <option value="mainsNu">Mains nu</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2">
                <div>
                  <label className="block text-xs font-medium mb-1 text-gray-400">
                    Jet d'attaque
                  </label>
                  <div className="bg-gray-600 border border-gray-500 rounded px-3 py-2 text-center font-bold text-yellow-400">
                    {calculateValeurJet(character, arme)}
                  </div>
                </div>
                <div className="w-fit">
                  <label className="block text-xs font-medium mb-1 text-gray-400">
                    Dégats
                  </label>
                  <select
                    value={arme.degats}
                    onChange={(e) =>
                      onUpdateArme(idx, "degats", e.target.value)
                    }
                    disabled={!editMode}
                    className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2 disabled:opacity-50"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
              </div>
              {editMode && (
                <button
                  onClick={() => onRemoveArme(idx)}
                  className="text-red-400 hover:text-red-300 text-sm flex items-center gap-1 mt-2"
                >
                  <Trash2 size={14} />
                  Supprimer
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CombatSection;
