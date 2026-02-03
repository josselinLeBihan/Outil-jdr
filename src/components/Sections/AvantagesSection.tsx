// components/sections/AvantagesSection.tsx
import React from "react";
import { Character } from "../../types";

interface AvantagesSectionProps {
  character: Character;
  editMode: boolean;
  onUpdate: (field: string, value: any) => void;
}

const AvantagesSection: React.FC<AvantagesSectionProps> = ({
  character,
  editMode,
  onUpdate,
}) => {
  const avantagesMax = character.avantages || 0;
  const avantagesUtilises = character.avantagesConsome || 0;
  const avantagesRestants = avantagesMax - avantagesUtilises;

  const isOverBudget = avantagesRestants < 0;

  const handleAvantagesMaxChange = (value: string) => {
    const numValue = parseInt(value) || 0;
    onUpdate("avantages", numValue);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg mb-6 border border-gray-700">
      <h2 className="text-2xl font-bold text-red-400 mb-4">Avantages</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Avantages Max */}
        <div className="bg-gray-700 p-4 rounded-lg">
          <label className="block text-sm font-medium mb-2">
            Avantages Max
          </label>
          <input
            type="number"
            value={avantagesMax}
            onChange={(e) => handleAvantagesMaxChange(e.target.value)}
            disabled={!editMode}
            className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2 disabled:opacity-50 text-white text-center font-bold text-lg"
          />
        </div>
        {/* Avantages utilisé */}
        <div
          className={`p-4 rounded-lg border-2 ${
            isOverBudget
              ? "bg-red-900 border-red-600"
              : "bg-blue-900 border-blue-600"
          }`}
        >
          <label className="block text-sm font-medium mb-2">
            Avantages Utilisés
          </label>
          <div className="text-center font-bold text-lg">
            {Math.abs(avantagesUtilises)}
          </div>
        </div>

        {/* Avantages Restants */}
        <div
          className={`p-4 rounded-lg border-2 ${
            isOverBudget
              ? "bg-red-900 border-red-600"
              : "bg-green-900 border-green-600"
          }`}
        >
          <label className="block text-sm font-medium mb-2">
            {isOverBudget ? "Dépassement" : "Restants"}
          </label>
          <div className="text-center font-bold text-lg">
            {isOverBudget ? "-" : ""}
            {Math.abs(avantagesRestants)}
          </div>
        </div>
      </div>

      {/* Barre de progression */}
      <div className="mt-4">
        <div className="flex justify-between text-xs mb-1">
          <span>Progression</span>
          <span>
            {avantagesUtilises} / {avantagesMax}
          </span>
        </div>
        <div className="w-full bg-gray-600 rounded-full h-2 overflow-hidden">
          <div
            className={`h-full transition-all ${
              isOverBudget ? "bg-red-600" : "bg-green-600"
            }`}
            style={{
              width: `${
                avantagesMax > 0
                  ? Math.min((avantagesUtilises / avantagesMax) * 100, 100)
                  : 0
              }%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AvantagesSection;
