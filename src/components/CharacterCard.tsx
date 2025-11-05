// components/CharacterCard.jsx
import React from "react";
import { FileText, Download, Trash2 } from "lucide-react";
import { Character } from "../types";

interface CharacterCardProps {
  character: Character;
  onView: (character: Character) => void;
  onEdit: (character: Character) => void;
  onExportMD: (character: Character) => void;
  onExportJSON: (character: Character) => void;
  onDelete: (id: string) => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  onView,
  onEdit,
  onExportMD,
  onExportJSON,
  onDelete,
}) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex flex-col w-fit">
      <h3 className="text-xl font-bold text-red-400 mb-2">
        {character.prenom} {character.nom}
      </h3>
      <p className="text-gray-400 mb-4">
        Lignage: {character.lignage || "Non défini"}
      </p>
      <div className="flex gap-2 flex-row">
        <button
          onClick={() => onView(character)}
          className="flex-1 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-sm flex items-center justify-center"
        >
          <FileText size={16} className="inline mr-1" />
          Voir
        </button>
        <button
          onClick={() => onEdit(character)}
          className="flex-1 bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded text-sm"
        >
          Éditer
        </button>
        <button
          onClick={() => onExportMD(character)}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded flex items-center gap-1"
        >
          <Download size={16} />
          MD
        </button>
        <button
          onClick={() => onExportJSON(character)}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded flex items-center gap-1"
        >
          <Download size={16} />
          JSON
        </button>
        <button
          onClick={() => character.id && onDelete(character.id)}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default CharacterCard;
