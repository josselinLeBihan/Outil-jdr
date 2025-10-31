// ==========================================
// src/pages/ArbrePage.jsx
// ==========================================
import React from 'react';
import { SousArbreCard } from '../components/SousArbreCard';
import { Arbre, SousArbre } from '../types';

interface ArbrePageProps {
  arbre: Arbre;
  onSelectSousArbre: (sousArbre: SousArbre) => void;
}

export const ArbrePage: React.FC<ArbrePageProps> = ({ arbre, onSelectSousArbre }) => {
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