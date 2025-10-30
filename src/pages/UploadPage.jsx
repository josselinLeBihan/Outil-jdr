// ==========================================
// src/pages/UploadPage.jsx
// ==========================================
import React from 'react';
import { Upload } from 'lucide-react';

export const UploadPage = ({ onFileUpload, loading, error }) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-6">
          <Upload className="mx-auto mb-4 text-blue-600" size={48} />
          <h1 className="text-3xl font-bold mb-2 text-gray-800">Importer vos compétences</h1>
          <p className="text-gray-600">Téléchargez un fichier CSV avec vos compétences de jeu de rôle</p>
        </div>

        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-2">Format CSV attendu :</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• <strong>Arbres</strong> (ou arbre) : Nom de l'arbre (ex: Classe, Lignage)</li>
            <li>• <strong>sousArbre</strong> : Nom du sous-arbre (ex: Rodeur, Bestille)</li>
            <li>• <strong>nom</strong> : Nom de la compétence</li>
            <li>• <strong>ultime</strong> : Laisser vide ou mettre true/x/1 pour une compétence ultime</li>
            <li>• <strong>modificationPhysique</strong> : (optionnel) Description physique</li>
            <li>• <strong>description</strong> : Description courte</li>
            <li>• <strong>fonctionnement</strong> : Fonctionnement détaillé</li>
            <li>• <strong>niveau1</strong> : Effets niveau 1</li>
            <li>• <strong>Niveau 2</strong> (ou niveau2) : Effets niveau 2</li>
          </ul>
          <p className="text-xs text-gray-600 mt-2">
            Note : Les noms de colonnes peuvent être avec majuscules ou minuscules
          </p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        <label className="block">
          <input
            type="file"
            accept=".csv"
            onChange={onFileUpload}
            disabled={loading}
            className="block w-full text-sm text-gray-600
              file:mr-4 file:py-3 file:px-6
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-600 file:text-white
              hover:file:bg-blue-700
              file:cursor-pointer
              disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </label>

        {loading && (
          <div className="mt-4 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
            <p className="mt-2 text-gray-600">Chargement en cours...</p>
          </div>
        )}
      </div>
    </div>
  );
};