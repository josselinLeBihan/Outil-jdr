// ==========================================
// src/pages/CompetencePage.jsx
// ==========================================
import React from "react";
import { CompetenceDetail } from "../components/CompetenceDetail";
import { Competence } from "../types";

interface CompetencePageProps {
  competence: Competence;
  onEditCompetence: (updatedCompetence: Competence) => void;
}

export const CompetencePage: React.FC<CompetencePageProps> = ({
  competence,
  onEditCompetence,
}) => {
  return (
    <CompetenceDetail
      competence={competence}
      onEditCompetence={onEditCompetence}
    />
  );
};
