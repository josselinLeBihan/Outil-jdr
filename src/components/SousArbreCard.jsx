// ==========================================
// src/components/SousArbreCard.jsx
// ==========================================
import React from 'react';

export const SousArbreCard = ({ sousArbre, onClick }) => {
  return (
    <button
      onClick={() => onClick(sousArbre)}
      className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-transparent hover:border-purple-500 text-left"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{sousArbre.nom}</h2>
      <p className="text-gray-600 text-sm">
        {sousArbre.competences.length} compétence{sousArbre.competences.length > 1 ? 's' : ''}
      </p>
    </button>
  );
};