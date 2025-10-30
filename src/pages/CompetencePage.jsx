// ==========================================
// src/pages/CompetencePage.jsx
// ==========================================
import React from 'react';
import { CompetenceDetail } from '../components/CompetenceDetail';

export const CompetencePage = ({ competence }) => {
  return <CompetenceDetail competence={competence} />;
};