// components/sections/PresentationSection.jsx
import React, { useState, useEffect } from "react";
import { Character, Arbre, SousArbre, Lignage } from "../../types";

interface PresentationSectionProps {
  character: Character;
  editMode: boolean;
  onUpdate: (field: string, value: string) => void;
  arbres: Arbre[];
  lignages?: Lignage[];
}

const PresentationSection: React.FC<PresentationSectionProps> = ({
  character,
  editMode,
  onUpdate,
  arbres = [],
  lignages = [],
}) => {
  const [lignageOptions, setlignageOptions] = useState<SousArbre[]>([]);
  const [classeOptions, setclasseOptions] = useState<SousArbre[]>([]);
  const [magieOptions, setmagieOptions] = useState<SousArbre[]>([]);
  const [lignagesList, setLignagesList] = useState<Lignage[]>([]);

  useEffect(() => {
    setmagieOptions(
      arbres.find((arbre) => arbre.id === "magie")?.sousArbres || [],
    );
    setlignageOptions(
      arbres.find((arbre) => arbre.id === "lignage")?.sousArbres || [],
    );
    setclasseOptions(
      arbres.find((arbre) => arbre.id === "classe")?.sousArbres || [],
    );
    setLignagesList(lignages || []);
    console.log("Lignages list updated:", lignages);
  }, [arbres, lignages]);

  return (
    <div className="bg-gray-800 p-6 rounded-lg mb-6 border border-gray-700">
      <h2 className="text-2xl font-bold mb-4 text-red-400">Présentation</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Nom</label>
          <input
            type="text"
            value={character.nom || ""}
            onChange={(e) => onUpdate("nom", e.target.value)}
            disabled={!editMode}
            className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 disabled:opacity-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Prénom</label>
          <input
            type="text"
            value={character.prenom || ""}
            onChange={(e) => onUpdate("prenom", e.target.value)}
            disabled={!editMode}
            className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 disabled:opacity-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Lignage</label>
          <select
            value={character.lignage || ""}
            onChange={(e) => onUpdate("lignage", e.target.value)}
            disabled={!editMode}
            className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 disabled:opacity-50"
          >
            <option value="">--</option>
            {lignageOptions.map((option) => (
              <option key={option.nom} value={option.nom}>
                {option.nom}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Magie</label>
          <select
            value={character.magie || ""}
            onChange={(e) => onUpdate("magie", e.target.value)}
            disabled={!editMode}
            className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 disabled:opacity-50"
          >
            <option value="">--</option>

            {magieOptions.map((option) => (
              <option key={option.nom} value={option.nom}>
                {option.nom}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Classe</label>
          <select
            value={character.classe || ""}
            onChange={(e) => onUpdate("classe", e.target.value)}
            disabled={!editMode}
            className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 disabled:opacity-50"
          >
            <option value="">--</option>
            {classeOptions.map((option) => (
              <option key={option.nom} value={option.nom}>
                {option.nom}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">2ème classe</label>
          <select
            value={character.classe2 || ""}
            onChange={(e) => onUpdate("classe2", e.target.value)}
            disabled={!editMode}
            className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 disabled:opacity-50"
          >
            <option value="">--</option>
            {classeOptions.map((option) => (
              <option key={option.nom} value={option.nom}>
                {option.nom}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Description and Concept*/}
      <div className="flex flex-wrap gap-2 mb-4 mt-4">
        {Array.from(
          new Map(
            character.competences
              .filter((comp) => comp.modificationPhysique)
              .map((comp) => [comp.nom, comp]),
          ).values(),
        ).map((comp) => (
          <div
            key={comp.nom}
            className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full text-sm"
          >
            {comp.modificationPhysique}
          </div>
        ))}
        {character.lignage && lignagesList && Array.isArray(lignagesList) && (
          <div className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full text-sm">
            {lignagesList.find((l) => l.nom === character.lignage)?.ethnie}
          </div>
        )}
      </div>
      <div className="mb-2">
        <label className="block text-xs font-medium mb-1 text-gray-400">
          Concept du personnage
        </label>
        <textarea
          placeholder="Concept du personnage"
          value={character.concept || ""}
          onChange={(e) => onUpdate("concept", e.target.value)}
          disabled={!editMode}
          rows={3}
          className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2 disabled:opacity-50 resize-none"
        />
      </div>
      <div className="mb-2">
        <label className="block text-xs font-medium mb-1 text-gray-400">
          Description
        </label>
        <textarea
          placeholder="Description du personnage"
          value={character.description || ""}
          onChange={(e) => onUpdate("description", e.target.value)}
          disabled={!editMode}
          rows={3}
          className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2 disabled:opacity-50 resize-none"
        />
      </div>
    </div>
  );
};

export default PresentationSection;
