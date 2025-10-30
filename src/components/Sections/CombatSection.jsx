// components/sections/CombatSection.jsx
import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { calculateVie, calculateInitiative } from '../../utils/characterUtils';

const CombatSection = ({ 
  character, 
  editMode, 
  onUpdate, 
  onAddAttaque, 
  onRemoveAttaque, 
  onUpdateAttaque,
  onAddMaitriseGenerale,
  onRemoveMaitriseGenerale,
  onUpdateMaitriseGenerale,
  onAddMaitriseSpecifique,
  onRemoveMaitriseSpecifique,
  onUpdateMaitriseSpecifique,
  onAddArme,
  onRemoveArme,
  onUpdateArme
}) => {

  const calculateValeurJet = (arme) => {
    const physTotal = (character.caracteristiques.physique.force || 0) + 
                      (character.caracteristiques.physique.constitution || 0) + 
                      (character.caracteristiques.physique.adresse || 0);
    console.log('Character:', character);
    const basePhys = physTotal < 7 ? 1 : 2;
    
    const maitriseGen = character.combat.maitrisesGenerales?.find(m => m.type === arme.maitriseGenerale);
    const maitriseGenNiveau = maitriseGen?.niveau || 0;
    
    const maitriseSpec = character.combat.maitrisesSpecifiques?.find(m => m.nom === arme.maitriseSpecifique);
    const maitriseSpecNiveau = maitriseSpec?.niveau || 0;
    
    return basePhys + maitriseGenNiveau + (maitriseSpecNiveau * 2);
  };

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


      <div className='mb-6'>
        <label className='block text-sm font-medium mb-2'>Armure</label>
        <select 
          className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2 disabled:opacity-50" 
          value={character.combat.armure} 
          onChange={(e) => onUpdate('combat.armure', e.target.value)}
          disabled={!editMode}>
          <option value={"Aucune"}>Aucune</option>
          <option value={"Légère"}>Légère</option>
          <option value={"Moyenne"}>Moyenne</option>
          <option value={"Lourde"}>Lourde</option>
        </select>
      </div>

      {/* Maîtrises Générales */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium">Maîtrises Générales</label>
          {editMode && (
            <button
              onClick={onAddMaitriseGenerale}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm flex items-center gap-1"
            >
              <Plus size={16} />
              Ajouter
            </button>
          )}
        </div>
        <div className="space-y-3">
          {character.combat.maitrisesGenerales?.map((maitrise, idx) => (
            <div key={idx} className="bg-gray-700 p-3 rounded border border-gray-600 flex items-center gap-3">
              <select
                value={maitrise.type}
                onChange={(e) => onUpdateMaitriseGenerale(idx, 'type', e.target.value)}
                disabled={!editMode}
                className="flex-1 bg-gray-600 border border-gray-500 rounded px-3 py-2 disabled:opacity-50"
              >
                <option value="">Sélectionner...</option>
                <option value="Armes courantes">Armes courantes</option>
                <option value="Armes gênantes">Armes gênantes</option>
                <option value="Armes de guerre">Armes de guerre</option>
              </select>
              <select
                value={maitrise.niveau}
                onChange={(e) => onUpdateMaitriseGenerale(idx, 'niveau', parseInt(e.target.value))}
                disabled={!editMode}
                className="w-20 bg-gray-600 border border-gray-500 rounded px-3 py-2 disabled:opacity-50"
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
              </select>
              {editMode && (
                <button
                  onClick={() => onRemoveMaitriseGenerale(idx)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

          {/* Maîtrises Spécifiques */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium">Maîtrises Spécifiques</label>
          {editMode && (
            <button
              onClick={onAddMaitriseSpecifique}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm flex items-center gap-1"
            >
              <Plus size={16} />
              Ajouter
            </button>
          )}
        </div>
        <div className="space-y-3">
          {character.combat.maitrisesSpecifiques?.map((maitrise, idx) => (
            <div key={idx} className="bg-gray-700 p-3 rounded border border-gray-600 flex items-center gap-3">
              <input
                type="text"
                placeholder="Nom de l'arme"
                value={maitrise.nom}
                onChange={(e) => onUpdateMaitriseSpecifique(idx, 'nom', e.target.value)}
                disabled={!editMode}
                className="flex-1 bg-gray-600 border border-gray-500 rounded px-3 py-2 disabled:opacity-50"
              />
              <select
                value={maitrise.niveau}
                onChange={(e) => onUpdateMaitriseSpecifique(idx, 'niveau', parseInt(e.target.value))}
                disabled={!editMode}
                className="w-20 bg-gray-600 border border-gray-500 rounded px-3 py-2 disabled:opacity-50"
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
              </select>
              {editMode && (
                <button
                  onClick={() => onRemoveMaitriseSpecifique(idx)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          ))}
        </div>
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
            <div key={idx} className="bg-gray-700 p-4 rounded border border-gray-600">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-xs font-medium mb-1 text-gray-400">Nom</label>
                  <input
                    type="text"
                    placeholder="Ex: Épée longue"
                    value={arme.nom}
                    onChange={(e) => onUpdateArme(idx, 'nom', e.target.value)}
                    disabled={!editMode}
                    className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2 disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1 text-gray-400">Maîtrise Générale</label>
                  <select
                    value={arme.maitriseGenerale}
                    onChange={(e) => onUpdateArme(idx, 'maitriseGenerale', e.target.value)}
                    disabled={!editMode}
                    className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2 disabled:opacity-50"
                  >
                    <option value="">Aucune</option>
                    <option value="Armes courantes">Armes courantes</option>
                    <option value="Armes gênantes">Armes gênantes</option>
                    <option value="Armes de guerre">Armes de guerre</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2">
                <div>
                  <label className="block text-xs font-medium mb-1 text-gray-400">Maîtrise Spécifique</label>
                  <select
                    value={arme.maitriseSpecifique}
                    onChange={(e) => onUpdateArme(idx, 'maitriseSpecifique', e.target.value)}
                    disabled={!editMode}
                    className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2 disabled:opacity-50"
                  >
                    <option value="">Aucune</option>
                    {character.combat.maitrisesSpecifiques?.map((m, i) => (
                      <option key={i} value={m.nom}>{m.nom}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1 text-gray-400">Valeur de Jet</label>
                  <div className="bg-gray-600 border border-gray-500 rounded px-3 py-2 text-center font-bold text-yellow-400">
                    +{calculateValeurJet(arme)}
                  </div>
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