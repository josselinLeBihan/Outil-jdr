// pages/CharacterListPage.jsx
import React from 'react';
import { Plus } from 'lucide-react';
import CharacterCard from '../components/CharacterCard';
import { exportToMarkdown } from '../utils/characterUtils';
import { Character } from '../types';

const CharacterListPage = ({ characters, onNew, onView, onEdit, onDelete }: { characters: Character[]; onNew: () => void; onView: (char: Character) => void; onEdit: (char: Character) => void; onDelete: (id: string) => void }) => {
  const handleExport = (char: Character) => {
    exportToMarkdown(char);
  };

  return (
    <div className="min-h-screen text-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-red-500">Fiches de Personnages</h1>
        
        <button
          onClick={onNew}
          className="mb-6 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg flex items-center gap-2"
        >
          <Plus size={20} />
          Nouveau Personnage
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {characters.map((char: Character) => (
            <CharacterCard
              key={char.id}
              character={char}
              onView={() => onView(char)}
              onEdit={() => onEdit(char)}
              onExport={() => handleExport(char)}
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