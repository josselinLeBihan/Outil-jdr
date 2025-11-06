import React, { useState } from "react";
import { X } from "lucide-react";

interface EditCompetenceModalProps {
  competence: {
    nom: string;
    description: string;
    fonctionnement: string;
    niveau1?: string;
    niveau2?: string;
  };
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedFields: {
    description: string;
    fonctionnement: string;
    niveau1: string;
    niveau2: string;
  }) => void;
}

export const EditCompetenceModal: React.FC<EditCompetenceModalProps> = ({
  competence,
  isOpen,
  onClose,
  onSave,
}) => {
  const [description, setDescription] = useState(competence.description);
  const [fonctionnement, setFonctionnement] = useState(
    competence.fonctionnement,
  );
  const [niveau1, setNiveau1] = useState(competence.niveau1 || "");
  const [niveau2, setNiveau2] = useState(competence.niveau2 || "");

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({
      description,
      fonctionnement,
      niveau1,
      niveau2,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">
            Éditer : {competence.nom}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
              placeholder="Description de la compétence..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Fonctionnement
            </label>
            <textarea
              value={fonctionnement}
              onChange={(e) => setFonctionnement(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[150px]"
              placeholder="Fonctionnement de la compétence..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Niveau 1
            </label>
            <textarea
              value={niveau1}
              onChange={(e) => setNiveau1(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 min-h-[120px]"
              placeholder="Description du niveau 1..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Niveau 2
            </label>
            <textarea
              value={niveau2}
              onChange={(e) => setNiveau2(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 min-h-[120px]"
              placeholder="Description du niveau 2..."
            />
          </div>
        </div>

        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors font-medium"
          >
            Annuler
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCompetenceModal;
