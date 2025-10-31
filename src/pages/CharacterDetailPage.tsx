// pages/CharacterDetailPage.jsx
import React from "react";
import { Save, Download } from "lucide-react";
import PresentationSection from "../components/Sections/PresentationSection";
import CaracteristiquesSection from "../components/Sections/CaracteristiquesSection";
import CapacitesSection from "../components/Sections/CapacitesSection";
import CombatSection from "../components/Sections/CombatSection";
import EquipementSection from "../components/Sections/EquipementSection";
import CompetencesSection from "../components/Sections/CompetencesSection";
import { exportToMarkdown } from "../utils/characterUtils";
import { Arbre, Character, Lignage } from "../types";

type CharacterDetailPageProps = {
  arbres: Arbre[];
  lignages: Lignage[];
  character: Character;
  editMode: boolean;
  onUpdate: (data: any) => void; // Adjust the parameter type as needed
  onSave: () => void;
  onBack: () => void;
  onAddAttaque: () => void;
  onRemoveAttaque: (id: number) => void;
  onUpdateAttaque: (id: number, data: any) => void;
  onAddEquipement: () => void;
  onRemoveEquipement: (id: number) => void;
  onUpdateEquipement: (id: number, data: any) => void;
  onAddCompetence: () => void;
  onRemoveCompetence: (id: number) => void;
  onUpdateCompetence: (id: number, data: any) => void;
  onAddMaitriseGenerale: () => void;
  onRemoveMaitriseGenerale: (id: number) => void;
  onUpdateMaitriseGenerale: (id: number, data: any) => void;
  onAddMaitriseSpecifique: () => void;
  onRemoveMaitriseSpecifique: (id: number) => void;
  onUpdateMaitriseSpecifique: (id: number, data: any) => void;
  onAddArme: () => void;
  onRemoveArme: (id: number) => void;
  onUpdateArme: (id: number, data: any) => void;
};

const CharacterDetailPage: React.FC<CharacterDetailPageProps> = ({
  arbres,
  lignages,
  character,
  editMode,
  onUpdate,
  onSave,
  onBack,
  onAddAttaque,
  onRemoveAttaque,
  onUpdateAttaque,
  onAddEquipement,
  onRemoveEquipement,
  onUpdateEquipement,
  onAddCompetence,
  onRemoveCompetence,
  onUpdateCompetence,
  onAddMaitriseGenerale,
  onRemoveMaitriseGenerale,
  onUpdateMaitriseGenerale,
  onAddMaitriseSpecifique,
  onRemoveMaitriseSpecifique,
  onUpdateMaitriseSpecifique,
  onAddArme,
  onRemoveArme,
  onUpdateArme,
}) => {
  return (
    <div className="min-h-screen  text-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-red-500">
            {editMode ? "Créer un Personnage" : "Fiche de Personnage"}
          </h1>
          <div className="flex gap-2">
            {!editMode && (
              <button
                onClick={() => exportToMarkdown(character)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
              >
                <Download size={20} />
                Exporter MD
              </button>
            )}
            {editMode && (
              <button
                onClick={onSave}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
              >
                <Save size={20} />
                Enregistrer
              </button>
            )}
            <button
              onClick={onBack}
              className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-lg"
            >
              Retour
            </button>
          </div>
        </div>

        <PresentationSection
          character={character}
          editMode={editMode}
          onUpdate={onUpdate}
          arbres={arbres}
          lignages={lignages}
        />

        <CaracteristiquesSection
          character={character}
          editMode={editMode}
          onUpdate={onUpdate}
        />

        <CapacitesSection
          character={character}
          editMode={editMode}
          onUpdate={onUpdate}
        />

        <CombatSection
          character={character}
          editMode={editMode}
          onUpdate={onUpdate}
          onAddAttaque={onAddAttaque}
          onRemoveAttaque={onRemoveAttaque}
          onUpdateAttaque={onUpdateAttaque}
          onAddMaitriseGenerale={onAddMaitriseGenerale}
          onRemoveMaitriseGenerale={onRemoveMaitriseGenerale}
          onUpdateMaitriseGenerale={onUpdateMaitriseGenerale}
          onAddMaitriseSpecifique={onAddMaitriseSpecifique}
          onRemoveMaitriseSpecifique={onRemoveMaitriseSpecifique}
          onUpdateMaitriseSpecifique={onUpdateMaitriseSpecifique}
          onAddArme={onAddArme}
          onRemoveArme={onRemoveArme}
          onUpdateArme={onUpdateArme}
        />

        <EquipementSection
          character={character}
          editMode={editMode}
          onUpdate={onUpdateEquipement}
          onAdd={onAddEquipement}
          onRemove={onRemoveEquipement}
        />

        <CompetencesSection
          arbres={arbres}
          character={character}
          editMode={editMode}
          onUpdate={onUpdateCompetence}
          onAdd={onAddCompetence}
          onRemove={onRemoveCompetence}
        />
      </div>
    </div>
  );
};

export default CharacterDetailPage;
