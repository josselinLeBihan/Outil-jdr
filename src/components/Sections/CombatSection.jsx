// components/sections/CombatSection.jsx
import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { calculateVie, calculateInitiative } from '../../utils/characterUtils';

const CombatSection = ({ character, editMode, onUpdate, onAddAttaque, onRemoveAttaque, onUpdateAttaque }) => {
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


<div className='mb-4'>
  <label className='block text-sm font-medium mb-2'>Armure</label>
          <select 
           className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2 disabled:opacity-50" 
           value={character.combat.armure} 
           onChange={(e) => onUpdate('combat.armure', e.target.value)}>
        
            <option value={"Aucune"}>Aucune</option>
            <option value={"Légère"}>Légère</option>
            <option value={"Moyenne"}>Moyenne</option>
            <option value={"Lourde"}>Lourde</option>
        </select>
</div>
      <div className="mb-3">
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium">Attaques</label>
          {editMode && (
            <button
              onClick={onAddAttaque}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm flex items-center gap-1"
            >
              <Plus size={16} />
              Ajouter
            </button>
          )}
        </div>
        
        <div className="space-y-4">
          {character.combat.attaques.map((attaque, idx) => (
            <div key={idx} className="bg-gray-700 p-4 rounded border border-gray-600">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2">
                <div>
                  <label className="block text-xs font-medium mb-1 text-gray-400">Titre</label>
                  <input
                    type="text"
                    placeholder="Ex: Épée longue"
                    value={attaque.titre}
                    onChange={(e) => onUpdateAttaque(idx, 'titre', e.target.value)}
                    disabled={!editMode}
                    className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2 disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1 text-gray-400">Valeur</label>
                  <input
                    type="text"
                    placeholder="Ex: +5 / 1d8+3"
                    value={attaque.valeur}
                    onChange={(e) => onUpdateAttaque(idx, 'valeur', e.target.value)}
                    disabled={!editMode}
                    className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2 disabled:opacity-50"
                  />
                </div>
              </div>
              {editMode && character.combat.attaques.length > 1 && (
                <button
                  onClick={() => onRemoveAttaque(idx)}
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
    </div>
  );
};

export default CombatSection;