// ==========================================
// src/pages/SousArbrePage.jsx
// ==========================================
import React from 'react';
import { Zap } from 'lucide-react';
import { CompetenceCard } from '../components/CompetenceCard';
import { SousArbre, Competence } from '../types';

interface SousArbrePageProps {
  sousArbre: SousArbre;
  onSelectCompetence: (competence: Competence) => void;
}

export const SousArbrePage: React.FC<SousArbrePageProps> = ({ sousArbre, onSelectCompetence }) => {
  const ultimates = (sousArbre.competences || []).filter(c => !!c.ultime);
  const regulars = (sousArbre.competences || []).filter(c => !c.ultime);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">{sousArbre.nom}</h1>
      
      {ultimates.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-amber-600 flex items-center gap-2">
            <Zap size={20} />
            Compétences Ultimes
          </h2>
          <div className="space-y-3">
            {ultimates.map((competence) => (
              <CompetenceCard 
                key={competence.id} 
                competence={competence} 
                onClick={onSelectCompetence}
                isUltime={true}
              />
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Compétences</h2>
        <div className="space-y-3">
          {regulars.map((competence) => (
            <CompetenceCard 
              key={competence.id} 
              competence={competence} 
              onClick={onSelectCompetence}
              isUltime={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
};