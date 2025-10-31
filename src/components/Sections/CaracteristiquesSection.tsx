// components/sections/CaracteristiquesSection.jsx
import React from "react";
import DotRating from "../DotRating";
import DistributionIndicator from "../DistributionIndicator";
import { getCaracteristiquesStatus } from "../../utils/characterUtils";
import { Character } from "../../types";

interface CaracteristiquesSectionProps {
  character: Character;
  editMode: boolean;
  onUpdate: (path: string, value: number) => void;
}

const CaracteristiquesSection: React.FC<CaracteristiquesSectionProps> = ({
  character,
  editMode,
  onUpdate,
}) => {
  const status = getCaracteristiquesStatus(character);

  return (
    <div className="bg-gray-800 p-6 rounded-lg mb-6 border border-gray-700">
      <h2 className="text-2xl font-bold mb-4 text-red-400">Caractéristiques</h2>

      {editMode && (
        <DistributionIndicator
          title="Répartition des caractéristiques"
          standard="1×4, 3×3, 4×2, 1×1"
          status={status}
        />
      )}

      <div className="grid grid-cols-3 gap-6">
        {/* Physique */}
        <div>
          <h3 className="font-bold text-lg mb-4 text-yellow-400">Physique</h3>
          <DotRating
            label="Force"
            value={character.caracteristiques.physique.force}
            maxValue={5}
            onChange={(v) => onUpdate("caracteristiques.physique.force", v)}
            disabled={!editMode}
          />
          <DotRating
            label="Constitution"
            value={character.caracteristiques.physique.constitution}
            maxValue={5}
            onChange={(v) =>
              onUpdate("caracteristiques.physique.constitution", v)
            }
            disabled={!editMode}
          />
          <DotRating
            label="Adresse"
            value={character.caracteristiques.physique.adresse}
            maxValue={5}
            onChange={(v) => onUpdate("caracteristiques.physique.adresse", v)}
            disabled={!editMode}
          />
        </div>

        {/* Social */}
        <div>
          <h3 className="font-bold text-lg mb-4 text-yellow-400">Social</h3>
          <DotRating
            label="Charisme"
            value={character.caracteristiques.social.charisme}
            maxValue={5}
            onChange={(v) => onUpdate("caracteristiques.social.charisme", v)}
            disabled={!editMode}
          />
          <DotRating
            label="Manipulation"
            value={character.caracteristiques.social.manipulation}
            maxValue={5}
            onChange={(v) =>
              onUpdate("caracteristiques.social.manipulation", v)
            }
            disabled={!editMode}
          />
          <DotRating
            label="Sang froid"
            value={character.caracteristiques.social.sangFroid}
            maxValue={5}
            onChange={(v) => onUpdate("caracteristiques.social.sangFroid", v)}
            disabled={!editMode}
          />
        </div>

        {/* Mental */}
        <div>
          <h3 className="font-bold text-lg mb-4 text-yellow-400">Mental</h3>
          <DotRating
            label="Perception"
            value={character.caracteristiques.mental.perception}
            maxValue={5}
            onChange={(v) => onUpdate("caracteristiques.mental.perception", v)}
            disabled={!editMode}
          />
          <DotRating
            label="Intelligence"
            value={character.caracteristiques.mental.intelligence}
            maxValue={5}
            onChange={(v) =>
              onUpdate("caracteristiques.mental.intelligence", v)
            }
            disabled={!editMode}
          />
          <DotRating
            label="Astuce"
            value={character.caracteristiques.mental.astuce}
            maxValue={5}
            onChange={(v) => onUpdate("caracteristiques.mental.astuce", v)}
            disabled={!editMode}
          />
        </div>
      </div>
    </div>
  );
};

export default CaracteristiquesSection;
