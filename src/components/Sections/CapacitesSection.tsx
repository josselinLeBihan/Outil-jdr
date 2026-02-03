// components/sections/CapacitesSection.jsx
import React from "react";
import DotRating from "../DotRating";
import DistributionIndicator from "../DistributionIndicator";
import {
  getCapacitesStatus,
  formatCapacityName,
} from "../../utils/characterUtils";
import { Character } from "../../types";

interface CapacitesSectionProps {
  character: Character;
  editMode: boolean;
  onUpdate: (path: string, value: number) => void;
  updateAvantagesConsome?: (value: number) => void;
}

const CapacitesSection: React.FC<CapacitesSectionProps> = ({
  character,
  editMode,
  onUpdate,
  updateAvantagesConsome,
}) => {
  const status = getCapacitesStatus(character);

  return (
    <div className="bg-gray-800 p-6 rounded-lg mb-6 border border-gray-700">
      <h2 className="text-2xl font-bold mb-4 text-red-400">Capacités</h2>

      {editMode && (
        <DistributionIndicator
          title="Répartition des capacités"
          standard="1×4, 3×3, 2×2, 2×1"
          status={status}
        />
      )}

      <div className="grid grid-cols-3 gap-6">
        {/* Physique */}
        <div>
          <h3 className="font-bold text-lg mb-4 text-yellow-400">Physique</h3>
          {Object.keys(character.capacites.physique).map((cap) => (
            <DotRating
              key={cap}
              label={formatCapacityName(cap)}
              value={character.capacites.physique[cap]}
              maxValue={5}
              onChange={(v) => onUpdate(`capacites.physique.${cap}`, v)}
              disabled={!editMode}
            />
          ))}
        </div>

        {/* Social */}
        <div>
          <h3 className="font-bold text-lg mb-4 text-yellow-400">Social</h3>
          {Object.keys(character.capacites.social).map((cap) => (
            <DotRating
              key={cap}
              label={formatCapacityName(cap)}
              value={character.capacites.social[cap]}
              maxValue={5}
              onChange={(v) => onUpdate(`capacites.social.${cap}`, v)}
              disabled={!editMode}
            />
          ))}
        </div>

        {/* Mental */}
        <div>
          <h3 className="font-bold text-lg mb-4 text-yellow-400">Mental</h3>
          {Object.keys(character.capacites.mental).map((cap) => (
            <DotRating
              key={cap}
              label={formatCapacityName(cap)}
              value={character.capacites.mental[cap]}
              maxValue={5}
              onChange={(v) => onUpdate(`capacites.mental.${cap}`, v)}
              disabled={!editMode}
            />
          ))}
        </div>
      </div>
      {/* Maitrises générales */}
      <div className="mb-6">
        <h3 className="font-bold text-lg mb-4 text-yellow-400">
          Maitrises générales
        </h3>
        <div className="mb-4 w-fit">
          {Object.keys(character.capacites.maitrisesGenerales).map((m) => (
            <DotRating
              key={m}
              label={formatCapacityName(m)}
              value={character.capacites.maitrisesGenerales[m] ?? 0}
              maxValue={8}
              onChange={(v) => onUpdate(`capacites.maitrisesGenerales.${m}`, v)}
              disabled={!editMode}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CapacitesSection;
