// ==========================================
// src/pages/HomePage.jsx
// ==========================================
import React from 'react';
import { ArbreCard } from '../components/ArbreCard';

export const HomePage = ({ arbres, onSelectArbre }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Arbres de Compétences</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {arbres.map((arbre) => (
          <ArbreCard key={arbre.id} arbre={arbre} onClick={onSelectArbre} />
        ))}
      </div>
    </div>
  );
};