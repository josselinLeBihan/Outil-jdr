// components/CharacterCard.jsx
import React from 'react';
import { FileText, Download, Trash2 } from 'lucide-react';

const CharacterCard = ({ character, onView, onEdit, onExport, onDelete }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
      <h3 className="text-xl font-bold text-red-400 mb-2">
        {character.prenom} {character.nom}
      </h3>
      <p className="text-gray-400 mb-4">Lignage: {character.lignage || 'Non défini'}</p>
      <div className="flex gap-2">
        <button
          onClick={onView}
          className="flex-1 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-sm"
        >
          <FileText size={16} className="inline mr-1" />
          Voir
        </button>
        <button
          onClick={onEdit}
          className="flex-1 bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded text-sm"
        >
          Éditer
        </button>
        <button
          onClick={onExport}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          <Download size={16} />
        </button>
        <button
          onClick={onDelete}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default CharacterCard;