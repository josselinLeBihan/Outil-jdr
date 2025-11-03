// components/EquipementTable.tsx
import React, { useState } from "react";
import { Plus, Search } from "lucide-react";
import { Equipement } from "../types";

interface EquipementTableProps {
  equipements: Equipement[];
  isCreationMode?: boolean;
  onUpdate?: (equipement: Equipement) => void;
}

type TypeFilter = "Tous" | Equipement["type"];

const EquipementTable: React.FC<EquipementTableProps> = ({
  equipements = [],
  isCreationMode = false,
  onUpdate,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterType, setFilterType] = useState<TypeFilter>("Tous");

  const types: TypeFilter[] = [
    "Tous",
    "Divers",
    "Combat",
    "Voyage",
    "Soins",
    "Compagnon",
  ];

  const getDisponibiliteLabel = (
    niveau: Equipement["disponibilite"],
  ): string => {
    const labels: Record<Equipement["disponibilite"], string> = {
      1: "1 - Commun",
      2: "2 - Peu commun",
      3: "3 - Rare",
      4: "4 - Très rare",
    };
    return labels[niveau];
  };

  const getEncombrementDots = (niveau: Equipement["encombrement"]): string => {
    return "●".repeat(niveau) + "○".repeat(3 - niveau);
  };

  const getDisponibiliteBadgeColor = (
    niveau: Equipement["disponibilite"],
  ): string => {
    const colors: Record<Equipement["disponibilite"], string> = {
      1: "bg-green-600",
      2: "bg-blue-600",
      3: "bg-orange-600",
      4: "bg-red-600",
    };
    return colors[niveau];
  };

  const filteredEquipements: Equipement[] = equipements.filter(
    (eq: Equipement) => {
      const matchesSearch: boolean =
        eq.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        eq.usage.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType: boolean =
        filterType === "Tous" || eq.type === filterType;
      return matchesSearch && matchesType;
    },
  );

  return (
    <div className="w-full bg-gray-800 grid gap-4">
      {/* Filtres et recherche */}
      <div className="mb-4 space-y-3">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Rechercher un équipement..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
            className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-gray-100 placeholder-gray-400 focus:outline-none focus:border-red-500"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {types.map((type: TypeFilter) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterType === type
                  ? "bg-red-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Vue Desktop - Tableau */}
      <div className="hidden md:block overflow-x-auto ">
        <table className="w-full border-collapse ">
          <thead>
            <tr className="bg-gray-800 border-b border-gray-700">
              <th className="text-left p-3 text-sm font-semibold text-gray-300">
                Nom
              </th>
              <th className="text-left p-3 text-sm font-semibold text-gray-300">
                Type
              </th>
              <th className="text-left p-3 text-sm font-semibold text-gray-300">
                Usage
              </th>
              <th className="text-center p-3 text-sm font-semibold text-gray-300">
                Disponibilité
              </th>
              <th className="text-center p-3 text-sm font-semibold text-gray-300">
                Encombrement
              </th>
              {isCreationMode && (
                <th className="text-center p-3 text-sm font-semibold text-gray-300">
                  Action
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredEquipements.length === 0 ? (
              <tr>
                <td
                  colSpan={isCreationMode ? 6 : 5}
                  className="text-center p-8 text-gray-500"
                >
                  Aucun équipement trouvé
                </td>
              </tr>
            ) : (
              filteredEquipements.map((eq: Equipement, index: number) => (
                <tr
                  key={index}
                  className="border-b border-gray-700 hover:bg-gray-800 transition-colors"
                >
                  <td className="p-3 text-gray-100 font-medium">{eq.nom}</td>
                  <td className="p-3">
                    <span className="inline-block px-2 py-1 text-xs rounded bg-gray-700 text-gray-300">
                      {eq.type}
                    </span>
                  </td>
                  <td className="p-3 text-gray-300 text-sm">{eq.usage}</td>
                  <td className="p-3 text-center">
                    <span
                      className={`inline-block px-3 py-1 text-xs rounded text-white ${getDisponibiliteBadgeColor(eq.disponibilite)}`}
                    >
                      {getDisponibiliteLabel(eq.disponibilite)}
                    </span>
                  </td>
                  <td className="p-3 text-center text-yellow-400 font-mono">
                    {getEncombrementDots(eq.encombrement)}
                  </td>
                  {isCreationMode && (
                    <td className="p-3 text-center">
                      <button
                        onClick={() => onUpdate && onUpdate(eq)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm flex items-center gap-1 mx-auto transition-colors"
                      >
                        <Plus size={16} />
                        Ajouter
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Vue Mobile - Cartes */}
      <div className="md:hidden space-y-3">
        {filteredEquipements.length === 0 ? (
          <div className="text-center p-8 text-gray-500 bg-gray-800 rounded-lg">
            Aucun équipement trouvé
          </div>
        ) : (
          filteredEquipements.map((eq: Equipement, index: number) => (
            <div
              key={index}
              className="bg-gray-800 border border-gray-700 rounded-lg p-4 space-y-3"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-100 mb-1">
                    {eq.nom}
                  </h3>
                  <span className="inline-block px-2 py-1 text-xs rounded bg-gray-700 text-gray-300">
                    {eq.type}
                  </span>
                </div>
                {isCreationMode && (
                  <button
                    onClick={() => onSelect && onSelect(eq)}
                    className="bg-red-600 hover:bg-red-700 text-white p-2 rounded transition-colors ml-2"
                  >
                    <Plus size={20} />
                  </button>
                )}
              </div>

              <p className="text-gray-300 text-sm">{eq.usage}</p>

              <div className="flex items-center justify-between pt-2 border-t border-gray-700">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 mb-1">
                    Disponibilité
                  </span>
                  <span
                    className={`inline-block px-2 py-1 text-xs rounded text-white ${getDisponibiliteBadgeColor(eq.disponibilite)}`}
                  >
                    {getDisponibiliteLabel(eq.disponibilite)}
                  </span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs text-gray-500 mb-1">
                    Encombrement
                  </span>
                  <span className="text-yellow-400 font-mono text-sm">
                    {getEncombrementDots(eq.encombrement)}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Résumé */}
      <div className="mt-4 text-sm text-gray-400 text-center">
        {filteredEquipements.length} équipement
        {filteredEquipements.length > 1 ? "s" : ""} affiché
        {filteredEquipements.length > 1 ? "s" : ""}
      </div>
    </div>
  );
};

export default EquipementTable;
