// components/sections/ArbresSection.tsx
import React, { useState } from "react";
import { Character, Arbre } from "../../types";

interface ArbresSectionProps {
  character: Character;
  editMode: boolean;
  onUpdate: (field: string, value: any) => void;
  arbres: Arbre[];
}

const ArbresSection: React.FC<ArbresSectionProps> = ({
  character,
  editMode,
  onUpdate,
  arbres,
}) => {
  // État local pour les niveaux des arbres
  const [niveaux, setNiveaux] = useState({
    classe: 0,
    lignage: 0,
    magie: 0,
  });

  // Les noms des arbres à afficher
  const arbreNames = ["Métier", "Lignage", "Magie"];
  const arbreKeys = ["classe", "lignage", "magie"] as const;

  const handleNiveauChange = (key: string, value: number) => {
    setNiveaux((prev) => ({ ...prev, [key]: value }));

    // Mettre à jour les arbres avec le nouveau niveau
    const newArbres = { ...character.arbres } as Record<string, any>;
    newArbres[key] = value;
    onUpdate("arbres", newArbres);

    // Mettre à jour l'avantage si c'est la classe qui change
    if (key === "classe") {
      let nouveauAvantage: number;
      if (value === 0 || value === 1) {
        nouveauAvantage = 7;
      } else if (value === 2) {
        nouveauAvantage = 9;
      } else if (value === 3) {
        nouveauAvantage = 11;
      } else {
        return;
      }
      onUpdate("avantages", nouveauAvantage);
    }
  };

  const handleSousArbreChange = (key: string, sousArbreNom: string) => {
    const newArbres = { ...character.arbres } as Record<string, any>;
    newArbres[`${key}SousArbre`] = sousArbreNom;
    onUpdate("arbres", newArbres);
  };

  const getArbreByKey = (key: string) => {
    // Mapper les clés locales aux IDs des arbres
    const arbreIdMap: Record<string, string> = {
      classe: "classe",
      lignage: "lignage",
      magie: "magie",
    };
    return arbres.find(
      (a) => a.id === arbreIdMap[key] || a.nom === arbreIdMap[key],
    );
  };

  const renderArbreSelector = (
    name: string,
    key: (typeof arbreKeys)[number],
  ) => {
    const currentNiveau = niveaux[key as keyof typeof niveaux] || 0;
    const currentSousArbreNom =
      (character.arbres as Record<string, any>)?.[`${key}SousArbre`] || "";
    const arbre = getArbreByKey(key);
    const sousArbres = arbre?.sousArbres || [];

    return (
      <div key={key} className="bg-gray-700 p-4 rounded-lg">
        <label className="block text-sm font-medium mb-3">{name}</label>

        {/* Sélection du niveau */}
        <div className="flex gap-2 mb-4">
          {[0, 1, 2, 3].map((num) => (
            <button
              key={num}
              onClick={() => handleNiveauChange(key, num)}
              disabled={!editMode}
              className={`px-4 py-2 rounded font-medium transition-colors ${
                currentNiveau === num
                  ? "bg-red-600 text-white"
                  : "bg-gray-600 text-gray-200 hover:bg-gray-500"
              } ${!editMode ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            >
              {num}
            </button>
          ))}
        </div>

        {/* Sélection du sous-arbre */}
        {sousArbres.length > 0 && (
          <div>
            <label className="block text-xs font-medium mb-2 text-gray-300">
              Sous-arbre
            </label>
            <select
              value={currentSousArbreNom}
              onChange={(e) => handleSousArbreChange(key, e.target.value)}
              disabled={!editMode}
              className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2 disabled:opacity-50 text-white"
            >
              <option value="">-- Aucun --</option>
              {sousArbres.map((sousArbre) => (
                <option key={sousArbre.id} value={sousArbre.nom}>
                  {sousArbre.nom}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Sélection de la 2ème classe si c'est la clé "classe" */}
        {key === "classe" && sousArbres.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-600">
            <label className="block text-xs font-medium mb-2 text-gray-300">
              2ème Sous-arbre
            </label>
            <select
              value={
                (character.arbres as Record<string, any>)?.classe2SousArbre ||
                ""
              }
              onChange={(e) => handleSousArbreChange("classe2", e.target.value)}
              disabled={!editMode}
              className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2 disabled:opacity-50 text-white"
            >
              <option value="">-- Aucun --</option>
              {sousArbres.map((sousArbre) => (
                <option key={sousArbre.id} value={sousArbre.nom}>
                  {sousArbre.nom}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg mb-6 border border-gray-700">
      <h2 className="text-2xl font-bold text-red-400 mb-4">Arbres</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {arbreNames.map((name, index) =>
          renderArbreSelector(name, arbreKeys[index]),
        )}
      </div>
    </div>
  );
};

export default ArbresSection;
