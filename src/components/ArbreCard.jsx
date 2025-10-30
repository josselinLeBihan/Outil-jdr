// ==========================================
// src/components/ArbreCard.jsx
// ==========================================
import React from 'react';
import { Book } from 'lucide-react';

export const ArbreCard = ({ arbre, onClick }) => {
  return (
    <button
      onClick={() => onClick(arbre)}
      className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-transparent hover:border-blue-500 text-left"
    >
      <div className="flex items-center gap-3 mb-2">
        <Book className="text-blue-600" size={24} />
        <h2 className="text-xl font-semibold text-gray-800">{arbre.nom}</h2>
      </div>
      <p className="text-gray-600 text-sm">
        {arbre.sousArbres.length} sous-arbre{arbre.sousArbres.length > 1 ? 's' : ''}
      </p>
    </button>
  );
};