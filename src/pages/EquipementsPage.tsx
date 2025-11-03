// ==========================================
// src/pages/EquipementsPage.jsx
// ==========================================
import React from "react";
import { SousArbreCard } from "../components/SousArbreCard";
import { Equipement, SousArbre } from "../types";
import EquipementTable from "../components/EquipementTable";

interface EquipementsPageProps {
  equipements: Equipement[];
}

export const EquipementsPage: React.FC<EquipementsPageProps> = ({
  equipements,
}) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Equipements</h1>
      <div className="grid grid-cols-1 gap-4">
        <EquipementTable equipements={equipements} />
      </div>
    </div>
  );
};
