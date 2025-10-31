// ==========================================
// src/pages/CompetencePage.jsx
// ==========================================
import React from 'react';
import { CompetenceDetail } from '../components/CompetenceDetail';
import { Competence } from '../types';

interface CompetencePageProps {
  competence: Competence;
}

export const CompetencePage: React.FC<CompetencePageProps> = ({ competence }) => {
  return <CompetenceDetail competence={competence} />;
};