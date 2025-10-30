// ==========================================
// src/pages/ArbrePage.jsx
// ==========================================
import React from 'react';
import { SousArbreCard } from '../components/SousArbreCard';

export const ArbrePage = ({ arbre, onSelectSousArbre }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">{arbre.nom}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {arbre.sousArbres.map((sousArbre) => (
          <SousArbreCard key={sousArbre.id} sousArbre={sousArbre} onClick={onSelectSousArbre} />
        ))}
      </div>
    </div>
  );
};