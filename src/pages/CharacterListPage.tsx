// pages/CharacterListPage.jsx
import React from "react";
import { Plus } from "lucide-react";
import CharacterCard from "../components/CharacterCard";
import { exportToMarkdown } from "../utils/characterUtils";
import { Character } from "../types";

interface CharacterListPageProps {
  characters: Character[];
  onNew: () => void;
  onView: (char: Character) => void;
  onEdit: (char: Character) => void;
  onDelete: (id: string | undefined) => void;
  onExportJSON?: (char: Character) => void;
  onExportMD?: (char: Character) => void;
  onImport?: () => void;
  onImportMultiple?: () => void;
}

const CharacterListPage: React.FC<CharacterListPageProps> = ({
  characters,
  onNew,
  onView,
  onEdit,
  onDelete,
  onExportJSON,
  onExportMD,
  onImport,
  onImportMultiple,
}) => {
  const handleExport = (char: Character) => {
    exportToMarkdown(char);
  };

  return (
    <div className="min-h-screen text-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-red-500">
          Fiches de Personnages
        </h1>
        <div className="flex flex-wrap gap-4 mb-6">
          <button
            onClick={onNew}
            className="mb-6 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg flex items-center gap-2"
          >
            <Plus size={20} />
            Nouveau Personnage
          </button>
          {onImport && (
            <button
              onClick={onImport}
              className="mb-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2"
            >
              Importer un personnage
            </button>
          )}
          {/* Bouton Importer plusieurs personnages */}
          {onImportMultiple && (
            <button
              onClick={onImportMultiple}
              className="mb-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2"
            >
              Importer Plusieurs personnages
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {onExportJSON &&
            onExportMD &&
            characters.map((char: Character) => (
              <CharacterCard
                key={char.id}
                character={char}
                onView={() => onView(char)}
                onEdit={() => onEdit(char)}
                onExportJSON={() => onExportJSON(char)}
                onExportMD={() => onExportMD(char)}
                onDelete={() => char.id && onDelete(char.id)}
              />
            ))}
        </div>

        {characters.length === 0 && (
          <div className="text-center text-gray-500 mt-12">
            <p>Aucun personnage créé. Commencez par en créer un !</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CharacterListPage;
