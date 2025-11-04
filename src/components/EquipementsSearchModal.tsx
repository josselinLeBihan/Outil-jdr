import React, { useState, useEffect } from "react";
import { CompetenceDetail } from "./CompetenceDetail";
import { Competence, Equipement } from "../types";
import EquipementTable from "./EquipementTable";

interface EquipementsSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (equipement: Equipement) => void;
  equipements: Equipement[];
}

const EquipementSearchModal: React.FC<EquipementsSearchModalProps> = ({
  equipements,
  isOpen,
  onClose,
  onAdd,
}) => {
  useEffect(() => {
    if (!isOpen) {
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded"
          >
            Fermer
          </button>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-red-400">
              Choisir vos équipements
            </h2>

            <EquipementTable
              onAdd={onAdd}
              equipements={equipements}
              isCreationMode={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipementSearchModal;
