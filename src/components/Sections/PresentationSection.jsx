// components/sections/PresentationSection.jsx
import React, { useState, useEffect } from 'react';

const PresentationSection = ({ character, editMode, onUpdate, arbres = []}) => {
  const [lignageOptions, setlignageOptions] = useState([]);
  const [classeOptions, setclasseOptions] = useState([]);
  const [magieOptions, setmagieOptions] = useState([]);
  
  useEffect(()=> {
    setmagieOptions( arbres.find(arbre => arbre.id === 'magie')?.sousArbres || [] );
    setlignageOptions( arbres.find(arbre => arbre.id === 'lignage')?.sousArbres || [] );
    setclasseOptions( arbres.find(arbre => arbre.id === 'classe')?.sousArbres || [] );
  },[arbres])

    console.log('magieOptions', magieOptions)

  return (
    <div className="bg-gray-800 p-6 rounded-lg mb-6 border border-gray-700">
      <h2 className="text-2xl font-bold mb-4 text-red-400">Présentation</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Nom</label>
          <input
            type="text"
            value={character.nom || ''}
            onChange={(e) => onUpdate('nom', e.target.value)}
            disabled={!editMode}
            className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 disabled:opacity-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Prénom</label>
          <input
            type="text"
            value={character.prenom || ''}
            onChange={(e) => onUpdate('prenom', e.target.value)}
            disabled={!editMode}
            className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 disabled:opacity-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Lignage</label>
          <select
            value={character.lignage || ''}
            onChange={(e) => onUpdate('lignage', e.target.value)}
            disabled={!editMode}
            className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 disabled:opacity-50"
          >
            <option value="">--</option>
            {lignageOptions.map((option) => (
              <option key={option.nom} value={option.nom}>{option.nom}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Magie</label>
          <select
            value={character.magie || ''}
            onChange={(e) => onUpdate('magie', e.target.value)}
            disabled={!editMode}
            className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 disabled:opacity-50"
          >
            <option value="">--</option>
   
            {magieOptions.map((option) => (
              <option key={option.nom} value={option.nom}>{option.nom}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Classe</label>
          <select
            value={character.classe || ''}
            onChange={(e) => onUpdate('classe', e.target.value)}
            disabled={!editMode}
            className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 disabled:opacity-50"
          >
            <option value="">--</option>
            {classeOptions.map((option) => (
              <option key={option.nom} value={option.nom}>{option.nom}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default PresentationSection;